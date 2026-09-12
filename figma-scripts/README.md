# Ringfully — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Ringfully) · page `0:1`

## Frames on the canvas

| Frame | x, y | Size |
|---|---|---|
| Landing page `1:1413` | -3761, 0 | 1440x3811 |
| Business Phone `70:312` | -2241, 0 | 1440x1753 |
| Platform `70:446` | -721, 0 | 1440x1812 |
| Resources `70:580` | 799, 0 | 1440x1753 |
| Pricing `70:714` | 2319, 0 | 1440x1912 |
| Contact Center Solution `106:635` | -3761, 4200 | 1440x1812 |
| Pricing — Contact Center `106:901` | -2241, 4200 | 1440x1912 |
| Demo request `106:768` | -721, 4200 | 1440x1753 |

### App screens (row 3, y=6500)

Blank holding frames for Ringfully web-app screenshots, to be placed into the
product pages later. They intentionally carry **no header or footer** — they are
product UI, not marketing pages — and have no prototype wiring.

| Frame | Node | x, y | Size |
|---|---|---|---|
| App — Login | `116:992` | -3761, 6500 | 1440x900 |
| App — Dashboard Home | `116:996` | -2241, 6500 | 1440x900 |
| App — Analytics | `116:1000` | -721, 6500 | 1440x900 |
| App — Call Management / Architect | `116:1004` | 799, 6500 | 1440x900 |

Each holds one dashed `Placeholder` (1280x400) reading the screen name and
`Drop screenshot here` — delete it once the screenshot is pasted in.

### Business Phone hero (`Hero / Split`, `121:992`)

The Business Phone page uses a split hero instead of the centred shell:
1440x720 at y=164, horizontal gradient white → `#EFEAFD` with a blurred
brand-tint ellipse behind the visual.

| Element | Spec |
|---|---|
| Left column `Copy` | x=80, vertically centred |
| Headline | 56px Regular, −3% tracking, measure 540, wraps to 2 lines |
| Subhead | 19px Regular at 80% opacity, measure 510 |
| `Start free trial` | Primary, navigates to Pricing `70:714` |
| `Talk to sales` | Secondary, navigates to Demo request `106:768` |
| `App screenshot` | 650x620 dashed placeholder, right edge at x=1360 |

Drop a screenshot into `App screenshot` and delete its two label layers.

Contact Center Solution, Platform, Resources and Demo request
are shells: header instance, page hero (title, subhead, CTA), a dashed content
placeholder, and footer instance. In every page the **header instance is the
last child** so dropdowns draw above page content.

The two Pricing frames carry the real pricing section (below).

## Pricing page (`70:714`)

`Section / Pricing` (`81:635`) at y=164: eyebrow, title, subhead, a two-product
segmented tab control, a product blurb, a MONTHLY/ANNUAL cycle toggle with a
currency selector, then the plan cards.

Cards are 405px wide at 32px gutters, heights equalised per row.

| Row | Node | Plans | Default |
|---|---|---|---|
| Business Phone plans | `82:635` | Standard $25 · Pro $40 | visible |
| Contact Center plans | `82:695` | Basic $75 · Full $115 · AI Powered $150 | hidden |

### The product tabs are two frames, not a toggle

Each Pricing frame shows one plan row with its own tab styled active, and the
inactive tab navigates to the other frame:

| Frame | Visible row | Inactive tab navigates to |
|---|---|---|
| Pricing `70:714` | Business Phone plans | Pricing — Contact Center `106:901` |
| Pricing — Contact Center `106:901` | Contact Center plans | Pricing `70:714` |

This was chosen over component variants because frame targets have survived
every breakage in this file, while `CHANGE_TO` reactions have not.

**Caveat: pricing copy now lives in two frames.** Any price, plan name or
feature edit must be made in *both* Pricing frames or they will disagree.
Prices are placeholders.

## Header variants and navigation

The header is a variant set (`101:749`, named `Header`) with a single `State` property:

| Variant | Node | Dropdown |
|---|---|---|
| State=Default | `11:2` | none |
| State=Product | `101:635` | Business Phone · Contact Center Solution |
| State=Platform | `101:673` | Support · Privacy · Integration · Developers · API's · Overview · AI |
| State=Resources | `101:711` | Documentation · Blog · Agentic · InboundCX University |

Nav labels match the four page frames: Product, Platform, Resources, Pricing.

Dropdown panels are 655px wide, radius 20, two-column, absolutely positioned at
y=152 inside each variant. The variants stay 164px tall and the panel overflows,
so swapping state never changes layout. Each variant has `clipsContent = false`,
and **header instances are the last child of their page frame** so the panel
draws above page content.

### Do not put "/" in the component set name

The set was originally named `Navigation / Header`. Figma treats `/` as a
grouping path, which conflicts with variant naming — the set silently dissolved
between sessions, leaving four loose components with mangled names
(`Navigation / Header/Navigation/Header/Default`). Every `CHANGE_TO` reaction
was stripped at the same time, because its destination variant no longer
belonged to a set, while the `NAVIGATE` reaction on Pricing survived (it points
at a frame).

Keep the set name slash-free, and after any structural change **verify in a
separate call** that the set still exists and the reactions are still attached —
they read back fine immediately after being written, then disappear.

### Full interaction map (41 reactions, all On Click)

Per variant (7 x 4 = 28):

| Element | Action |
|---|---|
| Product / Platform / Resources | Change To that variant, Smart Animate 200ms |
| The already-open item | Change To Default (closes the menu) |
| Pricing | Navigate -> Pricing `70:714`, Dissolve 150ms |
| Logo | Navigate -> Landing `1:1413` |
| Try free (`Button / Secondary`) | Navigate -> Pricing `70:714` |
| Request a demo (`Button / Primary`) | Navigate -> Demo request `106:768` |

Dropdown entries (13): the two Product entries go to their own pages —
`Business Phone` -> `70:312`, `Contact Center Solution` -> `106:635`. Platform
panel (7) -> Platform `70:446`, Resources panel (4) -> Resources `70:580`.

The footer's `Book a demo` (`69:298`) also navigates to Demo request `106:768`.

### Overlays are not an option — do not retry

Prototype overlays would be immune to the dissolution problem below, but
`overlayPositionType`, `overlayBackground` and `overlayBackgroundInteraction`
are all **read-only on `FrameNode`** in the plugin API. An overlay-based nav
cannot be wired end to end from a script; it needs three switches set by hand
in the Prototype panel per overlay frame.

### If the dropdowns stop working again

Symptom: Pricing still navigates but Product / Platform / Resources do nothing.
Cause: the component set dissolved (a variant was dragged out of the purple
dashed container), which invalidates every `CHANGE_TO` destination and makes
Figma delete those reactions silently. `NAVIGATE` reactions survive because they
target frames. Recovery, as one scripted pass:

1. Rename the four loose components to `State=Default` / `Product` / `Platform`
   / `Resources` (strip any `Header/` prefix Figma added).
2. `figma.combineAsVariants([...], figma.currentPage)`; name the set `Header`
   with **no `/`** in the name.
3. Re-apply the 41 reactions above.
4. Verify in a **separate tool call** — reactions read back as correct
   immediately after writing even when they have not persisted.

Never set `layoutMode`, `resize()` or reposition individual variants on the set;
move the whole set with `set.x` / `set.y` instead.

## Components

| Component | Node | Size |
|---|---|---|
| Header (variant set) | `101:749` | 1440x164 per variant |
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
