# Zone 100 Testing Guide

## Quick Test Checklist

### ✅ Page 101 - Global Wire

**Test Steps:**
1. Navigate to page 101 (type `101` and press Enter)
2. Observe "CONNECTING..." blinking message
3. Wait 1-2 seconds for real HackerNews data to load
4. Verify you see:
   - Story titles
   - Upvote scores (↑ number)
   - Author names
   - Comment counts
   - Time posted (e.g., "2h ago")
   - Source domains (🔗 hostname)

**Expected Result:**
- 8 real stories from HackerNews
- Blue border around each story
- Yellow story numbers [1] through [8]
- Green metadata (score, time)
- REFRESH button at bottom

**Test Refresh:**
1. Click REFRESH button
2. Should see "CONNECTING..." again
3. Stories reload (may be same or different)

---

### ✅ Page 103 - Lie Detector

**Test 1: Biased Text**

Paste this text:
```
BREAKING NEWS: This SHOCKING discovery will CHANGE 
EVERYTHING! Scientists are TERRIFIED! You MUST share 
this IMMEDIATELY before it's TOO LATE! Everyone needs 
to know about this UNBELIEVABLE truth!
```

**Expected Result:**
- Manipulation Score: 70-90%
- Verdict: "HIGHLY BIASED" (red)
- Detected Issues:
  - Excessive emotional language
  - Urgency manipulation tactics
  - Absolute statements
  - No sources cited
  - Excessive capitalization

---

**Test 2: Clean Text**

Paste this text:
```
According to a study published in the Journal of 
Applied Psychology, researchers at Stanford University 
found that regular exercise may improve cognitive 
function. The study involved 300 participants over 
12 months and showed a 15% improvement in memory tests.
```

**Expected Result:**
- Manipulation Score: 10-30%
- Verdict: "CLEAN" (green)
- Detected Issues: "No major issues detected"
- Higher factual claims score (60-90%)

---

**Test 3: Suspicious Text**

Paste this text:
```
New research suggests that drinking coffee might help 
you live longer. Many experts believe this could be a 
game-changer. The findings are quite surprising and 
everyone should consider this information.
```

**Expected Result:**
- Manipulation Score: 40-60%
- Verdict: "SUSPICIOUS" (yellow)
- Detected Issues:
  - Some emotional language
  - Absolute statements
  - No specific sources cited

---

## Visual Verification

### Loading States
- [ ] Blinking text appears during loading
- [ ] Text opacity alternates (visible/invisible)
- [ ] Loading message is clear and centered

### Color Coding
- [ ] Blue headers for Zone 100
- [ ] Green for positive indicators
- [ ] Yellow for warnings
- [ ] Red for high-risk items

### Responsiveness
- [ ] Text areas are editable
- [ ] Buttons respond to clicks
- [ ] Disabled states work correctly
- [ ] Scroll works for long content

---

## API Testing

### HackerNews API
Test the service directly in browser console:

```javascript
// Open browser console (F12) on page 101
fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(r => r.json())
  .then(ids => console.log('Top story IDs:', ids.slice(0, 5)))
```

Expected: Array of story IDs like `[38544729, 38543891, ...]`

---

### AI Analysis Service
Test in browser console on page 103:

```javascript
// This will use heuristic analysis
const testText = "SHOCKING news that will CHANGE everything!"
// The analysis happens when you click the button
```

---

## Performance Benchmarks

| Action | Expected Time | Acceptable Range |
|--------|--------------|------------------|
| Load Global Wire | 1-2 sec | 0.5-3 sec |
| Analyze Text (Heuristic) | 1.5 sec | 1-2 sec |
| Analyze Text (LLM) | 2-5 sec | 2-10 sec |
| Page Navigation | Instant | <100ms |

---

## Error Scenarios

### Test Network Error
1. Disconnect internet
2. Navigate to page 101
3. Should see "SIGNAL LOST" error
4. Reconnect internet
5. Click RETRY button
6. Should load successfully

### Test Empty Input
1. Navigate to page 103
2. Leave text area empty
3. Click "ANALYZE TEXT"
4. Button should be disabled (gray)

### Test Very Long Text
1. Paste 1000+ words into Lie Detector
2. Click analyze
3. Should still work (may take longer)

---

## Browser Compatibility

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

All should work identically.

---

## Mobile Testing (Optional)

If testing on mobile:
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Textarea is editable
- [ ] No horizontal scroll
- [ ] Loading states visible

---

## Success Criteria

✅ **PASS** if:
- Global Wire loads real HackerNews data
- Lie Detector analyzes text with results
- Loading states show blinking animation
- Error handling works
- UI is responsive and clear

❌ **FAIL** if:
- Mock/fake data appears
- Analysis doesn't run
- No loading indicators
- Crashes or errors in console
- UI is broken or unreadable

---

## Debugging Tips

**Console Errors:**
```bash
# Check browser console (F12)
# Look for:
- Network errors (red)
- CORS issues
- API failures
```

**Network Tab:**
```bash
# Open Network tab in DevTools
# Filter by "Fetch/XHR"
# Should see:
- hacker-news.firebaseio.com requests
- Status 200 (success)
```

**React DevTools:**
```bash
# Install React DevTools extension
# Check component state:
- loading: true/false
- news: array of stories
- analysis: object with results
```
