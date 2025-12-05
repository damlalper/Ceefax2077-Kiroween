# Komple Test Spesifikasyonu - Part 5: Zone 800-900 & Kiro Features

## 📄 ZONE 800: HOME (Cyan/Beyaz)

### Page 800: Home Hub
**Dosya:** `src/pages/800_home/HomeHub.tsx`

**Görünmesi Gerekenler:**
- Başlık: "HOME HUB"
- Alt başlık: "SMART HOME • TIME TRAVEL • ART"
- 4 navigasyon kartı:
  1. P801: TELE HOME (IoT control)
  2. P802: TIME MACHINE (Wayback)
  3. P803: PIXELGEN (Generative art)
  4. P805: THE RENDERER (Web browser)
- Zone rengi: Cyan header, beyaz text

---

### Page 801: TeleHome
**Dosya:** `src/pages/800_home/TeleHome.tsx`
**Agent:** `src/mcp/IoTAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "TELE HOME"
- 5-6 IoT cihaz kartı:
  - Living Room Lights (ON/OFF toggle)
  - Thermostat (temperature slider)
  - Security Camera (status)
  - Door Lock (LOCKED/UNLOCKED)
  - Coffee Maker (timer)
  - Smart TV (channel)
- Her cihaz:
  - Icon/Name
  - Status
  - Control (toggle/slider/button)
  - Last updated timestamp
- "REFRESH DEVICES" butonu
- System status (All systems operational)

**Test:**
1. 5-6 cihaz görünüyor
2. Toggle switches çalışıyor
3. Thermostat slider çalışıyor (15-30°C)
4. Status real-time güncelleniyor
5. REFRESH butonu state güncelliyor
6. localStorage'da cihaz durumları

**Teknik:**
- [ ] IoTAgent.getDevices() çalışıyor
- [ ] toggleDevice() state güncelliyor
- [ ] setTemperature() çalışıyor
- [ ] localStorage persistence
- [ ] Real-time updates

---

### Page 802: Time Machine
**Dosya:** `src/pages/800_home/TimeMachine.tsx`
**Agent:** `src/mcp/WaybackAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "TIME MACHINE"
- URL input
- Date picker (year/month/day)
- "FETCH SNAPSHOT" butonu
- Historical snapshot display:
  - Snapshot date
  - URL
  - Content preview
  - Status (Available/Not Found)
- Timeline visualization
- "RANDOM SNAPSHOT" butonu

**Test:**
1. URL input çalışıyor
2. Date picker çalışıyor
3. FETCH butonu snapshot getiriyor
4. Snapshot content görünüyor
5. RANDOM butonu random tarih seçiyor
6. Timeline görünüyor
7. Not Found durumu handle ediliyor

**Teknik:**
- [ ] WaybackAgent.getSnapshot() çalışıyor
- [ ] Date validation
- [ ] Mock historical data
- [ ] Timeline rendering
- [ ] Error handling

---

### Page 803: PixelGen
**Dosya:** `src/pages/800_home/PixelGen.tsx`
**Service:** `src/services/GenerativeArtService.ts`

**Görünmesi Gerekenler:**
- Başlık: "PIXELGEN"
- Canvas area (generative art)
- Pattern controls:
  - Pattern type (Grid/Circles/Lines/Noise)
  - Color scheme (Retro/Neon/Monochrome)
  - Complexity slider
  - Animation toggle
- "GENERATE" butonu
- "SAVE" butonu
- Pattern info (seed, timestamp)

