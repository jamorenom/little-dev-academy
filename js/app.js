// =====================
// STATE HELPERS (defined first — used in state init)
// =====================
function emptyStageStats() {
  return [
    { completed:0, totalScore:0, avgScore:0 },
    { completed:0, totalScore:0, avgScore:0 },
    { completed:0, totalScore:0, avgScore:0 },
    { completed:0, totalScore:0, avgScore:0 },
  ];
}
function emptyMath() {
  return { xp:0, level:1, streak:0, lastActiveDate:'', totalWorksheets:0, stageStats:emptyStageStats() };
}

// =====================
// STATE
// =====================
let S = {
  name: '', avatar: '🎓',
  masterXP: 0,
  code: { xp: 0, done: [], fpBadge: false },
  math: emptyMath()
};

let CUR = null, STEP = 0, QUIZ_DONE = false, CHALLENGE_CHECKS = [], QUIZ_EXP = '';

// Worksheet state
let MATH_WS        = [];
let MATH_WS_LEVEL  = 0;
let MATH_WS_DONE   = false;

// Timer state
let MATH_WS_TIMER_ID   = null;
let MATH_WS_SECONDS    = 300;
let MATH_WS_START_TIME = 0;

// Code Academy tab state
let CODE_TAB = 1;

// Free Play state
let FP_PROJECTS     = [];
let FP_CUR          = null;
let FP_EDITOR_TAB   = 'html';
let FP_AUTO_SAVE_ID = null;
let FP_SAVE_COOLDOWN= {};

const FP_TEMPLATES = [
  { em:'🎮', name:'Blank Game',
    html:'',
    css:'body {\n  font-family: system-ui, sans-serif;\n  background: #1a1a2e;\n  color: #eee;\n  margin: 0;\n  padding: 20px;\n}',
    js:'' },
  { em:'🌈', name:'Color Clicker',
    html:'<h1 id="score">Clicks: 0</h1>\n<button id="btn" onclick="doClick()">Click me! 🌈</button>',
    css:'body { font-family: system-ui; text-align: center; padding: 40px; background: #1a1a2e; color: white; }\nh1 { font-size: 48px; }\nbutton { font-size: 24px; padding: 16px 32px; border-radius: 12px; border: none; cursor: pointer; background: #7c3aed; color: white; }',
    js:'var count = 0;\nfunction doClick() {\n  count++;\n  document.getElementById("score").textContent = "Clicks: " + count;\n  document.getElementById("btn").style.background = "hsl(" + (count * 30) + ", 70%, 50%)";\n}' },
  { em:'🎲', name:'Number Guesser',
    html:'<h1>🎲 Guess My Number!</h1>\n<p>Pick a number 1 to 10...</p>\n<input id="g" type="number" min="1" max="10" placeholder="?">\n<button onclick="check()">Guess!</button>\n<p id="msg" style="font-size:20px"></p>',
    css:'body { font-family: system-ui; text-align: center; padding: 30px; background: #0f172a; color: #f1f5f9; }\ninput { font-size: 20px; padding: 10px; width: 70px; border-radius: 8px; border: 2px solid #7c3aed; background: #1e293b; color: white; text-align: center; }\nbutton { font-size: 18px; padding: 10px 20px; border-radius: 8px; border: none; background: #7c3aed; color: white; cursor: pointer; margin-left: 8px; }',
    js:'var secret = Math.floor(Math.random() * 10) + 1;\nfunction check() {\n  var g = parseInt(document.getElementById("g").value);\n  var msg = document.getElementById("msg");\n  if (g === secret) { msg.textContent = "🎉 Yes! It was " + secret + "! New game!"; secret = Math.floor(Math.random() * 10) + 1; }\n  else if (g < secret) { msg.textContent = "📈 Too low! Try higher!"; }\n  else { msg.textContent = "📉 Too high! Try lower!"; }\n}' },
  { em:'🎨', name:'Drawing Canvas',
    html:'<h2>🎨 My Drawing App</h2>\n<canvas id="c" width="380" height="260"></canvas>\n<br>\n<button onclick="clearIt()">Clear 🗑️</button>',
    css:'body { font-family: system-ui; text-align: center; padding: 20px; background: #0f172a; color: white; }\ncanvas { border: 3px solid #a855f7; border-radius: 8px; cursor: crosshair; background: white; display: block; margin: 10px auto; }\nbutton { font-size: 16px; padding: 8px 20px; border-radius: 8px; border: none; background: #a855f7; color: white; cursor: pointer; }',
    js:'var c = document.getElementById("c");\nvar ctx = c.getContext("2d");\nvar drawing = false;\nctx.strokeStyle = "#7c3aed";\nctx.lineWidth = 3;\nctx.lineCap = "round";\nc.onmousedown = function(e) { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); };\nc.onmousemove = function(e) { if (!drawing) return; ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); };\nc.onmouseup = function() { drawing = false; };\nfunction clearIt() { ctx.clearRect(0, 0, c.width, c.height); }' }
];

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
function updateMasterXP() {
  S.masterXP = (S.code.xp || 0) + (S.math.xp || 0);
}
function masterLevel() { return Math.floor(S.masterXP / 300) + 1; }

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
  showScreen('shome');
  renderHome();
}

// =====================
// SCREENS
// =====================
function showScreen(id) {
  stopTimer();
  fpAutoSaveStop();
  fpCloseModal();
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.setProperty('display', 'none', 'important');
  });
  const el = document.getElementById(id);
  if (!el) return;
  if (id === 'sc' || id === 'sfp') { el.style.setProperty('display', 'flex', 'important'); }
  else                              { el.style.setProperty('display', 'block', 'important'); }
  el.classList.add('active');
  window.scrollTo(0, 0);
}

// =====================
// BELTS (Code)
// =====================
function curBelt() {
  let b = BELTS[0];
  BELTS.forEach(x => { if (S.code.xp >= x.xp) b = x; });
  return b;
}
function nextBelt() {
  const b = curBelt(), i = BELTS.findIndex(x => x.id === b.id);
  return BELTS[i + 1] || null;
}
function beltBy(id) { return BELTS.find(b => b.id === id); }
function unlocked(bid) { const b = beltBy(bid); return b && S.code.xp >= b.xp; }

