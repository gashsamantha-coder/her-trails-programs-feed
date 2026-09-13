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

const FINDER_PROGRAMS_TABLE = 'tblWNfDzq6pmKlbCG';
const FINDER_RACES_TABLE = 'tblAHqO3OVzWPYiKa';
const PF = {
  name:'fld6j0M7fnpaBnkCI', sourceId:'fld1zzv5x4NUxOEtH', weeks:'fldm1HZSGggRtYkIR',
  description:'fldk9e2HTwXLGoLL9', raceCategories:'fldG7puWsxLEf358n',
  terrainCategories:'fldIvTWocU6ocr1p0', distanceMin:'fldvhvoEQHtHujqmO',
  distanceMax:'fldCx0adrgI4emkHy', elevationMin:'fldd6x4wvBRw8Qaut',
  elevationMax:'fldXOG4qnS6LKs8Te', technicality:'fldNkoBtqSRdxxbsQ',
  timeOnFeet:'fld9ppDNjIj1urhva', tier50:'fldkx4BZyFYQfOra5',
  eligible:'fldiMOhMnRobtfEcS', priority:'fld7Ldtwb4ywTWnz1',
};
const RF = {
  name:'fld9PbaWAE2Wb37M8', date:'fld7k4al6tVwxLihu', distance:'fldaYzYE4aAACtfbG',
  elevation:'fld7tmmdhPUlNuM5y', terrain:'fldclhDRPbvwZZqvq', environment:'fldinlEt0AVsnwTsp',
  categories:'fldHfNLfWJL28j6Ww', timeOnFeet:'fldp326hdnIbXIPv3',
  tier50:'fldwVst9xAQStCPKc', status:'fldNqwoVfRNw5j3Dp',
  exact:'fldTmeEirOdW0BksG', curated1:'fldzi1QcOn1uaFxBk', why1:'fldyC75vPmVHCbAU4',
  curated2:'fldy54ZGdGc9lajLU', why2:'fldDR6jejrnMKpvFr',
  curated3:'fldAXVxbsH0LFqdvO', why3:'fld2uYzbP3GR83IlY',
  role:'fld98je93Wb4yU660', technicality:'fldh37Ck1PfS9LIL8',
};

