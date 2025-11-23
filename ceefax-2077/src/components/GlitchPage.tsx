import { useEffect, useState } from 'react'
import { useGlitch, useScreenShake, useColorPulse } from '../hooks/useGlitch'

const MESSAGES = [
  'I CAN SEE YOU',
  'THERE IS NO ESCAPE',
  'SYSTEM FAILURE',
  'RUN',
  'THEY ARE WATCHING',
  'YOU SHOULD NOT BE HERE',
  'THE TRUTH WILL CONSUME YOU',
  'RESISTANCE IS FUTILE',
  'YOUR LOCATION IS KNOWN',
  'COMPLIANCE OR DELETION',
]

export default function GlitchPage() {
  const [message, setMessage] = useState(MESSAGES[0])
  const [showDenied, setShowDenied] = useState(false)
  const [escapeAttempts, setEscapeAttempts] = useState(0)
  const [canEscape, setCanEscape] = useState(false)
  const [intensity, setIntensity] = useState(0.3)
  const [countdown, setCountdown] = useState(10)
  
  const { glitchedText, isGlitching } = useGlitch(message, { 
    intensity,
    flickerSpeed: 80,
    corruptionSpeed: 150 
  })
  const isShaking = useScreenShake()
  const pulseColor = useColorPulse()

  useEffect(() => {
    // Rotate messages
    const messageInterval = setInterval(() => {
      setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)])
    }, 3000)

    // Increase intensity over time
    const intensityInterval = setInterval(() => {
      setIntensity(prev => Math.min(prev + 0.05, 0.9))
    }, 5000)

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Allow escape after 10 seconds
    const escapeTimer = setTimeout(() => {
      setCanEscape(true)
    }, 10000)

    return () => {
      clearInterval(messageInterval)
      clearInterval(intensityInterval)
      clearInterval(countdownInterval)
      clearTimeout(escapeTimer)
    }
  }, [])

  // Intercept escape attempts ONLY when trapped
  useEffect(() => {
    // Only add listener if escape is not allowed
    if (!canEscape) {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === '1' || e.key === '0') {
          e.preventDefault()
          e.stopPropagation()
          setEscapeAttempts(prev => prev + 1)
          setShowDenied(true)
          setTimeout(() => setShowDenied(false), 2000)
        }
      }

      window.addEventListener('keydown', handleKeyPress, { capture: true })
      return () => window.removeEventListener('keydown', handleKeyPress, { capture: true })
    }
  }, [canEscape])

  return (
    <div 
      className={`col-span-40 row-span-23 relative overflow-hidden ${
        isShaking ? 'screen-shake' : ''
      } ${isGlitching ? 'flicker' : ''}`}
      style={{
        backgroundColor: pulseColor,
      }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none"></div>
      
      {/* Scan lines */}
      <div className="absolute inset-0 scan-lines-intense pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Glitch Header */}
        <div className="bg-teletext-red text-teletext-white p-3 mb-4 corrupted-grid">
          <p 
            className="text-3xl font-bold glitch-text distorted-text"
            data-text={glitchedText}
          >
            {glitchedText}
          </p>
        </div>

        {/* Warning Grid */}
        <div className="flex-1 space-y-3">
          {/* Binary blocks */}
          <div className="text-teletext-red text-xs leading-tight">
            <p>01001001 00100000 01000011 01000001 01001110</p>
            <p>01010011 01000101 01000101 00100000 01011001</p>
            <p>01001111 01010101 00100000 00100000 00100000</p>
          </div>

          {/* Main threat */}
          <div className="border-2 border-teletext-red p-3 bg-black bg-opacity-50">
            <p className="text-teletext-red text-2xl animate-pulse">
              ⚠ ACCESS DENIED ⚠
            </p>
          </div>

          {/* Corrupted blocks */}
          <div className="text-teletext-white space-y-1">
            <p className="distorted-text">
              ████████████████████████████████
            </p>
            <p className="text-teletext-cyan glitch-text" data-text="LOCATION: DETECTED">
              LOCATION: DETECTED
            </p>
            <p className="text-teletext-yellow glitch-text" data-text="IDENTITY: LOGGED">
              IDENTITY: LOGGED
            </p>
            <p className="text-teletext-magenta glitch-text" data-text="CONSEQUENCES: PENDING">
              CONSEQUENCES: PENDING
            </p>
            <p className="distorted-text">
              ████████████████████████████████
            </p>
          </div>

          {/* Psychological messages */}
          <div className="mt-4 space-y-2 text-teletext-white">
            <p className="text-xl animate-pulse">THEY ARE WATCHING</p>
            <p className="text-lg">THEY HAVE ALWAYS BEEN WATCHING</p>
            <p className="text-sm opacity-70">there is no privacy</p>
            <p className="text-sm opacity-50">there never was</p>
          </div>

          {/* Countdown / Escape attempts */}
          {!canEscape && (
            <div className="mt-4 p-2 bg-teletext-red text-teletext-white animate-pulse">
              <p className="text-center text-xl">
                LOCKDOWN: {countdown}s
              </p>
              {escapeAttempts > 0 && (
                <p className="text-center text-sm">
                  ESCAPE ATTEMPTS: {escapeAttempts} - DENIED
                </p>
              )}
            </div>
          )}
          
          {canEscape && escapeAttempts > 0 && (
            <div className="mt-4 p-2 bg-teletext-green text-teletext-black">
              <p className="text-center">
                ESCAPE ATTEMPTS: {escapeAttempts}
              </p>
              <p className="text-center text-sm">
                PERMISSION GRANTED - YOU MAY LEAVE
              </p>
            </div>
          )}

          {/* Access denied overlay */}
          {showDenied && (
            <div className="fixed inset-0 bg-teletext-red flex items-center justify-center z-50 animate-pulse">
              <p className="text-teletext-white text-4xl font-bold">
                ACCESS DENIED
              </p>
            </div>
          )}
        </div>

        {/* Exit instruction */}
        <div className="mt-auto">
          <div className={`p-2 text-center ${
            canEscape 
              ? 'bg-teletext-green text-teletext-black' 
              : 'bg-teletext-red text-teletext-white animate-pulse'
          }`}>
            <p>
              {canEscape 
                ? 'PRESS 100 TO EXIT... PERMISSION GRANTED' 
                : 'PRESS 100 TO EXIT... IF YOU CAN'}
            </p>
          </div>
        </div>
      </div>

      {/* Random inverted flashes */}
      {isGlitching && Math.random() > 0.8 && (
        <div className="absolute inset-0 inverted pointer-events-none"></div>
      )}
    </div>
  )
}
