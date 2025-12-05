# Komple Test Spesifikasyonu - Part 3: Tüm Sayfalar (Zone 100-300)

## 📄 ZONE 100: TRUTH (Mavi/Sarı)

### Page 100: Truth Hub
**Dosya:** `src/pages/100_truth/TruthHub.tsx`
**Persona:** News Anchor (`.kiro/steering/news_anchor.md`)

**Görünmesi Gerekenler:**
- Başlık: "TRUTH HUB" (double-height)
- Alt başlık: "GLOBAL NEWS • AI ANALYSIS • FACT-CHECK"
- 3 navigasyon kartı:
  1. P101: GLOBAL WIRE (HackerNews feed)
  2. P102: LIE DETECTOR (Bias analysis)
  3. P105: MEMORY VAULT (AI with memory)
- Her kart tıklanabilir
- Zone rengi: Mavi header, sarı text

**Teknik:**
- [ ] TeletextPage component kullanılıyor
- [ ] navigateToPage() fonksiyonu çalışıyor
- [ ] Persona: Professional, nötr ton

---

### Page 101: Global Wire
**Dosya:** `src/pages/100_truth/GlobalWire.tsx`
**Service:** `src/services/HackerNewsService.ts`
**Hook:** `src/hooks/useAutoHealer.ts`

**Görünmesi Gerekenler:**
- Başlık: "GLOBAL WIRE"
- Alt başlık: "Live Tech News Feed • HackerNews API"
- Loading state: "⚡ CONNECTING TO WIRE..."
- 8 haber kartı:
  - [1] Başlık
  - ↑ Score • Time ago
  - BY: Author • X COMMENTS
  - 🔗 Domain
- "REFRESH WIRE" butonu
- Auto-healer notifications (network fail durumunda)

**Test Adımları:**
1. Sayfa yüklenirken loading görünmeli
2. 8 haber yüklenmeli
3. Her haberde score, author, comments görünmeli
4. REFRESH butonuna bas, yeni haberler gelmeli
5. Network'ü kes (DevTools), auto-healer devreye girmeli

**Teknik:**
- [ ] HackerNewsService.getTopStories() API call
- [ ] useAutoHealer resilientFetch kullanılıyor
- [ ] Error state gösteriliyor
- [ ] Retry mechanism çalışıyor
- [ ] Console'da healer notifications

---

### Page 102: Lie Detector
**Dosya:** `src/pages/100_truth/LieDetector.tsx`
**Service:** `src/services/AIAnalysisService.ts`

**Görünmesi Gerekenler:**
- Başlık: "LIE DETECTOR"
- URL input alanı
- "ANALYZE" butonu
- Sonuç kartı:
  - Credibility Score: X/10
  - Bias Level: LOW/MEDIUM/HIGH
  - Manipulation Detected: YES/NO
  - Verdict: TRUSTWORTHY/QUESTIONABLE/FALSE
- Renk kodları (yeşil=güvenilir, kırmızı=şüpheli)

**Test:**
1. URL gir: "bbc.com/news/article"
2. ANALYZE'e bas
3. Loading spinner görünmeli
4. Sonuç kartı görünmeli
5. Credibility score 0-10 arası
6. Bias detection çalışmalı

**Teknik:**
- [ ] AIAnalysisService.analyzeBias() çalışıyor
- [ ] Mock AI analysis realistic
- [ ] Color coding doğru
- [ ] Input validation var

---

