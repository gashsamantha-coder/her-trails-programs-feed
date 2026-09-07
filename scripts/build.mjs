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
  publicStatus: 'fldg3lF0dxXNp1mq3', // "Public Feed Status" formula field in Airtable — "Publishing" or a skip reason
  memberStatus: 'fldL4UbccSJwlc7AR', // "Member Feed Status" formula field in Airtable — "Publishing" or a skip reason
};

// Turn a Program offer url into its /checkout variant. Used for every program
// category — including Recommended — so there is exactly one checkout-link
// field and exactly one place that builds the URL from it.
const toCheckoutUrl = url => url.replace(/\/?$/, '').replace(/(\/offers\/[A-Za-z0-9]+)(\/checkout)?$/, '$1/checkout');

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
    // Eligibility (archived, checkout link, race date, start date/duration, price)
    // is decided by the "Public Feed Status" formula field in Airtable, not here —
    // see that field for the exact rule, kept in sync with README.md.
    const publicStatus = f[F.publicStatus] || '';
    if (publicStatus !== 'Publishing') { skip(publicStatus || 'not eligible'); continue; }
    if (!start && weeks) start = mondayStart(race, weeks);
    const price = typeof f[F.price] === 'number' ? f[F.price] : null;
    const plan = (f[F.plan] || '').trim() || null;

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
      checkoutUrl: toCheckoutUrl(url),
    });
  }
  rows.sort((a, b) => a.startDate.localeCompare(b.startDate) || a.raceDate.localeCompare(b.raceDate));
  return { rows, skipped };
}

// ---------------------------------------------------------------------------
// Members feed: every live program for the Member Program Library finder.
// Wider than the public feed: generic programs (no race date) are included and
// nothing needs a price. Only programs whose race has already run are dropped.
// ---------------------------------------------------------------------------

// Event family, used for the finder's event pills. First match wins.
const EVENT_FAMILIES = [
  ['tarawera',      /tarawera/i],
  ['noosa',         /noosa/i],
  ['uta',           /ultra[- ]trail australia|\bUTA\b/i],
  ['kosci',         /kosciuszko|kosci/i],
  ['buffalo',       /buffalo/i],
  ['gpt',           /grampians|\bGPT\b/i],
  ['scc',           /surf coast/i],
  ['hounslow',      /hounslow/i],
  ['b2m',           /bondi/i],
  ['roller-coaster',/roller ?coaster/i],
  ['rtf',           /rotorua/i],
  ['standley',      /standley/i],
  ['two-bays',      /two bays/i],
  ['six-foot',      /six foot/i],
  ['road-marathon', /marathon/i, r => r.dist === 'road'],
  ['strength',      /strength/i],
  ['peri',          /peri|her shift|her stride|training cycles/i],
];
const EVENT_LABELS = {
  tarawera:'Tarawera', noosa:'Noosa', uta:'UTA', kosci:'Kosciuszko', buffalo:'Buffalo', gpt:'Grampians',
  scc:'Surf Coast Century', hounslow:'Hounslow', b2m:'Bondi to Manly', 'roller-coaster':'Roller Coaster',
  rtf:'Rotorua', standley:'Standley Monster', 'two-bays':'Two Bays', 'six-foot':'Six Foot Track',
  'road-marathon':'Road Marathons', strength:'Strength', peri:'Peri-Menopause', staged:'Staged Races', other:'Other',
};

function distCategory(name, km, tags, category) {
  const T = tags.join(' '), N = name;
  if (category === 'Strength & Cycle Programs') return 'other-programs';
  if (/relay/i.test(T) || /relay/i.test(N)) return 'relay';
  if (/staged race|stage race/i.test(T) || /staged|stage race/i.test(N)) return 'mountain';
  if (/road marathon|road ultra|\broad\b/i.test(T) || category === 'Road Marathon') return 'road';
  if (!km) return 'other-programs';
  if (km < 20) return 'short';
  if (km <= 21.5) return 'half';
  if (km < 41) return 'mid';
  if (km <= 43) return 'trail-marathon';
  if (km < 100) return 'ultra';
  return 'mountain';
}
const DIST_LABEL = { short:'5 to 10km', half:'Trail Half', mid:'Trail Mid', 'trail-marathon':'Trail Marathon',
  ultra:'Trail Ultra', mountain:'Mountain Ultra', road:'Road Marathon', relay:'Relay and Team', 'other-programs':'Strength and Peri' };
const DIST_COLOUR = { short:'#7a9b7a', half:'#597b52', mid:'#c45c33', 'trail-marathon':'#8a6b4a',
  ultra:'#9b5e3a', mountain:'#3d5a4c', road:'#597b52', relay:'#8a7a9b', 'other-programs':'#b07a3a' };

function durationBand(weeks) {
  if (!weeks) return '6-8';
  if (weeks <= 8) return '6-8';
  if (weeks <= 12) return '12';
  if (weeks <= 16) return '14-16';
  return '18-20';
}
// Terrain descriptors from tier + tags + elevation. Same vocabulary the finder filters on.
function terrain(tier, tags, elevation, dist) {
  const T = tags.join(' ');
  let tech = 'Runnable', elev = 'Rolling';
  if (tier === 'T3 Alpine & Technical' || tier === 'T2-T3 borderline') { tech = 'Highly Technical'; elev = 'Alpine'; }
  else if (tier === 'T2 Ranges' || tier === 'T1-T2 borderline') { tech = 'Technical'; elev = 'Hilly'; }
  else if (tier === 'T1 Coast & Forest') { tech = 'Moderate'; elev = 'Rolling'; }
  if (/mountain/i.test(T)) elev = 'Mountain';
  if (/technical/i.test(T) && tech === 'Runnable') tech = 'Technical';
  if (/coastal/i.test(T) && !tier) { tech = 'Moderate'; elev = 'Rolling'; }
  if (dist === 'road' || dist === 'other-programs') { tech = 'Runnable'; elev = 'Flat'; }
  if (elevation && !tier) { if (elevation >= 4000) { elev = 'Alpine'; } else if (elevation >= 2000) { elev = 'Mountain'; } else if (elevation >= 900) { elev = 'Hilly'; } }
  const bucket = elev === 'Alpine' ? 'alpine' : (elev === 'Mountain' || elev === 'Hilly') ? 'high' : elev === 'Flat' ? 'flat' : 'rolling';
  return { techRating: dist === 'other-programs' ? '' : tech, elevClass: dist === 'other-programs' ? '' : elev, elevBucket: bucket };
}
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const monthYear = d => d ? `${MON[+d.slice(5,7)-1]} ${d.slice(0,4)}` : '';

