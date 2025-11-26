import { useEffect } from 'react'
import { TeletextProvider, useTeletext } from './context/TeletextContext'
import TeletextGrid from './components/TeletextGrid'
import KeyboardListener from './components/KeyboardListener'
import IndexPage from './components/IndexPage'
import SystemStatusPage from './components/SystemStatusPage'
import GlitchPage from './components/GlitchPage'
import SignalLostPage from './components/SignalLostPage'
import OuijaPage from './components/OuijaPage'
import DeadSignalPage from './components/DeadSignalPage'
import GhostWriterPage from './components/GhostWriterPage'
import GlobalZonePage from './components/GlobalZonePage'
import HustleZonePage from './components/HustleZonePage'
import ArenaZonePage from './components/ArenaZonePage'
import ElementZonePage from './components/ElementZonePage'
import VibeZonePage from './components/VibeZonePage'
import CreatorZonePage from './components/CreatorZonePage'
import NomadZonePage from './components/NomadZonePage'
import PlayZonePage from './components/PlayZonePage'
import SystemZonePage from './components/SystemZonePage'

import MarketWatchPage from './components/pages/MarketWatchPage'
import CryptoTrackerPage from './components/pages/CryptoTrackerPage'
import CareerBoardPage from './components/pages/CareerBoardPage'
import BusinessNewsPage from './components/pages/BusinessNewsPage'
import LiveScoresPage from './components/pages/LiveScoresPage'
import LeagueTablesPage from './components/pages/LeagueTablesPage'
import EsportsPage from './components/pages/EsportsPage'
import SportsNewsPage from './components/pages/SportsNewsPage'
import WeatherPage from './components/pages/WeatherPage'
import WorldNewsPage from './components/pages/WorldNewsPage'
import ClimateAlertsPage from './components/pages/ClimateAlertsPage'
import { 
  WellnessPage, NutritionPage, MindfulnessPage, LifestylePage,
  MusicChartsPage, MovieReviewsPage, ArtGalleryPage, CreatorToolsPage,
  ShoppingDealsPage, ProductReviewsPage, SocialTrendsPage, CommunityBoardPage,
  GameReleasesPage, StreamingGuidePage, GameReviewsPage, RetroArcadePage,
  ServerStatusPage, DeployLogsPage, ErrorTrackingPage, GitLogPage,
  TravelGuidePage, FlightStatusPage
} from './components/pages/AllPages'

