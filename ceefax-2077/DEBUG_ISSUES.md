# Debug Issues - Klavye Çalışmıyor

## Sorun
Klavyeden rakam girişi çalışmıyor, sayfa değişmiyor.

## Düzeltilen Hatalar

### 1. App.tsx - Yanlış Sayfa Numaraları
**Düzeltildi:**
- P102 (Lie Detector): `103` → `102`
- P905 (Local Ghost): `904` → `905`
- P904 (Theme Selector): `905` → `904`

## Test Adımları

### Console Kontrolü
1. Browser'da F12 bas
2. Console sekmesine git
3. Kırmızı hata var mı?
4. Klavyeden "1" bas
5. Console'da log görünüyor mu?

### Manuel Test
1. Sayfayı yenile (Ctrl+R)
2. BIOS boot ekranı görünmeli
3. 3 saniye sonra P100'e gitmeli
4. Klavyeden "2" bas
5. Header'da "P2__" görünmeli
6. "0" bas → "P20_"
7. "0" bas → "P200" ve sayfa değişmeli

### Debug Console Commands
Browser console'una yapıştır:

```javascript
// Test TeletextContext
const context = window.__REACT_DEVTOOLS_GLOBAL_HOOK__
console.log('Context available:', !!context)

// Test KeyboardListener
window.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key)
})

// Test addDigit manually
// (React DevTools gerekli)
```

## Olası Sorunlar

### 1. KeyboardListener Mount Olmuyor
**Kontrol:**
- App.tsx'te `<KeyboardListener />` var mı?
- Component render ediliyor mu?

**Çözüm:**
```tsx
// KeyboardListener.tsx'e log ekle
useEffect(() => {
  console.log('KeyboardListener mounted')
  // ...
}, [])
```

### 2. Event Listener Çalışmıyor
**Kontrol:**
- Browser focus doğru mu?
- Input field focus'ta mı? (olmamalı)

**Çözüm:**
- Sayfaya tıkla (focus ver)
- Input field varsa blur et

### 3. TeletextContext Yüklenmiyor
**Kontrol:**
- Provider hierarchy doğru mu?
- Context value undefined mı?

**Çözüm:**
```tsx
// App.tsx'te sıralama:
<ThemeProvider>
  <BootProvider>
    <TeletextProvider>
      <AppWithBoot />
    </TeletextProvider>
  </BootProvider>
</ThemeProvider>
```

### 4. BIOS Boot Takılı Kalmış
**Kontrol:**
- localStorage'da `ceefax_booted` var mı?
- `isBooted` state true mu?

**Çözüm:**
```javascript
// Console'da çalıştır:
localStorage.setItem('ceefax_booted', 'true')
location.reload()
```

## Hızlı Fix

Eğer hiçbir şey çalışmıyorsa:

```bash
# 1. Server'ı durdur
Ctrl+C

# 2. node_modules ve cache temizle
rm -rf node_modules
rm -rf dist
rm -rf .vite

# 3. Yeniden yükle
npm install

# 4. Build test
npm run build

# 5. Dev server başlat
npm run dev
```

## Console'da Görmemiz Gereken

### Başarılı Yükleme:
```
✓ PersonalityService loaded
✓ SteeringLoader initialized
✓ HookService registered 10 hooks
✓ TeletextContext mounted
✓ KeyboardListener mounted
✓ BIOS boot complete
```

### Klavye Basımı:
```
Key pressed: 2
addDigit: 2
inputBuffer: "2"
```

### Sayfa Değişimi:
```
goToPage: 200
currentPage: 200
Personality: Crypto Trader
```

## Şu Anda Ne Yapmalı?

1. **Browser Console'u Aç** (F12)
2. **Sayfayı Yenile** (Ctrl+R)
3. **Console'daki Hataları Kopyala**
4. **Klavyeden "1" bas**
5. **Console'da ne görünüyor?**

Sonuçları paylaş, ona göre düzeltelim!
