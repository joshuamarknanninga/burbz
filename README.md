# Haunted Object Archive MVP

This project is a React + Vite remake of the original haunted-object-database concept. Instead of a simple map, it focuses on a serious archival workflow for haunted object submissions, moderation, and long-term storage.

## MVP features

- **Detailed intake form** for haunted object submissions with provenance, chain of custody, evidence, witnesses, and a seriousness attestation.
- **Storage house archive** that keeps every submitted form in a browsable local archive.
- **Seriousness vetting system** that scores each submission and routes it into archived, review, or hold states.
- **Gamified progression** with credibility XP, level titles, badges, and field quests inspired by crowd-powered contribution loops.
- **Local persistence** via `localStorage` so the MVP works without standing up a backend.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- This MVP stores report data in browser storage to simulate a storage house and vetting queue.
- A future production version could swap the local persistence layer for an API and database-backed moderation service.
