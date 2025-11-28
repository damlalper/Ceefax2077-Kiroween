# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### PostCSS / Tailwind CSS Error

**Error Message:**
```
[postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin.
The PostCSS plugin has moved to a separate package...
```

**Solution:**
This occurs with Tailwind CSS v4. The fix has been applied:

1. Install the new PostCSS plugin:
```bash
npm install -D @tailwindcss/postcss
```

2. Update `postcss.config.js`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // Changed from 'tailwindcss'
    autoprefixer: {},
  },
}
```

**Status:** ✅ FIXED

---

### Port Already in Use

**Error Message:**
```
Port 5173 is in use, trying another one...
```

**Solution:**
Vite will automatically try the next available port (5174, 5175, etc.)

If you need to use a specific port:
```bash
npm run dev -- --port 3000
```

Or kill the process using port 5173:
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

---

### TypeScript Errors

**Issue:** Type errors in components

**Solution:**
Run diagnostics:
```bash
npm run build
```

All TypeScript errors should be resolved. If you see any:
1. Check import statements
2. Verify type definitions
3. Run `npm install` to ensure all dependencies are installed

---

### Missing Dependencies

**Error Message:**
```
Cannot find module 'X'
```

**Solution:**
```bash
cd ceefax-2077
npm install
```

---

### CSS Not Loading

**Issue:** Styles not appearing

**Solution:**
1. Check that `src/index.css` is imported in `src/main.tsx`
2. Verify Tailwind directives are present:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
3. Clear Vite cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

---

### Glitch Effects Not Working

**Issue:** Page 666 effects not displaying

**Solution:**
1. Check browser console for errors
2. Verify CSS animations are supported (modern browser required)
3. Check that `useGlitch` hook is imported correctly
4. Ensure you're on page 666 (type `666`)

---

### Navigation Not Working

**Issue:** Can't navigate between pages

**Solution:**
1. Make sure you're typing 3 digits (e.g., `1`, `0`, `1`)
2. Check that `KeyboardListener` component is mounted
3. Verify `TeletextContext` is wrapping the app
4. Check browser console for errors

---

### Haunted Hours Not Triggering

**Issue:** Page 666 doesn't auto-activate at midnight

**Solution:**
1. Check system time is between 00:00-03:00
2. Verify you're not already on page 666 or 100
3. For testing, reduce the timer in `App.tsx`:
```typescript
// Change from 120000 (2 min) to 10000 (10 sec)
const inactivityTimer = setTimeout(() => {
  if (currentPage !== 666 && currentPage !== 100) {
    goToPage(666)
  }
}, 10000) // 10 seconds for testing
```

---

### Build Errors

**Issue:** `npm run build` fails

**Solution:**
1. Check all TypeScript errors are resolved
2. Verify all imports are correct
3. Run `npm install` to ensure dependencies
4. Check `vite.config.ts` is correct

---

### Performance Issues

**Issue:** Animations are laggy

**Solution:**
1. Close other browser tabs
2. Check CPU usage
3. Disable browser extensions
4. Use Chrome/Edge for best performance
5. Reduce animation intensity in `useGlitch` hook:
```typescript
const { glitchedText } = useGlitch(message, { 
  intensity: 0.3,  // Reduce from 0.5
  flickerSpeed: 150,  // Increase from 80
  corruptionSpeed: 300  // Increase from 150
})
```

---

### Font Not Loading

**Issue:** VT323 font not displaying

**Solution:**
1. Check internet connection (font loads from Google Fonts)
2. Verify `@import` in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
```
3. Check browser console for font loading errors
4. Try clearing browser cache

---

## Development Tips

### Hot Module Replacement (HMR)
Vite supports HMR. Changes to components should reflect immediately without full page reload.

If HMR stops working:
1. Save the file again
2. Refresh the browser
3. Restart the dev server

### Browser DevTools
- Press `F12` to open DevTools
- Check Console for errors
- Use Elements tab to inspect CSS
- Use Network tab to check resource loading

### Testing Different Pages
Quick navigation for testing:
- `100` - Home
- `101` - News
- `102` - News Detail
- `666` - Glitch Mode
- `999` - 404 Error

### Debugging Glitch Effects
To see glitch effects more clearly:
1. Navigate to page 666
2. Open DevTools
3. Watch the Console for any errors
4. Check Elements tab to see CSS animations
5. Use Performance tab to check frame rate

---

## Getting Help

If you encounter issues not covered here:

1. **Check the documentation:**
   - README.md
   - TESTING_GUIDE.md
   - PHASE*.md files

2. **Check the code:**
   - Look at similar components
   - Check TypeScript types
   - Verify imports

3. **Browser Console:**
   - Always check for errors
   - Look for warnings
   - Check network requests

4. **Clean Install:**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   npm run dev
   ```

---

## System Requirements

### Minimum Requirements
- Node.js 18+
- npm 9+
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)
- 4GB RAM
- Internet connection (for fonts and dependencies)

### Recommended
- Node.js 20+
- npm 10+
- Chrome/Edge (best performance)
- 8GB RAM
- SSD storage

---

## Known Limitations

1. **Page 666 Escape Delay**
   - Intentional 10-second delay
   - Part of the horror experience
   - Can be reduced in code if needed

2. **Inactivity Timer**
   - Set to 2 minutes for demo
   - Can be increased/disabled in `App.tsx`

3. **Haunted Hours**
   - Only triggers between 00:00-03:00
   - Requires system time to be in that range
   - Can be tested by changing system clock

4. **Browser Compatibility**
   - CSS animations require modern browser
   - Some effects may not work in older browsers
   - Best experience in Chrome/Edge

---

## Success Checklist

Before demo/submission, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts successfully
- [ ] Application loads in browser
- [ ] Can navigate to page 100
- [ ] Can navigate to page 101
- [ ] Can navigate to page 666
- [ ] Glitch effects work on page 666
- [ ] Can escape from page 666 after 10 seconds
- [ ] Clock updates every second
- [ ] Input buffer shows in header (P1__, P10_, P101)
- [ ] CRT effects visible (scanlines, glow)
- [ ] All colors display correctly
- [ ] Font loads (VT323)
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Build succeeds (`npm run build`)

---

**Status:** All known issues resolved ✅

**Last Updated:** Phase 5 Complete

**The system is operational. The Truth Terminal awaits.** 📺