**Test:**
1. Canvas render ediliyor
2. Pattern type değiştirince yeni pattern
3. Color scheme çalışıyor
4. Complexity slider effect ediyor
5. Animation toggle çalışıyor
6. GENERATE yeni pattern üretiyor
7. SAVE butonu download tetikliyor
8. Compact layout (grid'e sığıyor)

**Teknik:**
- [ ] GenerativeArtService.generate() çalışıyor
- [ ] Canvas API kullanılıyor
- [ ] Pattern algorithms çalışıyor
- [ ] Color schemes uygulanıyor
- [ ] Animation loop
- [ ] Download functionality

---

### Page 805: The Renderer ⭐ YENİ MCP
**Dosya:** `src/pages/800_home/TheRenderer.tsx`
**Agent:** `src/mcp/BrowserAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "THE RENDERER"
- Alt başlık: "> TEXT-ONLY WEB BROWSER"
- URL input: "URL: >_"
- "FETCH" butonu
- Rendered content area:
  - Stripped HTML (text only)
  - UPPERCASE conversion
  - 40 char line limit
  - Numbered links [1], [2], [3]
  - Scroll area
- Link navigation:
  - Click [1] → navigate to that URL
- "BACK" butonu
- History list (son 5 URL)
- Info: "LOW-BANDWIDTH MODE"

**Test:**
1. URL input çalışıyor
2. FETCH butonu:
   - Loading state görünüyor
   - Content fetch ediliyor
3. Rendered content:
   - HTML tags stripped
   - Text UPPERCASE
   - Line breaks doğru (40 char)
   - Links numaralandırılmış [1], [2]
4. Link'e tıklayınca o URL'e gidiyor
5. BACK butonu önceki sayfaya dönüyor
6. History listesi güncellenıyor
7. Error handling (invalid URL)

**Teknik:**
- [ ] BrowserAgent.fetchAndConvert() çalışıyor
- [ ] HTML parsing (strip tags)
- [ ] Text transformation (uppercase)
- [ ] Line wrapping (40 char)
- [ ] Link extraction ve numbering
- [ ] Navigation history
- [ ] Error handling

---

## 📄 ZONE 900: THEMES (Gri/Cyan)

### Page 905: Local Ghost ⭐ YENİ MCP
**Dosya:** `src/pages/900_themes/LocalGhost.tsx`
**Agent:** `src/mcp/FileSystemAgent.ts`

**Görünmesi Gerekenler:**
- Başlık: "LOCAL GHOST"
- Alt başlık: "> PROJECT STRUCTURE" veya "> SYSTEM LOGS"
- View toggle buttons:
  - FILE TREE (aktif: cyan bg)
  - SYSTEM LOGS (aktif: cyan bg)
- **FILE TREE view:**
  - ASCII tree structure:
    ```
    📁 ceefax-2077/
    |-- 📁 src/
    |   |-- 📁 pages/
    |   |-- 📁 components/
    |   |-- 📄 App.tsx
    |-- 📁 public/
    |-- 📄 package.json
    ```
  - Renkler: cyan=folders, green=files
  - Monospace font (Courier New)
- **SYSTEM LOGS view:**
  - Log entries (son 15):
    ```
    [14:23:45] INFO: Application started
    [14:23:46] WARN: API timeout
    [14:23:47] ERROR: Network failure
    ```
  - Renk kodları:
    - ERROR: red
    - WARN: yellow
    - INFO: green
  - Timestamp [HH:MM:SS]
- Stats boxes:
  - FILES: 42
  - DIRS: 18
  - SIZE: 2.4MB
- Info box: "👻 LOCAL GHOST" özellikleri

**Test:**
1. İlk yükleme: Loading state
2. FILE TREE butonu:
   - Tree structure görünüyor
   - Folders cyan, files green
   - ASCII characters doğru (|, --)
   - İlk 15 satır görünüyor
3. SYSTEM LOGS butonu:
   - Log entries görünüyor
   - Timestamp format doğru
   - Level renkleri doğru
   - Son 15 log görünüyor
4. Stats boxes güncel
5. View toggle smooth transition

**Teknik:**
- [ ] FileSystemAgent.getFileTree() çalışıyor
- [ ] generateTreeView() ASCII tree üretiyor
- [ ] getRecentLogs() log array döndürüyor
- [ ] View state management
- [ ] Color coding doğru
- [ ] Mock data realistic

---

### Page 906: Tape Library
**Dosya:** `src/pages/900_themes/TapeLibrary.tsx`
**Service:** `src/services/VHSService.ts`
**Component:** `src/components/VHSPlayback.tsx`

**Görünmesi Gerekenler:**
- Başlık: "TAPE LIBRARY"
- Recording controls:
  - "START RECORDING" butonu (kırmızı)
  - "STOP RECORDING" butonu (gri)
  - Recording indicator: ● REC
- Tape list (localStorage'dan):
  - Tape #1: 2024-12-05 14:23
  - Duration: 2:34
  - Snapshots: 15
  - PLAY / DELETE butonları
- Playback area:
  - VHS chromatic aberration effect
  - Snapshot slideshow
  - Progress bar
  - STOP butonu
- Storage info: "X/10 tapes"

**Test:**
1. START RECORDING:
   - Header'da ● görünüyor
   - Recording state aktif
2. Birkaç sayfa gez
3. STOP RECORDING:
   - Tape listesine ekleniyor
   - Duration hesaplanıyor
4. PLAY butonu:
   - VHS playback başlıyor
   - Chromatic aberration görünüyor
   - Snapshots sırayla gösteriliyor
   - Progress bar ilerliyor
5. DELETE butonu:
   - Confirm dialog
   - Tape siliniyor
6. Storage limit (10 tape)

**Teknik:**
- [ ] VHSService.startRecording() çalışıyor
- [ ] Snapshot capture çalışıyor
- [ ] localStorage persistence
- [ ] VHSPlayback component render
- [ ] Chromatic aberration CSS
- [ ] Playback animation
- [ ] Storage management

---

### Page 907: Hook Dashboard
**Dosya:** `src/pages/900_themes/HookDashboard.tsx`
**Service:** `src/services/HookService.ts`
**Config:** `.kiro/hooks/hooks.json`

**Görünmesi Gerekenler:**
- Başlık: "HOOK DASHBOARD"
- Hook list (10 hook):
  - Hook name
  - Trigger type (timer/event/condition)
  - Trigger value (30s, page_change, vb.)
  - Action description
  - Enabled toggle
  - Execution count
  - Last triggered timestamp
  - Priority (1-10)
- "CREATE HOOK" butonu
- "REFRESH" butonu
- Active hooks count
- Total executions count

**Test:**
1. 10 hook listede görünüyor
2. Her hook için:
   - Name görünüyor
   - Trigger açık
   - Action açık
   - Toggle çalışıyor
   - Execution count > 0 (bazıları için)
   - Last triggered timestamp
3. CREATE HOOK butonu form açıyor
4. REFRESH butonu listeyi güncelliyor
5. Stats doğru

**Teknik:**
- [ ] HookService.getHooks() çalışıyor
- [ ] hooks.json'dan yükleniyor
- [ ] Toggle enable/disable çalışıyor
- [ ] Execution tracking
- [ ] Timestamp formatting
- [ ] Create hook form

---

## 🎯 KIRO FEATURES TEST

### .kiro Klasörü İçeriği

#### 1. Steering Docs (17 Persona)
**Lokasyon:** `.kiro/steering/*.md`

**Test:**
1. PersonalityService.ts'yi aç
2. Her zone için persona tanımlı mı?
3. Zone değiştir, personality değişiyor mu?
4. Narrator açık, ses tonu değişiyor mu?

**Personalar:**
- anchor.md → Zone 100
- crypto_trader.md → Zone 200
- gossip_girl.md → Zone 300
- climate_scientist.md → Zone 400
- security_expert.md → Zone 500
- demon.md → Zone 666
- (home persona) → Zone 800
- sysadmin.md → Zone 900
- storyteller.md → Ghost Writer
- editor.md → News Editor
- news_anchor.md → Truth Terminal
- rogue_ai.md → The Basilisk
- performance_optimizer.md → Dev guidance
- accessibility_expert.md → A11y guidance
- devops_engineer.md → DevOps guidance
- crisis_mode.md → Situational
- quiet_mode.md → Situational

#### 2. Specs (13 YAML)
**Lokasyon:** `.kiro/specs/*.yaml`

**Kontrol:**
- [ ] api-specs.yaml → API tanımları
- [ ] component-specs.yaml → Component yapısı
- [ ] service-specs.yaml → Service tanımları
- [ ] routing.yaml → Route definitions
- [ ] theme-specs.yaml → Theme system
- [ ] security-specs.yaml → Security features
- [ ] mcp-integration.yaml → MCP agents
- [ ] data-models.yaml → Data structures
- [ ] lifecycle-hooks.yaml → Hook lifecycle
- [ ] testing-strategy.yaml → Test approach
- [ ] feature-zones.yaml → Zone features
- [ ] mcp-chain-of-thought.yaml → MCP chains

#### 3. Hooks (10 Automated)
**Lokasyon:** `.kiro/hooks/hooks.json`

**Test:** (Yukarıda detaylı anlatıldı)
- [ ] Auto-save (30s)
- [ ] Idle detection (5min)
- [ ] Error recovery
- [ ] Page visit logger
- [ ] Zone change narrator
- [ ] Crypto price alert
- [ ] Glitch escape timer
- [ ] VHS auto-stop
- [ ] Theme persistence
- [ ] Biometric lock

#### 4. MCP Workflows
**Lokasyon:** `.kiro/mcp/workflows/*.yaml`

**Test:**
- [ ] crypto-intelligence.yaml → P201'de çalışıyor
- [ ] truth-pipeline.yaml → P101'de çalışıyor

#### 5. Context Files
**Lokasyon:** `.kiro/context/*.md`

**Kontrol:**
- [ ] architecture.md → Proje mimarisi
- [ ] conventions.md → Kod standartları
- [ ] dependencies.md → Bağımlılıklar
- [ ] patterns.md → Design patterns

#### 6. Templates
**Lokasyon:** `.kiro/templates/*.ts`

**Kontrol:**
- [ ] component.tsx → Component template
- [ ] service.ts → Service template
- [ ] hook.ts → Hook template

---

## ✅ FINAL CHECKLIST

### Build & Performance
- [ ] `npm run build` başarılı
- [ ] Bundle size < 500KB
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Load time < 3s

### Navigation
- [ ] Keyboard input (0-9)
- [ ] 3-digit page entry
- [ ] Fastext buttons
- [ ] URL routing
- [ ] Back/forward browser buttons

### Visual
- [ ] 40×24 grid (no scrolling)
- [ ] CRT scanlines
- [ ] VT323 font
- [ ] Zone colors
- [ ] Double-height titles
- [ ] Responsive (mobile ok)

### Features
- [ ] Narrator system
- [ ] VHS recording
- [ ] Agent hooks (10)
- [ ] MCP agents (6)
- [ ] Theme engine
- [ ] Biometric lock
- [ ] Auto-healer

### All Pages (28)
- [ ] Zone 100: 100, 101, 102, 105
- [ ] Zone 200: 200, 201, 202, 204, 205
- [ ] Zone 300: 300, 301, 304
- [ ] Zone 400: 400, 401, 403, 405
- [ ] Zone 500: 500, 501, 502, 503, 504
- [ ] Zone 666: 666
- [ ] Zone 800: 800, 801, 802, 803, 805
- [ ] Zone 900: 905, 906, 907

### Kiro Integration
- [ ] 17 steering personas
- [ ] 13 YAML specs
- [ ] 10 agent hooks
- [ ] 6 MCP agents
- [ ] Context files
- [ ] Templates

**TEST TAMAMLANDI! ✅**