// =====================
// HOME SCREEN
// =====================
function renderHome() {
  updateMasterXP();
  const lv   = masterLevel();
  const lvXP = S.masterXP - (lv - 1) * 300;
  const pct  = Math.min(100, (lvXP / 300) * 100);

  set('hm-av',      S.avatar);
  set('hm-name',    S.name);
  set('hm-level',   '⭐ Level ' + lv);
  set('hm-xp-label',S.masterXP + ' Master XP');
  set('hm-xp-next', lvXP + ' / 300 XP to Level ' + (lv + 1));
  const bar = document.getElementById('hm-master-bar');
  if (bar) bar.style.width = pct + '%';

  // Streak chip
  const streak = S.math.streak || 0;
  const streakEl = document.getElementById('hm-streak');
  if (streakEl) {
    streakEl.textContent = '🔥 ' + streak + (streak === 1 ? ' day' : ' days');
    streakEl.style.display = streak > 0 ? 'inline-flex' : 'none';
  }

  // Code door
  const cb = curBelt(), cnb = nextBelt();
  const cs = cb.xp, ce = cnb ? cnb.xp : cs + 500;
  const cpct = Math.min(100, ((S.code.xp - cs) / (ce - cs)) * 100);
  set('hm-code-belt', cb.em + ' ' + cb.name);
  set('hm-code-xp',  S.code.xp + ' XP');
  const cbar = document.getElementById('hm-code-bar');
  if (cbar) { cbar.style.width = cpct + '%'; cbar.style.background = 'linear-gradient(90deg,var(--sky2),var(--green))'; }

  // Math door
  const ml = S.math.level, mlTotal = MATH_LEVELS.length;
  const mpct = Math.min(100, ((ml - 1) / mlTotal) * 100);
  set('hm-math-level', 'Level ' + Math.min(ml, mlTotal) + ' / ' + mlTotal);
  set('hm-math-xp',   S.math.xp + ' XP');
  const mbar = document.getElementById('hm-math-bar');
  if (mbar) { mbar.style.width = mpct + '%'; mbar.style.background = 'linear-gradient(90deg,var(--orange),var(--amber))'; }

  renderHomeBadges();
}

function renderHomeBadges() {
  const wrap = document.getElementById('hm-badges');
  if (!wrap) return;
  const earned = BELTS.filter(b => S.code.xp >= b.xp);
  const stageMaxLevel = { 1:8, 2:13, 3:17, 4:20 };
  const mathStagesDone = [1,2,3,4].filter(st => S.math.level > stageMaxLevel[st]);

  let html = earned.map(b =>
    `<span class="badge-chip" style="background:${b.color}22;color:${b.color};border-color:${b.color}44">${b.em} ${b.name}</span>`
  ).join('');
  html += mathStagesDone.map(st => {
    const s = MATH_STAGE_NAMES[st];
    return `<span class="badge-chip" style="background:${s.color}22;color:${s.color};border-color:${s.color}44">${s.em} ${s.name}</span>`;
  }).join('');
  if (S.code.fpBadge) {
    html += '<span class="badge-chip" style="background:#a855f722;color:#a855f7;border-color:#a855f744">🎮 First Game</span>';
  }
  if (!html) html = '<span style="color:var(--text2);font-size:13px">Complete lessons to earn badges!</span>';
  wrap.innerHTML = html;
}

