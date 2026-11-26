/* Pose demo: SMPL renders of IMUPoser test recordings (paper Fig. 4 and three more) for MobilePoser, ProbIP, IMU4D, HiT and
   the ground truth, one video per recording and input setting (hit_site/web_render.py), with the stored per-frame MPJPE
   under each body and an error timeline that seeks the video. Nothing runs a model in the browser. */
(() => {
  const root = document.getElementById('pose3d');
  if (!root) return;
  const $ = s => root.querySelector(s);
  const video = $('#p3Video'), labelsEl = $('#p3Labels'), recSel = $('#p3Rec'), playBtn = $('#p3Play'), track = $('#p3Track'),
        clock = $('#p3Clock'), note = $('#p3Note');
  const still = () => document.documentElement.classList.contains('noanim') || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const BASE = 'static/demo/pose/', VID = 'static/video/pose/';
  const COLS = [['MobilePoser', 0], ['ProbIP', 1], ['IMU4D_ft', 2], ['HiT_ft', 3], ['GT', -1]];
  let meta = null, rec = null, setting = 0, visible = false, raf = 0, wantPlay = !still(), labs = [], head = null, tx = t => t, dragging = false;

  fetch(BASE + 'index.json').then(r => r.json()).then(m => {
    meta = m;
    m.recordings.forEach((r, i) => {
      const o = document.createElement('option');
      o.value = i; o.textContent = `${r.label} · ${r.participant}${r.fig4 ? ' (Fig. 4)' : ''}`;
      recSel.appendChild(o);
    });
    labs = COLS.map(([key, mi], i) => {
      const el = document.createElement('div');
      el.className = 'p3-lab' + (mi === 3 ? ' ours' : '') + (mi < 0 ? ' gt' : '');
      el.style.left = `${100 * m.video.col_x[i]}%`;
      el.style.setProperty('--c', m.video.colors[key]);
      const full = mi < 0 ? 'Ground truth' : m.models[mi], short = mi < 0 ? 'GT' : full.replace(' (ours)', '');
      el.innerHTML = `<span class="nm"><i></i><span class="full">${full}</span><span class="short">${short}</span></span><span class="er">${mi < 0 ? 'devices as worn' : ''}</span>`;
      labelsEl.appendChild(el);
      return el;
    });
    load(0, true);
    new IntersectionObserver(es => es.forEach(en => {
      visible = en.isIntersecting;
      if (visible) { if (wantPlay) video.play().catch(() => {}); kick(); } else video.pause();
    }), { threshold: 0.2 }).observe(video);
    new ResizeObserver(() => drawTrack()).observe(track);
  });

  const dur = () => (rec ? rec.frames / rec.fps : 1);
  // before the video has data the poster is on screen: the Fig. 4 frame, else the middle frame (web_render.py)
  const fi = () => (video.readyState < 1 ? (rec.fig_frame ?? Math.floor(rec.frames / 2))
    : Math.max(0, Math.min(rec.frames - 1, Math.floor(video.currentTime * rec.fps + 1e-3))));

  function src(i, s) { const r = meta.recordings[i]; return `${VID}${r.key}__${meta.settings[s]}`; }

  function load(i, first) {
    rec = meta.recordings[i];
    const t0 = first && rec.fig_frame !== null ? (still() ? rec.fig_frame / rec.fps : Math.max(0, rec.fig_frame / rec.fps - 2)) : 0;
    swap(t0);
    drawTrack(); writeNote();
  }

  function swap(t) {
    const base = src(meta.recordings.indexOf(rec), setting);
    video.poster = base + '.jpg';
    video.src = base + '.mp4';
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(t, dur() - 0.01) + (still() ? 0.5 / rec.fps : 0);
      if (wantPlay && visible) video.play().catch(() => {});
      update();
    }, { once: true });
  }

  function update() {
    if (!rec) return;
    const f = fi();
    COLS.forEach(([, mi], i) => {
      if (mi < 0) return;
      const e = rec.mpjpe_cm[`${meta.settings[setting]}/${meta.models[mi]}`][f];
      labs[i].querySelector('.er').innerHTML = `${e.toFixed(1)}<small>cm</small>`;
    });
    const t = video.readyState < 1 ? (f + 0.5) / rec.fps : video.currentTime;
    clock.textContent = `${t.toFixed(1)} s`;
    track.setAttribute('aria-valuenow', String(Math.round(100 * t / dur())));
    if (head) head.setAttribute('transform', `translate(${tx(t).toFixed(1)},0)`);
  }

  function loop() {
    raf = 0;
    update();
    if (visible && !video.paused) raf = requestAnimationFrame(loop);
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }
  video.addEventListener('play', () => { playBtn.classList.remove('paused'); playBtn.setAttribute('aria-label', 'Pause'); kick(); });
  video.addEventListener('pause', () => { playBtn.classList.add('paused'); playBtn.setAttribute('aria-label', 'Play'); update(); });
  video.addEventListener('seeked', update);
  playBtn.classList.toggle('paused', !wantPlay);
  playBtn.addEventListener('click', () => {
    wantPlay = video.paused;
    if (wantPlay) video.play().catch(() => {}); else video.pause();
  });

  root.querySelectorAll('.seg button').forEach((b, i) => b.addEventListener('click', () => {
    if (i === setting) return;
    setting = i;
    root.querySelectorAll('.seg button').forEach((x, k) => x.setAttribute('aria-pressed', String(k === i)));
    swap(video.currentTime);
    drawTrack(); writeNote();
  }));
  recSel.addEventListener('change', () => load(+recSel.value, false));
  addEventListener('hit-theme', () => drawTrack());

  function drawTrack() {
    if (!rec) return;
    const W = track.clientWidth, H = track.clientHeight, left = 30, right = 4, top = 8, bottom = 4;
    if (!W) return;
    const key = m => `${meta.settings[setting]}/${meta.models[m]}`;
    let mx = 0;
    for (let m = 0; m < 4; m++) for (const v of rec.mpjpe_cm[key(m)]) mx = Math.max(mx, v);
    const ymax = Math.max(10, Math.ceil(mx / 10) * 10);
    tx = t => left + (W - left - right) * t / dur();
    const y = v => top + (H - top - bottom) * (1 - Math.min(v, ymax) / ymax);
    let s = `<svg viewBox="0 0 ${W} ${H}" aria-hidden="true">`;
    for (const v of [0, ymax / 2, ymax]) s += `<line x1="${left}" x2="${W - right}" y1="${y(v)}" y2="${y(v)}" stroke="${css('--hair')}"/><text x="${left - 6}" y="${y(v) + 3.5}" font-size="10" fill="${css('--muted')}" text-anchor="end">${v}</text>`;
    s += `<text x="${left + 4}" y="${top + 2}" font-size="10" fill="${css('--muted')}" dominant-baseline="hanging">MPJPE (cm)</text>`;
    s += `<text x="${W - right}" y="${top + 2}" font-size="10" text-anchor="end" dominant-baseline="hanging"><tspan fill="${css('--s3')}" font-weight="700">HiT</tspan><tspan fill="${css('--muted')}" dx="8">baselines (gray)</tspan></text>`;
    for (const m of [0, 1, 2, 3]) {
      const e = rec.mpjpe_cm[key(m)], ours = m === 3;
      let d = '';
      for (let i = 0; i < e.length; i++) d += `${i ? 'L' : 'M'}${tx((i + 0.5) / rec.fps).toFixed(1)},${y(e[i]).toFixed(1)}`;
      s += `<path d="${d}" fill="none" stroke="${ours ? css('--s3') : css('--neutral')}" stroke-width="${ours ? 2 : 1.1}" stroke-opacity="${ours ? 1 : 0.75}" stroke-linejoin="round"/>`;
    }
    if (rec.fig_frame !== null) {
      const fx = tx((rec.fig_frame + 0.5) / rec.fps);
      s += `<path d="M${fx - 5},${top - 8} L${fx + 5},${top - 8} L${fx},${top - 2} Z" fill="${css('--ink2')}"><title>Frame shown in Fig. 4 of the paper</title></path>`;
    }
    s += `<g><line x1="0" x2="0" y1="${top - 2}" y2="${H}" stroke="${css('--ink')}" stroke-width="1.5"/></g></svg>`;
    track.innerHTML = s;
    head = track.querySelector('g');
    update();
  }

  function seek(ev) {
    const r = track.getBoundingClientRect(), W = track.clientWidth;
    const x = Math.max(30, Math.min(W - 4, ev.clientX - r.left));
    video.currentTime = Math.min(dur() - 0.01, (x - 30) / (W - 34) * dur());
    update();
  }
  track.addEventListener('pointerdown', ev => { dragging = true; track.setPointerCapture(ev.pointerId); seek(ev); });
  track.addEventListener('pointermove', ev => { if (dragging) seek(ev); });
  track.addEventListener('pointerup', () => { dragging = false; });
  track.addEventListener('pointercancel', () => { dragging = false; });
  track.addEventListener('keydown', ev => {
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
      video.currentTime = Math.max(0, Math.min(dur() - 0.01, video.currentTime + (ev.key === 'ArrowRight' ? 0.5 : -0.5)));
      ev.preventDefault();
    } else if (ev.key === ' ') { playBtn.click(); ev.preventDefault(); }
  });

  function writeNote() {
    const k = meta.settings[setting], r = rec.recording_mean_cm, f = v => v.toFixed(2);
    note.innerHTML = `Mean over the whole recording: ${meta.models.map(m => `${m.replace(' (ours)', '')} ${m.startsWith('HiT') ? '<b>' + f(r[`${k}/${m}`]) + '</b>' : f(r[`${k}/${m}`])}`).join(', ')} cm. ` +
      (setting ? 'Without calibration, every device gets a random mounting rotation and a random world heading. ' : '') +
      'MobilePoser, IMU4D and HiT read the left watch, the right-pocket phone and the earbuds (orange on the ground truth); ' +
      'ProbIP reads both watches and the earbuds. Stored outputs of the paper’s runs; the triangle on the timeline marks the frame of Fig. 4.';
  }
})();
