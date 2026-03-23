# Burbz Blitz

Burbz Blitz is a React + Vite concept for a funny, Waze-inspired neighborhood radar app — basically a playful Hood Mapz-style prototype with leaderboards, missions, heat zones, and a cross-platform deployment plan.

## What changed

- Replaced the default Vite starter with a themed React experience.
- Added a gamified neighborhood dashboard with mock map hotspots, social ranks, and missions.
- Added PWA scaffolding so the project can move toward Android, iPhone, and desktop installs.
- Added a research brief documenting the recommended tech stack and rollout plan.

## Cross-platform direction

The repo is now set up around a web-first architecture:

1. **Desktop + mobile web:** run as a responsive React site.
2. **PWA install:** installable on supported browsers using the included manifest and service worker.
3. **Native packaging:** wrap the same build with Capacitor when you’re ready for iOS/Android store distribution.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Recommended next steps

- Add MapLibre GL JS and real neighborhood data layers.
- Add an install prompt and account/profile persistence.
- Integrate moderation, content verification, and optional push notifications.
- Package with Capacitor for Android and iPhone once the game loop is validated.

## Research

See `docs/research.md` for the deeper platform and technology brief.
