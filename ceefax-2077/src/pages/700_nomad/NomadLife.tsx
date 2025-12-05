import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'

interface Destination {
  city: string
  country: string
  cost: number
  wifi: string
  weather: string
  visa: string
  safety: string
}

export default function NomadLife() {
  const [destinations] = useState<Destination[]>([
    { city: 'Bali', country: 'Indonesia', cost: 800, wifi: '⚡ FAST', weather: '☀️ 28°C', visa: '30 days', safety: '🟢 SAFE' },
    { city: 'Lisbon', country: 'Portugal', cost: 1500, wifi: '⚡ FAST', weather: '🌤️ 22°C', visa: '90 days', safety: '🟢 SAFE' },
    { city: 'Chiang Mai', country: 'Thailand', cost: 700, wifi: '⚡ FAST', weather: '☀️ 30°C', visa: '30 days', safety: '🟢 SAFE' },
    { city: 'Medellín', country: 'Colombia', cost: 900, wifi: '⚡ FAST', weather: '🌤️ 24°C', visa: '90 days', safety: '🟡 CAUTION' },
    { city: 'Prague', country: 'Czech Rep', cost: 1200, wifi: '⚡ FAST', weather: '🌥️ 18°C', visa: '90 days', safety: '🟢 SAFE' },
    { city: 'Mexico City', country: 'Mexico', cost: 1000, wifi: '⚡ FAST', weather: '☀️ 25°C', visa: '180 days', safety: '🟡 CAUTION' },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    const rotateInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % destinations.length)
    }, 5000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(rotateInterval)
    }
  }, [destinations.length])

  const current = destinations[currentIndex]

  return (
    <TeletextPage 
      title="NOMAD LIFE" 
      subtitle="Digital Nomad Destinations • Cost of Living"
      footer="Auto-rotate 5s • Real-time data"
      zone={701}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Featured Destination */}
        <div style={{
          border: '2px solid #FFFF00',
          backgroundColor: 'rgba(255, 255, 0, 0.1)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div style={{ color: '#FFFF00', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
              {blink ? '▶' : ' '} FEATURED DESTINATION {blink ? '◀' : ' '}
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(20px, 3vmin, 28px)', fontWeight: 'bold' }}>
              {current.city}
            </div>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(14px, 2vmin, 18px)' }}>
              {current.country}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>💰 Cost/Month:</span>
              <span style={{ color: '#00FF00' }}>${current.cost}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>WiFi:</span>
              <span style={{ color: '#00FF00' }}>{current.wifi}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Weather:</span>
              <span style={{ color: '#00FFFF' }}>{current.weather}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Visa:</span>
              <span style={{ color: '#FFFF00' }}>{current.visa}</span>
            </div>
          </div>

          <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>Safety: </span>
            <span style={{ fontSize: 'clamp(12px, 2vmin, 16px)' }}>{current.safety}</span>
          </div>
        </div>

        {/* All Destinations List */}
        <div style={{ border: '2px solid #00FFFF', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>
            ALL DESTINATIONS:
          </div>
          {destinations.map((dest, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.25rem 0',
                borderBottom: idx < destinations.length - 1 ? '1px solid #333' : 'none',
                backgroundColor: idx === currentIndex ? 'rgba(255, 255, 0, 0.2)' : 'transparent',
                fontSize: 'clamp(10px, 1.5vmin, 14px)'
              }}
            >
              <span style={{ color: '#FFFFFF' }}>{dest.city}</span>
              <span style={{ color: '#00FF00' }}>${dest.cost}/mo</span>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={{ border: '2px solid #FFFF00', padding: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
          <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>💡 NOMAD TIPS:</div>
          <div style={{ color: '#FFFFFF' }}>
            • Book accommodation 1 month ahead<br />
            • Get travel insurance<br />
            • Join local coworking spaces<br />
            • Learn basic local phrases
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
