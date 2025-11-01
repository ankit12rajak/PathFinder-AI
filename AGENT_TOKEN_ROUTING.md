# Agent Token Routing System - Implementation Documentation

## Overview
This document explains the multi-agent token routing system that connects different AI agents (Technical and Behavioral) to their respective LiveKit rooms using specific tokens.

## Architecture

### Token Configuration
The system uses two separate tokens from your `.env` file:
- `VITE_LIVEKIT_TECHNICAL_TOKEN` - Token for the Technical Expert agent (room: "ai")
- `VITE_LIVEKIT_BEHAVIOURAL_TOKEN` - Token for the Behavioral/HR agent (room: "behavioral")

### Component Flow

```
Interview Rounds
├── Technical Discussion
│   └── Uses AgentType.TECHNICAL
│       └── Token: VITE_LIVEKIT_TECHNICAL_TOKEN
│       └── Room: "ai"
│
└── Behavioral Interview
    └── Uses AgentType.BEHAVIORAL
        └── Token: VITE_LIVEKIT_BEHAVIOURAL_TOKEN
        └── Room: "behavioral"
```

## Key Components

### 1. Agent Token Service (`src/services/agentTokenService.ts`)
**Purpose**: Centralized service for managing agent configurations and tokens

**Exports**:
- `AgentType` enum - Defines agent types (TECHNICAL, BEHAVIORAL)
- `AgentConfig` interface - Configuration structure for each agent
- `getAgentConfig(agentType)` - Returns the configuration for a specific agent type
- `isAgentConfigured(agentType)` - Validates if the agent is properly configured
- `getLiveKitUrl()` - Returns the LiveKit server URL

**Usage**:
```typescript
import { AgentType, getAgentConfig } from "@/services/agentTokenService";

const config = getAgentConfig(AgentType.BEHAVIORAL);
console.log(config.token);  // The behavioral token
console.log(config.room);   // "behavioral"
```

### 2. LiveKitWidget (`src/components/ai_avatar/LiveKitWidget.jsx`)
**Changes**: Now accepts `agentType` prop to dynamically load the correct token

**Props**:
- `agentType` (string) - Type of agent (technical or behavioral)
- `setShowSupport` (function) - Callback to hide the widget
- `onDisconnected` (function) - Callback when connection is lost

**Usage**:
```jsx
<LiveKitWidget 
  agentType={AgentType.BEHAVIORAL}
  setShowSupport={setShowAvatar}
  onDisconnected={() => setShowAvatar(false)}
/>
```

### 3. AvatarVoiceAgent (`src/components/ai_avatar/AvatarVoiceAgent.jsx`)
**Changes**: Now receives and passes `agentType` and `roomName` to transcriptions

**Props**:
- `agentType` (string) - The type of agent (technical or behavioral)
- `roomName` (string) - The LiveKit room name

**Behavior**:
- Tags all transcription messages with agent type and room name
- Allows filtering and organizing transcriptions by agent

### 4. Behavioral Round (`src/pages/interview/rounds/Behavioral.tsx`)
**Changes**: Now passes `AgentType.BEHAVIORAL` to LiveKitWidget

```tsx
<LiveKitWidget 
  agentType={AgentType.BEHAVIORAL}
  setShowSupport={setShowAvatar}
  onDisconnected={() => setShowAvatar(false)}
/>
```

### 5. Technical Discussion (`src/pages/interview/rounds/TechnicalDiscussion.tsx`)
**Changes**: Now passes `AgentType.TECHNICAL` to LiveKitWidget

```tsx
<LiveKitWidget 
  agentType={AgentType.TECHNICAL}
  setShowSupport={setShowAvatar}
  onDisconnected={() => setShowAvatar(false)}
/>
```

### 6. Transcription System (`src/hooks/useTranscriptions.ts`)
**Changes**: Enhanced `TranscriptionMessage` interface to include agent context

**New Fields**:
- `agentType?: string` - The type of agent ("technical" or "behavioral")
- `roomName?: string` - The LiveKit room name

**Usage**: All transcriptions now carry agent context information

### 7. TranscriptionDisplay (`src/components/interview/TranscriptionDisplay.tsx`)
**Changes**: 
- Different colored avatars for different agents
  - Green gradient for Behavioral Agent
  - Blue/Purple gradient for Technical Agent
- Shows agent type and room name info (with appropriate emoji indicators)

## Connection Flow

