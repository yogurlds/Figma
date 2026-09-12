# Ringfully — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Ringfully) · page `0:1`

## Frames on the canvas

| Frame | x, y | Size |
|---|---|---|
| Landing page `1:1413` | -3761, 0 | 1440x3811 |
| Business Phone `70:312` | -2241, 0 | 1440x4852 |
| Pricing `70:714` | -721, 0 | 1440x1912 |
| Contact Center Solution `106:635` | -3761, 5252 | 1440x5098 |
| Pricing — Contact Center `106:901` | -2241, 5252 | 1440x1912 |
| Demo request `106:768` | -721, 5252 | 1440x2360 |
| Integrations `151:1126` | 799, 5252 | 1440x3840 |
| Support `155:1145` | 2319, 5252 | 1440x1824 |
| App screens row 3 | -3761…5359, 10852 | 1440x900 each |
| Platform nested pages row 4 | -3761…2319, 12152 | see below |
| Resources nested pages row 5 | -3761…799, 16712 | see below |

The `Platform` and `Resources` category frames **no longer exist**. They were
empty shells standing in for nav categories; every entry in those two dropdowns
now has its own designed page, so the shells were deleted and row 1 closed up.
The categories are containers in the nav, not destinations.

### Canvas rows — check for overlap after ANY page height change

Rows are pitched off the **tallest frame in the row**, not a fixed guess:
row 1 at y=0 (tallest 4852), row 2 at y=5252 (tallest 5098), row 3 at y=10852
(tallest 900), row 4 at y=12152 (tallest 4160), row 5 at y=16712.

**A page that grows silently slides under the next row**, and a blank frame
then renders on top of real content. This happened: `Contact Center Solution`
grew from 1812 to 5098 and ran under `App — Login`, whose white frame hid rows
two and three of the features section — the mocks were all present and correct
but invisible. `Business Phone` likewise ran under `Pricing — Contact Center`,
hiding its own CTA and footer.

Section-level verification does not catch this. After any height change, assert
**zero overlaps across every top-level node** by comparing bounding boxes
pairwise.


### App screens (row 3, y=10852)

Real product UI, not screenshot placeholders. They intentionally carry **no
header or footer** — they are the web app, not marketing pages — and have no
prototype wiring. Drop them into the product-page carousels as needed.

| Frame | Node | x | Contents |
|---|---|---|---|
| App — Login (+3 states) | `116:992` … `166:1188` | -3761…799 | the login flow, below |
| App — Dashboard Home | `116:996` | 2319 | KPI tiles, live queue, agent status, activity |
| App — Analytics | `116:1000` | 3839 | filters, line chart, donut, hourly bars, queue table |
| App — Call Management / Architect | `116:1004` | 5359 | palette, flow canvas, inspector |

#### Shared app chrome

All three build on the same two pieces, cloned from Dashboard Home:

| Piece | Node | Spec |
|---|---|---|
| `App / Rail` | `198:2216` | 64px, `Ink`, logo mark, 6 icon slots, avatar pinned bottom |
| `App / Top bar` | `198:2233` | 56px white, 1px `Line` rule, title, search, org chip, action button |

To make a new screen: clone both, set the active rail slot to `WHITE @ 14%`
fill (and its glyph to `WHITE @ 95%`), reset the previously active one, and
retitle the top bar. Content starts at x=96, y≈88; the usable content width is
**1312px** (1440 − 64 rail − 2×32 gutter).

#### Chart construction

- **Donut** — one `ELLIPSE` per segment, all the same size and position, each
  with its own `arcData {startingAngle, endingAngle, innerRadius: 0.62}` and a
  **fill**. Start at `-PI/2` and accumulate. A `CARD`-filled full-circle arc
  behind them is the track.
- **Line series** — one `VECTOR` per series, see the path-normalisation rule
  below.
- **Bars** — plain frames. Do not reach for a vector.

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

### Business Phone section stack (`70:312`, 1440x4852)

