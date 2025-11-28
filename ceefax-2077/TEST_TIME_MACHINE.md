# 🧪 TIME MACHINE TEST GUIDE

## Quick Start

1. **Navigate:** Type `802` → Press `ENTER`
2. **Click:** "Yahoo!" in popular sites grid
3. **Watch:** Dial-up modem animation (10 seconds)
4. **Browse:** 1999 Yahoo! in pure Teletext format
5. **Click:** Any link to navigate
6. **Done!** You're browsing the 1999 web!

---

## Test Checklist

### ✅ Test 1: Page Load
- [ ] Navigate to page 802
- [ ] See "TIME MACHINE" header
- [ ] Address bar is visible
- [ ] Popular sites grid shows 10 sites
- [ ] Instructions are displayed

### ✅ Test 2: Dial-Up Animation
- [ ] Click any popular site
- [ ] "DIALING UP..." appears
- [ ] Modem sounds display (♪ BEEP BEEP ♪)
- [ ] Progress bar fills 0-100%
- [ ] Takes ~10 seconds
- [ ] Transitions to loading state

### ✅ Test 3: Page Conversion
- [ ] "DOWNLOADING PAGE..." appears
- [ ] Page loads successfully
- [ ] Title is UPPERCASE
- [ ] Content is UPPERCASE
- [ ] Text wraps at 38 characters
- [ ] Archive URL is shown
- [ ] Links are listed (if available)

### ✅ Test 4: Content Display
- [ ] Headers have ═══ borders
- [ ] Paragraphs are separated
- [ ] Text is readable
- [ ] Scrolling works for long content
- [ ] Colors are appropriate (cyan/yellow/white)

### ✅ Test 5: Link Navigation
- [ ] Links are numbered [1], [2], etc.
- [ ] Clicking link loads new page
- [ ] Dial-up animation repeats
- [ ] New page displays correctly
- [ ] Can navigate multiple levels

### ✅ Test 6: Back Button
- [ ] "BACK TO TIME MACHINE" button visible
- [ ] Clicking returns to address bar
- [ ] Previous state is cleared
- [ ] Can enter new URL

### ✅ Test 7: Custom URL
- [ ] Enter "cnn.com" in address bar
- [ ] Click GO button
- [ ] Dial-up animation plays
- [ ] 1999 CNN loads
- [ ] Content is converted properly

### ✅ Test 8: Error Handling
- [ ] Enter invalid URL
- [ ] Error message appears
- [ ] "NO ARCHIVE FOUND" or similar
- [ ] "TRY AGAIN" button works
- [ ] Returns to idle state

---

## Popular Sites to Test

### Guaranteed to Work:
1. **yahoo.com** - Classic web portal
2. **google.com** - Early search engine
3. **amazon.com** - E-commerce pioneer
4. **cnn.com** - News site
5. **nasa.gov** - Space agency

### May Work:
6. **ebay.com** - Auction site
7. **bbc.co.uk** - British news
8. **microsoft.com** - Software company
9. **apple.com** - Tech company
10. **mtv.com** - Music channel

---

## Expected Behavior

### Yahoo! (1999)
```
═══════════════════════════════════
YAHOO! - THE WEB DIRECTORY
═══════════════════════════════════

WELCOME TO YAHOO! THE MOST POPULAR
WEB PORTAL. SEARCH THE WEB, CHECK
EMAIL, READ NEWS, AND MORE.

LINKS FOUND (10):
[1] YAHOO MAIL
[2] YAHOO NEWS
[3] YAHOO FINANCE
[4] YAHOO SPORTS
[5] YAHOO GAMES
...
```

### Google (1999)
```
═══════════════════════════════════
GOOGLE SEARCH
═══════════════════════════════════

SEARCH THE WEB WITH GOOGLE. THE
FASTEST AND MOST ACCURATE SEARCH
ENGINE ON THE INTERNET.

LINKS FOUND (3):
[1] ADVANCED SEARCH
[2] PREFERENCES
[3] ABOUT GOOGLE
```

