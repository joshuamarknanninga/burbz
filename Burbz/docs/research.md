# Burbz Blitz research brief

_Last updated: March 23, 2026._

## Goal

Turn the current prototype into a funnier, more informative, Waze-like “hood mapz” product that can ship on:

- Android phones.
- iPhones.
- Desktop/laptop browsers.

## Recommended product architecture

### 1. Build the product as a React web app first

Why:

- The existing repo already uses React + Vite.
- A responsive React UI can cover desktop and mobile browsers quickly.
- This keeps iteration speed high while validating the game loop.

### 2. Make the web app installable as a PWA

Why:

- MDN’s web app manifest documentation says the manifest provides the information browsers need to install a web app on a device.
- web.dev’s installation and manifest guidance recommends a manifest with properties such as `name`, `icons`, `start_url`, `display`, and related metadata for installability.
- MDN notes installed PWAs can use `display: standalone` to feel more app-like.

What this means for Burbz Blitz:

- Android users can install the product from Chromium-based browsers.
- Desktop users can install it as a standalone app window in compatible browsers.
- iPhone users can use Safari’s web app flow, though exact install behavior differs from Chromium.

### 3. Package the same React app with Capacitor for stores

Why:

- Capacitor’s official docs describe it as a cross-platform native runtime for web apps.
- Capacitor explicitly targets iOS, Android, and PWAs with one modern web codebase.
- This is the lowest-friction path from a React prototype to App Store / Play Store packaging.

What this means for Burbz Blitz:

- Keep the React UI and business logic shared.
- Add native plugins only where needed: push notifications, haptics, camera, precise geolocation, background tasks.
- Avoid forking into multiple independent codebases too early.

## Map technology recommendation

### Best default: MapLibre GL JS

Why:

- MapLibre is open source and reduces lock-in risk.
- It is a strong fit for custom neighborhood overlays, heat zones, funny labels, and community markers.
- It aligns well with a product where style and custom data layers matter more than generic turn-by-turn navigation.

### When to consider Mapbox instead

Use Mapbox if you need:

- Premium basemaps with less design work.
- Turnkey geocoding/search/routing services.
- Faster startup with a paid hosted mapping stack.

### Suggested compromise

- Start with MapLibre for the main map renderer.
- Pair it with your own GeoJSON/community layers.
- Add a hosted provider only for the features that become painful to self-manage.

## Fun + funny + useful feature ideas

### Core game loop

Users should earn points only when they submit useful local intel, not generic comments.

Recommended actions to reward:

- Confirming whether a block is active, calm, packed, or chaotic.
- Flagging funny-but-useful local facts: long taco line, impossible parking, loud music, suspicious detour, hidden food gem.
- Verifying a safer walking route or a faster pickup route.
- Uploading proof such as a photo, short clip, or check-in confirmation.

### Gamification ideas inspired by Waze-style contribution loops

- **Neighborhood streaks:** reward users for posting accurate updates on consecutive days.
- **Titles/ranks:** “Route Goblin,” “Block Mayor,” “Snack Scout,” “Chaos Cartographer.”
- **Missions:** limited-time prompts like “verify parking on Sunset,” “check if the truck is still open,” or “rate the music spillover.”
- **Squads:** let friends or local crews compete for weekly leaderboard placement.
- **Trust score:** weight contributions by usefulness and community verification.

### Informational layers that make the app worth owning

- Food and nightlife pulse.
- Parking pain index.
- Safety comfort score based on time of day.
- Noise and crowd intensity.
- Street event / pop-up activity.
- Local gems, open-late stores, and “worth the detour” spots.

## Device capabilities worth adding next

### Geolocation

MDN documents the Geolocation API as broadly available, but only in secure contexts (HTTPS). That means deployment should use HTTPS and careful permission UX.

Use geolocation for:

- Centering the map.
- Nearby missions.
- Detecting whether users are close enough to verify reports.

### Notifications

Use push or local notifications for:

- “The block changed” alerts.
- Nearby mission prompts.
- Streak reminders.
- Trending neighborhood warnings.

### Haptics

Best used sparingly for:

- Mission completion.
- Badge unlocks.
- Entering a hot zone.

### Camera

Potential uses:

- Proof-of-visit check-ins.
- Short visual reports.
- Image moderation pipelines later.

## Optimization guidance

- Keep the first version lightweight and fast.
- Delay heavier map SDKs or analytics bundles until user value is proven.
- Cache app shell + recent report feed for better repeat visits.
- Prefer server-driven mission configs so events can change without redeploying.
- Add moderation and abuse prevention early because location-based apps attract noisy input.

## Suggested roadmap

### Phase 1: prototype

- Responsive React interface.
- Installable PWA shell.
- Mock neighborhood feed and missions.
- Lightweight leaderboard and profile progression.

### Phase 2: real map + live data

- MapLibre integration.
- Geolocation permissions.
- Real reports, reactions, and moderation.
- Admin tools for deleting low-quality or risky content.

### Phase 3: native polish

- Capacitor iOS + Android packaging.
- Push notifications.
- Haptics.
- Camera/photo proof flows.
- Optional app store distribution.

## Primary sources consulted

- MDN: Geolocation API — https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- MDN: Web application manifest — https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
- MDN: Create a standalone app — https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Create_a_standalone_app
- MDN: Making PWAs installable — https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable
- web.dev: Web app manifest — https://web.dev/learn/pwa/web-app-manifest
- web.dev: Installation — https://web.dev/learn/pwa/installation/
- Capacitor docs — https://capacitorjs.com/docs/
- Capacitor overview — https://capacitorjs.com/
- MapLibre docs / project pages — https://maplibre.org/