function TeletextRouter() {
  const { currentPage, goToPage } = useTeletext()

  // Haunted Hours: Auto-redirect to 666 between 00:00-03:00
  // DISABLED FOR DEMO - Uncomment to enable automatic horror mode
  useEffect(() => {
    // Uncomment below to enable haunted hours (00:00-03:00 auto-redirect)
    /*
    const checkHauntedHours = () => {
      const now = new Date()
      const hours = now.getHours()
      
      // Between midnight and 3 AM
      if (hours >= 0 && hours < 3 && currentPage !== 666) {
        setTimeout(() => {
          goToPage(666)
        }, 3000) // Give them 3 seconds warning
      }
    }

    // Check immediately
    checkHauntedHours()

    // Check every minute
    const hauntedInterval = setInterval(checkHauntedHours, 60000)

    return () => {
      clearInterval(hauntedInterval)
    }
    */

    // Uncomment below to enable inactivity timer (auto-redirect after 2 minutes)
    /*
    const inactivityTimer = setTimeout(() => {
      if (currentPage !== 666 && currentPage !== 100) {
        goToPage(666)
      }
    }, 120000) // 2 minutes

    return () => {
      clearTimeout(inactivityTimer)
    }
    */
  }, [currentPage, goToPage])

  // Route mapping based on .kiro/specs/routing.yaml
  const renderPage = () => {
    // Special pages
    if (currentPage === 100) return <IndexPage />
    if (currentPage === 101) return <SystemStatusPage />
    if (currentPage === 333) return <OuijaPage />
    if (currentPage === 444) return <DeadSignalPage />
    if (currentPage === 666) return <GlitchPage />
    if (currentPage === 777) return <GhostWriterPage />
    
    // 200s - HUSTLE (Finance & Work)
    if (currentPage === 201) return <MarketWatchPage />
    if (currentPage === 202) return <CryptoTrackerPage />
    if (currentPage === 203) return <CareerBoardPage />
    if (currentPage === 204) return <BusinessNewsPage />
    if (currentPage >= 200 && currentPage < 300) return <HustleZonePage />
    
    // 300s - ARENA (Sports)
    if (currentPage === 301) return <LiveScoresPage />
    if (currentPage === 302) return <LeagueTablesPage />
    if (currentPage === 303) return <EsportsPage />
    if (currentPage === 304) return <SportsNewsPage />
    if (currentPage >= 300 && currentPage < 400) return <ArenaZonePage />
    
    // 100s - GLOBAL (News)
    if (currentPage === 102) return <WorldNewsPage />
    if (currentPage === 103) return <WorldNewsPage />
    if (currentPage === 104) return <WorldNewsPage />
    
    // 400s - ELEMENT (Travel & Environment)
    if (currentPage === 401) return <WeatherPage />
    if (currentPage === 402) return <ClimateAlertsPage />
    if (currentPage === 403) return <TravelGuidePage />
    if (currentPage === 404) return <FlightStatusPage />
    if (currentPage >= 400 && currentPage < 500) return <ElementZonePage />
    
    // 500s - VIBE (Lifestyle & Wellness)
    if (currentPage === 501) return <WellnessPage />
    if (currentPage === 502) return <NutritionPage />
    if (currentPage === 503) return <MindfulnessPage />
    if (currentPage === 504) return <LifestylePage />
    if (currentPage >= 500 && currentPage < 600) return <VibeZonePage />
    
    // 600s - CREATOR (Media & Content)
    if (currentPage === 601) return <MusicChartsPage />
    if (currentPage === 602) return <MovieReviewsPage />
    if (currentPage === 603) return <ArtGalleryPage />
    if (currentPage === 604) return <CreatorToolsPage />
    if (currentPage >= 600 && currentPage < 700) return <CreatorZonePage />
    
    // 700s - NOMAD (Consumer & Social)
    if (currentPage === 701) return <ShoppingDealsPage />
    if (currentPage === 702) return <ProductReviewsPage />
    if (currentPage === 703) return <SocialTrendsPage />
    if (currentPage === 704) return <CommunityBoardPage />
    if (currentPage >= 700 && currentPage < 800) return <NomadZonePage />
    
    // 800s - PLAY (Entertainment & Games)
    if (currentPage === 801) return <GameReleasesPage />
    if (currentPage === 802) return <StreamingGuidePage />
    if (currentPage === 803) return <GameReviewsPage />
    if (currentPage === 804) return <RetroArcadePage />
    if (currentPage >= 800 && currentPage < 900) return <PlayZonePage />
    
    // 900s - SYSTEM (Technology & DevOps)
    if (currentPage === 901) return <ServerStatusPage />
    if (currentPage === 902) return <DeployLogsPage />
    if (currentPage === 903) return <ErrorTrackingPage />
    if (currentPage === 904) return <GitLogPage />
    if (currentPage >= 900 && currentPage < 1000) return <SystemZonePage />
    
    // 100s - GLOBAL (News & Information)
    if (currentPage >= 100 && currentPage < 200) return <GlobalZonePage />

    // Default
    return <SignalLostPage />
  }

  return (
    <>
      <KeyboardListener />
      <TeletextGrid>
        {renderPage()}
      </TeletextGrid>
    </>
  )
}

function App() {
  return (
    <TeletextProvider>
      <TeletextRouter />
    </TeletextProvider>
  )
}

export default App