---

## Dial-Up Animation Sequence

```
Second 0-2:   ♪ BEEP BEEP BEEP ♪
Second 3-5:   ♫ SCREECH SCREECH ♫
Second 6-8:   ♪ KSHHHHH KSHHHHH ♪
Second 9-10:  ♫ BONG BONG BONG ♫

Progress:
0%:   ░░░░░░░░░░░░░░░░░░░░
25%:  █████░░░░░░░░░░░░░░░
50%:  ██████████░░░░░░░░░░
75%:  ███████████████░░░░░
100%: ████████████████████
```

---

## Common Issues

### Issue: "NO ARCHIVE FOUND"
**Cause:** Site has no 1999 snapshot  
**Solution:** Try a different popular site

### Issue: Page loads but empty
**Cause:** Archive may be incomplete  
**Solution:** Try different URL or year

### Issue: Links don't work
**Cause:** Relative URLs may not resolve  
**Solution:** Use popular sites with absolute URLs

### Issue: Dial-up animation too fast
**Cause:** Fast network connection  
**Solution:** This is normal, enjoy the speed!

### Issue: CORS error in console
**Cause:** Some archives block cross-origin  
**Solution:** Try different site, most work fine

---

## Performance Checks

### Timing:
- [ ] Dial-up animation: ~10 seconds
- [ ] API query: 1-3 seconds
- [ ] HTML fetch: 2-5 seconds
- [ ] Conversion: <1 second
- [ ] Total: 13-19 seconds

### Network:
- [ ] Wayback API responds
- [ ] Archive CDN accessible
- [ ] No CORS errors (most sites)
- [ ] Proper error handling

### Display:
- [ ] Text wraps correctly
- [ ] No overflow issues
- [ ] Scrolling smooth
- [ ] Colors readable

---

## Advanced Testing

### Test Multiple Navigation:
```
1. Load yahoo.com
2. Click "Yahoo Mail" link
3. Wait for dial-up
4. Load mail page
5. Click back
6. Load different site
7. Verify state resets
```

### Test Long Content:
```
1. Load cnn.com (news site)
2. Verify scrolling works
3. Check 20-line limit
4. Verify "..." truncation
```

### Test Error Recovery:
```
1. Enter "invalid123.com"
2. Wait for error
3. Click "TRY AGAIN"
4. Enter valid URL
5. Verify works normally
```

---

## Success Criteria

✅ Dial-up animation plays smoothly  
✅ Popular sites load correctly  
✅ Content is UPPERCASE  
✅ Text wraps at 38 characters  
✅ Links are clickable  
✅ Navigation works  
✅ Back button functions  
✅ Error handling works  
✅ No console errors  
✅ Performance acceptable  

---

## Demo Script

**For showing off the feature:**

1. "Let me show you the Time Machine"
2. Navigate to 802
3. "We're going to browse the 1999 web"
4. Click "Yahoo!"
5. "Watch the authentic dial-up animation"
6. Wait for modem sounds
7. "And here's Yahoo from 1999!"
8. "All converted to Teletext format"
9. "Everything is UPPERCASE"
10. "We can click links to navigate"
11. Click a link
12. "Dial-up animation again!"
13. "It's like browsing with a 56k modem"
14. "But displayed on a 1980s Teletext terminal"
15. "Three decades of technology in one feature!"

---

## 🎃 Frankenstein Factor

**What makes this Frankenstein:**
- 1999 web content
- 1980s Teletext display
- 2024 modern browser
- Dial-up modem nostalgia
- HTML degradation as feature
- Time travel through technology

**It's beautifully absurd and perfectly functional!**

---

**Test URL:** http://localhost:5173  
**Page Number:** 802  
**Feature:** Time Machine Browser

*Happy time traveling! 🕰️*
