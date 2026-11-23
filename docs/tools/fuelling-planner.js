(function(){var s=document.createElement('style');s.textContent="#htpp,#htfp{max-width:1000px;margin:0 auto;padding:8px 16px 48px;font-family:'Work Sans',system-ui,sans-serif;font-size:15px;line-height:1.7;color:#555}#htpp *,#htfp *{box-sizing:border-box}#htpp b,#htfp b{color:#1d1d1d}.pp-card,.fp-card,.pp-bench,.fp-box,.fp-hero,.pp-cues>div{background:#fdfaf3;border:1px solid #e8dccb;border-radius:12px;padding:20px;margin-bottom:16px}.pp-grid,.fp-grid{display:flex;flex-wrap:wrap;gap:16px}.pp-f,.fp-f{flex:1 1 220px;display:flex;flex-direction:column;gap:6px}.pp-f>span,.fp-f>span{font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:#c45c33}#htpp input,#htpp select,#htfp input,#htfp select{width:100%;padding:12px;border:1px solid #e2d9d2;border-radius:8px;background:#fff;font:inherit;color:#1d1d1d;min-height:46px}.pp-time,.fp-time{display:flex;align-items:center;gap:8px}.pp-time input,.fp-time input{text-align:center}.pp-hint,.pp-small,.fp-small{font-size:13px;color:#666;margin:12px 0 0}.pp-err,.fp-err{color:#a33a1f;font-weight:600;margin-top:8px}.pp-err:empty,.fp-err:empty{display:none}.pp-note{background:#fff3ee;border:1px solid #c45c33;border-radius:12px;padding:16px;margin-bottom:16px}.pp-stats,.fp-stats{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px}.pp-stats>div,.fp-stats>div{flex:1 1 160px;background:#1d1d1d;border-radius:12px;padding:16px;text-align:center}.pp-stats b,.fp-stats b{display:block;color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:600}.pp-stats span,.fp-stats span{color:#bbb;font-size:12px}.pp-bench b,.fp-box b,.pp-cues b{display:block;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#c45c33;margin-bottom:6px}.pp-bench p,.fp-box p,.pp-cues p{margin:0 0 8px}.fp-hero{background:#fff3ee;border-color:#c45c33}.fp-hero h3{margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-weight:600;color:#1d1d1d;font-size:clamp(19px,2.6vw,23px)}.fp-hero p{margin:0}.pp-tablewrap,.fp-tablewrap{overflow-x:auto;margin-bottom:16px}.pp-table,.fp-table{width:100%;border-collapse:collapse;background:#fdfaf3;border:1px solid #e8dccb;border-radius:12px;font-size:14px}.pp-table th,.fp-table th{background:#1d1d1d;color:#fff;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;text-align:left;padding:12px}.pp-table td,.fp-table td{padding:12px;border-top:1px solid #e8dccb;vertical-align:top}.pp-table small,.fp-table small{display:block;color:#666;font-size:12px}.pp-noterow td{background:#f8f5f2;color:#555;font-size:13px;border-top:0}.pp-tag{display:inline-block;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:600;background:#edf3ec;color:#597b52}.pp-climb{background:#fff3ee;color:#c45c33}.pp-descent{background:#ede6e1;color:#1d1d1d}.pp-technical{background:#faebdf;color:#a3481f}.pp-cues,.fp-cols{display:flex;flex-wrap:wrap;gap:16px}.pp-cues>div,.fp-cols>.fp-box{flex:1 1 280px}.fp-wide{width:100%}.fp-box ol{margin:0 0 8px;padding-left:20px}.fp-inline{max-width:240px}.pp-actions,.fp-actions{display:flex;flex-wrap:wrap;gap:12px;margin:16px 0}.pp-btn,.fp-btn{display:inline-block;background:#c45c33;color:#fff!important;border:2px solid #c45c33;border-radius:8px;padding:12px 20px;font:600 14px 'Work Sans',sans-serif;text-decoration:none;cursor:pointer}.pp-ghost,.fp-ghost{background:transparent;color:#c45c33!important}@media print{.pp-actions,.fp-actions,.pp-card,.fp-card{display:none}}";document.head.appendChild(s)})();
/* Her Trails Fuelling Planner. Rules follow the Her Trails fuelling guidance (15 Oct 2026). No fixed sodium or fluid amounts are given on purpose. */
(function () {
  var PACE_PAGE = '/pace-predictor-v2';
  var FEED = 'https://gashsamantha-coder.github.io/her-trails-programs-feed/pace-predictor.json';
  var root = document.getElementById('htfp');
  if (!root) return;
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function hm(min) { var t = Math.round(min), h = Math.floor(t / 60); return h + ':' + pad(t % 60); }
  function num(v) { return /^\d+(\.\d+)?$/.test(String(v).trim()) ? parseFloat(v) : NaN; }
  function q(id) { return root.querySelector('#' + id); }

  var p = new URLSearchParams(location.search), raceName = '';
  root.innerHTML =
    '<div class="fp-card"><div class="fp-grid">' +
    '<div class="fp-f"><span>Expected finish time</span><div class="fp-time"><input id="fp-h" inputmode="numeric" maxlength="2" placeholder="hh" aria-label="Hours"><b>:</b><input id="fp-m" inputmode="numeric" maxlength="2" placeholder="mm" aria-label="Minutes"></div></div>' +
    '<label class="fp-f"><span>Your fuelling so far</span><select id="fp-exp"><option value="new">New to fuelling on the run</option><option value="practised">Practised on long runs</option></select></label>' +
    '<label class="fp-f"><span>Race style</span><select id="fp-style"><option value="run">Mostly running</option><option value="hike">Hike-heavy, or a long day</option></select></label>' +
    '<label class="fp-f"><span>How often you will eat</span><select id="fp-int"><option value="20">Every 20 minutes</option><option value="25">Every 25 minutes</option><option value="30">Every 30 minutes</option></select></label>' +
    '<label class="fp-f"><span>Carbohydrate in one item (grams, from the label)</span><input id="fp-g" inputmode="decimal" placeholder="Optional"></label>' +
    '</div><div id="fp-race" class="fp-race"></div><div id="fp-err" class="fp-err" role="alert"></div></div><div id="fp-out"></div>';

  var st = { h: '', m: '', exp: 'new', style: 'run', int: 20, g: '' };

  function plan() {
    var h = num(st.h), m = num(st.m), err = q('fp-err'), out = q('fp-out'); err.textContent = ''; out.innerHTML = '';
    if (st.h === '' && st.m === '') return;
    if (isNaN(h) || isNaN(m) || m > 59 || h > 99) { err.textContent = 'Enter your finish time as hours and minutes, with minutes from 0 to 59.'; return; }
    var dur = h * 60 + m;
    if (dur < 20) { err.textContent = 'Enter at least 20 minutes.'; return; }
    var intv = +st.int, long = dur >= 150, hike = st.style === 'hike' || dur >= 16 * 60;
    var lo, hi, headline, body = '';
    if (!long) {
      lo = 30; hi = 60;
      headline = 'Aim for 30 to 60 g of carbohydrate per hour';
      body = 'For efforts under about 2.5 hours, many runners take less than they would on a long day. Practise the amount that sits well, and start in the first 20 to 30 minutes.';
    } else if (hike) {
      lo = 40; hi = 60;
      headline = 'Aim for 40 to 60 g of carbohydrate per hour, about 150 to 400 kcal per hour';
      body = 'On a hike-heavy or very long day the floor stays the same. Lean on more real food and some protein rather than chasing a higher number.';
    } else if (st.exp === 'new') {
      lo = 40; hi = 50;
      headline = 'Start at 40 to 50 g per hour and build toward about 60 g';
      body = 'If fuelling on the run is new, start here on your long runs and build toward about 60 g per hour as your gut allows. Never plan below 40 g per hour on a long day.';
    } else {
      lo = 60; hi = 60;
      headline = 'Aim for about 60 g of carbohydrate per hour';
      body = 'Keep eating to the finish, and never plan below 40 g per hour on a long day.';
    }
    var tgt = hi === lo ? lo : (lo + hi) / 2;
    var perIntake = Math.round(tgt * intv / 60 * 10) / 10;
    var g = num(st.g), itemsTxt = '';
    if (!isNaN(g) && g > 0) {
      var ratio = perIntake / g;
      itemsTxt = '<div><b>' + (Math.round(ratio * 100) / 100) + '</b><span>Items each time (of ' + g + ' g)</span></div>';
    }
    var total = Math.round(tgt * dur / 60);
    var html = '<div class="fp-hero"><h3>' + esc(headline) + '</h3><p>' + esc(body) + '</p></div>';
    html += '<div class="fp-stats"><div><b>' + perIntake + ' g</b><span>Every ' + intv + ' minutes</span></div>' + itemsTxt + '<div><b>' + total + ' g</b><span>Carbohydrate for the whole race</span></div><div><b>' + Math.round(total * 4) + ' kcal</b><span>From carbohydrate alone</span></div></div>';

    // Timeline: first intake inside the first 20 to 30 minutes, then every interval, to the finish.
    var rows = [], t, hr, cum = 0, hours = Math.ceil(dur / 60), backShown = false;
    for (hr = 0; hr < hours; hr++) {
      var times = [];
      for (t = intv; t <= dur; t += intv) if (t > hr * 60 && t <= (hr + 1) * 60) times.push(t);
      var gH = Math.round(times.length * perIntake);
      cum += gH;
      var half = !backShown && hr > 0 && hr * 60 >= dur / 2 - 30; if (half) backShown = true;
      rows.push('<tr><td><b>Hour ' + (hr + 1) + '</b>' + (half ? '<small>Back half: keep at least 40 g per hour</small>' : '') + '</td><td>' + (times.length ? times.map(hm).join(', ') : 'Finish') + '</td><td>' + gH + ' g</td><td>' + cum + ' g</td></tr>');
    }
    html += '<div class="fp-tablewrap"><table class="fp-table"><thead><tr><th>When</th><th>Eat at (hours:minutes)</th><th>Carbohydrate</th><th>Running total</th></tr></thead><tbody>' + rows.join('') + '</tbody></table></div>';
    html += '<div class="fp-cols">' +
      '<div class="fp-box"><b>Fluids and sodium</b><p>Drink to thirst. Take sodium to taste or to your own sweat test. There is no fixed amount per hour, and sodium does not prevent nausea or low blood sodium.</p></div>' +
      '<div class="fp-box"><b>Your cycle</b><p>The target is the same for women as for men. It does not change with your cycle.</p></div>' +
      '<div class="fp-box"><b>Back half of the day</b><p>Planned items often lose their appeal late. Carry savoury and real food backups, take smaller amounts more often, and keep the floor at 40 g per hour.</p></div>' +
      '<div class="fp-box"><b>Practise it</b><p>Rehearse this on every long run of 90 minutes or more from Week 4. Have the system settled by Week 8, and try nothing new in the taper.</p></div></div>';
    html += '<div class="fp-box fp-wide"><b>If your gut says no on race day</b><ol><li>Walk for 10 to 15 minutes and cool down.</li><li>Sip, and switch to a different format.</li><li>Take 30 to 40 g per hour for an hour, then rebuild.</li><li>Do not treat nausea with more salt.</li></ol><p>Repeated vomiting, not keeping fluids down, or confusion means you need medical help.</p></div>';
    html += '<div class="fp-box fp-wide"><b>Race week</b><p>Over the final 36 to 48 hours, aim for 8 to 10 g of carbohydrate per kg of body weight per day, spread across familiar, low-residue foods. Before that, eat normally and generously.</p><label class="fp-f fp-inline"><span>Your body weight (kg)</span><input id="fp-kg" inputmode="decimal" placeholder="Optional"></label><p id="fp-kgout"></p></div>';
    html += '<div class="fp-actions">' + (p.get('event') ? '<a class="fp-btn" href="' + PACE_PAGE + '?event=' + encodeURIComponent(p.get('event')) + '&h=' + h + '&m=' + m + '">Back to your pace plan</a>' : '<a class="fp-btn" href="' + PACE_PAGE + '">Build a pace plan</a>') + '<button class="fp-btn fp-ghost" id="fp-print" type="button">Print this plan</button></div>';
    html += '<p class="fp-small">This is general guidance, not medical advice. Practise it on your long runs and adjust to what your body tolerates.</p>';
    out.innerHTML = html;
    q('fp-print').onclick = function () { window.print(); };
    q('fp-kg').oninput = function () {
      var k = num(this.value);
      q('fp-kgout').textContent = (!isNaN(k) && k >= 30 && k <= 200) ? 'That is about ' + Math.round(k * 8) + ' to ' + Math.round(k * 10) + ' g per day.' : '';
    };
  }

  function show() {
    var n = raceName; q('fp-race').innerHTML = n ? 'Planning for <b>' + esc(n) + '</b>' : '';
  }
  q('fp-h').oninput = function () { st.h = this.value; plan(); };
  q('fp-m').oninput = function () { st.m = this.value; plan(); };
  q('fp-exp').onchange = function () { st.exp = this.value; plan(); };
  q('fp-style').onchange = function () { st.style = this.value; plan(); };
  q('fp-int').onchange = function () { st.int = +this.value; plan(); };
  q('fp-g').oninput = function () { st.g = this.value; plan(); };

  if (p.get('h')) { st.h = p.get('h'); q('fp-h').value = st.h; }
  if (p.get('m')) { st.m = p.get('m'); q('fp-m').value = st.m; }
  plan();
  if (p.get('event') && window.fetch) {
    fetch(FEED).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
      var e = d && d.events && d.events.filter(function (x) { return x.id === p.get('event'); })[0];
      if (e) { raceName = e.name; show(); }
    }).catch(function () { /* optional */ });
    if (!raceName) { raceName = p.get('event').replace(/-/g, ' ').replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); }); show(); }
  }
})();