// =====================
// DASHBOARD (Code Academy)
// =====================
function renderDash() {
  const b = curBelt(), nb = nextBelt();
  set('nv-av',   S.avatar);
  set('nv-name', S.name);
  set('nv-xp',   S.code.xp + ' XP');
  styleBadge('nv-belt', b);
  set('rc-av',   S.avatar);
  set('rc-name', S.name + "'s Academy");
  styleBadge('rc-belt', b);
  const s = b.xp, e = nb ? nb.xp : s + 500;
  const pct = Math.min(100, ((S.code.xp - s) / (e - s)) * 100);
  document.getElementById('rc-xpbar').style.width = pct + '%';
  set('rc-xplabel', S.code.xp + ' / ' + e + ' XP');
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
          : `<span style="background:var(--navy3);color:var(--text2);padding:3px 10px;border-radius:20px;font-size:12px">🔒 Need ${bd.xp} XP</span>`}
      </div>
      <div class="lesson-grid">
        ${ls.map(l => {
          const done = S.code.done.includes(l.id);
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

  renderBSProgress();
}

function styleBadge(id, b) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent      = b.em + ' ' + b.name;
  el.style.background = b.color + '22';
  el.style.color      = b.color;
}

function lockMsg() {
  const nb = BELTS.find(b => b.xp > S.code.xp);
  if (nb) alert('🔒 You need ' + nb.xp + ' total XP to unlock the ' + nb.name + '!\n\nKeep completing lessons!');
}

// =====================
// CODE ACADEMY TABS
// =====================
function switchCodeTab(n) {
  CODE_TAB = n;
  for (let i = 1; i <= 3; i++) {
    const tab   = document.getElementById('ca-tab-'   + i);
    const panel = document.getElementById('ca-panel-' + i);
    if (tab)   tab.classList.toggle('active',   i === n);
    if (panel) panel.classList.toggle('active', i === n);
  }
  if (n === 2) { renderCRHub(); }
  if (n === 3) {
    renderFreePlay();
    loadFpProjects().then(ps => { FP_PROJECTS = ps; renderFreePlay(); });
  }
}

function beginningSessionComplete() {
  return LESSONS.every(l => S.code.done.includes(l.id));
}

function renderBSProgress() {
  const wrap = document.getElementById('bs-progress-wrap');
  if (!wrap) return;
  const done    = LESSONS.filter(l => S.code.done.includes(l.id)).length;
  const total   = LESSONS.length;
  const pct     = Math.round((done / total) * 100);
  const complete = done === total;
  wrap.innerHTML = `
    <div class="bs-progress-wrap">
      <div class="bs-progress-label">
        <span style="font-weight:700;color:${complete ? 'var(--green)' : 'var(--text)'}">
          ${complete ? '✅ Beginning Session Complete!' : '📖 Beginning Session'}
        </span>
        <span style="color:${complete ? 'var(--green)' : 'var(--text2)'}">${done} / ${total} lessons&nbsp;&nbsp;${pct}%</span>
      </div>
      <div class="bs-progress-outer">
        <div class="bs-progress-inner${complete ? ' complete' : ''}" style="width:${pct}%"></div>
      </div>
    </div>
  `;
}

// =====================
// FREE PLAY
// =====================
function renderFreePlay() {
  const wrap = document.getElementById('fp-list-wrap');
  if (!wrap) return;
  const newBtn = `<button class="fp-new-btn" onclick="fpNewProject()">➕ New Project</button>`;
  let body;
  if (FP_PROJECTS.length === 0) {
    body = `<div class="fp-empty-state">
      <div style="font-size:64px;margin-bottom:16px">🚀</div>
      <h2 style="margin-bottom:8px">No projects yet!</h2>
      <p style="font-size:16px">Start building something awesome! 🎮</p>
    </div>`;
  } else {
    body = `<div class="fp-project-grid">${FP_PROJECTS.map(p =>
      `<div class="fp-project-card" onclick="fpOpenProject('${p.id}')">
        <div class="fp-project-em">${p.em || '🎮'}</div>
        <div class="fp-project-title">${escHtml(p.title || 'My Project')}</div>
        <div class="fp-project-date">✏️ ${fpFmtDate(p.updatedAt)}</div>
        <div class="fp-project-actions" onclick="event.stopPropagation()">
          <button class="fp-project-btn" onclick="fpOpenProject('${p.id}')">Open</button>
          <button class="fp-project-btn" onclick="fpRenameProject('${p.id}')">Rename</button>
          <button class="fp-project-btn danger" onclick="fpDeleteProject('${p.id}')">Delete</button>
        </div>
      </div>`
    ).join('')}</div>`;
  }
  wrap.innerHTML = newBtn + body;
}

function fpNewProject() {
  if (FP_PROJECTS.length >= 10) {
    alert('You\'ve reached the limit of 10 projects! Delete one to make room. 🎮');
    return;
  }
  const grid = document.getElementById('fp-template-grid');
  if (grid) {
    grid.innerHTML = FP_TEMPLATES.map((t, i) =>
      `<button class="fp-template-card" onclick="fpPickTemplate(${i})">
        <div class="fp-template-em">${t.em}</div>
        <div class="fp-template-name">${t.name}</div>
      </button>`
    ).join('');
  }
  const modal = document.getElementById('fp-modal');
  if (modal) modal.style.display = 'flex';
}

function fpCloseModal() {
  const modal = document.getElementById('fp-modal');
  if (modal) modal.style.display = 'none';
}

function fpPickTemplate(idx) {
  fpCloseModal();
  const t = FP_TEMPLATES[idx];
  openFpEditor({ id:'', em:t.em, title:t.name, html:t.html, css:t.css, js:t.js, updatedAt:null });
}

function openFpEditor(proj) {
  FP_CUR = proj;
  FP_EDITOR_TAB = 'html';
  const titleEl = document.getElementById('fp-title');
  if (titleEl) titleEl.value = proj.title;
  const ced = document.getElementById('fp-ced');
  if (ced) ced.value = proj.html || '';
  ['html','css','js'].forEach(t => {
    const b = document.getElementById('fp-etab-' + t);
    if (b) b.classList.toggle('active', t === 'html');
  });
  showScreen('sfp');
  fpLivePreview();
  fpAutoSaveStart();
}

function fpOnInput() {
  if (!FP_CUR) return;
  const ced = document.getElementById('fp-ced');
  if (ced) FP_CUR[FP_EDITOR_TAB] = ced.value;
  fpLivePreview();
}

function fpSwitchEditorTab(tab) {
  if (!FP_CUR) return;
  const ced = document.getElementById('fp-ced');
  if (ced) FP_CUR[FP_EDITOR_TAB] = ced.value;
  FP_EDITOR_TAB = tab;
  if (ced) ced.value = FP_CUR[tab] || '';
  ['html','css','js'].forEach(t => {
    const b = document.getElementById('fp-etab-' + t);
    if (b) b.classList.toggle('active', t === tab);
  });
}

function fpLivePreview() {
  if (!FP_CUR) return;
  const pv = document.getElementById('fp-pv');
  if (!pv) return;
  pv.srcdoc = '<!DOCTYPE html><html><head><style>' + (FP_CUR.css || '') +
    '</style></head><body>' + (FP_CUR.html || '') +
    '<script>' + (FP_CUR.js || '') + '<\/script></body></html>';
}

async function fpSaveProject(silent) {
  if (!FP_CUR) return;
  const ced = document.getElementById('fp-ced');
  if (ced) FP_CUR[FP_EDITOR_TAB] = ced.value;
  const titleEl = document.getElementById('fp-title');
  if (titleEl) FP_CUR.title = titleEl.value.trim() || 'My Project';
  const newId = await saveFpProject(FP_CUR);
  if (!FP_CUR.id && newId) FP_CUR.id = newId;
  if (!silent && FP_CUR.id) {
    const today = new Date().toISOString().slice(0, 10);
    let xpEarned = 0;
    if (!S.code.fpBadge) {
      S.code.fpBadge = true; S.code.xp += 100; xpEarned += 100;
    }
    if (FP_SAVE_COOLDOWN[FP_CUR.id] !== today) {
      FP_SAVE_COOLDOWN[FP_CUR.id] = today; S.code.xp += 10; xpEarned += 10;
    }
    if (xpEarned > 0) { updateMasterXP(); save(); }
    const btn = document.getElementById('fp-save-btn');
    if (btn) { btn.textContent = '✅ Saved!'; setTimeout(() => { if (btn) btn.textContent = '💾 Save'; }, 2000); }
  }
  if (FP_CUR.id) {
    const idx = FP_PROJECTS.findIndex(p => p.id === FP_CUR.id);
    if (idx >= 0) FP_PROJECTS[idx] = { ...FP_CUR };
    else FP_PROJECTS.unshift({ ...FP_CUR });
  }
}

function fpAutoSaveStart() {
  fpAutoSaveStop();
  FP_AUTO_SAVE_ID = setInterval(() => { if (FP_CUR) fpSaveProject(true); }, 30000);
}

function fpAutoSaveStop() {
  if (FP_AUTO_SAVE_ID) { clearInterval(FP_AUTO_SAVE_ID); FP_AUTO_SAVE_ID = null; }
}

function fpOpenProject(id) {
  const proj = FP_PROJECTS.find(p => p.id === id);
  if (proj) openFpEditor(proj);
}

function fpRenameProject(id) {
  const proj = FP_PROJECTS.find(p => p.id === id);
  if (!proj) return;
  const newTitle = prompt('Rename project:', proj.title);
  if (!newTitle || !newTitle.trim()) return;
  proj.title = newTitle.trim();
  saveFpProject(proj);
  renderFreePlay();
}

function fpDeleteProject(id) {
  if (!confirm('Delete this project? This cannot be undone!')) return;
  deleteFpProject(id);
  FP_PROJECTS = FP_PROJECTS.filter(p => p.id !== id);
  renderFreePlay();
}

function fpDeleteCurrent() {
  if (!FP_CUR) return;
  if (!confirm('Delete "' + FP_CUR.title + '"? This cannot be undone!')) return;
  if (FP_CUR.id) {
    deleteFpProject(FP_CUR.id);
    FP_PROJECTS = FP_PROJECTS.filter(p => p.id !== FP_CUR.id);
  }
  fpAutoSaveStop();
  FP_CUR = null;
  showScreen('sd');
  renderDash();
  switchCodeTab(3);
}

async function fpBackToList() {
  fpAutoSaveStop();
  await fpSaveProject(true);
  FP_CUR = null;
  showScreen('sd');
  renderDash();
  switchCodeTab(3);
}

function fpFmtDate(ts) {
  if (!ts || !ts.toDate) return 'Just now';
  const d = ts.toDate();
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return d.toLocaleDateString();
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

  document.getElementById('ln-dots').innerHTML = CUR.steps.map((_, i) => {
    let c = 'step-dot';
    if (i < STEP) c += ' done';
    else if (i === STEP) c += ' active';
    return `<div class="${c}"></div>`;
  }).join('');

  document.getElementById('btn-prev').style.display = STEP > 0 ? 'inline-flex' : 'none';
  const last = STEP === total - 1;
  const btnN = document.getElementById('btn-next');
  btnN.textContent   = last ? '✅ Complete!' : 'Next →';
  btnN.className     = 'btn ' + (last ? 'btn-green' : 'btn-blue');
  btnN.style.display = (step.type === 'quiz' && !QUIZ_DONE) ? 'none' : 'inline-flex';

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
  document.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('done'));
  if (sel === ans) { btn.classList.add('correct'); beep('right'); }
  else { btn.classList.add('wrong'); beep('wrong'); document.querySelectorAll('.quiz-opt')[ans].classList.add('correct'); }
  document.getElementById('qfb').innerHTML = `
    <div style="background:${sel === ans ? '#14532d' : '#450a0a'};border-radius:10px;padding:14px;color:${sel === ans ? 'var(--green)' : 'var(--red)'};font-size:16px">
      ${sel === ans ? '✅' : '❌'} <strong>${sel === ans ? 'Correct!' : 'Not quite!'}</strong> ${escHtml(QUIZ_EXP)}
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
// COMPLETION (Code)
// =====================
function completLesson() {
  const already = S.code.done.includes(CUR.id);
  const earned  = already ? 0 : CUR.xp;
  const oldBelt = curBelt();
  if (!already) {
    S.code.xp += earned;
    S.code.done.push(CUR.id);
    updateMasterXP();
    save();
  }
  const newBelt = curBelt();
  const beltUp  = !already && newBelt.id !== oldBelt.id;
  set('cel-em',    CUR.em);
  set('cel-title', already ? 'Good practice! 😊' : 'Amazing Job! 🎉');
  set('cel-sub',   already ? 'You already completed this lesson!' : 'You completed: ' + CUR.title);
  document.getElementById('cel-xp').textContent = already ? 'Already earned!' : '+' + earned + ' XP!';
  const bu = document.getElementById('cel-beltup');
  if (beltUp) {
    bu.style.display     = 'block';
    bu.style.borderColor = newBelt.color;
    const bemEl = document.getElementById('cel-bem');
    if (bemEl) bemEl.innerHTML = '<video src="assets/mascot-fireworks.mp4" width="160" autoplay loop muted playsinline style="display:block;margin:0 auto"></video>';
    set('cel-bname', '🎉 ' + newBelt.name + ' Unlocked!');
  } else { bu.style.display = 'none'; }
  showScreen('sc');
  if (!already) { confetti(); beep('win'); }
  renderDash();
}

// =====================
// MATH ACADEMY
// =====================
function renderMathDash() {
  set('math-xp-badge', S.math.xp + ' XP');
  const wrap = document.getElementById('math-levels-wrap');
  if (!wrap) return;

  wrap.innerHTML = [1, 2, 3, 4].map(st => {
    const stInfo = MATH_STAGE_NAMES[st];
    const levels = MATH_LEVELS.filter(l => l.stage === st);
    return `
      <div style="margin-bottom:32px">
        <div class="math-stage-header">
          <div class="math-stage-bar" style="background:${stInfo.color}"></div>
          <h2 style="font-size:20px">${stInfo.em} ${stInfo.name}</h2>
        </div>
        <div class="math-level-grid">
          ${levels.map(l => mathLevelCard(l)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function mathLevelCard(l) {
  const done    = S.math.level > l.id;
  const current = S.math.level === l.id;
  const locked  = S.math.level < l.id;
  let cls = 'math-level-card';
  if (done) cls += ' done';
  else if (current) cls += ' current';
  else if (locked)  cls += ' locked';
  const click = locked ? '' : `onclick="startWorksheet(${l.id})"`;
  return `
    <div class="${cls}" ${click}>
      <div class="math-level-num">Level ${l.id}</div>
      <div class="math-level-em">${l.em}</div>
      <div class="math-level-name">${l.name}</div>
      <div class="math-level-xp ${done ? 'done' : ''}">${done ? '✅ Done' : current ? '🟠 Current' : '+' + l.xp + ' XP'}</div>
    </div>
  `;
}

// =====================
// TIMER
// =====================
function startTimer() {
  MATH_WS_SECONDS    = 300;
  MATH_WS_START_TIME = Date.now();
  clearInterval(MATH_WS_TIMER_ID);
  MATH_WS_TIMER_ID = setInterval(tickTimer, 1000);
  updateTimerDisplay();
}

function tickTimer() {
  if (MATH_WS_DONE) { stopTimer(); return; }
  MATH_WS_SECONDS = Math.max(0, MATH_WS_SECONDS - 1);
  updateTimerDisplay();
  if (MATH_WS_SECONDS <= 0) {
    stopTimer();
    submitWorksheet();
  }
}

function updateTimerDisplay() {
  const m      = Math.floor(MATH_WS_SECONDS / 60);
  const s      = MATH_WS_SECONDS % 60;
  const urgent = MATH_WS_SECONDS <= 60;
  const textEl = document.getElementById('ws-timer-text');
  if (textEl) {
    textEl.textContent = m + ':' + String(s).padStart(2, '0');
    textEl.style.color = urgent ? 'var(--red)' : 'var(--text)';
  }
  const bar = document.getElementById('ws-timer-bar');
  if (bar) {
    bar.style.width = (MATH_WS_SECONDS / 300 * 100) + '%';
    if (urgent) bar.classList.add('urgent');
    else        bar.classList.remove('urgent');
  }
}

function stopTimer() {
  if (MATH_WS_TIMER_ID) {
    clearInterval(MATH_WS_TIMER_ID);
    MATH_WS_TIMER_ID = null;
  }
}

// =====================
// STREAK
// =====================
function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const last  = S.math.lastActiveDate || '';
  if (last === today) return 0; // already counted today

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  S.math.streak = (last === yesterday) ? (S.math.streak || 0) + 1 : 1;
  S.math.lastActiveDate = today;

  const milestones = { 3:50, 7:150, 30:500 };
  return milestones[S.math.streak] || 0;
}

// =====================
// STAGE STATS
// =====================
function updateStageStats(levelId, score) {
  const lvDef = MATH_LEVELS.find(l => l.id === levelId);
  if (!lvDef) return;
  if (!S.math.stageStats) S.math.stageStats = emptyStageStats();
  const stat = S.math.stageStats[lvDef.stage - 1];
  stat.completed++;
  stat.totalScore += score;
  stat.avgScore    = Math.round((stat.totalScore / stat.completed) * 10) / 10;
}

// =====================
// SPEED BONUS
// =====================
function getSpeedBonus(elapsedSec) {
  if (elapsedSec < 120) return { xp:50, label:'⚡ Speed Bonus! Under 2 minutes!', color:'#fbbf24' };
  if (elapsedSec < 180) return { xp:25, label:'🚀 Fast Finish! Under 3 minutes!', color:'var(--sky)' };
  return null;
}

// =====================
// WORKSHEET
// =====================
function startWorksheet(levelId) {
  const lvDef = MATH_LEVELS.find(l => l.id === levelId);
  if (!lvDef) return;
  MATH_WS_LEVEL = levelId;
  MATH_WS       = generateWorksheet(levelId);
  MATH_WS_DONE  = false;

  set('ws-title',     lvDef.name);
  set('ws-level-num', 'Level ' + levelId);
  set('ws-xp-badge',  'Up to +' + (lvDef.xp > 70 ? lvDef.xp : 70) + ' XP');

  renderWorksheet();
  showScreen('smathws'); // stopTimer() fires inside showScreen
  startTimer();
}

function renderWorksheet() {
  // Reset timer display without starting it
  const textEl = document.getElementById('ws-timer-text');
  if (textEl) { textEl.textContent = '5:00'; textEl.style.color = 'var(--text)'; }
  const timerBar = document.getElementById('ws-timer-bar');
  if (timerBar) { timerBar.style.width = '100%'; timerBar.classList.remove('urgent'); }

  const wrap = document.getElementById('ws-problems');
  if (!wrap) return;
  wrap.innerHTML = MATH_WS.map((p, i) => `
    <div class="ws-row" id="ws-row-${i}">
      <span class="ws-num">${i + 1}.</span>
      <span class="ws-q">${escHtml(p.q)}</span>
      <input class="ws-input" type="number" id="ws-inp-${i}" placeholder="?" autocomplete="off">
      <span class="ws-feedback" id="ws-fb-${i}"></span>
      <span class="ws-correct-ans" id="ws-ca-${i}"></span>
    </div>
  `).join('');

  const scoreCard = document.getElementById('ws-score-card');
  if (scoreCard) scoreCard.style.display = 'none';
  const submitBtn = document.getElementById('ws-submit-btn');
  if (submitBtn) { submitBtn.style.display = 'inline-flex'; submitBtn.disabled = false; }
  const retryBtn = document.getElementById('ws-retry-btn');
  if (retryBtn) retryBtn.style.display = 'none';
  const nextBtn = document.getElementById('ws-next-btn');
  if (nextBtn) nextBtn.style.display = 'none';
}

function submitWorksheet() {
  if (MATH_WS_DONE) return;
  MATH_WS_DONE = true;
  stopTimer();

  const elapsedSec = MATH_WS_START_TIME
    ? Math.floor((Date.now() - MATH_WS_START_TIME) / 1000)
    : 300;

  // Mark each problem
  let correct = 0;
  MATH_WS.forEach((p, i) => {
    const inp = document.getElementById('ws-inp-' + i);
    const row = document.getElementById('ws-row-' + i);
    const fb  = document.getElementById('ws-fb-'  + i);
    const ca  = document.getElementById('ws-ca-'  + i);
    if (!inp) return;
    inp.disabled = true;
    const val = parseInt(inp.value, 10);
    if (!isNaN(val) && val === p.a) {
      correct++;
      row.classList.add('correct'); inp.classList.add('correct'); fb.textContent = '✅';
    } else {
      row.classList.add('wrong'); inp.classList.add('wrong'); fb.textContent = '❌';
      ca.textContent = '→ ' + p.a;
    }
  });

  const passed         = correct >= 8;
  const isCurrentLevel = S.math.level === MATH_WS_LEVEL;

  // XP calculation
  const baseXP    = correct === 10 ? 100 : correct >= 8 ? 70 : 10;
  const speedBonus = (passed && isCurrentLevel) ? getSpeedBonus(elapsedSec) : null;
  let earned = 0;
  if (isCurrentLevel && passed) {
    earned = baseXP + (speedBonus ? speedBonus.xp : 0);
  } else if (isCurrentLevel && !passed) {
    earned = 10; // consolation for trying
  }
  // replay pass or replay fail → 0 XP

  // Streak (before any saves)
  const milestoneXP = updateStreak();

  // Stats
  updateStageStats(MATH_WS_LEVEL, correct);
  S.math.totalWorksheets = (S.math.totalWorksheets || 0) + 1;

  // Apply XP and advance level
  S.math.xp += earned + milestoneXP;
  if (isCurrentLevel && passed) {
    S.math.level = Math.min(MATH_WS_LEVEL + 1, MATH_LEVELS.length + 1);
  }
  updateMasterXP();
  save();

  // ── Score card ──
  const scoreCard = document.getElementById('ws-score-card');
  if (scoreCard) {
    scoreCard.style.display = 'block';

    const numEl = scoreCard.querySelector('.ws-score-num');
    if (numEl) {
      numEl.textContent = correct + ' / 10';
      numEl.className   = 'ws-score-num ' + (passed ? 'ws-pass' : 'ws-fail');
    }

    const msgEl = document.getElementById('ws-score-msg');
    if (msgEl) {
      if (!passed) {
        msgEl.textContent = '💪 Almost! Score 8 or more to advance. Try again!';
      } else if (!isCurrentLevel) {
        msgEl.textContent = '✅ Nice practice! You already passed this level.';
      } else if (correct === 10) {
        msgEl.textContent = '🏆 Perfect Score! Next level unlocked!';
      } else {
        msgEl.textContent = '🎉 You Passed! Next level unlocked!';
      }
    }

    // XP pill
    const xpEl = document.getElementById('ws-score-xp');
    if (xpEl) {
      if (earned > 0) {
        xpEl.style.display  = 'inline-block';
        xpEl.textContent    = '+' + baseXP + ' XP' + (speedBonus ? ' + ' + speedBonus.xp + ' bonus' : '');
      } else {
        xpEl.style.display = 'none';
      }
    }

    // Speed bonus badge
    const speedEl = document.getElementById('ws-speed-bonus');
    if (speedEl) {
      if (speedBonus) {
        speedEl.style.display = 'block';
        speedEl.innerHTML = `<span class="ws-speed-pill" style="background:${speedBonus.color}22;color:${speedBonus.color};border:2px solid ${speedBonus.color}55">${speedBonus.label}</span>`;
      } else {
        speedEl.style.display = 'none';
      }
    }

    // Milestone banner
    const mileEl = document.getElementById('ws-milestone-banner');
    if (mileEl) {
      if (milestoneXP > 0) {
        const em = S.math.streak >= 30 ? '🏆' : S.math.streak >= 7 ? '🎖️' : '⭐';
        mileEl.style.display = 'block';
        mileEl.innerHTML = `
          <div style="font-size:36px;margin-bottom:8px">${em}</div>
          <div style="font-size:18px;font-weight:700;color:var(--orange)">${S.math.streak}-Day Streak Milestone! 🔥</div>
          <div style="font-size:15px;color:var(--amber);margin-top:4px">+${milestoneXP} Bonus XP!</div>
        `;
      } else {
        mileEl.style.display = 'none';
      }
    }

    // Sounds & confetti
    if (passed && isCurrentLevel && correct === 10) { confetti(); beep('win'); }
    else if (passed) { beep('right'); }
    else { beep('wrong'); }
  }

  // Navigation buttons
  const submitBtn = document.getElementById('ws-submit-btn');
  if (submitBtn) submitBtn.style.display = 'none';
  const retryBtn = document.getElementById('ws-retry-btn');
  if (retryBtn) retryBtn.style.display = 'inline-flex';
  const nextBtn = document.getElementById('ws-next-btn');
  if (nextBtn) {
    nextBtn.style.display = (passed && isCurrentLevel && MATH_WS_LEVEL < MATH_LEVELS.length)
      ? 'inline-flex' : 'none';
  }
}

function retryWorksheet() {
  MATH_WS      = generateWorksheet(MATH_WS_LEVEL);
  MATH_WS_DONE = false;
  renderWorksheet();
  startTimer();
}

function nextMathLevel() {
  const nextId = MATH_WS_LEVEL + 1;
  if (nextId <= MATH_LEVELS.length) startWorksheet(nextId);
  else { showScreen('smath'); renderMathDash(); }
}

// =====================
// PROGRESS REPORT
// =====================
function renderReport() {
  const streak = S.math.streak || 0;
  const total  = S.math.totalWorksheets || 0;
  const stats  = S.math.stageStats || emptyStageStats();

  set('rp-streak', streak);
  set('rp-total',  total);

  const wrap = document.getElementById('rp-stages');
  if (!wrap) return;

  wrap.innerHTML = [1, 2, 3, 4].map(st => {
    const stInfo      = MATH_STAGE_NAMES[st];
    const stageLevels = MATH_LEVELS.filter(l => l.stage === st);
    const totalLvls   = stageLevels.length;
    const doneLvls    = stageLevels.filter(l => S.math.level > l.id).length;
    const pct         = totalLvls > 0 ? Math.round((doneLvls / totalLvls) * 100) : 0;
    const stat        = stats[st - 1] || { completed:0, totalScore:0, avgScore:0 };
    return `
      <div class="report-stage-card">
        <div class="report-stage-title">
          <div style="width:4px;height:28px;border-radius:4px;background:${stInfo.color}"></div>
          <span style="font-size:22px">${stInfo.em}</span>
          <h2 style="font-size:18px">${stInfo.name}</h2>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:14px;color:var(--text2);margin-bottom:2px">
          <span>${doneLvls} / ${totalLvls} levels complete</span>
          <span style="font-weight:700;color:${stInfo.color}">${pct}%</span>
        </div>
        <div class="report-prog-outer">
          <div class="report-prog-inner" style="width:${pct}%;background:${stInfo.color}"></div>
        </div>
        <div class="report-details">
          <span>📊 Avg score: <strong>${stat.completed > 0 ? stat.avgScore + ' / 10' : '—'}</strong></span>
          <span>📝 Worksheets: <strong>${stat.completed}</strong></span>
        </div>
      </div>
    `;
  }).join('');
}

// =====================
// CONFETTI
// =====================
function confetti() {
  const cv = document.getElementById('cv');
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const ctx  = cv.getContext('2d');
  const cols = ['#fbbf24','#38bdf8','#4ade80','#f87171','#a855f7','#f97316','#ec4899'];
  const ps   = Array.from({ length: 130 }, () => ({
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
// CHALLENGE RUN ENGINE
// =====================

let CRS = {
  running: false,
  runSecs: 3600,
  epSecs: 240,
  lsnSecs: 50,
  runTimerId: null,
  epTimerId: null,
  lsnTimerId: null,
  epIdx: 0,
  lsnIdx: 0,
  stepIdx: 0,
  totalScore: 0,
  epScore: 0,
  totalXP: 0,
  epResults: [],
  quizDone: false,
  chalChecks: [],
  quizExp: '',
};

function crFmtTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return h + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  return m + ':' + String(s).padStart(2,'0');
}

function updateCRTimers() {
  const lsnEl  = document.getElementById('cr-lsn-timer');
  const epEl   = document.getElementById('cr-ep-timer');
  const runEl  = document.getElementById('cr-run-timer');
  const scoreEl= document.getElementById('cr-score-display');
  if (lsnEl) {
    lsnEl.textContent = '⏱️ ' + crFmtTime(CRS.lsnSecs);
    lsnEl.className   = 'cr-timer-box' + (CRS.lsnSecs <= 15 ? ' cr-timer-urgent' : '');
  }
  if (epEl) {
    epEl.textContent = '📺 ' + crFmtTime(CRS.epSecs);
    epEl.className   = 'cr-timer-box' + (CRS.epSecs <= 30 ? ' cr-timer-urgent' : '');
  }
  if (runEl) {
    runEl.textContent = '🏆 ' + crFmtTime(CRS.runSecs);
    runEl.className   = 'cr-timer-box' + (CRS.runSecs <= 120 ? ' cr-timer-urgent' : '');
  }
  if (scoreEl) scoreEl.textContent = '⚡ ' + CRS.totalScore + ' pts';
}

function crStopAllTimers() {
  ['runTimerId','epTimerId','lsnTimerId'].forEach(k => {
    if (CRS[k]) { clearInterval(CRS[k]); CRS[k] = null; }
  });
}

// ── Hub (ca-panel-2) ──
function renderCRHub() {
  const panel = document.getElementById('ca-panel-2');
  if (!panel) return;
  const complete = beginningSessionComplete();
  if (!complete) {
    const done  = LESSONS.filter(l => S.code.done.includes(l.id)).length;
    const total = LESSONS.length;
    panel.innerHTML = `
      <div class="container">
        <div class="locked-panel-card">
          <div style="font-size:64px;margin-bottom:16px">🔒</div>
          <h2 style="margin-bottom:10px">Challenge Runs Locked</h2>
          <p style="color:var(--text2);font-size:16px;margin-bottom:12px">Complete all Beginning Session lessons first! 📖</p>
          <div style="background:var(--navy3);border-radius:20px;height:10px;overflow:hidden;max-width:300px;margin:0 auto">
            <div style="height:100%;border-radius:20px;background:linear-gradient(90deg,var(--sky2),var(--green));width:${Math.round(done/total*100)}%"></div>
          </div>
          <p style="color:var(--text2);font-size:13px;margin-top:8px">${done} / ${total} lessons done</p>
        </div>
      </div>`;
    return;
  }

  const cr  = S.code.challengeRuns || {};
  const best= cr.bestTime != null
    ? `🏆 Best Run: ${crFmtTime(cr.bestTime)} remaining · ${cr.bestScore} pts`
    : 'No completed runs yet — be the first!';

  panel.innerHTML = `
    <div class="container">
      <div class="cr-hub-header">
        <div style="font-size:52px;margin-bottom:8px">⚡</div>
        <h2 style="font-size:24px;margin-bottom:4px">Challenge Runs</h2>
        <p style="color:var(--text2);font-size:14px;margin-bottom:6px">5 episodes · 1 hour to finish everything</p>
        <div class="cr-best-banner">${best}</div>
      </div>
      <div class="cr-ep-grid">
        ${CR_EPISODES.map((ep,i) => {
          const belt = beltBy(ep.beltId);
          return `<div class="cr-ep-card" style="border-color:${belt.color}44;background:${belt.color}0d">
            <div style="font-size:28px;margin-bottom:6px">${ep.em}</div>
            <div style="font-weight:700;font-size:15px;margin-bottom:2px">${ep.name}</div>
            <div style="font-size:12px;color:var(--text2)">${ep.lessons.length} lessons · 4 min</div>
          </div>`;
        }).join('')}
      </div>
      <div style="text-align:center;padding:8px 0 28px">
        <button class="cr-start-btn" onclick="startChallengeRun()">⚡ Start Challenge Run!</button>
        <p style="color:var(--text2);font-size:12px;margin-top:10px">Timers: 50s/lesson · 4 min/episode · 1 hour total</p>
      </div>
    </div>`;
}

// ── Start Run ──
function startChallengeRun() {
  CRS = {
    running: true,
    runSecs: 3600,
    epSecs: 240,
    lsnSecs: 50,
    runTimerId: null,
    epTimerId: null,
    lsnTimerId: null,
    epIdx: 0,
    lsnIdx: 0,
    stepIdx: 0,
    totalScore: 0,
    epScore: 0,
    totalXP: 0,
    epResults: [],
    quizDone: false,
    chalChecks: [],
    quizExp: '',
  };
  showScreen('scr');
  updateCRTimers();

  CRS.runTimerId = setInterval(() => {
    if (!CRS.running) return;
    CRS.runSecs = Math.max(0, CRS.runSecs - 1);
    updateCRTimers();
    if (CRS.runSecs <= 0) crRunTimeout();
  }, 1000);

  startCREpisode(0);
}

// ── Episode ──
function startCREpisode(idx) {
  CRS.epIdx  = idx;
  CRS.lsnIdx = 0;
  CRS.stepIdx= 0;
  CRS.epScore= 0;
  if (CRS.epTimerId) { clearInterval(CRS.epTimerId); CRS.epTimerId = null; }
  CRS.epSecs = 240;

  const ep   = CR_EPISODES[idx];
  const belt = beltBy(ep.beltId);
  const epLabel = document.getElementById('cr-ep-label');
  if (epLabel) epLabel.textContent = ep.em + ' ' + ep.name + ' — Episode ' + (idx+1) + ' / 5';

  updateCRTimers();
  CRS.epTimerId = setInterval(() => {
    if (!CRS.running) return;
    CRS.epSecs = Math.max(0, CRS.epSecs - 1);
    updateCRTimers();
    if (CRS.epSecs <= 0) crEpisodeTimeout();
  }, 1000);

  startCRLesson();
}

// ── Lesson ──
function startCRLesson() {
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }
  CRS.lsnSecs  = 50;
  CRS.stepIdx  = 0;
  CRS.quizDone = false;
  updateCRTimers();

  CRS.lsnTimerId = setInterval(() => {
    if (!CRS.running) return;
    CRS.lsnSecs = Math.max(0, CRS.lsnSecs - 1);
    updateCRTimers();
    if (CRS.lsnSecs <= 0) crLessonTimeout();
  }, 1000);

  renderCRLesson();
}

function crCurLesson() {
  return CR_EPISODES[CRS.epIdx].lessons[CRS.lsnIdx];
}

function renderCRLesson() {
  const lsn  = crCurLesson();
  const step = lsn.steps[CRS.stepIdx];
  const content = document.getElementById('cr-content');
  if (!content) return;

  // Header
  const header = `
    <div class="cr-lesson-header">
      <span style="font-size:24px">${lsn.em}</span>
      <span style="font-weight:700;font-size:15px;flex:1">${lsn.title}</span>
      <span class="cr-lesson-badge">⚡ CHALLENGE RUN</span>
    </div>`;

  if (step.type === 'quiz') {
    CRS.quizDone = false;
    CRS.quizExp  = step.exp;
    content.innerHTML = header + `
      <div style="text-align:center;font-size:48px;margin:16px 0">🧠</div>
      <h2 style="text-align:center;margin-bottom:20px;font-size:18px">${escHtml(step.q)}</h2>
      <div>${step.opts.map((o,i) =>
        `<button class="quiz-opt" onclick="crDoQuiz(this,${i},${step.ans})">${'ABCD'[i]}. ${escHtml(o)}</button>`
      ).join('')}</div>
      <div id="cr-qfb" style="margin-top:12px"></div>`;

  } else if (step.type === 'challenge') {
    CRS.chalChecks = step.checks || [];
    content.innerHTML = header + `
      <div style="text-align:center;font-size:48px;margin:16px 0">${step.icon || '🏆'}</div>
      <h2 style="text-align:center;color:var(--red);margin-bottom:10px;font-size:17px">${step.title}</h2>
      <p style="font-size:15px;line-height:1.7;margin-bottom:14px">${step.html}</p>
      <div class="split">
        <div>
          <p style="color:var(--text2);font-size:12px;margin-bottom:6px">✏️ YOUR CODE:</p>
          <textarea class="code-area" id="cr-ced" oninput="crLivePreview();crChkChallenge()" spellcheck="false" style="min-height:160px">${step.startCode||''}</textarea>
        </div>
        <div>
          <p style="color:var(--text2);font-size:12px;margin-bottom:6px">👁️ PREVIEW:</p>
          <iframe class="preview" id="cr-pv" sandbox="allow-scripts"></iframe>
        </div>
      </div>
      <div id="cr-cl" style="margin-top:12px"></div>
      <div style="text-align:center;margin-top:14px">
        <button class="btn btn-amber" onclick="crSubmitChallenge()">🏆 Submit!</button>
      </div>`;
    crLivePreview(); crChkChallenge();
  }
}

function crLivePreview() {
  const ed = document.getElementById('cr-ced'), pv = document.getElementById('cr-pv');
  if (!ed || !pv) return;
  pv.srcdoc = `<!DOCTYPE html><html><head><style>body{font-family:system-ui,sans-serif;margin:14px;line-height:1.5}</style></head><body>${ed.value}</body></html>`;
}

function crChkChallenge() {
  const ed = document.getElementById('cr-ced'), cl = document.getElementById('cr-cl');
  if (!ed || !cl) return;
  const code = ed.value;
  cl.innerHTML = '<p style="font-size:12px;color:var(--text2);margin-bottom:6px">CHECKLIST:</p>' +
    CRS.chalChecks.map(item => {
      const ok = code.includes(item);
      return `<div class="check-item" style="background:${ok?'#14532d33':'#450a0a33'}">
        <span style="font-size:16px">${ok?'✅':'⭕'}</span>
        <span style="color:${ok?'var(--green)':'var(--text2)'}"> ${item}</span>
        <span style="color:var(--text2);font-size:11px">${ok?' Found!':' Not yet...'}</span>
      </div>`;
    }).join('');
}

function crDoQuiz(btn, sel, ans) {
  if (CRS.quizDone) return;
  CRS.quizDone = true;
  document.querySelectorAll('.quiz-opt').forEach(b => b.classList.add('done'));
  if (sel === ans) { btn.classList.add('correct'); beep('right'); }
  else             { btn.classList.add('wrong');   beep('wrong'); document.querySelectorAll('.quiz-opt')[ans].classList.add('correct'); }
  const fb = document.getElementById('cr-qfb');
  if (fb) fb.innerHTML = `
    <div style="background:${sel===ans?'#14532d':'#450a0a'};border-radius:10px;padding:12px;color:${sel===ans?'var(--green)':'var(--red)'};font-size:15px">
      ${sel===ans?'✅':'❌'} <strong>${sel===ans?'Correct!':'Not quite!'}</strong> ${escHtml(CRS.quizExp)}
    </div>`;

  const speedScore = sel === ans ? Math.max(10, Math.round((CRS.lsnSecs / 50) * 100)) : 0;
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }

  setTimeout(() => {
    if (!CRS.running) return;
    const lsn = crCurLesson();
    if (CRS.stepIdx < lsn.steps.length - 1) {
      CRS.stepIdx++;
      CRS.lsnSecs = 50;
      CRS.lsnTimerId = setInterval(() => {
        if (!CRS.running) return;
        CRS.lsnSecs = Math.max(0, CRS.lsnSecs - 1);
        updateCRTimers();
        if (CRS.lsnSecs <= 0) crLessonTimeout();
      }, 1000);
      renderCRLesson();
    } else {
      crLessonDone(speedScore, sel === ans);
    }
  }, 1200);
}

function crSubmitChallenge() {
  const ed = document.getElementById('cr-ced');
  if (!ed) return;
  const code = ed.value;
  const allPassed = CRS.chalChecks.every(item => code.includes(item));
  if (!allPassed) {
    crChkChallenge();
    const cl = document.getElementById('cr-cl');
    if (cl) cl.style.outline = '2px solid var(--red)';
    return;
  }
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }
  const speedScore = Math.max(10, Math.round((CRS.lsnSecs / 50) * 100));
  beep('right');
  crLessonDone(speedScore, true);
}

function crLessonDone(speedScore, passed) {
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }
  const lsn    = crCurLesson();
  const xpBase = lsn.xp;
  const xpEarned = passed ? xpBase : 0;
  CRS.totalScore += speedScore;
  CRS.epScore    += speedScore;
  CRS.totalXP   += xpEarned;
  if (xpEarned > 0) { S.code.xp += xpEarned; updateMasterXP(); }

  const ep = CR_EPISODES[CRS.epIdx];
  if (CRS.lsnIdx < ep.lessons.length - 1) {
    CRS.lsnIdx++;
    CRS.stepIdx = 0;
    startCRLesson();
  } else {
    crEpisodeDone(false);
  }
}

function crLessonTimeout() {
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }
  CRS.lsnSecs = 0;
  updateCRTimers();
  const ep = CR_EPISODES[CRS.epIdx];
  if (CRS.lsnIdx < ep.lessons.length - 1) {
    CRS.lsnIdx++;
    CRS.stepIdx = 0;
    startCRLesson();
  } else {
    crEpisodeDone(false);
  }
}

