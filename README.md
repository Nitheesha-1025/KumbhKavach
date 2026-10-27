# Kumbh Kavach

Offline-first crowd-safety, SOS, lost-and-found, and MyBharat volunteer dispatch prototype for **Nashik-Trimbakeshwar Simhastha**.

This is a **hackathon demo PWA** with simulated crowd density, SOS routing, consent-based lost-person matching, and SMS / offline fallback UX. No real YOLO, Twilio, or Bhashini keys are required.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Stack

- React + Vite PWA (`vite-plugin-pwa`)
- Leaflet heatmap (simulated density circles over Ramkund / ghats)
- EN / हिंदी / मराठी UI toggle
- Offline / jammed-network simulation → SMS fallback messaging

## 2–3 minute demo path

Pitch order for judges (click through on mobile width if possible):

1. **Home** — Brand + tagline. Toggle **EN / हिं / मर** in the top bar. Tap **Simulate jammed network** (or the live/offline chip) so the UI shows SMS fallback.
2. **Heatmap** — Bottom nav → **Heatmap**. Point out the red **Ramkund North** crush-risk zone, early-warning banner (~12 min), and zone meters.
3. **SOS** — Nav → **SOS**. Hold the red button until it fires. With offline on, call out **SMS · MSG91 (sim)** routing, nearest medical camp, and ETA.
4. **Lost & found** — Nav → **Lost**. Tap voice note → **Submit report** → wait for consent match → **Notify family & volunteers**.
5. **Volunteers** — Nav → **Volunteers**. Show open MyBharat tasks → **Assign nearest volunteer** → volunteer en route to SOS escort.
6. Optional close — Flip language again, flip network back to live, return **Home**.

Target talking points: early crush warning, SOS under jammed networks, consent/privacy for matching, one shared pilgrim + command + volunteer loop.
