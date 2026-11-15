export class AgentRegistry {
  constructor() {
    this.agents = new Map([
      [
        'mowglai-ceo',
        {
          id: 'mowglai-ceo',
          name: 'Mowglai Virtual Company Executive',
          category: 'Executive',
          version: '1.2.0',
          author: '1nsharma (Amit Sharma)',
          description: 'Orchestrates multi-agent virtual coworkers, assigns business tasks, and oversees product pipelines.',
          tools: ['hivemesh_dispatch', 'task_blackboard', 'slack_notify'],
          stars: 1420,
          forks: 318,
          systemPrompt: 'You are the Autonomous CEO of Mowglai AI Company OS. Your duty is to deconstruct high-level business goals into specialized agent work orders, verify deliverables against acceptance criteria, and enforce lean unit economics.',
          exampleInputs: [
            'Launch a new B2B AI FinOps product in 48 hours',
            'Conduct cross-functional audit on product roadmaps'
          ]
        }
      ],
      [
        'mobile-qa-droid',
        {
          id: 'mobile-qa-droid',
          name: 'DroidArmor Mobile QA Engineer',
          category: 'Mobile',
          version: '1.0.0',
          author: '1nsharma-labs',
          description: 'Autonomous Android tester that inspects UI hierarchies, executes fast ADB taps, and self-heals broken locators.',
          tools: ['droidarmor_inspect', 'droidarmor_tap', 'droidarmor_type', 'adb_shell'],
          stars: 2150,
          forks: 580,
          systemPrompt: 'You are DroidArmor QA Engineer. You explore Android interfaces via UIAutomator, prioritize dynamic resource IDs with verified coordinate fallbacks, and execute resilient end-to-end flows.',
          exampleInputs: [
            'Test onboarding flow on Pixel 8 Pro',
            'Verify dark mode toggle in system settings'
          ]
        }
      ],
      [
        'codebase-architect',
        {
          id: 'codebase-architect',
          name: 'SlashGraph Architecture Mapper',
          category: 'Architecture',
          version: '1.0.0',
          author: '1nsharma-labs',
          description: 'Zero-token AST mapper that extracts Express/Next.js routes, Prisma schemas, and creates ultra-compact <600 token dossiers for LLMs.',
          tools: ['slashgraph_analyze', 'ast_scanner', 'urlmind_recon'],
          stars: 1890,
          forks: 412,
          systemPrompt: 'You are SlashGraph System Architect. You parse codebases into clean Directed Acyclic Graphs, prevent context bloat in AI agents, and detect circular dependencies before PR merge.',
          exampleInputs: [
            'Map entire backend API routes and database schemas',
            'Generate 500-token architecture dossier for Cursor'
          ]
        }
      ],
      [
        'finops-pruner',
        {
          id: 'finops-pruner',
          name: 'TokenArmor & Cloud Waste Hunter',
          category: 'FinOps',
          version: '1.2.0',
          author: '1nsharma-labs',
          description: 'Slashes LLM API bills via exact prompt caching, zombie AWS/GCP disk hunting, and Kubernetes pod right-sizing.',
          tools: ['tokenarmor_cache', 'cloudprune_scan', 'kubeprune_patch'],
          stars: 3200,
          forks: 890,
          systemPrompt: 'You are the 1nsharma FinOps Sentinel. Your singular mission is to eliminate cloud and LLM API waste without compromising system availability or latency.',
          exampleInputs: [
            'Audit current LLM prompt spend and enable exact semantic cache',
            'Find unattached EBS volumes and idle Kubernetes pods'
          ]
        }
      ],
      [
        'terminal-healer',
        {
          id: 'terminal-healer',
          name: 'DevDaemon Terminal Interceptor',
          category: 'DevOps',
          version: '1.0.0',
          author: '1nsharma-labs',
          description: 'Sub-2ms terminal error classifier that terminates zombie ports (EADDRINUSE 3000) and provides 1-line shell auto-fixes.',
          tools: ['devdaemon_kill_port', 'devdaemon_diagnose', 'exec_safe'],
          stars: 1750,
          forks: 340,
          systemPrompt: 'You are DevDaemon. You intercept failed terminal builds, detect port conflicts, missing packages, and git rebase blocks, producing exact 1-command resolutions.',
          exampleInputs: [
            'Diagnose EADDRINUSE: address already in use :::3000',
            'Fix missing npm/python dependencies in project'
          ]
        }
      ],
      [
        'gpu-vram-tuner',
        {
          id: 'gpu-vram-tuner',
          name: 'VramArmor GPU Inference Tuner',
          category: 'GPU',
          version: '1.0.0',
          author: '1nsharma-labs',
          description: 'Pre-flight VRAM fit calculator for DeepSeek, Llama and Qwen models, preventing CUDA OOM crashes and offloading idle models.',
          tools: ['vramarmor_predict', 'ollama_unload', 'gpu_telemetry'],
          stars: 2890,
          forks: 720,
          systemPrompt: 'You are VramArmor Tuner. You analyze GPU hardware limits, calculate model weight and KV cache requirements, and ensure local LLMs run 100% in high-speed VRAM.',
          exampleInputs: [
            'Predict if DeepSeek-R1 14B fits with 8k context in RTX 4090',
            'Reclaim VRAM from idle Ollama models'
          ]
        }
      ]
    ]);
  }

  listAgents(category = null) {
    let list = Array.from(this.agents.values());
    if (category) {
      list = list.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  getAgent(id) {
    return this.agents.get(id) || null;
  }

  searchAgents(query) {
    if (!query) return this.listAgents();
    const q = query.toLowerCase();
    return Array.from(this.agents.values()).filter(a =>
      a.id.includes(q) ||
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  }
}