function crEpisodeTimeout() {
  if (CRS.epTimerId)  { clearInterval(CRS.epTimerId);  CRS.epTimerId  = null; }
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }
  crEpisodeDone(true);
}

function crEpisodeDone(timedOut) {
  if (CRS.epTimerId)  { clearInterval(CRS.epTimerId);  CRS.epTimerId  = null; }
  if (CRS.lsnTimerId) { clearInterval(CRS.lsnTimerId); CRS.lsnTimerId = null; }

  const ep      = CR_EPISODES[CRS.epIdx];
  const perfect = !timedOut;
  const epXP    = perfect ? 100 : 0;
  if (epXP > 0) { S.code.xp += epXP; CRS.totalXP += epXP; updateMasterXP(); }

  CRS.epResults.push({
    name: ep.name, em: ep.em,
    score: CRS.epScore, xp: CRS.totalXP,
    timedOut,
  });

  const content = document.getElementById('cr-content');
  if (content) {
    const belt = beltBy(ep.beltId);
    content.innerHTML = `
      <div class="cr-result-card" style="border-color:${belt.color}">
        <div style="font-size:56px;margin-bottom:8px">${timedOut ? '⏰' : '⭐'}</div>
        <h2 style="font-size:20px;margin-bottom:6px">${timedOut ? 'Time ran out!' : 'Episode Complete!'}</h2>
        <div style="font-size:22px;font-weight:700;color:${belt.color};margin-bottom:4px">${ep.em} ${ep.name}</div>
        <div class="cr-result-big">${CRS.epScore} pts</div>
        ${epXP > 0 ? `<div class="cr-xp-pill">+${epXP} Bonus XP!</div>` : ''}
        ${CRS.epIdx < CR_EPISODES.length - 1 ? '<p style="color:var(--text2);font-size:13px;margin-top:10px">Next episode starting…</p>' : ''}
      </div>`;
  }

  save();

  if (CRS.epIdx < CR_EPISODES.length - 1) {
    setTimeout(() => {
      if (!CRS.running) return;
      startCREpisode(CRS.epIdx + 1);
    }, 3500);
  } else {
    setTimeout(() => { if (CRS.running) crRunDone(false); }, 2000);
  }
}

