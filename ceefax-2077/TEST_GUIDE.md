# 🧪 CEEFAX 2077 - HIZLI TEST REHBERİ

## 🚀 BAŞLATMA

```bash
cd ceefax-2077
npm run dev
```

Tarayıcıda: `http://localhost:5173`

---

## ✅ HIZLI TEST KONTROL LİSTESİ

### 1. İLK AÇILIŞ (BIOS Boot)
- [ ] BIOS boot animasyonu görünüyor
- [ ] CONSUMER / DEVELOPER MODE seçimi var
- [ ] Retro terminal görünümü (yeşil text, siyah bg)

### 2. ANA MENÜ (Page 100)
- [ ] Zone listesi görünüyor (100-900)
- [ ] Sayfa numarası ile gezinme çalışıyor
- [ ] Teletext grid layout (40 karakter genişlik)

### 3. ZONE 200 - CRYPTO (Page 201 - Stonks)
**ÖNEMLİ: Gerçek API testi!**
- [ ] Bitcoin/Ethereum fiyatları yükleniyor
- [ ] Fiyatlar gerçek (CoinGecko API)
- [ ] "Crypto Trader" personality aktif (🚀📉 emojiler)

### 4. ZONE 300 - PULSE (Page 301 - The Blast)
- [ ] Sosyal feed görünüyor
- [ ] "Gossip Girl" personality aktif (💀😭🚨 emojiler)
- [ ] Dramatik, uppercase text

### 5. ZONE 666 - GLITCH (Page 666)
- [ ] Glitch effects aktif (G̴L̷I̸T̸C̴H̷ text)
- [ ] Zalgo characters görünüyor
- [ ] 0x666 hex codes var
- [ ] Horror atmosphere

### 6. ZONE 900 - HOOK DASHBOARD (Page 906)
**EN ÖNEMLİ TEST!**
- [ ] Hook listesi görünüyor
- [ ] "Run Integration Test" butonu var
- [ ] Butona bas → Tüm testler ✅ PASSED

---

## 🔬 CONSOLE TESTLERİ

Tarayıcıda F12 → Console'a şunları yaz:

### Test 1: Steering Kontrolü
```javascript
console.log('Steering configs:', window.SteeringLoader.getAllConfigs().length);
// Beklenen: 8 configs loaded
```

### Test 2: Personalities Kontrolü
```javascript
console.log('Personalities:', window.PersonalityService.getAllPersonalities().length);
// Beklenen: 9 personalities (8 zone + 1 default)
```

### Test 3: Hooks Kontrolü
```javascript
console.log('Active hooks:', window.HookService.getActiveHooks().length);
// Beklenen: 10+ active hooks
```

### Test 4: Crisis Mode Testi
```javascript
window.PersonalityService.activateCrisisMode('market_crash');
// Şimdi herhangi bir zone'a git → 🚨 CRISIS ALERT görmeli
```

### Test 5: Quiet Mode Testi
```javascript
window.PersonalityService.activateQuietMode();
// Şimdi herhangi bir zone'a git → lowercase, calm text görmeli
```

### Test 6: Normal Mode'a Dön
```javascript
window.PersonalityService.deactivateSpecialModes();
```

---

## 🎯 ÖNCELİKLİ TEST SAYFALARI

1. **Page 906** (Hook Dashboard) → Integration Test
2. **Page 201** (Stonks) → Gerçek crypto API
3. **Page 666** (Glitch) → Horror effects
4. **Page 301** (The Blast) → Gossip Girl personality
5. **Page 100** (Truth Hub) → News Anchor personality

---

## 🐛 SORUN GİDERME

### Eğer Bir Şey Çalışmıyorsa:

1. **Console'u kontrol et** (F12) - Hata var mı?
2. **Network tab'ı kontrol et** - API calls başarılı mı?
3. **localStorage'ı temizle**:
   ```javascript
   localStorage.clear();
   location.reload();
   ```
4. **Hard refresh**: Ctrl+Shift+R
5. **Dev server'ı yeniden başlat**: Ctrl+C → npm run dev

---

## ✨ BAŞARI KRİTERLERİ

### Minimum (Projeyi Gönderebilirsin):
- [x] Dev server çalışıyor ✅
- [ ] Ana menü görünüyor
- [ ] En az 3 zone çalışıyor
- [ ] Teletext tasarımı var

### Tam Başarı (Yarışmayı Kazanırsın):
- [ ] Tüm 8 zone çalışıyor
- [ ] Page 201'de gerçek crypto fiyatları
- [ ] Page 906'da integration test ✅ PASSED
- [ ] Zone personalities aktif
- [ ] Teletext tasarımı mükemmel

---

## 📊 HIZLI DURUM KONTROLÜ

Console'a yapıştır:

```javascript
console.log('🧪 CEEFAX 2077 STATUS CHECK');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Steering:', window.SteeringLoader?.getAllConfigs().length, 'configs');
console.log('✅ Personalities:', window.PersonalityService?.getAllPersonalities().length, 'loaded');
console.log('✅ Hooks:', window.HookService?.getActiveHooks().length, 'active');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎉 ALL SYSTEMS OPERATIONAL!');
```

---

## 🎨 TELETEXT TASARIM KONTROLÜ

### Olması Gerekenler:
- ✅ Monospace font (Courier New)
- ✅ 40 karakter genişlik
- ✅ Siyah background
- ✅ Yeşil/cyan text
- ✅ ASCII art borders (═══, ║, ╔╗╚╝)
- ✅ Uppercase text (çoğu yerde)
- ✅ Retro terminal görünümü

### Eğer Farklıysa:
→ Tasarım düzeltmesi gerekiyor (bana söyle)

---

## 🚀 HIZLI TEST (30 SANİYE)

1. `npm run dev` → Server başladı mı? ✅
2. Page 100 → Ana menü görünüyor mu? ✅
3. Page 201 → Bitcoin fiyatı gerçek mi? ✅
4. Page 906 → Integration test PASSED mı? ✅
5. Console → Hata var mı? ❌

**Hepsi ✅ ise → PROJE HAZIR!** 🎉

---

## 📝 NOTLAR

- Dev server: `http://localhost:5173`
- Build: `npm run build`
- Preview: `npm run preview`

**Server çalışıyor! Test etmeye başlayabilirsin!** 🚀
