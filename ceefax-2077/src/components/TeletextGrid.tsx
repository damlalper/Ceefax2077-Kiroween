import { useEffect, useState } from 'react'
import { useTeletext } from '../context/TeletextContext'
import { getZoneColor, getZoneTitle } from '../utils/zoneHelper'
import { useNarrator } from '../hooks/useNarrator'
import { useVHS } from '../hooks/useVHS'

interface TeletextGridProps {
  children?: React.ReactNode
  pageContent?: string
}

export default function TeletextGrid({ children, pageContent = '' }: TeletextGridProps) {
  const [time, setTime] = useState(new Date())
  const { currentPage, inputBuffer } = useTeletext()
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
    const day = days[date.getDay()]
    const dateNum = String(date.getDate()).padStart(2, '0')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()]
    return `${day} ${dateNum} ${month}`
  }

  const pageDisplay = inputBuffer.length > 0 
    ? inputBuffer.padEnd(3, '_') 
    : String(currentPage).padStart(3, '0')

  // Get zone-specific styling
  const zoneColor = getZoneColor(currentPage)
  const zoneTitle = getZoneTitle(currentPage)

  return (
    <div className="teletext-screen">
      {/* CRT Container */}
      <div className="teletext-container">
        {/* Header Row - Dynamic Color Based on Zone */}
        <div 
          className="teletext-header-row"
          style={{ backgroundColor: zoneColor }}
        >
          <div className="teletext-header-left">
            P{pageDisplay}
            {isRecording && (
              <span 
                className="ml-2 text-red-500 animate-pulse font-bold"
                style={{ animation: 'pulse 0.5s ease-in-out infinite' }}
              >
                [REC ●]
              </span>
            )}
          </div>
          <div className="teletext-header-center">
            <span className="double-height">{zoneTitle}</span>
          </div>
          <div className="teletext-header-right">
            {formatDate(time)} {formatTime(time)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="teletext-main-content">
          {children}
        </div>

        {/* Fastext Footer - 5-ZONE Navigation */}
        <div className="teletext-fastext-footer">
          <div className="fastext-red">100 TRUTH</div>
          <div className="fastext-green">200 SYSTM</div>
          <div className="fastext-yellow">300 PULSE</div>
          <div className="fastext-cyan">400 PLNET</div>
          <div className="fastext-blue">500 SHILD</div>
          <div 
            className="fastext-magenta"
            onClick={toggle}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            title={isEnabled ? 'Narrator: ON' : 'Narrator: OFF'}
          >
            {isEnabled ? '🔊 ON' : '🔇 OFF'}
          </div>
        </div>
      </div>

      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines"></div>
    </div>
  )
}
