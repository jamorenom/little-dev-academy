// =====================
// FIREBASE CONFIG
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyAlc9PK291kVlZwKxXVfYXM5bdDBfU06xo",
  authDomain: "little-dev-academy.firebaseapp.com",
  projectId: "little-dev-academy",
  storageBucket: "little-dev-academy.firebasestorage.app",
  messagingSenderId: "1038879302466",
  appId: "1:1038879302466:web:d96d6d2533094250371edb"
};

firebase.initializeApp(firebaseConfig);
const auth  = firebase.auth();
const db    = firebase.firestore();
let currentUser = null;

// =====================
// SAVE
// =====================
async function save() {
  updateMasterXP();
  try { localStorage.setItem('lda_save', JSON.stringify(S)); } catch(e) {}
  if (!currentUser) return;
  try {
    await db.collection('users').doc(currentUser.uid).set({
      name:     S.name,
      avatar:   S.avatar,
      masterXP: S.masterXP,
      code:     { xp: S.code.xp, done: S.code.done },
      math: {
        xp:             S.math.xp,
        level:          S.math.level,
        streak:         S.math.streak         || 0,
        lastActiveDate: S.math.lastActiveDate || '',
        totalWorksheets:S.math.totalWorksheets|| 0,
        stageStats:     S.math.stageStats     || emptyStageStats(),
      },
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { console.error('Firestore save error:', e); }
}

// =====================
// LOAD (with migration)
// =====================
async function loadProgress() {
  if (!currentUser) return;
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    if (doc.exists) {
      const d = doc.data();
      S.name   = d.name   || '';
      S.avatar = d.avatar || '🎓';

      if (d.code) {
        // Phase 2+ structure
        S.code = { xp: d.code.xp || 0, done: d.code.done || [] };
        const m = d.math || {};
        S.math = {
          xp:             m.xp             || 0,
          level:          m.level          || 1,
          streak:         m.streak         || 0,
          lastActiveDate: m.lastActiveDate || '',
          totalWorksheets:m.totalWorksheets|| 0,
          stageStats:     m.stageStats     || emptyStageStats(),
        };
        S.masterXP = d.masterXP || 0;
      } else {
        // Phase 1 flat structure — migrate
        S.code = { xp: d.xp || 0, done: d.done || [] };
        S.math = emptyMath();
        updateMasterXP();
        save();
      }
    }
  } catch(e) {
    try {
      const raw = localStorage.getItem('lda_save');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.code) {
          S = parsed;
          // Ensure new math fields exist for Phase 2 saves missing Phase 3 fields
          if (!S.math.stageStats) S.math.stageStats = emptyStageStats();
          if (S.math.streak         === undefined) S.math.streak         = 0;
          if (S.math.lastActiveDate === undefined) S.math.lastActiveDate = '';
          if (S.math.totalWorksheets=== undefined) S.math.totalWorksheets= 0;
        } else {
          S.name   = parsed.name   || '';
          S.avatar = parsed.avatar || '🎓';
          S.code   = { xp: parsed.xp || 0, done: parsed.done || [] };
          S.math   = emptyMath();
          updateMasterXP();
        }
      }
    } catch(e2) {}
    console.error('Firestore load error:', e);
  }
}

// =====================
// AUTH
// =====================
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(err => {
    alert('Sign-in failed. Please try again.\n\n' + err.message);
  });
}

function doSignOut() {
  if (confirm('Sign out of Little Dev Academy?\n\nYour progress is saved!')) {
    auth.signOut();
  }
}

function resetConfirm() {
  if (confirm('Reset ALL progress and start over?\n\nThis will delete all your XP and completed lessons.\n(This cannot be undone!)')) {
    if (currentUser) {
      db.collection('users').doc(currentUser.uid).delete().catch(e => console.error(e));
    }
    try { localStorage.removeItem('lda_save'); } catch(e) {}
    auth.signOut();
  }
}

// =====================
// INIT — AUTH LISTENER
// =====================
function hideLoading() {
  const el = document.getElementById('sloading');
  if (el) {
    el.style.setProperty('display', 'none', 'important');
    el.classList.remove('active');
  }
}

function init() {
  auth.onAuthStateChanged(async (user) => {
    hideLoading();
    if (user) {
      currentUser = user;
      buildAvatarGrid();
      await loadProgress();
      if (S.name) {
        showScreen('shome');
        renderHome();
      } else {
        const firstName = (user.displayName || '').split(' ')[0];
        showScreen('sw');
        buildAvatarGrid();
        if (firstName) {
          const inp = document.getElementById('inp-name');
          if (inp) inp.value = firstName;
        }
      }
    } else {
      currentUser = null;
      S = { name: '', avatar: '🎓', masterXP: 0, code: { xp: 0, done: [] }, math: emptyMath() };
      showScreen('slogin');
    }
  });
}

init();
