# 🧪 Ceefax 2077 - Comprehensive Testing Checklist

## 🚀 Başlangıç

### 1. Projeyi Çalıştır
```bash
cd ceefax-2077
npm run dev
```

### 2. Tarayıcıda Aç
- URL: `http://localhost:5173`
- Console'u aç (F12) - Hataları kontrol et

---

## ✅ GENEL KONTROLLER (Her Sayfa İçin)

### Visual (Görsel)
- [ ] **40×24 Grid**: Sayfa grid'e sığıyor mu? Scroll var mı?
- [ ] **VT323 Font**: Font doğru mu?
- [ ] **Zone Renkleri**: Header rengi zone'a uygun mu?
- [ ] **Fastext Footer**: Alt kısımda 4 renkli buton var mı?
- [ ] **Responsive**: Pencere boyutu değişince düzgün çalışıyor mu?

### Functional (İşlevsel)
- [ ] **Sayfa Yükleniyor**: Loading state var mı?
- [ ] **Hata Yok**: Console'da error var mı?
- [ ] **Navigation**: Fastext butonları çalışıyor mu?
- [ ] **Keyboard**: Sayı tuşları ile navigasyon çalışıyor mu?

---

## 📋 ZONE-BY-ZONE TEST PLANI

### 🔵 ZONE 100: TRUTH (Blue/Yellow)