function crRunTimeout() {
  CRS.running = false;
  crStopAllTimers();
  crShowRunResult(true);
}

function crRunDone(timedOut) {
  CRS.running = false;
  crStopAllTimers();
  crShowRunResult(false);
}

function crShowRunResult(timedOut) {
  // +500 XP for full run completion
  const allEpsDone = CRS.epResults.length === 5 && CRS.epResults.every(r => !r.timedOut);
  const runBonusXP = allEpsDone ? 500 : 0;
  if (runBonusXP > 0) { S.code.xp += runBonusXP; CRS.totalXP += runBonusXP; updateMasterXP(); }

  // Personal best check
  const cr = S.code.challengeRuns || {bestTime:null,bestScore:0,totalRuns:0,lastRunDate:''};
  const isNewBestScore = CRS.totalScore > (cr.bestScore || 0);
  const isNewBestTime  = allEpsDone && (cr.bestTime == null || CRS.runSecs > cr.bestTime);
  let pbXP = 0;
  if (isNewBestTime || isNewBestScore) { pbXP = 200; S.code.xp += pbXP; CRS.totalXP += pbXP; updateMasterXP(); }

  // Save record
  cr.totalRuns   = (cr.totalRuns || 0) + 1;
  cr.lastRunDate = new Date().toISOString().slice(0,10);
  if (isNewBestScore) cr.bestScore = CRS.totalScore;
  if (isNewBestTime)  cr.bestTime  = CRS.runSecs;
  S.code.challengeRuns = cr;
  save();
  saveChallengeRunResult(cr);

  const content = document.getElementById('cr-content');
  if (!content) return;

  const epRows = CRS.epResults.map(r =>
    `<div style="display:flex;justify-content:space-between;padding:8px 12px;background:var(--navy3);border-radius:8px;font-size:14px;margin-bottom:6px">
      <span>${r.em} ${r.name}</span>
      <span style="color:${r.timedOut?'var(--red)':'var(--green)'}">${r.timedOut?'⏰ Timed out':r.score+' pts'}</span>
    </div>`
  ).join('');

  content.innerHTML = `
    <div class="cr-result-card" style="border-color:${allEpsDone?'var(--amber)':'var(--red)'}">
      <div style="font-size:72px;margin-bottom:12px">${allEpsDone?'🏆':'💪'}</div>
      <h1 style="font-size:26px;margin-bottom:6px">${allEpsDone?'Challenge Run Complete!':'Great Effort!'}</h1>
      <p style="color:var(--text2);margin-bottom:16px;font-size:15px">
        ${allEpsDone?'You finished all 5 episodes! Amazing!':'You made it through '+CRS.epResults.length+' / 5 episodes.'}
      </p>
      <div class="cr-result-big" style="color:var(--amber)">${CRS.totalScore} pts</div>
      <div class="cr-xp-pill">+${CRS.totalXP} XP earned this run</div>
      ${runBonusXP>0?`<div class="cr-xp-pill" style="margin-top:6px;border-color:var(--amber);color:var(--amber)">+${runBonusXP} Run Completion Bonus! 🏆</div>`:''}
      ${pbXP>0?`<div class="cr-xp-pill" style="margin-top:6px;border-color:#fbbf24;color:#fbbf24">+${pbXP} Personal Best Bonus! ⭐</div>`:''}
      ${isNewBestScore?`<div style="margin-top:10px;font-size:14px;color:#fbbf24">🥇 New Best Score: ${CRS.totalScore} pts!</div>`:''}
      <div style="margin:20px 0;text-align:left">${epRows}</div>
      <button class="btn btn-blue" style="width:100%;font-size:17px;margin-top:4px" onclick="crBackToDash()">
        Back to Code Academy 💻
      </button>
    </div>`;

  if (allEpsDone) { confetti(); beep('win'); }
}

function crBackToDash() {
  showScreen('sd');
  renderDash();
  switchCodeTab(1);
}

function exitChallengeRun() {
  if (!confirm('Exit the Challenge Run?\n\nXP earned so far will be saved, but the run won\'t count as complete.')) return;
  CRS.running = false;
  crStopAllTimers();
  save();
  showScreen('sd');
  renderDash();
  switchCodeTab(2);
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
    else if (type === 'win')   { [523,659,784,1047].forEach((f,i) => play(f, i*.13, .25)); }
  } catch(e) {}
}
