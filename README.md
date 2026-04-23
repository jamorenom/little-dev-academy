# 🎓 Little Dev Academy — v1.0.0

A coding education web app for kids with belt progression, Firebase auth, and live code editor.

---

## 📁 Project Structure

```
little-dev-academy/
├── index.html          ← Main shell (screens & layout)
├── css/
│   └── style.css       ← All styling
├── js/
│   ├── curriculum.js   ← All belts & lessons content
│   ├── app.js          ← All app logic (dashboard, lessons, quizzes)
│   └── firebase.js     ← Firebase config, auth, save/load
└── README.md
```

**Rule: Never edit files without Jorge's approval.**

---

## 🚀 First-Time GitHub Setup

Run these commands one by one in your terminal:

```bash
# 1. Go into the project folder
cd little-dev-academy

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. First commit
git commit -m "v1.0.0 - Initial release"

# 5. Connect to your GitHub repo
git remote add origin https://github.com/jamorenom/little-dev-academy.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

---

## ☁️ Connect Cloudflare Pages (one time)

1. Go to **dash.cloudflare.com → Workers & Pages → Create → Pages**
2. Click **"Connect to Git"**
3. Select your **GitHub account** and pick the `little-dev-academy` repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**

After this, every time you push to GitHub, Cloudflare **auto-deploys** in ~30 seconds. ✅

---

## 🔄 How to Deploy Future Updates

After any approved code change, just run:

```bash
git add .
git commit -m "v1.x.x - Description of what changed"
git push
```

Cloudflare picks it up automatically. Done! 🚀

---

## 🔥 Firebase

- **Project:** little-dev-academy
- **Auth:** Google Sign-In
- **Database:** Firestore — collection: `users`, doc: `{uid}`
- **Authorized domains:** Add your Cloudflare Pages URL in Firebase Console → Authentication → Settings → Authorized domains

---

## 📋 Version Log

| Version | Changes |
|---------|---------|
| v1.0.0  | Initial release — Firebase + Cloudflare, Scratch Bridge, quiz bug fix, multi-file structure |
