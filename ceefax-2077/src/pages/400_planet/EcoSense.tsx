import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { EnvironmentService, type AtmosphereData } from '../../services/EnvironmentService'

export default function EcoSense() {
  const [data, setData] = useState<AtmosphereData | null>(null)
  const [loading, setLoading] = useState(true)
  const [blink, setBlink] = useState(true)
  const [flashWarning, setFlashWarning] = useState(false)

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

  const loadAtmosphereData = () => {
    setLoading(true)
    // Simulate sensor delay
    setTimeout(() => {
      const atmosphereData = EnvironmentService.generateAtmosphereData()
      setData(atmosphereData)
      setLoading(false)
    }, 800)
  }

  return (
    <TeletextGrid>
      <div className={`teletext-content ${flashWarning ? 'bg-red-900 bg-opacity-30' : ''}`}>
        <div className="text-center mb-3">
          <h1 className={`text-xl ${data?.hazardous ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
            ECO SENSE
          </h1>
          <p className="text-cyan-300 text-sm">Atmosphere Monitor • Environmental Sensors</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className={`text-yellow-300 text-lg ${blink ? 'opacity-100' : 'opacity-0'}`}>
              📡 SCANNING ATMOSPHERE...
            </div>
            <div className="text-gray-400 text-xs mt-2">Reading environmental sensors</div>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Hazard Warning */}
            {data.hazardous && (
              <div className="border border-red-400 bg-red-900 bg-opacity-40 p-2 mb-3 animate-pulse">
                <div className="text-red-400 text-center font-bold text-sm">
                  🚨 ENVIRONMENTAL HAZARD DETECTED 🚨
                </div>
                <div className="text-white text-xs text-center mt-1">
                  {data.warning}
                </div>
              </div>
            )}

            {/* Weather Icon */}
            <div className="border border-green-400 p-2 mb-3 text-center">
              <pre className="text-cyan-300 text-xs leading-tight">
                {EnvironmentService.getWeatherIcon(data.aqi, data.temperature)}
              </pre>
              <div className="text-white text-sm mt-2">
                {data.temperature}°C • {data.humidity}% Humidity
              </div>
            </div>

            {/* Air Quality Index */}
            <div className={`border p-3 mb-3 ${
              data.hazardous ? 'border-red-400 bg-red-900 bg-opacity-20' : 'border-green-400'
            }`}>
              <div className="text-center">
                <div className="text-yellow-300 text-sm">AIR QUALITY INDEX</div>
                <div className={`text-5xl font-bold ${EnvironmentService.getAQIColor(data.aqi)}`}>
                  {data.aqi}
                </div>
                <div className={`text-sm ${EnvironmentService.getAQIColor(data.aqi)}`}>
                  {data.aqiLevel.replace(/_/g, ' ')}
                </div>
              </div>

              {/* AQI Bar */}
              <div className="mt-3 bg-gray-800 h-4 relative">
                <div
                  className={`h-full transition-all ${
                    data.aqi > 300 ? 'bg-red-800' :
                    data.aqi > 200 ? 'bg-red-600' :
                    data.aqi > 150 ? 'bg-red-400' :
                    data.aqi > 100 ? 'bg-orange-400' :
                    data.aqi > 50 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${Math.min((data.aqi / 500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Pollutants */}
            <div className="border border-gray-600 p-2 mb-2">
              <div className="text-yellow-300 text-xs mb-2">POLLUTANT LEVELS:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white">PM2.5:</span>
                  <span className={data.pm25 > 35 ? 'text-red-400' : 'text-green-400'}>
                    {data.pm25} μg/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">PM10:</span>
                  <span className={data.pm10 > 150 ? 'text-red-400' : 'text-green-400'}>
                    {data.pm10} μg/m³
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">O₃:</span>
                  <span className={data.ozone > 70 ? 'text-yellow-400' : 'text-green-400'}>
                    {data.ozone} ppb
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">NO₂:</span>
                  <span className={data.no2 > 40 ? 'text-yellow-400' : 'text-green-400'}>
                    {data.no2} ppb
                  </span>
                </div>
              </div>
            </div>

            {/* Radiation */}
            <div className={`border p-2 mb-2 ${
              data.radiationLevel === 'DANGEROUS' ? 'border-red-400 bg-red-900 bg-opacity-20' : 'border-gray-600'
            }`}>
              <div className="text-yellow-300 text-xs mb-2">☢️ RADIATION MONITOR:</div>
              <div className="flex justify-between items-center">
                <span className="text-white text-xs">Background Level</span>
                <span className={`${EnvironmentService.getRadiationColor(data.radiationLevel)} font-bold`}>
                  {data.radiation} μSv/h
                </span>
              </div>
              <div className={`text-xs mt-1 ${EnvironmentService.getRadiationColor(data.radiationLevel)}`}>
                {data.radiationLevel}
              </div>
            </div>

            {/* Additional Data */}
            <div className="border border-gray-600 p-2 mb-2">
              <div className="text-yellow-300 text-xs mb-2">ATMOSPHERIC DATA:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white">Pressure:</span>
                  <span className="text-cyan-400">{data.pressure} hPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">UV Index:</span>
                  <span className={data.uvIndex > 7 ? 'text-red-400' : data.uvIndex > 5 ? 'text-yellow-400' : 'text-green-400'}>
                    {data.uvIndex}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            {!data.hazardous && (
              <div className="border border-green-400 p-2">
                <div className="text-green-400 text-xs text-center">
                  {data.warning}
                </div>
              </div>
            )}

            <div className="mt-3 text-center">
              <button
                onClick={loadAtmosphereData}
                className="bg-green-600 text-white px-4 py-1 text-xs hover:bg-green-700 font-bold"
              >
                REFRESH SENSORS
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Auto-refresh 10s • Scientific monitoring
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextGrid>
  )
}
