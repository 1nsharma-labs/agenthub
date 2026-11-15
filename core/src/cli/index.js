#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { AgentRegistry } from '../registry/localRegistry.js';
import { AgentForker } from '../registry/agentForker.js';
import { AgentRunner } from '../runtime/agentRunner.js';
import { AgentHubMcpServer } from '../mcp/server.js';

const BANNER = `
     _                    _   _   _       _     
    / \\   __ _  ___ _ __ | |_| | | |_   _| |__  
   / _ \\ / _\` |/ _ \\ '_ \\| __| |_| | | | | '_ \\ 
  / ___ \\ (_| |  __/ | | | |_|  _  | |_| | |_) |
 /_/   \\_\\__, |\\___|_| |_|\\__|_| |_|\\__,_|_.__/ 
         |___/                                  
  The Open-Source Hub & Package Manager for AI Agents & Virtual Coworkers
  The GitHub of AI Agents • Created by Amit Sharma (@1nsharma) • 1nsharma-labs
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  const registry = new AgentRegistry();

  if (command === 'help' || command === '--help' || command === '-h') {
    console.log(BANNER);
    console.log(`Usage: agenthub <command> [options]\n`);
    console.log(`Commands:`);
    console.log(`  list [category]         List available AI agents (Executive, Mobile, Architecture, FinOps, DevOps, GPU)`);
    console.log(`  info <agent-id>         Show detailed manifest, system prompt, and tools for an agent`);
    console.log(`  fork <agent-id> [name]  Fork an agent template into a custom local agent manifest`);
    console.log(`  run <agent-id> "<goal>" Execute an agent on a goal with step-by-step reasoning`);
    console.log(`  mcp                     Launch Model Context Protocol (MCP) server for Claude / Cursor`);
    console.log(`\nExamples:`);
    console.log(`  agenthub list`);
    console.log(`  agenthub info mowglai-ceo`);
    console.log(`  agenthub fork mowglai-ceo "MyCustomCEO"`);
    console.log(`  agenthub run mobile-qa-droid "Test login flow on Android"`);
    console.log(`  agenthub run finops-pruner "Audit AWS EBS waste"\n`);
    process.exit(0);
  }

  if (command === 'mcp') {
    const server = new AgentHubMcpServer();
    server.start();
    return;
  }

  console.log(BANNER);

  if (command === 'list') {
    const category = args[1];
    const agents = registry.listAgents(category);
    console.log(`🌟 Available AI Agents in AgentHub (${agents.length}):\n`);
    agents.forEach((a, idx) => {
      console.log(`  [${idx + 1}] ${a.id} (v${a.version})`);
      console.log(`      Title:       ${a.name} [${a.category}]`);
      console.log(`      Description: ${a.description}`);
      console.log(`      Popularity:  ⭐ ${a.stars} stars | 🍴 ${a.forks} forks`);
      console.log(`      Tools:       ${a.tools.join(', ')}\n`);
    });
  } else if (command === 'info') {
    const agentId = args[1];
    if (!agentId) {
      console.error(`❌ Error: Please specify an agent ID (e.g. agenthub info mowglai-ceo)`);
      process.exit(1);
    }
    const agent = registry.getAgent(agentId);
    if (!agent) {
      console.error(`❌ Error: Agent "${agentId}" not found in registry.`);
      process.exit(1);
    }
    console.log(`🤖 Agent Manifest: ${agent.name} (${agent.id})`);
    console.log(`  Version:       v${agent.version}`);
    console.log(`  Author:        ${agent.author}`);
    console.log(`  Category:      ${agent.category}`);
    console.log(`  Description:   ${agent.description}`);
    console.log(`  Tools Mounted: ${agent.tools.join(', ')}`);
    console.log(`\n📝 System Prompt:`);
    console.log(`  "${agent.systemPrompt}"`);
    console.log(`\n💡 Example Use Cases:`);
    agent.exampleInputs.forEach(ex => console.log(`  - "${ex}"`));
    console.log('');
  } else if (command === 'fork') {
    const agentId = args[1];
    if (!agentId) {
      console.error(`❌ Error: Please specify an agent ID to fork (e.g. agenthub fork mowglai-ceo)`);
      process.exit(1);
    }
    const agent = registry.getAgent(agentId);
    if (!agent) {
      console.error(`❌ Error: Agent "${agentId}" not found in registry.`);
      process.exit(1);
    }
    const newName = args[2] || `${agent.name} (My Fork)`;
    const forked = AgentForker.forkAgent(agent, { newName });

    const filename = `${forked.id}.agent.json`;
    fs.writeFileSync(path.join(process.cwd(), filename), JSON.stringify(forked, null, 2), 'utf-8');

    console.log(`🍴 Successfully forked "${agent.id}"!`);
    console.log(`  New Agent ID:   ${forked.id}`);
    console.log(`  Title:          ${forked.name}`);
    console.log(`  Saved to:       ${filename}`);
    console.log(`  Fork Watermark: ${forked.forkWatermark}`);
    console.log(`\n💡 You can now customize "${filename}" and run it via "agenthub run ./${filename} <prompt>"\n`);
  } else if (command === 'run') {
    const agentId = args[1];
    const prompt = args.slice(2).join(' ');
    if (!agentId || !prompt) {
      console.error(`❌ Error: Please specify both agent ID and goal (e.g. agenthub run mowglai-ceo "Launch B2B SaaS")`);
      process.exit(1);
    }

    let agent = registry.getAgent(agentId);
    if (!agent && fs.existsSync(agentId)) {
      agent = JSON.parse(fs.readFileSync(agentId, 'utf-8'));
    }

    if (!agent) {
      console.error(`❌ Error: Agent "${agentId}" not found in registry or local path.`);
      process.exit(1);
    }

    console.log(`🚀 Executing Agent: ${agent.name} (${agent.id})`);
    console.log(`🎯 User Goal: "${prompt}"\n`);

    const result = await AgentRunner.runAgent(agent, prompt);

    console.log(`📋 Execution Trace:`);
    result.steps.forEach(s => {
      console.log(`  Step ${s.step}: [${s.action}] -> ${s.detail}`);
    });

    console.log(`\n💬 Agent Output:`);
    console.log(result.output);
    console.log(`\n⏱️ Execution Duration: ${result.durationMs}ms\n`);
  } else {
    console.error(`Unknown command: "${command}". Run "agenthub help" for usage.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Fatal error: ${err.message}`);
  process.exit(1);
});
