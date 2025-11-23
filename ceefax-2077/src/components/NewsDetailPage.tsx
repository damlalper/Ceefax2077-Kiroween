import { useEffect, useState } from 'react'
import { useTeletext } from '../context/TeletextContext'

// This component shows a detailed view of a news story
// Currently shows a placeholder, but demonstrates the navigation pattern
export default function NewsDetailPage() {
  const { currentPage } = useTeletext()
  const [scanlineEffect, setScanlineEffect] = useState(false)

  useEffect(() => {
    // Simulate page loading effect
    setScanlineEffect(true)
    const timer = setTimeout(() => setScanlineEffect(false), 300)
    return () => clearTimeout(timer)
  }, [currentPage])

  return (
    <div 
      className={`teletext-page transition-opacity ${
        scanlineEffect ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {/* Title Banner */}
      <div className="teletext-title-banner">
        <span className="double-height">NEWS DETAIL</span>
      </div>

      {/* Subtitle */}
      <div className="teletext-subtitle">
        PAGE {currentPage} - FULL STORY
      </div>

      {/* Content */}
      <div className="teletext-detail-content">
        {/* Body */}
        <div className="teletext-detail-body">
          <p className="text-white">FULL STORY CONTENT WOULD APPEAR HERE.</p>
          <p className="text-white">IN PHASE 5, THIS WILL LOAD DETAILED</p>
          <p className="text-white">INFORMATION ABOUT THE SELECTED NEWS</p>
          <p className="text-white">ITEM FROM THE HEADLINES PAGE.</p>
        </div>

        {/* Additional Info */}
        <div className="teletext-detail-related">
          <p className="text-cyan">RELATED STORIES:</p>
          <p className="text-white">► 101 RETURN TO HEADLINES</p>
          <p className="text-white">► 103 NEXT STORY</p>
          <p className="text-white">► 100 MAIN INDEX</p>
        </div>

        {/* System Message */}
        <div className="teletext-detail-verified">
          <p>THIS INFORMATION HAS BEEN VERIFIED</p>
          <p>BY THE TRUTH TERMINAL SYSTEM</p>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner">
        THE TRUTH TERMINAL - YOUR ONLY SOURCE
      </div>
    </div>
  )
}