// Turn a Program offer url into its /checkout variant. Used for every program
// category — including Recommended — so there is exactly one checkout-link
// field and exactly one place that builds the URL from it.
const toCheckoutUrl = url => url.replace(/\/?$/, '').replace(/(\/offers\/[A-Za-z0-9]+)(\/checkout)?$/, '$1/checkout');
const isCustomerOfferUrl = url => /^https:\/\/www\.hertrails\.com\/offers\/[A-Za-z0-9]+(?:\/checkout)?\/?$/.test(url);
const distanceLabel = km => {
  if (typeof km !== 'number' || !Number.isFinite(km)) return null;
  return `${Number.isInteger(km) ? km : km.toFixed(1).replace(/\.0$/, '')}km`;
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

async function fetchTable(table, fields) {
  const out = [];
  let offset;
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE}/${table}`);
    u.searchParams.set('returnFieldsByFieldId', 'true');
    u.searchParams.set('pageSize', '100');
    fields.forEach(id => u.searchParams.append('fields[]', id));
    if (offset) u.searchParams.set('offset', offset);
    const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!r.ok) throw new Error(`Airtable ${r.status}: ${await r.text()}`);
    const j = await r.json();
    out.push(...j.records);
    offset = j.offset;
  } while (offset);
  return out;
}
const fetchAll = () => fetchTable(TABLE, Object.values(F));

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

    // Defensive publication checks. Airtable remains authoritative, but a formula
    // regression must never expose an expired cohort or malformed purchase link.
    if (!isCustomerOfferUrl(url)) { skip('Invalid customer checkout link'); continue; }
    if (!race) { skip('No race date'); continue; }
    if (race < today) { skip('Race already run'); continue; }
    if (!start && weeks) start = mondayStart(race, weeks);
    if (!start) { skip('No program start date or duration'); continue; }
    const price = typeof f[F.price] === 'number' ? f[F.price] : null;
    const plan = (f[F.plan] || '').trim() || null;

    const tier = sel(f[F.tier]);
    const tags = (f[F.tags] || []).map(sel).filter(Boolean);
    const summary = (f[F.summary] || '').trim();
    rows.push({
      id: rec.id, name, category,
      location: STATE[f[F.location]] || f[F.location] || null,
      km: f[F.km] ?? null, distanceLabel: distanceLabel(f[F.km]),
      elevation: f[F.elevation] ?? null,
      tier, tags,
      tagline: summary || TIER_LINE[tier] || null,
      weeks, raceDate: race, startDate: start,
      status: start <= today ? 'in_progress' : 'upcoming',
      price, plan,
      canPurchase: true,
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

const many = v => (v || []).map(sel).filter(Boolean);
const linkIds = v => (v || []).map(x => typeof x === 'string' ? x : (x && x.id)).filter(Boolean);
const clean = v => String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const TECH = { low:1, moderate:2, high:3 };

function rangeScore(value, min, max, weight) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') return { score:0, available:false };
  if (value >= min && value <= max) return { score:weight, available:true };
  const span = Math.max(max - min, Math.max(max * 0.25, 10));
  const gap = value < min ? min - value : value - max;
  return { score:Math.max(0, weight * (1 - gap / span)), available:true };
}
function terrainKeys(values) {
  const s = clean((values || []).join(' ')), out = new Set();
  const tests = {
    road:/road/, urban:/urban|light trail/, runnable:/runnable|flowing/,
    coast:/coast|sand|beach/, forest:/forest|rainforest|bushland|eucalyptus/,
    mountain:/range|mountain|skyrun|hinterland/, alpine:/alpine|high country/,
    technical:/technical|rock|scree|singletrack/, steep:/stair|steep|pinch/,
    remote:/remote|self supported|outback|desert/,
  };
  for (const [k, re] of Object.entries(tests)) if (re.test(s)) out.add(k);
  return out;
}
function intersectionCount(a, b) {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n;
}
function scoreProgram(race, program) {
  let score = 0, availableWeight = 0;
  const factors = [], mismatches = [];
  const dist = rangeScore(race.distance, program.distanceMin, program.distanceMax, 35);
  score += dist.score; if (dist.available) availableWeight += 35;
  if (dist.score >= 30) factors.push('distance'); else if (dist.available && dist.score < 15) mismatches.push('distance');

  const elev = rangeScore(race.elevation, program.elevationMin, program.elevationMax, 25);
  score += elev.score; if (elev.available) availableWeight += 25;
  if (elev.score >= 20) factors.push('elevation'); else if (elev.available && elev.score < 10) mismatches.push('elevation');

  const raceCats = new Set(race.categories.map(clean));
  const progCats = new Set(program.raceCategories.map(clean));
  const catOverlap = intersectionCount(raceCats, progCats);
  const raceTerrain = terrainKeys([race.terrain, race.environment, ...race.categories]);
  const progTerrain = terrainKeys([...program.terrainCategories, ...program.raceCategories]);
  const terrainOverlap = intersectionCount(raceTerrain, progTerrain);
  availableWeight += 20;
  const terrainScore = Math.min(20, (catOverlap ? 10 : 0) + Math.min(10, terrainOverlap * 5));
  score += terrainScore;
  if (terrainScore >= 10) factors.push('terrain'); else mismatches.push('terrain');

  if (race.technicality && program.technicality.length) {
    availableWeight += 5;
    const exact = program.technicality.map(clean).includes(clean(race.technicality));
    const best = Math.max(...program.technicality.map(x => TECH[clean(x)] || 0));
    const rv = TECH[clean(race.technicality)] || 0;
    const techScore = exact ? 5 : (best >= rv ? 3 : 0);
    score += techScore;
    if (techScore >= 3) factors.push('technicality'); else mismatches.push('technicality');
  }

  if (race.timeOnFeet && program.timeOnFeet.length) {
    availableWeight += 5;
    const tofScore = program.timeOnFeet.map(clean).includes(clean(race.timeOnFeet)) ? 5 : 0;
    score += tofScore;
    if (tofScore) factors.push('time on feet'); else mismatches.push('time on feet');
  }

  const is50 = race.distance >= 45 && race.distance <= 60;
  if (is50 && race.tier50 && program.tier50.length) {
    availableWeight += 10;
    const tierScore = program.tier50.map(clean).includes(clean(race.tier50)) ? 10 : 0;
    score += tierScore;
    if (tierScore) factors.push('50km demand tier'); else mismatches.push('50km demand tier');
  }

  const pct = availableWeight ? Math.round(score / availableWeight * 100) : 0;
  return { score:pct, factors:[...new Set(factors)], mismatches:[...new Set(mismatches)] };
}
function calculatedReason(program, result) {
  const good = result.factors.slice(0, 3).join(', ');
  const caution = result.mismatches.slice(0, 2).join(' and ');
  let out = good ? `This is the strongest calculated fit for the race's ${good}.` : 'This is the closest available programme match.';
  if (caution) out += ` The ${caution} fit is less exact, so bring that part to Coaching Corner.`;
  return out;
}
function sourceSale(rec, today) {
  if (!rec) return null;
  const f = rec.fields, url = f[F.offerUrl] || '';
  const publishable = f[F.memberStatus] === 'Publishing' && isCustomerOfferUrl(url);
  let start = f[F.startDate] || null;
  const weeks = Number(f[F.weeks]) || null, raceDate = f[F.raceDate] || null;
  if (!start && raceDate && weeks) start = mondayStart(raceDate, weeks);
  return {
    sourceRecordId:rec.id, name:(f[F.name] || '').trim(), weeks,
    startDate:start, raceDate:raceDate && raceDate >= today ? raceDate : null,
    price:typeof f[F.price] === 'number' ? f[F.price] : null,
    plan:(f[F.plan] || '').trim() || null,
    checkoutUrl:publishable ? toCheckoutUrl(url) : null,
    available:publishable,
  };
}
function transformFinder(raceRecords, programRecords, sourceRecords, today) {
  const sourceById = new Map(sourceRecords.map(r => [r.id, r]));
  const programs = programRecords.map(rec => {
    const f = rec.fields, sourceId = f[PF.sourceId] || null;
    return {
      id:rec.id, sourceRecordId:sourceId, name:(f[PF.name] || '').trim(),
      weeks:Number(f[PF.weeks]) || null, description:(f[PF.description] || '').trim() || null,
      raceCategories:many(f[PF.raceCategories]), terrainCategories:many(f[PF.terrainCategories]),
      distanceMin:f[PF.distanceMin] ?? null, distanceMax:f[PF.distanceMax] ?? null,
      elevationMin:f[PF.elevationMin] ?? null, elevationMax:f[PF.elevationMax] ?? null,
      technicality:many(f[PF.technicality]), timeOnFeet:many(f[PF.timeOnFeet]),
      tier50:many(f[PF.tier50]), eligible:f[PF.eligible] === true,
      priority:Number(f[PF.priority]) || 999, sale:sourceSale(sourceById.get(sourceId), today),
    };
  }).filter(p => p.name);
  const programById = new Map(programs.map(p => [p.id, p]));
  const calculatedPool = programs.filter(p => p.eligible && p.sale && p.sale.available);

  const races = [];
  for (const rec of raceRecords) {
    const f = rec.fields;
    if (sel(f[RF.role]) !== 'Physical Race') continue;
    const race = {
      id:rec.id, name:(f[RF.name] || '').trim(), raceDate:(f[RF.date] || null),
      distance:typeof f[RF.distance] === 'number' ? f[RF.distance] : null,
      elevation:typeof f[RF.elevation] === 'number' ? f[RF.elevation] : null,
      terrain:(f[RF.terrain] || '').trim() || null, environment:(f[RF.environment] || '').trim() || null,
      categories:many(f[RF.categories]), technicality:sel(f[RF.technicality]),
      timeOnFeet:sel(f[RF.timeOnFeet]), tier50:sel(f[RF.tier50]), finderStatus:sel(f[RF.status]),
    };
    if (race.raceDate && race.raceDate < today) race.raceDate = null;

    let recommendations = [];
    const addLinks = (field, kind, reason) => {
      for (const id of linkIds(f[field])) {
        const p = programById.get(id);
        if (p) recommendations.push({ programId:id, kind, reason:reason || null });
      }
    };
    if (race.finderStatus === 'Exact event-specific program') {
      addLinks(RF.exact, 'exact', 'Her Trails has a programme built specifically for this event.');
    } else if (race.finderStatus === 'Curated recommendation') {
      addLinks(RF.curated1, 'curated', f[RF.why1]);
      addLinks(RF.curated2, 'curated', f[RF.why2]);
      addLinks(RF.curated3, 'curated', f[RF.why3]);
    } else {
      recommendations = calculatedPool.map(p => ({ p, result:scoreProgram(race, p) }))
        .sort((a,b) => b.result.score - a.result.score || a.p.priority - b.p.priority || a.p.name.localeCompare(b.p.name))
        .slice(0, 3)
        .map(({p,result}) => ({ programId:p.id, kind:'calculated', score:result.score, reason:calculatedReason(p, result) }));
    }
    races.push({ ...race, recommendations });
  }
  races.sort((a,b) => a.name.localeCompare(b.name));
  const unrouted = races.filter(r => !r.recommendations.length);
  if (unrouted.length) {
    throw new Error(`Finder routing failed for ${unrouted.length} physical races:\n${unrouted.map(r => r.name).join('\n')}`);
  }
  return {
    generatedAt:new Date().toISOString(), today,
    hierarchy:['exact','curated','calculated'],
    scoringWeights:{ distance:35, elevation:25, terrain:20, technicality:5, timeOnFeet:5, tier50:10 },
    caveat:'Time-on-feet contributes only when the race has a populated band. Readiness guidance is advisory and configured separately.',
    counts:{ races:races.length, programs:programs.length, calculatedPool:calculatedPool.length },
    programs, races,
  };
}

