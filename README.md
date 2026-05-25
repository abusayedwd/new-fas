# For Fariha — A Surprise from Abu Sayed 💌

A premium romantic Islamic landing page built with **React + Vite**, **TailwindCSS**, **Framer Motion**, and **Lucide React**.

A heartfelt, handcrafted surprise gift for **Fariha Tasnim**, from her husband **Abu Sayed**, marking their nikah on **15 May**.

---

## ✨ What's inside

- **Intro Popup** — fullscreen, animated, with floating lanterns, stars, moonlight, and a soft music toggle
- **Curtain Reveal** — silk curtains with both your photos descend from the top
- **Yes / No Questions** — playful romantic Q&A (the "No" button shies away from the cursor 🤍)
- **Commitments** — 8 Islamic + romantic vows revealed one by one, sealed before Allah
- **Hero** — parallax moon, animated gradient, shimmering name
- **Navbar** — glassmorphism + theme toggle, readable on every section
- **Our Story Timeline** — animated relationship milestones
- **Memories Gallery** — masonry grid + lightbox
- **Love Letter** — typewriter paper card with floating candles
- **Duas Section** — Qur’anic verses & marriage duas with crescent glow
- **Future Dreams** — floating glassmorphism dream cards
- **Live Love Counter** — days, hours, minutes, seconds since 15 May 2026
- **Footer** — heartbeat, dua, twinkling stars
- **Atmosphere** — cursor glow, particle field, floating hearts, scroll progress, dark/light romantic theme

## 🛣️ Routes

| URL | What you see |
| --- | --- |
| `/login`       | Login page (default — shown first) |
| `/welcome`     | Full cinematic welcome (auth required) |
| `/main`        | Just the main page (auth required) |
| `/curtain`     | Replay just the curtain reveal (auth required) |
| `/questions`   | Replay just the Yes/No questions (auth required) |
| `/commitments` | Replay just the promises (auth required) |

## 🔐 Demo Login

Two demo accounts share the same password (your nikah date):

| Username | Password   | Identity     |
| -------- | ---------- | ------------ |
| `fariha` | `15052026` | Fariha — the beloved |
| `sayed`  | `15052026` | Abu Sayed — preview mode |

Click **"Need a hint?"** on the login screen to autofill either account.
Sign-in state persists in `localStorage`.

---

## 🚀 Run it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## 🎨 Customising

Everything is laid out in `src/components/`. The most useful places to edit:

| What you want to change | File |
| --- | --- |
| Names / dates / greetings | `IntroPopup.jsx`, `Hero.jsx`, `LoveCounter.jsx` |
| Timeline events | `Timeline.jsx` (top of file — `EVENTS` array) |
| Photos | `Gallery.jsx` (`MEMORIES` array — drop files in `public/memories/`) |
| Love letter text | `Letter.jsx` (top of file — `PARAGRAPHS` & `SIGNATURE_LINES`) |
| Duas | `Duas.jsx` (top of file — `DUAS` array) |
| Future dreams | `Future.jsx` (top of file — `DREAMS` array) |
| Background music | Drop an mp3 at `public/audio/nasheed.mp3` |
| Colours | `tailwind.config.js` (rose-gold, soft-gold, cream palette) |

---

## 💍 Made with

> *“And He placed between you affection and mercy.”* — Qur’an 30:21

Made with endless love by **Abu Sayed** for **Fariha Tasnim** ❤️
