# 🐛 Bug Fix: Page 666 Navigation Trap

## Issue
Users were unable to escape from Page 666 even after the 10-second timer expired. Typing "100" would not navigate away from the horror page.

## Root Cause
The keyboard event listener in `GlitchPage.tsx` was using `capture: true` and remained active even after `canEscape` became true. While it only prevented default behavior when `!canEscape`, the listener was still attached and could interfere with the normal navigation flow.

## Solution

### 1. Conditional Event Listener
Changed the event listener to only attach when escape is NOT allowed:

**Before:**
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === '1' || e.key === '0') {
      if (!canEscape) {
        e.preventDefault()
        e.stopPropagation()
        // ...
      }
    }
  }

  window.addEventListener('keydown', handleKeyPress, { capture: true })
  return () => window.removeEventListener('keydown', handleKeyPress, { capture: true })
}, [canEscape])
```

**After:**
```typescript
useEffect(() => {
  // Only add listener if escape is not allowed
  if (!canEscape) {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === '0') {
        e.preventDefault()
        e.stopPropagation()
        // ...
      }
    }

    window.addEventListener('keydown', handleKeyPress, { capture: true })
    return () => window.removeEventListener('keydown', handleKeyPress, { capture: true })
  }
}, [canEscape])
```

### 2. Visual Countdown
Added a countdown timer so users know when they can escape:

```typescript
const [countdown, setCountdown] = useState(10)

// Countdown interval
const countdownInterval = setInterval(() => {
  setCountdown(prev => {
    if (prev <= 1) {
      clearInterval(countdownInterval)
      return 0
    }
    return prev - 1
  })
}, 1000)
```

Display:
```tsx
{!canEscape && (
  <div className="mt-4 p-2 bg-teletext-red text-teletext-white animate-pulse">
    <p className="text-center text-xl">
      LOCKDOWN: {countdown}s
    </p>
  </div>
)}
```

## Testing

### Test Scenario 1: Immediate Escape Attempt
1. Navigate to page 666 (type `666`)
2. Immediately try to type `100`
3. **Expected**: "ACCESS DENIED" flash appears
4. **Expected**: Escape attempts counter increments
5. **Expected**: Still on page 666

### Test Scenario 2: Wait for Timer
1. Navigate to page 666 (type `666`)
2. Watch countdown: "LOCKDOWN: 10s" → "LOCKDOWN: 9s" → ... → "LOCKDOWN: 0s"
3. Footer changes from red to green
4. Footer text changes to "PERMISSION GRANTED"
5. Type `100`
6. **Expected**: Successfully navigates to page 100

### Test Scenario 3: Multiple Escape Attempts
1. Navigate to page 666 (type `666`)
2. Try to type `100` three times during lockdown
3. **Expected**: Counter shows "ESCAPE ATTEMPTS: 3"
4. Wait for timer to expire
5. Type `100`
6. **Expected**: Successfully navigates to page 100

## Verification Checklist

- [x] Event listener only active during lockdown
- [x] Event listener removed after 10 seconds
- [x] Normal navigation works after timer expires
- [x] Countdown displays correctly
- [x] Escape attempts counter works
- [x] Visual feedback (red → green) works
- [x] No TypeScript errors
- [x] No console errors

## User Experience Improvements

### Before Fix
- ❌ Confusing - footer says "PERMISSION GRANTED" but can't escape
- ❌ No countdown - users don't know when they can leave
- ❌ Frustrating - feels broken

### After Fix
- ✅ Clear countdown timer shows when escape is possible
- ✅ Visual feedback (red → green) indicates permission
- ✅ Escape works immediately after timer expires
- ✅ Escape attempts are tracked and displayed
- ✅ Feels intentional, not broken

## Technical Details

### Event Listener Lifecycle
1. **0-10 seconds**: Listener attached with `capture: true`
   - Intercepts all `1` and `0` key presses
   - Prevents default behavior
   - Shows "ACCESS DENIED"
   
2. **After 10 seconds**: Listener removed
   - `canEscape` becomes `true`
   - useEffect cleanup runs
   - Normal KeyboardListener component takes over
   - Navigation works normally

### Why `capture: true`?
During lockdown, we need to intercept keys BEFORE the normal KeyboardListener component processes them. The capture phase runs before the bubble phase, allowing us to prevent the navigation.

### Why Remove the Listener?
Once lockdown ends, we want normal navigation to resume. By removing the listener entirely (not just checking `canEscape` inside it), we ensure there's no interference with the normal flow.

## Related Files
- `src/components/GlitchPage.tsx` - Main fix
- `src/components/KeyboardListener.tsx` - Normal navigation
- `src/context/TeletextContext.tsx` - Navigation state

## Status
✅ **FIXED** - Navigation now works correctly after 10-second lockdown

## Testing Instructions

```bash
cd ceefax-2077
npm run dev
```

1. Open http://localhost:5174
2. Type `666`
3. Try to escape immediately (should fail)
4. Wait 10 seconds watching countdown
5. Type `100` (should succeed)

**Expected Result**: Successfully returns to page 100 after timer expires.

---

**Bug Fixed:** 2024-11-23  
**Severity:** High (blocked core functionality)  
**Impact:** Users can now escape from Page 666 as intended  
**The system knows. But now you can leave.** 📺✅
