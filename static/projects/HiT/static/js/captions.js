/* Caption demo: replays the stored outputs of the paper's Ego-Exo4D caption figure (static/demo/captions.json, written by
   hit_site/web_export.py): the 5 s head-IMU window plays in real time, then the three models write their captions.
   Nothing runs a model in the browser. */
(() => {
  const root = document.getElementById('capdemo');
  if (!root) return;
  const tabs = document.getElementById('capTabs'), canvas = document.getElementById('capCanvas'), status = document.getElementById('capStatus'),
        textEl = document.getElementById('capText'), replayBtn = document.getElementById('capReplay');
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('noanim');
  const ROWS = [['ref', 'Reference'], ['hit', 'HiT (ours)'], ['anymo', 'AnyMo'], ['imu4d', 'IMU4D']];
  const WRITERS = ['hit', 'anymo', 'imu4d'];
  const READ = 5.0, WPS = 13, HOLD = 7.0;           // s of signal, words per second while writing, s before the next example
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  let data = null, cur = 0, elapsed = 0, last = 0, raf = 0, visible = false, auto = true, rows = {}, caret = null, started = false;

  fetch('static/demo/captions.json').then(r => r.json()).then(d => {
    data = d;
    d.examples.forEach((e, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = e.task;
      b.addEventListener('click', () => { auto = false; select(i); });
      tabs.appendChild(b);
    });
    select(0);
    new IntersectionObserver(es => es.forEach(en => { visible = en.isIntersecting; if (visible) kick(); }), { threshold: 0.35 }).observe(root);
    new ResizeObserver(() => draw()).observe(canvas);
  });
  replayBtn.addEventListener('click', () => select(cur));
  addEventListener('hit-theme', () => draw());

  function select(i) {
    cur = i; elapsed = 0; started = false;
    [...tabs.children].forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    build();
    if (still()) elapsed = READ + 99;
    update(); draw();
    kick();
  }

  function build() {
    const e = data.examples[cur];
    textEl.innerHTML = '';
    rows = {};
    for (const [key, name] of ROWS) {
      const row = document.createElement('div');
      row.className = 'cap-row' + (key === 'hit' ? ' ours' : key === 'ref' ? ' ref' : '');
      const who = document.createElement('span'); who.className = 'who'; who.textContent = name;
      const p = document.createElement('p');
      const hl = new Set((e.hl[key] || []));
      const words = e.text[key].split(' ');
      // a shaded run of words is one <mark> (side + body part reads as one unit); trailing punctuation stays unshaded
      const spans = [];
      let mark = null;
      words.forEach((w, k) => {
        const s = document.createElement('span');
        if (hl.has(k)) {
          const m = w.match(/^(.*?)([.,;:!?]*)$/);
          if (!mark) { mark = document.createElement('mark'); p.appendChild(mark); } else mark.appendChild(document.createTextNode(' '));
          s.textContent = m[1];
          mark.appendChild(s);
          if (m[2]) { const tail = document.createElement('span'); tail.textContent = m[2]; s.tail = tail; mark.after(tail); mark = null; }
        } else {
          if (mark) mark = null;
          s.textContent = w;
          p.appendChild(s);
        }
        if (k < words.length - 1 && !(hl.has(k) && hl.has(k + 1) && mark)) p.appendChild(document.createTextNode(' '));
        spans.push(s);
      });
      row.append(who, p);
      textEl.appendChild(row);
      rows[key] = { p, spans };
    }
    caret = document.createElement('span'); caret.className = 'caret';
  }

  // shown words per row at the current time
  function update() {
    const writing = Math.max(0, elapsed - READ);
    let done = elapsed >= READ;
    for (const key of WRITERS) {
      const { spans } = rows[key];
      const k = Math.min(spans.length, Math.floor(writing * WPS));
      if (k < spans.length) done = false;
      spans.forEach((s, j) => { s.style.visibility = j < k ? 'visible' : 'hidden'; if (s.tail) s.tail.style.visibility = s.style.visibility; });
    }
    if (caret.parentNode) caret.remove();
    const hitShown = rows.hit.spans.filter(s => s.style.visibility === 'visible');
    if (elapsed >= READ && hitShown.length < rows.hit.spans.length && !still()) {
      if (hitShown.length) hitShown[hitShown.length - 1].after(caret); else rows.hit.p.prepend(caret);
    }
    rows.ref.p.classList.toggle('shade', done);
    rows.hit.p.classList.toggle('shade', done);
    if (elapsed < READ) status.innerHTML = `Reading the head IMU&ensp;<b>${elapsed.toFixed(1)} s</b> / ${READ.toFixed(1)} s`;
    else if (!done) status.innerHTML = 'Writing the captions&hellip;';
    else status.textContent = 'Shaded: words of HiT’s caption that are also in the reference.';
    return done;
  }

  function kick() {
    if (!data || !visible || raf || still()) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function tick(now) {
    raf = 0;
    if (!visible) return;
    let dt = (now - last) / 1000;
    if (dt > 0.5) dt = 0;                           // the tab was hidden: resume where it was
    last = now;
    const before = elapsed;
    elapsed += dt;
    const done = update();
    if (before < READ + 0.05 || elapsed < READ + 0.05) draw();
    if (done && auto && elapsed - READ - lastWords() / WPS > HOLD) { select((cur + 1) % data.examples.length); return; }
    if (!done || auto) raf = requestAnimationFrame(tick);
  }

  const lastWords = () => Math.max(...WRITERS.map(k => rows[k].spans.length));

  function draw() {
    if (!data) return;
    const e = data.examples[cur], dpr = Math.min(devicePixelRatio || 1, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W) return;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const g = canvas.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);
    const col = [css('--ax-x'), css('--ax-y'), css('--ax-z')], hair = css('--hair'), muted = css('--muted'), ink2 = css('--ink2');
    const n = e.sig.length, T = n / e.hz, left = 44, right = 6, top = 16, gap = 30, bottom = 22;
    const sh = (H - top - gap - bottom) / 2;
    const tNow = Math.min(elapsed, READ), upto = Math.min(n, Math.ceil(tNow / READ * n));
    const x = t => left + (W - left - right) * t / T;
    g.font = '11px Inter, system-ui, sans-serif';
    [['acc. (m/s²)', 0], ['gyro (rad/s)', 3]].forEach(([name, c0], s) => {
      const y0 = top + s * (sh + gap);
      let lo = Infinity, hi = -Infinity;
      for (const r of e.sig) for (let a = 0; a < 3; a++) { lo = Math.min(lo, r[c0 + a]); hi = Math.max(hi, r[c0 + a]); }
      const pad = (hi - lo) * 0.08 || 1;
      lo -= pad; hi += pad;
      const y = v => y0 + sh * (1 - (v - lo) / (hi - lo));
      g.fillStyle = muted; g.textAlign = 'left'; g.fillText(name, left, y0 - 4);
      g.strokeStyle = hair; g.lineWidth = 1;
      g.beginPath(); g.moveTo(left, y0 + sh + 0.5); g.lineTo(W - right, y0 + sh + 0.5); g.stroke();
      const ticks = niceTicks(lo, hi);
      g.textAlign = 'right';
      for (const v of ticks) {
        g.strokeStyle = hair; g.beginPath(); g.moveTo(left, Math.round(y(v)) + 0.5); g.lineTo(W - right, Math.round(y(v)) + 0.5); g.stroke();
        g.fillStyle = muted; g.fillText(fmt(v), left - 6, y(v) + 4);
      }
      for (let a = 0; a < 3; a++) {
        g.strokeStyle = col[a]; g.lineWidth = 1.4; g.lineJoin = 'round';
        g.beginPath();
        for (let i = 0; i < upto; i++) { const px = x(i / e.hz), py = y(e.sig[i][c0 + a]); i ? g.lineTo(px, py) : g.moveTo(px, py); }
        g.stroke();
      }
    });
    g.fillStyle = muted; g.textAlign = 'center';
    for (let s = 0; s <= Math.floor(T); s++) g.fillText(s + (s === Math.floor(T) ? ' s' : ''), x(s), H - 6);
    if (elapsed < READ) {
      const px = x(tNow);
      g.strokeStyle = ink2; g.lineWidth = 1.5;
      g.beginPath(); g.moveTo(px, top - 2); g.lineTo(px, H - bottom); g.stroke();
    }
  }

  function niceTicks(lo, hi) {
    const span = hi - lo, raw = span / 3, mag = 10 ** Math.floor(Math.log10(raw)), f = raw / mag;
    const step = (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi; v += step) out.push(Math.abs(v) < step * 1e-6 ? 0 : v);
    return out;
  }
  const fmt = v => (Math.abs(v) >= 10 || Number.isInteger(v) ? v.toFixed(0) : v.toFixed(1)).replace('-', '−');
})();
