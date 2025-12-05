# Manuel Test Rehberi - Ceefax 2077

## 🚀 Server Çalışıyor!
**URL:** http://localhost:5173/

---

## ⚡ Hızlı Test Listesi (5 Dakika)

### 1. İLK YÜKLEME (30 saniye)
- [ ] Sayfa açılıyor mu?
- [ ] BIOS boot animasyonu görünüyor mu?
- [ ] Sayfa 100'e yönlendiriyor mu?
- [ ] Header'da "CEEFAX 2077" yazıyor mu?
- [ ] Fastext footer (4 renkli buton) görünüyor mu?

### 2. TEMEL NAVİGASYON (1 dakika)
- [ ] Klavyeden "2", "0", "0" yazınca sayfa 200'e gidiyor mu?
- [ ] Fastext butonlarına tıklayınca sayfa değişiyor mu?
- [ ] Header'da sayfa numarası güncellenıyor mu? (P100, P200, vb.)
- [ ] Saat ve tarih doğru görünüyor mu?

### 3. YENİ MCP SAYFALARI (2 dakika)

#### Page 105: Memory Vault 🧠
- [ ] "1", "0", "5" yazarak sayfaya git
- [ ] Chat arayüzü görünüyor mu?
- [ ] "What did I do?" diye sor
- [ ] Cevap geliyor mu?
- [ ] "RECALL ACTIVE" sarı renkte görünüyor mu?

#### Page 805: The Renderer 🌐
- [ ] "8", "0", "5" yazarak sayfaya git
- [ ] URL input alanı var mı?
- [ ] "example.com" yaz ve FETCH'e tıkla
- [ ] Metin dönüşümü çalışıyor mu?
- [ ] Linkler numaralandırılmış mı? [1], [2], vb.

#### Page 905: Local Ghost 👻
- [ ] "9", "0", "5" yazarak sayfaya git
- [ ] FILE TREE / SYSTEM LOGS butonları var mı?
- [ ] FILE TREE'de dosya yapısı görünüyor mu?
- [ ] SYSTEM LOGS'da log kayıtları var mı?
- [ ] Renkler doğru mu? (yeşil=dosya, cyan=klasör, kırmızı=hata)

### 4. ZONE 666 - GLITCH MODE (1 dakika)
- [ ] "6", "6", "6" yazarak sayfaya git
- [ ] Ekran kırmızıya dönüyor mu?
- [ ] "TRAPPED" mesajı görünüyor mu?
- [ ] 10 saniye bekle - "ESCAPE WINDOW OPEN" yazısı çıkıyor mu?
- [ ] "1", "0", "0" yazınca Zone 100'e dönüyor mu?

### 5. VİZUEL KONTROL (30 saniye)
- [ ] CRT scanlines (tarama çizgileri) görünüyor mu?
- [ ] Font VT323 (retro teletext) mi?
- [ ] Her zone farklı renk şeması kullanıyor mu?
  - Zone 100: Mavi/Sarı
  - Zone 200: Altın/Siyah
  - Zone 300: Magenta/Cyan
  - Zone 400: Yeşil/Beyaz
  - Zone 500: Kırmızı/Sarı
  - Zone 666: Koyu Kırmızı
  - Zone 800: Cyan/Beyaz
  - Zone 900: Gri/Cyan

---

## 📋 Detaylı Test Listesi (Tüm Sayfalar)

### Zone 100: TRUTH (Mavi/Sarı)
- [ ] **P100** - Truth Hub: Ana menü çalışıyor
- [ ] **P101** - Global Wire: HackerNews haberleri yükleniyor
- [ ] **P102** - Lie Detector: URL analizi çalışıyor
- [ ] **P105** - Memory Vault: Chat ve hafıza sistemi çalışıyor ⭐

### Zone 200: SYSTEM (Altın/Siyah)
- [ ] **P200** - System Hub: Ana menü çalışıyor
- [ ] **P201** - Stonks: Kripto fiyatları yükleniyor
- [ ] **P202** - Code Exorcist: Kod analizi çalışıyor
- [ ] **P204** - Oracle of Doom: Tahminler üretiliyor
- [ ] **P205** - The Basilisk: AI tehdit simülasyonu çalışıyor