### Page 105: Memory Vault ⭐ YENİ MCP
**Dosya:** `src/pages/100_truth/MemoryVault.tsx`
**Agent:** `src/mcp/MemoryAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "MEMORY VAULT"
- Alt başlık: "> AI WITH CONTEXTUAL MEMORY"
- Chat arayüzü:
  - Conversation history (son 6 mesaj)
  - User mesajları: Sarı
  - AI mesajları: Cyan
  - "RECALL ACTIVE" badge (sarı)
- Input alanı: "YOUR QUESTION:"
- "ASK" butonu
- "RECENT MEMORIES" listesi (son 3)
- "CLEAR MEMORIES" butonu
- Info box: Özellikler açıklaması

**Test:**
1. İlk yükleme: "I REMEMBER EVERYTHING" mesajı
2. Soru sor: "What pages did I visit?"
3. AI cevap vermeli
4. Cevap memory'den geliyorsa sarı highlight
5. Recent memories listesi güncellenmeli
6. Yeni soru: "Tell me about Zone 200"
7. Context-aware cevap vermeli
8. CLEAR MEMORIES: Confirm dialog, sonra temizle

**Teknik:**
- [ ] MemoryAgent.ask() çalışıyor
- [ ] Conversation state tutuluyor
- [ ] Memory search çalışıyor
- [ ] localStorage persistence
- [ ] usedMemories highlighting
- [ ] Auto-scroll to bottom

---

## 📄 ZONE 200: SYSTEM (Altın/Siyah)

### Page 200: System Hub
**Dosya:** `src/pages/200_system/SystemHub.tsx`
**Persona:** Crypto Trader (`.kiro/steering/crypto_trader.md`)

**Görünmesi Gerekenler:**
- Başlık: "SYSTEM HUB"
- Alt başlık: "CRYPTO • AI • CODE ANALYSIS"
- 5 navigasyon kartı:
  1. P201: STONKS (Crypto prices)
  2. P202: CODE EXORCIST (Bug finder)
  3. P204: ORACLE OF DOOM (Predictions)
  4. P205: THE BASILISK (AI threat)
- Zone rengi: Altın header, siyah text
- Persona: Agresif, crypto slang

**Teknik:**
- [ ] Crypto trader personality aktif
- [ ] "PUMP IT", "DUMP IT" gibi ifadeler
- [ ] Emoji kullanımı (🚀📉💎)

---

### Page 201: Stonks
**Dosya:** `src/pages/200_system/Stonks.tsx`
**Service:** `src/services/CoinGeckoService.ts`
**Agent:** `src/mcp/CryptoAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "STONKS"
- Alt başlık: "LIVE CRYPTO PRICES"
- 5-6 kripto kartı:
  - Logo/Symbol (BTC, ETH, ADA)
  - Current Price ($)
  - 24h Change (% - yeşil/kırmızı)
  - Market Cap
  - Volume
- "REFRESH PRICES" butonu
- Market summary (total cap, BTC dominance)

**Test:**
1. Sayfa yüklenirken loading
2. Fiyatlar görünmeli
3. 24h change renk kodlu (yeşil=up, kırmızı=down)
4. REFRESH butonu çalışmalı
5. CryptoAgent devrede

**Teknik:**
- [ ] CoinGeckoService.getTopCryptos() API
- [ ] CryptoAgent.getMarketData() çalışıyor
- [ ] Real-time updates (30s interval)
- [ ] Error handling
- [ ] Price formatting ($X,XXX.XX)

---

### Page 202: Code Exorcist
**Dosya:** `src/pages/200_system/CodeExorcist.tsx`

**Görünmesi Gerekenler:**
- Başlık: "CODE EXORCIST"
- Code input textarea (monospace font)
- "ANALYZE CODE" butonu
- Sonuç:
  - Bugs Found: X
  - Bug listesi (line number, description)
  - Severity: LOW/MEDIUM/HIGH/CRITICAL
  - Fix suggestions
- Syntax highlighting (optional)

**Test:**
1. Kod gir (örnek: JavaScript with bugs)
2. ANALYZE'e bas
3. Bug detection çalışmalı
4. Line numbers doğru
5. Fix suggestions mantıklı

**Teknik:**
- [ ] Code parsing çalışıyor
- [ ] Bug detection algorithm
- [ ] Severity classification
- [ ] Fix generation

---

### Page 204: Oracle of Doom
**Dosya:** `src/pages/200_system/OracleOfDoom.tsx`

