# Silver Fox Mac App Build Plan

## Architecture Recommendation
- macOS app: SwiftUI (AppKit bridge only when needed)
- Auth + sync backend: Supabase or Firebase (email/password + realtime sync)
- Local caching: SwiftData/CoreData for offline-first behavior
- Launch/deeplink handling: NSWorkspace + URL schemes

## Module Breakdown
1. App Shell
- Full-screen elder dashboard
- Caregiver editor mode with PIN lock

2. Button Engine
- Action abstraction for web/call/message/app/automation
- Immediate-open execution policy

3. Accessibility System
- Text size presets
- High contrast palette
- Reduced motion token switch

4. Account and Sync
- Email/password auth
- Role-based access for elder/caregiver
- Remote updates reflected in elder dashboard

5. Telemetry and Success Metrics
- Local + server event logging:
  - button_press
  - task_completed
  - mistap (open then immediate back/cancel)
- Weekly elder in-app survey prompts

## API Endpoints (Draft)
- POST /auth/register
- POST /auth/login
- GET /profiles/:id
- PATCH /profiles/:id/settings
- GET /profiles/:id/buttons
- POST /profiles/:id/buttons
- PATCH /buttons/:id
- DELETE /buttons/:id
- POST /profiles/:id/access-links

## Security and Guardrails
- Editor actions require unlocked state + caregiver permissions
- Passwords handled by provider, never stored raw
- Optional device trust for elder Mac

## v1 Delivery Phases
1. Prototype (completed in web preview)
2. SwiftUI parity implementation
3. Backend auth/sync integration
4. Pilot with 5-10 elder/caregiver pairs
5. Tune UI via survey + usage telemetry

## Success Metrics
- Ease score >= 4/5 at day 7
- Confidence score >= 4/5 at day 7
- >= 90% completion for top 5 tasks without help
- < 1 mis-tap per 10 actions
- Caregiver first setup (8 buttons) under 20 minutes
