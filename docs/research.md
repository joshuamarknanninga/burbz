# Deep research: JavaScript stack for a diabetes nutrition scanner

## What I reviewed

### Referenced repository

The public repository at `joshuamarknanninga/diabetes-nutrition-app` presents itself as a scanning app for diabetics, but its README is mostly generated boilerplate and the project structure suggests an older Expo/React Native setup rather than a production-ready mobile architecture.

## Recommendation

### Best near-term stack

**Expo SDK 54 + React Native + `expo-camera`** is the best fit for this rebuild when the priority is:

- one JavaScript codebase for **Android and iOS**
- reliable access to the **rear camera**
- support for **QR plus UPC-family barcodes**
- minimal native maintenance overhead

### Why it wins

Expo's Camera documentation for SDK 54 shows barcode scanning is built into the camera module and supports the barcode types needed here, including `qr`, `upc_a`, and `upc_e`, alongside `ean13` and `ean8`. That covers the practical retail-package scanning path for a nutrition app.

## Advanced fallback

### `react-native-vision-camera`

If this product later needs:

- faster scanning throughput
- frame processors
- custom live overlays
- tighter control over camera performance

then **VisionCamera** is the stronger long-term camera engine.

Its official code-scanning guide documents QR and multiple barcode families, and explains an important cross-platform edge case: on iOS, UPC-A can be surfaced as EAN-13 with a leading `0`, so apps should normalize that in JavaScript before lookup.

That exact normalization rule is implemented in `src/utils/barcode.js` in this rebuild.

## Architecture decisions used in this repo

1. **Managed Expo app instead of a web-first React app**  
   The user requirement is camera use on Android and Apple devices. A browser-first Vite app is the wrong default for that requirement.

2. **Local-first meal logging**  
   Scans are stored in AsyncStorage first so the app remains useful offline or in clinical/retail environments with poor signal.

3. **Scan now, API later**  
   This rebuild includes a mock catalog to prove the camera flow. The next production step should be hooking UPC values into a real nutrition database such as USDA FoodData Central or Open Food Facts.

4. **Keep VisionCamera as a targeted upgrade**  
   It is powerful, but not necessary for the first usable cross-platform rebuild.

## Practical next steps

- Wire scanned UPC values to a live food database.
- Add account sync, glucose-entry correlation, and provider-facing exports.
- Add camera test coverage in a dev client or EAS preview build.
- Add serving-size adjustments and insulin-carb ratio helpers if the medical workflow requires them.