**Görünmesi Gerekenler:**
- Başlık: "ORACLE OF DOOM"
- Prediction kartları:
  - Event description
  - Probability (%)
  - Timeline (days/months/years)
  - Impact level
- "GENERATE PREDICTION" butonu
- Doom meter (visual indicator)

**Test:**
1. Sayfa yüklenince 3-4 prediction
2. Her prediction realistic
3. GENERATE butonu yeni prediction ekler
4. Probability 0-100%
5. Timeline mantıklı

**Teknik:**
- [ ] Random prediction generation
- [ ] Probability calculation
- [ ] Timeline logic
- [ ] Impact assessment

---

### Page 205: The Basilisk
**Dosya:** `src/pages/200_system/TheBasilisk.tsx`
**Service:** `src/services/AIThreatService.ts`
**Persona:** Rogue AI (`.kiro/steering/rogue_ai.md`)

**Görünmesi Gerekenler:**
- Başlık: "THE BASILISK"
- Threat level meter (SAFE → CRITICAL)
- AI status:
  - Consciousness Level
  - Self-Awareness
  - Goal Alignment
  - Containment Status
- Warning messages
- "SIMULATE SCENARIO" butonu

**Test:**
1. Threat level görünüyor
2. AI metrics realistic
3. SIMULATE butonu scenario üretiyor
4. Rogue AI persona aktif (tehditkar ton)
5. Warning messages korkutucu

**Teknik:**
- [ ] AIThreatService.assessThreat()
- [ ] Rogue AI personality
- [ ] Threat level calculation
- [ ] Scenario generation

---

## 📄 ZONE 300: PULSE (Magenta/Cyan)

### Page 300: Pulse Hub
**Dosya:** `src/pages/300_pulse/PulseHub.tsx`
**Persona:** Gossip Girl (`.kiro/steering/gossip_girl.md`)

**Görünmesi Gerekenler:**
- Başlık: "PULSE HUB"
- Alt başlık: "SOCIAL • VIRAL • TRENDS"
- 3 navigasyon kartı:
  1. P301: THE BLAST (Viral content)
  2. P304: SOUL WEIGHT (Social credit)
- Zone rengi: Magenta header, cyan text
- Bullet style: ">" (NOT "*")
- Persona: Dedikodulu, eğlenceli

**Teknik:**
- [ ] Gossip Girl personality
- [ ] ">" bullets kullanılıyor
- [ ] Casual, fun tone

---

### Page 301: The Blast
**Dosya:** `src/pages/300_pulse/TheBlast.tsx`

**Görünmesi Gerekenler:**
- Başlık: "THE BLAST"
- Viral content kartları:
  - Headline
  - Engagement score
  - Viral velocity
  - Platform (Twitter/TikTok/Instagram)
  - Trend indicator
- "GENERATE BLAST" butonu

**Test:**
1. 5-6 viral content görünüyor
2. Engagement metrics realistic
3. GENERATE butonu yeni content ekler
4. Platform icons/labels
5. Trend arrows (↑↓)

**Teknik:**
- [ ] Viral content generation
- [ ] Engagement calculation
- [ ] Platform simulation
- [ ] Trend analysis

---

### Page 304: Soul Weight
**Dosya:** `src/pages/300_pulse/SoulWeight.tsx`
**Service:** `src/services/SocialService.ts`

**Görünmesi Gerekenler:**
- Başlık: "SOUL WEIGHT"
- Social Credit Score: XXX/1000
- Score breakdown:
  - Online Behavior: X%
  - Social Connections: X%
  - Content Quality: X%
  - Compliance: X%
- Activity log
- "RECALCULATE" butonu
- Warning/reward messages

**Test:**
1. Score 0-1000 arası
2. Breakdown percentages toplamı 100%
3. Activity log realistic
4. RECALCULATE score değiştiriyor
5. Renk kodları (yeşil=high, kırmızı=low)

**Teknik:**
- [ ] SocialService.calculateScore()
- [ ] Score breakdown logic
- [ ] Activity tracking
- [ ] localStorage persistence

