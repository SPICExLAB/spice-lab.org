/* HiT project page. All numbers are from the paper and its supplementary material. */

// ---- links: fill these in when the paper and the code are public; empty = the button shows "soon"
const LINKS = {
  arxiv: '',   // e.g. 'https://arxiv.org/abs/xxxx.xxxxx'
  code: '',    // e.g. 'https://github.com/...'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// chart colours follow the theme: read from the CSS tokens before every draw
const COL = {};
function refreshColors() {
  const st = getComputedStyle(document.documentElement), g = n => st.getPropertyValue(n).trim();
  Object.assign(COL, { s1: g('--s1'), s2: g('--s2'), s3: g('--s3'), neutral: g('--neutral'), ink: g('--ink'), ink2: g('--ink2'),
    muted: g('--muted'), hair: g('--hair'), surface: g('--chart-surface') });
}
refreshColors();

// ---- background orbs: each follows its own loop as the page scrolls (eased), and breathes on its own (CSS)
const ORBS = [   // centre (vw, vh), radius of its path (vw, vh), turns per page, phase
  [14, 20, 14, 24, 1.0, 0.00], [86, 12, 12, 28, 0.8, 0.30], [58, 86, 22, 18, 1.2, 0.55],
  [6, 74, 16, 22, 0.9, 0.75], [80, 64, 18, 22, 1.1, 0.15], [42, 38, 24, 26, 0.7, 0.45]];
const orbEls = $$('.orb');
let pNow = 0, pGoal = 0, orbRaf = 0;
function placeOrbs() {
  pNow += (pGoal - pNow) * 0.07;
  orbEls.forEach((o, i) => {
    const [x, y, ax, ay, f, ph] = ORBS[i], a = 2 * Math.PI * (f * pNow * 1.5 + ph);
    o.style.transform = `translate(${(x + ax * Math.sin(a)).toFixed(2)}vw, ${(y + ay * Math.cos(a)).toFixed(2)}vh) scale(${(1 + 0.18 * Math.sin(a * 0.7 + i)).toFixed(3)})`;
  });
  orbRaf = Math.abs(pGoal - pNow) > 0.0004 ? requestAnimationFrame(placeOrbs) : 0;
}
function orbScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  pGoal = max > 0 ? scrollY / max : 0;
  if (!orbRaf) orbRaf = requestAnimationFrame(placeOrbs);
}
pNow = -0.0001; orbScroll();
if (!reduce) addEventListener('scroll', orbScroll, { passive: true });

$$('[data-link]').forEach(a => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.removeAttribute('aria-disabled'); a.target = '_blank'; a.rel = 'noopener'; }
  else { a.title = 'Coming soon'; a.addEventListener('click', e => e.preventDefault()); }
});