### Zone 300: PULSE (Magenta/Cyan)
- [ ] **P300** - Pulse Hub: Ana menü çalışıyor
- [ ] **P301** - The Blast: Viral içerik üretiliyor
- [ ] **P304** - Soul Weight: Sosyal kredi hesaplanıyor

### Zone 400: PLANET (Yeşil/Beyaz)
- [ ] **P400** - Planet Hub: Ana menü çalışıyor
- [ ] **P401** - EcoSense: Çevre verileri görünüyor
- [ ] **P403** - Plan B: Mars karşılaştırması çalışıyor
- [ ] **P405** - Shelter Seeker: ASCII harita üretiliyor

### Zone 500: SHIELD (Kırmızı/Sarı)
- [ ] **P500** - Shield Hub: Ana menü çalışıyor
- [ ] **P501** - Crime Watch: Suç verileri görünüyor
- [ ] **P502** - Scam Buster: Dolandırıcılık tespiti çalışıyor
- [ ] **P503** - Pocket Lawyer: Hukuki tavsiye üretiliyor
- [ ] **P504** - SOS Beacon: Acil durum sistemi çalışıyor

### Zone 666: GLITCH (Koyu Kırmızı)
- [ ] **P666** - Glitch Mode: Korku efektleri çalışıyor

### Zone 800: HOME (Cyan/Beyaz)
- [ ] **P800** - Home Hub: Ana menü çalışıyor
- [ ] **P801** - TeleHome: IoT cihaz kontrolü çalışıyor
- [ ] **P802** - Time Machine: Wayback Machine çalışıyor
- [ ] **P803** - PixelGen: Generative art üretiliyor
- [ ] **P805** - The Renderer: Web tarayıcı çalışıyor ⭐

### Zone 900: THEMES (Gri/Cyan)
- [ ] **P905** - Local Ghost: Dosya sistemi görünüyor ⭐
- [ ] **P906** - Tape Library: VHS kayıt sistemi çalışıyor
- [ ] **P907** - Hook Dashboard: Agent hooks görünüyor

---

## 🐛 Hata Kontrolü

### Console'da Hata Var mı?
1. F12 tuşuna bas (Developer Tools)
2. Console sekmesine git
3. Kırmızı hata mesajları var mı?

### Yaygın Sorunlar:
- **Sayfa yüklenmiyor**: API timeout olabilir, refresh dene
- **Fastext çalışmıyor**: onClick handler'lar kontrol et
- **Glitch efektleri yok**: CSS animasyonları yüklendi mi?
- **MCP sayfaları boş**: Agent'lar doğru import edilmiş mi?

---

## ✅ Başarı Kriterleri

### Minimum (Geçer Not):
- [x] Build başarılı (TypeScript hatasız)
- [ ] Tüm 28 sayfa yükleniyor
- [ ] Temel navigasyon çalışıyor
- [ ] 3 yeni MCP sayfası çalışıyor

### İdeal (Tam Puan):
- [ ] Tüm API'ler çalışıyor
- [ ] Tüm efektler görünüyor (CRT, VHS, Glitch)
- [ ] Narrator sistemi çalışıyor
- [ ] Agent hooks tetikleniyor
- [ ] Performans hedefleri tutturuluyor (< 3s yükleme)

---

## 📊 Test Sonuçları

### Çalışan Özellikler:
- ✅ Build: PASSING
- ⏳ Navigation: TEST EDİLECEK
- ⏳ MCP Pages: TEST EDİLECEK
- ⏳ Visual Effects: TEST EDİLECEK

### Bulunan Hatalar:
_(Test sırasında doldurun)_

---

## 🎯 Yarışma İçin Önemli Noktalar

1. **3 Yeni MCP Sayfası**: 105, 805, 905 - Bunlar teknik derinliği gösteriyor
2. **28 Sayfa**: Her biri farklı işlevsellik - Kapsamlı proje
3. **17 AI Persona**: Steering docs ile - Kiro entegrasyonu
4. **Strict Teletext Format**: 40×24 grid - Görsel tutarlılık
5. **Retro Aesthetic**: CRT efektleri - Özgün tasarım

---

**Test başarıyla tamamlandığında bu dosyayı güncelleyin!** ✅
