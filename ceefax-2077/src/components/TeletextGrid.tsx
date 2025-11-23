import { useEffect, useState } from 'react'
import { useTeletext } from '../context/TeletextContext'

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

  return (
    <div className="teletext-screen">
      {/* CRT Container */}
      <div className="teletext-container">
        {/* Header Row - Blue Strip with Yellow Double-Height Text */}
        <div className="teletext-header-row">
          <div className="teletext-header-left">
            P{pageDisplay}
          </div>
          <div className="teletext-header-center">
            <span className="double-height">CEEFAX 2077</span>
          </div>
          <div className="teletext-header-right">
            {formatDate(time)} {formatTime(time)}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="teletext-main-content">
          {children}
        </div>

        {/* Fastext Footer - 4 Colored Bars */}
        <div className="teletext-fastext-footer">
          <div className="fastext-red">100 INDEX</div>
          <div className="fastext-green">101 STATUS</div>
          <div className="fastext-yellow">200 DEPLOYS</div>
          <div className="fastext-cyan">300 ERRORS</div>
        </div>
      </div>

      {/* CRT Scanlines Overlay */}
      <div className="crt-scanlines"></div>
    </div>
  )
}
