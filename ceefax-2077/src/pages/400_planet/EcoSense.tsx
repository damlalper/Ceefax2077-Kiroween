import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { EnvironmentService, type AtmosphereData } from '../../services/EnvironmentService'

export default function EcoSense() {
  const [data, setData] = useState<AtmosphereData | null>(null)
  const [loading, setLoading] = useState(true)
  const [blink, setBlink] = useState(true)
  const [flashWarning, setFlashWarning] = useState(false)

  const loadAtmosphereData = () => {
    setLoading(true)
    // Simulate sensor delay
    setTimeout(() => {
      const atmosphereData = EnvironmentService.generateAtmosphereData()
      setData(atmosphereData)
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    loadAtmosphereData()

    // Blink effect
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    // Flash warning if hazardous
    const flashInterval = setInterval(() => {
      if (data?.hazardous) {
        setFlashWarning(prev => !prev)
      }
    }, 1000)

    // Auto-refresh every 10 seconds
    const refreshInterval = setInterval(() => {
      loadAtmosphereData()
    }, 10000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(flashInterval)
      clearInterval(refreshInterval)
    }
  }, [data])

  return (
    <TeletextPage 
      title={data?.hazardous ? "🚨 ECO SENSE 🚨" : "ECO SENSE"} 
      subtitle="Atmosphere Monitor • Environmental Sensors"
      footer="📡 Auto-refresh 10s • Scientific monitoring"
      zone={401}
    >
      <div style={{ animation: flashWarning ? 'pulse 2s infinite' : 'none' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ 
              color: '#FFD700', 
              fontSize: 'clamp(16px, 2.5vmin, 24px)',
              opacity: blink ? 1 : 0,
              transition: 'opacity 0.3s'
            }}>
              📡 SCANNING ATMOSPHERE...
            </div>
            <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
              Reading environmental sensors
            </div>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Hazard Warning */}
            {data.hazardous && (
              <div style={{ 
                border: '2px solid #FF0000', 
                backgroundColor: 'rgba(139, 0, 0, 0.4)', 
                padding: '0.5rem', 
                marginBottom: '1rem',
                animation: 'pulse 2s infinite'
              }}>
                <div style={{ color: '#FF0000', textAlign: 'center', fontWeight: 'bold', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
                  🚨 ENVIRONMENTAL HAZARD DETECTED 🚨
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginTop: '0.25rem' }}>
                  {data.warning}
                </div>
              </div>
            )}

            {/* Weather Icon */}
            <div style={{ border: '2px solid #00CC66', padding: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <pre style={{ color: '#00FFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2', margin: 0 }}>
                {EnvironmentService.getWeatherIcon(data.aqi, data.temperature)}
              </pre>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)', marginTop: '0.5rem' }}>
                {data.temperature}°C • {data.humidity}% Humidity
              </div>
            </div>

            {/* Air Quality Index */}
            <div style={{
              border: data.hazardous ? '2px solid #FF0000' : '2px solid #00CC66',
              backgroundColor: data.hazardous ? 'rgba(139, 0, 0, 0.2)' : 'transparent',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)' }}>AIR QUALITY INDEX</div>
                <div style={{ 
                  fontSize: 'clamp(32px, 6vmin, 48px)', 
                  fontWeight: 'bold',
                  color: EnvironmentService.getAQIColor(data.aqi)
                }}>
                  {data.aqi}
                </div>
                <div style={{ 
                  fontSize: 'clamp(12px, 2vmin, 16px)',
                  color: EnvironmentService.getAQIColor(data.aqi)
                }}>
                  {data.aqiLevel.replace(/_/g, ' ')}
                </div>
              </div>

              {/* AQI Bar */}
              <div style={{ marginTop: '1rem', backgroundColor: '#333333', height: '16px', position: 'relative' }}>
                <div
                  style={{
                    height: '100%',
                    transition: 'width 0.3s',
                    backgroundColor: 
                      data.aqi > 300 ? '#8B0000' :
                      data.aqi > 200 ? '#CC0000' :
                      data.aqi > 150 ? '#FF0000' :
                      data.aqi > 100 ? '#FF8800' :
                      data.aqi > 50 ? '#FFD700' : '#00CC66',
                    width: `${Math.min((data.aqi / 500) * 100, 100)}%`
                  }}
                />
              </div>
            </div>

            {/* Pollutants */}
            <div style={{ border: '2px solid #666666', padding: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>POLLUTANT LEVELS:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>PM2.5:</span>
                  <span style={{ color: data.pm25 > 35 ? '#FF0000' : '#00CC66' }}>
                    {data.pm25} μg/m³
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>PM10:</span>
                  <span style={{ color: data.pm10 > 150 ? '#FF0000' : '#00CC66' }}>
                    {data.pm10} μg/m³
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>O₃:</span>
                  <span style={{ color: data.ozone > 70 ? '#FFD700' : '#00CC66' }}>
                    {data.ozone} ppb
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>NO₂:</span>
                  <span style={{ color: data.no2 > 40 ? '#FFD700' : '#00CC66' }}>
                    {data.no2} ppb
                  </span>
                </div>
              </div>
            </div>

            {/* Radiation */}
            <div style={{
              border: data.radiationLevel === 'DANGEROUS' ? '2px solid #FF0000' : '2px solid #666666',
              backgroundColor: data.radiationLevel === 'DANGEROUS' ? 'rgba(139, 0, 0, 0.2)' : 'transparent',
              padding: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>☢️ RADIATION MONITOR:</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>Background Level</span>
                <span style={{ 
                  color: EnvironmentService.getRadiationColor(data.radiationLevel),
                  fontWeight: 'bold',
                  fontSize: 'clamp(12px, 2vmin, 16px)'
                }}>
                  {data.radiation} μSv/h
                </span>
              </div>
              <div style={{ 
                fontSize: 'clamp(10px, 1.5vmin, 14px)', 
                marginTop: '0.25rem',
                color: EnvironmentService.getRadiationColor(data.radiationLevel)
              }}>
                {data.radiationLevel}
              </div>
            </div>

            {/* Additional Data */}
            <div style={{ border: '2px solid #666666', padding: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>ATMOSPHERIC DATA:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>Pressure:</span>
                  <span style={{ color: '#00FFFF' }}>{data.pressure} hPa</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#FFFFFF' }}>UV Index:</span>
                  <span style={{ color: data.uvIndex > 7 ? '#FF0000' : data.uvIndex > 5 ? '#FFD700' : '#00CC66' }}>
                    {data.uvIndex}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            {!data.hazardous && (
              <div style={{ border: '2px solid #00CC66', padding: '0.5rem' }}>
                <div style={{ color: '#00CC66', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center' }}>
                  {data.warning}
                </div>
              </div>
            )}

            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={loadAtmosphereData}
                style={{
                  backgroundColor: '#00CC66',
                  color: '#FFFFFF',
                  padding: '0.25rem 1rem',
                  fontSize: 'clamp(10px, 1.5vmin, 14px)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                REFRESH SENSORS
              </button>
              <p style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
                Auto-refresh 10s • Scientific monitoring
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextPage>
  )
}
