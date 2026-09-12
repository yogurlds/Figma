# Inbound CX — Figma design notes

Figma file: `RRfHYjJ1gZDmk7uxDzikwO` (Inbound CX) · page `0:1`

## Frames on the canvas

| Frame | x, y | Size |
|---|---|---|
| Landing page `1:1413` | -3761, 0 | 1440x3891 |
| Business Phone `70:312` | -2241, 0 | 1440x4852 |
| Pricing `70:714` | -721, 0 | 1440x1912 |
| Contact Center Solution `106:635` | -3761, 5252 | 1440x5098 |
| Pricing — Contact Center `106:901` | -2241, 5252 | 1440x1912 |
| Demo request `106:768` | -721, 5252 | 1440x2360 |
| Integrations `151:1126` | 799, 5252 | 1440x3840 |
| Support `155:1145` | 2319, 5252 | 1440x1824 |
| Login states row 3 | -3761…799, 10852 | 1440x900 each |
| Platform nested pages row 4 | -3761…2319, 12152 | see below |
| Resources nested pages row 5 | -3761…799, 16712 | see below |
| Business Phone app row 6 | -3761…6879, 20392 | 1440x900 each |
| Contact Center app row 7 | -3761…6879, 21692 | 1440x900 each |

The `Platform` and `Resources` category frames **no longer exist**. They were
empty shells standing in for nav categories; every entry in those two dropdowns
now has its own designed page, so the shells were deleted and row 1 closed up.
The categories are containers in the nav, not destinations.

### Canvas rows — check for overlap after ANY page height change

Rows are pitched off the **tallest frame in the row**, not a fixed guess:
row 1 at y=0 (tallest 4852), row 2 at y=5252 (tallest 5098), row 3 at y=10852
(tallest 900), row 4 at y=12152 (tallest 4160), row 5 at y=16712 (tallest 3280),
row 6 at y=20392 (900), row 7 at y=21692.

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

Row 3 now holds **only the four login states** (`116:992`, `162:1183`,
`166:1145`, `166:1188`). The old generic `App — Dashboard Home`,
`App — Analytics` and `App — Call Management / Architect` were **deleted** —
they predated the product split and misrepresented both products. The app UI
now lives in rows 6 and 7, below.

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

Cards are dashed placeholders named after the four old `App — *` frames.

> **Open follow-on.** Both product pages instance this *same* set
> (`132:1017` on Business Phone, `144:1009` on Contact Center), and its cards
> still name the three deleted generic screens. Now that each product has its
> own four app screens (rows 6 and 7), the set should be duplicated into two
> product-specific sets and each instance repointed. Until that is done, both
> marketing pages show the same generic placeholders.

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

Shared shell on all four: centred wordmark, a glass card with 44px input
capsules (icon box + field), footer wordmark, copyright, and two floating glass
capsules along the bottom — Terms / Privacy / Help, and the Language select.

#### Liquid Glass material (all four login states)

The login flow is the one place in the file built on Apple's **Liquid Glass**
material rather than the flat marketing style. Figma has no `glassEffect()`;
the equivalent is assembled by hand, and this recipe is the reusable one:

| Layer | Value |
|---|---|
| Fill | linear gradient 45°, `#FFF @ 50%` → `#FFF @ 26%` (panels) · `@ 62%` → `@ 44%` (inputs) · `@ 38%` → `@ 18%` (floating chrome) |
| Tinted variant | same gradient on `#4F46E5` — `@ 96%` → `@ 78%` for the primary button, `@ 62%` → `@ 38%` for the org panel |
| Effect | `{type:'BACKGROUND_BLUR', radius: 18–46}` — the refraction. **This is the whole effect**; without it the node is just a translucent rectangle |
| Effect | `DROP_SHADOW` ink @ 18%, y+18, r40 — lifts the pane off the wallpaper |
| Effect | `INNER_SHADOW` white @ 55%, y+1, r1 — the top specular lip |
| Effect | `INNER_SHADOW` ink @ 10%, y−1, r2 — the bottom contact shade |
| Stroke | 1px **gradient** paint, white 70% → 18% → 8% at 45°, `strokeAlign = 'INSIDE'` — the rim light that sells it |
| Radius | 28 panels · 20–26 controls and popovers · 22–24 capsules |

