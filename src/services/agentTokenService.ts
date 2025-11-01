/**
 * Agent Token Service
 * Manages LiveKit tokens and room configurations for different AI agents
 */

export enum AgentType {
  TECHNICAL = "technical",
  BEHAVIORAL = "behavioral",
}

export interface AgentConfig {
  type: AgentType;
  token: string;
  room: string;
  agentName: string;
  description: string;
}

/**
 * Get the agent configuration based on agent type
 * Maps to different LiveKit tokens and rooms in .env
 */
export function getAgentConfig(agentType: AgentType): AgentConfig {
  const baseUrl = import.meta.env.VITE_LIVEKIT_URL;

  switch (agentType) {
    case AgentType.TECHNICAL:
      return {
        type: AgentType.TECHNICAL,
        token: import.meta.env.VITE_LIVEKIT_TECHNICAL_TOKEN || "",
        room: "ai",
        agentName: "Technical Expert",
        description: "AI Agent",
      };

    case AgentType.BEHAVIORAL:
      return {
        type: AgentType.BEHAVIORAL,
        token: import.meta.env.VITE_LIVEKIT_BEHAVIOURAL_TOKEN || "",
        room: "behavioral",
        agentName: "HR Specialist",
        description: "AI Agent",
      };

    default:
      throw new Error(`Unknown agent type: ${agentType}`);
  }
}

/**
 * Validate if the agent token is properly configured
 */
export function isAgentConfigured(agentType: AgentType): boolean {
  try {
    const config = getAgentConfig(agentType);
    return !!config.token && config.token.length > 0;
  } catch {
    return false;
  }
}

/**
 * Get the LiveKit URL
 */
export function getLiveKitUrl(): string {
  return import.meta.env.VITE_LIVEKIT_URL || "";
}
