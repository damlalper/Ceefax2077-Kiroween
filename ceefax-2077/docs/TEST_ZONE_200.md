# Zone 200 Testing Guide

## Quick Test Checklist

### ✅ Page 201 - Stonks Terminal

**Test Steps:**
1. Navigate to page 201 (type `201` and press Enter)
2. Observe "CONNECTING..." blinking message
3. Wait 1-2 seconds for real CoinGecko data to load
4. Verify you see:
   - 4 cryptocurrencies (BTC, ETH, SOL, ADA)
   - Current prices in USD
   - 24h change percentage with ▲/▼ icons
   - Block charts (█▇▆▅▄▃▂▁)
   - 24h volume
   - Market sentiment bar

**Expected Result:**
- Real prices from CoinGecko API
- Yellow borders around each crypto card
- Green text for positive changes
- Red text for negative changes
- Block charts showing price trend
- REFRESH button at bottom

**Test Auto-Refresh:**
1. Wait 30 seconds
2. Prices should automatically update
3. Block charts regenerate
4. No page reload needed

**Test Crash Mode (if BTC < $90,000):**
1. If current BTC price is below $90,000:
   - Screen should flash red
   - Alert banner appears at top
   - BTC card highlighted in red
   - "HIGH RISK DETECTED" message
2. If BTC > $90,000:
   - Normal display
   - No crash mode

---

### ✅ Page 204 - Oracle of Doom

**Test Steps:**
1. Navigate to page 204
2. Observe "CONSULTING ORACLE..." blinking message
3. Wait for data to load
4. Verify you see:
   - Large clock emoji ⏰
   - Doomsday percentage (0-100%)
   - Risk level message
   - Progress bar (color-coded)
   - Current BTC/ETH prices
   - Risk factors list
   - MCP analysis section

**Expected Result:**
- Doomsday clock displays risk percentage
- Color changes based on risk:
  - Green: 0-30% (CALM)
  - Yellow: 30-50% (CAUTION)
  - Orange: 50-70% (WARNING)
  - Red: 70-100% (DANGER/APOCALYPSE)

**Test ASCII Skull (HIGH RISK):**
1. If BTC < $90,000:
   - ASCII skull appears at top
   - "THE ORACLE HAS SPOKEN" message
   - Skull animates (pulse effect)
   - Red border around skull box
2. If BTC > $90,000:
   - No skull displayed
   - Normal risk display

**Test MCP Analysis:**
1. Check "MCP ANALYSIS" section at bottom
2. Should show:
   - Risk level (LOW/MEDIUM/HIGH/CRITICAL)
   - Risk score (X/100)
   - Recommendation text
3. Verify recommendation matches risk level:
   - LOW: "Market conditions favorable"
   - MEDIUM: "Stay alert, review positions"
   - HIGH: "Monitor closely, prepare for volatility"
   - CRITICAL: "Extreme caution - reduce exposure"

---

## Visual Verification

### Block Charts
- [ ] Charts use block characters: █▇▆▅▄▃▂▁
- [ ] Charts are 12 characters wide
- [ ] Charts reflect 24h price movement
- [ ] Higher blocks = higher prices
- [ ] Charts update on refresh

### Crash Mode Effects
- [ ] Screen background flashes red
- [ ] Container shakes slightly
- [ ] Headers pulse
- [ ] Alert banners appear
- [ ] Text remains readable

### Color Coding
- [ ] Yellow headers for Zone 200
- [ ] Green for positive changes
- [ ] Red for negative changes
- [ ] Orange for warnings
- [ ] Color-coded risk levels

---

## MCP Agent Testing

### Test Risk Analysis Logic

**Scenario 1: Low Risk**
- BTC > $90,000
- Low volatility (< 5%)
- Expected: Risk score < 40, no crash mode

**Scenario 2: Medium Risk**
- BTC between $80,000-$90,000
- Moderate volatility
- Expected: Risk score 20-40, no crash mode

**Scenario 3: High Risk**
- BTC < $90,000
- Expected: Risk score 40-60, crash mode ACTIVE

**Scenario 4: Critical Risk**
- BTC < $80,000
- High volatility (> 5%)
- Expected: Risk score > 60, crash mode ACTIVE, skull visible

---

## Crash Mode Testing

### Visual Effects Checklist
When crash mode is active (BTC < $90,000):

- [ ] Body has `.crash-mode` class (check DevTools)
- [ ] Background flashes red (1s cycle)
- [ ] Screen shakes (subtle vibration)
- [ ] Headers pulse (opacity change)
- [ ] Alert banner visible
- [ ] Skull appears on Oracle page

### Test Crash Mode Activation
1. Open browser DevTools (F12)
2. Go to Elements tab
3. Find `<body>` element
4. Check if `class="crash-mode"` is present
5. If BTC < $90,000: class should be there
6. If BTC > $90,000: class should be absent

### Test Crash Mode Deactivation
1. If crash mode is active
2. Wait for price update (30s)
3. If BTC rises above $90,000
4. Crash mode should deactivate
5. Screen returns to normal
6. `.crash-mode` class removed

---

## API Testing

### CoinGecko API
Test the API directly in browser console:

```javascript
// Open console (F12) on page 201
fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true')
  .then(r => r.json())
  .then(data => console.log('CoinGecko data:', data))
```

Expected response:
```json
{
  "bitcoin": {
    "usd": 95234,
    "usd_24h_change": 2.34
  },
  "ethereum": {
    "usd": 3456,
    "usd_24h_change": -1.23
  }
}
```

---

