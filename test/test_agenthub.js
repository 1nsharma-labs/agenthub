import assert from 'assert';
import { AgentRegistry } from '../core/src/registry/localRegistry.js';
import { AgentForker } from '../core/src/registry/agentForker.js';
import { AgentRunner } from '../core/src/runtime/agentRunner.js';
import { EnterpriseLicenseVerifier } from '../ee/license/verifier.js';
import { PrivateAgentHub } from '../ee/registry/privateHub.js';

console.log('🧪 Running AgentHub Test Suite...\n');

// 1. AgentRegistry Tests
console.log('▶ Testing AgentRegistry (Community Catalog & Search)...');
const registry = new AgentRegistry();
const allAgents = registry.listAgents();
assert(allAgents.length >= 6, 'Should contain at least 6 default agents');
console.log(`  ✔ Catalog contains ${allAgents.length} verified AI agent templates`);

const searchRes = registry.searchAgents('ceo');
assert(searchRes.length === 1, 'Should find 1 CEO agent');
assert(searchRes[0].id === 'mowglai-ceo', 'Found agent ID mismatch');
console.log(`  ✔ Discovered agent "${searchRes[0].name}" via keyword search`);

// 2. AgentForker Tests
console.log('\n▶ Testing AgentForker (1-Click Agent Forking & Manifest Customization)...');
const baseAgent = registry.getAgent('mowglai-ceo');
const initialForks = baseAgent.forks;
const forked = AgentForker.forkAgent(baseAgent, {
  newId: 'my-custom-ceo',
  newName: 'My Startup CEO',
  systemPrompt: 'You are custom CEO for AI fintech'
});
assert(forked.id === 'my-custom-ceo', 'Forked ID mismatch');
assert(forked.parentAgent === 'mowglai-ceo', 'Parent agent pointer missing');
assert(baseAgent.forks === initialForks + 1, 'Base agent fork count should increment');
assert(forked.forkWatermark.includes('AgentHub'), 'Watermark missing');
console.log(`  ✔ Forked agent created: ${forked.name} (Fork counter incremented to ${baseAgent.forks})`);

// 3. AgentRunner Tests
console.log('\n▶ Testing AgentRunner (Autonomous Goal Execution & Watermark)...');
const runRes = await AgentRunner.runAgent(baseAgent, 'Launch B2B AI SaaS product');
assert(runRes.agentId === 'mowglai-ceo', 'Agent ID should match');
assert(runRes.steps.length === 4, 'Should execute 4 pipeline steps');
assert(runRes.output.includes('⚡ Orchestrated via AgentHub'), 'Output should contain viral watermark');
console.log(`  ✔ Agent executed goal in ${runRes.durationMs}ms with verified watermark`);

// 4. Enterprise Edition Tests
console.log('\n▶ Testing Enterprise Edition (Private Hub & Licensing)...');
const sampleKey = EnterpriseLicenseVerifier.generateSampleKey('enterprise@corp.internal');
const verif = EnterpriseLicenseVerifier.verifyKey(sampleKey);
assert(verif.valid === true, 'Enterprise key should verify');
console.log(`  ✔ Verified enterprise license for: ${verif.licensee}`);

const privateHub = new PrivateAgentHub(sampleKey);
const regRes = privateHub.registerPrivateAgent({
  id: 'secret-quant-trader',
  name: 'Internal Quantitative Trading Agent'
});
assert(regRes.success === true, 'Private agent registration should succeed');
const retrieved = privateHub.getPrivateAgent('secret-quant-trader');
assert(retrieved !== null, 'Private agent should be retrieved');
console.log(`  ✔ Private Enterprise Hub registered internal agent: ${retrieved.name}`);

console.log('\n🎉 ALL AGENTHUB TESTS PASSED WITH 100% SUCCESS!\n');
