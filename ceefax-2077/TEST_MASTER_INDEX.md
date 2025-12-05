# Test Master Index - Ceefax 2077

## 📚 Test Dokümantasyonu

Bu proje için 5 parçalı komple test spesifikasyonu hazırlandı:

### Part 1: Genel Sistem
**Dosya:** `COMPLETE_TEST_SPEC_PART1.md`
- İlk yükleme (BIOS Boot)
- Temel navigasyon sistemi
- Header ve Footer
- Zone renk sistemi
- Vizüel efektleri
- Narrator sistemi
- VHS kayıt sistemi

### Part 2: Agent Hooks & MCP
**Dosya:** `COMPLETE_TEST_SPEC_PART2.md`
- 10 Agent Hook detayları
- 6 MCP Agent detayları
- MCP Chain Execution
- Hook Dashboard (P907)

### Part 3: Zone 100-300
**Dosya:** `COMPLETE_TEST_SPEC_PART3.md`
- Zone 100: TRUTH (P100, P101, P102, P105)
- Zone 200: SYSTEM (P200, P201, P202, P204, P205)
- Zone 300: PULSE (P300, P301, P304)

### Part 4: Zone 400-666
**Dosya:** `COMPLETE_TEST_SPEC_PART4.md`
- Zone 400: PLANET (P400, P401, P403, P405)
- Zone 500: SHIELD (P500, P501, P502, P503, P504)
- Zone 666: GLITCH (P666)

### Part 5: Zone 800-900 & Kiro
**Dosya:** `COMPLETE_TEST_SPEC_PART5.md`
- Zone 800: HOME (P800, P801, P802, P803, P805)
- Zone 900: THEMES (P905, P906, P907)
- .kiro klasörü özellikleri
- Final checklist

---

## 🎯 Hızlı Test Sırası

### 1. Temel Sistem (5 dakika)
1. Sayfa aç → BIOS boot
2. Klavye navigasyonu test et
3. Fastext butonları test et
4. Zone renkleri kontrol et
5. CRT efektleri kontrol et

### 2. Yeni MCP Sayfaları (10 dakika) ⭐ ÖNEMLİ
1. **P105 - Memory Vault**: Chat, hafıza, recall
2. **P805 - The Renderer**: Web scraper, text-only
3. **P905 - Local Ghost**: File tree, system logs

### 3. Tüm Sayfalar (20 dakika)
- Zone 100: 4 sayfa
- Zone 200: 5 sayfa
- Zone 300: 3 sayfa
- Zone 400: 4 sayfa
- Zone 500: 5 sayfa
- Zone 666: 1 sayfa
- Zone 800: 5 sayfa
- Zone 900: 3 sayfa
**Toplam: 30 sayfa** (28 unique + 2 hub)

### 4. Agent Hooks (10 dakika)
1. P907'ye git
2. 10 hook listesini kontrol et
3. Toggle enable/disable test et
4. Execution counts kontrol et
5. Idle detection test et (5 dakika bekle)

### 5. Kiro Features (10 dakika)
1. Narrator toggle test et
2. VHS recording test et (P906)
3. Theme değiştir (P905)
4. Biometric gate test et (P500)
5. Auto-healer test et (network fail)

---

## 📊 Test Sonuçları Tablosu

| Kategori | Test Sayısı | Geçti | Başarısız | Durum |
|----------|-------------|-------|-----------|-------|
| Genel Sistem | 7 | - | - | ⏳ |
| Navigasyon | 5 | - | - | ⏳ |
| Zone 100 | 4 | - | - | ⏳ |
| Zone 200 | 5 | - | - | ⏳ |
| Zone 300 | 3 | - | - | ⏳ |
| Zone 400 | 4 | - | - | ⏳ |
| Zone 500 | 5 | - | - | ⏳ |
| Zone 666 | 1 | - | - | ⏳ |
| Zone 800 | 5 | - | - | ⏳ |
| Zone 900 | 3 | - | - | ⏳ |
| MCP Agents | 6 | - | - | ⏳ |
| Agent Hooks | 10 | - | - | ⏳ |
| Kiro Features | 5 | - | - | ⏳ |
| **TOPLAM** | **63** | **-** | **-** | **⏳** |

---

## 🐛 Bulunan Hatalar

_(Test sırasında doldurun)_

### Kritik
- [ ] -

### Yüksek
- [ ] -

### Orta
- [ ] -

### Düşük
- [ ] -

---

## ✅ Başarı Kriterleri

### Minimum (Geçer)
- [ ] Build başarılı
- [ ] 28 sayfa yükleniyor
- [ ] Temel navigasyon çalışıyor
- [ ] 3 yeni MCP sayfası çalışıyor

### İyi (Yüksek Puan)
- [ ] Tüm API'ler çalışıyor
- [ ] Tüm efektler görünüyor
- [ ] 10 hook çalışıyor
- [ ] 6 MCP agent çalışıyor

### Mükemmel (Tam Puan)
- [ ] Hiç hata yok
- [ ] Performans hedefleri tuttu
- [ ] Tüm Kiro features çalışıyor
- [ ] Accessibility OK
- [ ] Mobile responsive

---

## 📝 Test Notları

### Önemli Noktalar
1. **Zone 666**: Glitch efektleri container'da, content'te değil
2. **MCP Sayfaları**: 105, 805, 905 - Yarışma için kritik
3. **Agent Hooks**: P907'de tüm 10 hook görünmeli
4. **Narrator**: Zone değişiminde ses tonu değişmeli
5. **VHS**: Chromatic aberration efekti görünmeli

### Test Ortamı
- **Browser**: Chrome/Edge (latest)
- **URL**: http://localhost:5173/
- **DevTools**: Console açık (F12)
- **Network**: Throttling test için Slow 3G

### Performans Hedefleri
- Initial load: < 3s
- Page transition: < 500ms
- API response: < 2s
- Memory usage: < 100MB
- Bundle size: < 500KB

---

## 🚀 Test Başlatma

```bash
# Terminal 1: Development server
cd ceefax-2077
npm run dev

# Terminal 2: Build test
npm run build

# Browser
# http://localhost:5173/
```

---

## 📞 Sorun Giderme

### Sayfa yüklenmiyor
1. Console'da hata var mı?
2. Network tab'da failed requests?
3. npm run dev çalışıyor mu?

### API çalışmıyor
1. CORS hatası var mı?
2. API timeout ayarları?
3. Mock data fallback çalışıyor mu?

### Efektler görünmüyor
1. CSS yüklendi mi?
2. Browser compatibility?
3. GPU acceleration aktif mi?

---

**Test başarıyla tamamlandığında bu dosyayı güncelleyin!** ✅