function assertFeedIntegrity(rows, today) {
  const failures = [];
  for (const p of rows) {
    if (!p.canPurchase || !isCustomerOfferUrl(p.checkoutUrl)) failures.push(`${p.name}: invalid purchase link`);
    if (!p.raceDate || p.raceDate < today) failures.push(`${p.name}: expired or missing race date`);
    if (/rainbow beach trail 50/i.test(p.name)) failures.push(`${p.name}: non-existent race must not publish`);
    if (/tarawera.*(?:t?102|102k)/i.test(p.name) && p.distanceLabel !== '102km') {
      failures.push(`${p.name}: expected 102km, got ${p.distanceLabel || 'no distance'}`);
    }
  }
  if (failures.length) throw new Error(`Feed integrity failed:\n${failures.join('\n')}`);
}

const today = iso(new Date());
const [records, finderProgramRecords, finderRaceRecords] = await Promise.all([
  fetchAll(),
  fetchTable(FINDER_PROGRAMS_TABLE, Object.values(PF)),
  fetchTable(FINDER_RACES_TABLE, Object.values(RF)),
]);
const { rows, skipped } = transform(records, today);
assertFeedIntegrity(rows, today);
const members = transformMembers(records, today);
const finder = transformFinder(finderRaceRecords, finderProgramRecords, records, today);
const payload = { generatedAt: new Date().toISOString(), today, count: rows.length, programs: rows };
const membersPayload = { generatedAt: payload.generatedAt, today, count: members.rows.length, programs: members.rows };
await import('node:fs').then(fs => {
  fs.mkdirSync('docs', { recursive: true });
  fs.writeFileSync('docs/programs.json', JSON.stringify(payload, null, 2));
  fs.writeFileSync('docs/skipped.json', JSON.stringify({ generatedAt: payload.generatedAt, skipped }, null, 2));
  fs.writeFileSync('docs/members.json', JSON.stringify(membersPayload, null, 2));
  fs.writeFileSync('docs/members-skipped.json', JSON.stringify({ generatedAt: payload.generatedAt, skipped: members.skipped }, null, 2));
  fs.writeFileSync('docs/finder.json', JSON.stringify(finder, null, 2));
});
console.log(`Published ${rows.length} public programs (skipped ${skipped.length}), ${members.rows.length} member programs (skipped ${members.skipped.length}), and ${finder.races.length} finder races.`);
for (const s of skipped) console.log(`  public skip  ${s.name}  (${s.why})`);
for (const s of members.skipped) console.log(`  member skip  ${s.name}  (${s.why})`);
