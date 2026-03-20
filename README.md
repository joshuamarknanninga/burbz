# GlucoseScan Nutrition

GlucoseScan Nutrition is a rebuilt React Native + Expo prototype for a diabetes-focused nutrition app. It replaces the previous mixed web/mobile code with a single JavaScript codebase aimed at **Android and iPhone deployment**, with camera-driven **UPC and QR code scanning** for nutrition lookup.

## Why this rebuild

The referenced `diabetes-nutrition-app` repository mixes an older Expo setup with a generated README and deprecated scanning patterns. This repository now focuses on a maintainable mobile-first architecture:

- **Expo SDK 54** app scaffold for one React Native codebase.
- **`expo-camera`** for device camera access and barcode scanning.
- **UPC + QR support** with a normalization helper for the iOS EAN-13/UPC-A edge case.
- **AsyncStorage meal log** so recent scans persist locally.
- **Research notes** documenting the chosen JavaScript camera stack and advanced alternatives.

## Included flows

- Scan UPC-A, UPC-E, EAN-13, EAN-8, and QR codes.
- Show a nutrition card for recognized demo products.
- Save scanned items into a local meal log.
- Surface an architecture/research tab directly in-app.

## Project structure

- `App.js` - main mobile UI and scanning flow.
- `src/data/mockCatalog.js` - demo nutrition records and stack shortlist.
- `src/utils/barcode.js` - scan normalization and nutrition summary helpers.
- `docs/research.md` - deeper research and platform recommendations.
- `app.json` - Expo app metadata plus iOS/Android camera permissions.

## Getting started

```bash
npm install
npm run start
```

Then open the project in Expo Go or build a dev client:

```bash
npm run android
npm run ios
```

## Recommended next integrations

1. Replace the bundled `productCatalog` with Open Food Facts or USDA-backed lookups.
2. Add auth and cloud sync if users need cross-device meal history.
3. Upgrade to `react-native-vision-camera` only if you need native frame processors, faster overlays, or more advanced realtime camera control.
