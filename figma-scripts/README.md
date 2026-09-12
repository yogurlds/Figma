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
| 1371 | How it works: heading, subhead, pill button, 3 feature cards | `30:230` |

## Carousel stage cards (components)

| Step | Component |
|---|---|
| 01 Incoming call | `17:204` |
| 02 AI receptionist answers | `17:222` |
| 03 Caller intent detected | `17:235` |
| 04 Call routed to the right queue | `18:204` |
| 05 Agent receives the call with context | `18:221` |
| 06 Transcript / summary generated | `18:234` |

All normalised to 440x171.

The stack reads top-to-bottom as the call progresses: earlier stages recede
upward showing only their header row, the active stage sits full-size at the
front. Layer order is furthest-back first so the active card lands on top.

| Slot | Stage | Scale | y | Content opacity |
|---|---|---|---|---|
| Peek (earlier) | 1 | 0.85 | 0 | 0.40 |
| Peek (previous) | 2 | 0.92 | 52 | 0.65 |
| Active | 3 | 1.00 | 108 | 1.00 |

Stages 4-6 are parked hidden at the active position as the upcoming rotation
states. Peek cards keep frame opacity at 1 and fade their `Header` / `Content`
children instead — a translucent frame lets the card behind bleed through.

## Next

The rotation animation is not built yet. The slot structure above is the
starting state; advancing it means promoting each card up one slot (Active ->
Peek (previous) -> Peek (earlier) -> out) and bringing the next queued stage in
at Active, driven by Smart Animate on an After Delay trigger.

## Known gap

~250px of whitespace sits between the How it works section (ends y=1946) and the
next template section (starts y=2198), slightly wider than the other section
gaps. Tightening it means shifting the remaining template sections up.
