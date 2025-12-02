import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
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
      case 'W': return 'text-blue-400' // Water
      case 'P': return 'text-yellow-400' // Power
      case 'M': return 'text-red-400' // Medical
      case 'S': return 'text-green-400' // Shelter
      case 'X': return 'text-cyan-400' // Player
      default: return 'text-gray-600'
    }
  }



  return (
    <TeletextGrid>
      <div className="teletext-content bg-black">
        {/* Emergency Header */}
        <div className="border border-yellow-400 bg-yellow-900 bg-opacity-30 p-2 mb-3">
          <div className={`text-yellow-300 text-center font-bold text-sm ${blink ? 'opacity-100' : 'opacity-50'}`}>
            🚨 EMERGENCY BROADCAST SYSTEM 🚨
          </div>
          <div className="text-white text-xs text-center mt-1">
            APOCALYPSE MODE • LOW-BANDWIDTH SURVIVAL MAP
          </div>
        </div>

        {mapData && (
          <>
            {/* ASCII Map */}
            <div className="border border-yellow-400 bg-black p-2 mb-3">
              <div className="text-yellow-300 text-xs mb-1 text-center">
                SECTOR MAP • 20x20 GRID
              </div>
              <pre className="text-xs leading-tight font-mono overflow-x-auto">
                {mapData.grid.map((row, y) => (
                  <div key={y}>
                    {row.map((cell, x) => (
                      <span
                        key={`${x}-${y}`}
                        className={getMarkerColor(cell)}
                        onClick={() => {
                          const shelter = mapData.shelters.find(s => s.x === x && s.y === y)
                          if (shelter) setSelectedShelter(shelter)
                        }}
                        style={{ cursor: cell !== '·' && cell !== 'X' ? 'pointer' : 'default' }}
                      >
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>

            {/* Legend */}
            <div className="border border-yellow-400 bg-black p-2 mb-3">
              <div className="text-yellow-300 text-xs mb-2">LEGEND:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">X</span>
                  <span className="text-white">YOUR LOCATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 font-bold">W</span>
                  <span className="text-white">WATER SOURCE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">P</span>
                  <span className="text-white">POWER STATION</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400 font-bold">M</span>
                  <span className="text-white">MEDICAL FACILITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">S</span>
                  <span className="text-white">SHELTER</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">·</span>
                  <span className="text-white">EMPTY SPACE</span>
                </div>
              </div>
            </div>

            {/* Selected Shelter Info */}
            {selectedShelter && (
              <div className="border border-yellow-400 bg-yellow-900 bg-opacity-20 p-2 mb-3">
                <div className="text-yellow-300 text-xs mb-2">SELECTED LOCATION:</div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white">Type:</span>
                    <span className="text-cyan-400">{selectedShelter.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Status:</span>
                    <span className={EnvironmentService.getStatusColor(selectedShelter.status)}>
                      {selectedShelter.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Distance:</span>
                    <span className="text-white">{selectedShelter.distance.toFixed(2)} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Coordinates:</span>
                    <span className="text-white">({selectedShelter.x}, {selectedShelter.y})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Resource List */}
            <div className="border border-yellow-400 bg-black p-2 mb-3">
              <div className="text-yellow-300 text-xs mb-2">AVAILABLE RESOURCES:</div>
              <div className="space-y-1">
                {mapData.shelters.map((shelter, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs cursor-pointer hover:bg-yellow-900 hover:bg-opacity-20 p-1"
                    onClick={() => setSelectedShelter(shelter)}
                  >
                    <span className="text-white">
                      {shelter.type} ({shelter.x},{shelter.y})
                    </span>
                    <span className={EnvironmentService.getStatusColor(shelter.status)}>
                      {shelter.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Info */}
            <div className="border border-red-400 bg-red-900 bg-opacity-30 p-2 mb-3">
              <div className="text-red-400 text-xs text-center font-bold">
                🚨 EMERGENCY PROTOCOLS 🚨
              </div>
              <div className="text-white text-xs mt-2 space-y-1">
                <div>• SEEK NEAREST SHELTER IMMEDIATELY</div>
                <div>• SECURE WATER AND MEDICAL SUPPLIES</div>
                <div>• AVOID OFFLINE POWER STATIONS</div>
                <div>• STAY TUNED FOR UPDATES</div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={generateMap}
                className="bg-yellow-600 text-black px-4 py-1 text-xs hover:bg-yellow-700 font-bold"
              >
                REGENERATE MAP
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Low-bandwidth mode • Click markers for info
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextGrid>
  )
}
