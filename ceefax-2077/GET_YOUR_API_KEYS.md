# 🔑 GET YOUR API KEYS - Quick Reference

## ⚡ 2-Minute Setup

All mock data has been replaced with real APIs. Here's what you need:

---

## 1️⃣ REQUIRED: OpenWeatherMap

**What:** Real weather & air quality data for Zone 400  
**Cost:** FREE (1,000 calls/day)  
**Time:** 2 minutes

### Steps:
1. Go to: https://openweathermap.org/appid
2. Click "Sign Up"
3. Verify email
4. Copy API key from: https://home.openweathermap.org/api_keys
5. Add to `.env`:
   ```bash
   VITE_WEATHER_API_KEY=your_key_here
   ```

---

## 2️⃣ OPTIONAL: Hugging Face (Free AI)

**What:** AI-powered bias detection for Zone 100  
**Cost:** FREE (rate limited)  
**Time:** 2 minutes

### Steps:
1. Go to: https://huggingface.co/join
2. Sign up
3. Go to: https://huggingface.co/settings/tokens
4. Create token (Read access)
5. Add to `.env`:
   ```bash
   VITE_HF_API_KEY=hf_your_token_here
   ```

**Note:** If you skip this, LieDetector uses heuristic analysis (still works!)

---

## 3️⃣ SKIP: OpenAI (Paid)

**What:** Premium AI analysis  
**Cost:** PAID (~$0.002 per call)  
**Recommendation:** Skip it, use free Hugging Face instead

---

## 🚀 Quick Start

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env and add your OpenWeatherMap key
# (Use any text editor)

# 3. Restart dev server
npm run dev

# 4. Done! Real data is flowing
```

---

## ✅ What Works Without Keys

Even with ZERO keys, these work:

- ✅ Zone 100: GlobalWire (BBC news via RSS)
- ✅ Zone 200: Stonks (CoinGecko crypto prices)
- ✅ Zone 200: The Basilisk (HackerNews AI stories)
- ✅ Zone 300: The Blast (Reddit drama)
- ✅ Zone 400: Plan B (NASA Mars photos)
- ✅ All other zones (algorithmic, not mock)

Only Zone 400 EcoSense needs a key for real weather.

---

## 💰 Total Cost

**With just OpenWeatherMap:** $0/month  
**With Hugging Face too:** $0/month  
**With OpenAI (not recommended):** ~$6/month

**Recommended setup: $0/month**

---

## 🐛 Troubleshooting

**Weather shows simulated data?**
- Add `VITE_WEATHER_API_KEY` to `.env`
- Restart dev server

**"Failed to fetch" errors?**
- Wait 1 minute (rate limit)
- Refresh page

**Need more help?**
- See `API_SETUP_GUIDE.md` for detailed instructions
- Check console (F12) for error messages

---

## 📊 Summary

| API | Required? | Cost | Setup Time |
|-----|-----------|------|------------|
| OpenWeatherMap | ✅ Yes | FREE | 2 min |
| Hugging Face | ⚠️ Optional | FREE | 2 min |
| OpenAI | ❌ Skip | PAID | - |

**Total setup: 2-4 minutes, $0/month**

---

That's it! Get your OpenWeatherMap key and you're done. 🎉