## Performance Benchmarks

| Action | Expected Time | Acceptable Range |
|--------|--------------|------------------|
| Load Stonks | 1-2 sec | 0.5-3 sec |
| Load Oracle | 1-2 sec | 0.5-3 sec |
| MCP Analysis | <100ms | Instant |
| Crash Mode Toggle | Instant | <50ms |
| Auto-refresh | 30 sec | Background |

---

## Error Scenarios

### Test Network Error
1. Disconnect internet
2. Navigate to page 201
3. Should see "SIGNAL LOST" error
4. Reconnect internet
5. Click RETRY button
6. Should load successfully

### Test API Rate Limit
1. Refresh page 201 rapidly (10+ times)
2. May hit rate limit
3. Should show error message
4. Wait 1 minute
5. Try again - should work

### Test Invalid Data
1. If API returns unexpected data
2. Should handle gracefully
3. Show error or fallback
4. No crashes or blank screens

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
- [ ] Prices are readable
- [ ] Block charts display correctly
- [ ] Buttons are tappable
- [ ] Crash mode effects visible
- [ ] No horizontal scroll
- [ ] Auto-refresh works

---

## Advanced Testing

### Test Hook Behavior
Open React DevTools:
1. Find Stonks component
2. Check hooks state:
   - `prices`: array of crypto data
   - `loading`: boolean
   - `crashMode`: boolean
   - `riskAnalysis`: object

### Test CSS Injection
1. Open DevTools → Elements
2. Find `<body>` element
3. Watch class attribute
4. Should toggle `crash-mode` based on BTC price

### Test MCP Agent
Open console and test directly:
```javascript
// Import the agent (if exposed)
// Test risk analysis
const analysis = {
  btcPrice: 85000,
  ethPrice: 3200,
  volatility: 6.5
}
// Should return HIGH RISK
```

---

## Success Criteria

✅ **PASS** if:
- Stonks loads real CoinGecko data
- Block charts display correctly
- Oracle shows risk analysis
- Crash mode activates when BTC < $90k
- ASCII skull appears in high risk
- MCP analysis is accurate
- Auto-refresh works
- No console errors

❌ **FAIL** if:
- Mock/fake data appears
- API calls fail consistently
- Crash mode doesn't activate
- Skull doesn't appear
- Charts are broken
- Crashes or errors

---

## Debugging Tips

**Console Errors:**
```bash
# Check browser console (F12)
# Look for:
- Network errors (CoinGecko API)
- CORS issues (should not occur)
- React errors
- Hook errors
```

**Network Tab:**
```bash
# Open Network tab in DevTools
# Filter by "Fetch/XHR"
# Should see:
- api.coingecko.com requests
- Status 200 (success)
- Response with price data
```

**React DevTools:**
```bash
# Install React DevTools extension
# Check component state:
- Stonks: prices, loading, crashMode
- Oracle: btcPrice, riskAnalysis
- useMarketCrash: crashMode, riskAnalysis
```

**CSS Debugging:**
```bash
# Check if crash mode CSS is applied
# Elements → <body> → class="crash-mode"
# Computed styles should show:
- animation: crash-flash
- Background color changing
```

---

## Real-World Scenarios

### Scenario 1: Bull Market (BTC > $90k)
- Navigate to page 201
- See green ▲ indicators
- No crash mode
- Oracle shows LOW/MEDIUM risk
- No skull

### Scenario 2: Bear Market (BTC < $90k)
- Navigate to page 201
- See red ▼ indicators
- Crash mode ACTIVE
- Screen flashes red
- Oracle shows HIGH/CRITICAL risk
- Skull appears

### Scenario 3: High Volatility
- Large 24h changes (> 5%)
- Risk score increases
- More risk factors listed
- Crash mode may activate
- Warnings displayed

---

## Test Data Examples

### Normal Market Conditions
```
BTC: $95,000 (+2.3%)
ETH: $3,500 (+1.8%)
SOL: $120 (+3.2%)
ADA: $0.65 (+0.5%)

Risk Score: 15%
Risk Level: LOW
Crash Mode: OFF
```

### High Risk Conditions
```
BTC: $85,000 (-8.5%)
ETH: $2,800 (-12.3%)
SOL: $95 (-15.2%)
ADA: $0.52 (-10.8%)

Risk Score: 65%
Risk Level: HIGH
Crash Mode: ON
Skull: VISIBLE
```

---

## Automated Testing (Future)

Potential test cases for automation:
```typescript
describe('Zone 200', () => {
  test('loads crypto prices', async () => {
    // Test CoinGecko API call
  })
  
  test('activates crash mode when BTC < 90k', () => {
    // Test MCP agent logic
  })
  
  test('displays ASCII skull in high risk', () => {
    // Test Oracle page rendering
  })
  
  test('generates block charts', () => {
    // Test chart generation
  })
})
```

---

## Checklist Summary

Before marking Zone 200 as complete:

- [ ] Page 201 loads real crypto data
- [ ] Block charts display correctly
- [ ] Page 204 shows risk analysis
- [ ] MCP agent analyzes correctly
- [ ] Crash mode activates at BTC < $90k
- [ ] ASCII skull appears in high risk
- [ ] CSS effects work (flash, shake)
- [ ] Auto-refresh works (30s)
- [ ] No API keys required
- [ ] No console errors
- [ ] Works in multiple browsers
- [ ] Mobile responsive
- [ ] Error handling works
- [ ] Documentation complete

---

*All tests should pass with real market data*  
*No mocks, no simulations, all live* 🚀
