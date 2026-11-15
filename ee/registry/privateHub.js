import { EnterpriseLicenseVerifier } from '../license/verifier.js';

export class PrivateAgentHub {
  constructor(licenseKey) {
    this.verification = EnterpriseLicenseVerifier.verifyKey(licenseKey);
    if (!this.verification.valid) {
      throw new Error(`Enterprise License required for Private Agent Hub: ${this.verification.reason}`);
    }
    this.privateAgents = new Map();
    this.auditLogs = [];
  }

  registerPrivateAgent(agentManifest) {
    if (!agentManifest.id) throw new Error('Agent ID required');
    this.privateAgents.set(agentManifest.id, {
      ...agentManifest,
      ownerOrg: this.verification.licensee,
      registeredAt: Date.now()
    });
    this.auditLogs.push({
      action: 'AGENT_REGISTERED',
      agentId: agentManifest.id,
      timestamp: Date.now()
    });
    return { success: true, agentId: agentManifest.id };
  }

  getPrivateAgent(agentId) {
    return this.privateAgents.get(agentId) || null;
  }
}
