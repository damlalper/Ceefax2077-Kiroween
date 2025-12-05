# Komple Test Spesifikasyonu - Part 4: Zone 400-666

## 📄 ZONE 400: PLANET (Yeşil/Beyaz)

### Page 400: Planet Hub
**Dosya:** `src/pages/400_planet/PlanetHub.tsx`
**Persona:** Climate Scientist (`.kiro/steering/climate_scientist.md`)

**Görünmesi Gerekenler:**
- Başlık: "PLANET HUB"
- Alt başlık: "CLIMATE • ENVIRONMENT • SURVIVAL"
- 4 navigasyon kartı:
  1. P401: ECOSENSE (Environment monitoring)
  2. P403: PLAN B (Mars comparison)
  3. P405: SHELTER SEEKER (Emergency map)
- Zone rengi: Yeşil header, beyaz text
- Persona: Dr. Terra - Bilimsel, acil, umutlu

**Teknik:**
- [ ] Climate scientist personality
- [ ] Bilimsel terimler + açıklamalar
- [ ] "We're running out of time" tonu

---

### Page 401: EcoSense
**Dosya:** `src/pages/400_planet/EcoSense.tsx`
**Service:** `src/services/EnvironmentService.ts`

**Görünmesi Gerekenler:**
- Başlık: "ECOSENSE"
- Real-time metrics:
  - AQI (Air Quality Index): 0-500
  - AQI Level: GOOD/MODERATE/UNHEALTHY/HAZARDOUS
  - PM2.5, PM10, Ozone, NO2 değerleri
  - Radiation: μSv/h
  - Radiation Level: SAFE/ELEVATED/HIGH/DANGEROUS
  - Temperature, Humidity, Pressure
  - UV Index
- Warning banner (hazardous durumda)
- ASCII weather icon
- "REFRESH DATA" butonu

**Test:**
1. Tüm metrikler görünüyor
2. AQI renk kodlu (yeşil→kırmızı)
3. Radiation level doğru
4. Warning banner kritik durumlarda
5. REFRESH butonu yeni data üretiyor
6. Weather icon AQI'ya göre değişiyor

**Teknik:**
- [ ] EnvironmentService.generateAtmosphereData()
- [ ] Random variation realistic
- [ ] Color coding doğru
- [ ] Warning generation logic
- [ ] ASCII art rendering

---

### Page 403: Plan B
**Dosya:** `src/pages/400_planet/PlanB.tsx`
**Service:** `src/services/NASAService.ts`

**Görünmesi Gerekenler:**
- Başlık: "PLAN B: MARS"
- İki sütun karşılaştırma:
  - **EARTH 2077:**
    - Temperature: +2.8°C
    - Sea Level: +1.2m
    - CO2: 450ppm
    - Status: CRITICAL
    - Cost to Fix: $2T
  - **MARS:**
    - Temperature: -60°C
    - Atmosphere: 95% CO2
    - Water: NONE
    - Status: UNINHABITABLE
    - Cost to Colonize: $10T
- Verdict: "FIX EARTH FIRST"
- Timeline comparison
- "MARS ISN'T PLAN B" mesajı

