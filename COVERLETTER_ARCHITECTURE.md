# Cover Letter Component - Architecture & Flow Diagrams

## 🏗️ Component Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     CoverLetter Component                       │
│                      (Main Container)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │   State Layer     │  │   Effects       │  │   Handlers  │ │
│  ├───────────────────┤  ├──────────────────┤  ├─────────────┤ │
│  │ • viewState       │  │ • Mount/Load     │  │ • Generate  │ │
│  │ • coverLetters[]  │  │ • Auto-dismiss   │  │ • Save      │ │
│  │ • formInputs      │  │   messages       │  │ • Delete    │ │
│  │ • generated       │  │                  │  │ • Edit      │ │
│  │ • suggestions[]   │  │                  │  │ • Refine    │ │
│  │ • analysis        │  │                  │  │ • Analyze   │ │
│  └───────────────────┘  └──────────────────┘  └─────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              View Rendering Layer                        │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                          │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │  │  List    │  │Generate  │  │ Preview  │  ...        │  │
│  │  │  View    │  │  View    │  │  View    │             │  │
│  │  └──────────┘  └──────────┘  └──────────┘             │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Service Layer (coverLetterService)             │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ • Gemini API Integration                               │  │
│  │ • LocalStorage Persistence                            │  │
│  │ • Template Management                                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Gemini 2.0 API  │
                    └──────────────────┘
```

## 📊 Data Flow Diagram

```
User Action
    │
    ▼
┌─────────────────────┐
│ Handler Function    │
│ (handleXxx)         │
└─────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│ Validate Input              │
│ • Check required fields     │
│ • Format data              │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│ Service Call                │
│ (coverLetterService)        │
│ • API Request to Gemini     │
│ • Process Response          │
│ • Handle Errors             │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│ Update State                │
│ • setGeneratedContent       │
│ • setCoverLetters           │
│ • setViewState              │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│ Persist Data                │
│ • Save to localStorage      │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│ Re-render UI                │
│ • Component Updates         │
│ • Show Success/Error        │
│ • Auto-dismiss (5s)         │
└─────────────────────────────┘
```

## 🔄 State Transitions

```
                          ┌─────────────┐
                          │  App Start  │
                          └──────┬──────┘
                                 │
                                 ▼
                        ┌────────────────┐
                        │   Load Data    │
                        │ from Storage   │
                        └────────┬───────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │    LIST VIEW (Home)    │
                    │ • Show all letters     │
                    │ • Show templates       │
                    └──┬────────────────┬───┘
                      │                │
        Click "New" ◄──┘                └──► Click "View"
              │                              │
              ▼                              ▼
    ┌─────────────────────┐        ┌──────────────────┐
    │  GENERATE VIEW      │        │  VIEW-DETAIL     │
    │ • Form for inputs   │        │  VIEW            │
    │ • Select template   │        │ • Full letter    │
    │ • Generate button   │        │ • Action buttons │
    └──────┬──────────────┘        └────┬─────────┬──┘
           │                           │         │
           ▼ Generate                  │         │
    ┌─────────────────────┐           │         │
    │  PREVIEW VIEW       │           │    Click "Edit"
    │ • Generated content │           │         │
    │ • Edit area         │           │         ▼
    │ • Quick actions     │           │    ┌──────────────┐
    └────┬────────┬───────┘           │    │  EDIT VIEW   │
         │        │                   │    │ • Edit area  │
    Save │        │ Get Suggestions   │    │ • Save/Discard│
         │        │                   │    └────┬─────────┘
         │        ▼                   │         │
         │   ┌────────────────┐       │         │ Save
         │   │  ANALYZE VIEW  │       │         │
         │   │ • Suggestions  │       │         │
         │   │ • Action items │       │         │
         │   └────────────────┘       │         │
         │                            │         │
         └────────┬──────────────────┘         │
                  │                            │
                  └──────────────────┬─────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │  Return to LIST     │
                          │  (with saved data)  │
                          └─────────────────────┘
