# Komple Test Spesifikasyonu - Part 2: Agent Hooks & MCP

## 🤖 AGENT HOOKS SİSTEMİ

### 8. AGENT HOOKS
**Dosya:** `src/services/HookService.ts`
**Hook:** `src/hooks/useAgentHooks.ts`
**Config:** `.kiro/hooks/hooks.json`
**Page:** P907 (Hook Dashboard)

**Mevcut 10 Hook:**

#### Hook 1: Auto-Save
**Trigger:** Her 30 saniye
**Action:** localStorage'a state kaydet
**Test:** 30 saniye bekle, console'da "Auto-save triggered" mesajı

#### Hook 2: Idle Detection
**Trigger:** 5 dakika hareketsizlik
**Action:** Zone 666'ya yönlendir
**Test:** 5 dakika hiçbir şey yapma, otomatik P666'ya gitmeli

#### Hook 3: Error Recovery
**Trigger:** Console'da error
**Action:** Auto-healer devreye girer
**Test:** Kasıtlı hata oluştur, recovery mesajı görünmeli

#### Hook 4: Page Visit Logger
**Trigger:** Her sayfa değişimi
**Action:** localStorage'a log yaz
**Test:** Birkaç sayfa gez, localStorage'da "pageVisits" array'i kontrol et

#### Hook 5: Zone Change Narrator
**Trigger:** Zone değişimi (100→200)
**Action:** Narrator zone ismini söyler
**Test:** Narrator açık, zone değiştir, "Entering Zone 200" duyulmalı

#### Hook 6: Crypto Price Alert
**Trigger:** Bitcoin %5 değişim
**Action:** Notification göster
**Test:** P201'de fiyat değişimini simüle et

#### Hook 7: Glitch Escape Timer
**Trigger:** P666'da 10 saniye
**Action:** Escape window aç
**Test:** P666'ya git, 10 saniye bekle, "ESCAPE WINDOW OPEN" görünmeli

#### Hook 8: VHS Auto-Stop
**Trigger:** 5 dakika kayıt
**Action:** Otomatik durdur
**Test:** VHS kaydı başlat, 5 dakika bekle

#### Hook 9: Theme Persistence
**Trigger:** Theme değişimi
**Action:** localStorage'a kaydet
**Test:** Theme değiştir, sayfayı yenile, theme korunmalı

#### Hook 10: Biometric Lock
**Trigger:** Zone 500'e giriş
**Action:** Parmak izi simülasyonu
**Test:** P500'e git, biometric gate görünmeli

**Page 907 Test:**
1. P907'ye git
2. Tüm 10 hook listede görünmeli
3. Her hook için:
   - Name, trigger, action görünüyor
   - Enabled/Disabled toggle çalışıyor
   - Execution count sayılıyor
   - Last triggered timestamp görünüyor

**Teknik Kontrol:**
- [ ] HookService.registerHook() çalışıyor
- [ ] Trigger conditions doğru değerlendiriliyor
- [ ] Actions execute ediliyor
- [ ] hooks.json'dan yükleniyor
- [ ] Console'da hook logs var

---

## 🔗 MCP (Model Context Protocol) SİSTEMİ

### 9. MCP AGENT'LAR (6 Adet)

#### MCP 1: CryptoAgent
**Dosya:** `src/mcp/CryptoAgent.ts`
**Kullanıldığı Sayfa:** P201 (Stonks)
**İşlevi:** CoinGecko API'den kripto fiyatları çeker

**Test:**
1. P201'e git
2. Bitcoin, Ethereum, Cardano fiyatları görünmeli
3. 24h değişim yüzdeleri görünmeli
4. "REFRESH" butonu çalışmalı
5. Loading state görünmeli

**Teknik:**
- [ ] CryptoAgent.getTopCryptos() çalışıyor
- [ ] API timeout handling var
- [ ] Error state gösteriliyor
- [ ] Data caching aktif

#### MCP 2: IoTAgent
**Dosya:** `src/mcp/IoTAgent.ts`
**Kullanıldığı Sayfa:** P801 (TeleHome)
**İşlevi:** Smart home cihazlarını simüle eder

**Test:**
1. P801'e git
2. 5-6 IoT cihaz listesi görünmeli (Lights, Thermostat, vb.)
3. ON/OFF toggle çalışmalı
4. Cihaz durumları değişmeli
5. Sıcaklık ayarı çalışmalı

