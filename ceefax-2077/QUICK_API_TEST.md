# Quick API Test Guide

## 🎯 Priority Tests

### 1. Test P802 - Time Machine (NEWLY FIXED)

**Navigate**: Type `802` on keyboard

**Test Steps**:
1. ✅ Page loads without errors
2. ✅ Click "Yahoo!" button
3. ✅ Watch dial-up animation (modem sounds, progress bar)
4. ✅ See real archived content from 1999
5. ✅ Content is in UPPERCASE Teletext format
6. ✅ Links are numbered [1], [2], etc.
7. ✅ Click a link to navigate
8. ✅ Try entering "microsoft.com" manually
9. ✅ Click "GO" button

**Expected Console Logs**:
```
🔍 Querying Wayback API: https://archive.org/wayback/available?url=...
📦 Wayback API response: {...}
✅ Found snapshot: {...}
📥 Fetching archive: https://web.archive.org/web/...
✅ Archive fetched successfully
```

**Success Criteria**:
- ✅ No "NO ARCHIVE FOUND" error
- ✅ Real content displayed
- ✅ Links work
- ✅ Navigation works

---

### 2. Test P805 - The Renderer (NEWLY FIXED)

**Navigate**: Type `805` on keyboard

**Test Steps**:
1. ✅ Page loads without errors
2. ✅ Click "WIKIPEDIA" bookmark
3. ✅ See loading animation: "🌐 FETCHING PAGE..."
4. ✅ Real Wikipedia content appears
5. ✅ Content is in UPPERCASE
6. ✅ Links are numbered [1], [2], etc.
7. ✅ Click a numbered link
8. ✅ Try entering "example.com" in address bar
9. ✅ Press Enter or click "GO"

**Expected Console Logs**:
```
🌐 Fetching page: https://en.wikipedia.org/wiki/Teletext
🔄 Using CORS proxy: https://api.allorigins.win/raw?url=...
✅ Page fetched, converting to Teletext...
```

**Success Criteria**:
- ✅ Real web content displayed
- ✅ Proper Teletext formatting
- ✅ Links work
- ✅ Navigation works

---

### 3. Test P101 - Global Wire (Already Working)

**Navigate**: Type `101` on keyboard

**Test Steps**:
1. ✅ Page loads
2. ✅ Real Hacker News stories appear
3. ✅ Stories have titles, points, authors
4. ✅ Click "REFRESH" to get new stories

**Expected**: Real-time Hacker News data

---

### 4. Test P201 - Stonks (Already Working)

**Navigate**: Type `201` on keyboard

**Test Steps**:
1. ✅ Page loads
2. ✅ Real crypto prices appear
3. ✅ Bitcoin, Ethereum, etc. with real prices
4. ✅ Prices update on refresh

**Expected**: Real-time cryptocurrency prices

---

## 🔍 Debugging Tips

### If P802 Shows "NO ARCHIVE FOUND":

**Check Console**:
1. Look for `🔍 Querying Wayback API:` log
2. Check if API returned data: `📦 Wayback API response:`
3. Look for errors

**Common Issues**:
- URL not in archive (try popular sites first)
- CORS proxy down (check network tab)
- API rate limit (wait 1 minute, try again)

**Solutions**:
- Try different URL (Yahoo, Google, Amazon work well)
- Check browser console for errors
- Verify internet connection

---

### If P805 Shows Error:

**Check Console**:
1. Look for `🌐 Fetching page:` log
2. Check proxy: `🔄 Using CORS proxy:`
3. Look for HTTP errors

**Common Issues**:
- CORS proxy down
- Website blocks scraping
- Network timeout

**Solutions**:
- Try different website (Wikipedia, Example.com work well)
- Wait a moment and retry
- Check network tab in DevTools

---

## 📊 Expected Results

### Working Pages with Real APIs:
- ✅ P101 - Global Wire (Hacker News)
- ✅ P201 - Stonks (CoinGecko)
- ✅ P802 - Time Machine (Wayback Machine) **← NEWLY FIXED**
- ✅ P805 - The Renderer (Web Scraping) **← NEWLY FIXED**

### Pages with Mock Data (Expected):
- P102, P202, P204, P205, P301, P304, P401, P403, P405, P501-504, P666, P801, P803, P905, P906, P907

---

## 🎮 Full Navigation Test

**Test Keyboard Navigation**:
```
1. Type "1" "0" "1" → Should go to P101 (Global Wire)
2. Type "2" "0" "1" → Should go to P201 (Stonks)
3. Type "8" "0" "2" → Should go to P802 (Time Machine)
4. Type "8" "0" "5" → Should go to P805 (The Renderer)
```

**Test Fastext Buttons** (colored footer):
- Red button → Previous page
- Green button → Next page
- Yellow button → Zone hub
- Blue button → Home

---

## ✅ Success Checklist

### Build & Run:
- [x] `npm run build` - No errors
- [x] `npm run dev` - Server running
- [x] No TypeScript errors
- [x] No console errors on load

### P802 Time Machine:
- [ ] Page loads
- [ ] Popular sites work
- [ ] Dial-up animation plays
- [ ] Real archived content displays
- [ ] Links are clickable
- [ ] Manual URL entry works

### P805 The Renderer:
- [ ] Page loads
- [ ] Bookmarks work
- [ ] Loading animation shows
- [ ] Real web content displays
- [ ] Links are clickable
- [ ] Manual URL entry works

### P101 Global Wire:
- [ ] Real Hacker News stories
- [ ] Refresh works

### P201 Stonks:
- [ ] Real crypto prices
- [ ] Multiple coins shown

---

## 🐛 Known Issues

### CORS Proxy Limitations:
- Free proxy may be slow
- Rate limits may apply
- Some websites may not work

**Workaround**: Try different URLs if one fails

### Wayback Machine:
- Not all URLs have 1999 archives
- Some archives may be incomplete
- Popular sites work best

**Workaround**: Use provided popular sites list

---

## 📝 Testing Notes

**Browser**: Chrome/Edge recommended (best DevTools)
**Console**: Keep F12 DevTools open to see logs
**Network**: Check Network tab if issues occur
**Cache**: Clear cache if seeing old data

---

## 🚀 Ready to Test!

1. Open browser to `http://localhost:5173`
2. Wait for BIOS boot screen
3. Navigate to P802 or P805
4. Test real API integration
5. Check console logs
6. Report any issues

**Last Updated**: December 5, 2025
**Status**: READY FOR TESTING ✅
