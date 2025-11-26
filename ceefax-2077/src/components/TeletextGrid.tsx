import { useEffect, useState } from 'react'
import { useTeletext } from '../context/TeletextContext'
import { getZoneColor, getZoneTitle, getZoneNavigation } from '../utils/zoneHelper'

interface TeletextGridProps {
  children?: React.ReactNode
}

export default function TeletextGrid({ children }: TeletextGridProps) {
  const [time, setTime] = useState(new Date())
  const { currentPage, inputBuffer } = useTeletext()

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
  const navigation = getZoneNavigation(currentPage)

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

        {/* Fastext Footer - Dynamic Navigation */}
        <div className="teletext-fastext-footer">
          {navigation ? (
            <>
              <div className="fastext-red">{navigation.prevZone} PREV</div>
              <div className="fastext-green">{navigation.currentZone} INDEX</div>
              <div className="fastext-yellow">{navigation.nextZone} NEXT</div>
              <div className="fastext-cyan">666 KILL</div>
            </>
          ) : (
            <>
              <div className="fastext-red">100 GLOBAL</div>
              <div className="fastext-green">500 VIBE</div>
              <div className="fastext-yellow">900 SYSTEM</div>
              <div className="fastext-cyan">666 KILL</div>
            </>
          )}
        </div>
      </div>

      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines"></div>
    </div>
  )
}
