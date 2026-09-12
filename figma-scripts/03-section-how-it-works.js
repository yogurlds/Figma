// Ringfully — "How it works" section
// Structure: centred heading -> subhead -> outlined pill button -> 3 equal lavender cards
// Target: Figma file RRfHYjJ1gZDmk7uxDzikwO, Landing page frame 1:1413, y = 1371
// Replaces template nodes 1:1496 (Section heading) and 1:1497 (3-card row).
// Applied — section built as node 30:230 (1440x575).
// Run via the Figma MCP `use_figma` tool.

const INK   = { r: 0x1E/255, g: 0x1B/255, b: 0x4B/255 };
const BRAND = { r: 0x4F/255, g: 0x46/255, b: 0xE5/255 };
const CARD  = { r: 0xF7/255, g: 0xF5/255, b: 0xFF/255 };
const solid = c => [{ type: 'SOLID', color: c }];
const F = 'Hanken Grotesk';

for (const s of ['Regular', 'SemiBold', 'Bold']) await figma.loadFontAsync({ family: F, style: s });

function txt(chars, style, size, color, opts) {
  opts = opts || {};
  const t = figma.createText();
  t.fontName = { family: F, style: style };
  t.characters = chars;
  t.fontSize = size;
  t.fills = solid(color);
  t.lineHeight = { unit: 'PIXELS', value: Math.round(size * (opts.lh || 1.4)) };
  if (opts.tracking !== undefined) t.letterSpacing = { unit: 'PERCENT', value: opts.tracking };
  if (opts.opacity !== undefined) t.opacity = opts.opacity;
  t.name = chars.length > 40 ? chars.slice(0, 40) + '…' : chars;
  if (opts.width) {
    t.textAlignHorizontal = opts.align || 'CENTER';
    t.textAutoResize = 'HEIGHT';
    t.resize(opts.width, t.height);
  }
  return t;
}
function spacer(h) {
  const s = figma.createFrame();
  s.name = 'Spacer'; s.fills = []; s.resize(1, h);
  return s;
}

// ---- Section shell ------------------------------------------------------
const sec = figma.createAutoLayout('VERTICAL', { name: 'Section / How it works' });
sec.counterAxisAlignItems = 'CENTER';
sec.itemSpacing = 0;
sec.paddingTop = 84;
sec.paddingBottom = 84;
sec.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
sec.resize(1440, 560);
sec.primaryAxisSizingMode = 'AUTO';

const h2 = txt('Never miss another call.', 'Bold', 40, INK, { lh: 1.2, tracking: -2, width: 900 });
h2.name = 'Section heading';
sec.appendChild(h2);

sec.appendChild(spacer(16));

const sub = txt('Your AI receptionist answers, understands, and routes every call — so your team only picks up the ones that matter.',
                'Regular', 17, INK, { lh: 1.5, width: 820, opacity: 0.8 });
sub.name = 'Section subhead';
sec.appendChild(sub);

sec.appendChild(spacer(30));

// Outlined pill button
const pill = figma.createAutoLayout('HORIZONTAL', { name: 'Button / Pill' });
pill.paddingLeft = 28; pill.paddingRight = 28;
pill.paddingTop = 13;  pill.paddingBottom = 13;
pill.cornerRadius = 999;
pill.counterAxisAlignItems = 'CENTER';
pill.fills = [];
pill.strokes = solid(BRAND);
pill.strokeWeight = 1.2;
pill.appendChild(txt('HOW IT WORKS', 'SemiBold', 13, BRAND, { tracking: 6 }));
sec.appendChild(pill);

sec.appendChild(spacer(52));

// ---- Three feature cards ------------------------------------------------
const row = figma.createAutoLayout('HORIZONTAL', { name: 'Feature cards' });
row.itemSpacing = 22;
row.fills = [];
sec.appendChild(row);

const content = [
  ['Always answers.',          'Every call is picked up on the first ring, day or night, so no lead ever lands in voicemail.'],
  ['Knows why they called.',   'Intent is detected in the opening seconds and the call is routed to the right queue automatically.'],
  ['Hands over with context.', 'Your agent gets the caller, the intent, and the full history before they ever say hello.']
];

const cards = content.map(function (c) {
  const card = figma.createAutoLayout('VERTICAL', { name: 'Card / ' + c[0] });
  card.paddingLeft = 28; card.paddingRight = 28;
  card.paddingTop = 28;  card.paddingBottom = 28;
  card.itemSpacing = 14;
  card.cornerRadius = 12;
  card.fills = solid(CARD);
  card.resize(330, 200);
  card.primaryAxisSizingMode = 'AUTO';
  row.appendChild(card);

  card.appendChild(txt(c[0], 'Bold', 18, INK, { lh: 1.3, width: 274, align: 'LEFT' }));
  card.appendChild(txt(c[1], 'Regular', 15, INK, { lh: 1.6, width: 274, align: 'LEFT', opacity: 0.78 }));
  return card;
});

// Equalise card heights so the row reads as one band
const maxH = Math.ceil(Math.max.apply(null, cards.map(c => c.height)));
cards.forEach(c => { c.resize(330, maxH); c.primaryAxisSizingMode = 'FIXED'; });

// ---- Swap into the Landing page ----------------------------------------
const landing = await figma.getNodeByIdAsync('1:1413');
landing.appendChild(sec);
sec.x = 0;
sec.y = 1371;

const removed = [];
for (const id of ['1:1496', '1:1497']) {
  const n = await figma.getNodeByIdAsync(id);
  if (n) { removed.push(id); n.remove(); }
}

return {
  createdNodeIds: [sec.id, h2.id, sub.id, pill.id, row.id].concat(cards.map(c => c.id)),
  removedNodeIds: removed,
  sectionId: sec.id,
  sectionBounds: { x: sec.x, y: sec.y, w: sec.width, h: sec.height },
  cardHeight: maxH
};
