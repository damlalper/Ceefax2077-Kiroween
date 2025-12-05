2# Komple Test Spesifikasyonu - Part 1: Genel Sistem

## 🎯 GENEL SİSTEM TESTLERİ

### 1. İLK YÜKLEME (BIOS Boot)
**Dosya:** `src/components/BiosBootLoader.tsx`
**Context:** `src/context/BootContext.tsx`

**Test Adımları:**
1. Sayfayı aç: http://localhost:5173/
2. BIOS boot ekranı görünmeli (siyah ekran, yeşil yazılar)
3. Boot mesajları sırayla görünmeli:
   - "SYSTEM BOOT INITIATED..."
   - "LOADING CEEFAX 2077..."
   - "INITIALIZING TELETEXT PROTOCOL..."
   - "BOOT COMPLETE"
4. 3 saniye sonra otomatik olarak Page 100'e yönlenmeli

**Teknik Kontrol:**
- [ ] BootContext state yönetimi çalışıyor
- [ ] localStorage'da boot durumu kaydediliyor
- [ ] Animasyon smooth (CSS transitions)
- [ ] Console'da hata yok

---

### 2. TEMEL NAVİGASYON SİSTEMİ
**Dosya:** `src/context/TeletextContext.tsx`
**Layout:** `src/components/TeletextLayout.tsx`

**Test Adımları:**
1. Klavyeden "2", "0", "0" yaz
2. Header'da "P2__" → "P20_" → "P200" görünmeli
3. 3. digit sonrası otomatik sayfa değişimi olmalı
4. Fastext butonlarına tıkla (Kırmızı/Yeşil/Sarı/Cyan)
5. Her buton farklı sayfaya götürmeli

**Teknik Kontrol:**
- [ ] TeletextContext state yönetimi
- [ ] inputBuffer 3 digit'e kadar kabul ediyor
- [ ] navigateToPage fonksiyonu çalışıyor
- [ ] Fastext onClick handlers aktif
- [ ] URL değişiyor (React Router)

---

### 3. HEADER VE FOOTER (Her Sayfada)
**Dosya:** `src/components/TeletextLayout.tsx`

**Header Kontrolü:**
- [ ] Sol: Sayfa numarası (P100, P200, vb.)
- [ ] Orta: "CEEFAX 2077" (double-height)
- [ ] Sağ: Tarih ve saat (canlı güncelleniyor)
- [ ] Arka plan rengi zone'a göre değişiyor

**Footer Kontrolü (Fastext):**
- [ ] 4 buton yan yana
- [ ] Renkler: Kırmızı, Yeşil, Sarı, Cyan
- [ ] Her buton label'ı zone'a göre değişiyor
- [ ] Tıklanabilir ve çalışıyor

---

### 4. ZONE RENK SİSTEMİ
**Dosya:** `src/components/TeletextLayout.tsx` (getZoneTheme)

**Zone 100 (TRUTH):**
- Header: Mavi (#0066CC) / Sarı (#FFFF00)
- Fastext: TRUTH / SYSTM / PULSE / PLNET

**Zone 200 (SYSTEM):**
- Header: Altın (#FFD700) / Siyah (#000000)
- Fastext: TRUTH / STONKS / ORACLE / BASILISK

**Zone 300 (PULSE):**
- Header: Magenta (#FF1493) / Cyan (#00FFFF)
- Fastext: HUB / BLAST / SOUL / TRUTH

**Zone 400 (PLANET):**
- Header: Yeşil (#00CC66) / Beyaz (#FFFFFF)
- Fastext: HUB / ECOSENSE / PLAN-B / SHELTER

**Zone 500 (SHIELD):**
- Header: Kırmızı (#CC0000) / Sarı (#FFFF00)
- Fastext: HUB / CRIME / SCAM / SOS

**Zone 666 (GLITCH):**
- Header: Koyu Kırmızı (#660000) / Kırmızı (#FF0000)
- Fastext: ESCAPE? / NO EXIT / TRAPPED / VOID

**Zone 800 (HOME):**
- Header: Cyan (#00CCCC) / Beyaz (#FFFFFF)
- Fastext: HUB / TELEHOME / TIMEMACH / PIXELGEN

**Zone 900 (THEMES):**
- Header: Gri (#666666) / Cyan (#00FFFF)
- Fastext: THEMES / VHS / HOOKS / EXIT

---

### 5. VİZUEL EFEKTLERİ
**Dosya:** `src/index.css`

**CRT Scanlines:**
- [ ] Tüm ekranda yatay çizgiler görünüyor
- [ ] Hafif animasyon var (yukarı-aşağı hareket)
- [ ] Opacity düşük (0.1-0.2)

**VT323 Font:**
- [ ] Tüm metinler retro teletext fontu
- [ ] Monospace (eşit genişlik)
- [ ] Okunabilir boyutta

**40×24 Grid:**
- [ ] İçerik tam ekrana sığıyor
- [ ] Scroll bar YOK
- [ ] Overflow: hidden aktif

---

### 6. NARRATOR SİSTEMİ
**Dosya:** `src/services/NarratorService.ts`
**Hook:** `src/hooks/useNarrator.ts`
**Steering:** `.kiro/steering/*.md` (17 persona)

**Test Adımları:**
1. Sağ alt köşede 🔊/🔇 buton var mı?
2. Butona tıkla (toggle)
3. Sayfa değiştir
4. Ses çıkıyor mu? (Web Speech API)
5. Her zone farklı ses tonu kullanıyor mu?

**Persona Kontrolü:**
- Zone 100: News Anchor (profesyonel, nötr)
- Zone 200: Crypto Trader (agresif, heyecanlı)
- Zone 300: Gossip Girl (dedikodulu, eğlenceli)
- Zone 400: Climate Scientist (bilimsel, acil)
- Zone 500: Security Expert (ciddi, koruyucu)
- Zone 666: Demon (bozuk, tehditkar)
- Zone 800: Smart Home (yardımsever, teknik)
- Zone 900: SysAdmin (soğuk, robotik)

**Teknik Kontrol:**
- [ ] PersonalityService.getPersonalityForPage() çalışıyor
- [ ] transformText() metodu aktif
- [ ] Web Speech API destekleniyor
- [ ] Ses ayarları localStorage'da

---

### 7. VHS KAYIT SİSTEMİ
**Dosya:** `src/services/VHSService.ts`
**Component:** `src/components/VHSPlayback.tsx`
**Hook:** `src/hooks/useVHS.ts`

**Test Adımları:**
1. Page 906'ya git (Tape Library)
2. "START RECORDING" butonuna bas
3. Header'da kırmızı ● görünmeli
4. Birkaç sayfa gez
5. "STOP RECORDING" bas
6. Kayıt listesinde görünmeli
7. "PLAY" butonuna bas
8. Chromatic aberration efekti görünmeli (kırmızı/mavi kayma)

**Teknik Kontrol:**
- [ ] VHSService.startRecording() çalışıyor
- [ ] Snapshot'lar localStorage'a kaydediliyor
- [ ] Playback animasyonu smooth
- [ ] CSS filter: hue-rotate aktif