**Teknik:**
- [ ] IoTAgent.getDevices() çalışıyor
- [ ] toggleDevice() state güncelliyor
- [ ] localStorage'da cihaz durumları
- [ ] Real-time updates

#### MCP 3: WaybackAgent
**Dosya:** `src/mcp/WaybackAgent.ts`
**Kullanıldığı Sayfa:** P802 (Time Machine)
**İşlevi:** Wayback Machine API simülasyonu

**Test:**
1. P802'ye git
2. URL input alanı var
3. Tarih seçici çalışıyor
4. "FETCH SNAPSHOT" butonu aktif
5. Historical data görünüyor

**Teknik:**
- [ ] WaybackAgent.getSnapshot() çalışıyor
- [ ] Date validation var
- [ ] Mock data döndürüyor
- [ ] Error handling

#### MCP 4: FileSystemAgent ⭐ YENİ
**Dosya:** `src/mcp/FileSystemAgent.ts`
**Kullanıldığı Sayfa:** P905 (Local Ghost)
**İşlevi:** Proje dosya yapısını gösterir

**Test:**
1. P905'e git
2. "FILE TREE" sekmesi:
   - Klasör yapısı görünüyor (📁 src/, 📁 public/)
   - Dosyalar görünüyor (📄 App.tsx, 📄 index.css)
   - Renkler doğru (cyan=klasör, green=dosya)
3. "SYSTEM LOGS" sekmesi:
   - Log entries görünüyor
   - Timestamp'ler var
   - Level renkleri (ERROR=red, WARN=yellow, INFO=green)
   - Son 20 log görünüyor

**Teknik:**
- [ ] FileSystemAgent.getFileTree() çalışıyor
- [ ] generateTreeView() ASCII tree üretiyor
- [ ] getRecentLogs() log array döndürüyor
- [ ] Mock data realistic

#### MCP 5: BrowserAgent ⭐ YENİ
**Dosya:** `src/mcp/BrowserAgent.ts`
**Kullanıldığı Sayfa:** P805 (The Renderer)
**İşlevi:** Web sayfalarını text-only'ye çevirir

**Test:**
1. P805'e git
2. URL input: "example.com" yaz
3. "FETCH" butonuna bas
4. Loading state görünmeli
5. Sonuç:
   - HTML stripped (sadece text)
   - UPPERCASE'e çevrilmiş
   - Linkler numaralandırılmış [1], [2]
   - 40 karakter satır limiti
6. Numbered link'e tıkla, o URL'e git

**Teknik:**
- [ ] BrowserAgent.fetchAndConvert() çalışıyor
- [ ] HTML parsing (strip tags)
- [ ] Text transformation (uppercase)
- [ ] Link extraction ve numbering
- [ ] Error handling (invalid URL)

#### MCP 6: MemoryAgent ⭐ YENİ
**Dosya:** `src/mcp/MemoryAgent.ts`
**Kullanıldığı Sayfa:** P105 (Memory Vault)
**İşlevi:** Kullanıcı aktivitelerini hatırlar

**Test:**
1. P105'e git
2. Chat interface görünüyor
3. Soru sor: "What did I do in Zone 200?"
4. AI cevap vermeli
5. Cevap sarı highlight ile "RECALL ACTIVE" göstermeli
6. "RECENT MEMORIES" listesi güncellenm eli
7. "CLEAR MEMORIES" butonu çalışmalı

**Teknik:**
- [ ] MemoryAgent.ask() çalışıyor
- [ ] saveMemory() localStorage'a yazıyor
- [ ] searchMemories() context buluyor
- [ ] generateAnswer() AI response üretiyor
- [ ] Conversation history tutuluyor

---

### 10. MCP CHAIN EXECUTION
**Dosya:** `src/mcp/ChainExecutor.ts`
**Spec:** `.kiro/mcp/workflows/*.yaml`

**Crypto Intelligence Workflow:**
1. CryptoAgent: Fiyat çek
2. Analiz: Trend belirle
3. Notification: Alert gönder

**Truth Pipeline Workflow:**
1. Fetch news (HackerNews)
2. AI Analysis (bias detection)
3. Credibility score
4. Display results

**Test:**
- [ ] ChainExecutor.execute() çalışıyor
- [ ] Agent'lar sırayla çalışıyor
- [ ] Data pipeline doğru
- [ ] Error handling her step'te

