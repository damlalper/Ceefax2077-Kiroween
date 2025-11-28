# Teletext 2077 - Intelligence Terminal Refactor

## 🎯 Vision
"Teletext 2077" is a serious, AI-powered Intelligence Terminal designed to solve modern problems (Fake News, Complexity, Danger) using a minimalist retro interface.

## 🗂️ 5-ZONE Architecture

### ZONE 100: THE TRUTH (News & Facts)
**Color:** Blue (#0066CC)
- **100** - Truth Hub (Dashboard)
- **101** - Global Wire (AI-summarized world news)
- **103** - Lie Detector (Text manipulation analyzer)

### ZONE 200: THE SYSTEM (Economy & Tech)
**Color:** Gold (#FFD700)
- **200** - System Hub (Dashboard)
- **201** - Stonks (Crypto/Stock block charts)
- **202** - Code Exorcist (AI legacy code refactor with spooky comments)
- **204** - Oracle of Doom (Market risk doomsday clock)

### ZONE 300: THE PULSE (Society)
**Color:** Pink (#FF1493)
- **300** - Pulse Hub (Dashboard)
- **301** - The Blast (Anonymous gossip feed with trust/cap voting)
- **304** - Soul Weight (Social media toxicity analyzer)

### ZONE 400: THE PLANET (Environment)
**Color:** Green (#00CC66)
- **400** - Planet Hub (Dashboard)
- **401** - Eco Sense (Air quality & radiation warnings)
- **405** - Shelter Seeker (Disaster map: water, power, meds)

### ZONE 500: SHIELD (Security & Rights)
**Color:** Red (#CC0000)
- **500** - Shield Hub (Dashboard)
- **501** - Crime Watch (Location-based safety score)
- **502** - Scam Buster (AI fraud detection)
- **503** - Pocket Lawyer (Legal rights simplified)
- **504** - SOS Beacon (Emergency strobe & info)

### ZONE 666: GLITCH MODE
**Color:** Red (#CC0000)
- **666** - System Failure (Horror/glitch mode)

## 📁 Project Structure

```
ceefax-2077/
├── src/
│   ├── pages/
│   │   ├── 100_truth/
│   │   │   ├── TruthHub.tsx
│   │   │   ├── GlobalWire.tsx
│   │   │   ├── LieDetector.tsx
│   │   │   └── index.ts
│   │   ├── 200_system/
│   │   │   ├── SystemHub.tsx
│   │   │   ├── Stonks.tsx
│   │   │   ├── CodeExorcist.tsx
│   │   │   ├── OracleOfDoom.tsx
│   │   │   └── index.ts
│   │   ├── 300_pulse/
│   │   │   ├── PulseHub.tsx
│   │   │   ├── TheBlast.tsx
│   │   │   ├── SoulWeight.tsx
│   │   │   └── index.ts
│   │   ├── 400_planet/
│   │   │   ├── PlanetHub.tsx
│   │   │   ├── EcoSense.tsx
│   │   │   ├── ShelterSeeker.tsx
│   │   │   └── index.ts
│   │   ├── 500_shield/
│   │   │   ├── ShieldHub.tsx
│   │   │   ├── CrimeWatch.tsx
│   │   │   ├── ScamBuster.tsx
│   │   │   ├── PocketLawyer.tsx
│   │   │   ├── SOSBeacon.tsx
│   │   │   └── index.ts
│   │   └── 666_glitch/
│   │       ├── GlitchMode.tsx
│   │       └── index.ts
│   ├── components/
│   │   ├── TeletextGrid.tsx (Layout wrapper)
│   │   ├── KeyboardListener.tsx
│   │   ├── SignalLostPage.tsx (404)
│   │   ├── GlitchPage.tsx
│   │   ├── OuijaPage.tsx (333)
│   │   ├── DeadSignalPage.tsx (444)
│   │   └── GhostWriterPage.tsx (777)
│   ├── utils/
│   │   └── zoneHelper.ts (Zone colors & navigation)
│   ├── App.tsx (Main router)
│   └── ...
└── .kiro/
    └── specs/
        └── routing.yaml (Zone definitions)
```

## 🎨 Navigation Footer

```
100 TRUTH | 200 SYSTM | 300 PULSE | 400 PLNET | 500 SHILD
```

## 🚀 Running the Project

```bash
cd ceefax-2077
npm install
npm run dev
```

Visit: http://localhost:5173/

## 🎮 Navigation

- Type 3-digit page numbers (e.g., `100`, `201`, `666`)
- Press Enter or wait for auto-navigation
- Use zone hub pages (100, 200, 300, 400, 500) as dashboards

## ✨ Key Features

- **AI-Powered Intelligence**: Each zone uses AI for analysis and insights
- **Retro Teletext UI**: Authentic 40x24 character grid aesthetic
- **CRT Effects**: Scanlines, phosphor glow, screen curvature
- **Zone-Based Color Coding**: Each zone has distinct visual identity
- **Interactive Tools**: Text analyzers, code refactors, fraud detection
- **Emergency Features**: SOS beacon, shelter seeker, crime watch

## 🔧 Technical Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Custom Teletext CSS effects

## 📝 Notes

- All pages use `TeletextGrid` layout component
- Zone colors are defined in `zoneHelper.ts`
- Routing logic is in `App.tsx`
- Spec definitions in `.kiro/specs/routing.yaml`