**Test:**
1. İki sütun yan yana
2. Tüm metrikler görünüyor
3. Renk kodları (Earth=sarı/kırmızı, Mars=gri)
4. Cost comparison net
5. Verdict bold ve net
6. Compact layout (40×24 grid'e sığıyor)

**Teknik:**
- [ ] NASAService.getMarsData()
- [ ] Comparison logic
- [ ] Compact layout
- [ ] No scrolling

---

### Page 405: Shelter Seeker
**Dosya:** `src/pages/400_planet/ShelterSeeker.tsx`
**Service:** `src/services/EnvironmentService.ts`

**Görünmesi Gerekenler:**
- Başlık: "SHELTER SEEKER"
- Emergency banner (yanıp sönen)
- 20×20 ASCII map:
  - X = You (cyan)
  - W = Water (blue)
  - P = Power (yellow)
  - M = Medical (red)
  - S = Shelter (green)
  - · = Empty (gray)
- Legend (marker açıklamaları)
- Selected shelter info:
  - Name (WATER-1, POWER-2, vb.)
  - Type
  - Status (ACTIVE/LIMITED/OFFLINE)
  - Distance (km)
  - Coordinates
- Resource list (ilk 5 shelter)
- Emergency protocols
- "REGENERATE MAP" butonu

**Test:**
1. ASCII map render ediliyor
2. Marker'lar doğru renkte
3. Marker'a tıklayınca info görünüyor
4. shelter.name görünüyor (WATER-1, vb.)
5. Distance hesaplanıyor
6. Status renk kodlu
7. REGENERATE yeni map üretiyor
8. Emergency banner yanıp sönüyor
9. Compact layout

**Teknik:**
- [ ] EnvironmentService.generateShelterMap()
- [ ] 20×20 grid generation
- [ ] Marker placement random
- [ ] Click handlers çalışıyor
- [ ] ShelterLocation.name property var
- [ ] Distance calculation
- [ ] Blink animation

---

## 📄 ZONE 500: SHIELD (Kırmızı/Sarı)

### Page 500: Shield Hub
**Dosya:** `src/pages/500_shield/ShieldHub.tsx` (yok ise oluştur)
**Persona:** Security Expert (`.kiro/steering/security_expert.md`)

**Görünmesi Gerekenler:**
- Başlık: "SHIELD HUB"
- Alt başlık: "SECURITY • PROTECTION • DEFENSE"
- Biometric gate (ilk girişte)
- 5 navigasyon kartı:
  1. P501: CRIME WATCH
  2. P502: SCAM BUSTER
  3. P503: POCKET LAWYER
  4. P504: SOS BEACON
- Zone rengi: Kırmızı header, sarı text
- Persona: The Guardian - Vigilant, protective

**Teknik:**
- [ ] BiometricGate component
- [ ] Security expert personality
- [ ] "THREAT LEVEL" terminology
- [ ] Military-style brevity

---

### Page 501: Crime Watch
**Dosya:** `src/pages/500_shield/CrimeWatch.tsx`

**Görünmesi Gerekenler:**
- Başlık: "CRIME WATCH"
- Threat level meter
- Crime incidents:
  - Type (Theft, Assault, Fraud)
  - Location
  - Time
  - Severity
  - Status (Active/Resolved)
- Heat map (optional)
- "REPORT CRIME" butonu
- Alert system

**Test:**
1. Threat level görünüyor
2. 5-6 crime incident
3. Severity renk kodlu
4. REPORT butonu form açıyor
5. Alert notifications

**Teknik:**
- [ ] Crime data generation
- [ ] Threat level calculation
- [ ] Severity classification
- [ ] Report form

---

### Page 502: Scam Buster
**Dosya:** `src/pages/500_shield/ScamBuster.tsx`

**Görünmesi Gerekenler:**
- Başlık: "SCAM BUSTER"
- URL/Message input
- "ANALYZE" butonu
- Scam detection results:
  - Scam Probability: X%
  - Red Flags: List
  - Verdict: SAFE/SUSPICIOUS/SCAM
  - Recommendations
- Recent scams database
- "REPORT SCAM" butonu

**Test:**
1. Input alanı çalışıyor
2. ANALYZE detection yapıyor
3. Red flags listesi
4. Probability 0-100%
5. Verdict renk kodlu
6. Recent scams görünüyor

**Teknik:**
- [ ] Scam detection algorithm
- [ ] Red flag identification
- [ ] Probability calculation
- [ ] Database simulation

---

### Page 503: Pocket Lawyer
**Dosya:** `src/pages/500_shield/PocketLawyer.tsx`

**Görünmesi Gerekenler:**
- Başlık: "POCKET LAWYER"
- Case description input
- "GET ADVICE" butonu
- Legal advice:
  - Case analysis
  - Relevant laws
  - Recommended actions
  - Risk assessment
- Disclaimer: "NOT LEGAL ADVICE"
- "SAVE CASE" butonu

**Test:**
1. Input textarea çalışıyor
2. GET ADVICE AI response üretiyor
3. Legal terminology kullanılıyor
4. Risk assessment realistic
5. Disclaimer görünüyor
6. SAVE butonu localStorage'a yazıyor

**Teknik:**
- [ ] AI legal advice generation
- [ ] Case analysis logic
- [ ] Risk assessment
- [ ] localStorage persistence

---

### Page 504: SOS Beacon
**Dosya:** `src/pages/500_shield/SOSBeacon.tsx`

**Görünmesi Gerekenler:**
- Başlık: "SOS BEACON"
- Emergency type selector:
  - Medical
  - Fire
  - Police
  - Natural Disaster
- "ACTIVATE BEACON" butonu (büyük, kırmızı)
- Location display (simulated GPS)
- Emergency contacts
- Status: STANDBY/ACTIVE/DISPATCHED
- Timer (active durumda)

**Test:**
1. Emergency type seçiliyor
2. ACTIVATE butonu çalışıyor
3. Status ACTIVE'e geçiyor
4. Location görünüyor
5. Timer başlıyor
6. Emergency contacts listesi
7. Deactivate option

**Teknik:**
- [ ] Emergency type selection
- [ ] Beacon activation
- [ ] GPS simulation
- [ ] Timer countdown
- [ ] Status management

---

## 📄 ZONE 666: GLITCH (Koyu Kırmızı)

### Page 666: Glitch Mode
**Dosya:** `src/pages/666_glitch/GlitchMode.tsx`
**Hook:** `src/hooks/useGlitch.ts`
**Persona:** Demon (`.kiro/steering/demon.md`)

**Görünmesi Gerekenler:**
- Başlık: "SYSTEM FAILURE" (glitched)
- Corrupted text everywhere
- Glitch effects:
  - Screen shake
  - Color distortion
  - Text corruption (Zalgo-style)
  - Random static flashes
  - Screen tear effect
- Trap timer: 10 seconds
- "TRAPPED" message (ilk 10 saniye)
- "ESCAPE WINDOW OPEN" (10 saniye sonra)
- Binary/hex codes
- Stack trace (fake)
- Fastext: ✗✗✗ / ✗✗✗ / ✗✗✗ / TRAPPED

**Test:**
1. Sayfa yüklenince kırmızı ekran
2. Glitch effects aktif:
   - [ ] Screen shake (CSS animation)
   - [ ] Pulse red background
   - [ ] Static flashes
   - [ ] Text corruption
   - [ ] Screen tear (translateX)
3. "TRAPPED" mesajı görünüyor
4. 10 saniye timer çalışıyor
5. Timer bitince "ESCAPE WINDOW OPEN"
6. "100" yazınca Zone 100'e dönüyor
7. Escape attempt counter çalışıyor
8. Time in hell counter artıyor
9. Integrity % azalıyor
10. 40×24 grid KORUNUYOR (glitch container'da, content'te değil)

**Teknik:**
- [ ] useGlitch hook çalışıyor
- [ ] useGlitchMessages random messages
- [ ] useScreenTear effect
- [ ] 10 second trap timer
- [ ] Escape detection (inputBuffer === "100")
- [ ] Glitch effects CONTAINER'da (not content)
- [ ] Grid layout preserved
- [ ] Demon personality aktif
- [ ] Console'da "HELP ME" messages

**Önemli:**
- Glitch efektleri container'a uygulanıyor
- Content layout bozulmuyor
- 40×24 grid korunuyor
- Fastext çalışmıyor (corrupted)

