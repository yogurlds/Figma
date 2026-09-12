# Ringfully — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Ringfully) · page `0:1`

## Tokens

| Token | Value | Used for |
|---|---|---|
| Brand | `#4F46E5` | Primary buttons, logo mark, active toggle, pill outline, accents |
| Ink | `#1E1B4B` | All text, announcement bar, outline-button borders |
| Card | `#F7F5FF` | Feature card fills |
| Panel | `#F5F4FB` | Carousel card content panels |
| Tint | `#EAE7FD` | Step badges, avatars |
| Line | `#E4E1F4` | Chip and card borders |
| Wash | `#FFF -> #F1EDFE` | Left-to-right gradient behind header / hero / carousel |

Typeface: **Hanken Grotesk** (Regular, Medium, SemiBold, Bold).

## Landing page (`1:1413`) vertical map

| y | Section | Node |
|---|---|---|
| 0 | Header (component instance) | `11:3` — master `11:2` |
| 164 | Hero: toggle, headline, subhead, CTAs | `15:192` |
| 683 | Hero carousel (stacked call-flow cards) | `23:192`, stage `23:193` |
| 1371 | How it works (pending — see script) | not yet built |

## Carousel stage cards (components)

| Step | Component |
|---|---|
| 01 Incoming call | `17:204` |
| 02 AI receptionist answers | `17:222` |
| 03 Caller intent detected | `17:235` |
| 04 Call routed to the right queue | `18:204` |
| 05 Agent receives the call with context | `18:221` |
| 06 Transcript / summary generated | `18:234` |

All normalised to 440x171. Slots 1-3 are visible in the stack (100% / 90% scale
at 70% opacity / 81% scale at 40% opacity); slots 4-6 are parked hidden behind
slot 1 as the upcoming rotation states.

## Pending

`03-section-how-it-works.js` is written but **not yet applied** — the Figma MCP
Starter-plan tool-call limit was reached before it could run. Re-run it via the
`use_figma` tool once the limit resets.
