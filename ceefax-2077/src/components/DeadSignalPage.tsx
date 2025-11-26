import { useState, useEffect } from 'react'

interface GhostFragment {
  id: number
  text: string
  x: number
  y: number
  opacity: number
  speed: number
}

const ERROR_MESSAGES = [
  'SIGNAL LOST',
  'NO CARRIER',
  'CONNECTION FAILED',
  'TIMEOUT ERROR',
  'HOST UNREACHABLE',
  'PACKET DROPPED',
  'FATAL ERROR',
  'SYSTEM CRASH',
  'MEMORY LEAK',
  'STACK OVERFLOW',
  'NULL POINTER',
  'SEGMENTATION FAULT',
  'ACCESS DENIED',
  'PERMISSION ERROR',
  'FILE NOT FOUND',
  'DISK FULL',
  'BUFFER OVERFLOW',
  'DEADLOCK DETECTED',
]

export default function DeadSignalPage() {
  const [fragments, setFragments] = useState<GhostFragment[]>([])
  const [signalStrength, setSignalStrength] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  // Generate floating ghost fragments
  useEffect(() => {
    const interval = setInterval(() => {
      const newFragment: GhostFragment = {
        id: Date.now() + Math.random(),
        text: ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)],
        x: Math.random() * 80,
        y: 100,
        opacity: 0.3 + Math.random() * 0.7,
        speed: 0.5 + Math.random() * 1.5,
      }

      setFragments(prev => [...prev.slice(-15), newFragment])
      setErrorCount(prev => prev + 1)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // Animate fragments
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setFragments(prev =>
        prev
          .map(f => ({
            ...f,
            y: f.y - f.speed,
            opacity: f.opacity - 0.01,
          }))
          .filter(f => f.y > -10 && f.opacity > 0)
      )
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  // Signal strength fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 15))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
    }, 3000)
  }

  return (
    <div className="teletext-page relative overflow-hidden">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: '#FF0000' }}>
        <span className="double-height">444 DEAD SIGNAL</span>
      </div>

      {/* Status Bar */}
      <div className="px-2 py-1 bg-black border-b border-red">
        <div className="flex justify-between text-sm">
          <span className="text-red">
            SIGNAL: {signalStrength}% {isScanning && '⚡ SCANNING...'}
          </span>
          <span className="text-white">ERRORS: {errorCount}</span>
          <span className="text-red animate-pulse">● DEAD</span>
        </div>
      </div>

      {/* Main Display Area */}
      <div className="relative h-64 bg-black border border-red mx-2 mt-2 overflow-hidden">
        {/* Static noise background */}
        <div className="absolute inset-0 opacity-10">
          <div className="text-white/20 text-xs leading-tight">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i}>
                {Array.from({ length: 40 })
                  .map(() => Math.random() > 0.5 ? '█' : '░')
                  .join('')}
              </div>
            ))}
          </div>
        </div>

        {/* Floating ghost fragments */}
        {fragments.map(fragment => (
          <div
            key={fragment.id}
            className="absolute text-red text-xs font-mono whitespace-nowrap"
            style={{
              left: `${fragment.x}%`,
              top: `${fragment.y}%`,
              opacity: fragment.opacity,
              transform: `translateX(-50%)`,
            }}
          >
            {fragment.text}
          </div>
        ))}

        {/* Center message */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <pre className="text-red text-xl animate-pulse">
{`  ▓▓▒▒░░
 ▓▓▓▒▒▒░░░
▓▓▓▓▒▒▒▒░░░░
 ▓▓▓▒▒▒░░░
  ▓▓▒▒░░`}
            </pre>
            <p className="text-white mt-2 text-base">DIGITAL GHOST DETECTED</p>
            <p className="text-red text-sm mt-1">FRAGMENTS FLOATING IN THE VOID</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-2 mt-3">
        <button
          onClick={handleScan}
          disabled={isScanning}
          className="px-4 py-2 bg-red text-white hover:bg-white hover:text-black disabled:opacity-50 text-base font-bold"
        >
          {isScanning ? '⚡ SCANNING...' : '▶ SCAN FOR SIGNALS'}
        </button>
      </div>

      {/* Info Panel */}
      <div className="px-2 mt-3">
        <div className="border border-red p-3 bg-red/10">
          <p className="text-red text-sm font-bold">⚠ SYSTEM STATUS:</p>
          <div className="text-white text-sm mt-1 space-y-1">
            <p>▸ Connection: TERMINATED</p>
            <p>▸ Last Packet: {Math.floor(Math.random() * 999)}ms ago</p>
            <p>▸ Ghost Fragments: {fragments.length} active</p>
            <p>▸ Recovery: IMPOSSIBLE</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-2 mt-2 text-white/50 text-sm">
        <p>Error messages float like ghosts in the void.</p>
        <p>Each fragment is a failed connection, a lost signal.</p>
        <p>They never truly disappear. They just fade away.</p>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: '#FF0000' }}>
        ANGEL NUMBER 444 - DIGITAL AFTERLIFE
      </div>
    </div>
  )
}
