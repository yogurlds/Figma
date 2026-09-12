# Ringfully — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Ringfully) · page `0:1`

## Tokens

| Token | Value | Used for |
|---|---|---|
| Brand | `#4F46E5` | Primary buttons, logo mark, active toggle, pill outlines, active tab rule |
| Ink | `#1E1B4B` | All text, announcement bar |
| Card | `#F7F5FF` | Feature card fills |
| Panel | `#F5F4FB` | Carousel card content panels |
| Tint | `#EAE7FD` | Step badges, avatars |
| Line | `#E4E1F4` | Chip borders, inactive tab rules |
| Wash | `#FFF -> #F1EDFE` | Left-to-right gradient behind header / hero / carousel |

Typeface: **Hanken Grotesk** (Regular, Medium, SemiBold, Bold).
Content width for section bodies: **1034px**, centred.
Sections carry 84px internal padding top and bottom, so butting them together
yields 168px between content blocks.

## Landing page (`1:1413`, 1440x5288) vertical stack

| y | Section | Node |
|---|---|---|
| 0 | Header (component instance) | `11:3` — master `11:2` |
| 164 | Hero: toggle, headline, subhead, single CTA | `15:192` |
| 683 | Hero carousel (stacked call-flow cards) | `23:192`, stage `23:193` |
| 1043 | How it works: heading, subhead, pill, 3 feature cards | `30:230` |
| 1618 | Use cases: heading, pill, video stack, 4 tabs | `47:230` |
| 2675+ | Original template sections | unchanged |
| 5024 | Footer | `1:1448` |

**All children are pinned to `MIN` vertical constraints.** The footer originally
had `MAX`, so growing the frame dragged it down by the same amount. If you
resize the frame again, keep the constraints on `MIN` or content will drift.

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

## Use cases section (`47:230`)

Four 1034x574 video placeholders stacked at the same position inside `Media`,
one per tab. Only the first is visible; the rest are hidden, ready to be
swapped as the active tab changes.

| Tab | Video slot | State |
|---|---|---|
| Appointment booking | `47:237` | visible (active) |
| Order and delivery status | `47:245` | hidden |
| Billing and payments | `47:253` | hidden |
| After-hours coverage | `47:261` | hidden |

**Drop the videos into these four frames.** Each is a plain frame with a
gradient fill and a centred placeholder mark — replace the fill with the video
and delete the `Placeholder` child.

Tab columns are 239px wide with 26px gutters. The active tab has a 2px brand
top rule and full-opacity text; inactive tabs have a 1px `Line` rule and text
at 0.38 / 0.35 opacity.

## Next

The carousel rotation animation is not built yet. Advancing it means promoting
each card up one slot (Active -> Peek (previous) -> Peek (earlier) -> out) and
bringing the next queued stage in at Active, driven by Smart Animate on an
After Delay trigger. The tab switching in the Use cases section works the same
way — swap which video slot is visible alongside the active tab styling.
