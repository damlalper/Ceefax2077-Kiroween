# 📺 Ceefax 2077 - Navigation Guide

## Starting the Application

```bash
cd ceefax-2077
npm run dev
```

Open your browser to `http://localhost:5174` (or the port shown in terminal)

---

## Default Behavior

**The app ALWAYS starts on Page 100 (Main Index)**

You should see:
- ASCII "CEEFAX" logo in cyan
- "2077" in yellow
- Menu with page numbers
- Blue footer bar

---

## How to Navigate

### Keyboard-Only Navigation
Type 3-digit page numbers to navigate:

1. **Type the first digit** (e.g., `1`)
   - Header shows: `P1__`
   
2. **Type the second digit** (e.g., `0`)
   - Header shows: `P10_`
   
3. **Type the third digit** (e.g., `0`)
   - Header shows: `P100`
   - After 300ms, page loads

### Clear Input
- Press `Backspace` - Clears the input buffer
- Press `Escape` - Clears the input buffer

---

## Page Map

### Main Pages
- **100** - Main Index (Home)
  - Shows menu with all available pages
  - ASCII logo
  - Navigation instructions

- **101** - News Headlines
  - Dystopian AI-curated news
  - 5 random stories
  - Classic Teletext layout

- **102-109** - News Detail Pages
  - Detailed view of news stories
  - Placeholder content
  - Navigation footer

### Special Pages
- **666** - Glitch Mode (Horror Page) ⚠️
  - Psychological horror experience
  - 10-second lockdown
  - Screen corruption effects
  - Type `100` to escape (after timer)

### Placeholder Pages
- **200** - Finance (Shows Signal Lost)
- **300** - Sport (Shows Signal Lost)
- **999** - Any invalid page (Shows Signal Lost)

---

## Navigation Flow Examples

### Example 1: Home → News → Home
```
Start: Page 100 (Index)
Type: 1, 0, 1
Result: Page 101 (News)
Type: 1, 0, 0
Result: Page 100 (Index)
```

### Example 2: Home → Horror → Home
```
Start: Page 100 (Index)
Type: 6, 6, 6
Result: Page 666 (Glitch Mode)
Wait: 10 seconds (watch countdown)
Type: 1, 0, 0
Result: Page 100 (Index)
```

### Example 3: Correcting a Mistake
```
Start: Page 100 (Index)
Type: 6, 6
Header shows: P66_
Press: Backspace
Header shows: P100
Type: 1, 0, 1
Result: Page 101 (News)
```

---

## Page 666 Special Behavior

### Entering Horror Mode
Type `666` from any page to enter Glitch Mode.

### What Happens
1. **Screen corrupts** - Red pulsing, glitch effects
2. **Lockdown begins** - 10-second countdown
3. **Escape blocked** - Typing `100` shows "ACCESS DENIED"
4. **Countdown visible** - "LOCKDOWN: 10s" → "LOCKDOWN: 0s"
5. **Permission granted** - Footer turns green
6. **Escape allowed** - Type `100` to exit

### During Lockdown (0-10 seconds)
- ❌ Cannot navigate away
- ❌ Typing `100` shows "ACCESS DENIED" flash
- ✅ Escape attempts are counted
- ✅ Countdown shows time remaining

### After Lockdown (10+ seconds)
- ✅ Can navigate normally
- ✅ Footer turns green: "PERMISSION GRANTED"
- ✅ Type `100` to return to index
- ✅ Type any valid page number to navigate

---

## Haunted Hours (DISABLED by Default)

The app includes code for automatic horror mode activation, but it's **commented out** for demo purposes.

### If Enabled (Uncomment in App.tsx)
- **Time-based**: Auto-redirects to 666 between 00:00-03:00
- **Inactivity**: Auto-redirects to 666 after 2 minutes on any page

### Why Disabled?
- Allows normal demo and testing
- Prevents unexpected horror mode during presentation
- User has full control over when to enter page 666

