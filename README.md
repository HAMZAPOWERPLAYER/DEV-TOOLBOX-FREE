# DEV-TOOLBOX-FREE

<div align="center">

![DEV-TOOLBOX-FREE Logo](/icon.svg)

# DEV-TOOLBOX-FREE
### The 100% Client-Side, Offline-First, Privacy-First Developer Toolbox PWA

[![License: MIT](https://img.shields.io/badge/License-MIT-indigo.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Workbox%20Offline-emerald.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Security: Zero Exfiltration](https://img.shields.io/badge/Privacy-100%25%20Local-green.svg)](#privacy-guarantees)

**Zero Backend • Zero Tracking • Zero Signups • 100% In-Browser Execution**

[Explore Tools](#-tool-directory-15-production-tools) • [Architecture](#-system-architecture) • [Creator & Credits](#-creator--credits) • [Quick Start](#-quick-start)

</div>

---

## 🌟 Creator & Credits

This project is conceptualized, designed, and architected by:

### **HAMZAPOWERPLAYER**
- **Lead Architect & Creator:** HAMZAPOWERPLAYER
- **Contact / Inquiries:** [hamzapowerplayer.global@gmail.com](mailto:hamzapowerplayer.global@gmail.com)
- **Role:** Product Vision, UX/UI System Design, Security Threat Modeling, and Full-Stack Engineering.

> *"Developer tools should never transmit sensitive credentials, production JWTs, hashes, or payload snippets over the wire. DEV-TOOLBOX-FREE was built with an uncompromising commitment to local computation, privacy, and zero telemetry."*
> — **HAMZAPOWERPLAYER**

---

## 🛡️ Privacy Guarantees & Threat Model

Traditional web tools (formatters, decoders, hashing utilities) often relay sensitive data across third-party remote endpoints, exposing keys, session tokens, and proprietary payloads to server logs, proxy caches, and network sniffers.

**DEV-TOOLBOX-FREE** eliminates this vector entirely:

1. **Strictly In-Browser Runtime**:
   - 100% of formatting, hashing, decoding, conversions, and generation take place in your browser's V8 / JavaScript virtual machine.
   - Cryptographic digests utilize the native **W3C Web Crypto API** (`window.crypto.subtle`), avoiding third-party server calls.
2. **Zero Remote Telemetry & Zero Analytics**:
   - No Google Analytics, no Mixpanel, no Sentry pings, no advertising pixels, and no remote crash loggers.
   - Zero cookies and zero persistent third-party trackers.
3. **True Offline-First Operation**:
   - Packaged with a Progressive Web App (PWA) Service Worker using cache-first asset management.
   - Disconnect your internet connection or switch to airplane mode: every tool remains fully operational.
4. **Air-Gapped Friendly**:
   - Safe for use in high-security corporate networks, air-gapped workstations, DevOps environments, and developer sandboxes.

---

## 🛠️ Tool Directory (15 Production Tools)

Every tool has been designed with responsive layouts, error handling, syntax highlighting, copy actions, and persistent local state.

| # | Category | Tool | Key Capabilities | Native API / Engine |
|---|---|---|---|---|
| 1 | **Converters** | **JSON Formatter & Validator** | Pretty-print, 2/4-space indent, minify, key sorting, deep tree collapse, JSON validation | Native V8 JSON engine |
| 2 | **Crypto & Auth** | **JWT Decoder** | Decode header & payload claims, verify expiry (`exp`, `nbf`), inspect standard OAuth/OIDC claims | Client Base64URL parsing |
| 3 | **Crypto & Auth** | **Cryptographic Hash Generator** | Real-time computation of SHA-256, SHA-512, SHA-384, and SHA-1 for text and file payloads | Native `crypto.subtle.digest` |
| 4 | **Text & Diff** | **Regex Tester** | Real-time regular expression evaluator with capture group tables, flag toggles, and match highlighting | ECMAScript RegExp engine |
| 5 | **Encoding** | **Base64 Encoder / Decoder** | UTF-8 text and binary file encoding/decoding with URL-safe standard toggles | Native `TextEncoder` / `btoa` / `atob` |
| 6 | **Generators** | **UUID Generator** | Bulk generation (up to 100) of RFC 4122 v4 UUIDs, with hyphenless and uppercase modes | Native `crypto.randomUUID()` |
| 7 | **Converters** | **Color Converter & WCAG Checker** | Instant HEX ↔ RGB ↔ CSS variable conversion with WCAG AA contrast ratio calculation against dark & light backdrops | Mathematical sRGB Luminance |
| 8 | **Encoding** | **URL Encoder / Decoder** | Encode/decode URI strings with structured query parameter breakdown tables | Native `URL` & `encodeURIComponent` |
| 9 | **Converters** | **Timestamp Converter** | Live Unix epoch clock (seconds & ms), ISO-8601 conversions, relative time offsets | Native `Date` engine |
| 10 | **Generators** | **Password & Secret Generator** | Cryptographically secure random passwords with customizable character pools and Shannon entropy scoring | `crypto.getRandomValues()` |
| 11 | **Text & Diff** | **Diff Checker** | Side-by-side text and code difference viewer with line-level addition, removal, and change highlights | Custom diff matrix algorithm |
| 12 | **Generators** | **Cron Schedule Parser** | Plain-English schedule descriptions for 5-part cron syntax with quick presets | Human cron tokenizer |
| 13 | **Text & Diff** | **Lorem Ipsum Generator** | Flexible placeholder generator for paragraphs, sentences, and words with optional HTML `<p>` markup | Deterministic word generator |
| 14 | **Generators** | **QR Code Generator** | High-density QR code creation for links, text, and credentials with customizable sizing, error correction, and instant PNG downloads | Canvas / QRCode SVG Engine |
| 15 | **Web & Dev** | **Markdown Live Preview** | Split-pane live markdown editor with GitHub Flavored Markdown (GFM), code fences, tables, and task lists | `react-markdown` + `remark-gfm` |

---

## ⚡ Productivity & UX Features

- **Global Command Palette (`⌘K` / `Ctrl+K`)**:
  - Instant fuzzy search across tool titles, descriptions, categories, and utility keywords powered by **Fuse.js**.
  - Full keyboard navigation (`↑`, `↓`, `Enter`, `Esc`).
- **One-Click Clipboard Actions**:
  - Integrated copy buttons with feedback states and notifications powered by `sonner`.
- **System, Light & Dark Theme**:
  - Automatically matches OS color preference with persistent manual override in `localStorage`.
- **Keyboard Shortcuts**:
  - Quick single-key triggers for frequently used utilities.
- **Favorites & Recent History**:
  - Pin your essential daily tools to the top of your workspace; recently used tools are tracked locally.

---

## 🏗️ System Architecture

dev-toolbox-free/
├── public/ # Static PWA assets & icons
│ ├── icon.svg # Scalable vector application logo
│ └── favicon.ico
├── src/
│ ├── app/ # Application shell & routing
│ │ ├── AppLayout.tsx # Master layout with Header, Sidebar & Toaster
│ │ └── router.tsx # React Router v6 lazy-loaded route configuration
│ ├── components/ # Reusable UI & Layout components
│ │ ├── layout/ # Header, Sidebar, CommandPalette, ThemeToggle, PWAInstall
│ │ ├── shared/ # ToolLayout, ToolCard, CopyButton, ErrorBoundary
│ │ └── ui/ # Accessible primitives (Button, Input, Card, Badge)
│ ├── features/ # Dedicated self-contained tool modules (15 tools)
│ │ ├── base64/
│ │ ├── color-picker/
│ │ ├── cron-parser/
│ │ ├── diff-checker/
│ │ ├── hash-generator/
│ │ ├── home/
│ │ ├── json-formatter/
│ │ ├── jwt-decoder/
│ │ ├── lorem-ipsum/
│ │ ├── markdown-preview/
│ │ ├── password-generator/
│ │ ├── qr-code-generator/
│ │ ├── regex-tester/
│ │ ├── timestamp-converter/
│ │ ├── url-encoder/
│ │ └── uuid-generator/
│ ├── hooks/ # Custom React hooks (useClipboard, useHotkeys, usePWAInstall, etc.)
│ ├── lib/ # Tool registry, Zustand stores, and utilities
│ │ ├── store.ts # Theme, sidebar state, favorites, and recents
│ │ ├── tool-registry.ts # Central registry for routes, search, and navigation
│ │ └── utils.ts # Classnames & string helpers
│ ├── types/ # Global TypeScript type definitions
│ ├── App.tsx # Root React application entry
│ ├── index.css # Tailwind CSS imports & custom variables
│ └── main.tsx # Client DOM mount
├── index.html # HTML5 entry with PWA meta tags & web fonts
├── metadata.json # Platform manifest & permissions metadata
├── package.json # Project dependencies & build scripts
├── tsconfig.json # Strict TypeScript configuration
└── vite.config.ts # Vite 5+ and VitePWA configuration


---

## 💻 Tech Stack & Dependencies

- **Frontend Core**: React 19, TypeScript (Strict Mode enabled)
- **Bundler & Dev Server**: Vite 8+
- **Styling**: Tailwind CSS v4, Lucide React icons
- **State Management**: Zustand (Minimalist local persistence)
- **Routing**: React Router v7 (Code-split with `React.lazy` and `Suspense`)
- **PWA Integration**: `vite-plugin-pwa` with Workbox caching
- **Search Engine**: Fuse.js (Fast client-side fuzzy searching)
- **Cryptography**: Native Web Crypto API (`window.crypto.subtle`)
- **Notifications**: Sonner

---

## 🚀 Quick Start

### Prerequisites
- Node.js `18.0.0` or higher
- npm `9.0.0` or higher (or pnpm / yarn)

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/HAMZAPOWERPLAYER/DEV-TOOLBOX-FREE.git
cd DEV-TOOLBOX-FREE

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open your browser and navigate to:

http://localhost:3000


### Production Build

```bash
# Type check and build optimized static bundle with PWA service workers
npm run build

# Preview production build locally
npm run preview
```

---

## 📱 Installing as a PWA

1. **Desktop (Chrome / Edge / Brave)**:
   - Click the **Install App** button in the top navigation bar, or click the install icon in the browser address bar.
2. **iOS / iPadOS (Safari)**:
   - Tap the **Share** button at the bottom of Safari and select **"Add to Home Screen"**.
3. **Android (Chrome)**:
   - Tap the three-dot menu and select **"Add to Home screen"** or **"Install app"**.

---

## 📄 License & Attribution

Distributed under the **MIT License**. See `LICENSE` for details.

### Project Leadership
- **Architect & Author**: **HAMZAPOWERPLAYER**
- **Email**: [hamzapowerplayer.global@gmail.com](mailto:hamzapowerplayer.global@gmail.com)
- **Copyright**: © 2026 HAMZAPOWERPLAYER. All rights reserved.