// ---- nav background after the hero
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.6);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// ---- reveal on scroll, count-up of the hero numbers
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  $$('[data-count]', e.target).forEach(countUp);
}), { threshold: 0.12 });
$$('.reveal').forEach(el => io.observe(el));
if (/[?&]noanim/.test(location.search)) document.documentElement.classList.add('noanim');
if (/[?&]noanim/.test(location.search)) $$('.reveal').forEach(el => {          // for screenshots: everything shown at once
  io.unobserve(el); el.classList.add('in'); $$('[data-count]', el).forEach(c => { c.textContent = c.dataset.count + (c.dataset.suffix || ''); });
});
function countUp(el) {
  const end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '', dec = (el.dataset.count.split('.')[1] || '').length;
  if (reduce) { el.textContent = end.toFixed(dec) + suf; return; }
  const t0 = performance.now(), dur = 1300;
  const step = t => { const k = Math.min(1, (t - t0) / dur), v = end * (1 - Math.pow(1 - k, 3)); el.textContent = v.toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
if (reduce) $$('video[autoplay]').forEach(v => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });

// ---- tooltip
const tip = document.createElement('div'); tip.id = 'tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip);
function showTip(html, x, y) {
  tip.innerHTML = html; tip.style.opacity = 1;
  const w = tip.offsetWidth, h = tip.offsetHeight;
  tip.style.left = Math.min(innerWidth - w - 10, x + 14) + 'px';
  tip.style.top = (y + h + 20 > innerHeight ? y - h - 12 : y + 14) + 'px';
}
const hideTip = () => { tip.style.opacity = 0; };
function hover(svg) {
  svg.addEventListener('mousemove', e => { const t = e.target.closest('[data-tip]'); t ? showTip(t.dataset.tip, e.clientX, e.clientY) : hideTip(); });
  svg.addEventListener('mouseleave', hideTip);
  svg.addEventListener('focusin', e => { const t = e.target.closest('[data-tip]'); if (t) { const b = t.getBoundingClientRect(); showTip(t.dataset.tip, b.right, b.top); } });
  svg.addEventListener('focusout', hideTip);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const at = s => esc(s);

// ---- robustness demo: clips + dumbbell chart (Supplementary H: IMUPoser P9-P10, watch + pocket phone + earbuds, models trained on
// P1-P8; ProbIP reads both watches and the earbuds and starts from the ground-truth pose; mean MPJPE over the 34 test recordings)
const TESTS = {
  calib: {
    clips: [['Walking', 'calib_walking'], ['Lower body', 'calib_lowerbody']],
    note: 'Each clip plays the same recording twice: first with calibrated inputs, then with every device turned on the body and a random world heading. Columns: MobilePoser, IMU4D, HiT and the ground truth (ProbIP is in the chart only).',
    a: 'Calibrated', b: 'Without calibration',
    rows: [['MobilePoser', 7.31, 23.41], ['ProbIP', 9.11, 23.55], ['IMU4D', 7.21, 15.82], ['HiT (ours)', 5.50, 5.55]],
    foot: 'Across MobilePoser\'s twelve device combinations, removing calibration raises its error from 8.15 to 23.14 cm; on DIP-IMU, remounting raises IMU4D\'s from 8.78 to 25.97 cm while HiT goes from 7.82 to 7.88 cm.',
  },
  place: {
    clips: [['Waving', 'place_waving']],
    note: 'The same signals in both halves: a left watch, a right-pocket phone and the earbuds. In the second half the baselines are told the watch is on the right wrist and the phone in the left pocket (in the chart, ProbIP gets its two wrists swapped). HiT takes no placement label, so its output does not change. Columns: MobilePoser, IMU4D, HiT and the ground truth.',
    a: 'Correct placement label', b: 'Wrong placement label',
    rows: [['MobilePoser', 7.31, 16.83], ['ProbIP', 9.11, 22.45], ['IMU4D', 7.21, 9.16], ['HiT (ours)', 5.50, 5.50]],
    foot: 'HiT is placement-free: it infers the body segment of every sensor itself.',
  },
};
let test = 'calib', clip = 0;
function setTest(t) {
  test = t; clip = 0;
  $$('.tabs [role=tab]').forEach(b => b.setAttribute('aria-selected', String(b.dataset.test === t)));
  const T = TESTS[t];
  $('#clipChips').innerHTML = T.clips.length > 1 ? T.clips.map((c, i) => `<button class="chip" aria-pressed="${i === 0}" data-i="${i}">${c[0]}</button>`).join('') : '';
  $('#demoNote').textContent = T.note;
  $('#legA').textContent = T.a; $('#legB').textContent = T.b;
  $('#dumbNote').textContent = T.foot;
  setClip(0); drawDumbbell();
}
function setClip(i) {
  clip = i;
  $$('#clipChips .chip').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
  const v = $('#demoVideo'), name = TESTS[test].clips[i][1];
  v.poster = `static/video/${name}.jpg`; v.src = `static/video/${name}.mp4`;
  if (!reduce) v.play().catch(() => {}); else v.controls = true;
}
$$('.tabs [role=tab]').forEach(b => b.addEventListener('click', () => setTest(b.dataset.test)));
$('#clipChips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) setClip(+b.dataset.i); });

function drawDumbbell() {
  const T = TESTS[test], el = $('#dumbbell');
  const W = 420, rowH = 46, top = 8, left = 104, right = 18, H = top + T.rows.length * rowH + 30, xmax = 25;
  const x = v => left + (W - left - right) * v / xmax;
  let s = `<svg viewBox="0 0 ${W} ${H}" aria-label="Mean pose error (MPJPE, cm) of four methods, ${at(T.a)} versus ${at(T.b)}">`;
  for (let g = 0; g <= xmax; g += 5) s += `<line x1="${x(g)}" x2="${x(g)}" y1="${top}" y2="${H - 26}" stroke="${COL.hair}"/><text x="${x(g)}" y="${H - 10}" font-size="11" fill="${COL.muted}" text-anchor="middle">${g}</text>`;
  s += `<text x="${W - right}" y="${H - 10}" font-size="11" fill="${COL.muted}" text-anchor="end" dx="0" dy="0"></text>`;
  T.rows.forEach(([name, a, b], i) => {
    const y = top + i * rowH + rowH / 2, ours = name.startsWith('HiT'), c = ours ? COL.s3 : COL.neutral;
    s += `<g class="row" data-tip="<b>${at(name)}</b><br>${at(T.a)}: <b>${a.toFixed(2)} cm</b><br>${at(T.b)}: <b>${b.toFixed(2)} cm</b>" tabindex="0">`;
    s += `<rect x="0" y="${y - rowH / 2}" width="${W}" height="${rowH}" fill="transparent"/>`;
    s += `<text x="${left - 12}" y="${y + 4}" font-size="13" text-anchor="end" fill="${COL.ink}" font-weight="${ours ? 700 : 500}">${at(name)}</text>`;
    s += `<line class="db" x1="${x(a)}" x2="${x(b)}" y1="${y}" y2="${y}" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`;
    s += `<circle cx="${x(a)}" cy="${y}" r="5.5" fill="${COL.surface}" stroke="${c}" stroke-width="2"/>`;
    s += `<circle class="dbend" cx="${x(b)}" cy="${y}" r="5.5" fill="${c}" stroke="${COL.surface}" stroke-width="2"/>`;
    const lx = Math.max(x(a), x(b)) + 10, label = Math.abs(b - a) < 0.005 ? `${a.toFixed(2)}, unchanged` : `${a.toFixed(2)} → ${b.toFixed(2)}`;
    s += `<text x="${Math.min(lx, W - right)}" y="${y - 10}" font-size="11.5" fill="${COL.ink2}" text-anchor="${lx > W - 120 ? 'end' : 'start'}">${label}</text>`;
    s += `</g>`;
  });
  s += `<text x="${left}" y="${H - 10}" font-size="11" fill="${COL.muted}" text-anchor="start" dx="-40"></text></svg>`;
  el.innerHTML = s + `<div class="note" style="margin-top:2px">MPJPE in cm, lower is better.</div>`;
  if (!reduce) $$('.db', el).forEach(l => { const x2 = l.getAttribute('x2'); l.setAttribute('x2', l.getAttribute('x1')); requestAnimationFrame(() => { l.style.transition = 'all .9s cubic-bezier(.2,.7,.2,1)'; l.setAttribute('x2', x2); }); });
  hover(el.querySelector('svg'));
}
setTest('calib');

// ---- placement accuracy per body segment (Nymeria test split, 168 sequences, relocated sensors; overall 93.64 %)
const PLACE = [['Head', 98.91], ['Chest', 95.79], ['Pelvis', 96.77], ['Shoulder', 97.16, 96.18], ['Upper arm', 95.66, 96.35], ['Forearm', 94.13, 94.41],
  ['Hand', 85.77, 87.33], ['Thigh', 92.46, 92.45], ['Lower leg', 90.45, 89.52], ['Foot', 90.11, 89.93]];
function drawPlace() {
  const el = $('#placeChart'), narrow = el.clientWidth < 560;
  const W = narrow ? 360 : 900, rowH = narrow ? 30 : 34, top = 10, left = narrow ? 86 : 120, right = 24, H = top + PLACE.length * rowH + 30;
  const lo = 84, hi = 100, x = v => left + (W - left - right) * (v - lo) / (hi - lo);
  let s = `<svg viewBox="0 0 ${W} ${H}" aria-label="Placement accuracy per body segment, between 85.8 and 98.9 percent; 93.6 percent over all sensors">`;
  for (let g = lo; g <= hi; g += 2) s += `<line x1="${x(g)}" x2="${x(g)}" y1="${top}" y2="${H - 26}" stroke="${COL.hair}"/><text x="${x(g)}" y="${H - 9}" font-size="11" fill="${COL.muted}" text-anchor="middle">${g}%</text>`;
  s += `<line x1="${x(93.64)}" x2="${x(93.64)}" y1="${top - 4}" y2="${H - 26}" stroke="${COL.ink2}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  PLACE.forEach(([name, l, r], i) => {
    const y = top + i * rowH + rowH / 2;
    const tipTxt = r === undefined ? `<b>${name}</b>: <b>${l.toFixed(1)}%</b>` : `<b>${name}</b><br>left <b>${l.toFixed(1)}%</b> &middot; right <b>${r.toFixed(1)}%</b>`;
    s += `<g data-tip="${tipTxt}" tabindex="0"><rect x="0" y="${y - rowH / 2}" width="${W}" height="${rowH}" fill="transparent"/>`;
    s += `<text x="${left - 12}" y="${y + 4}" font-size="13" text-anchor="end" fill="${COL.ink}">${name}</text>`;
    if (r !== undefined) s += `<line x1="${x(Math.min(l, r))}" x2="${x(Math.max(l, r))}" y1="${y}" y2="${y}" stroke="${COL.s3}" stroke-width="2"/>`;
    s += `<circle cx="${x(l)}" cy="${y}" r="6" fill="${COL.s3}" stroke="${COL.surface}" stroke-width="2"/>`;
    if (r !== undefined) s += `<circle cx="${x(r)}" cy="${y}" r="5.5" fill="${COL.surface}" stroke="${COL.s3}" stroke-width="2"/>`;
    if (name === 'Hand' || name === 'Head') s += `<text x="${x(Math.max(l, r || 0)) + 12}" y="${y + 4}" font-size="11.5" fill="${COL.ink2}">${name === 'Hand' ? '85.8 / 87.3%' : '98.9%'}</text>`;
    s += `</g>`;
  });
  s += `</svg>`;
  el.innerHTML = s; hover(el.querySelector('svg'));
}

// ---- zero-shot activity recognition (paper Table 2, accuracy %)
const HAR = {
  sets: ['Opportunity', 'UCI-HAR', 'w-HAR', 'RealWorld', 'TNDA-HAR', 'PAMAP2', 'USC-HAD', 'WISDM', 'DSADS', 'UTD-MHAD', 'Mean'],
  series: [['UniMTS', COL.s2, [45.9, 35.2, 59.0, 43.6, 59.1, 47.2, 30.5, 27.8, 31.5, 22.8, 40.3]],
           ['AnyMo', COL.s1, [59.4, 56.5, 57.4, 48.4, 59.4, 52.6, 27.7, 25.4, 36.3, 16.3, 43.9]],
           ['HiT (ours)', COL.s3, [73.6, 66.6, 76.0, 81.8, 99.8, 74.0, 54.6, 48.1, 51.7, 24.5, 65.1]]],
};
function roundedBar(x, y, w, h, r, horiz) {         // a bar anchored on its baseline, rounded at the data end only
  r = Math.min(r, horiz ? h / 2 : w / 2, horiz ? w : h);
  if (horiz) return `M${x},${y}h${w - r}a${r},${r} 0 0 1 ${r},${r}v${h - 2 * r}a${r},${r} 0 0 1 -${r},${r}h-${w - r}z`;
  return `M${x},${y + h}v-${h - r}a${r},${r} 0 0 1 ${r},-${r}h${w - 2 * r}a${r},${r} 0 0 1 ${r},${r}v${h - r}z`;
}
function groupTip(i) {
  return `<b>${HAR.sets[i]}</b>` + HAR.series.map(([n, c, v]) => `<br><span class="k" style="background:${c}"></span>${n}: <b>${v[i].toFixed(1)}%</b>`).join('');
}
function drawHar() {
  const el = $('#harChart'), narrow = el.clientWidth < 640, n = HAR.sets.length, S = HAR.series.length;
  let s;
  if (!narrow) {
    const W = 1000, H = 340, top = 14, bottom = 44, left = 40, right = 8, gw = (W - left - right) / n, bw = Math.min(22, (gw - 18) / S);
    const y = v => top + (H - top - bottom) * (1 - v / 100);
    s = `<svg viewBox="0 0 ${W} ${H}" aria-label="Zero-shot accuracy on ten datasets: HiT is highest on all ten; mean 65.1 versus 43.9 for AnyMo and 40.3 for UniMTS">`;
    for (let g = 0; g <= 100; g += 20) s += `<line x1="${left}" x2="${W - right}" y1="${y(g)}" y2="${y(g)}" stroke="${COL.hair}"/><text x="${left - 8}" y="${y(g) + 4}" font-size="11" fill="${COL.muted}" text-anchor="end">${g}</text>`;
    HAR.sets.forEach((name, i) => {
      const gx = left + gw * i, x0 = gx + (gw - (bw * S + 2 * (S - 1))) / 2, mean = name === 'Mean';
      if (mean) s += `<rect x="${gx + 2}" y="${top}" width="${gw - 4}" height="${H - top - bottom}" rx="8" fill="rgba(27,175,122,.10)"/>`;
      s += `<g data-tip="${groupTip(i).replace(/"/g, '&quot;')}" tabindex="0"><rect x="${gx}" y="${top}" width="${gw}" height="${H - top - bottom}" fill="transparent"/>`;
      HAR.series.forEach(([sn, c, v], k) => {
        const bx = x0 + k * (bw + 2), by = y(v[i]);
        s += `<path class="bar" d="${roundedBar(bx, by, bw, y(0) - by, 4, false)}" fill="${c}"/>`;
        if (k === S - 1) s += `<text x="${bx + bw / 2}" y="${by - 6}" font-size="11" font-weight="700" fill="${COL.ink}" text-anchor="middle">${v[i].toFixed(1)}</text>`;
      });
      s += `<text x="${gx + gw / 2}" y="${H - bottom + 18}" font-size="12" fill="${COL.ink}" font-weight="${mean ? 700 : 500}" text-anchor="middle">${name}</text></g>`;
    });
    s += `<line x1="${left}" x2="${W - right}" y1="${y(0)}" y2="${y(0)}" stroke="${COL.ink2}"/></svg>`;
  } else {
    const W = 360, gh = 64, top = 6, left = 92, right = 36, H = top + n * gh + 24, bh = 14;
    const x = v => left + (W - left - right) * v / 100;
    s = `<svg viewBox="0 0 ${W} ${H}" aria-label="Zero-shot accuracy on ten datasets: HiT is highest on all ten; mean 65.1 versus 43.9 for AnyMo and 40.3 for UniMTS">`;
    for (let g = 0; g <= 100; g += 25) s += `<line x1="${x(g)}" x2="${x(g)}" y1="${top}" y2="${H - 20}" stroke="${COL.hair}"/><text x="${x(g)}" y="${H - 6}" font-size="10.5" fill="${COL.muted}" text-anchor="middle">${g}</text>`;
    HAR.sets.forEach((name, i) => {
      const gy = top + i * gh, y0 = gy + (gh - (bh * S + 2 * (S - 1))) / 2;
      s += `<g data-tip="${groupTip(i).replace(/"/g, '&quot;')}" tabindex="0"><rect x="0" y="${gy}" width="${W}" height="${gh}" fill="transparent"/>`;
      s += `<text x="${left - 8}" y="${gy + gh / 2 + 4}" font-size="12" text-anchor="end" fill="${COL.ink}" font-weight="${name === 'Mean' ? 700 : 500}">${name}</text>`;
      HAR.series.forEach(([sn, c, v], k) => {
        const by = y0 + k * (bh + 2);
        s += `<path d="${roundedBar(x(0), by, x(v[i]) - x(0), bh, 4, true)}" fill="${c}"/>`;
        if (k === S - 1) s += `<text x="${x(v[i]) + 5}" y="${by + bh - 3}" font-size="10.5" font-weight="700" fill="${COL.ink}">${v[i].toFixed(1)}</text>`;
      });
      s += `</g>`;
    });
    s += `<line x1="${x(0)}" x2="${x(0)}" y1="${top}" y2="${H - 20}" stroke="${COL.ink2}"/></svg>`;
  }
  el.innerHTML = s; hover(el.querySelector('svg'));
}
function harTable() {
  const rows = HAR.series.map(([n, c, v]) => `<tr class="${n.startsWith('HiT') ? 'ours' : ''}"><td>${n}</td>${v.map(x => `<td>${x.toFixed(1)}</td>`).join('')}</tr>`).join('');
  $('#harTable').innerHTML = `<table><thead><tr><th>Zero-shot accuracy (%)</th>${HAR.sets.map(s => `<th>${s}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
}
harTable();
$('#harTableBtn').addEventListener('click', e => {
  const t = $('#harTable'), open = t.hidden; t.hidden = !open;
  e.currentTarget.setAttribute('aria-expanded', String(open)); e.currentTarget.textContent = open ? 'Hide table' : 'Show as table';
});

