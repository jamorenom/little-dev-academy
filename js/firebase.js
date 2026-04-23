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
  // Always cache locally as backup
  try { localStorage.setItem('lda_save', JSON.stringify(S)); } catch(e) {}
  // Save to Firestore if signed in
  if (!currentUser) return;
  try {
    await db.collection('users').doc(currentUser.uid).set({
      name:     S.name,
      avatar:   S.avatar,
      xp:       S.xp,
      done:     S.done,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(e) { console.error('Firestore save error:', e); }
}

// =====================
// LOAD
// =====================
async function loadProgress() {
  if (!currentUser) return;
  try {
    const doc = await db.collection('users').doc(currentUser.uid).get();
    if (doc.exists) {
      const d = doc.data();
      S.name   = d.name   || '';
      S.avatar = d.avatar || '🎓';
      S.xp     = d.xp     || 0;
      S.done   = d.done   || [];
    }
  } catch(e) {
    // Fallback to localStorage if Firestore fails
    try { const raw = localStorage.getItem('lda_save'); if (raw) S = JSON.parse(raw); } catch(e2) {}
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
function init() {
  auth.onAuthStateChanged(async (user) => {
    if (user) {
      currentUser = user;
      buildAvatarGrid();
      await loadProgress();
      if (S.name) {
        showScreen('sd');
        renderDash();
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
      S = { name: '', avatar: '🎓', xp: 0, done: [] };
      showScreen('slogin');
    }
  });
}