```

## 🎯 Feature Flow Diagrams

### Feature 1: Create & Save Cover Letter

```
Start
  │
  ├─► Enter Company Name
  │
  ├─► Enter Job Position
  │
  ├─► (Optional) Enter Job Description
  │
  ├─► (Optional) Enter User Background
  │
  ├─► Select Template
  │
  ├─► Click "Generate with AI"
  │       │
  │       ├─► [Validate Inputs]
  │       │
  │       ├─► [Call Gemini API]
  │       │
  │       └─► Display Generated Content
  │
  ├─► Review Generated Letter
  │
  ├─► (Optional) Request Suggestions
  │
  ├─► (Optional) Refine with Feedback
  │
  ├─► Click "Save Letter"
  │       │
  │       ├─► [Create Unique ID]
  │       │
  │       ├─► [Add Metadata]
  │       │
  │       ├─► [Save to localStorage]
  │       │
  │       └─► Show Success Message
  │
  └─► Return to Home
```

### Feature 2: Get Suggestions & Refine

```
In Preview View
  │
  ├─► Click "Get Suggestions"
  │       │
  │       ├─► [Validate Letter Content]
  │       │
  │       ├─► [Call Gemini API]
  │       │
  │       └─► Switch to Analyze View
  │
  ├─► Review 5-7 Suggestions
  │
  ├─► Apply Changes Manually
  │
  ├─► Enter Refinement Feedback
  │
  ├─► Click "Refine with AI"
  │       │
  │       ├─► [Call Gemini API]
  │       │
  │       ├─► [Get Refined Content]
  │       │
  │       └─► Update Text Area
  │
  └─► Save Refined Letter
```

### Feature 3: Analyze Job Alignment

```
In Preview View
  │
  ├─► (Must have job description)
  │
  ├─► Click "Analyze Alignment"
  │       │
  │       ├─► [Validate Inputs]
  │       │
  │       ├─► [Call Gemini API]
  │       │
  │       ├─► [Parse Analysis]
  │       │
  │       └─► Display Results
  │
  ├─► Review Analysis Results:
  │   ├─ Alignment Score (0-100%)
  │   ├─ Matched Skills
  │   ├─ Missing Skills
  │   └─ Detailed Feedback
  │
  └─► Use Feedback to Refine
```

## 🗂️ File Structure & Dependencies

```
pathfinderAi/
│
├── src/
│   ├── pages/dashboards/skill-development/
│   │   └── CoverLetter.tsx ◄── Main Component
│   │       │
│   │       └── Imports:
│   │           ├── React hooks (useState, useEffect)
│   │           ├── lucide-react (Icons)
│   │           ├── UI components
│   │           │   ├── Button
│   │           │   └── Badge
│   │           ├── DashboardLayout
│   │           └── coverLetterService
│   │
│   ├── services/
│   │   └── coverLetterService.ts ◄── Service Layer
│   │       │
│   │       └── Imports:
│   │           └── @google/generative-ai
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   └── badge.tsx
│   │   └── DashboardLayout.tsx
│   │
│   └── lib/
│       └── utils.ts
│
├── .env.local ◄── Config (VITE_GEMINI_API_KEY)
│
├── tailwind.config.ts ◄── Styling config
│
└── package.json ◄── Dependencies
```

## 🔀 Component Lifecycle

```
MOUNT
  │
  ├─► useEffect ([] dependency)
  │   ├─► Load from localStorage
  │   ├─► Set coverLetters state
  │   └─► Load templates
  │
  ├─► useEffect ([error, success])
  │   ├─► If message exists
  │   ├─► Set 5-second timeout
  │   └─► Clear message
  │
  └─► Initial Render
      └─► LIST VIEW

USER INTERACTION
  │
  ├─► Event triggers handler
  ├─► Handler calls service
  ├─► Service makes API call
  ├─► Response updates state
  └─► Component re-renders

