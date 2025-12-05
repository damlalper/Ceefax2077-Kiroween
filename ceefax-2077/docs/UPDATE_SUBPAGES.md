# Sub-Pages Update Plan

## Pages to Update (28 total)

### Zone 100 (TRUTH) - Blue/Yellow BBC Style
- [x] 101 - GlobalWire (UPDATED)
- [ ] 103 - LieDetector

### Zone 200 (SYSTEM) - Gold/Black Financial
- [x] 201 - Stonks (IN PROGRESS)
- [ ] 202 - CodeExorcist
- [ ] 204 - OracleOfDoom
- [ ] 205 - TheBasilisk

### Zone 300 (PULSE) - Magenta/Cyan Pop
- [ ] 301 - TheBlast (needs > bullets)
- [ ] 304 - SoulWeight

### Zone 400 (PLANET) - Green/White Nature
- [ ] 401 - EcoSense (IN PROGRESS)
- [ ] 403 - PlanB
- [ ] 405 - ShelterSeeker

### Zone 500 (SHIELD) - Red/Yellow Alert
- [ ] 501 - CrimeWatch
- [ ] 502 - ScamBuster
- [ ] 503 - PocketLawyer
- [ ] 504 - SOSBeacon

### Zone 666 (GLITCH) - Dark Red Horror
- [ ] 666 - GlitchMode (special handling)

### Zone 800 (HOME) - Cyan/White
- [ ] 801 - TeleHome
- [ ] 802 - TimeMachine
- [ ] 803 - PixelGen

### Zone 900 (THEMES) - Grey/Cyan System
- [ ] 905 - ThemeSelector
- [ ] 906 - TapeLibrary
- [ ] 907 - HookDashboard

## Update Pattern for Each Page

```tsx
// OLD
import TeletextGrid from '../../components/TeletextGrid'

export default function PageName() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        {/* content */}
      </div>
    </TeletextGrid>
  )
}

// NEW
import TeletextPage from '../../components/TeletextPage'

export default function PageName() {
  return (
    <TeletextPage 
      title="PAGE TITLE" 
      subtitle="Subtitle"
      footer="Footer text"
      zone={XXX}
    >
      {/* content with inline styles */}
    </TeletextPage>
  )
}
```

## Zone-Specific Styling Rules

### Zone 100 (TRUTH)
- Colors: Blue (#0066CC), Yellow (#FFFF00), White (#FFFFFF)
- Style: Professional, formal, BBC News
- Borders: 2px solid #0066CC
- Backgrounds: #000033 for boxes

### Zone 200 (SYSTEM)
- Colors: Gold (#FFD700), Black (#000000), Green/Red for changes
- Style: Financial terminal, trading floor
- Emojis: 🚀📉💎🔥
- Slang: "STONKS", "DIAMOND HANDS", "TO THE MOON"

### Zone 300 (PULSE)
- Colors: Magenta (#FF1493), Cyan (#00FFFF)
- Style: Gossip Girl, dramatic, Gen Z
- Bullets: Use `>` instead of `*`
- Emojis: 💅✨💀☕
- Slang: "BESTIE", "FR FR", "NO CAP"

### Zone 400 (PLANET)
- Colors: Green (#00CC66), White (#FFFFFF)
- Style: Scientific, urgent, environmental
- Icons: 🌍📡☢️
- Data-driven with metrics

### Zone 500 (SHIELD)
- Colors: Red (#CC0000), Yellow (#FFFF00)
- Style: Alert, security, protective
- Icons: 🚨⚠️🔒
- Military-style brevity

### Zone 666 (GLITCH)
- Colors: Dark Red (#660000), Red (#FF0000)
- Style: Corrupted, horror, glitching
- Effects: Apply to container, not content
- Text: Distorted, RGB split

### Zone 800 (HOME)
- Colors: Cyan (#00CCCC), White (#FFFFFF)
- Style: Smart home, retro-futuristic
- Icons: 🏠💡🌡️

### Zone 900 (THEMES)
- Colors: Grey (#666666), Cyan (#00FFFF)
- Style: System terminal, command-line
- Format: Technical, terse

## CSS Classes to Use

```css
/* Inline styles preferred for strict control */
style={{
  border: '2px solid #COLOR',
  padding: '0.5rem',
  backgroundColor: '#BG_COLOR',
  color: '#TEXT_COLOR',
  fontSize: 'clamp(14px, 1.8vmin, 20px)',
  lineHeight: '1.3'
}}
```

## Common Patterns

### Loading State
```tsx
{loading && (
  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
    <div className={blink ? '' : 'opacity-0'}>
      ⚡ LOADING...
    </div>
  </div>
)}
```

### Error State
```tsx
{error && (
  <div style={{ 
    border: '2px solid #FF0000', 
    padding: '1rem',
    backgroundColor: '#330000'
  }}>
    <div style={{ color: '#FF0000' }}>⚠ {error}</div>
    <button onClick={retry}>RETRY</button>
  </div>
)}
```

### Data Display
```tsx
<div style={{ 
  border: '2px solid #ZONE_COLOR',
  padding: '0.5rem',
  marginBottom: '0.5rem'
}}>
  <div style={{ color: '#FFFF00' }}>LABEL:</div>
  <div style={{ color: '#FFFFFF' }}>VALUE</div>
</div>
```

## Priority Order

1. High Traffic Pages (101, 201, 301, 401, 501)
2. Feature Pages (802, 803, 666)
3. Utility Pages (103, 202, 502, 503)
4. Theme Pages (905, 906, 907)

## Testing Checklist Per Page

- [ ] Header shows correct zone color
- [ ] Title uses DoubleHeight
- [ ] Fastext footer shows correct links
- [ ] No scrolling (content fits in grid)
- [ ] VT323 font applied
- [ ] Zone-specific colors used
- [ ] Inline styles (no Tailwind classes)
- [ ] Responsive (clamp() for font sizes)
- [ ] Keyboard navigation works
- [ ] Loading states work
- [ ] Error states work
- [ ] Data displays correctly
