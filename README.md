# ⚡ WizTorrent Mobile UI Prototype

A high-fidelity, modern, and responsive user interface for a mobile Torrent Client. This project demonstrates a production-ready UI architecture using React, TypeScript, and Tailwind CSS, focusing on glassmorphism aesthetics and smooth micro-interactions.

Now enhanced with **Ionic Framework** and **Capacitor** for native mobile deployment.

## 🚀 Tech Stack

- **Framework:** React 18.3.1 (via ES Modules)
- **Mobile Runtime:** Ionic Framework 8 & Capacitor 6
- **State Management:** MobX 6 (Reactive state)
- **Styling:** Tailwind CSS (Utility-first, Dark Mode support)
- **Icons:** Lucide React & Ionicons

## 📂 Project Structure

- **`package.json`**: NPM scripts and dependencies for Native/Android/iOS integration.
- **`capacitor.config.json`**: Capacitor configuration.
- **`App.tsx`**: Wrapped in `IonApp` and `IonContent` for Safe Area handling.

## 📱 Mobile Development (Ionic/Capacitor)

This project is configured to run as a native app on Android or iOS.

### Prerequisites
1. Install dependencies: `npm install`
2. Install Android Studio (for Android) or Xcode (for iOS).

### Commands

- **Sync Native Projects:** 
  ```bash
  npm run cap:sync
  ```
- **Open Android Studio:**
  ```bash
  npm run cap:open:android
  ```
- **Open Xcode:**
  ```bash
  npm run cap:open:ios
  ```
- **Add Platform:**
  ```bash
  npm run cap:add:android
  ```

## 🔧 Setup & Running (Web)

1. Serve the root directory.
2. Open `index.html`.

*Note:* The `IonHeader` automatically handles the status bar overlap on mobile devices using native Safe Area insets.

## 🐛 Recent Fixes
- **Language Menu Clipping:** Implemented `createPortal` in `Header.tsx` to render the language dropdown directly into `document.body`. This bypasses the `overflow: hidden` and strict stacking contexts of Ionic's `IonToolbar`, ensuring the menu is always visible on top of the content.
- **Reactivity Issue:** Wrapped `TorrentCard` component in `observer` to ensure it correctly updates when individual torrent properties (like status or progress) change in the store.
- **FAB Error:** Replaced the custom HTML floating button in `App.tsx` with `<IonFab>` and `<IonFabButton>`. This resolves the "Converting circular structure to JSON" error caused by improper event handling in the previous implementation and ensures correct Fixed positioning relative to the Ionic content area.
