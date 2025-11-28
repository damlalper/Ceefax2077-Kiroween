# 🎨 PIXELGEN - Test Guide

## Quick Test (3 minutes)

### 1. Start Dev Server
```bash
cd ceefax-2077
npm run dev
```

### 2. Navigate to PixelGen
1. Type `803` and press ENTER
2. ✅ See PixelGen page with prompt input

### 3. Try a Suggestion
1. Click "Ghost in the machine" button
2. ✅ Prompt fills input field
3. Click GENERATE button
4. ✅ See "GENERATING AI IMAGE..." status

### 4. Watch the Magic
1. Wait 1-3 seconds for AI image
2. ✅ See "DOWNLOADING: Line X/24" status
3. ✅ Watch line-by-line rendering animation
4. ✅ See complete ASCII art in ~2.4 seconds

### 5. Examine the Result
1. ✅ See colored block characters (█▓▒░)
2. ✅ See 8-color teletext palette
3. ✅ See stats: 40x24, 960 chars, 8 colors
4. ✅ See color legend at bottom

### 6. Try Another
1. Click NEW IMAGE button
2. ✅ Returns to input screen
3. Type custom prompt: "Neon robot"
4. Press ENTER (instead of clicking)
5. ✅ Generates new image

## Advanced Tests

### Test Different Prompts

**Simple Objects:**
- "Red apple"
- "Blue car"
- "Yellow sun"
- ✅ Should show clear colors

**Complex Scenes:**
- "Cyberpunk city at night"
- "Synthwave sunset"
- "Matrix code rain"
- ✅ Should show varied colors and brightness

**Halloween Theme:**
- "Halloween pumpkin"
- "Digital skull"
- "Ghost in the machine"
- ✅ Should match Kiroween theme

**Retro Tech:**
- "1980s computer"
- "Retro terminal"
- "VHS aesthetic"
- ✅ Should be meta (retro about retro)

### Test Animation

**Line-by-Line Rendering:**
1. Generate any image
2. ✅ Watch lines appear one by one
3. ✅ Each line takes ~100ms
4. ✅ Total animation ~2.4 seconds
5. ✅ Smooth opacity transition

**Progress Indicator:**
1. During generation
2. ✅ See "Line 1/24", "Line 2/24", etc.
3. ✅ Updates every 100ms
4. ✅ Reaches "Line 24/24"
5. ✅ Changes to "COMPLETE"

### Test Color Mapping

