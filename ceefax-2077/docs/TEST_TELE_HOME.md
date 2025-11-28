# 🧪 TELE-HOME TEST GUIDE

## Quick Start

1. **Navigate to the page:**
   - Type: `801`
   - Press: `ENTER`
   - Or wait 3 seconds for auto-navigation

2. **You should see:**
   - Header: "TELE-HOME CONTROL v1.0"
   - Bridge status: "Connected: 192.168.1.100"
   - 5 devices listed
   - Large ASCII lightbulb in center
   - Controls help at bottom

---

## Test Checklist

### ✅ Test 1: Device Navigation
- [ ] Press `↓` - Selection moves to next device
- [ ] Press `↑` - Selection moves to previous device
- [ ] Selected device shows `►` indicator
- [ ] Selected device has yellow text
- [ ] ASCII bulb updates for selected device
- [ ] Device name appears below bulb

### ✅ Test 2: Toggle Light
- [ ] Select "Living Room" (should be OFF)
- [ ] Press `ENTER` or `SPACE`
- [ ] Screen flashes white briefly (200ms)
- [ ] Bulb changes from gray to yellow
- [ ] Status changes from "○ OFF" to "● ON"
- [ ] Brightness bar appears
- [ ] Success message shows with latency

### ✅ Test 3: Brightness Control
- [ ] With light ON, press `→` (right arrow)
- [ ] Brightness increases by 10%
- [ ] Brightness bar updates
- [ ] Loading indicator appears briefly
- [ ] Press `←` (left arrow)
- [ ] Brightness decreases by 10%
- [ ] Bar updates accordingly

### ✅ Test 4: Direct Commands
- [ ] Press `O` - Light turns ON
- [ ] Flash effect triggers
- [ ] Press `F` - Light turns OFF
- [ ] No flash effect
- [ ] Bulb turns gray

### ✅ Test 5: Multiple Devices
- [ ] Turn on "Living Room"
- [ ] Press `↓` to select "Bedroom"
- [ ] Turn on "Bedroom"
- [ ] Press `↑` back to "Living Room"
- [ ] Verify "Living Room" is still ON
- [ ] States persist correctly

### ✅ Test 6: Network Simulation
- [ ] Execute any command
- [ ] Observe "⟳ SENDING COMMAND..." message
- [ ] Wait for response (150-400ms)
- [ ] Success message shows latency
- [ ] Example: "✓ Living Room on successful (234ms)"

### ✅ Test 7: Visual Effects
- [ ] ASCII bulb eyes (◉ ◉) light up when ON
- [ ] Filament (▓▓▓) shows when ON
- [ ] Bulb has yellow glow when ON
- [ ] Brightness bar fills proportionally
- [ ] Flash effect is full-screen white

### ✅ Test 8: Edge Cases
- [ ] Dim light to 0% - should turn OFF
- [ ] Brighten from OFF - should turn ON
- [ ] Press `↑` at first device - stays at first
- [ ] Press `↓` at last device - stays at last
- [ ] Rapid key presses - commands queue properly

---

## Expected Behavior

### Kitchen (Default ON)
```
► Kitchen          [ON ] 100%

        ___
       /   \
      /     \
     |  ◉  ◉  |  <- Yellow, glowing
     |       |
      \ ▓▓▓ /
       \___/
        |||
        |||
       =====
      |     |
      |_____|

KITCHEN

● ON

BRIGHTNESS:
████████████████████ 100%
```

### Living Room (Default OFF)
```
► Living Room      [OFF]

        ___
       /   \
      /     \
     |  ○  ○  |  <- Gray, no glow
     |       |
      \ ░░░ /
       \___/
        |||
        |||
       =====
      |     |
      |_____|

LIVING ROOM

○ OFF
```

---

## Performance Checks

### Response Times
- [ ] Command execution: 150-400ms
- [ ] UI updates: Immediate after response
- [ ] Flash effect: Exactly 200ms
- [ ] Message clear: 3 seconds

### Smooth Operation
- [ ] No lag when switching devices
- [ ] Animations are smooth
- [ ] No console errors
- [ ] No memory leaks

---

## Keyboard Shortcuts Summary

| Key | Action |
|-----|--------|
| ↑ | Previous device |
| ↓ | Next device |
| ← | Dim (-10%) |
| → | Brighten (+10%) |
| ENTER | Toggle on/off |
| SPACE | Toggle on/off |
| O | Turn on |
| F | Turn off |

---

## Common Issues

### Issue: Page doesn't load
**Solution:** Check that route 801 is registered in App.tsx

### Issue: No flash effect
**Solution:** Verify flash state is triggering on 'on' and 'toggle' commands

### Issue: Brightness bar not showing
**Solution:** Only shows when light is ON - turn light on first

### Issue: Commands not working
**Solution:** Check that IoTAgent is properly imported and initialized

---

## Success Criteria

✅ All 5 devices are controllable  
✅ Flash effect works on light turn-on  
✅ Brightness bar updates in real-time  
✅ Network latency is displayed  
✅ ASCII bulb changes appearance  
✅ Keyboard controls are responsive  
✅ No TypeScript errors  
✅ No console warnings  

---

## Demo Script

**For showing off the feature:**

1. Navigate to 801
2. "Here's our retro smart home controller"
3. Press ↓ a few times - "Navigate with arrow keys"
4. Select Living Room
5. Press ENTER - "Watch the flash effect!"
6. Press → multiple times - "Adjust brightness"
7. Press ↓ to Bedroom
8. Press O - "Turn on with O key"
9. "Notice the network latency - realistic simulation!"
10. "All controlled through a 1980s Teletext interface"

---

## 🎃 Frankenstein Factor

**What makes this Frankenstein:**
- 40-year-old UI technology
- Controlling modern IoT devices
- ASCII art for smart home status
- Network latency in retro font
- Flash effect on CRT-style screen
- Arrow keys instead of touch controls

**It's beautifully absurd and perfectly functional!**

---

**Test URL:** http://localhost:5173  
**Page Number:** 801  
**Feature:** Tele-Home Smart Home Control

*Happy testing! 🏠💡*
