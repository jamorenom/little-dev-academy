// =====================
// STATE
// =====================
let S = { name: '', avatar: '🎓', xp: 0, done: [] };
let CUR = null, STEP = 0, QUIZ_DONE = false, CHALLENGE_CHECKS = [], QUIZ_EXP = '';

// =====================
// HELPERS
// =====================
function set(id, txt) { const e = document.getElementById(id); if (e) e.textContent = txt; }
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// =====================
// AVATAR
// =====================
function buildAvatarGrid() {
  const g = document.getElementById('av-grid');
  if (!g || g.children.length > 0) return;
  const AVEMOJI = ['🎓','🦸','🧙','🐱','🦊','🐸','🦋','🌟','🚀','🐉'];
  g.innerHTML = AVEMOJI.map((a, i) =>
    `<button class="av-btn${i === 0 ? ' sel' : ''}" onclick="pickAv(this,'${a}')">${a}</button>`
  ).join('');
}

function pickAv(btn, em) {
  document.querySelectorAll('.av-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
  S.avatar = em;
}

function startJourney() {
  const n = document.getElementById('inp-name').value.trim();
  if (!n) {
    const el = document.getElementById('inp-name');
    el.style.borderColor = 'var(--red)';
    el.placeholder = 'Please type your name! 😊';
    el.focus();
    return;
  }
  S.name = n;
  save();
  showScreen('sd');
  renderDash();
}

// =====================
// SCREENS
// =====================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  if (!el) return;
  el.style.removeProperty('display');
  if (id === 'sc') { el.style.display = 'flex'; }
  else { el.style.display = 'block'; }
  el.classList.add('active');
  window.scrollTo(0, 0);
}

// =====================
// BELTS
// =====================
function curBelt() {
  let b = BELTS[0];
  BELTS.forEach(x => { if (S.xp >= x.xp) b = x; });
  return b;
}
function nextBelt() {
  const b = curBelt(), i = BELTS.findIndex(x => x.id === b.id);
  return BELTS[i + 1] || null;
}
function beltBy(id) { return BELTS.find(b => b.id === id); }
function unlocked(bid) { const b = beltBy(bid); return b && S.xp >= b.xp; }

