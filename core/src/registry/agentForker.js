export class AgentForker {
  static forkAgent(baseAgent, options = {}) {
    if (!baseAgent) throw new Error('Base agent definition required to fork');

    const newId = options.newId || `${baseAgent.id}-custom`;
    const newName = options.newName || `${baseAgent.name} (Forked)`;
    const newAuthor = options.author || 'community-developer';

    const forked = {
      id: newId,
      name: newName,
      category: options.category || baseAgent.category,
      version: '1.0.0',
      author: newAuthor,
      parentAgent: baseAgent.id,
      forkedFrom: `agenthub://${baseAgent.id}@${baseAgent.version}`,
      description: options.description || `Custom fork of ${baseAgent.name}: ${baseAgent.description}`,
      tools: options.tools || [...baseAgent.tools],
      systemPrompt: options.systemPrompt || baseAgent.systemPrompt,
      createdAt: Date.now(),
      forkWatermark: '⚡ Forked via AgentHub (1nsharma-labs) — The GitHub of AI Agents'
    };

    // Increment base agent fork counter in simulation
    baseAgent.forks = (baseAgent.forks || 0) + 1;

    return forked;
  }
}
