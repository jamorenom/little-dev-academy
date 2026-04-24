// =====================
// MATH LEVELS
// =====================
const MATH_LEVELS = [
  // Stage 1 — Addition & Subtraction
  { id:1,  stage:1, name:'Add within 10',        em:'➕', desc:'Adding small numbers',         xp:50 },
  { id:2,  stage:1, name:'Subtract within 10',   em:'➖', desc:'Subtracting small numbers',    xp:50 },
  { id:3,  stage:1, name:'Add within 20',        em:'🔢', desc:'Bigger addition problems',     xp:50 },
  { id:4,  stage:1, name:'Subtract within 20',   em:'🔢', desc:'Bigger subtraction problems',  xp:50 },
  { id:5,  stage:1, name:'Mixed +/− within 20',  em:'⚡', desc:'Mix of add and subtract',     xp:60 },
  { id:6,  stage:1, name:'Add within 100',       em:'💯', desc:'Two-digit addition',           xp:60 },
  { id:7,  stage:1, name:'Subtract within 100',  em:'💯', desc:'Two-digit subtraction',        xp:60 },
  { id:8,  stage:1, name:'Mixed +/− within 100', em:'🌟', desc:'Mixed two-digit problems',     xp:70 },
  // Stage 2 — Multiplication
  { id:9,  stage:2, name:'× 2, 5, 10',           em:'✖️', desc:'Easy times tables',           xp:70 },
  { id:10, stage:2, name:'× 3 and 4',            em:'✖️', desc:'Times 3 and 4',               xp:70 },
  { id:11, stage:2, name:'× 6 and 7',            em:'✖️', desc:'Times 6 and 7',               xp:80 },
  { id:12, stage:2, name:'× 8 and 9',            em:'✖️', desc:'Times 8 and 9',               xp:80 },
  { id:13, stage:2, name:'Mixed × all',           em:'🏆', desc:'All times tables mixed',      xp:90 },
  // Stage 3 — Division
  { id:14, stage:3, name:'÷ 2, 5, 10',           em:'➗', desc:'Easy division',               xp:80 },
  { id:15, stage:3, name:'÷ 3 and 4',            em:'➗', desc:'Divide by 3 and 4',           xp:80 },
  { id:16, stage:3, name:'÷ 6, 7, 8, 9',        em:'➗', desc:'Harder division',              xp:90 },
  { id:17, stage:3, name:'Mixed ÷ all',           em:'🏆', desc:'All division mixed',          xp:100 },
  // Stage 4 — Word Problems
  { id:18, stage:4, name:'Word Problems +/−',    em:'📖', desc:'Add & subtract stories',      xp:100 },
  { id:19, stage:4, name:'Word Problems ×/÷',    em:'📖', desc:'Multiply & divide stories',   xp:100 },
  { id:20, stage:4, name:'Two-Step Problems',    em:'🧠', desc:'Two operations in one story',  xp:120 },
];

const MATH_STAGE_NAMES = {
  1: { name:'Addition & Subtraction', color:'#38bdf8', em:'➕' },
  2: { name:'Multiplication',         color:'#a855f7', em:'✖️' },
  3: { name:'Division',              color:'#f97316', em:'➗' },
  4: { name:'Word Problems',          color:'#fbbf24', em:'📖' },
};

// =====================
// RANDOM HELPERS
// =====================
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// =====================
// PROBLEM GENERATORS
// =====================
function addWithin(max) {
  const a = rnd(1, max - 1), b = rnd(1, max - a);
  return { q: `${a} + ${b} = ?`, a: a + b };
}
function subWithin(max) {
  const a = rnd(1, max), b = rnd(0, a);
  return { q: `${a} − ${b} = ?`, a: a - b };
}
function mulBy(factors) {
  const f = pick(factors), n = rnd(1, 12);
  return { q: `${n} × ${f} = ?`, a: n * f };
}
function divBy(factors) {
  const f = pick(factors), n = rnd(1, 12);
  return { q: `${n * f} ÷ ${f} = ?`, a: n };
}

// Word problem templates
const WP_ADD_SUB = [
  (a,b) => ({ q:`Sam has ${a} apples and gets ${b} more. How many apples does Sam have?`, a: a+b }),
  (a,b) => ({ q:`There are ${a+b} birds on a tree. ${b} fly away. How many are left?`, a: a }),
  (a,b) => ({ q:`Mia reads ${a} pages on Monday and ${b} pages on Tuesday. How many pages total?`, a: a+b }),
  (a,b) => ({ q:`A box has ${a+b} crayons. ${b} are red. How many are NOT red?`, a: a }),
  (a,b) => ({ q:`Leo scored ${a} points and then scored ${b} more. What is his total score?`, a: a+b }),
  (a,b) => ({ q:`There were ${a+b} cookies. The kids ate ${b}. How many cookies are left?`, a: a }),
  (a,b) => ({ q:`Zoe has ${a} stickers. She gives ${b} to a friend. How many does she have left?`, a: a-b < 0 ? a : a-b }),
  (a,b) => ({ q:`A farmer has ${a} cows and buys ${b} more. How many cows total?`, a: a+b }),
];