// =====================
// DASHBOARD
// =====================
function renderDash() {
  const b = curBelt(), nb = nextBelt();
  set('nv-av', S.avatar);
  set('nv-name', S.name);
  set('nv-xp', S.xp + ' XP');
  styleBadge('nv-belt', b);
  set('rc-av', S.avatar);
  set('rc-name', S.name + "'s Academy");
  styleBadge('rc-belt', b);
  const s = b.xp, e = nb ? nb.xp : s + 500;
  const pct = Math.min(100, ((S.xp - s) / (e - s)) * 100);
  document.getElementById('rc-xpbar').style.width = pct + '%';
  set('rc-xplabel', S.xp + ' / ' + e + ' XP');
  set('rc-next', nb
    ? 'Keep going to earn your ' + nb.name + '! ' + nb.em
    : '🎉 You have the highest belt! True Dev!');

  const wrap = document.getElementById('belts-wrap');
  const bids = [...new Set(LESSONS.map(l => l.belt))];
  wrap.innerHTML = bids.map(bid => {
    const bd = beltBy(bid);
    const ls = LESSONS.filter(l => l.belt === bid);
    const uk = unlocked(bid);
    return `<div style="margin-bottom:32px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="width:4px;height:34px;border-radius:4px;background:${bd.color}"></div>
        <h2 style="font-size:20px">${bd.em} ${bd.name}</h2>
        ${uk
          ? '<span style="background:#14532d;color:var(--green);padding:3px 10px;border-radius:20px;font-size:12px">✅ Unlocked!</span>'
          : `<span style="background:var(--navy3);color:var(--text2);padding:3px 10px;border-radius:20px;font-size:12px">🔒 Need ${bd.xp} XP</span>`
        }
      </div>
      <div class="lesson-grid">
        ${ls.map(l => {
          const done = S.done.includes(l.id);
          const isc  = l.type === 'challenge';
          return `<div class="lesson-card${!uk ? ' locked' : ''}${done ? ' done' : ''}"
            onclick="${uk ? `startLesson('${l.id}')` : 'lockMsg()'}"
            style="${isc ? 'border-color:#b45309;' : ''}">
            <div style="font-size:34px;margin-bottom:8px">${l.em}</div>
            <div style="font-weight:700;font-size:15px;margin-bottom:5px">${l.title}</div>
            <div style="font-size:12px;color:${isc ? '#fde68a' : 'var(--text2)'};margin-bottom:8px">${isc ? '🏆 Challenge' : '📖 Lesson'}</div>
            <div style="font-size:13px;font-weight:700;color:var(--sky)">+${l.xp} XP ${done ? '✅' : ''}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('') +
  `<div style="text-align:center;margin-top:20px;padding-bottom:20px">
    <button class="btn btn-ghost btn-sm" onclick="resetConfirm()" style="color:var(--text2);font-size:13px">⚙️ Reset Progress</button>
  </div>`;
}

function styleBadge(id, b) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent  = b.em + ' ' + b.name;
  el.style.background = b.color + '22';
  el.style.color  = b.color;
}

function lockMsg() {
  const nb = BELTS.find(b => b.xp > S.xp);
  if (nb) alert('🔒 You need ' + nb.xp + ' total XP to unlock the ' + nb.name + '!\n\nKeep completing lessons!');
}

// =====================
// LESSON ENGINE
// =====================
function startLesson(id) {
  CUR = LESSONS.find(l => l.id === id);
  if (!CUR) return;
  STEP = 0; QUIZ_DONE = false;
  document.getElementById('ln-title').textContent = CUR.title;
  document.getElementById('ln-xp').textContent    = '+' + CUR.xp + ' XP';
  renderStep();
  showScreen('sl');
}

function renderStep() {
  const step  = CUR.steps[STEP];
  const total = CUR.steps.length;

  // Step dots
  document.getElementById('ln-dots').innerHTML = CUR.steps.map((_, i) => {
    let c = 'step-dot';
    if (i < STEP) c += ' done';
    else if (i === STEP) c += ' active';
    return `<div class="${c}"></div>`;
  }).join('');

  // Nav buttons
  document.getElementById('btn-prev').style.display = STEP > 0 ? 'inline-flex' : 'none';
  const last  = STEP === total - 1;
  const btnN  = document.getElementById('btn-next');
  btnN.textContent = last ? '✅ Complete!' : 'Next →';
  btnN.className   = 'btn ' + (last ? 'btn-green' : 'btn-blue');
  btnN.style.display = (step.type === 'quiz' && !QUIZ_DONE) ? 'none' : 'inline-flex';

  // Content
  const el = document.getElementById('ln-content');

  if (step.type === 'read') {
    el.innerHTML = `
      <div style="text-align:center;font-size:52px;margin-bottom:12px">${step.icon || '📖'}</div>
      <h2 style="text-align:center;margin-bottom:18px">${step.title}</h2>
      <div style="font-size:17px;line-height:1.85">${step.html}</div>
      ${step.tip ? `<div class="tip">🎓 <strong>Dev says:</strong> ${step.tip}</div>` : ''}
    `;
  } else if (step.type === 'code') {
    el.innerHTML = `
      <h2 style="margin-bottom:10px">${step.title}</h2>
      <p style="font-size:16px;margin-bottom:12px">${step.html}</p>
      <div style="background:#1e3a5f;border-radius:8px;padding:10px 14px;margin-bottom:14px;font-size:14px;color:var(--sky)">${step.hint}</div>
      <div class="split">
        <div>
          <p style="color:var(--text2);font-size:13px;margin-bottom:6px">✏️ YOUR CODE:</p>
          <textarea class="code-area" id="ced" oninput="livePreview()" spellcheck="false">${step.startCode}</textarea>
        </div>
        <div>
          <p style="color:var(--text2);font-size:13px;margin-bottom:6px">👁️ PREVIEW:</p>
          <iframe class="preview" id="pv" sandbox="allow-scripts"></iframe>
        </div>
      </div>
    `;
    livePreview();
  } else if (step.type === 'quiz') {
    QUIZ_DONE = false;
    QUIZ_EXP  = step.exp;
    el.innerHTML = `
      <div style="text-align:center;font-size:52px;margin-bottom:12px">🧠</div>
      <h2 style="text-align:center;margin-bottom:24px">${escHtml(step.q)}</h2>
      <div>${step.opts.map((o, i) =>
        `<button class="quiz-opt" onclick="doQuiz(this,${i},${step.ans})">${'ABCD'[i]}. ${escHtml(o)}</button>`
      ).join('')}</div>
      <div id="qfb" style="margin-top:14px"></div>
    `;
  } else if (step.type === 'challenge') {
    CHALLENGE_CHECKS = step.checks || [];
    el.innerHTML = `
      <div style="text-align:center;font-size:52px;margin-bottom:12px">${step.icon || '🏆'}</div>
      <h2 style="text-align:center;color:var(--amber);margin-bottom:12px">${step.title}</h2>
      <div style="font-size:16px;line-height:1.8;margin-bottom:16px">${step.html}</div>
      <div class="split">
        <div>
          <p style="color:var(--text2);font-size:13px;margin-bottom:6px">✏️ YOUR CODE:</p>
          <textarea class="code-area" id="ced" oninput="livePreview();chkChallenge()" spellcheck="false">${step.startCode}</textarea>
        </div>
        <div>
          <p style="color:var(--text2);font-size:13px;margin-bottom:6px">👁️ PREVIEW:</p>
          <iframe class="preview" id="pv" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <div id="cl" style="margin-top:14px"></div>
    `;
    livePreview(); chkChallenge();
    const bn = document.getElementById('btn-next');
    bn.textContent   = '🏆 Submit Challenge!';
    bn.className     = 'btn btn-amber';
    bn.style.display = 'inline-flex';
  }
}

function livePreview() {
  const ed = document.getElementById('ced'), pv = document.getElementById('pv');
  if (!ed || !pv) return;
  pv.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:system-ui,sans-serif;margin:14px;line-height:1.5}</style></head><body>${ed.value}</body></html>`;
}

function chkChallenge() {
  const ed = document.getElementById('ced'), cl = document.getElementById('cl');
  if (!ed || !cl) return;
  const code = ed.value;
  cl.innerHTML = '<p style="font-size:13px;color:var(--text2);margin-bottom:8px">CHALLENGE CHECKLIST:</p>' +
    CHALLENGE_CHECKS.map(item => {
      const ok = code.includes(item);
      return `<div class="check-item" style="background:${ok ? '#14532d33' : '#450a0a33'}">
        <span style="font-size:18px">${ok ? '✅' : '⭕'}</span>
        <span style="color:${ok ? 'var(--green)' : 'var(--text2)'}">  ${item}</span>
        <span style="color:var(--text2);font-family:sans-serif;font-size:12px">${ok ? '  Found!' : '  Not yet...'}</span>
      </div>`;
    }).join('');
}

function doQuiz(btn, sel, ans) {
  if (QUIZ_DONE) return;
  QUIZ_DONE = true;
  const exp = QUIZ_EXP;
  document.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('done'));
  if (sel === ans) { btn.classList.add('correct'); beep('right'); }
  else { btn.classList.add('wrong'); beep('wrong'); document.querySelectorAll('.quiz-opt')[ans].classList.add('correct'); }
  document.getElementById('qfb').innerHTML = `
    <div style="background:${sel === ans ? '#14532d' : '#450a0a'};border-radius:10px;padding:14px;color:${sel === ans ? 'var(--green)' : 'var(--red)'};font-size:16px">
      ${sel === ans ? '✅' : '❌'} <strong>${sel === ans ? 'Correct!' : 'Not quite!'}</strong> ${escHtml(exp)}
    </div>`;
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextStep() {
  if (STEP < CUR.steps.length - 1) { STEP++; QUIZ_DONE = false; renderStep(); window.scrollTo(0, 0); }
  else { completLesson(); }
}
function prevStep() {
  if (STEP > 0) { STEP--; QUIZ_DONE = false; renderStep(); window.scrollTo(0, 0); }
}

// =====================
// COMPLETION
// =====================
function completLesson() {
  const already = S.done.includes(CUR.id);
  const earned  = already ? 0 : CUR.xp;
  const oldBelt = curBelt();
  if (!already) { S.xp += earned; S.done.push(CUR.id); save(); }
  const newBelt = curBelt();
  const beltUp  = !already && newBelt.id !== oldBelt.id;
  set('cel-em',  CUR.em);
  set('cel-title', already ? 'Good practice! 😊' : 'Amazing Job! 🎉');
  set('cel-sub',   already ? 'You already completed this lesson!' : 'You completed: ' + CUR.title);
  document.getElementById('cel-xp').textContent = already ? 'Already earned!' : '+' + earned + ' XP!';
  const bu = document.getElementById('cel-beltup');
  if (beltUp) {
    bu.style.display     = 'block';
    bu.style.borderColor = newBelt.color;
    set('cel-bem',   newBelt.em);
    set('cel-bname', '🎉 ' + newBelt.name + ' Unlocked!');
  } else { bu.style.display = 'none'; }
  showScreen('sc');
  if (!already) { confetti(); beep('win'); }
  renderDash();
}

// =====================
// CONFETTI
// =====================
function confetti() {
  const cv = document.getElementById('cv');
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const ctx  = cv.getContext('2d');
  const cols = ['#fbbf24','#38bdf8','#4ade80','#f87171','#a855f7','#f97316','#ec4899'];
  const ps = Array.from({ length: 130 }, () => ({
    x: Math.random() * cv.width, y: -20 - Math.random() * 150,
    w: 7 + Math.random() * 9,    h: 5  + Math.random() * 7,
    color: cols[Math.floor(Math.random() * cols.length)],
    a: Math.random() * Math.PI * 2,
    spd: 2 + Math.random() * 4,
    spin:  (Math.random() - .5) * .18,
    drift: (Math.random() - .5) * 1.5
  }));
  let f = 0;
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    let alive = 0;
    for (const p of ps) {
      p.y += p.spd; p.x += p.drift; p.a += p.spin;
      if (p.y < cv.height + 20) alive++;
      ctx.save(); ctx.translate(p.x + p.w / 2, p.y + p.h / 2); ctx.rotate(p.a);
      ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (alive && f < 200) { f++; requestAnimationFrame(draw); }
    else ctx.clearRect(0, 0, cv.width, cv.height);
  }
  draw();
}

// =====================
// SOUND
// =====================
function beep(type) {
  try {
    const A = new (window.AudioContext || window.webkitAudioContext)();
    const g = A.createGain(); g.connect(A.destination);
    const play = (freq, t, dur) => {
      const o = A.createOscillator(); o.connect(g);
      o.frequency.setValueAtTime(freq, A.currentTime + t);
      g.gain.setValueAtTime(.25, A.currentTime + t);
      g.gain.exponentialRampToValueAtTime(.001, A.currentTime + t + dur);
      o.start(A.currentTime + t); o.stop(A.currentTime + t + dur + .05);
    };
    if (type === 'right') { play(523,0,.1); play(659,.1,.1); play(784,.2,.2); }
    else if (type === 'wrong') { play(300,0,.1); play(220,.1,.2); }
    else if (type === 'win') { [523,659,784,1047].forEach((f,i) => play(f, i*.13, .25)); }
  } catch(e) {}
}
