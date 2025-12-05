import { TeletextProvider, useTeletext } from './context/TeletextContext'
import { BootProvider, useBoot } from './context/BootContext'
import { isZoneAllowed } from './utils/bootHelpers'
import { ThemeProvider } from './context/ThemeContext'
import KeyboardListener from './components/KeyboardListener'
import BiosBootLoader from './components/BiosBootLoader'
import BiometricGate from './components/BiometricGate'
import TeletextLayout from './components/TeletextLayout'
import { VHSPlayback } from './components/VHSPlayback'
import { useVHS } from './hooks/useVHS'
import { useAgentHooks } from './hooks/useAgentHooks'

// Expose services to window for testing
import { PersonalityService } from './services/PersonalityService'
import { SteeringLoader } from './services/SteeringLoader'
import { HookService } from './services/HookService'

if (typeof window !== 'undefined') {
  (window as any).PersonalityService = PersonalityService;
  (window as any).SteeringLoader = SteeringLoader;
  (window as any).HookService = HookService;
}

// ZONE 100: TRUTH
import TruthHub from './pages/100_truth/TruthHub'
import GlobalWire from './pages/100_truth/GlobalWire'
import LieDetector from './pages/100_truth/LieDetector'
import MemoryVault from './pages/100_truth/MemoryVault'

// ZONE 200: SYSTEM
import SystemHub from './pages/200_system/SystemHub'
import Stonks from './pages/200_system/Stonks'
import CodeExorcist from './pages/200_system/CodeExorcist'
import OracleOfDoom from './pages/200_system/OracleOfDoom'
import TheBasilisk from './pages/200_system/TheBasilisk'

// ZONE 300: PULSE
import PulseHub from './pages/300_pulse/PulseHub'
import TheBlast from './pages/300_pulse/TheBlast'
import SoulWeight from './pages/300_pulse/SoulWeight'

// ZONE 400: PLANET
import PlanetHub from './pages/400_planet/PlanetHub'
import EcoSense from './pages/400_planet/EcoSense'
import PlanB from './pages/400_planet/PlanB'
import ShelterSeeker from './pages/400_planet/ShelterSeeker'

// ZONE 500: SHIELD
import ShieldHub from './pages/500_shield/ShieldHub'
import CrimeWatch from './pages/500_shield/CrimeWatch'
import ScamBuster from './pages/500_shield/ScamBuster'
import PocketLawyer from './pages/500_shield/PocketLawyer'
import SOSBeacon from './pages/500_shield/SOSBeacon'

// ZONE 666: GLITCH
import GlitchMode from './pages/666_glitch/GlitchMode'

// ZONE 800: TELE-HOME (Frankenstein)
import { HomeHub, TeleHome, TimeMachine, PixelGen } from './pages/800_home'
import TheRenderer from './pages/800_home/TheRenderer'

// ZONE 900: THEMES (Skeleton Crew)
import { ThemeSelector, TapeLibrary, HookDashboard } from './pages/900_themes'
import LocalGhost from './pages/900_themes/LocalGhost'

// Fallback
import SignalLostPage from './components/SignalLostPage'

function TeletextRouter() {
  const { currentPage } = useTeletext()
  const { bootMode } = useBoot()
  const { isPlaybackMode, currentTape, playTape, stopPlayback } = useVHS(currentPage, '')
  
  // Initialize agent hooks
  useAgentHooks()

  const renderPage = () => {
    // Check if zone is allowed in current boot mode
    const zone = Math.floor(currentPage / 100) * 100
    if (!isZoneAllowed(zone, bootMode)) {
      return (
        <div style={{ 
          color: '#FF0000', 
          textAlign: 'center', 
          padding: '50px',
          fontSize: '1.5em'
        }}>
          <div style={{ marginBottom: '20px' }}>
            ⛔ ACCESS DENIED ⛔
          </div>
          <div style={{ fontSize: '0.8em', color: '#00FF00' }}>
            ZONE {zone} NOT AVAILABLE IN SYSADMIN MODE
          </div>
          <div style={{ fontSize: '0.6em', color: '#00FFFF', marginTop: '20px' }}>
            AUTHORIZED ZONES: 200 (SYSTEM), 500 (SHIELD)
          </div>
        </div>
      )
    }
    // ZONE 100: THE TRUTH (News & Facts)
    if (currentPage === 100) return <TruthHub />
    if (currentPage === 101) return <GlobalWire />
    if (currentPage === 102) return <LieDetector />
    if (currentPage === 105) return <MemoryVault />

    // ZONE 200: THE SYSTEM (Economy & Tech)
    if (currentPage === 200) return <SystemHub />
    if (currentPage === 201) return <Stonks />
    if (currentPage === 202) return <CodeExorcist />
    if (currentPage === 204) return <OracleOfDoom />
    if (currentPage === 205) return <TheBasilisk />

    // ZONE 300: THE PULSE (Society)
    if (currentPage === 300) return <PulseHub />
    if (currentPage === 301) return <TheBlast />
    if (currentPage === 304) return <SoulWeight />

    // ZONE 400: THE PLANET (Environment)
    if (currentPage === 400) return <PlanetHub />
    if (currentPage === 401) return <EcoSense />
    if (currentPage === 403) return <PlanB />
    if (currentPage === 405) return <ShelterSeeker />

    // ZONE 500: SHIELD (Security & Rights)
    if (currentPage === 500) return <ShieldHub />
    if (currentPage === 501) return <CrimeWatch />
    if (currentPage === 502) return <ScamBuster />
    if (currentPage === 503) return <PocketLawyer />
    if (currentPage === 504) return <SOSBeacon />

    // ZONE 666: GLITCH MODE
    if (currentPage === 666) return <GlitchMode />

    // ZONE 800: TELE-HOME (Frankenstein)
    if (currentPage === 800) return <HomeHub />
    if (currentPage === 801) return <TeleHome />
    if (currentPage === 802) return <TimeMachine />
    if (currentPage === 803) return <PixelGen />
    if (currentPage === 805) return <TheRenderer />

    // ZONE 900: THEMES (Skeleton Crew)
    if (currentPage === 905) return <LocalGhost />
    if (currentPage === 904) return <ThemeSelector />
    if (currentPage === 906) return <TapeLibrary onPlayTape={playTape} />
    if (currentPage === 907) return <HookDashboard />

    // Default fallback for invalid pages
    return <SignalLostPage />
  }

  return (
    <>
      <KeyboardListener />
      {isPlaybackMode && currentTape ? (
        <VHSPlayback tape={currentTape} onStop={stopPlayback} />
      ) : (
        <TeletextLayout>
          {renderPage()}
        </TeletextLayout>
      )}
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BootProvider>
        <TeletextProvider>
          <AppWithBoot />
        </TeletextProvider>
      </BootProvider>
    </ThemeProvider>
  )
}

function AppWithBoot() {
  const { isBooted } = useBoot()

  if (!isBooted) {
    return <BiosBootLoader />
  }

  return (
    <BiometricGate requiredZone={500} redirectPage={100}>
      <TeletextRouter />
    </BiometricGate>
  )
}

export default App