const WP_MUL_DIV = [
  (f,n) => ({ q:`There are ${n} bags with ${f} apples each. How many apples in all?`, a: n*f }),
  (f,n) => ({ q:`${n*f} students sit in ${n} equal rows. How many students per row?`, a: f }),
  (f,n) => ({ q:`Each box holds ${f} crayons. How many crayons are in ${n} boxes?`, a: n*f }),
  (f,n) => ({ q:`${n*f} cookies are shared equally among ${f} friends. How many each?`, a: n }),
  (f,n) => ({ q:`A spider has ${f} legs. How many legs do ${n} spiders have?`, a: n*f }),
  (f,n) => ({ q:`${n*f} eggs are packed ${f} per carton. How many cartons?`, a: n }),
  (f,n) => ({ q:`Tickets cost $${f} each. How much do ${n} tickets cost?`, a: n*f }),
  (f,n) => ({ q:`${n*f} flowers are planted in ${n} equal rows. How many in each row?`, a: f }),
];

const WP_TWO_STEP = [
  () => { const a=rnd(5,20),b=rnd(2,10),c=rnd(1,5); return { q:`Tom has ${a} cards. He buys ${b} more then gives ${c} away. How many does he have?`, a: a+b-c }; },
  () => { const r=rnd(2,5),n=rnd(3,8),e=rnd(2,10); return { q:`There are ${r} shelves with ${n} books each. Then ${e} more books are added. How many books total?`, a: r*n+e }; },
  () => { const a=rnd(10,30),b=rnd(2,8),c=rnd(1,a); return { q:`A jar has ${a} coins. ${b} coins fall out. Then ${c} more are added. How many coins?`, a: a-b+c }; },
  () => { const f=rnd(2,6),n=rnd(3,8),rm=rnd(1,5); return { q:`${n} friends each have ${f} balloons. ${rm} balloons pop. How many balloons are left?`, a: n*f-rm }; },
  () => { const a=rnd(5,15),b=rnd(5,15),div=rnd(2,5); const tot=a+b; const rem=tot%div; const safe=tot-rem; return { q:`There are ${a} red pens and ${b} blue pens. They are packed ${div} per box. How many full boxes?`, a: Math.floor(safe/div) }; },
];

// =====================
// WORKSHEET GENERATOR
// =====================
function generateWorksheet(levelId) {
  const problems = [];
  const gen = getGenerator(levelId);
  const seen = new Set();
  let attempts = 0;
  while (problems.length < 10 && attempts < 200) {
    attempts++;
    const p = gen();
    const key = p.q;
    if (!seen.has(key)) { seen.add(key); problems.push(p); }
  }
  return problems;
}

function getGenerator(id) {
  switch (id) {
    case 1:  return () => addWithin(10);
    case 2:  return () => subWithin(10);
    case 3:  return () => addWithin(20);
    case 4:  return () => subWithin(20);
    case 5:  return () => Math.random() < 0.5 ? addWithin(20) : subWithin(20);
    case 6:  return () => addWithin(100);
    case 7:  return () => subWithin(100);
    case 8:  return () => Math.random() < 0.5 ? addWithin(100) : subWithin(100);
    case 9:  return () => mulBy([2, 5, 10]);
    case 10: return () => mulBy([3, 4]);
    case 11: return () => mulBy([6, 7]);
    case 12: return () => mulBy([8, 9]);
    case 13: return () => mulBy([2,3,4,5,6,7,8,9,10]);
    case 14: return () => divBy([2, 5, 10]);
    case 15: return () => divBy([3, 4]);
    case 16: return () => divBy([6, 7, 8, 9]);
    case 17: return () => divBy([2,3,4,5,6,7,8,9,10]);
    case 18: return () => {
      const a = rnd(3, 40), b = rnd(1, 30);
      const tmpl = pick(WP_ADD_SUB);
      return tmpl(a, b);
    };
    case 19: return () => {
      const f = pick([2,3,4,5,6,7,8,9,10]), n = rnd(2, 10);
      const tmpl = pick(WP_MUL_DIV);
      return tmpl(f, n);
    };
    case 20: return () => pick(WP_TWO_STEP)();
    default: return () => addWithin(10);
  }
}
