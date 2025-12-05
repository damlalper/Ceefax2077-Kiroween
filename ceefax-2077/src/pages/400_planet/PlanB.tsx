import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { NASAService, type Planet, type MarsPhoto } from '../../services/NASAService'

export default function PlanB() {
  const [planets] = useState<Planet[]>(NASAService.getPlanets())
  const [currentPlanetIndex, setCurrentPlanetIndex] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [marsPhoto, setMarsPhoto] = useState<MarsPhoto | null>(null)
  const [marsAscii, setMarsAscii] = useState<string>('')
  const [loadingMars, setLoadingMars] = useState(false)

  const currentPlanet = planets[currentPlanetIndex]

  useEffect(() => {
    // Rotate planet
    const rotationInterval = setInterval(() => {
      setRotation(prev => (prev + 0.1 * currentPlanet.rotation) % (Math.PI * 2))
    }, 100)

    // Load Mars photo if viewing Mars
    if (currentPlanet.name === 'Mars' && !marsPhoto && !loadingMars) {
      loadMarsData()
    }

    // Keyboard controls
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentPlanetIndex(prev => (prev - 1 + planets.length) % planets.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentPlanetIndex(prev => (prev + 1) % planets.length)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(rotationInterval)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentPlanet, marsPhoto, loadingMars, planets])

  const loadMarsData = async () => {
    setLoadingMars(true)
    try {
      const photo = await NASAService.getLatestMarsPhoto()
      if (photo) {
        setMarsPhoto(photo)
        const ascii = await NASAService.imageToAscii(photo.img_src, 40, 15)
        setMarsAscii(ascii)
      }
    } catch (error) {
      console.error('Failed to load Mars data:', error)
    } finally {
      setLoadingMars(false)
    }
  }

  const nextPlanet = () => {
    setCurrentPlanetIndex(prev => (prev + 1) % planets.length)
  }

  const prevPlanet = () => {
    setCurrentPlanetIndex(prev => (prev - 1 + planets.length) % planets.length)
  }

  const planet3D = NASAService.generate3DPlanet(currentPlanet, rotation, 10)

  return (
    <TeletextPage
      title="PLAN B"
      subtitle={`> ${currentPlanet.name.toUpperCase()} • ${currentPlanet.habitability}%`}
      footer="NASA API • TERRAFORM MONITOR"
      zone={403}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Planet Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <button
            onClick={prevPlanet}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#00CC66',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}
          >
            ← PREV
          </button>
          <div style={{ color: currentPlanet.color, fontSize: '1.2em', fontWeight: 'bold' }}>
            {currentPlanet.name.toUpperCase()}
          </div>
          <button
            onClick={nextPlanet}
            style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#00CC66',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}
          >
            NEXT →
          </button>
        </div>

        {/* 3D Planet Visualization - Compact */}
        <div style={{
          border: '2px solid #00CC66',
          backgroundColor: '#000000',
          padding: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          <pre style={{
            textAlign: 'center',
            fontSize: '0.6em',
            lineHeight: '1',
            fontFamily: "'VT323', monospace",
            color: currentPlanet.color,
            margin: 0
          }}>
            {planet3D}
          </pre>
          <div style={{ textAlign: 'center', color: '#666666', fontSize: '0.6em', marginTop: '0.25rem' }}>
            ← → ARROWS TO SWITCH
          </div>
        </div>

        {/* Habitability Score - Compact */}
        <div style={{
          border: '2px solid #00CC66',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#FFFF00', fontSize: '0.8em' }}>SURVIVAL</div>
          <div style={{
            color: NASAService.getHabitabilityColor(currentPlanet.habitability),
            fontSize: '2em',
            fontWeight: 'bold',
            lineHeight: '1'
          }}>
            {currentPlanet.habitability}%
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.7em', marginTop: '0.25rem' }}>
            {currentPlanet.habitability >= 80 ? 'IDEAL' :
             currentPlanet.habitability >= 20 ? 'TERRAFORM OK' :
             currentPlanet.habitability > 0 ? 'EXTREME' :
             'IMPOSSIBLE'}
          </div>
          {/* Progress Bar */}
          <div style={{
            marginTop: '0.5rem',
            backgroundColor: '#1a1a1a',
            height: '8px',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: `${currentPlanet.habitability}%`,
              backgroundColor: currentPlanet.habitability >= 80 ? '#00FF00' :
                              currentPlanet.habitability >= 20 ? '#FFFF00' :
                              '#FF0000',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>

        {/* Planet Data - Compact */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          fontSize: '0.75em'
        }}>
          <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>DATA:</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
            <span>ATM:</span>
            <span style={{ color: '#00FFFF' }}>{currentPlanet.atmosphere}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
            <span>TEMP:</span>
            <span style={{ color: '#00FFFF' }}>{currentPlanet.temperature}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
            <span>H2O:</span>
            <span style={{ color: '#00FFFF' }}>{currentPlanet.water}</span>
          </div>
        </div>

        {/* Mars Rover Data - Compact */}
        {currentPlanet.name === 'Mars' && (
          <>
            {loadingMars && (
              <div style={{
                border: '1px solid #FF6666',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                textAlign: 'center',
                fontSize: '0.75em'
              }}>
                <div style={{ color: '#FF6666' }}>📡 NASA API...</div>
              </div>
            )}

            {marsPhoto && marsAscii && (
              <div style={{
                border: '1px solid #FF6666',
                backgroundColor: 'rgba(153, 0, 0, 0.2)',
                padding: '0.25rem',
                marginBottom: '0.5rem'
              }}>
                <div style={{
                  color: '#FF6666',
                  fontSize: '0.6em',
                  marginBottom: '0.25rem',
                  textAlign: 'center'
                }}>
                  🚀 PERSEVERANCE
                </div>
                <pre style={{
                  color: '#FF9999',
                  fontSize: '0.5em',
                  lineHeight: '1',
                  fontFamily: "'VT323', monospace",
                  overflow: 'hidden',
                  margin: 0
                }}>
                  {marsAscii}
                </pre>
                <div style={{
                  color: '#666666',
                  fontSize: '0.6em',
                  marginTop: '0.25rem',
                  textAlign: 'center'
                }}>
                  SOL {marsPhoto.sol} • {marsPhoto.earth_date}
                </div>
              </div>
            )}
          </>
        )}

        {/* Assessment - Compact */}
        <div style={{
          border: `1px solid ${currentPlanet.habitability >= 20 ? '#00CC66' : '#CC0000'}`,
          backgroundColor: currentPlanet.habitability >= 20 ? 'rgba(0, 153, 0, 0.2)' : 'rgba(153, 0, 0, 0.2)',
          padding: '0.5rem',
          fontSize: '0.7em'
        }}>
          <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>ASSESSMENT:</div>
          <div style={{ color: '#FFFFFF' }}>
            {currentPlanet.name === 'Earth' && '✓ PROTECT. CLIMATE ACTION NOW.'}
            {currentPlanet.name === 'Mars' && '⚠️ BACKUP. DECADES WORK. ICE H2O.'}
            {currentPlanet.name === 'Jupiter' && '✗ GAS GIANT. NO SURFACE. MOONS?'}
            {currentPlanet.name === 'Titan' && '⚠️ METHANE LAKES. EXTREME COLD.'}
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
