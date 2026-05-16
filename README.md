# SwarmMind - Web Companion

## The On-Device Agent Swarm for Total Life Autonomy

This is the web companion demo for SwarmMind, showcasing the UI/UX design and agent swarm visualization. The actual mobile application runs entirely on-device with no server component.

## Features Demonstrated

### Free Tier
- **Email Digester Agent** - Single active agent that can parse bills and subscriptions
- **Basic Inbox** - View agent discoveries and alerts
- **Settings** - Configure integrations (email, calendar, finance)

### Premium Tier (One-time $49.99 unlock)
- **Full 7-Agent Swarm**:
  - Coordinator - Orchestrates all agents
  - Email Digester - Parses emails for important info
  - Calendar Guardian - Manages scheduling
  - Finance Analyst - Tracks spending & predicts cash flow
  - Negotiator - Drafts negotiation communications
  - Deal Hunter - Finds better deals on services
  - Memory & Reflection - Maintains knowledge vault

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   └── Button.tsx
│   ├── swarm/           # Swarm visualization components
│   │   ├── AgentNode.tsx
│   │   └── PremiumUnlockModal.tsx
│   └── inbox/           # Inbox display components
│       └── InboxCard.tsx
├── contexts/
│   └── SwarmContext.tsx # State management for swarm
├── pages/
│   └── Dashboard.tsx    # Main application screen
├── types/
│   └── swarm.ts         # TypeScript type definitions
└── lib/
    └── utils.ts         # Utility functions
```

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Mobile App Implementation

For the actual mobile application (iOS/Android), see the Flutter implementation which includes:
- On-device LLM inference via llama.cpp
- SQLite local database
- LanceDB vector store for semantic memory
- IMAP/CalDAV clients for email/calendar access
- Local receipt validation for premium unlock
- Background task scheduling

## Privacy Guarantee

This web demo is for UI/UX preview only. The actual SwarmMind app:
- ✅ Runs 100% on-device
- ✅ Zero data sent to servers
- ✅ No user accounts required
- ✅ All AI processing happens locally
- ✅ Credentials encrypted with device biometrics

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- date-fns

## License

Proprietary - All rights reserved
