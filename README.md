# Burbz OS MVP

Burbz OS MVP is a lightweight React + Vite interface for running an off-grid Llama AI workstation. The current prototype focuses on a desktop-style experience for local chat, offline file access, model status, and power-aware operation.

## What changed in this refactor

- Replaced the single monolithic `React.createElement` screen with small JSX components.
- Removed unused Tailwind/PostCSS scaffolding and a conflicting legacy stylesheet.
- Made each dock app (`Chat`, `Vault`, `Models`, `Power`) render a focused workspace instead of only changing the title.
- Centralized product copy and dashboard data in one module so the UI is easier to maintain.
- Improved accessibility with clearer button state, focus styles, and more semantic structure.

## Project structure

```text
src/
  components/   reusable UI building blocks
  data/         dashboard copy and mock data
  pages/        route-level screens
  App.jsx       app shell
  main.jsx      React entry point
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
