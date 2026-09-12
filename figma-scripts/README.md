# Ringfully — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Ringfully) · page `0:1`

## Frames on the canvas

| Frame | x | Size |
|---|---|---|
| Landing page `1:1413` | -3761 | 1440x3811 |
| Product `70:312` | -2241 | 1440x1753 |
| Platform `70:446` | -721 | 1440x1812 |
| Resources `70:580` | 799 | 1440x1753 |
| Pricing `70:714` | 2319 | 1440x1727 |

The original Article, Shop, Product detail page and About frames were deleted.
The four replacement pages are shells: header instance, page hero (title,
subhead, Request a Quote), a dashed content placeholder, and footer instance.

## Components

| Component | Node | Size |
|---|---|---|
| Navigation / Header | `11:2` | 1440x164 |
| Footer | `69:336` | 1440x656 |
| Stage 1-6 carousel cards | `17:204`, `17:222`, `17:235`, `18:204`, `18:221`, `18:234` | 440x171 |

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

## Landing page (`1:1413`, 1440x3811) vertical stack

| y | Section | Node |
|---|---|---|
| 0 | Header (component instance) | `11:3` — master `11:2` |
| 164 | Hero: toggle, headline, subhead, single CTA | `15:192` |
| 683 | Hero carousel (stacked call-flow cards) | `23:192`, stage `23:193` |
| 1043 | How it works: heading, subhead, pill, 3 feature cards | `30:230` |
| 1618 | Use cases: heading, pill, video stack, 4 tabs | `47:230` |
| 2675 | Closing CTA: gradient banner card, white pill button | `58:230` |
| 3155 | Footer (component instance) | `69:337` — master `69:336` |

The original template sections below the Use cases section are **hidden, not
deleted** (`1:1513`, `1:1526`, `1:1527`, `1:1537`, `1:1514`, `1:1515`, `1:1417`,
`1:1418`, `1:1542`, and the old footer `1:1448`). Toggle them back on in the
layers panel if any are still wanted.

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

## Closing CTA (`58:230`) and Footer (`59:230`)

The CTA card is 1280x300, radius 24, filled with a three-stop diagonal gradient
(`#1E145A -> #33249E -> #4F46E5`). The light sweep is a white ellipse at 16%
opacity with a 90px layer blur, clipped by the card.

The footer (`69:336`) is full-bleed `Ink`, 1440x656, in three bands:

1. Five 224px link columns at 40px gutters. Columns 4 and 5 carry a second
   heading group (SUPPORT, LEGAL). Link text is white at 72% opacity; headings
   are 13px Bold with +4% tracking.
2. A 1280x150 banner card, radius 16, fill `#F6F3FC`, with a 44px Bold brand
   headline and an arrow vector on the right.
3. A bottom bar: copyright and legal links on the left, five social icons on
   the right (white containers with ink glyphs).

It is a component, instanced on all five page frames.

## Next

The carousel rotation animation is not built yet. Advancing it means promoting
each card up one slot (Active -> Peek (previous) -> Peek (earlier) -> out) and
bringing the next queued stage in at Active, driven by Smart Animate on an
After Delay trigger. The tab switching in the Use cases section works the same
way — swap which video slot is visible alongside the active tab styling.