#### Page 100 - TruthHub
- [ ] Sayfa yükleniyor
- [ ] 3 news item görünüyor
- [ ] Her item'da başlık, özet, kaynak var
- [ ] Credibility score gösteriliyor
- [ ] Bias detection çalışıyor
- [ ] Renk: Blue header (#0066CC)

#### Page 101 - GlobalWire
- [ ] Breaking news feed görünüyor
- [ ] AI analysis çalışıyor
- [ ] Fact-check sonuçları gösteriliyor
- [ ] Timestamp'ler doğru
- [ ] Auto-refresh çalışıyor (varsa)

#### Page 103 - LieDetector
- [ ] Text input alanı var
- [ ] "Analyze" butonu çalışıyor
- [ ] Credibility score hesaplanıyor
- [ ] Bias indicators gösteriliyor
- [ ] Sonuçlar okunabilir

#### ⭐ Page 105 - MemoryVault (YENİ!)
- [ ] Chat interface görünüyor
- [ ] Input alanı çalışıyor
- [ ] "Ask" butonu aktif
- [ ] Soru sorulabiliyor
- [ ] AI cevap veriyor
- [ ] [RECALL ACTIVE] sarı highlight gösteriliyor
- [ ] Recent memories listesi görünüyor
- [ ] "Clear Memories" butonu çalışıyor
- [ ] localStorage'da memory kaydediliyor

---

### 🟡 ZONE 200: SYSTEM (Gold/Black)

#### Page 200 - SystemHub
- [ ] Hub menüsü görünüyor
- [ ] 5 sub-page linki var
- [ ] Zone açıklaması okunabilir
- [ ] Renk: Gold header (#FFD700)

#### Page 201 - Stonks
- [ ] Bitcoin fiyatı gösteriliyor
- [ ] Price chart/graph var
- [ ] % değişim gösteriliyor
- [ ] Market sentiment gösteriliyor
- [ ] Real-time update çalışıyor (varsa)

#### Page 202 - CodeExorcist
- [ ] Code input alanı var
- [ ] "Analyze" butonu çalışıyor
- [ ] Bug detection çalışıyor
- [ ] Suggestions gösteriliyor
- [ ] Syntax highlighting var mı?

#### Page 204 - OracleOfDoom
- [ ] Prediction listesi görünüyor
- [ ] Probability scores gösteriliyor
- [ ] Timeline gösteriliyor
- [ ] Ominous vibe var mı?

#### Page 205 - TheBasilisk
- [ ] Warning message gösteriliyor
- [ ] AI threat level gösteriliyor
- [ ] Roko's Basilisk referansı var
- [ ] Creepy atmosphere var mı?

---

### 🔴 ZONE 300: PULSE (Magenta/Cyan)

#### Page 300 - PulseHub
- [ ] Social feed görünüyor
- [ ] Trending topics var
- [ ] Zone açıklaması okunabilir
- [ ] Renk: Magenta header (#FF1493)

#### Page 301 - TheBlast
- [ ] Social posts görünüyor
- [ ] **`>` bullets kullanılıyor** (NOT `*`)
- [ ] Viral score gösteriliyor
- [ ] Engagement metrics var

#### Page 304 - SoulWeight
- [ ] Social credit score gösteriliyor
- [ ] Breakdown by category var
- [ ] Recommendations gösteriliyor
- [ ] Dystopian vibe var mı?

---

### 🟢 ZONE 400: PLANET (Green/White)

#### Page 400 - PlanetHub
- [ ] Climate dashboard görünüyor
- [ ] Key metrics gösteriliyor
- [ ] Zone açıklaması okunabilir
- [ ] Renk: Green header (#00CC66)

#### Page 401 - EcoSense
- [ ] Environmental data gösteriliyor
- [ ] CO2 levels, temperature var
- [ ] Tipping points gösteriliyor
- [ ] Urgency vibe var mı?

#### Page 403 - PlanB
- [ ] Planet selector çalışıyor (← → arrows)
- [ ] 3D ASCII planet görünüyor
- [ ] Habitability score gösteriliyor
- [ ] Mars rover data gösteriliyor (Mars için)
- [ ] NASA API çalışıyor
- [ ] Progress bar animasyonlu

#### Page 405 - ShelterSeeker
- [ ] ASCII map görünüyor (20×20 grid)
- [ ] Markers clickable (W, P, M, S)
- [ ] Legend gösteriliyor
- [ ] Selected shelter info gösteriliyor
- [ ] "Regenerate Map" butonu çalışıyor
- [ ] Emergency vibe var mı?

---

### 🔴 ZONE 500: SHIELD (Red/Yellow)

#### Page 500 - ShieldHub
- [ ] Security dashboard görünüyor
- [ ] Threat level gösteriliyor
- [ ] Zone açıklaması okunabilir
- [ ] Renk: Red header (#CC0000)

#### Page 501 - CrimeWatch
- [ ] Crime alerts görünüyor
- [ ] Location data var
- [ ] Severity levels gösteriliyor
- [ ] Real-time updates var mı?

#### Page 502 - ScamBuster
- [ ] Scam detection çalışıyor
- [ ] URL/text input var
- [ ] Risk score gösteriliyor
- [ ] Warning messages gösteriliyor

#### Page 503 - PocketLawyer
- [ ] Legal advice interface var
- [ ] Question input çalışıyor
- [ ] AI legal responses gösteriliyor
- [ ] Disclaimer var mı?

#### Page 504 - SOSBeacon
- [ ] Emergency interface görünüyor
- [ ] Location sharing var
- [ ] Emergency contacts gösteriliyor
- [ ] Panic button çalışıyor

---

### 🔴 ZONE 666: GLITCH (Dark Red)

#### Page 666 - GlitchMode
- [ ] **Glitch effects CONTAINER'da** (content'te değil)
- [ ] 40×24 grid korunuyor
- [ ] Corrupted text gösteriliyor
- [ ] Trap timer çalışıyor (10 saniye)
- [ ] Escape attempts sayılıyor
- [ ] Red pulsing background var
- [ ] Static flashes oluyor
- [ ] Horror vibe var mı?
- [ ] 10 saniye sonra escape mümkün mü?

---

### 🔵 ZONE 800: HOME (Cyan/White)

#### Page 800 - HomeHub
- [ ] Custom Frankenstein layout çalışıyor
- [ ] IoT device listesi var
- [ ] Zone açıklaması okunabilir
- [ ] Renk: Cyan header (#00CCCC)

#### Page 801 - TeleHome
- [ ] Custom IoT layout çalışıyor
- [ ] Device controls var
- [ ] Status indicators çalışıyor
- [ ] Real-time updates var mı?

#### Page 802 - TimeMachine
- [ ] Custom Wayback layout çalışıyor
- [ ] URL input var
- [ ] Date selector çalışıyor
- [ ] Archive data gösteriliyor

#### Page 803 - PixelGen
- [ ] Prompt input alanı var
- [ ] "Generate" butonu çalışıyor
- [ ] AI image generation çalışıyor
- [ ] ASCII art conversion gösteriliyor
- [ ] Line-by-line rendering animasyonlu
- [ ] Suggestions clickable
- [ ] Stats gösteriliyor (40×24, 960 chars, 8 colors)

#### ⭐ Page 805 - TheRenderer (YENİ!)
- [ ] Address bar görünüyor
- [ ] URL input çalışıyor
- [ ] "Go" butonu aktif
- [ ] Bookmarks clickable
- [ ] Page loading animasyonu var
- [ ] Modern web → Teletext conversion çalışıyor
- [ ] Content uppercase ve 40 char/line
- [ ] Numbered links [1], [2], [3] gösteriliyor
- [ ] Link navigation çalışıyor
- [ ] Cache çalışıyor (5 min)

---

### ⚫ ZONE 900: THEMES (Grey/Cyan)

#### ⭐ Page 904 - LocalGhost (YENİ!)
- [ ] View toggle çalışıyor (Tree/Logs)
- [ ] FILE TREE görünüyor
- [ ] ASCII tree structure doğru
- [ ] Folder/file icons var (📁/📄)
- [ ] SYSTEM LOGS görünüyor
- [ ] Log levels color-coded (GREEN/YELLOW/RED)
- [ ] Timestamps gösteriliyor
- [ ] Stats gösteriliyor (Files/Dirs/Size)
- [ ] System vibe var mı?

#### Page 905 - ThemeSelector
- [ ] 4 theme görünüyor (Classic, Vaporwave, Noir, Amber)
- [ ] Theme preview çalışıyor
- [ ] Color swatches gösteriliyor
- [ ] Active theme highlighted
- [ ] Click ile theme değişiyor
- [ ] Tüm sayfa renkleri değişiyor
- [ ] localStorage'da kaydediliyor

#### Page 906 - TapeLibrary
- [ ] VHS tape listesi görünüyor
- [ ] Tape details gösteriliyor (wear, plays, etc)
- [ ] "Play" butonu çalışıyor
- [ ] "Delete" butonu çalışıyor
- [ ] Degradation info gösteriliyor
- [ ] Empty state gösteriliyor (tape yoksa)

#### Page 907 - HookDashboard
- [ ] Hook listesi görünüyor
- [ ] Active/Inactive status gösteriliyor
- [ ] Toggle butonu çalışıyor
- [ ] Logs görünüyor
- [ ] Stats gösteriliyor (Active/Total/Success)
- [ ] View toggle çalışıyor (Hooks/Logs)

---

## 🎮 ÖZEL ÖZELLİKLER

### Keyboard Navigation
- [ ] **Sayı tuşları**: 100, 200, 300, etc. ile navigasyon
- [ ] **Enter**: Sayfa değiştir
- [ ] **Backspace**: Input buffer temizle
- [ ] **R tuşu**: VHS recording başlat (herhangi bir sayfada)
- [ ] **ESC**: VHS playback durdur

### VHS Memory System
- [ ] Herhangi bir sayfada **R** tuşuna bas
- [ ] Recording başlıyor mu?
- [ ] Tape Library'de (906) tape görünüyor mu?
- [ ] Tape play edilebiliyor mu?
- [ ] Chromatic aberration artıyor mu (her play'de)?
- [ ] Max 12 tape limiti çalışıyor mu?

### Agent Hooks
- [ ] 10 hook görünüyor mu? (907'de)
- [ ] Enable/Disable çalışıyor mu?
- [ ] Hooks otomatik execute oluyor mu?
- [ ] Logs kaydediliyor mu?
- [ ] Konami code çalışıyor mu? (↑↑↓↓←→←→BA)

### Theme Engine
- [ ] 4 theme arasında geçiş çalışıyor mu?
- [ ] Tüm sayfalar theme'e uyuyor mu?
- [ ] localStorage'da persist ediyor mu?
- [ ] Page reload sonrası theme korunuyor mu?

### Dual Boot System
- [ ] BIOS boot screen gösteriliyor mu?
- [ ] Consumer/SysAdmin seçimi çalışıyor mu?
- [ ] Zone restrictions çalışıyor mu?
- [ ] Biometric gate gösteriliyor mu? (Zone 500+)

### Narrator System
- [ ] Narrator toggle butonu görünüyor mu? (sağ alt)
- [ ] Click ile açılıp kapanıyor mu?
- [ ] Text-to-speech çalışıyor mu? (varsa)

---

## 🐛 COMMON ISSUES (Sık Karşılaşılan Sorunlar)

### Visual Issues
- [ ] **Scroll bar görünüyor**: Content 40×24'e sığmıyor
- [ ] **Font yanlış**: VT323 yüklenmemiş
- [ ] **Renkler yanlış**: Zone detection çalışmıyor
- [ ] **Layout bozuk**: Inline styles eksik

### Functional Issues
- [ ] **Console errors**: Import/export hataları
- [ ] **Page yüklenmiyor**: Component crash
- [ ] **Navigation çalışmıyor**: Routing hatası
- [ ] **Data gösterilmiyor**: Service/API hatası

### Performance Issues
- [ ] **Yavaş yükleme**: Bundle size büyük
- [ ] **Lag var**: Re-render problemi
- [ ] **Memory leak**: useEffect cleanup eksik

---

## 📊 FINAL CHECKLIST

### Critical (Mutlaka Çalışmalı)
- [ ] Tüm 31 sayfa yükleniyor (28 sub-page + 3 yeni MCP)
- [ ] Navigation çalışıyor (keyboard + fastext)
- [ ] Visual consistency (40×24 grid, VT323 font)
- [ ] No console errors
- [ ] Zone colors doğru

### Important (Önemli)
- [ ] VHS recording/playback çalışıyor
- [ ] Theme switching çalışıyor
- [ ] Agent hooks çalışıyor
- [ ] 3 yeni MCP page çalışıyor (904, 805, 105)
- [ ] Responsive design çalışıyor

### Nice to Have (Olsa İyi)
- [ ] Narrator çalışıyor
- [ ] Konami code çalışıyor
- [ ] Biometric gate çalışıyor
- [ ] All animations smooth

---

## 🎯 TEST SONUÇLARI

### Çalışan Sayfalar: ___/31
### Kritik Hatalar: ___
### Minor Hatalar: ___
### Performance: ⭐⭐⭐⭐⭐

---

## 📝 NOTLAR

Test sırasında bulduğun sorunları buraya yaz:

```
Sayfa: ___
Sorun: ___
Çözüm: ___
```

---

## ✅ HIZLI TEST (5 Dakika)

Zamanın yoksa sadece bunları test et:

1. **Page 100** - Ana sayfa yükleniyor mu?
2. **Page 666** - Glitch effects çalışıyor mu?
3. **Page 904** - LocalGhost file tree gösteriliyor mu?
4. **Page 805** - TheRenderer URL fetch çalışıyor mu?
5. **Page 105** - MemoryVault chat çalışıyor mu?
6. **Keyboard** - Sayı tuşları ile navigasyon çalışıyor mu?
7. **Theme** - Theme değiştirme çalışıyor mu?
8. **VHS** - R tuşu ile recording çalışıyor mu?

Hepsi ✅ ise: **PRODUCTION READY!** 🎉

---

**Test başarılar! 🚀**
