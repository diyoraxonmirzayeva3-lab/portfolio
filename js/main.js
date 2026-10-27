/* =========================================================
   js/main.js — interaktivlik
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;

  /* ---------- THEME ---------- */
  const themeBtn = $('#themeBtn'), themeIcon = $('#themeIcon');
  const savedTheme = localStorage.getItem('theme') ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const setTheme = t => {
    root.dataset.theme = t;
    themeIcon.textContent = t === 'dark' ? '☾' : '☀';
    localStorage.setItem('theme', t);
    initParticles();
  };
  themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  /* ---------- LANGUAGE ---------- */
  const langBtn = $('#langBtn');
  let lang = localStorage.getItem('lang') || 'uz';
  const setLang = l => {
    lang = l;
    root.lang = l;
    localStorage.setItem('lang', l);
    langBtn.textContent = l.toUpperCase() === 'UZ' ? 'EN' : 'UZ'; // keyingi til
    $$('[data-i18n]').forEach(el => {
      const v = I18N[l][el.dataset.i18n];
      if (v) el.textContent = v;
    });
    restartTyping();
  };
  langBtn.addEventListener('click', () => setLang(lang === 'uz' ? 'en' : 'uz'));

  /* ---------- TYPING ---------- */
  const typed = $('#typed');
  let typeTimer, ri = 0, ci = 0, del = false;
  function tick() {
    const words = I18N[lang].roles, w = words[ri % words.length];
    typed.textContent = w.slice(0, ci);
    if (!del && ci === w.length) { del = true; typeTimer = setTimeout(tick, 1400); return; }
    if (del && ci === 0) { del = false; ri++; }
    ci += del ? -1 : 1;
    typeTimer = setTimeout(tick, del ? 40 : 85);
  }
  function restartTyping() { clearTimeout(typeTimer); ri = 0; ci = 0; del = false; tick(); }

  /* ---------- PARTICLES BACKGROUND ---------- */
  const cv = $('#bg'), ctx = cv.getContext('2d');
  let pts = [], mouse = { x: -999, y: -999 };
  function initParticles() {
    cv.width = innerWidth; cv.height = innerHeight;
    const n = Math.min(90, Math.floor(innerWidth / 16));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * cv.width, y: Math.random() * cv.height,
      vx: (Math.random() - .5) * .5, vy: (Math.random() - .5) * .5, r: Math.random() * 2 + .6
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    const cs = getComputedStyle(root);
    const c1 = cs.getPropertyValue('--a1').trim(), c2 = cs.getPropertyValue('--a2').trim();
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width) p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.4; p.y += dy / d * 1.4; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = c1; ctx.globalAlpha = .7; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dd = Math.hypot(p.x - q.x, p.y - q.y);
        if (dd < 120) {
          ctx.globalAlpha = (1 - dd / 120) * .25; ctx.strokeStyle = c2;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  addEventListener('resize', initParticles);
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  /* ---------- CUSTOM CURSOR ---------- */
  const cur = $('#cursor'), dot = $('#cursorDot');
  let cx = 0, cy = 0, tx = 0, ty = 0;
  addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
  });
  (function follow() {
    cx += (tx - cx) * .15; cy += (ty - cy) * .15;
    cur.style.left = cx + 'px'; cur.style.top = cy + 'px';
    requestAnimationFrame(follow);
  })();
  $$('a, button, .card, .chip').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('hover'));
  });

  /* ---------- MAGNETIC BUTTONS ---------- */
  $$('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });

  /* ---------- 3D TILT ---------- */
  $$('.tilt').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(0)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  /* ---------- REVEAL + COUNTERS + BARS ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      setTimeout(() => el.classList.add('show'), (el.dataset.delay || 0));
      $$('[data-w]', el).forEach(b => b.style.width = b.dataset.w + '%');
      $$('[data-count]', el).forEach(count);
      io.unobserve(el);
    });
  }, { threshold: .15 });
  $$('.reveal').forEach((el, i) => { el.dataset.delay = (i % 4) * 90; io.observe(el); });
  function count(el) {
    const end = +el.dataset.count; let n = 0;
    const step = () => { n += Math.ceil(end / 50); if (n >= end) n = end; el.textContent = n; if (n < end) requestAnimationFrame(step); };
    step();
  }

  /* ---------- NAV: progress, active link, burger ---------- */
  const progress = $('#progress'), links = $$('.links a');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    let cur = '';
    $$('main section[id]').forEach(s => { if (scrollY >= s.offsetTop - 220) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  }, { passive: true });
  const burger = $('#burger'), menu = $('#links');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); menu.classList.toggle('open'); });
  links.forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); menu.classList.remove('open'); }));

  /* ---------- INIT ---------- */
  $('#year').textContent = new Date().getFullYear();
  setTheme(savedTheme);
  setLang(lang);
  draw();

  // Konami-style easter egg: "d" tugmasi 3 marta
  let hits = 0;
  addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'd') { hits++; if (hits === 3) { document.body.animate([{ filter: 'hue-rotate(0)' }, { filter: 'hue-rotate(360deg)' }], { duration: 1800 }); hits = 0; } }
    else hits = 0;
  });
})();
