// Her Trails Pace Predictor feed
// Reads the Pace Predictor tables in Airtable and writes docs/pace-predictor.json.
// Run by GitHub Actions on a schedule, after scripts/build.mjs. Node 20 fetch only.
// Add a race in Airtable (Events + Course Segments) and it appears in the tool within 6 hours.

const BASE  = process.env.AIRTABLE_BASE_ID || 'appdX0V5prYYgR9Jm';
const TOKEN = process.env.AIRTABLE_TOKEN;
if (!TOKEN) { console.error('AIRTABLE_TOKEN secret is not set'); process.exit(1); }

const T_EVENTS = 'tblSRuFC2pueFJ2eK', T_SEGS = 'tbl3nAMskzko0T2eg', T_CUES = 'tblnljV2bBvLVDLeI';
const E = { name:'fldbzraxzDCVQo5ra', km:'fldbVY49Pk1FwtYU8', location:'fldrt9O4p7I9G0e4T',
  date:'fldNPPpf75QJAblxt', terrain:'fld2VxpdcpFPNz6nP', segs:'fldeNjGmtHjGjFTml' };
const S = { name:'fldloZnkwSW7gGtno', event:'fldbdEEeIbgXa3xya', order:'fldKYo5PEHygYU1ar',
  km:'fldEz9hoIddqAP5pa', type:'fld7XH1nS2rPhlNYx', idx:'fldP1mzwKjpryVVMW' };
const C = { id:'fldL2gPMl2M04Zs0k', terrain:'fldfpB6Hh7Ir0Socq', start:'fldkIkBDVXbRkr7oR',
  pacing:'fldO8D4zhHt48L1mw', challenges:'fldUWWXMJdkUZEYjV', mistakes:'fld7vP7EcNhcyySeu' };

// Programs table (source of truth for program name, weeks, start date, checkout link).
const T_PROGS = 'tblHODgkd3uMS1nAM';
const P = { name:'fldk7hRn85v7PKHfs', weeks:'fld3KJAASkyUQuJQ8', start:'fldCAvd6Xr6MiYcmv',
  url:'fldE1uSdOFE4GN1Nn', status:'fldg3lF0dxXNp1mq3', events:'fldrQcxY18oXj9tPJ' };

const TYPE = { 'Climbing / tough':'climb', 'Runnable / flat':'runnable', 'Fast / downhill':'descent',
  'Technical / rocky':'technical', 'Mixed':'mixed', 'Steady / rolling (start)':'mixed' };

const sel = v => (v && typeof v === 'object' && 'name' in v) ? v.name : (v ?? null);
// House rule: no em or en dashes in anything members read.
const clean = s => typeof s === 'string'
  ? s.replace(/\s*[–—]\s*/g, ', ').replace(/\s+/g, ' ').trim() : s;
const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function fetchTable(table, fields) {
  const out = []; let offset;
  do {
    const u = new URL(`https://api.airtable.com/v0/${BASE}/${table}`);
    u.searchParams.set('returnFieldsByFieldId', 'true');
    u.searchParams.set('pageSize', '100');
    fields.forEach(id => u.searchParams.append('fields[]', id));
    if (offset) u.searchParams.set('offset', offset);
    const r = await fetch(u, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!r.ok) throw new Error(`Airtable ${r.status}: ${await r.text()}`);
    const j = await r.json(); out.push(...j.records); offset = j.offset;
  } while (offset);
  return out;
}

const [evRecs, segRecs, cueRecs, progRecs] = await Promise.all([
  fetchTable(T_EVENTS, Object.values(E)),
  fetchTable(T_SEGS, Object.values(S)),
  fetchTable(T_CUES, Object.values(C)),
  fetchTable(T_PROGS, Object.values(P)),
]);

const today = new Date().toISOString().slice(0, 10);
const problems = [];
const segsByEvent = new Map();
for (const r of segRecs) {
  const f = r.fields, evId = (f[S.event] || [])[0];
  const km = f[S.km], idx = f[S.idx], type = TYPE[sel(f[S.type])];
  if (!evId || typeof km !== 'number' || typeof idx !== 'number' || !type) {
    problems.push(`Segment "${f[S.name] || r.id}" is missing event, km, idx or type`); continue;
  }
  if (!segsByEvent.has(evId)) segsByEvent.set(evId, []);
  segsByEvent.get(evId).push({ order: f[S.order] ?? 999, name: clean(f[S.name]), km, idx, type });
}

// Only programs the Airtable formula marks "Publishing" with a real checkout link are offered.
const progsByEvent = new Map();
for (const r of progRecs) {
  const f = r.fields;
  if (f[P.status] !== 'Publishing') continue;
  const url = f[P.url];
  if (!/^https:\/\/www\.hertrails\.com\/offers\/[A-Za-z0-9]+\/checkout$/.test(url || '')) continue;
  const start = f[P.start] && f[P.start] >= today ? f[P.start] : null;
  const prog = { name: clean(f[P.name] || ''), weeks: typeof f[P.weeks] === 'number' ? f[P.weeks] : null, start, url };
  for (const evId of (f[P.events] || [])) {
    if (!progsByEvent.has(evId)) progsByEvent.set(evId, []);
    progsByEvent.get(evId).push(prog);
  }
}

const events = [];
for (const r of evRecs) {
  const f = r.fields, name = clean(f[E.name] || '');
  if (!name) continue;
  const segs = (segsByEvent.get(r.id) || []).sort((a, b) => a.order - b.order)
    .map(({ name, km, idx, type }) => ({ name, km, idx, type }));
  if (!segs.length) { problems.push(`Event "${name}" has no usable segments`); continue; }
  const sum = Math.round(segs.reduce((s, x) => s + x.km, 0) * 10) / 10;
  const km = f[E.km];
  // Surface a mismatch to the QA report. The tool still publishes: segments are the pacing truth.
  if (typeof km === 'number' && Math.abs(sum - km) > Math.max(0.5, km * 0.02)) {
    problems.push(`Event "${name}": segments sum to ${sum}km, event says ${km}km`);
  }
  events.push({
    id: slug(name), airtableId: r.id, name, km: typeof km === 'number' ? km : sum, segmentKm: sum,
    location: clean(f[E.location] || '') || null,
    raceDate: f[E.date] && f[E.date] >= today ? f[E.date] : null,
    terrain: sel(f[E.terrain]), segments: segs,
    programs: progsByEvent.get(r.id) || [],
  });
}
events.sort((a, b) => a.name.localeCompare(b.name));

const cues = {};
for (const r of cueRecs) {
  const f = r.fields, t = sel(f[C.terrain]);
  if (!t || /generic/i.test(t)) { if (t) cues.generic = pack(f); continue; }
  cues[t.toLowerCase()] = pack(f);
}
function pack(f) {
  return { start: clean(f[C.start]), pacing: clean(f[C.pacing]),
    challenges: clean(f[C.challenges]), mistakes: clean(f[C.mistakes]) };
}

const payload = { generatedAt: new Date().toISOString(), today, count: events.length, events, cues };
const fs = await import('node:fs');
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/pace-predictor.json', JSON.stringify(payload, null, 2));
fs.writeFileSync('docs/pace-predictor-qa.json', JSON.stringify({ generatedAt: payload.generatedAt, problems }, null, 2));
console.log(`Published ${events.length} pace predictor events, ${problems.length} data problems.`);
for (const p of problems) console.log('  qa  ' + p);