| y | Section | Node |
|---|---|---|
| 0 | Navigation (last child, keeps dropdowns on top) | `70:313` |
| 164 | Hero / Split | `121:992` |
| 884 | Screens carousel (instance) | `132:1017` |
| 1564 | Features — 6 mini UI mocks | `130:992` |
| 2904 | FAQ — 6 static rows | `132:992` |
| 3716 | Closing CTA (cloned from Landing `58:230`) | `132:1035` |
| 4196 | Footer | `70:363` |

### Screens carousel (`128:1068`)

Component set at x=7400, property `Position` = 1..4. Each variant is 1440x680
with `clipsContent = true`, holding four 820x512 cards so the side ones crop at
the frame edge:

| Slot | x | Visible |
|---|---|---|
| Left neighbour | -550 | ~270px, cropped |
| Centre | 310 | full, drop shadow, no opacity fade |
| Right neighbour | 1170 | ~270px, cropped |
| Off-stage | 2030 | hidden |

`Position=N` puts screen N left, N+1 centre, N+2 right (mod 4), so clicking
steps 1-2-3 → 2-3-4 → 3-4-1 → 4-1-2. All three on-stage cards carry On Click →
Change To the next position, Smart Animate 300ms (12 reactions). The four dots
are decorative.

**Same dissolution risk as the `Header` set** — if a variant is dragged out of
the purple dashed container, all 12 `CHANGE_TO` reactions are silently stripped.
Recovery is the procedure documented above for the header.

Cards are dashed placeholders named after the four `App — *` frames.

### Support page (`155:1145`) — knowledge base

Deliberately **not** on the shared shell: it uses the template's own purple KB
header and compact KB footer instead of the `Header` / `Footer` components.

| y | Section |
|---|---|
| 0 | Purple hero — KB header row, `How can we help?`, search rule, ring graphic |
| 441 | What's new card — 5 release-note rows |
| 789 | 12 category cards, 4 columns x 3 rows |
| 1537 | 4 brand quick-link buttons |
| — | Legal paragraph, divider, KB footer |

