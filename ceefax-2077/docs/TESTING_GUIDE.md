# 🧪 Ceefax 2077 - Testing Guide

## Quick Start

```bash
cd ceefax-2077
npm run dev
```

Open `http://localhost:5173` in your browser.

## Navigation Testing

### Basic Navigation
1. **Home Page (100)**
   - Should load automatically
   - Shows ASCII logo and menu
   - Header shows `P100`

2. **News Page (101)**
   - Type: `1` `0` `1`
   - Watch header change: `P1__` → `P10_` → `P101`
   - Page switches after 300ms
   - Shows dystopian news headlines

3. **Return Home**
   - Type: `1` `0` `0`
   - Always returns to index from any page

4. **Glitch Mode (666)**
   - Type: `6` `6` `6`
   - Screen flickers red/black
   - Text glitches randomly
   - Threatening messages appear
   - Pulsing animations

5. **Signal Lost (404)**
   - Type any invalid page: `9` `9` `9`
   - Shows static noise
   - Error message
   - Auto-returns to home after 3 seconds

### Input Buffer Testing
- Type `1` → Header shows `P1__`
- Press `Backspace` → Clears buffer, back to `P100`
- Type `1` `2` → Header shows `P12_`
- Press `Escape` → Clears buffer
- Type incomplete number and wait → Nothing happens (needs 3 digits)

### Edge Cases
- Type `0` `0` `0` → Signal Lost (invalid page)
- Type `2` `0` `0` → Signal Lost (not implemented yet)
- Type `3` `0` `0` → Signal Lost (not implemented yet)
- Rapid typing → Should buffer correctly

## Visual Testing

### Header (Row 0)
- ✅ Left: Page number with input feedback
- ✅ Center: "CEEFAX 2077" in cyan
- ✅ Right: Live clock updating every second

### CRT Effects
- ✅ Scanlines visible (horizontal lines)
- ✅ Cyan glow around edges
- ✅ 4:3 aspect ratio maintained
- ✅ Centered on screen
- ✅ Scales with window resize

### Colors
- ✅ Black background (#000000)
- ✅ Cyan text for headers
- ✅ Yellow for highlights
- ✅ Red for warnings/glitch mode
- ✅ White for body text

### Typography
- ✅ VT323 font loaded
- ✅ All text UPPERCASE
- ✅ Monospaced appearance
- ✅ Proper letter spacing

## Spec Compliance Testing

Check against `.kiro/specs/routing.yaml`:

### Routes
- ✅ 100 → HOME (IndexPage)
- ✅ 101 → NEWS_HEADLINES (NewsPage)
- ✅ 200 → FINANCE (SignalLost - placeholder)
- ✅ 300 → SPORT (SignalLost - placeholder)
- ✅ 666 → GLITCH_MODE (GlitchPage)
- ✅ Other → 404_SIGNAL_LOST

### Navigation Rules
- ✅ Input method: numeric keypad
- ✅ Buffer length: 3 digits
- ✅ Auto-navigate: true
- ✅ Clear buffer on navigate: true

### Special Behaviors
- ✅ Invalid page shows 404
- ✅ Auto-return after 3000ms
- ✅ Emergency exit (100) works from anywhere

## Performance Testing

### Animations
- Glitch page should flicker smoothly (100ms interval)
- Text glitch should update (200ms interval)
- Clock should update every second
- No lag or stuttering

### Memory
- No memory leaks from intervals
- Cleanup on component unmount
- Smooth page transitions

## Browser Testing

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if available)

## Responsive Testing

Resize browser window:
- Grid should scale proportionally
- 4:3 aspect ratio maintained
- Text remains readable
- No overflow or scrolling

## Known Limitations

- Pages 200 and 300 not implemented (show Signal Lost)
- No actual news API integration yet (Phase 4)
- No MCP integration yet (Phase 4)
- No hooks yet (Phase 4)
- Haunted hours (00:00-03:00) not implemented yet

## Demo Video Checklist

For the hackathon submission video:
1. ✅ Show home page loading
2. ✅ Demonstrate typing page numbers
3. ✅ Show input buffer in header
4. ✅ Navigate to news (101)
5. ✅ Show glitch mode (666)
6. ✅ Demonstrate 404 behavior
7. ✅ Show CRT effects (zoom in on scanlines)
8. ✅ Highlight live clock
9. ✅ Show `.kiro/specs/routing.yaml` file
10. ✅ Show `.kiro/steering/editor_persona.md` file

## Success Criteria

All features working:
- ✅ 40×24 grid system
- ✅ 4:3 aspect ratio
- ✅ Keyboard navigation
- ✅ Page routing
- ✅ Input buffer feedback
- ✅ CRT effects
- ✅ Teletext colors
- ✅ Live clock
- ✅ Spec-driven routing
- ✅ Context state management

Ready for Phase 4! 🚀
