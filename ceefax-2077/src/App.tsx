import { useEffect } from 'react'
import { TeletextProvider, useTeletext } from './context/TeletextContext'
import TeletextGrid from './components/TeletextGrid'
import KeyboardListener from './components/KeyboardListener'
import IndexPage from './components/IndexPage'
import SystemStatusPage from './components/SystemStatusPage'
import NewsDetailPage from './components/NewsDetailPage'
import GlitchPage from './components/GlitchPage'
import SignalLostPage from './components/SignalLostPage'

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
    switch (currentPage) {
      case 100:
        return <IndexPage />
      case 101:
        return <SystemStatusPage /> // System Health Monitor
      case 102:
      case 103:
        return <NewsDetailPage /> // Server details
      case 200:
        return <SignalLostPage /> // Deploy Logs (TODO)
      case 300:
        return <SignalLostPage /> // Error Logs (TODO)
      case 666:
        return <GlitchPage /> // Kill Switch
      default:
        return <SignalLostPage />
    }
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