// ---- language bars: one scale per row
$$('.metric').forEach(m => {
  const vs = $$('.m-bar i', m).map(i => parseFloat(i.style.getPropertyValue('--v')));
  m.querySelector('.m-bar').style.setProperty('--max', (Math.max(...vs) * 1.06).toFixed(2));
});

// ---- BibTeX copy
$('#copyBib').addEventListener('click', async e => {
  try { await navigator.clipboard.writeText($('#bibText').textContent); e.currentTarget.textContent = 'Copied'; }
  catch (_) { e.currentTarget.textContent = 'Select and copy'; }
  setTimeout(() => { e.currentTarget.textContent = 'Copy'; }, 1600);
});

// ---- charts follow the container width
let lastW = 0;
const redraw = () => { const w = $('#harChart').clientWidth; if (Math.abs(w - lastW) < 2) return; lastW = w; drawHar(); drawPlace(); };
redraw();
new ResizeObserver(redraw).observe($('#harChart'));

// ---- dark / light theme (choice kept in localStorage; charts read their colours from the CSS tokens)
const themeBtn = $('#themeBtn');
function setTheme(t, save) {
  document.documentElement.dataset.theme = t;
  const next = t === 'light' ? 'dark' : 'light';
  themeBtn.setAttribute('aria-label', `Switch to ${next} mode`);
  themeBtn.title = `Switch to ${next} mode`;
  if (save) { try { localStorage.setItem('hit-theme', t); } catch (e) {} }
  refreshColors(); lastW = 0; redraw(); drawDumbbell();
  dispatchEvent(new Event('hit-theme'));            // the 3D and caption demos repaint
}
setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark', false);
themeBtn.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true));
