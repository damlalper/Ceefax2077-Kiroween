import { useEffect, useState } from 'react'
import { useTeletext } from '../context/TeletextContext'
import { useNarrator } from '../hooks/useNarrator'
import { useVHS } from '../hooks/useVHS'

interface TeletextLayoutProps {
  children?: React.ReactNode
  pageContent?: string
}

// Double Height Component for Titles
export function DoubleHeight({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`double-height ${className}`} style={{ 
      display: 'inline-block',
      transform: 'scaleY(2)',
      transformOrigin: 'top',
      lineHeight: '0.5'
    }}>
      {children}
    </span>
  )
}

// Get Zone Theme based on page number
function getZoneTheme(page: number) {
  // ZONE 100: TRUTH (Blue/Yellow - BBC News)
  if (page >= 100 && page < 200) {
    return {
      headerBg: '#0066CC',
      headerText: '#FFFF00',
      zoneName: 'TRUTH',
      fastext: {
        red: { page: 100, label: 'TRUTH' },
        green: { page: 200, label: 'SYSTM' },
        yellow: { page: 300, label: 'PULSE' },
        cyan: { page: 400, label: 'PLNET' }
      }
    }
  }
  
  // ZONE 200: SYSTEM (Gold/Black - Financial)
  if (page >= 200 && page < 300) {
    return {
      headerBg: '#FFD700',
      headerText: '#000000',
      zoneName: 'SYSTM',
      fastext: {
        red: { page: 100, label: 'TRUTH' },
        green: { page: 201, label: 'STONKS' },
        yellow: { page: 204, label: 'ORACLE' },
        cyan: { page: 205, label: 'BASILISK' }
      }
    }
  }
  
  // ZONE 300: PULSE (Magenta/Cyan - Pop Culture)
  if (page >= 300 && page < 400) {
    return {
      headerBg: '#FF1493',
      headerText: '#00FFFF',
      zoneName: 'PULSE',
      fastext: {
        red: { page: 300, label: 'HUB' },
        green: { page: 301, label: 'BLAST' },
        yellow: { page: 304, label: 'SOUL' },
        cyan: { page: 100, label: 'TRUTH' }
      }
    }
  }
  
  // ZONE 400: PLANET (Green/White - Nature)
  if (page >= 400 && page < 500) {
    return {
      headerBg: '#00CC66',
      headerText: '#FFFFFF',
      zoneName: 'PLNET',
      fastext: {
        red: { page: 400, label: 'HUB' },
        green: { page: 401, label: 'ECOSENSE' },
        yellow: { page: 403, label: 'PLAN-B' },
        cyan: { page: 405, label: 'SHELTER' }
      }
    }
  }
  
  // ZONE 500: SHIELD (Red/Yellow - Alert)
  if (page >= 500 && page < 600) {
    return {
      headerBg: '#CC0000',
      headerText: '#FFFF00',
      zoneName: 'SHILD',
      fastext: {
        red: { page: 500, label: 'HUB' },
        green: { page: 501, label: 'CRIME' },
        yellow: { page: 502, label: 'SCAM' },
        cyan: { page: 504, label: 'SOS' }
      }
    }
  }
  
  // ZONE 600: CREATOR (Magenta/White - Media)
  if (page >= 600 && page < 700) {
    return {
      headerBg: '#FF00FF',
      headerText: '#FFFFFF',
      zoneName: 'CREAT',
      fastext: {
        red: { page: 600, label: 'HUB' },
        green: { page: 601, label: 'TREND' },
        yellow: { page: 602, label: 'PODCAST' },
        cyan: { page: 603, label: 'STREAM' }
      }
    }
  }
  
  // ZONE 700: NOMAD (Yellow/Black - Travel)
  if (page >= 700 && page < 800) {
    return {
      headerBg: '#FFFF00',
      headerText: '#000000',
      zoneName: 'NOMAD',
      fastext: {
        red: { page: 700, label: 'HUB' },
        green: { page: 701, label: 'TRAVEL' },
        yellow: { page: 702, label: 'DATE' },
        cyan: { page: 703, label: 'NFT' }
      }
    }
  }
  
  // ZONE 666: GLITCH (Dark Red/Glitching)
  if (page === 666) {
    return {
      headerBg: '#660000',
      headerText: '#FF0000',
      zoneName: 'GLITCH',
      glitch: true,
      fastext: {
        red: { page: 100, label: 'ESCAPE?' },
        green: { page: 200, label: 'NO EXIT' },
        yellow: { page: 300, label: 'TRAPPED' },
        cyan: { page: 666, label: 'VOID' }
      }
    }
  }
  
  // ZONE 800: HOME (Cyan/White)
  if (page >= 800 && page < 900) {
    return {
      headerBg: '#00CCCC',
      headerText: '#FFFFFF',
      zoneName: 'HOME',
      fastext: {
        red: { page: 800, label: 'HUB' },
        green: { page: 801, label: 'TELEHOME' },
        yellow: { page: 802, label: 'TIMEMACH' },
        cyan: { page: 803, label: 'PIXELGEN' }
      }
    }
  }
  
  // ZONE 900: THEMES (Grey/Cyan - System)
  if (page >= 900) {
    return {
      headerBg: '#666666',
      headerText: '#00FFFF',
      zoneName: 'THEMES',
      fastext: {
        red: { page: 905, label: 'THEMES' },
        green: { page: 906, label: 'VHS' },
        yellow: { page: 907, label: 'HOOKS' },
        cyan: { page: 100, label: 'EXIT' }
      }
    }
  }
  
  // Default
  return {
    headerBg: '#0066CC',
    headerText: '#FFFF00',
    zoneName: 'CEEFAX',
    fastext: {
      red: { page: 100, label: 'TRUTH' },
      green: { page: 200, label: 'SYSTM' },
      yellow: { page: 300, label: 'PULSE' },
      cyan: { page: 400, label: 'PLNET' }
    }
  }
}