`BACKGROUND_BLUR` only renders when three things are true: the node's fill is
translucent, there is content **behind it inside the same clipping context**,
and the node sits above that content in z-order. All three are satisfied by the
`Backdrop` frame described below.

**Backdrop** — first child of every login frame, and deliberately
**monochromatic**. It was first built from four hues (brand, violet, a warm
amber and a coral); that read as too playful for a sign-in screen, so it is now
one hue moved only in *value* and *opacity*:

| Role | Value | Placement |
|---|---|---|
| Light | `#857DF0` | upper-left lift |
| Brand | `#4F46E5` | core glow, directly behind the card |
| Deep | `#2E2691` | lower-right weight |
| Wash | `#E8E5FD` | base gradient endpoint, from white |

Each glow is a `GRADIENT_RADIAL` whose stops fade the hue **out to alpha 0**
(0 / 0.45 / 1) — that is what gives the radiant fade. A modest `LAYER_BLUR`
(70–90) only smooths banding; it is not doing the work. The core glow sits
behind the card because that is where refraction reads. Glow centres are
offset slightly per frame so the four states are not identical.

> **Set `clipsContent = true` on the page frame first.** The blur radii are
> larger than the blobs' margins, so an unclipped frame bleeds colour across
> the canvas and onto the neighbouring login states.

Chrome colour follows the field, not a rule. The centred wordmark sits on the
mid-value core glow and stays **white**; the footer wordmark and copyright sit
bottom-left where the field fades to near-white, so they are **ink at 62% / 48%**
— white was illegible there once the backdrop went monochrome. Body text stays
ink `#1E1B4B` on the light glass, and the card fill was raised to 50% white
specifically so that text keeps its contrast. Legibility set these values, not
the other way round.

#### Restyling these frames: mutate, never rebuild

**22 prototype reactions live on nodes inside the four login frames.** Deleting
and recreating a node destroys its reaction silently. Every glass change is
therefore applied in place — `fills`, `strokes`, `effects`, `cornerRadius`,
`x`/`y` only. After any restyle, re-assert all 22 read back with their original
destinations.

Layout changes the glass pass made:

- The full-bleed `Bottom bar` became a **258x48 centred floating capsule**
  holding Terms · Privacy · Help, with `Language` and `Language select` moved
  into a new sibling `Language bar` capsule at x=1140. The `Divider` is hidden,
  not deleted.
- `Region popover` is now **468x264, two columns of eight rows**, so it clears
  the floating chrome instead of running to y=882 and colliding with it.
- On `Org selected`, the card and org panel are one slab: per-corner radii
  (`topLeftRadius`/`bottomLeftRadius` on the card, right corners on the panel)
  with the seam left as a glass joint. The 80-hexagon pattern drops to 14%
  opacity so it reads as texture suspended inside the tinted glass.

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

## Responsive breakpoints

The file now carries three widths across four Figma pages.

| Page | Contents |
|---|---|
| `01 · Source — Desktop 1440` | the original 18 marketing pages, 4 login states, 16 app screens, article system, all components |
| `02 · Desktop — 1920` | 18 letterbox pages |
| `03 · Desktop app` | `App Window` set, 16 wrapped screens, sizing spec |
| `04 · Mobile — 390 / 412` | mobile kit and 18 page pairs |

### 1920 — letterbox, and why not a shift script

1920 − 1440 = 480, so centring the original 1440 content canvas means moving
everything in by **240** and stretching only the full-bleed backgrounds. The
result is a max-width column centred in a full-bleed band — the standard
responsive pattern, and the literal reading of "identical to the big screen".

**Constraints alone do not do this reliably, and neither does a naive shift.**
Three things were learned the hard way:

1. A recursive `x += 240` rule needs the **original** parent width. Once the
   parent has been resized, every full-bleed child fails the width test and gets
   shifted instead of stretched.
