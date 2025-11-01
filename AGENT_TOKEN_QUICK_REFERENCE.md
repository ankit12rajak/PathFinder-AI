# Agent Token Routing - Quick Reference Guide

## The Problem Solved ✅
Previously, all agents used a single hardcoded token. Now each agent type (Technical/Behavioral) uses its own specific token and connects to its own LiveKit room.

## Key Changes at a Glance

| Component | What Changed | Result |
|-----------|-------------|--------|
| **LiveKitWidget** | Now accepts `agentType` prop | Dynamically loads correct token |
| **Behavioral.tsx** | Passes `AgentType.BEHAVIORAL` | Connects to behavioral room |
| **Technical.tsx** | Passes `AgentType.TECHNICAL` | Connects to ai room |
| **Transcriptions** | Now tagged with agent type | Can filter/identify by agent |

## How to Use

### For Developers Using LiveKitWidget

```jsx
import LiveKitWidget from "@/components/ai_avatar/LiveKitWidget";
import { AgentType } from "@/services/agentTokenService";

// Use it in your component
<LiveKitWidget 
  agentType={AgentType.TECHNICAL}  // or AgentType.BEHAVIORAL
  setShowSupport={setShowAvatar}
  onDisconnected={() => setShowAvatar(false)}
/>
```

### To Add a New Agent

1. Add your token to `.env`:
   ```env
   VITE_LIVEKIT_YOUR_AGENT_TOKEN=eyJ...
   ```

2. Update `src/services/agentTokenService.ts`:
   ```typescript
   export enum AgentType {
     // ... existing
     YOUR_AGENT = "your_agent",
   }
   
   case AgentType.YOUR_AGENT:
     return {
       type: AgentType.YOUR_AGENT,
       token: import.meta.env.VITE_LIVEKIT_YOUR_AGENT_TOKEN,
       room: "your-room-name",
       agentName: "Your Agent",
       description: "AI Agent",
     };
   ```

3. Use it:
   ```jsx
   <LiveKitWidget agentType={AgentType.YOUR_AGENT} />
   ```

## Token Mapping

```
┌─────────────────────────────────────────┐
│         Interview Sections              │
├─────────────────────────────────────────┤
│ Behavioral Interview                    │
│ ├─ AgentType.BEHAVIORAL                 │
│ ├─ Token: VITE_LIVEKIT_BEHAVIOURAL_TOKEN│
│ └─ Room: "behavioral"                   │
├─────────────────────────────────────────┤
│ Technical Discussion                    │
│ ├─ AgentType.TECHNICAL                  │
│ ├─ Token: VITE_LIVEKIT_TECHNICAL_TOKEN  │
│ └─ Room: "ai"                           │
└─────────────────────────────────────────┘
```

## Transcription Format

Each transcription message now includes:
```typescript
{
  id: string;
  text: string;
  speaker: "user" | "agent";
  firstReceivedTime: number;
  isFinal: boolean;
  agentType: "technical" | "behavioral";  // NEW!
  roomName: string;                        // NEW!
}
```

## File Locations

- **Token Service**: `src/services/agentTokenService.ts`
- **Widget**: `src/components/ai_avatar/LiveKitWidget.jsx`
- **Voice Agent**: `src/components/ai_avatar/AvatarVoiceAgent.jsx`
- **Behavioral Page**: `src/pages/interview/rounds/Behavioral.tsx`
- **Technical Page**: `src/pages/interview/rounds/TechnicalDiscussion.tsx`
- **Transcriptions Hook**: `src/hooks/useTranscriptions.ts`
- **Transcription Display**: `src/components/interview/TranscriptionDisplay.tsx`

## Common Issues & Solutions

### ❌ Getting "token not configured" error
**Solution**: Check your `.env` file has both tokens:
```env
VITE_LIVEKIT_TECHNICAL_TOKEN=eyJ...
VITE_LIVEKIT_BEHAVIOURAL_TOKEN=eyJ...
```

### ❌ All agents connecting to same room
**Solution**: Verify you're passing `agentType` prop to LiveKitWidget

### ❌ Transcriptions not showing agent type
**Solution**: Make sure AvatarVoiceAgent is receiving `agentType` prop

## Testing Checklist

- [ ] Behavioral round connects with behavioral token
- [ ] Technical round connects with technical token
- [ ] Transcriptions show with correct agent colors
- [ ] Agent type appears in transcription debug info
- [ ] Switching between rounds doesn't mix tokens
- [ ] New agent type can be added without breaking existing ones

---

For full documentation, see `AGENT_TOKEN_ROUTING.md`
