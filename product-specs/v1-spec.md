# Silver Fox v1 Wireframe and UX Spec

## Product Goal
A one-screen Mac control center for seniors (85+, low tech comfort) that allows caregiver and elder customization while keeping day-to-day usage obvious and immediate.

## Primary Views

### 1) Elder View (default)
- Full-screen grid of large buttons.
- Each button includes:
  - Recognizable image/photo
  - Plain-language text label
  - Immediate open action (no confirm)
- Accessibility bar at top:
  - Text size preset
  - High contrast toggle
  - Reduced motion toggle

### 2) Caregiver View
- Protected by PIN lock.
- Editable list of buttons with fields:
  - Label
  - Action type
  - Target URL/deeplink
  - Image URL
  - Guidance hint text
- Add/delete/test buttons.
- Changes sync directly to Elder View.

## Interaction Rules
- Elder flow is zero-keyboard and one-click.
- Buttons should not move unexpectedly; layout remains stable.
- Images are strongly recommended for recognition.
- Caregiver lock prevents accidental edits.

## Layout Guidance
- Desktop-first for Mac.
- 6 to 12 buttons typical; unlimited in data model but paginated later if needed.
- Minimum target size >= 52px. Practical target in v1 is much larger (card buttons).

## Copy Guidance
- Use verb + person/place labels:
  - Call Lucy
  - Pharmacy Refill
  - Doctor Portal
- Avoid abstract wording like "Utilities" or "Services".

## Tiny Pasture-Inspired Choice
- Viable inspiration: persistent one-screen control board.
- Not copied: decorative motion-heavy aesthetics.
- Silver Fox intentionally uses calm, readable, static UI patterns.
