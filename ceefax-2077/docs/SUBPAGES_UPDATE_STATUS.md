# Sub-Pages Visual Unification Status

## Completed Updates ✅

### Zone 100 (TRUTH) - Blue/Yellow BBC Style
- ✅ **100** - TruthHub (Hub page)
- ✅ **101** - GlobalWire (News feed with HackerNews API)
  - Uses TeletextPage component
  - Blue borders (#0066CC)
  - Yellow/White text
  - Professional BBC style
  - Inline styles for strict control

### Zone 200 (SYSTEM) - Gold/Black Financial
- ✅ **201** - Stonks (Crypto prices - PARTIALLY UPDATED)
  - Needs completion of content styling
  - Gold/Black color scheme
  - Financial terminal vibe
  - Emoji usage: 🚀📉💎

### Zone 400 (PLANET) - Green/White Nature
- ✅ **401** - EcoSense (Atmosphere monitor - PARTIALLY UPDATED)
  - Needs completion of content styling
  - Green/White colors
  - Scientific data display
  - Environmental icons: 🌍📡☢️

## Remaining Updates 📋

### Zone 100 (TRUTH)
- [ ] **103** - LieDetector
  - Bias detection interface
  - Credibility scoring
  - Blue/Yellow scheme

### Zone 200 (SYSTEM)
- [ ] **200** - SystemHub
- [ ] **202** - CodeExorcist
- [ ] **204** - OracleOfDoom
- [ ] **205** - TheBasilisk

### Zone 300 (PULSE)
- [ ] **300** - PulseHub
- [ ] **301** - TheBlast (Gossip feed)
  - **CRITICAL**: Must use `>` bullets
  - Magenta/Cyan colors
  - Gossip Girl vibe
  - Emojis: 💅✨💀
- [ ] **304** - SoulWeight

### Zone 400 (PLANET)
- [ ] **400** - PlanetHub
- [ ] **403** - PlanB (Mars colonization)
- [ ] **405** - ShelterSeeker

### Zone 500 (SHIELD)
- [ ] **500** - ShieldHub
- [ ] **501** - CrimeWatch
- [ ] **502** - ScamBuster
- [ ] **503** - PocketLawyer
- [ ] **504** - SOSBeacon

### Zone 666 (GLITCH)
- [ ] **666** - GlitchMode
  - **SPECIAL**: Container-level effects only
  - Preserve grid structure
  - Dark red colors
  - Glitch animations

### Zone 800 (HOME)
- [ ] **800** - HomeHub
- [ ] **801** - TeleHome (IoT control)
- [ ] **802** - TimeMachine (Wayback Machine)
- [ ] **803** - PixelGen (AI to ASCII)

### Zone 900 (THEMES)
- [ ] **905** - ThemeSelector
- [ ] **906** - TapeLibrary (VHS playback)
- [ ] **907** - HookDashboard

## Update Strategy

### Phase 1: High Priority (User-Facing Content)
1. 101 GlobalWire ✅
2. 201 Stonks (complete)
3. 301 TheBlast (with > bullets)
4. 401 EcoSense (complete)
5. 501 CrimeWatch

### Phase 2: Feature Pages
1. 666 GlitchMode (special handling)
2. 802 TimeMachine
3. 803 PixelGen
4. 801 TeleHome

### Phase 3: Hub Pages
1. All X00 pages (hubs)

### Phase 4: Utility Pages
1. Remaining sub-pages

## Standard Update Template

```tsx
import TeletextPage, { TeletextListItem } from '../../components/TeletextPage'

export default function PageName() {
  return (
    <TeletextPage 
      title="PAGE TITLE" 
      subtitle="Subtitle text"
      footer="Footer text"
      zone={XXX}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem',
        fontSize: 'clamp(14px, 1.8vmin, 20px)'
      }}>
        {/* Content with inline styles */}
      </div>
    </TeletextPage>
  )
}
```

## Zone-Specific Requirements

### Zone 300 (PULSE) Special Rules
```tsx
// Use > bullets
<TeletextListItem bullet=">">
  Content
</TeletextListItem>

// Magenta/Cyan colors
style={{ 
  border: '2px solid #FF1493',
  color: '#00FFFF'
}}

// Gossip Girl slang
"BESTIE", "FR FR", "NO CAP", "SLAY"
```

### Zone 666 (GLITCH) Special Rules
```tsx
// Apply effects to container, NOT content
<div className="zone-666-content">
  {/* Grid structure preserved */}
</div>

// CSS handles distortion
.zone-666-content::before {
  /* Noise overlay */
}
```

## Testing Per Page

- [ ] Header: Correct zone color
- [ ] Title: Double-height
- [ ] Content: Fits in grid (no scroll)
- [ ] Footer: Fastext buttons
- [ ] Colors: Zone-appropriate
- [ ] Font: VT323 monospace
- [ ] Responsive: clamp() sizing
- [ ] Keyboard: Navigation works

## Progress Tracking

**Total Pages**: 28
**Completed**: 3 (11%)
**In Progress**: 2 (7%)
**Remaining**: 23 (82%)

**Target**: 100% by end of session

## Next Actions

1. Complete Stonks (201) content styling
2. Complete EcoSense (401) content styling
3. Update TheBlast (301) with > bullets
4. Update GlitchMode (666) with special handling
5. Batch update remaining hub pages
6. Batch update remaining sub-pages

## Notes

- All pages now use TeletextLayout wrapper (automatic)
- Individual pages need TeletextPage component
- Inline styles preferred over Tailwind classes
- Each zone maintains distinct personality
- Strict 40×24 grid enforced globally
- No scrolling allowed (pagination if needed)
