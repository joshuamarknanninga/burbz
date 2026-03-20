# Argo Trail MVP

This project is now a React + Vite prototype for an Oregon Trail-style survival game set on Jason's voyage to Colchis. The goal is to make the player manage supplies, morale, crew, hull integrity, and divine favor while moving through a route grounded in ancient Greek mythic sources.

## Design goals

- **Myth-history route:** the voyage follows major Argonaut stops such as Iolcus, Lemnos, Cyzicus/Mysia, Phineus, the Symplegades, and Colchis.
- **Historically grounded supplies:** inventory uses staples and trade goods with strong ancient Greek relevance such as barley, wine, olive oil, and silver.
- **Readable MVP structure:** a single-screen React app keeps the loop obvious: provision, make port decisions, sail, read the log, and either reach Colchis or fail.
- **Local persistence:** the current run saves in `localStorage`, so the MVP can be opened and resumed without a backend.

## Research backbone

The in-app route and text were informed by a mix of ancient-source aggregations and modern reference material:

- **Diodorus Siculus, *Library of History* 4.40-58** for Jason's outfitting of the ship and the fifty-four companions.
- **Apollonius Rhodius, *Argonautica*** for Phineus, the outward route, and the Symplegades as the defining navigation hazard.
- **Theoi source pages on Apollo's oracles and the Gegenees** for ritual framing, port guidance, and the Mysian danger episode.
- **Britannica and World History Encyclopedia** for modern synthesis on Jason, the Argonauts, and major Greek trade goods such as cereals, wine, and olives.

The MVP deliberately labels the experience as **myth-history** rather than literal history. It follows ancient literary tradition closely, but it does not claim archaeological proof for legendary events.

## Getting started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