Wiring: `Item / Support` (`80:636`) → this page, the KB wordmark → Landing
`1:1413` (so the prototype isn't a dead end), `CONTACT CUSTOMER CARE` → Demo
request `106:768`.

### Login portal flow (row 3, y=10852)

Four states wired with **frame navigation, not variants** — each state is a
whole screen, and frame targets have survived every breakage in this file.

| x | Frame | Node |
|---|---|---|
| -3761 | App — Login | `116:992` |
| -2241 | App — Login / Organization | `162:1183` |
| -721 | App — Login / Org selected | `166:1145` |
| 799 | App — Login / Region menu | `166:1188` |

22 On Click reactions:

```
Login ──More Login Options──> Organization ──Next──> Org selected
  ^                               |                      |
  |<──────Back to Login───────────                       |
  |<────────────Change Organization──────────────────────
  |
  └──[change]──> Region menu ──(16 regions or Log In)──> Login
```

Shared shell on all four: centred wordmark, white card with 44px input rows
(icon box + field), footer wordmark, copyright, and a bottom bar with
Terms / Privacy / Help and a Language select.

#### Decorative patterns: use real nodes, not one big vector

The org panel's honeycomb was first built as a single `VECTOR` with ~143
hexagon subpaths. Its bounding box measured correctly and covered the panel,
but it **rendered as a sliver and then not at all** — no error, just missing
geometry. Replaced with 80 `createPolygon()` nodes (`pointCount = 6`), which
render reliably.

Tiling a pointy-top hexagon: `height = width * 1.1547`, rows step at
`0.75 * height`, and **odd rows** offset by half a column — offsetting by
column instead produces a star pattern, not a honeycomb.

### Vector paths: hard-won rules

Figma's path parser accepts **`M` / `L` / `C` / `Q` / `Z` only, all absolute**:

- Relative commands throw `Failed to convert path. Invalid command at m`
- **Arcs throw too** — `Invalid command at A`. Draw circles as four cubic
  segments with control offset `r * 0.5523`
- When generating a path in a loop, keep every coordinate **numeric**. Using
  `toFixed()` makes `k` a string, so `cx + k` concatenates instead of adding
  and produces coordinates like `142.76` — the icon renders as a giant
  scribble across the card rather than erroring
- **Assigning `vectorPaths` re-normalises the geometry to the node's own
  bounding box.** Coordinates you wrote in parent space become box-local, so
  setting `x = 0, y = 0` afterwards parks the drawing in the top-left corner
  instead of where you meant. This silently misplaced the Agentic hero's
  connector lines. Fix: compute `minX`/`minY` of the points you generated and
  set `node.x = targetX + minX`, `node.y = targetY + minY`

### Integrations page stack (`151:1126`, 1440x3840)

| y | Section | Node |
|---|---|---|
| 0 | Navigation (last child) | — |
| 164 | Hero / Integrations — split, angled lavender panel | `150:1026` |
| 1064 | Popular integrations — 6 cards, 6th cropped, static arrows | `151:1026` |
| 1704 | Marketplace — 34 partner tiles, 6 columns | `151:1056` |
| 2704 | Closing CTA | cloned from `132:1035` |
| 3184 | Footer | — |

Partner tiles show the partner **name in neutral grey type** as a stand-in for
the real logo SVG. The prev/next arrows are present but unwired.

`Item / Integration` (`80:643`) in the Platform dropdown navigates here; the
other six Platform entries still point at `70:446`.

### Contact Center Solution section stack (`106:635`, 1440x5098)

| y | Section | Node |
|---|---|---|
| 0 | Navigation (last child) | `106:730` |
| 164 | Hero / Diagram | `139:1009` |
| 1130 | Screens carousel (instance) | `144:1009` |
| 1810 | Features — 6 contact-centre mocks | `140:1009` |
| 3150 | FAQ | `143:1011` |
| 3962 | Closing CTA | `144:1027` |
| 4442 | Footer | `106:647` |

Mocks: Live queue, Agent status, Real-time coaching, CSAT surveys, Workforce
scheduling, Quality scorecards — deliberately different from Business Phone's
six so the product pages don't read as duplicates.

#### Diagram hero construction

- The headline is **one text node with two fill ranges** (`setRangeFills`) —
  brand `#4F46E5` on the leading phrase, ink on the rest.
- The dotted texture is a **single `VECTOR`** whose path is generated by a loop
  at runtime (32x16 = 512 diamonds, ~25KB of path data). One node instead of
  512 ellipses.
- **Figma's path parser accepts absolute commands only.** Relative `m`/`l`
  throw `Failed to convert path. Invalid command at m`. Every generated path
  must use absolute `M`/`L`/`Z`.
- Donut gauges are `ELLIPSE` nodes with `arcData.innerRadius` around 0.62 and a
  **fill**, not a stroke — `innerRadius: 0` with a stroke draws a pie wedge, not
  a ring.

No page is a shell any more. In every marketing page the **header instance is
the last child** so dropdowns draw above page content, and every page ends with
a `Section / Closing CTA` (cloned from `132:1035`) plus a `Footer` instance.

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

Dropdown entries (13) — **every one now lands on its own designed page**, all
`NAVIGATE` + Dissolve 150ms:

| Panel | Entry | Node | Destination |
|---|---|---|---|
| Product | Business Phone | `73:637` | Business Phone `70:312` |
| Product | Contact Center Solution | `73:640` | Contact Center Solution `106:635` |
| Platform | Support | `80:636` | Support `155:1145` |
| Platform | Privacy | `80:639` | Platform — Privacy `182:1383` |
| Platform | Integration | `80:643` | Integrations `151:1126` |
| Platform | Developers | `80:646` | Platform — Developers `184:1502` |
| Platform | API's | `80:650` | Platform — API's `186:1621` |
| Platform | Overview | `80:653` | Platform — Overview `177:1145` |
| Platform | AI | `80:657` | Platform — AI `180:1264` |
| Resources | Documentation | `73:660` | Documentation `188:1740` |
| Resources | Blog | `73:663` | Blog `190:1859` |
| Resources | Agentic | `73:667` | Agentic `192:1978` |
| Resources | InboundCX University | `73:670` | InboundCX University `194:2097` |

The entries live **inside the `Header` component set variants**, so editing one
propagates to every page's header instance. After any change, verify in a
separate call and assert that no reaction still targets a deleted frame.

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

## Nested pages (rows 4 and 5)

Nine pages, one per nav entry that used to point at a shell. Each was given a
**deliberately different section stack** — the brief was explicitly "don't make
the same thing for all the pages" — while staying inside the same tokens, the
80px gutters and the shared header/CTA/footer.

### Row 4 — Platform (y=12152)

| Page | Node | x | Size | Stack |
|---|---|---|---|---|
| Platform — Overview | `177:1145` | -3761 | 1440x4160 | split hero w/ card collage · ink stat band · three-layer diagram · 3 alternating zig-zag rows · logo strip |
| Platform — AI | `180:1264` | -2241 | 1440x3620 | full-bleed ink hero w/ glow · 3 capability cards · 5-node call timeline · guardrails split w/ dark config panel · quote card |
| Platform — Privacy | `182:1383` | -721 | 1440x3660 | compact hero w/ 4 compliance badges · two-column long-form + contents rail · 12-region residency grid · subprocessor table |
| Platform — Developers | `184:1502` | 799 | 1440x3440 | hero w/ terminal panel · ink quickstart strip · 6 SDK cards · 3 build-idea cards · community band |
| Platform — API's | `186:1621` | 2319 | 1440x3320 | narrow centred hero w/ search · endpoint explorer (method pills + request/response panels) · 6 webhook events · limits + versioning |

### Row 5 — Resources (y=16712)

| Page | Node | x | Size | Stack |
|---|---|---|---|---|
| Resources — Documentation | `188:1740` | -3761 | 1440x3120 | search hero w/ suggestion chips · 6 category cards · numbered popular-articles list · browse-by-product row |
| Resources — Blog | `190:1859` | -2241 | 1440x3180 | slim hero w/ category pills · large featured split card · 3x2 post grid · ink newsletter band |
| Resources — Agentic | `192:1978` | -721 | 1440x3280 | centred hero over an agent graph · 3-point explainer · **mixed-height** resource cards · oversized stat band |
| Resources — InboundCX University | `194:2097` | 799 | 1440x3280 | ink hero w/ overlapping enrolment card · 3 path cards w/ progress bars · 6-row course catalogue · certification band |

Recurring pieces, so the set still reads as one site: the CTA is always a clone
of `132:1035`, the footer always an instance of `69:336`, and the header always
an instance of `11:2` placed **last**.

## Demo request (`106:768`, 1440x2360)

Rebuilt from a shell into a conversion page — form-first rather than
hero-first, which is why it does not carry a closing CTA.

| y | Section |
|---|---|
| 0 | Navigation (last child) |
| 164 | `Hero / Demo form` — left value column (4 ticked benefits, quote, logo row), right 560px white form card |
| 1064 | What happens next — 3 numbered steps |
| 1444 | Trust band — 4 facts |
| 1704 | Footer |

The form card carries first/last name, work email, company, phone, a company-size
select, a two-option product-interest radio, `Book my demo`, legal microcopy and
a phone fallback.

## Next

The carousel rotation animation is not built yet. Advancing it means promoting
each card up one slot (Active -> Peek (previous) -> Peek (earlier) -> out) and
bringing the next queued stage in at Active, driven by Smart Animate on an
After Delay trigger. The tab switching in the Use cases section works the same
way — swap which video slot is visible alongside the active tab styling.
