import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
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

  const planet3D = NASAService.generate3DPlanet(currentPlanet, rotation, 15)

  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-green-400 text-xl">PLAN B</h1>
          <p className="text-cyan-300 text-sm">Terraform Monitor • Planetary Analysis</p>
        </div>

        {/* Planet Selector */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={prevPlanet}
            className="bg-green-600 text-white px-3 py-1 text-xs hover:bg-green-700"
          >
            ← PREV
          </button>
          <div className={`text-lg font-bold ${currentPlanet.color}`}>
            {currentPlanet.name.toUpperCase()}
          </div>
          <button
            onClick={nextPlanet}
            className="bg-green-600 text-white px-3 py-1 text-xs hover:bg-green-700"
          >
            NEXT →
          </button>
        </div>

        {/* 3D Planet Visualization */}
        <div className="border border-green-400 bg-black p-3 mb-3">
          <pre className={`text-center text-xs leading-tight font-mono ${currentPlanet.color}`}>
            {planet3D}
          </pre>
          <div className="text-center text-gray-400 text-xs mt-2">
            Use ← → arrows to switch planets
          </div>
        </div>

        {/* Habitability Score */}
        <div className="border border-green-400 p-3 mb-3">
          <div className="text-center">
            <div className="text-yellow-300 text-sm">SURVIVAL SCORE</div>
            <div className={`text-5xl font-bold ${NASAService.getHabitabilityColor(currentPlanet.habitability)}`}>
              {currentPlanet.habitability}%
            </div>
            <div className="text-white text-xs mt-2">
              {currentPlanet.habitability >= 80 ? 'IDEAL FOR LIFE' :
               currentPlanet.habitability >= 20 ? 'TERRAFORMING POSSIBLE' :
               currentPlanet.habitability > 0 ? 'EXTREME CHALLENGE' :
               'UNINHABITABLE'}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3 bg-gray-800 h-4 relative">
            <div
              className={`h-full transition-all ${
                currentPlanet.habitability >= 80 ? 'bg-green-500' :
                currentPlanet.habitability >= 20 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${currentPlanet.habitability}%` }}
            />
          </div>
        </div>

        {/* Planet Data */}
        <div className="border border-gray-600 p-2 mb-3">
          <div className="text-yellow-300 text-xs mb-2">PLANETARY DATA:</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-white">Atmosphere:</span>
              <span className="text-cyan-400">{currentPlanet.atmosphere}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Temperature:</span>
              <span className="text-cyan-400">{currentPlanet.temperature}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Water:</span>
              <span className="text-cyan-400">{currentPlanet.water}</span>
            </div>
          </div>
        </div>

        {/* Mars Rover Data */}
        {currentPlanet.name === 'Mars' && (
          <>
            {loadingMars && (
              <div className="border border-red-400 p-3 mb-3 text-center">
                <div className="text-red-400 text-sm">📡 CONNECTING TO NASA...</div>
                <div className="text-gray-400 text-xs mt-1">Fetching Perseverance data</div>
              </div>
            )}

            {marsPhoto && marsAscii && (
              <div className="border border-red-400 bg-red-900 bg-opacity-20 p-2 mb-3">
                <div className="text-red-400 text-xs mb-2 text-center">
                  🚀 LATEST FROM PERSEVERANCE ROVER
                </div>
                <pre className="text-red-300 text-xs leading-tight font-mono overflow-x-auto">
                  {marsAscii}
                </pre>
                <div className="text-gray-400 text-xs mt-2 text-center">
                  Sol {marsPhoto.sol} • {marsPhoto.earth_date} • {marsPhoto.camera}
                </div>
              </div>
            )}
          </>
        )}

        {/* Terraform Assessment */}
        <div className={`border p-2 ${
          currentPlanet.habitability >= 20 ? 'border-green-400 bg-green-900 bg-opacity-20' : 'border-red-400 bg-red-900 bg-opacity-20'
        }`}>
          <div className="text-yellow-300 text-xs mb-2">TERRAFORM ASSESSMENT:</div>
          <div className="text-white text-xs">
            {currentPlanet.name === 'Earth' && (
              <>✓ Current home. Protect at all costs. Climate action required.</>
            )}
            {currentPlanet.name === 'Mars' && (
              <>⚠️ Possible backup. Requires massive terraforming. Decades of work. Water exists as ice.</>
            )}
            {currentPlanet.name === 'Jupiter' && (
              <>✗ Gas giant. No solid surface. Impossible for human habitation. Moons may be viable.</>
            )}
            {currentPlanet.name === 'Titan' && (
              <>⚠️ Saturn's moon. Thick atmosphere. Liquid methane lakes. Extreme cold. Research ongoing.</>
            )}
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-gray-400 text-xs">
            {currentPlanet.name === 'Mars' ? 'NASA Mars Rover API • Real data' : 'Simulated planetary data'}
          </p>
        </div>
      </div>
    </TeletextGrid>
  )
}
