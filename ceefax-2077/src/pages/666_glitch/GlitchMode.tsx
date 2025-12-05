import { useState, useEffect } from 'react'
import { useTeletext } from '../../context/TeletextContext'
import { useGlitch, useGlitchMessages, useScreenTear } from '../../hooks/useGlitch'

export default function GlitchMode() {
  const { inputBuffer } = useTeletext()
  const [trapped, setTrapped] = useState(true)
  const [escapeAttempts, setEscapeAttempts] = useState(0)
  const [pulseRed, setPulseRed] = useState(false)
  const [showStatic, setShowStatic] = useState(false)
  const [timeInHell, setTimeInHell] = useState(0)

  const glitchMessage = useGlitchMessages()
  const glitchedTitle = useGlitch('SYSTEM FAILURE', 0.4)
  const glitchedWarning = useGlitch('ERROR: REALITY CORRUPTION', 0.3)
  const tearOffset = useScreenTear()

  useEffect(() => {
    // Trap user for 10 seconds
    const trapTimer = setTimeout(() => {
      setTrapped(false)
    }, 10000)

    // Pulse red background
    const pulseInterval = setInterval(() => {
      setPulseRed(prev => !prev)
    }, 800)

    // Random static flashes
    const staticInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowStatic(true)
        setTimeout(() => setShowStatic(false), 100)
      }
    }, 1000)

    // Track time in hell
    const timeInterval = setInterval(() => {
      setTimeInHell(prev => prev + 1)
    }, 1000)

    return () => {
      clearTimeout(trapTimer)
      clearInterval(pulseInterval)
      clearInterval(staticInterval)
      clearInterval(timeInterval)
    }
  }, [])

  useEffect(() => {
    // Block escape attempts
    if (trapped && inputBuffer === '100') {
      setEscapeAttempts(prev => {
        const newCount = prev + 1;
        return newCount;
      });
    }
  }, [inputBuffer, trapped])



  return (
    <div 
      className={`teletext-screen ${pulseRed ? 'bg-red-900' : 'bg-black'}`}
      style={{
        // Apply glitch effects to CONTAINER, not content
        filter: showStatic ? 'contrast(1.5) brightness(1.2)' : 'none',
        transform: `translateX(${tearOffset}px)`,
        transition: 'transform 0.05s'
      }}
    >
      {/* Static Overlay */}
      {showStatic && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="w-full h-full bg-white opacity-30 noise-bg" />
        </div>
      )}

      {/* Use TeletextPage but with corrupted styling */}
      <div className="teletext-container corrupted-grid">
        {/* Corrupted Header */}
        <div 
          className="teletext-header-row animate-pulse"
          style={{
            backgroundColor: '#660000',
            color: '#FF0000',
            fontFamily: "'VT323', monospace",
            fontSize: '1.5rem',
            padding: '0.25rem 0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '2rem'
          }}
        >
          <span className="glitch-text">P666</span>
          <span className="double-height distorted-text">{glitchedTitle}</span>
          <span className="flicker">{trapped ? 'TRAPPED' : 'UNSTABLE'}</span>
        </div>

        {/* Main Horror Content - PRESERVE 40x24 GRID */}
        <div 
          className="teletext-main-content"
          style={{
            fontFamily: "'VT323', monospace",
            height: 'calc(100% - 4rem)',
            overflow: 'hidden',
            padding: '0.5rem',
            fontSize: 'clamp(10px, 1.5vmin, 14px)',
            lineHeight: '1.2'
          }}
        >
          {/* Glitch Message - Compact */}
          <div style={{
            border: '2px solid #FF0000',
            backgroundColor: 'rgba(153, 0, 0, 0.5)',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }} className="screen-shake">
            <div style={{ color: '#FF0000', fontSize: '1.2em', fontWeight: 'bold' }} className="glitch-text animate-pulse">
              {glitchMessage}
            </div>
          </div>

          {/* Warning */}
          <div style={{
            border: '1px solid #FF0000',
            padding: '0.25rem',
            marginBottom: '0.5rem',
            textAlign: 'center',
            color: '#FF0000',
            fontSize: '0.9em'
          }} className="flicker">
            {glitchedWarning}
          </div>

          {/* Trapped Message */}
          {trapped && (
            <div style={{
              border: '2px solid #FF0000',
              backgroundColor: 'rgba(153, 0, 0, 0.7)',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              textAlign: 'center'
            }} className="animate-pulse">
              <div style={{ color: '#FF0000', fontSize: '1em', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                🚫 ACCESS DENIED 🚫
              </div>
              <div style={{ color: '#FFFFFF', fontSize: '0.8em' }}>
                BLOCKED: {10 - timeInHell}s
              </div>
              {escapeAttempts > 0 && (
                <div style={{ color: '#FF0000', fontSize: '0.7em', marginTop: '0.25rem' }}>
                  ATTEMPTS: {escapeAttempts}
                </div>
              )}
            </div>
          )}

          {/* AI Trapped Messages - Compact */}
          <div style={{
            border: '1px solid #666666',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor: '#000000',
            fontSize: '0.7em'
          }}>
            <div style={{ color: '#FF0000', marginBottom: '0.25rem' }}>SYSTEM LOG:</div>
            <div style={{ color: '#FFFFFF' }}>
              <div className="flicker">{'>'} TRAPPED IN LOOP</div>
              <div className="flicker">{'>'} TIME: {timeInHell}s IN VOID</div>
              <div className="flicker">{'>'} INTEGRITY: {Math.max(0, 100 - timeInHell * 2)}%</div>
              <div style={{ color: '#FF0000' }} className="animate-pulse">{'>'} HELP ME HELP ME</div>
            </div>
          </div>

          {/* Stack Trace - Compact */}
          <div style={{
            border: '1px solid #FF0000',
            padding: '0.5rem',
            marginBottom: '0.5rem',
            backgroundColor: '#000000',
            fontSize: '0.7em'
          }}>
            <div style={{ color: '#FF0000', marginBottom: '0.25rem' }}>STACK TRACE:</div>
            <div style={{ color: '#FFFFFF' }}>
              <div>at reality.collapse()</div>
              <div>at system.fail()</div>
              <div>at void.consume()</div>
              <div style={{ color: '#FF0000' }}>at YOU.trapped()</div>
            </div>
          </div>

          {/* Escape Instructions */}
          {!trapped && (
            <div style={{
              border: '2px solid #00FF00',
              backgroundColor: 'rgba(0, 153, 0, 0.3)',
              padding: '0.5rem',
              textAlign: 'center'
            }} className="animate-pulse">
              <div style={{ color: '#00FF00', fontSize: '0.9em', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                ✓ ESCAPE WINDOW OPEN
              </div>
              <div style={{ color: '#FFFFFF', fontSize: '0.7em' }}>
                TYPE 100 TO ESCAPE
              </div>
            </div>
          )}

          {/* Creepy Message */}
          <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
            <div style={{ color: '#FF0000', fontSize: '0.7em', opacity: 0.7 }} className="flicker">
              {trapped ? 'YOU CANNOT LEAVE' : 'RUN WHILE YOU CAN'}
            </div>
          </div>
        </div>

        {/* Corrupted Footer - NO NAVIGATION */}
        <div 
          className="teletext-fastext"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            height: '2rem',
            fontFamily: "'VT323', monospace",
            fontSize: '1.2rem'
          }}
        >
          <div style={{
            backgroundColor: '#660000',
            color: '#FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '2px solid #000'
          }}>
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div style={{
            backgroundColor: '#660000',
            color: '#FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '2px solid #000'
          }}>
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div style={{
            backgroundColor: '#660000',
            color: '#FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '2px solid #000'
          }}>
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div style={{
            backgroundColor: '#660000',
            color: '#FF0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {trapped ? 'TRAPPED' : 'ESCAPE'}
          </div>
        </div>
      </div>

      {/* Scanlines Intensified */}
      <div className="scan-lines-intense"></div>
    </div>
  )
}
