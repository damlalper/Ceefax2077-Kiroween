# ⚡ Quick Setup - 5 Minutes

Get all your free API keys and start using real data!

---

## 🔑 Get Your API Keys

### 1. OpenWeatherMap (REQUIRED - 2 min)
**What:** Real weather & air quality  
**Link:** https://openweathermap.org/appid

1. Click "Sign Up"
2. Verify email
3. Go to https://home.openweathermap.org/api_keys
4. Copy your API key

---

### 2. NewsAPI (RECOMMENDED - 2 min)
**What:** Premium news sources (BBC, CNN, Reuters, TechCrunch)  
**Link:** https://newsapi.org/register

1. Sign up with email
2. Verify email
3. Copy your API key from dashboard

**Without this:** Falls back to RSS feeds (still works!)

---

### 3. Groq (RECOMMENDED - 2 min)
**What:** Super fast & free AI analysis  
**Link:** https://console.groq.com

1. Sign up (GitHub or email)
2. Go to API Keys section
3. Create new key
4. Copy it

**Without this:** Falls back to heuristic analysis (still works!)

---

## 📝 Add Keys to .env

```bash
# 1. Copy example file
cp .env.example .env

# 2. Edit .env and add your keys:
VITE_WEATHER_API_KEY=your_openweathermap_key
VITE_NEWS_API_KEY=your_newsapi_key
VITE_GROQ_API_KEY=your_groq_key

# 3. Restart dev server
npm run dev
```

---

## ✅ What You Get

### With OpenWeatherMap Only:
- ✅ Real weather data (Zone 400)
- ✅ Everything else works (RSS news, heuristic AI)

### With NewsAPI Added:
- ✅ Premium news sources
- ✅ More categories
- ✅ Better headlines

### With Groq Added:
- ✅ AI-powered bias detection
- ✅ Super fast analysis
- ✅ Better than heuristic

---

## 💰 Cost

**All 3 keys: $0/month**

- OpenWeatherMap: 1,000 calls/day (free)
- NewsAPI: 100 calls/day (free)
- Groq: Generous free tier

---

## 🧪 Test It

```bash
npm run dev
```

Then visit:
- **Zone 100 (page 101):** See real news
- **Zone 100 (page 103):** Test AI bias detection
- **Zone 400 (page 401):** See real weather

---

## 🐛 Troubleshooting

**Weather shows simulated data?**
- Check `.env` has `VITE_WEATHER_API_KEY`
- Restart dev server

**News shows "OFFLINE"?**
- NewsAPI rate limit (100/day)
- Falls back to RSS (still works)

**AI uses heuristic?**
- Add `VITE_GROQ_API_KEY` to `.env`
- Restart dev server

---

## 🎯 Priority

**Must have:**
1. OpenWeatherMap ✅

**Should have:**
2. NewsAPI ✅
3. Groq ✅

**Skip:**
- OpenAI (paid, Groq is better)
- Hugging Face (Groq is faster)

---

**Total setup time: 5 minutes**  
**Total cost: $0/month**  
**Result: 100% real data** 🎉