**Primary Colors:**
- Generate "Red rose"
- ✅ Should show RED (#FF0000)
- Generate "Green forest"
- ✅ Should show GREEN (#00FF00)
- Generate "Blue ocean"
- ✅ Should show BLUE (#0000FF)

**Secondary Colors:**
- Generate "Yellow banana"
- ✅ Should show YELLOW (#FFFF00)
- Generate "Purple galaxy"
- ✅ Should show MAGENTA (#FF00FF)
- Generate "Cyan water"
- ✅ Should show CYAN (#00FFFF)

**Grayscale:**
- Generate "Black cat"
- ✅ Should show BLACK and WHITE
- Generate "White ghost"
- ✅ Should show WHITE and light colors

### Test Brightness Levels

**Bright Image:**
- Generate "Bright sun"
- ✅ Should use mostly █ (full blocks)
- ✅ Should use WHITE and YELLOW

**Dark Image:**
- Generate "Dark cave"
- ✅ Should use mostly ░ (light blocks) and spaces
- ✅ Should use BLACK and dark colors

**Mixed Brightness:**
- Generate "Sunset"
- ✅ Should use all block types: █▓▒░
- ✅ Should show gradient effect

### Test Error Handling

**Empty Prompt:**
1. Leave input empty
2. Click GENERATE
3. ✅ See error: "Please enter a prompt"
4. ✅ No API call made

**Network Error (Simulated):**
1. Disconnect internet
2. Try to generate
3. ✅ See error: "Failed to generate art"
4. ✅ Can try again after reconnecting

**Long Prompt:**
1. Type very long prompt (200+ chars)
2. ✅ Should still work
3. ✅ URL encoding handles it

## Visual Quality Checks

### Grid Alignment
```
✅ All lines same width (40 chars)
✅ All lines aligned vertically
✅ No wrapping or overflow
✅ Monospace font rendering
```

### Color Accuracy
```
✅ RED is pure red (#FF0000)
✅ GREEN is pure green (#00FF00)
✅ BLUE is pure blue (#0000FF)
✅ YELLOW is pure yellow (#FFFF00)
✅ MAGENTA is pure magenta (#FF00FF)
✅ CYAN is pure cyan (#00FFFF)
✅ WHITE is pure white (#FFFFFF)
✅ BLACK is pure black (#000000)
```

### Character Rendering
```
✅ █ (full block) is solid
✅ ▓ (dark shade) is 75% filled
✅ ▒ (medium shade) is 50% filled
✅ ░ (light shade) is 25% filled
✅ Space is empty
```

### Animation Smoothness
```
✅ No flickering
✅ No jumping
✅ Consistent timing
✅ Smooth opacity fade
```

## Performance Tests

### Generation Speed
```
Prompt → Generate → Complete
Expected: 4-6 seconds total
  - API fetch: 1-3 seconds
  - Processing: <100ms
  - Animation: 2.4 seconds
```

### Memory Usage
```
1. Generate 5 images in a row
2. ✅ No memory leaks
3. ✅ No performance degradation
4. ✅ Smooth on each generation
```

### Browser Compatibility
```
✅ Chrome/Edge (Chromium)
✅ Firefox
✅ Safari
✅ Mobile browsers
```

## Expected Results

### Good Prompts (Clear Results)
```
"Red apple" → Mostly RED with some GREEN
"Blue sky" → Mostly BLUE and CYAN
"Yellow sun" → Mostly YELLOW and WHITE
"Green grass" → Mostly GREEN
"Purple galaxy" → MAGENTA, BLUE, BLACK
```

### Complex Prompts (Varied Results)
```
"Cyberpunk city" → Mix of CYAN, MAGENTA, BLUE
"Sunset" → YELLOW, RED, MAGENTA gradient
"Forest" → GREEN, BLACK, some YELLOW
"Ocean" → BLUE, CYAN, WHITE
"Fire" → RED, YELLOW, MAGENTA
```

### Abstract Prompts (Interesting Results)
```
"Glitch art" → Random color mix
"VHS aesthetic" → Muted colors, noise
"Matrix code" → GREEN on BLACK
"Neon lights" → Bright CYAN, MAGENTA
"Retro computer" → CYAN, BLACK, WHITE
```

## Troubleshooting

### Image Not Loading
**Symptom:** Stuck on "GENERATING AI IMAGE..."
**Solution:**
- Check internet connection
- Try different prompt
- Refresh page and retry

### Colors Look Wrong
**Symptom:** Colors don't match expected
**Solution:**
- This is normal! AI images vary
- Teletext palette is limited to 8 colors
- Nearest color algorithm may surprise you

### Animation Stuttering
**Symptom:** Line rendering not smooth
**Solution:**
- Close other browser tabs
- Check CPU usage
- Try in different browser

### Grid Misaligned
**Symptom:** Characters not lining up
**Solution:**
- Check browser zoom (should be 100%)
- Verify monospace font loaded
- Try different browser

## Demo Script for Judges

**Setup (30 seconds):**
```
1. Navigate to page 803
2. Show the interface
3. Explain the concept
```

**Demo 1 - Simple (1 minute):**
```
1. Click "Ghost in the machine"
2. Click GENERATE
3. "Watch it fetch from Pollinations.ai"
4. "See the line-by-line rendering"
5. "40x24 grid, 8 colors, just like 1980s"
```

**Demo 2 - Custom (1 minute):**
```
1. Click NEW IMAGE
2. Type "Cyberpunk city at night"
3. Press ENTER
4. "Real AI image converted to ASCII"
5. "This is DALL-E's grandfather"
```

**Demo 3 - Explain (1 minute):**
```
1. Point to color legend
2. "8-color teletext palette"
3. Point to block characters
4. "Brightness mapped to █▓▒░"
5. "Modern AI meets 1980s graphics"
```

**Total Demo Time:** 3-4 minutes

## Success Criteria

✅ Page 803 loads
✅ Prompt input works
✅ Suggestions clickable
✅ GENERATE button works
✅ ENTER key works
✅ Loading status shows
✅ API fetches image
✅ Line-by-line animation
✅ ASCII art displays
✅ Colors mapped correctly
✅ Brightness levels visible
✅ Legend shows all colors
✅ Stats display correctly
✅ NEW IMAGE resets
✅ Error handling works
✅ No console errors
✅ Build successful (380KB)

## Comparison: Before vs After

### Before (Boring)
```
"Generate ASCII art"
→ Static text output
→ No animation
→ Fake/pre-made art
→ No AI involved
```

### After (Exciting!)
```
"Generate ASCII art"
→ Real AI image generation
→ Line-by-line animation
→ Real-time conversion
→ 1980s modem simulation
→ 8-color teletext palette
→ Brightness mapping
→ "DALL-E's grandfather!"
```

---

**Status:** Feature 10 Complete! 🎨✨
**Ready for:** Judge Demo & Production
