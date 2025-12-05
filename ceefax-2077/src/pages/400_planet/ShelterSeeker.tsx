import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { EnvironmentService, type ShelterLocation } from '../../services/EnvironmentService'

export default function ShelterSeeker() {
  const [mapData, setMapData] = useState<{ grid: string[][], shelters: ShelterLocation[] } | null>(null)
  const [selectedShelter, setSelectedShelter] = useState<ShelterLocation | null>(null)
  const [blink, setBlink] = useState(true)

  const generateMap = () => {
    const data = EnvironmentService.generateShelterMap()
    setMapData(data)
    setSelectedShelter(null)
  }

  useEffect(() => {
    generateMap()

    // Blink effect for emergency feel
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 600)

    return () => clearInterval(blinkInterval)
  }, [])

  const getMarkerColor = (char: string): string => {
    switch (char) {
      case 'W': return '#00CCFF' // Water
      case 'P': return '#FFFF00' // Power
      case 'M': return '#FF6666' // Medical
      case 'S': return '#00FF00' // Shelter
      case 'X': return '#00FFFF' // Player
      default: return '#333333'
    }
  }

  return (
    <TeletextPage
      title="SHELTER SEEKER"
      subtitle={selectedShelter ? `> ${selectedShelter.name}` : '> EMERGENCY SURVIVAL MAP'}
      footer="ASCII MAP • CLICK MARKERS"
      zone={405}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Emergency Header - Compact */}
        <div style={{
          border: '2px solid #FFFF00',
          backgroundColor: 'rgba(153, 153, 0, 0.3)',
          padding: '0.25rem',
          marginBottom: '0.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            color: '#FFFF00',
            fontWeight: 'bold',
            fontSize: '0.9em',
            opacity: blink ? 1 : 0.5,
            transition: 'opacity 0.3s'
          }}>
            🚨 EMERGENCY BROADCAST 🚨
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.7em', marginTop: '0.125rem' }}>
            APOCALYPSE MODE • LOW-BANDWIDTH
          </div>
        </div>

        {mapData && (
          <>
            {/* ASCII Map - Compact */}
            <div style={{
              border: '2px solid #FFFF00',
              backgroundColor: '#000000',
              padding: '0.25rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{
                color: '#FFFF00',
                fontSize: '0.7em',
                marginBottom: '0.25rem',
                textAlign: 'center'
              }}>
                SECTOR MAP • 20×20 GRID
              </div>
              <pre style={{
                fontSize: '0.5em',
                lineHeight: '1',
                fontFamily: "'VT323', monospace",
                overflow: 'hidden',
                margin: 0
              }}>
                {mapData.grid.map((row, y) => (
                  <div key={y}>
                    {row.map((cell, x) => (
                      <span
                        key={`${x}-${y}`}
                        style={{
                          color: getMarkerColor(cell),
                          cursor: cell !== '·' && cell !== 'X' ? 'pointer' : 'default'
                        }}
                        onClick={() => {
                          const shelter = mapData.shelters.find(s => s.x === x && s.y === y)
                          if (shelter) setSelectedShelter(shelter)
                        }}
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>

            {/* Legend - Compact */}
            <div style={{
              border: '1px solid #FFFF00',
              backgroundColor: '#000000',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              fontSize: '0.7em'
            }}>
              <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>LEGEND:</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.125rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#00FFFF', fontWeight: 'bold' }}>X</span>
                  <span style={{ color: '#FFFFFF' }}>YOU</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#00CCFF', fontWeight: 'bold' }}>W</span>
                  <span style={{ color: '#FFFFFF' }}>WATER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#FFFF00', fontWeight: 'bold' }}>P</span>
                  <span style={{ color: '#FFFFFF' }}>POWER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#FF6666', fontWeight: 'bold' }}>M</span>
                  <span style={{ color: '#FFFFFF' }}>MEDICAL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#00FF00', fontWeight: 'bold' }}>S</span>
                  <span style={{ color: '#FFFFFF' }}>SHELTER</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: '#333333' }}>·</span>
                  <span style={{ color: '#FFFFFF' }}>EMPTY</span>
                </div>
              </div>
            </div>

            {/* Selected Shelter Info - Compact */}
            {selectedShelter && (
              <div style={{
                border: '2px solid #FFFF00',
                backgroundColor: 'rgba(153, 153, 0, 0.2)',
                padding: '0.5rem',
                marginBottom: '0.5rem',
                fontSize: '0.75em'
              }}>
                <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>SELECTED:</div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
                    <span>TYPE:</span>
                    <span style={{ color: '#00FFFF' }}>{selectedShelter.type}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
                    <span>STATUS:</span>
                    <span style={{ color: EnvironmentService.getStatusColor(selectedShelter.status) }}>
                      {selectedShelter.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
                    <span>DIST:</span>
                    <span>{selectedShelter.distance.toFixed(2)} km</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
                    <span>COORD:</span>
                    <span>({selectedShelter.x}, {selectedShelter.y})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Resource List - Compact */}
            <div style={{
              border: '1px solid #FFFF00',
              backgroundColor: '#000000',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              fontSize: '0.7em'
            }}>
              <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>RESOURCES:</div>
              <div>
                {mapData.shelters.slice(0, 5).map((shelter, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      padding: '0.125rem',
                      color: '#FFFFFF'
                    }}
                    onClick={() => setSelectedShelter(shelter)}
                  >
                    <span>
                      {shelter.type} ({shelter.x},{shelter.y})
                    </span>
                    <span style={{ color: EnvironmentService.getStatusColor(shelter.status) }}>
                      {shelter.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Info - Compact */}
            <div style={{
              border: '2px solid #FF6666',
              backgroundColor: 'rgba(153, 0, 0, 0.3)',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              fontSize: '0.7em'
            }}>
              <div style={{
                color: '#FF6666',
                textAlign: 'center',
                fontWeight: 'bold',
                marginBottom: '0.25rem'
              }}>
                🚨 EMERGENCY PROTOCOLS 🚨
              </div>
              <div style={{ color: '#FFFFFF' }}>
                <div>• SEEK NEAREST SHELTER</div>
                <div>• SECURE WATER/MEDICAL</div>
                <div>• AVOID OFFLINE STATIONS</div>
                <div>• STAY TUNED</div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={generateMap}
                style={{
                  backgroundColor: '#CCCC00',
                  color: '#000000',
                  padding: '0.25rem 0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8em'
                }}
              >
                REGENERATE MAP
              </button>
              <div style={{ color: '#666666', fontSize: '0.6em', marginTop: '0.25rem' }}>
                LOW-BANDWIDTH • CLICK MARKERS
              </div>
            </div>
          </>
        )}
      </div>
    </TeletextPage>
  )
}
