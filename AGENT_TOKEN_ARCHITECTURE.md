# Agent Token Routing - Data Flow & Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Interview Application                         │
└──────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼──────────┐   ┌────────▼──────────┐
         │  Behavioral Round   │   │ Technical Round   │
         │    (Behavioral.tsx) │   │  (Technical.tsx)  │
         └──────────┬──────────┘   └────────┬──────────┘
                    │                       │
         ┌──────────▼─────────────────────────▼──────────┐
         │         LiveKitWidget Component              │
         │  (src/components/ai_avatar/LiveKitWidget)    │
         └──────────┬──────────────────────────┬────────┘
                    │                          │
                    │ agentType                │ agentType
                    │ BEHAVIORAL               │ TECHNICAL
                    │                          │
         ┌──────────▼────────────┐   ┌────────▼──────────┐
         │  getAgentConfig()     │   │  getAgentConfig() │
         │  (agentTokenService)  │   │  (agentTokenService)
         └──────────┬────────────┘   └────────┬──────────┘
                    │                         │
              ┌─────▼─────┐             ┌────▼─────┐
              │   Token:  │             │   Token: │
              │ BEHAVIOURAL│             │ TECHNICAL│
              │   Room:   │             │   Room: │
              │behavioral │             │   "ai"  │
              └──────┬────┘             └────┬────┘
                     │                       │
         ┌───────────▼──────────────────────▼────────┐
         │      LiveKitRoom Connection               │
         │   (VITE_LIVEKIT_URL)                     │
         └───────────┬──────────────────────┬────────┘
                     │                      │
         ┌───────────▼──────┐    ┌─────────▼────────┐
         │   behavioral     │    │       ai         │
         │   Room on        │    │   Room on        │
         │   LiveKit        │    │   LiveKit        │
         │   Server         │    │   Server         │
         └──────────────────┘    └──────────────────┘
                    │                      │
         ┌──────────▼──────────────────────▼──────────┐
         │       AvatarVoiceAgent Component           │
         │  - Receives agentType                      │
         │  - Receives roomName                       │
         └──────────┬──────────────────────┬──────────┘
                    │                      │
                    │ Transcriptions with  │ Transcriptions with
                    │ agentType="behavioral"│ agentType="technical"
                    │                      │
         ┌──────────▼──────────────────────▼──────────┐
         │     Global Transcription Store             │
         │  (useTranscriptions.ts)                    │
         │                                            │
         │  Message {                                │
         │    id, text, speaker,                    │
         │    agentType, roomName,  ← NEW!         │
         │    isFinal                               │
         │  }                                        │
         └──────────┬──────────────────────┬────────┘
                    │                      │
                    └──────────┬───────────┘
                               │
         ┌─────────────────────▼────────────────────┐
         │   TranscriptionDisplay Component         │
         │  - Color-coded by agent type             │
         │  - Shows agent info in transcription     │
         │  - Displays correct room context         │
         └──────────────────────────────────────────┘
```

## Token Routing Flow

### Scenario 1: User Enters Behavioral Round

```
User navigates to
Behavioral Interview
    │
    ▼
Behavioral.tsx renders
    │
    ├─ Pass AgentType.BEHAVIORAL to LiveKitWidget
    │
    ▼
LiveKitWidget receives agentType={AgentType.BEHAVIORAL}
    │
    ├─ Call getAgentConfig(AgentType.BEHAVIORAL)
    │
    ▼
agentTokenService returns:
{
  type: "behavioral",
  token: "eyJ...BEHAVIOURAL_TOKEN...",
  room: "behavioral",
  agentName: "HR Specialist",
  description: "AI Agent"
}
    │
    ▼
LiveKitRoom connects with:
- serverUrl: VITE_LIVEKIT_URL
- token: VITE_LIVEKIT_BEHAVIOURAL_TOKEN
- room: "behavioral"
    │
    ▼
AvatarVoiceAgent receives:
- agentType: "behavioral"
- roomName: "behavioral"
    │
    ▼
All transcriptions tagged with:
- agentType: "behavioral"
- roomName: "behavioral"
    │
    ▼
TranscriptionDisplay shows with:
- Green gradient avatar (Behavioral)
- Agent type indicator
- Room context
```

### Scenario 2: User Enters Technical Round

```
User navigates to
Technical Discussion
    │
    ▼
TechnicalDiscussion.tsx renders
    │
    ├─ Pass AgentType.TECHNICAL to LiveKitWidget
    │
    ▼
LiveKitWidget receives agentType={AgentType.TECHNICAL}
    │
    ├─ Call getAgentConfig(AgentType.TECHNICAL)
    │
    ▼
agentTokenService returns:
{
  type: "technical",
  token: "eyJ...TECHNICAL_TOKEN...",
  room: "ai",
  agentName: "Technical Expert",
  description: "AI Agent"
}
    │
    ▼
LiveKitRoom connects with:
- serverUrl: VITE_LIVEKIT_URL
- token: VITE_LIVEKIT_TECHNICAL_TOKEN
- room: "ai"
    │
    ▼
AvatarVoiceAgent receives:
- agentType: "technical"
- roomName: "ai"
    │
    ▼
All transcriptions tagged with:
- agentType: "technical"
- roomName: "ai"
    │
    ▼
