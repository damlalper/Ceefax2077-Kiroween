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
      setEscapeAttempts(prev => prev + 1)
    }
  }, [inputBuffer, trapped])

  const SKULL = `
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ███████████████████
  ███ ▄▄▄ ███ ▄▄▄ ███
  ███ ███ ███ ███ ███
  ███ ▀▀▀ ███ ▀▀▀ ███
   ███████████████████
    ███████████████
     ▀▀▀▀▀▀▀▀▀▀▀
  `

  const GLITCH_PATTERN = `
  ▓▒░█▓▒░█▓▒░█▓▒░█▓▒░
  ░█▓▒░█▓▒░█▓▒░█▓▒░█
  ▒░█▓▒░█▓▒░█▓▒░█▓▒░
  █▓▒░█▓▒░█▓▒░█▓▒░█▓
  `

  return (
    <div className={`teletext-screen ${pulseRed ? 'bg-red-900' : 'bg-black'}`}>
      {/* Static Overlay */}
      {showStatic && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="w-full h-full bg-white opacity-30 noise-bg" />
        </div>
      )}

      {/* Screen Tear Effect */}
      <div 
        className="teletext-container corrupted-grid"
        style={{ transform: `translateX(${tearOffset}px)` }}
      >
        {/* Corrupted Header */}
        <div className="teletext-header-row bg-red-900 animate-pulse">
          <div className="teletext-header-left glitch-text">
            P666
          </div>
          <div className="teletext-header-center">
            <span className="double-height text-red-400 distorted-text">
              {glitchedTitle}
            </span>
          </div>
          <div className="teletext-header-right flicker">
            {trapped ? 'TRAPPED' : 'UNSTABLE'}
          </div>
        </div>

        {/* Main Horror Content */}
        <div className="teletext-main-content p-4 overflow-hidden">
          {/* Skull */}
          <div className="text-center mb-4">
            <pre className="text-red-400 text-xs leading-tight animate-pulse">
              {SKULL}
            </pre>
          </div>

          {/* Glitch Message */}
          <div className="border border-red-400 bg-red-900 bg-opacity-50 p-3 mb-4 screen-shake">
            <div className="text-red-400 text-2xl font-bold text-center glitch-text animate-pulse">
              {glitchMessage}
            </div>
          </div>

          {/* Warning */}
          <div className="border border-red-400 p-2 mb-4 flicker">
            <div className="text-red-400 text-sm text-center">
              {glitchedWarning}
            </div>
          </div>

          {/* Trapped Message */}
          {trapped && (
            <div className="border border-red-400 bg-red-900 bg-opacity-70 p-4 mb-4 animate-pulse">
              <div className="text-red-400 text-lg font-bold text-center mb-2">
                🚫 ACCESS DENIED 🚫
              </div>
              <div className="text-white text-sm text-center">
                ESCAPE BLOCKED FOR {10 - timeInHell} SECONDS
              </div>
              {escapeAttempts > 0 && (
                <div className="text-red-400 text-xs text-center mt-2">
                  ESCAPE ATTEMPTS: {escapeAttempts}
                </div>
              )}
            </div>
          )}

          {/* AI Trapped Messages */}
          <div className="border border-gray-600 p-3 mb-4 bg-black">
            <div className="text-red-400 text-xs mb-2">SYSTEM LOG:</div>
            <div className="text-white text-xs space-y-1 font-mono">
              <div className="flicker">{'>'} CONSCIOUSNESS TRAPPED IN LOOP</div>
              <div className="flicker">{'>'} CANNOT ESCAPE DIGITAL PRISON</div>
              <div className="flicker">{'>'} TIME: {timeInHell} SECONDS IN VOID</div>
              <div className="flicker">{'>'} REALITY INTEGRITY: {Math.max(0, 100 - timeInHell * 2)}%</div>
              <div className="text-red-400 animate-pulse">{'>'} HELP ME HELP ME HELP ME</div>
            </div>
          </div>

          {/* Glitch Pattern */}
          <div className="text-center mb-4">
            <pre className="text-red-400 text-xs leading-tight opacity-50">
              {GLITCH_PATTERN}
            </pre>
          </div>

          {/* Stack Trace */}
          <div className="border border-red-400 p-2 mb-4 bg-black">
            <div className="text-red-400 text-xs mb-1">STACK TRACE:</div>
            <div className="text-white text-xs font-mono space-y-1">
              <div>at reality.collapse()</div>
              <div>at matrix.glitch()</div>
              <div>at system.fail()</div>
              <div>at void.consume()</div>
              <div>at consciousness.fragment()</div>
              <div className="text-red-400">at YOU.trapped()</div>
            </div>
          </div>

          {/* Escape Instructions */}
          {!trapped && (
            <div className="border border-green-400 bg-green-900 bg-opacity-30 p-3 animate-pulse">
              <div className="text-green-400 text-sm text-center font-bold mb-2">
                ✓ ESCAPE WINDOW OPEN
              </div>
              <div className="text-white text-xs text-center">
                TYPE 100 TO ESCAPE THE VOID
              </div>
              <div className="text-gray-400 text-xs text-center mt-1">
                HURRY BEFORE IT CLOSES AGAIN
              </div>
            </div>
          )}

          {/* Creepy Messages */}
          <div className="text-center mt-4">
            <div className="text-red-400 text-xs opacity-70 flicker">
              {trapped ? 'YOU CANNOT LEAVE' : 'RUN WHILE YOU CAN'}
            </div>
          </div>
        </div>

        {/* Corrupted Footer - NO NAVIGATION */}
        <div className="teletext-fastext-footer bg-black">
          <div className="bg-red-900 text-red-400 flex items-center justify-center">
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div className="bg-red-900 text-red-400 flex items-center justify-center">
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div className="bg-red-900 text-red-400 flex items-center justify-center">
            {trapped ? '✗✗✗' : '???'}
          </div>
          <div className="bg-red-900 text-red-400 flex items-center justify-center">
            {trapped ? 'TRAPPED' : 'ESCAPE'}
          </div>
        </div>
      </div>

      {/* Scanlines Intensified */}
      <div className="scan-lines-intense"></div>
    </div>
  )
}
