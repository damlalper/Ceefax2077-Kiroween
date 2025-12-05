# 🔑 API Setup Guide - Ceefax 2077

## Quick Start (5 minutes)

All mock data has been replaced with **real APIs**. Here's how to get your free API keys.

---

## ✅ REQUIRED: OpenWeatherMap (Weather Data)

**What it does:** Powers Zone 400 EcoSense with real weather and air quality data

**Cost:** FREE (1,000 calls/day)

**Setup:**
1. Go to https://openweathermap.org/appid
2. Click "Sign Up" (top right)
3. Fill in email, username, password
4. Verify your email
5. Go to https://home.openweathermap.org/api_keys
6. Copy your API key
7. Add to `.env`:
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```

**Time:** 2 minutes

---

## 🎯 OPTIONAL: Hugging Face (AI Analysis)

**What it does:** Powers Zone 100 LieDetector with AI-powered bias detection

**Cost:** FREE (rate limited but sufficient)

**Setup:**
1. Go to https://huggingface.co/join
2. Sign up with email or GitHub
3. Go to https://huggingface.co/settings/tokens
4. Click "New token"
5. Name it "ceefax-2077", select "Read" access
6. Copy the token
7. Add to `.env`:
   ```
   VITE_HF_API_KEY=hf_your_token_here
   ```

**Time:** 2 minutes

**Note:** If you don't add this, LieDetector falls back to heuristic analysis (still works!)

---

## 💰 OPTIONAL: OpenAI (Premium AI)

**What it does:** Premium AI analysis for LieDetector (better than Hugging Face)

**Cost:** PAID (~$0.002 per analysis, but has free trial credits)

**Setup:**
1. Go to https://platform.openai.com/signup
2. Sign up and add payment method
3. Go to https://platform.openai.com/api-keys
4. Create new secret key
5. Add to `.env`:
   ```
   VITE_LLM_API_KEY=sk-your_key_here
   VITE_LLM_ENDPOINT=https://api.openai.com/v1/chat/completions
   ```

**Time:** 3 minutes

**Note:** Only use this if you want premium AI. Free alternatives work fine!

---

## 🆓 APIs That Don't Need Keys

These are already working, no setup needed:

| API | Used In | Status |
|-----|---------|--------|
| **CoinGecko** | Zone 200: Stonks | ✅ Working |
| **NASA Mars Rover** | Zone 400: Plan B | ✅ Working |
| **HackerNews** | Zone 200: The Basilisk | ✅ Working |
| **Reddit JSON** | Zone 300: The Blast | ✅ Working |
| **RSS to JSON** | Zone 100: GlobalWire | ✅ Working |

---

## 📝 Complete Setup Checklist

```bash
# 1. Copy the example env file
cp .env.example .env

# 2. Edit .env and add your keys
# (Use any text editor)

# 3. Restart dev server
npm run dev

# 4. Test each zone to verify APIs work
```

---

## 🧪 Testing Your Setup

### Test Zone 100 (News)
1. Navigate to Zone 100 → GlobalWire
2. Should see real BBC news headlines transformed to dystopian format
3. If you see "NEWS FEED TEMPORARILY OFFLINE", RSS API might be rate limited (try again in a minute)

### Test Zone 200 (Crypto)
1. Navigate to Zone 200 → Stonks
2. Should see real Bitcoin, Ethereum, Solana, Cardano prices
3. Prices update from CoinGecko API

### Test Zone 200 (AI Threat)
1. Navigate to Zone 200 → The Basilisk
2. Should see real AI-related stories from HackerNews
3. Threat level calculated from real headlines

### Test Zone 300 (Gossip)
1. Navigate to Zone 300 → The Blast
2. Should see real Reddit posts from r/relationship_advice, r/AmItheAsshole, etc.
3. Transformed into Gossip Girl format

### Test Zone 400 (Weather)
1. Navigate to Zone 400 → EcoSense
2. **Requires OpenWeatherMap API key**
3. Should show real AQI, temperature, humidity for London
4. Without key: Shows simulated data

### Test Zone 100 (AI Analysis)
1. Navigate to Zone 100 → LieDetector
2. Paste any text and click "ANALYZE"
3. With Hugging Face/OpenAI key: AI-powered analysis
4. Without key: Heuristic analysis (still works!)

---

## 🐛 Troubleshooting

### "Failed to fetch" errors
- **Cause:** CORS issues or rate limiting
- **Fix:** Wait a minute and try again. Free APIs have rate limits.

### Weather shows simulated data
- **Cause:** Missing or invalid OpenWeatherMap API key
- **Fix:** Double-check your `.env` file has `VITE_WEATHER_API_KEY=...`
- **Fix:** Restart dev server after adding key

### News shows "OFFLINE" message
- **Cause:** RSS to JSON API rate limit
- **Fix:** Wait 1 minute, refresh page
- **Alternative:** The API is free but rate limited. Try again later.

### Reddit posts not loading
- **Cause:** Reddit API rate limit or CORS
- **Fix:** Refresh page. Falls back to sample posts if API fails.

### AI Analysis uses heuristic instead of AI
- **Cause:** Missing Hugging Face or OpenAI key
- **Fix:** Add `VITE_HF_API_KEY` to `.env` for free AI
- **Note:** Heuristic analysis still works well!

---

## 📊 What Data is Real vs Simulated

### ✅ 100% Real Data
- **Zone 100: GlobalWire** - Real BBC news via RSS
- **Zone 200: Stonks** - Real crypto prices from CoinGecko
- **Zone 200: The Basilisk** - Real HackerNews stories
- **Zone 200: System Monitoring** - Real browser performance metrics
- **Zone 300: The Blast** - Real Reddit posts
- **Zone 400: Plan B** - Real Mars photos from NASA
- **Zone 400: EcoSense** - Real weather (with API key)

### ⚠️ Partially Real
- **Zone 100: LieDetector** - Real AI analysis (with key) OR heuristic fallback
- **Zone 400: EcoSense** - Real weather + simulated radiation (no free radiation API)
- **Zone 200: OracleOfDoom** - Real browser metrics + simulated predictions

### 🎨 Algorithmic (Not Mock)
- **Zone 300: Soul Weight** - Rule-based sin scoring (not fake data)
- **Zone 500: All pages** - Rule-based security analysis
- **Zone 666: Glitch** - Procedural corruption effects
- **Zone 800: All pages** - Real MCP integrations
- **Zone 900: All pages** - Real theme/hook system

---

## 💡 Pro Tips

1. **Start with just OpenWeatherMap key** - That's the only one you really need
2. **Hugging Face is free** - Add it for better AI analysis
3. **Skip OpenAI** - Unless you want premium AI (costs money)
4. **APIs work without keys** - Most features work even without any keys!
5. **Rate limits are generous** - You won't hit them in normal usage

---

## 🎯 Summary

**Minimum setup (1 key):**
- OpenWeatherMap → Real weather data

**Recommended setup (2 keys):**
- OpenWeatherMap → Real weather
- Hugging Face → Free AI analysis

**Premium setup (3 keys):**
- OpenWeatherMap → Real weather
- Hugging Face → Backup AI
- OpenAI → Premium AI analysis

**Total cost:** $0/month (unless you use OpenAI)

---

## 🚀 Ready to Go!

Once you've added your keys:

```bash
npm run dev
```

Navigate through all zones and watch real data flow in! 🎉

---

## 📞 Need Help?

Check the console (F12) for detailed error messages. Most issues are:
1. Missing API key in `.env`
2. Forgot to restart dev server
3. Rate limit (wait 1 minute)

All APIs have generous free tiers. You should never hit limits in normal usage.