TranscriptionDisplay shows with:
- Blue/Purple gradient avatar (Technical)
- Agent type indicator
- Room context
```

## Component Dependency Tree

```
App
├── Behavioral.tsx (Round 4)
│   ├── LiveKitWidget
│   │   ├── agentTokenService.getAgentConfig()
│   │   ├── LiveKitRoom
│   │   │   ├── AvatarVoiceAgent
│   │   │   │   ├── useVoiceAssistant()
│   │   │   │   ├── useTrackTranscription()
│   │   │   │   └── setGlobalTranscriptions()
│   │   │   └── RoomAudioRenderer
│   │   └── Error handling
│   ├── TranscriptionDisplay
│   │   └── useInterviewTranscriptions()
│   │       └── globalTranscriptions (from AvatarVoiceAgent)
│   └── Progress/Timer/Controls
│
├── TechnicalDiscussion.tsx (Round 2)
│   ├── LiveKitWidget
│   │   ├── agentTokenService.getAgentConfig()
│   │   ├── LiveKitRoom
│   │   │   ├── AvatarVoiceAgent
│   │   │   │   ├── useVoiceAssistant()
│   │   │   │   ├── useTrackTranscription()
│   │   │   │   └── setGlobalTranscriptions()
│   │   │   └── RoomAudioRenderer
│   │   └── Error handling
│   ├── TranscriptionDisplay
│   │   └── useInterviewTranscriptions()
│   │       └── globalTranscriptions (from AvatarVoiceAgent)
│   └── Progress/Timer/Controls
```

## Environment Variables Flow

```
.env File
├── VITE_LIVEKIT_URL
│   └─ Used by: LiveKitWidget (getLiveKitUrl())
│
├── VITE_LIVEKIT_API_KEY
│   └─ Used by: LiveKit backend (not in widget)
│
├── VITE_LIVEKIT_API_SECRET
│   └─ Used by: Token generation (backend)
│
├── VITE_LIVEKIT_TECHNICAL_TOKEN
│   └─ Used by: agentTokenService
│       └─ Returned by: getAgentConfig(AgentType.TECHNICAL)
│           └─ Passed to: LiveKitRoom component
│
└── VITE_LIVEKIT_BEHAVIOURAL_TOKEN
    └─ Used by: agentTokenService
        └─ Returned by: getAgentConfig(AgentType.BEHAVIORAL)
            └─ Passed to: LiveKitRoom component
```

## Transcription Message Flow

```
User speaks
    │
    ▼
LiveKit captures audio
    │
    ├─ User voice → Microphone Track
    └─ Agent voice → Audio Track
    │
    ▼
useTrackTranscription() & useVoiceAssistant()
    │
    ├─ Create userTranscriptions array
    └─ Create agentTranscriptions array
    │
    ▼
AvatarVoiceAgent.useEffect()
    │
    ├─ Combine user + agent transcriptions
    ├─ Tag each with agentType (behavioral/technical)
    ├─ Tag each with roomName (behavioral/ai)
    ├─ Sort by firstReceivedTime
    │
    ▼
setGlobalTranscriptions(allMessages)
    │
    ├─ Update globalTranscriptions array
    └─ Notify all subscribers
    │
    ▼
TranscriptionDisplay (via useInterviewTranscriptions)
    │
    ├─ Subscribe to changes
    ├─ Render messages with agent-specific styling
    │   ├─ Green avatar for behavioral
    │   └─ Blue avatar for technical
    └─ Show agent type and room info
```

## Security & Isolation

```
┌────────────────────────────────────────────────────────┐
│             LiveKit Server Infrastructure              │
├────────────────────────────────────────────────────────┤
│                                                        │
│  ┌──────────────────┐        ┌──────────────────┐    │
│  │ Room: "ai"       │        │ Room: "behavioral"│   │
│  ├──────────────────┤        ├──────────────────┤    │
│  │ Token: TECHNICAL │        │ Token: BEHAVIORAL│    │
│  │ ├─ room: "ai"    │        │ ├─ room:         │    │
│  │ │ ✓ canPublish   │        │ │  "behavioral"  │    │
│  │ │ ✓ canSubscribe │        │ │ ✓ canPublish   │    │
│  │ └─ ISOLATED      │        │ │ ✓ canSubscribe │    │
│  │                  │        │ └─ ISOLATED      │    │
│  └────────────────┬─┘        └───────┬──────────┘    │
│                   │                  │                │
│                   │ NO ACCESS TO      │ NO ACCESS TO   │
│                   │ "behavioral"      │ "ai"           │
│                   │                  │                │
│  Technical Agent  │                  │ Behavioral Agent│
│  Only sees "ai"   │                  │ Only sees       │
│  traffic          │                  │ "behavioral"    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Error Handling Flow

```
LiveKitWidget tries to connect
    │
    ├─ getAgentConfig(agentType)
    │   │
    │   ├─ Success? → Get token from .env
    │   │             │
    │   │             └─ Token exists? → Use it
    │   │                               │
    │   │                               └─ Connect to room
    │   │
    │   └─ Error? → setError()
    │               │
    │               └─ Show error message
    │
    ├─ Token empty? → setError()
    │                 │
    │                 └─ Show "Token not configured"
    │
    └─ Connection fails? → onDisconnected()
                          │
                          └─ Reset UI, allow retry
```

---

This architecture ensures:
1. ✅ Token isolation per agent type
2. ✅ Room segregation for security
3. ✅ Proper transcription context tracking
4. ✅ Easy extension for new agents
5. ✅ Clear error messages and debugging
6. ✅ Type safety with TypeScript
