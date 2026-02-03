# ⚡ WizTorrent Mobile UI Prototype

A high-fidelity, modern, and responsive user interface for a mobile Torrent Client. This project demonstrates a production-ready UI architecture using React, TypeScript, and Tailwind CSS, focusing on glassmorphism aesthetics and smooth micro-interactions.

## 🚀 Tech Stack

- **Framework:** React 18.3.1 (via ES Modules)
- **State Management:** MobX 6 (Reactive state)
- **Styling:** Tailwind CSS (Utility-first, Dark Mode support)
- **Icons:** Lucide React
- **Language:** TypeScript

## 📂 Project Structure

### Core Files
- **`index.html`**: Application entry point. Handles Tailwind configuration (theme colors, fonts) and ES Module Import Maps.
  - *Note:* Configured with strict 18.3.1 mappings for React and React-DOM to ensure a singleton instance and prevent rendering errors.
- **`index.tsx`**: React mounting point.
- **`App.tsx`**: Main application layout. Handles high-level layout structure and MobX store integration.
- **`store.ts`**: Centralized state management using MobX. Handles:
  - Torrent list management.
  - Theme state (Dark/Light).
  - Simulation logic (download progress, speed calculation).
- **`types.ts`**: TypeScript definitions for Torrents, Status enums, and Language types.
- **`translations.ts`**: Localization dictionary (English, Italian, Russian).

### Components (`components/`)
- **`Header.tsx`**: Top navigation bar with animated language selector and theme toggle.
- **`TorrentCard.tsx`**: Complex list item displaying torrent status, progress bars with shimmer effects, and control actions.
- **`AddSheet.tsx`**: Mobile-style bottom sheet for adding torrents via Magnet link or file selection.
- **`DeleteModal.tsx`**: Backdrop-blurred modal for confirmation actions.
- **`Button.tsx`**: Reusable button component with variant support (primary, secondary, danger, ghost).

## ✨ Key Features

- **Reactive State**: Instant UI updates upon state changes (pausing, deleting, language switching) without page reloads.
- **Adaptive Theme**: Native support for Dark and Light modes with smooth color transitions.
- **Internationalization**: Full i18n support with dynamic text switching.
- **Simulated Backend**: The `store.ts` contains logic to simulate download speeds and progress updates to demonstrate UI responsiveness.
- **Mobile-First UX**: Touch-friendly targets, bottom-sheet interactions, and responsive layout.

## 🔧 Setup & Running

This project uses ES Modules directly in the browser via `esm.sh`. No build step (Webpack/Vite) is strictly required for previewing, though a local server is recommended to avoid CORS issues.

1. Open the directory in a code editor.
2. Serve the root directory using a local static server (e.g., VS Code Live Server, `python -m http.server`, or `npx serve`).
3. Open `index.html` in the browser.