### When User Clicks "Start Video Interview" (Behavioral Round):
1. Behavioral.tsx passes `AgentType.BEHAVIORAL` to LiveKitWidget
2. LiveKitWidget calls `getAgentConfig(AgentType.BEHAVIORAL)`
3. Service retrieves `VITE_LIVEKIT_BEHAVIOURAL_TOKEN`
4. LiveKitRoom connects to the "behavioral" room with the behavioral token
5. AvatarVoiceAgent receives `agentType="behavioral"` and `roomName="behavioral"`
6. All transcriptions are tagged with agent type and room info

### When User Clicks "Start Video Interview" (Technical Round):
1. TechnicalDiscussion.tsx passes `AgentType.TECHNICAL` to LiveKitWidget
2. LiveKitWidget calls `getAgentConfig(AgentType.TECHNICAL)`
3. Service retrieves `VITE_LIVEKIT_TECHNICAL_TOKEN`
4. LiveKitRoom connects to the "ai" room with the technical token
5. AvatarVoiceAgent receives `agentType="technical"` and `roomName="ai"`
6. All transcriptions are tagged with agent type and room info

## Environment Variables Required

```env
# LiveKit Configuration
VITE_LIVEKIT_URL=wss://test-wazew3xi.livekit.cloud
VITE_LIVEKIT_API_KEY=APIpJatDtFoWkNS
VITE_LIVEKIT_API_SECRET=R2JDaYzTovHtw5Cq8PH3ew44dVeMgE72C1wT1q0f4f0A

# Agent Tokens (These must have the correct room restrictions set in LiveKit)
VITE_LIVEKIT_TECHNICAL_TOKEN=eyJ... (token with room: "ai")
VITE_LIVEKIT_BEHAVIOURAL_TOKEN=eyJ... (token with room: "behavioral")
```

## Benefits

1. **Isolation**: Each agent operates in its own room, preventing interference
2. **Security**: Token scope limited to specific rooms
3. **Transcription Accuracy**: Each agent's transcriptions are tagged with its type
4. **Maintainability**: Centralized configuration makes future additions easier
5. **Debugging**: Clear logging shows which agent/room is being used

## Adding New Agents

To add a new agent type:

1. **Update `agentTokenService.ts`**:
   ```typescript
   export enum AgentType {
     TECHNICAL = "technical",
     BEHAVIORAL = "behavioral",
     NEW_AGENT = "new_agent",  // Add here
   }
   
   export function getAgentConfig(agentType: AgentType): AgentConfig {
     switch(agentType) {
       // ... existing cases
       case AgentType.NEW_AGENT:
         return {
           type: AgentType.NEW_AGENT,
           token: import.meta.env.VITE_LIVEKIT_NEW_AGENT_TOKEN,
           room: "new-agent-room",
           agentName: "New Agent Name",
           description: "AI Agent",
         };
     }
   }
   ```

2. **Add token to `.env`**:
   ```env
   VITE_LIVEKIT_NEW_AGENT_TOKEN=eyJ...
   ```

3. **Use in your component**:
   ```jsx
   <LiveKitWidget 
     agentType={AgentType.NEW_AGENT}
     setShowSupport={setShowAvatar}
     onDisconnected={() => setShowAvatar(false)}
   />
   ```

## Troubleshooting

### Error: "LiveKit token not configured"
- Check that the token exists in `.env` file
- Verify the token hasn't expired
- Ensure the environment variables are properly loaded

### Transcriptions showing in wrong room
- Verify `agentType` prop is correctly passed to LiveKitWidget
- Check that AvatarVoiceAgent is receiving the agentType prop
- Review console logs to see which agent type is being used

### Connection issues
- Confirm LiveKit server URL is correct
- Verify the token's room restrictions match the room name
- Check network connectivity to LiveKit server

## Files Modified

1. ✅ `src/services/agentTokenService.ts` - NEW
2. ✅ `src/components/ai_avatar/LiveKitWidget.jsx`
3. ✅ `src/components/ai_avatar/AvatarVoiceAgent.jsx`
4. ✅ `src/pages/interview/rounds/Behavioral.tsx`
5. ✅ `src/pages/interview/rounds/TechnicalDiscussion.tsx`
6. ✅ `src/hooks/useTranscriptions.ts`
7. ✅ `src/components/interview/TranscriptionDisplay.tsx`

## Summary

The system now properly routes each agent type to its designated LiveKit room using the correct token. Transcriptions are tagged with agent context, allowing proper tracking and filtering. The architecture is extensible for adding new agents in the future.