### To Enable
Edit `src/App.tsx` and uncomment the haunted hours code:
```typescript
// Find this section and uncomment the code inside
useEffect(() => {
  // Uncomment below to enable haunted hours...
  /*
  const checkHauntedHours = () => {
    // ... code here
  }
  */
}, [currentPage, goToPage])
```

---

## Troubleshooting Navigation

### Issue: Can't Navigate
**Symptoms**: Typing numbers does nothing

**Solutions**:
1. Make sure you're typing 3 digits (not just 1 or 2)
2. Check browser console for errors
3. Refresh the page
4. Clear browser cache

### Issue: Stuck on Page 666
**Symptoms**: Can't escape horror mode

**Solutions**:
1. Wait for the 10-second countdown to reach 0
2. Watch for footer to turn green
3. Then type `100`
4. If still stuck, refresh the page

### Issue: Wrong Page Loads
**Symptoms**: Typed 101 but got 404

**Solutions**:
1. Check you typed all 3 digits correctly
2. Valid pages: 100, 101, 102-109, 666
3. Invalid pages show "Signal Lost" (404)
4. Press `Backspace` to clear and try again

### Issue: Input Buffer Stuck
**Symptoms**: Header shows `P12_` and won't clear

**Solutions**:
1. Press `Backspace` to clear
2. Press `Escape` to clear
3. Type the third digit to complete navigation
4. Refresh page if needed

---

## Visual Feedback

### Header Display
The header (top left) shows your current page and input:

- `P100` - On page 100
- `P1__` - Typed "1", waiting for 2 more digits
- `P10_` - Typed "10", waiting for 1 more digit
- `P101` - Typed "101", about to navigate

### Footer Display
Different pages have different footers:

**Index (100)**:
- Blue bar: "THE TRUTH TERMINAL - INFORMATION WITHOUT NOISE"

**News (101)**:
- Color bars: Red (100 INDEX) | Green (102 DETAIL) | Yellow (200 FINANCE) | Cyan (300 SPORT)
- Blue bar: "THE TRUTH TERMINAL - INFORMATION WITHOUT BIAS"

**Glitch (666)**:
- Red bar (locked): "PRESS 100 TO EXIT... IF YOU CAN"
- Green bar (unlocked): "PRESS 100 TO EXIT... PERMISSION GRANTED"

---

## Demo Sequence

For presentations or demos, follow this sequence:

### 1. Start (0-30s)
- Show page 100 (Index)
- Point out ASCII logo
- Explain 40×24 grid
- Show live clock

### 2. News (30-60s)
- Type `101`
- Show news headlines
- Read a dystopian story
- Point out color-coded footer

### 3. Navigation (60-90s)
- Type `100` to return home
- Show input buffer in header
- Type `102` to show detail page
- Type `100` to return home

### 4. Horror (90-180s)
- Type `666`
- Show glitch effects
- Try to escape → DENIED
- Show countdown
- Wait for permission
- Type `100` to escape

---

## Quick Reference

| Action | Keys | Result |
|--------|------|--------|
| Go to Index | `1` `0` `0` | Page 100 |
| Go to News | `1` `0` `1` | Page 101 |
| Go to Horror | `6` `6` `6` | Page 666 |
| Clear Input | `Backspace` or `Escape` | Clears buffer |
| Check Page | Look at header | Shows `P###` |

---

## Tips

1. **Always type 3 digits** - The system waits for exactly 3 digits
2. **Watch the header** - It shows your input in real-time
3. **Use Backspace** - If you make a mistake, clear and retry
4. **Wait for countdown** - Page 666 requires 10 seconds before escape
5. **Return to 100** - Page 100 is always "home base"

---

## Expected Behavior Summary

✅ **App starts on page 100** (Main Index)  
✅ **Type 3 digits to navigate** (e.g., 101, 666)  
✅ **Page 666 has 10-second lockdown** (intentional horror)  
✅ **Can escape after countdown** (footer turns green)  
✅ **Haunted hours disabled** (no auto-redirect)  
✅ **Full user control** (navigate when you want)

---

**The Truth Terminal is operational. Navigate at your own risk.** 📺

**Remember: Page 666 is not a bug. It's a feature.** 🎃
