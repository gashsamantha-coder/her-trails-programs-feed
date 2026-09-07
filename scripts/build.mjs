// Her Trails programs feed
// Reads the "Programs - source of truth" table in Airtable and writes docs/programs.json
// Run by GitHub Actions on a schedule. No third-party packages: Node 20 fetch only.

const BASE  = process.env.AIRTABLE_BASE_ID  || 'appdX0V5prYYgR9Jm';
const TABLE = process.env.AIRTABLE_TABLE_ID || 'tblHODgkd3uMS1nAM';
const TOKEN = process.env.AIRTABLE_TOKEN;
if (!TOKEN) { console.error('AIRTABLE_TOKEN secret is not set'); process.exit(1); }

// Field IDs, so renaming a column in Airtable never breaks the feed.
const F = {
  name:      'fldk7hRn85v7PKHfs',
  offerUrl:  'fldE1uSdOFE4GN1Nn',
  price:     'fldsHiRBqDFuoeZe5',
  plan:      'fldvFH1hhDMOQa2Tl',
  location:  'fldQ6Ho2kriXwx5dV',
  km:        'fldpT3wkKNkv1VO7R',
  elevation: 'fldlbYhwZnUOeWz2t',
  tier:      'fldnUWfKQJfrL0AL0',
  raceDate:  'fldXn1EVYIxvy5Dt6',   // event date
  startDate: 'fldCAvd6Xr6MiYcmv',   // first Monday of the training block
  weeks:     'fld3KJAASkyUQuJQ8',
  category:  'fldm7vYjplOccthOO',
  tags:      'flducRJF1yNBXlcJe',
  summary:   'fldWUeiTFvpA07z08',   // short course summary shown on the card
};

const STATE = {
  'New South Wales, Australia':'NSW, Australia', 'Victoria, Australia':'VIC, Australia',
  'Western Australia, Australia':'WA, Australia', 'South Australia, Australia':'SA, Australia',
  'Tasmania, Australia':'TAS, Australia', 'Queensland, Australia':'QLD, Australia',
  'Northern Territory, Australia':'NT, Australia',
};
const TIER_LINE = {
  'T1 Coast & Forest':     'Coast and forest terrain with rolling, runnable climbing.',
  'T2 Ranges':             'Ranges terrain with sustained climbing and long descents.',
  'T3 Alpine & Technical': 'Alpine and technical terrain with steep, sustained vertical.',
  'T1-T2 borderline':      'Rolling to ranges terrain with steady climbing through the middle of the course.',
  'T2-T3 borderline':      'Ranges terrain edging into alpine, with steep and exposed sections.',
};

async function fetchAll() {
  const out = [];
  let offset;
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE}/${TABLE}`);
    u.searchParams.set('returnFieldsByFieldId', 'true');
    u.searchParams.set('pageSize', '100');
    Object.values(F).forEach(id => u.searchParams.append('fields[]', id));
    if (offset) u.searchParams.set('offset', offset);
    const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!r.ok) throw new Error(`Airtable ${r.status}: ${await r.text()}`);
    const j = await r.json();
    out.push(...j.records);
    offset = j.offset;
  } while (offset);
  return out;
}

const iso = d => d.toISOString().slice(0, 10);
function mondayStart(raceISO, weeks) {
  // Program start = race date minus (weeks - 1) weeks, back to Monday.
  const d = new Date(raceISO + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - (weeks - 1) * 7);
  const dow = d.getUTCDay();                    // 0 Sun .. 6 Sat
  d.setUTCDate(d.getUTCDate() - ((dow + 6) % 7)); // back to Monday
  return iso(d);
}
const sel = v => (v && typeof v === 'object' && 'name' in v) ? v.name : (v ?? null);

function transform(records, today) {
  const rows = [], skipped = [];
  for (const rec of records) {
    const f = rec.fields, name = (f[F.name] || '').trim();
    const url = f[F.offerUrl] || '';
    const category = sel(f[F.category]);
    const race = f[F.raceDate] || null;
    const weeks = Number(f[F.weeks]) || null;
    let start = f[F.startDate] || null;
    const skip = why => skipped.push({ name, why });

    if (!name) continue;
    if (category === 'Archive') { skip('archived'); continue; }
    if (!/hertrails\.com\/offers\/[A-Za-z0-9]+/.test(url)) { skip('no customer checkout link'); continue; }
    if (!race) { skip('no race date'); continue; }
    if (race < today) { skip('race already run'); continue; }
    if (!start && weeks) start = mondayStart(race, weeks);
    if (!start) { skip('no program start and no duration to compute one'); continue; }
    const price = typeof f[F.price] === 'number' ? f[F.price] : null;
    const plan = (f[F.plan] || '').trim() || null;
    if (price === null && !plan) { skip('no price'); continue; }

    const tier = sel(f[F.tier]);
    const tags = (f[F.tags] || []).map(sel).filter(Boolean);
    const summary = (f[F.summary] || '').trim();
    rows.push({
      id: rec.id, name, category,
      location: STATE[f[F.location]] || f[F.location] || null,
      km: f[F.km] ?? null, elevation: f[F.elevation] ?? null,
      tier, tags,
      tagline: summary || TIER_LINE[tier] || null,
      weeks, raceDate: race, startDate: start,
      status: start <= today ? 'in_progress' : 'upcoming',
      price, plan,
      checkoutUrl: url.replace(/\/?$/, '').replace(/(\/offers\/[A-Za-z0-9]+)(\/checkout)?$/, '$1/checkout'),
    });
  }
  rows.sort((a, b) => a.startDate.localeCompare(b.startDate) || a.raceDate.localeCompare(b.raceDate));
  return { rows, skipped };
}

const today = iso(new Date());
const records = await fetchAll();
const { rows, skipped } = transform(records, today);
const payload = { generatedAt: new Date().toISOString(), today, count: rows.length, programs: rows };
await import('node:fs').then(fs => {
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/programs.json', JSON.stringify(payload, null, 2));
  fs.writeFileSync('docs/skipped.json', JSON.stringify({ generatedAt: payload.generatedAt, skipped }, null, 2));
});
console.log(`Published ${rows.length} programs. Skipped ${skipped.length}.`);
for (const s of skipped) console.log(`  skip  ${s.name}  (${s.why})`);