export default function TeletextLayout({ children, pageContent = '' }: TeletextLayoutProps) {
  const [time, setTime] = useState(new Date())
  const { currentPage, inputBuffer, navigateToPage } = useTeletext()
  const { isEnabled, toggle } = useNarrator()
  const { isRecording } = useVHS(currentPage, pageContent)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  const formatDate = (date: Date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[date.getDay()]} ${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`
  }

  const pageDisplay = inputBuffer.length > 0 
    ? inputBuffer.padEnd(3, '_') 
    : String(currentPage).padStart(3, '0')

  const theme = getZoneTheme(currentPage)

  return (
    <div className="teletext-screen" style={{ fontFamily: "'VT323', monospace" }}>
      {/* CRT Container - Strictly 40x24 */}
      <div className={`teletext-container ${theme.glitch ? 'glitch-mode' : ''}`}>
        
        {/* ROW 0: HEADER - ALWAYS PRESENT */}
        <div 
          className={`teletext-header ${theme.glitch ? 'glitch-text' : ''}`}
          style={{ 
            backgroundColor: theme.headerBg,
            color: theme.headerText,
            fontFamily: "'VT323', monospace",
            fontSize: '1.5rem',
            padding: '0.25rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '2rem',
            overflow: 'hidden'
          }}
        >
          <span style={{ minWidth: '80px' }}>
            P{pageDisplay}
            {isRecording && (
              <span className="ml-1 animate-pulse">●</span>
            )}
          </span>
          <span style={{ flex: 1, textAlign: 'center' }}>
            <DoubleHeight>CEEFAX 2077</DoubleHeight>
          </span>
          <span style={{ minWidth: '180px', textAlign: 'right', fontSize: '1.2rem' }}>
            {formatDate(time)} {formatTime(time)}
          </span>
        </div>

        {/* ROWS 1-22: MAIN CONTENT (40 cols × 22 rows) */}
        <div 
          className="teletext-content"
          style={{
            fontFamily: "'VT323', monospace",
            height: 'calc(100% - 4rem)', // Subtract header and footer
            overflow: 'hidden', // NO SCROLLING
            padding: '0.5rem',
            position: 'relative'
          }}
        >
          {children}
        </div>

        {/* ROW 23: FASTEXT FOOTER - ALWAYS PRESENT */}
        <div 
          className="teletext-fastext"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            height: '2rem',
            fontFamily: "'VT323', monospace",
            fontSize: '1.2rem',
            overflow: 'hidden'
          }}
        >
          <div 
            className="fastext-button"
            style={{ 
              backgroundColor: '#CC0000', 
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '2px solid #000'
            }}
            onClick={() => navigateToPage(theme.fastext.red.page)}
          >
            {theme.fastext.red.label}
          </div>
          <div 
            className="fastext-button"
            style={{ 
              backgroundColor: '#00CC00', 
              color: '#000000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '2px solid #000'
            }}
            onClick={() => navigateToPage(theme.fastext.green.page)}
          >
            {theme.fastext.green.label}
          </div>
          <div 
            className="fastext-button"
            style={{ 
              backgroundColor: '#FFFF00', 
              color: '#000000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '2px solid #000'
            }}
            onClick={() => navigateToPage(theme.fastext.yellow.page)}
          >
            {theme.fastext.yellow.label}
          </div>
          <div 
            className="fastext-button"
            style={{ 
              backgroundColor: '#00CCCC', 
              color: '#000000',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => navigateToPage(theme.fastext.cyan.page)}
          >
            {theme.fastext.cyan.label}
          </div>
        </div>
      </div>

      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines"></div>
      
      {/* Narrator Toggle (floating) */}
      <div 
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          cursor: 'pointer',
          fontSize: '1.5rem',
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.7)',
          padding: '0.5rem',
          borderRadius: '4px',
          color: '#00FF00'
        }}
        onClick={toggle}
        title={isEnabled ? 'Narrator: ON' : 'Narrator: OFF'}
      >
        {isEnabled ? '🔊' : '🔇'}
      </div>
    </div>
  )
}
