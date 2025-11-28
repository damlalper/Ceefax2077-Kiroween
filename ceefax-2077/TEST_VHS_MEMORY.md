# 📼 VHS MEMORY - Test Guide

## Quick Test (2 minutes)

### 1. Start Dev Server
```bash
cd ceefax-2077
npm run dev
```

### 2. Record Your First Tape
1. Navigate to any page (e.g., page 100)
2. Press `R` key on keyboard
3. ✅ See `[REC ●]` indicator blink in header (red, top-left)
4. Wait 2 seconds for indicator to disappear

### 3. View Tape Library
1. Navigate to page **906**
2. ✅ See your recorded tape in the library
3. Check tape info:
   - Tape ID
   - Page number
   - Recording date
   - Play count: 0
   - Wear: 0%

### 4. Play Your Tape
1. Click **▶ PLAY** button on your tape
2. ✅ See VHS playback overlay with:
   - Chromatic aberration (RGB color shift)
   - Scan lines
   - Static noise
   - Tracking lines
3. ✅ See playback UI in top-left corner
4. Press `ESC` or click **⏹ STOP** to exit

### 5. Test Degradation
1. Go back to page 906
2. Play the same tape again (5 times)
3. ✅ Notice wear increases each time
4. ✅ Visual effects get stronger
5. Play it 10 more times
6. ✅ See heavy chromatic aberration
7. ✅ See ⚠️ warning when wear > 70%

## Advanced Tests

### Test Multiple Tapes
1. Record tapes from different pages:
   - Page 100 (press R)
   - Page 200 (press R)
   - Page 300 (press R)
   - Page 666 (press R)
2. Go to page 906
3. ✅ See all 4 tapes in library
4. Play each one
5. ✅ Each shows different content

### Test Library Limit
1. Record 12 tapes (max capacity)
2. ✅ See "12/12 tapes" in header
3. Record a 13th tape
4. ✅ Oldest tape auto-deleted
5. ✅ Still shows 12/12

### Test Erase Function
1. Go to page 906
2. Click 🗑️ button on a tape
3. Confirm deletion
4. ✅ Tape removed from library

### Test Keyboard Shortcuts
1. Navigate to any page
2. Press `R` → ✅ Records tape
3. Go to page 906, play a tape
4. Press `ESC` → ✅ Stops playback
5. Try pressing `R` while in input field → ✅ Should not record

## Visual Effects Checklist

### Chromatic Aberration
- ✅ Red channel shifted left
- ✅ Green channel centered
- ✅ Blue channel shifted right
- ✅ Shift increases with wear
- ✅ Creates rainbow-like edges

### Tracking Noise
- ✅ Horizontal white lines
- ✅ Lines move randomly
- ✅ More lines with higher wear
- ✅ Authentic VHS glitch

### Scan Lines
- ✅ Horizontal lines across screen
- ✅ 2px spacing
- ✅ Semi-transparent
- ✅ CRT monitor effect

### Static Noise
- ✅ Grainy overlay
- ✅ Animated movement
- ✅ Opacity increases with wear
- ✅ Fractal noise pattern

## Expected Behavior

### Recording
- REC indicator appears immediately
- Blinks for 2 seconds
- Tape saved to localStorage
- No page refresh needed

### Playback
- Full-screen overlay
- Original content visible through effects
- Smooth animations
- Responsive stop button

### Degradation
| Plays | Wear % | Visual Effect |
|-------|--------|---------------|
| 0-5   | 0-25%  | Minimal distortion |
| 6-15  | 26-50% | Noticeable RGB shift |
| 16-25 | 51-75% | Heavy aberration + tracking |
| 26+   | 76-100%| Extreme degradation ⚠️ |

## Troubleshooting

### REC indicator not showing
- Check if you're on a valid page
- Make sure you're not in an input field
- Check browser console for errors

### Tape not saving
- Check localStorage is enabled
- Check browser console
- Try clearing localStorage and retry

### Playback not working
- Check if tape exists in library
- Refresh page and try again
- Check browser console for errors

### Effects not visible
- Check if CSS loaded properly
- Try different browser
- Check for CSS conflicts

## Demo Script for Judges

**"Let me show you VHS Memory..."**

1. "This isn't just a bookmark system"
2. Press R → "We're recording to tape"
3. Go to 906 → "Here's our tape library"
4. Play tape → "Watch the analog degradation"
5. "Notice the chromatic aberration?"
6. "The tracking noise?"
7. "The scan lines?"
8. Play again → "Each play degrades the tape"
9. "Just like real VHS cassettes"
10. "This is what 'vibe' means"

## Success Criteria

✅ REC indicator works
✅ Tapes save to localStorage
✅ Library displays all tapes
✅ Playback shows visual effects
✅ Degradation increases with plays
✅ Keyboard shortcuts work
✅ Erase function works
✅ 12 tape limit enforced
✅ Build successful (371KB)
✅ No console errors

---

**Status:** Feature 9 Complete! 📼✨