2. The file has four cases, not two. A **left-anchored partial** (the Business
   Phone hero's copy panel at x=0, w=720) is neither bleed nor centred content;
   shifting it leaves a white strip against the edge of a full-bleed hero.
3. **Six containers are auto-layout, not one.** `Hero`, `Section / How it works`,
   `Section / Use cases`, `Section / Closing CTA`, `Navigation` and `Footer` all
   have `layoutMode = 'VERTICAL'`. Setting `x` on an auto-layout child is
   **silently ignored** — position comes from padding. This is why early attempts
   produced siblings with identical constraints and different geometry.

The transform that works, per node, comparing the clone against its 1440 source:

```
letterbox(clone, src, oldParentW, newParentW):
  delta = (newParentW - oldParentW) / 2
  if clone is auto-layout:
      paddingLeft  = src.paddingLeft  + delta      # children reflow themselves
      paddingRight = src.paddingRight + delta
      handle layoutPositioning === 'ABSOLUTE' children explicitly
      return
  for each (child, srcChild) paired BY NAME:
      if srcChild is bleed → resize to newParentW, x = 0, recurse
      else                 → x = srcChild.x + delta, restore srcChild's width
```

**Pair by name, never by index.** `detachInstance()` reorders children, so an
index-paired walk silently compares the wrong nodes and reports success.

Radial glows are excluded by name (`glow|blob|sweep|wash|ring|tail|halo`) — a
stretched `GRADIENT_RADIAL` becomes an ellipse.

The 1920 set is **deliberately static**: top-level instances are detached and
every inherited reaction stripped, because `clone()` copies reactions *including
their destinations* and the nav would otherwise navigate back to the 1440 pages.
Do not "fix" this by re-adding wiring.

### Desktop application shell

`App Window` (`378:3927`), a slash-free variant set with `OS = macOS | Windows`
and a `Title` **text component property** bound to each variant's title node.

| | macOS | Windows 11 |
|---|---|---|
| Bar | 28px | 32px |
| Controls | 12px traffic lights from x=20, 8px gaps | 46×32 caption buttons, right |
| Title | centred, 12 SemiBold @62% | left at x=16, 12 Medium @72% |
| Window | 1440×928 | 1440×932 |

The 16 app screens were **converted to components in place** and each window
holds exactly two instances — a screen and a chrome. No screen content is
duplicated, and the bare screens still exist on page 01.

Sizing: default **1440×900** content, minimum **1280×800** (Contact Center
usable width 1152, existing layout fits), maximum unbounded. A smaller minimum
was rejected: below 1280 the CC rail plus wallboard would need redesigning, and
a declared number you cannot honour is worse than none.

### Mobile — 390 and 412

Eighteen pages at each width, **36 frames**, built as one responsive layout
rendered twice rather than two designs.

| | 1440 | Mobile |
|---|---|---|
| Width | 1440 | **390** iPhone / **412** Android |
| Gutter | 80 | **20** |
| Content | 1280 / 1034 | **350** / **372** |
| Section padding | 84 | **44** |
| Header | 164 | **56** |
| Heading / sub / body / eyebrow | 56 / 22 / 18 / 11 | **28 / 18 / 16 / 11** |
| Grids | 4-col, 6-col, 3x2 | **1 column** |

#### The pages are composed, not transformed

A geometric transform works at 1920 because nothing reflows. At 390 everything
does, and eighteen pages have eighteen different section structures. So each
mobile page is **composed from content extracted out of its 1440 source**:

1. Walk the source section, sorting children by absolute `y` then `x` — reading
   order, not layer order.
2. Classify each leaf: a **card** is a filled, rounded frame 170–700 wide that
   contains text; **media** is anything ≥240×90 with no text; everything else is
   a text run.
3. Classify text by its source size and tracking — ≤13 with ≥3% tracking is an
   eyebrow, ≥30 is the heading, ≥20 a subhead, the rest body.
4. Re-render into a 390 auto-layout column with the mobile scale.

Every string comes from the source node — **nothing is retyped** — which is what
makes the copy-parity assertion meaningful. Repeats are de-duplicated per
section, so a label that appeared in four columns appears once.

#### Auto-layout is what makes 412 nearly free

Pages are `layoutMode='VERTICAL'` with children set to `FILL`, so Android is
`clone()` + `resize(412, h)`. Two things are required for that to hold:

- **No text node may be `textAutoResize = 'WIDTH_AND_HEIGHT'`.** FILL does
  nothing to such a node and the page silently fails to reflow. Asserted
  recursively — currently 3051 text nodes, zero violations.
- **Media needs a fixup pass.** `setTargetAspectRatio()` **does not exist** in
  this plugin API version (reading the property throws), so after the clone each
  `Media` frame's height is multiplied by 372/350 by hand.

The header is appended **last** with `layoutPositioning='ABSOLUTE'` *and*
`constraints.horizontal='STRETCH'` — without STRETCH it stays 390 wide on a 412
page, which is subtle enough to ship unnoticed.

#### Gotcha: `resize()` resets `primaryAxisSizingMode`

Setting `primaryAxisSizingMode='AUTO'` and then calling `resize()` silently
reverts it to `FIXED`, and the frame stops hugging — it sat at its placeholder
height instead. **Set the sizing mode after the resize, never before.**

#### Mobile kit and wiring

| Component | Node | Size |
|---|---|---|
| `M / Header` | `381:3922` | 390x56 — logo + hamburger |
| `M / Nav drawer` | `381:3966` | 390x884 — 17 destinations |
| `M / Footer` | `381:4001` | 390x330 — stacked columns |

**16 reactions**, all `NAVIGATE` (frame targets have survived every breakage in
this file; `CHANGE_TO` has not): the hamburger is wired **once on the header
master**, so all 18 pages inherit it; 14 drawer rows reach their mobile page;
close returns to Landing. `101:749` was never opened.

`setReactionsAsync` now requires the **`actions` array**, not the old singular
`action` field — the singular form throws.

### Closing CTA is now a component

It had been cloned into **14** pages independently; at three breakpoints that
would have become 42 copies. Now `Marketing / Closing CTA` (`355:3794`) with 14
instances. It carried no reactions, which made the swap safe.

## Components

| Component | Node | Size |
|---|---|---|
| Header (variant set) | `101:749` | 1440x164 per variant |
| Footer | `69:336` | 1440x656 |
| Stage 1-6 carousel cards | `17:204`, `17:222`, `17:235`, `18:204`, `18:221`, `18:234` | 440x171 |
| Brand / Mark | `323:2765` | 879x529 |
| Brand / Mark — White | `325:2789` | 879x529 |
| Brand / Wordmark | `330:2771` | 948x132 |
| Brand / Logo | `330:2778` | 211x32 |
| Brand / Logo — Ink | `334:2773` | 211x32 |
| Brand / Logo — White | `330:2785` | 211x32 |

## Tokens

| Token | Value | Used for |
|---|---|---|
| Brand | `#4F46E5` | Primary buttons, brand mark, active toggle, pill outlines, active tab rule |
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
| 683 | **Hero motion** (animated instance, 440 tall) | `301:2728` — set `300:2770` |
| 1123 | How it works: heading, subhead, pill, 3 feature cards | `30:230` |
| 1698 | Use cases: heading, pill, video stack, 4 tabs | `47:230` |
| 2755 | Closing CTA: gradient banner card, white pill button | `58:230` |
| 3235 | Footer (component instance) | `69:337` — master `69:336` |

Frame height is **3891**. The old static `Hero carousel` `23:192` is **hidden,
not deleted** — it sits behind the new block at y=683 and can be switched back
on if the motion is ever dropped.

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

## Hero motion (`300:2770`) — the animated home hero

The home hero's call-flow visual is an auto-playing 6-state variant set, built
from `ASSET — Inbound CX Hero Motion — Stages 1–6` (`286:1979`).

**Read that asset's `description` before touching this.** The asset is a flat
2x3 contact sheet of the six cards — it is *not* the hero composition. Its
description is the actual spec: current stage in the foreground, two older
stages behind and to the right, new stages entering from the left over 650ms,
looping 6→1, and it names its six source components. The hero therefore
instances **those same sources** (`17:204`, `17:222`, `17:235`, `18:204`,
`18:221`, `18:234`) rather than nesting the sheet, so editing a stage card
updates the asset and the hero together.

Set at (9100, 1000), six variants `Stage=1` … `Stage=6`, each 1440x440.

### Slots

Every variant holds **all six** stage instances, named `Stage 1` … `Stage 6`
identically across variants — Smart Animate matches layers by name, so without
that there is nothing to tween. Only the slot changes:

| Slot | x | y | scale | opacity |
|---|---|---|---|---|
| `IN` — next up, off-frame left | -380 | 135 | 1.00 | 0 |
| `FRONT` — current | 220 | 135 | 1.00 | 1 |
| `BACK1` — one older | 520 | 95 | 0.92 | 0.62 |
| `BACK2` — two older | 760 | 60 | 0.84 | 0.35 |
| `OUT` — retired | 1180 | 30 | 0.76 | 0 |

For variant *N*: stage *N* is FRONT, *N−1* BACK1, *N−2* BACK2, *N+1* IN, the
rest OUT. Layer order is painted furthest-back first so the current card lands
on top.

**Park with opacity 0, never `visible = false`.** On the 6→1 loop a card has to
travel from OUT on the right back to IN on the left. Both endpoints are at
opacity 0, so Smart Animate tweens that traverse invisibly. Hiding the node
instead makes it pop into place.

### Wiring

Six reactions: `AFTER_TIMEOUT` 2.2s → `CHANGE_TO` the next variant,
`SMART_ANIMATE` 650ms (the duration the asset specifies), `Stage=6` → `Stage=1`.

Same dissolution risk as every other set in this file — the name is
`Hero motion` with **no slash**, and dragging a variant out of the purple
container strips all six reactions silently. Verify in a separate call.

## Article template (row 8, y=22992)

`Article — Template` `292:2055` at x=-3761. Not a static page — a small system
for reformatting articles: an assembled example, draggable body blocks, and
shared text styles.

### It is the only auto-layout page in the file, and that needed a trick

Every other page is absolutely positioned with the header as last child so its
dropdown draws on top. Auto-layout ties layer order to visual order, so a
header first in the flow would sit **behind** the article.

The fix: the page frame is auto-layout VERTICAL with `paddingTop = 164`, and
the `Navigation` instance is appended **last** with
`layoutPositioning = 'ABSOLUTE'` at (0,0). An absolutely-positioned child
leaves the flow but keeps its z-order — so the header pins to the top, draws
above everything, and the page still hugs its content. Delete a paragraph and
the frame shortens by itself.

```
Article — Template        auto-layout V, paddingTop 164, hug   292:2055
├─ Article                                                     292:2056
│  ├─ Section / Article hero      531   pill · H1 · lead · byline
│  ├─ Section / Hero image        650   1280x560 + caption
│  ├─ Body                       2843   15 block instances     292:2075
│  ├─ Section / Author bio        223
│  ├─ Section / Related posts     510   3 cards
│  ├─ Section / Closing CTA       480   clone of 132:1035
│  └─ Footer                      656   instance of 69:336
└─ Navigation                           ABSOLUTE at (0,0), last child
```

Body measure is **800px** centred (1440 − 2×320) — a comfortable line length
at 18px.

### Text styles — the file's first

Eight `Article / …` styles: Eyebrow (Bold 10 +6%) · H1 (Regular 46 −3%) ·
H2 (SemiBold 28 −1.5%) · H3 (SemiBold 20 −1%) · Lead (Regular 22) ·
Body (Regular 18, lh 1.75) · Quote (Regular 26 −1%) · Caption (Regular 13).

All eight are **bound** to real nodes (60 in the page alone), so editing one
style restyles every article built from these blocks. The creation script looks
each style up by name before creating, so re-running it never duplicates.

### Block components — drag these in from Assets

Twelve, all 800 wide, auto-layout, hugging, at x=-2100 down from y=22992:

| Block | Node | Block | Node |
|---|---|---|---|
| Heading 2 | `287:1980` | Image + caption | `291:2059` |
| Heading 3 | `287:1983` | Callout | `291:2063` |
| Paragraph | `287:1986` | Key takeaways | `291:2078` |
| Pull quote | `287:1992` | Inline CTA | `291:2084` |
| Bulleted list | `287:2006` | Divider | `291:2087` |
| Numbered list | `287:2020` | Data table | `291:2128` |

To reformat an article: edit the text in place, drag blocks from Assets into
`Body`, delete what you do not need. The page reflows on its own.

### Wiring

Seven `NAVIGATE` reactions from the Blog page open the article — the
`Featured post` card and all six `Post` cards.

### Two bugs this build produced, both worth remembering

- **A dead `else` branch leaked four empty frames onto the canvas.**
  `else { const rl = figma.createFrame(); }` — a node created and never
  appended is auto-added to the current page at (0,0). The canvas overlap
  assertion caught it: 18 new top-level nodes when 13 were expected. **Never
  create a node you do not immediately append.**
- The same dead branch meant the data table shipped without row dividers.
  Fixed with per-side stroke weights (`strokeBottomWeight = 1`, the other three
  `0`) on every row but the last.

## No invented customers

Fabricated social proof has been stripped out: the Demo request testimonial and
its attributed job title, the four wordmarks under it, and the six wordmarks in
the Platform — Overview logo strip. That strip is now six dashed `Logo slot`
placeholders under a neutral `Customer logos` label — the layout slot survives
for real logo assets without the page claiming customers that do not exist.

Three references to invented companies remain **on purpose**, and are not logo
or endorsement slots:

| Where | Text | Why it stays |
|---|---|---|
| The 16 app screens (rows 6 and 7) | Halcyon Logistics, Lumen Retail, Meridian Care | sample CRM records inside a product screen, same as the fake phone numbers — a dialer has to show *some* contact |
| Platform — AI, `Quote card` | attributed testimonial | still a fabricated endorsement — **remove or replace before this goes near a real audience** |
| Resources — Blog, post 4 | "Meridian Health answers 3,400 calls a night" | placeholder editorial headline, reads as a fake case study |

## Brand — the rebrand to Inbound CX

The company was renamed from the old brand to **Inbound CX**. Only the name and
the artwork changed: colour, typography, layout and copy are untouched.

### The artwork is real, not a redraw

Both marks were supplied as SVGs and dropped straight into the file. Everything
is sourced from the **lockup** (`ASSET — Inbound CX logo (source SVG)`), which
traces to only 15 vectors and carries a clean mark *and* the real wordmark, so
nothing had to be re-typeset. The favicon SVG traces to 130 vectors and is kept
only as the export original.

An earlier hand-drawn reconstruction of the mark took six iterations and was
then thrown away when the real files arrived. Both of its components are gone.
Do not resurrect them — the SVG sources are on the canvas.

### The six components

| Component | Node | What it is |
|---|---|---|
| `Brand / Mark` | `323:2765` | the mark alone, brand purple |
| `Brand / Mark — White` | `325:2789` | the same, white — for brand-filled tiles and dark grounds |
| `Brand / Wordmark` | `330:2771` | "Inbound CX" as one vector, counters knocked through |
| `Brand / Logo` | `330:2778` | horizontal lockup, all brand purple — the supplied artwork |
| `Brand / Logo — Ink` | `334:2773` | brand mark + `#1E1B4B` wordmark — the light-ground default |
| `Brand / Logo — White` | `330:2785` | all white — dark and photographic grounds |

The supplied lockup is **stacked**; every placement in this file is a horizontal
bar under 46px tall, so the logo component re-arranges the same artwork side by
side rather than re-drawing it. Mark and wordmark sit at a 14px gap, wordmark
optically centred against a full-height mark.

The **Ink** variant exists because the old lockup was already two-tone — brand
spark, ink wordmark. Keeping that split means the rebrand swapped artwork only,
not the colour treatment of any page.

They live in a column at `-3761, 29500` with the two SVG sources below them.

### Where each one is used

| Placement | Component | Height |
|---|---|---|
| `Header` nav bar, 4 variants | Logo — Ink | 26 |
| Landing page, 4 use-case round marks | Mark — White | 22 in a 72px brand circle |
| 4 login frames, hero | Logo — White | 46 |
| 4 login frames, footer | Logo — Ink at 62% opacity | 26 |
| Support KB hero wordmark | Logo — White | 20, with `KNOWLEDGE BASE` re-flowed after it |
| Support footer wordmark | Logo — Ink | 15 |
| `BP / Top bar` tile, 8 screens | Mark — White | 16 wide inside the 26px brand tile |
| `CC / Rail` tile, 8 screens | Mark — White | 18 wide inside the 28px brand tile; the overlaid `R` letter was deleted |

**Not** replaced: the frames merely *named* `Mark` that are generic icons — four
compliance badges on Platform — Privacy, six SDK icons on Platform — Developers,
six course icons on the University page. A `Mark`-named frame is not
automatically a brand mark; the reliable signal was the old `Spark` STAR.

### Text rename: apply most-specific first

129 text nodes across 57 distinct strings. Running a bare
`old -> Inbound CX` first would have produced `Inbound CX.com` and
`INBOUND CX CX | CONTACT CENTER`, so the rules run longest-match first:
the six domains, then `notice@`, then the package strings
(`@…/node`, `pip install`, `gem install`, `composer require`, `com.…:sdk`),
then `…-Version`, then `… CX` (the old product name — it collapses to plain
`Inbound CX`), then the bare word.

Technical strings deliberately keep the compact spelling: `api.inboundcx.com`,
`@inboundcx/node`, `github.com/inboundcx`, `com.inboundcx:sdk`. Prose and
headings take `Inbound CX` with the space.

### Three things this pass got wrong first

**`rescale()` distorted a flattened boolean.** Scaling the wordmark vector
directly produced 303x6.4 instead of 144x20 — an aspect of 47 against the
correct 7.2. Fix: make the wordmark its own **component** and scale an
*instance*. Instance `rescale()` is reliable; scaling a freshly flattened
boolean is not.

**`getNodeByIdAsync` resolves deleted nodes.** Checking
`if (!await figma.getNodeByIdAsync(id))` reported the superseded components as
still present long after they were removed. Test `node.parent === null` — or
better, walk the page and check membership.

**A `SECTION`'s subtree materialises lazily.** Each full-page walk surfaced
more nodes inside `Inbound CX / Use-case workflows` that the previous walk had
not seen, so a single rename pass kept leaving stragglers. Fix: loop the
rename-then-rescan until a pass finds nothing, then read back once more in a
separate call.

Also: `figma.subtract` takes the **bottom-most node in z-order** as the base,
not the first element of the array. `parent.insertChild(0, base)` before
subtracting, or the result comes out the size of a counter.

## The two product apps (rows 6 and 7)

The app UI is **two separate products**, not one generic dashboard, because
they are sold to different people:

- **Business Phone** — one person or a small team making **outbound** calls
  with light analytics. It deliberately contains no queue, SLA, IVR, WFM, QA
  or API surface. If one of those words appears on a BP screen, it is a bug.
- **Contact Center Solution** — SMB to enterprise, the full CCaaS surface plus
  agentic AI.

Every screen exists in a **Day** and a **Night** theme: 16 frames, all
1440x900.

| Product | Screen | Day | Night |
|---|---|---|---|
| BP | Dialer | `244:1978` | `278:1978` |
| BP | Calls & contacts | `249:1978` | `278:2152` |
| BP | Analytics | `250:1978` | `278:2287` |
| BP | Voicemail & SMS | `251:1978` | `278:2398` |
| CC | Supervisor wallboard | `252:1978` | `278:2544` |
| CC | Agent workspace | `255:1978` | `278:2772` |
| CC | IVR flow designer | `259:1978` | `278:2935` |
| CC | Quality & WFM | `261:1978` | `278:3175` |

Day frames sit at x = -3761, -2241, -721, 799; Night frames at x = 2319, 3839,
5359, 6879 in the same row.

### The chrome differs on purpose

The navigation itself signals who each product is for. Do not unify them.

| Product | Chrome | Source node |
|---|---|---|
| Business Phone | **No rail.** 72px top bar: wordmark, five text tabs, search, `+ New call`, avatar. Reads as a light tool. | `BP / Top bar` `244:1979` |
| Contact Center | 64px `Ink` left icon rail (8 slots) **plus** a 56px top bar with queue selector, environment chip and agent-state control. Reads as a platform. | `CC / Rail` `252:1979`, `CC / Top bar` `252:2000` |

Clone the chrome onto a new screen, then set the active slot/tab and retitle.
BP content starts at x=32 under a 72px bar; CC content at x=96 (64 rail + 32
gutter) under a 56px bar, usable width **1312px**.

### Day / Night tokens

Flat surfaces — **no gradient wallpaper**. That belongs to the login flow only.

The surfaces are **warm neutral greys, not tinted indigo**. The first version
used a lavender ground and an indigo `#19163A` card surface; an area audit
showed that surface alone covering ~8M px², which made every screen read as a
saturated purple field. Brand belongs in the accents, not the substrate.

| Token | Day | Night |
|---|---|---|
| Ground | `#F5F4F2` | `#141312` |
| Surface / card | `#FFFFFF` | `#1E1D1B` |
| Tile / raised | `#F1F0ED` | `#272523` |
| Rail **fill** | `#242320` | `#100F0E` |
| Tint (brand badges) | `#E9E6F2` | `#343230` |
| Hairline | `#E7E5E1` | `#35332F` |
| Text | `#1E1B4B` | `#FFFFFF` |
| Brand — fills | `#4F46E5` | `#4F46E5` (unchanged) |
| Brand — text and icons | `#4F46E5` | **`#7C74F0`** |
| Chart neutral — strong | `#DAD8D4` | `#3A3835` |
| Chart neutral — mid / light | `#E4E2DE` / `#EDEBE7` | `#302E2B` / `#282623` |
| Positive | `#3E8E6E` | `#5FB894` |
| Negative | `#CC5F5C` | `#E38A87` |

Note that `#1E1B4B` is text-only now. The rail used the same value as a large
fill, which is why it became `#242320` while the text token was left alone —
the remap below is type-aware precisely so those two can diverge.

### Brand marks one value

**In any set of repeated data marks, the set is neutral and only the active,
peak or current member is brand.** A 36-bar waveform, a 24-bar stacked chart
and a 36-cell schedule grid were all fully brand-coloured at first; that is
what made the screens shout. Applied to:

| Screen | Set | Brand marks |
|---|---|---|
| BP Dialer · Voicemail | waveform bars | the played portion |
| BP Analytics | donut segments | the largest slice |
| BP Analytics | teammate `connected %` | the best performer |
| CC Wallboard | stacked hour bars | the peak hour |
| CC Quality | coverage grid cells | the current hour column |
| CC IVR designer | palette icons | the AI group |

Brand is kept unconditionally on primary buttons, the active tab or rail slot,
the active control, single-series line charts, progress rings, the AI badge and
tool chips. Brand fills per theme dropped from **231 to 126** doing this.

**`#7C74F0` is a new token.** `#4F46E5` as small text or a hairline on a
near-black ground is too dim to read; filled buttons keep the true brand,
everything else lifts.

Glass appears on exactly two floating elements — the BP recording toast and the
Architect simulator panel. Everything else is solid with a hairline.

### Building Night: clone and remap, never rebuild

Each Night frame is a `clone()` of its Day frame with a recursive token remap,
so the two themes cannot drift apart structurally. Three rules make it work:

1. **The map is type-aware.** A `TEXT` fill of `#1E1B4B` becomes white; the
   same colour as a *frame* fill is the rail and becomes `#14112E`. One map for
   text, one for fills, one for strokes.
2. **Only remap paints at full opacity.** Any paint with `opacity < 1` is a
   decorative overlay — white rail glyphs at 38%, brand waveform bars at 22%,
   tinted status badges at 12%. Remapping those destroys them. This single rule
   is what keeps the rail glyphs and every tint badge alive.
3. **Node opacity is not paint opacity.** `node.opacity = 0.6` is untouched by
   the pass and carries the muted-text hierarchy across for free.
4. **Opacity-guard decorative colour, never semantic colour.** Rule 2 skips
   translucent paints, which is right for tints and overlays — but it also
   skipped the `POS @ 12%` / `NEG @ 12%` badge fills behind *ON A CALL*, *LIVE*,
   *PASSED* and the needs-attention dots, leaving vivid old greens and reds
   stranded on an otherwise neutral screen. Status colour carries meaning, so
   it gets a second pass that remaps it **at any opacity**. The first audit
   after the remap is what caught this; 28 paints needed fixing.

Two things the colour map cannot infer are handled by node name: `Canvas grid`
(ink dots at 10% → white at 10%) and the glass panels (light-on-dark
translucent gradient). Drop shadows get remapped to pure black at roughly
double alpha.

After the pass, **assert no Day surface token survives in a Night frame**. The
expected leftovers are `#4F46E5` fills (brand buttons, correct) and `#FFFFFF`
*text* (labels on brand buttons, correct) — anything else is a miss.

## Nested pages (rows 4 and 5)

Nine pages, one per nav entry that used to point at a shell. Each was given a
**deliberately different section stack** — the brief was explicitly "don't make
the same thing for all the pages" — while staying inside the same tokens, the
80px gutters and the shared header/CTA/footer.

### Row 4 — Platform (y=12152)

| Page | Node | x | Size | Stack |
|---|---|---|---|---|
| Platform — Overview | `177:1145` | -3761 | 1440x4160 | split hero w/ card collage · ink stat band · three-layer diagram · 3 alternating zig-zag rows · empty logo strip |
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
| 164 | `Hero / Demo form` — left value column (4 ticked benefits), right 560px white form card |
| 1064 | What happens next — 3 numbered steps |
| 1444 | Trust band — 4 facts |
| 1704 | Footer |

The form card carries first/last name, work email, company, phone, a company-size
select, a two-option product-interest radio, `Book my demo`, legal microcopy and
a phone fallback.

## Next

The Use cases tab switching is still static — swapping which of the four video
slots is visible alongside the active tab styling would work the same way the
`Hero motion` set does: variants plus Smart Animate.

The product-page carousel split is also still open (see the Screens carousel
note above).
