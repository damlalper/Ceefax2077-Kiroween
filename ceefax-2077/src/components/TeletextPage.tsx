import type { ReactNode } from 'react'
import { DoubleHeight } from './TeletextLayout'

interface TeletextPageProps {
  title?: string
  subtitle?: string
  children: ReactNode
  footer?: string
  zone?: number
}

/**
 * Standard Teletext Page Wrapper
 * Enforces 40x24 grid layout with proper spacing
 */
export default function TeletextPage({ 
  title, 
  subtitle, 
  children, 
  footer,
  zone 
}: TeletextPageProps) {
  
  // Get zone-specific styling
  const getZoneClass = () => {
    if (!zone) return ''
    if (zone >= 100 && zone < 200) return 'zone-100-content'
    if (zone >= 200 && zone < 300) return 'zone-200-content'
    if (zone >= 300 && zone < 400) return 'zone-300-content'
    if (zone >= 400 && zone < 500) return 'zone-400-content'
    if (zone >= 500 && zone < 600) return 'zone-500-content'
    if (zone === 666) return 'zone-666-content'
    if (zone >= 800 && zone < 900) return 'zone-800-content'
    if (zone >= 900) return 'zone-900-content'
    return ''
  }

  return (
    <div className={`teletext-page-wrapper ${getZoneClass()}`}>
      {/* Title Row */}
      {title && (
        <div className="teletext-page-title">
          <DoubleHeight>{title}</DoubleHeight>
        </div>
      )}
      
      {/* Subtitle Row */}
      {subtitle && (
        <div 
          className="teletext-subtitle"
          style={{
            fontSize: 'clamp(14px, 2vmin, 20px)',
            textAlign: 'center',
            padding: '0.25rem 0',
            color: '#00FFFF'
          }}
        >
          {subtitle}
        </div>
      )}
      
      {/* Main Content - Strictly contained */}
      <div className="teletext-page-content">
        {children}
      </div>
      
      {/* Footer Row */}
      {footer && (
        <div className="teletext-page-footer">
          {footer}
        </div>
      )}
    </div>
  )
}

/**
 * Teletext List Item with bullet
 */
export function TeletextListItem({ children, bullet = '*' }: { children: ReactNode; bullet?: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' }}>
      <span className="teletext-bullet" style={{ color: '#00FFFF' }}>{bullet}</span>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  )
}

/**
 * Teletext Two-Column Layout
 */
export function TeletextColumns({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '1fr 1fr', 
      gap: '2rem',
      height: '100%'
    }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

/**
 * Teletext Box (for highlighted content)
 */
export function TeletextBox({ 
  children, 
  color = '#00FFFF',
  bgColor = '#000000'
}: { 
  children: ReactNode; 
  color?: string;
  bgColor?: string;
}) {
  return (
    <div style={{
      border: `2px solid ${color}`,
      backgroundColor: bgColor,
      padding: '0.5rem 1rem',
      margin: '0.5rem 0',
      color: color
    }}>
      {children}
    </div>
  )
}
