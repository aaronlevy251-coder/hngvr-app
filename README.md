# HNGVR Basketball League PWA

Live: https://sparkling-centaur-2e903c.netlify.app

## Phase 1 architecture (this version)

- **PWA** — installable on iOS/Android home screen, offline-capable shell
- **Real-time Firebase listeners** — sub-second sync instead of 5-second polling
- **Viewer mode** — fans see read-only; commissioner/statkeeper/analyst PINs unlock edit controls
- **Service worker** — caches the app shell for offline access and fast loads

## File structure

```
/
├── index.html                  Main app (single-page, ~2,800 lines)
├── manifest.json               PWA manifest
├── sw.js                       Service worker (offline cache)
├── firebase-messaging-sw.js    FCM stub (activated in Phase 3)
├── icon-192.png                PWA icon
├── icon-512.png                PWA icon
├── icon-maskable-512.png       Android adaptive icon
├── apple-touch-icon.png        iOS home screen icon
└── favicon-32.png              Browser tab icon
```

## Firebase project

- Project: `hngvr-bdc8b`
- DB URL: `https://hngvr-bdc8b-default-rtdb.firebaseio.com`
- Data nodes: `/games`, `/teams`, `/players`, `/news`

## PIN codes

- Commissioner: `0422`
- Stat Keeper: `1738`
- Analyst: `1331`

## Phase roadmap

- ✅ **Phase 1** — PWA foundation, real-time listeners, viewer mode (CURRENT)
- **Phase 1.5** — One-time migration of historical archive into Firebase
- **Phase 2** — Games tab redesign (week strip nav, clean cards like thestats.ai)
- **Phase 3** — Push notifications via FCM (admin-triggered)
- **Phase 4** — HOF rosters, Google Sheets sync, design pass, player profiles
