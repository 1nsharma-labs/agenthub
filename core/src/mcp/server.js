import readline from 'readline';
import { AgentRegistry } from '../registry/localRegistry.js';
import { AgentForker } from '../registry/agentForker.js';
import { AgentRunner } from '../runtime/agentRunner.js';

export class AgentHubMcpServer {
  constructor() {
    this.registry = new AgentRegistry();
  }

  start() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });

    rl.on('line', async (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      try {
        const request = JSON.parse(trimmed);
        const response = await this.handleMessage(request);
        if (response) {
          process.stdout.write(JSON.stringify(response) + '\n');
        }
      } catch (err) {
        process.stdout.write(JSON.stringify({
          jsonrpc: '2.0',
          id: null,
          error: { code: -32700, message: `Parse error: ${err.message}` }
        }) + '\n');
      }
    });

    process.stderr.write('🚀 AgentHub MCP Server running on stdio\n');
  }

  async handleMessage(req) {
    const { id, method, params } = req;

    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'agenthub-mcp',
            version: '1.0.0'
          }
        }
      };
    }

    if (method === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'agenthub_list_agents',
              description: 'Lists all available AI agent templates and virtual coworkers from the community registry.',
              inputSchema: {
                type: 'object',
                properties: {
                  category: { type: 'string', description: 'Filter by category (Executive, Mobile, Architecture, FinOps, DevOps, GPU)' }
                }
              }
            },
            {
              name: 'agenthub_get_agent',
              description: 'Retrieves full details, system prompt, and tools for a specific agent.',
              inputSchema: {
                type: 'object',
                properties: {
                  agent_id: { type: 'string', description: 'Agent ID (e.g. mowglai-ceo, mobile-qa-droid)' }
                },
                required: ['agent_id']
              }
            },
            {
              name: 'agenthub_fork_agent',
              description: 'Forks an existing agent template with custom name, prompt, or tools.',
              inputSchema: {
                type: 'object',
                properties: {
                  agent_id: { type: 'string', description: 'Base agent ID to fork' },
                  new_name: { type: 'string', description: 'Name of the forked agent' },
                  custom_prompt: { type: 'string', description: 'Customized system prompt override' }
                },
                required: ['agent_id']
              }
            },
            {
              name: 'agenthub_run_agent',
              description: 'Executes an AI agent template against a user task or prompt.',
              inputSchema: {
                type: 'object',
                properties: {
                  agent_id: { type: 'string', description: 'Agent ID to run' },
                  prompt: { type: 'string', description: 'Task or prompt for the agent' }
                },
                required: ['agent_id', 'prompt']
              }
            }
          ]
        }
      };
    }

    if (method === 'tools/call') {
      const toolName = params?.name;
      const args = params?.arguments || {};

      try {
        let content = '';

        if (toolName === 'agenthub_list_agents') {
          const agents = this.registry.listAgents(args.category);
          content = JSON.stringify(agents, null, 2);
        } else if (toolName === 'agenthub_get_agent') {
          const agent = this.registry.getAgent(args.agent_id);
          if (!agent) throw new Error(`Agent "${args.agent_id}" not found.`);
          content = JSON.stringify(agent, null, 2);
        } else if (toolName === 'agenthub_fork_agent') {
          const base = this.registry.getAgent(args.agent_id);
          if (!base) throw new Error(`Agent "${args.agent_id}" not found.`);
          const forked = AgentForker.forkAgent(base, {
            newName: args.new_name,
            systemPrompt: args.custom_prompt
          });
          content = JSON.stringify(forked, null, 2);
        } else if (toolName === 'agenthub_run_agent') {
          const agent = this.registry.getAgent(args.agent_id);
          if (!agent) throw new Error(`Agent "${args.agent_id}" not found.`);
          const res = await AgentRunner.runAgent(agent, args.prompt);
          content = JSON.stringify(res, null, 2);
        } else {
          return {
            jsonrpc: '2.0',
            id,
            error: { code: -32601, message: `Tool "${toolName}" not found.` }
          };
        }

        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: content }]
          }
        };
      } catch (err) {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            isError: true,
            content: [{ type: 'text', text: `Error: ${err.message}` }]
          }
        };
      }
    }

    return {
      jsonrpc: '2.0',
      id,
      result: {}
    };
  }
}