STATE CHANGES
  │
  ├─► viewState
  │   └─► Conditional rendering
  │
  ├─► coverLetters[]
  │   ├─► UI updates
  │   └─► Save to localStorage
  │
  ├─► generatedContent
  │   └─► Text area population
  │
  ├─► error/success
  │   ├─► Show notification
  │   └─► Auto-dismiss (5s)
  │
  └─► suggestions[]
      └─► Render analyze view

UNMOUNT
  │
  └─► useEffect cleanup
      └─► Clear timeouts
```

## 📱 View Rendering Logic

```
viewState.type
    │
    ├─► 'generate'
    │   └─► Generate View Component
    │       ├── Form Section
    │       └── Templates Section
    │
    ├─► 'preview'
    │   └─► Preview View Component
    │       ├── Editor Section
    │       └── Actions Panel
    │
    ├─► 'analyze'
    │   └─► Analyze View Component
    │       └── Suggestions List
    │
    ├─► 'edit'
    │   └─► Edit View Component
    │       ├── Edit Area
    │       └── Save/Discard
    │
    ├─► 'view-detail'
    │   └─► View Detail Component
    │       ├── Letter Display
    │       └── Action Buttons
    │
    └─► 'list' (default)
        └─► List View Component
            ├── Header Section
            ├── Saved Letters
            ├── Templates
            └── Pro Tips
```

## 🔌 Service Layer Architecture

```
┌──────────────────────────────────────┐
│     coverLetterService               │
│    (Singleton Pattern)               │
├──────────────────────────────────────┤
│                                      │
│  Private Properties:                 │
│  ├── genAI (GoogleGenerativeAI)     │
│  └── API_KEY (from env)             │
│                                      │
│  Core Methods:                       │
│  ├── generateCoverLetter()           │
│  ├── refineCoverLetter()             │
│  ├── getCoverLetterSuggestions()     │
│  ├── analyzeAlignment()              │
│  ├── optimizeForATS()                │
│  └── generateTailoredVariation()     │
│                                      │
│  Utility Methods:                    │
│  ├── getTemplates()                  │
│  ├── saveToLocalStorage()            │
│  ├── loadFromLocalStorage()          │
│  ├── generateId()                    │
│  └── getFormattedDate()             │
│                                      │
│  Private Methods:                    │
│  └── callGemini(prompt)             │
│      └─► Gemini 2.0 Flash API       │
│                                      │
└──────────────────────────────────────┘
```

## ⚡ Error Handling Flow

```
Operation Initiated
    │
    ▼
Try Block
    │
    ├─► Validate Input
    │
    ├─► Execute Operation
    │   └─► Network Request?
    │       └─► Network Error? → Catch Block
    │
    ├─► Process Response
    │   └─► Parse Error? → Catch Block
    │
    └─► Update State
        └─► Success ✓

Catch Block (on Error)
    │
    ├─► Extract Error Message
    │
    ├─► Set error state
    │
    ├─► Display Notification
    │
    ├─► Console Error Log
    │
    └─► Cleanup Resources

Auto-Dismiss (5s)
    │
    └─► useEffect triggers → Clear error
```

## 🎨 Styling Architecture

```
Base Layer (Tailwind)
    │
    ├─ Dark Mode: bg-slate-950
    ├─ Text: text-white, text-slate-300
    └─ Borders: border-slate-700/50
    │
Component Layer
    │
    ├─ Cards: rounded-2xl p-6 border
    ├─ Buttons: bg-gradient-to-r from-orange-500
    ├─ Badges: bg-orange-500/40
    └─ Inputs: bg-slate-900/50 border-slate-700
    │
Interactive Layer
    │
    ├─ Hover: hover:border-orange-500/40
    ├─ Focus: focus:border-orange-500/40
    ├─ Transitions: transition-all duration-300
    └─ Transforms: hover:scale-105
    │
Animation Layer
    │
    ├─ Loading: animate-spin
    ├─ Gradients: bg-gradient-to-r/br/tl
    └─ Blur: blur-3xl
```

---

**Last Updated**: October 24, 2025  
**Status**: ✅ Complete Architecture Documented
