<h1 align="center">🚀 AgentHub</h1>

<p align="center">
  <b>The Open-Source Hub & Package Manager for AI Agents, Prompts & Workflows</b><br>
  <i>The GitHub of AI Agents — Powered by Mowglai & Hive — Created by Amit Sharma (@1nsharma)</i><br>
  Discover, fork in 1-click, and execute autonomous AI agents and virtual coworkers with native Model Context Protocol (MCP) support.
</p>

<p align="center">
  <a href="https://github.com/1nsharma-labs/agenthub/actions"><img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/agenthub"><img src="https://img.shields.io/badge/npm-v1.0.0-blue.svg" alt="npm version"></a>
  <a href="https://github.com/1nsharma-labs/agenthub/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-green.svg" alt="License"></a>
  <a href="https://1nsharma-labs.github.io/agenthub/"><img src="https://img.shields.io/badge/Live_Hub-Agent_Directory-orange.svg" alt="Live Hub"></a>
  <a href="https://polar.sh/1nsharma-labs"><img src="https://img.shields.io/badge/Sponsor-Polar.sh-purple.svg" alt="Sponsor"></a>
</p>

---

## 🌟 Why AgentHub?

Today, building AI agents requires starting from scratch or stitching together complex frameworks. There is no open, unified registry where developers and businesses can discover verified agents, fork them with customized prompts, and run them with a single command.

**AgentHub** is the **"GitHub of AI Agents"**—inspired by [**1nsharma/mowglai**](https://github.com/1nsharma/mowglai) (AI Company OS & Virtual Coworkers) and [**1nsharma/Hive**](https://github.com/1nsharma/Hive) (Collaborative Multi-Agent Platform).

### 4 Core Capabilities
1. 🔍 **Universal Agent Discovery:** Search dozens of pre-configured, tested agent templates across Executive, Mobile QA, Codebase Architecture, FinOps, DevOps, and GPU tuning.
2. 🍴 **1-Click Agent Forking:** Run `agenthub fork mowglai-ceo "MyCustomCEO"` to instantly clone the agent manifest, customize the system prompt, and version it in Git.
3. ⚡ **Zero-Dependency Execution:** Run any agent from CLI (`npx agenthub run <agent-id> "<goal>"`) or in browser without setting up complex Python environments.
4. 🔮 **Native Model Context Protocol (MCP):** Connects to **Claude Desktop** and **Cursor** so agents can spawn and delegate to other agents.

---

## 🚀 Quick Start

### Installation

```bash
# Run on-demand without installing
npx -y agenthub help

# Or install globally
npm install -g agenthub
```

---

## 💻 CLI Commands

### 1. List Available Agents
```bash
agenthub list
agenthub list Mobile
agenthub list Executive
```

### 2. Inspect Agent Details & System Prompt
```bash
agenthub info mowglai-ceo
agenthub info mobile-qa-droid
```

### 3. Fork an Agent Template Locally
```bash
agenthub fork mowglai-ceo "MyStartupCEO"
```
This clones `mowglai-ceo` into `mystartupceo.agent.json` ready for custom prompts and tools!

### 4. Execute an Agent Workflow
```bash
agenthub run mowglai-ceo "Launch B2B AI SaaS product in 48 hours"
agenthub run mobile-qa-droid "Test login flow on Android device"
agenthub run finops-pruner "Audit AWS unattached disks"
```

---

## 🔮 Model Context Protocol (MCP) Integration

AgentHub provides a native MCP stdio server. Add it to your `claude_desktop_config.json` or Cursor MCP settings:

```json
{
  "mcpServers": {
    "agenthub": {
      "command": "npx",
      "args": ["-y", "agenthub", "mcp"]
    }
  }
}
```

Now Claude Desktop and Cursor can directly execute:
* `agenthub_list_agents`: Lists verified agent templates.
* `agenthub_get_agent`: Fetches agent prompts and tools.
* `agenthub_fork_agent`: Clones and adapts agents for new tasks.
* `agenthub_run_agent`: Dispatches agent workflows.

---

## 💼 Commercial & Enterprise Support

AgentHub follows an **Open-Core** model:
* **Community Core (Apache 2.0):** 100% Free for public registry, local forking, CLI tools, and full MCP server.
* **Enterprise Edition (BSL 1.1):** Includes the **Private Agent Hub** (`ee/registry/privateHub.js`) for organizations requiring private internal agent registries, encrypted credentials, and team audit logs.

### Direct Contact & Payment
* **Lead Architect:** **Amit Sharma** ([@1nsharma](https://github.com/1nsharma))
* **Direct Email:** [amitsharma9976@gmail.com](mailto:amitsharma9976@gmail.com)
* **Direct UPI / PhonePe / GPay / Paytm:** `6393741171` (UPI ID: `6393741171@upi`)
* **Global Sponsorship & Cards:** [polar.sh/1nsharma-labs](https://polar.sh/1nsharma-labs) &bull; [github.com/sponsors/1nsharma](https://github.com/sponsors/1nsharma)

---

## 🌐 The 1nsharma Ecosystem

* [**1nsharma/mowglai**](https://github.com/1nsharma/mowglai) — AI Company OS & Virtual Coworkers.
* [**1nsharma/Hive**](https://github.com/1nsharma/Hive) — Collaborative AI Workspace Platform.
* [**HiveMesh**](https://github.com/1nsharma-labs/hivemesh) — Autonomous Multi-Agent Workspace Orchestration Mesh.
* [**DevDaemon**](https://github.com/1nsharma-labs/devdaemon) — Autonomous Terminal Error Interceptor & Workspace Healer.
* [**DroidArmor**](https://github.com/1nsharma-labs/droidarmor) — Autonomous AI Mobile Agent & Fast ADB Automation for Android.
* [**SlashGraph**](https://github.com/1nsharma-labs/slashgraph) — Universal Codebase & System Architecture Intelligence Graph.
* [**VramArmor**](https://github.com/1nsharma-labs/vramarmor) — Local AI Model VRAM & GPU Inference Optimizer.
* [**TokenArmor**](https://github.com/1nsharma-labs/tokenarmor) — Open-Source AI Gateway & Token FinOps Firewall.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/1nsharma"><b>Amit Sharma</b></a> (@1nsharma-labs)
</p>