function transformMembers(records, today) {
  const rows = [], skipped = [];
  for (const rec of records) {
    const f = rec.fields, name = (f[F.name] || '').replace(/\s+/g, ' ').trim();
    const url = f[F.offerUrl] || '';
    const category = sel(f[F.category]);
    const race = f[F.raceDate] || null;
    const weeks = Number(f[F.weeks]) || null;
    const km = typeof f[F.km] === 'number' ? f[F.km] : null;
    const elevation = typeof f[F.elevation] === 'number' ? f[F.elevation] : null;
    const tier = sel(f[F.tier]);
    const tags = (f[F.tags] || []).map(sel).filter(Boolean).map(s => s.trim());
    const summary = (f[F.summary] || '').trim();
    const skip = why => skipped.push({ name, why });
    if (!name) continue;
    // Eligibility is decided by the "Member Feed Status" formula field in Airtable —
    // see that field for the exact rule, kept in sync with README.md.
    const memberStatus = f[F.memberStatus] || '';
    if (memberStatus !== 'Publishing') { skip(memberStatus || 'not eligible'); continue; }
    let start = f[F.startDate] || null;
    if (!start && race && weeks) start = mondayStart(race, weeks);

    const dist = distCategory(name, km, tags, category);
    let event = 'other';
    if (/staged|stage race/i.test(name) || tags.some(t => /stage/i.test(t))) event = 'staged';
    else if (dist === 'other-programs') event = /strength/i.test(name) ? 'strength' : 'peri';
    else {
      for (const [slug, re, extra] of EVENT_FAMILIES) { if (re.test(name) && (!extra || extra({ dist }))) { event = slug; break; } }
      if (event === 'other' && !race && category === 'Distance Based') event = 'generic';
      if (event === 'other' && category === 'Distance Based') event = 'generic';
    }
    const t = terrain(tier, tags, elevation, dist);
    const loc = STATE[f[F.location]] || f[F.location] || null;
    const subParts = [];
    if (loc) subParts.push(loc); else if (tier) subParts.push(tier.replace(/^T\d(-T\d)? ?/, '').replace('borderline', '').trim());
    if (weeks) subParts.push(`${weeks} weeks`);
    rows.push({
      id: rec.id, name, sub: subParts.join(' · '),
      location: loc, tagline: summary || TIER_LINE[tier] || null, startDateDisplay: monthYear(start),
      distKm: km ? (Number.isInteger(km) ? `${km}km` : `${km}km`) : '-',
      km, weeks, dist, cat: DIST_LABEL[dist], cc: DIST_COLOUR[dist],
      event, eventLabel: EVENT_LABELS[event] || 'Other',
      openDateISO: start || '', raceDateISO: race || '', raceDateDisplay: monthYear(race),
      raceMonth: race ? +race.slice(5, 7) : null, startMonth: start ? +start.slice(5, 7) : null,
      elevGainDisplay: elevation ? `${elevation.toLocaleString('en-AU')}m` : '',
      dur: durationBand(weeks), elev: t.elevBucket, elevClass2: t.elevClass, techRating: t.techRating,
      tier: tier || null, tags, allin: true,
      link: toCheckoutUrl(url),
    });
  }
  // Soonest-starting programs first; programs with no fixed start (join-any-time) sort alphabetically at the end.
  rows.sort((a, b) => {
    if (a.openDateISO && b.openDateISO) return a.openDateISO.localeCompare(b.openDateISO) || a.raceDateISO.localeCompare(b.raceDateISO);
    if (a.openDateISO) return -1;
    if (b.openDateISO) return 1;
    return a.name.localeCompare(b.name);
  });
  return { rows, skipped };
}

const today = iso(new Date());
const records = await fetchAll();
const { rows, skipped } = transform(records, today);
const members = transformMembers(records, today);
const payload = { generatedAt: new Date().toISOString(), today, count: rows.length, programs: rows };
const membersPayload = { generatedAt: payload.generatedAt, today, count: members.rows.length, programs: members.rows };
await import('node:fs').then(fs => {
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/programs.json', JSON.stringify(payload, null, 2));
  fs.writeFileSync('docs/skipped.json', JSON.stringify({ generatedAt: payload.generatedAt, skipped }, null, 2));
  fs.writeFileSync('docs/members.json', JSON.stringify(membersPayload, null, 2));
  fs.writeFileSync('docs/members-skipped.json', JSON.stringify({ generatedAt: payload.generatedAt, skipped: members.skipped }, null, 2));
});
console.log(`Published ${rows.length} public programs (skipped ${skipped.length}) and ${members.rows.length} member programs (skipped ${members.skipped.length}).`);
for (const s of skipped) console.log(`  public skip  ${s.name}  (${s.why})`);
for (const s of members.skipped) console.log(`  member skip  ${s.name}  (${s.why})`);
