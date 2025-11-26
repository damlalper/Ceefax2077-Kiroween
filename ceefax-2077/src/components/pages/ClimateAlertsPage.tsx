export default function ClimateAlertsPage() {
  const renderAQIBar = (value: number) => {
    const bars = Math.floor((value / 500) * 20)
    return '█'.repeat(bars) + '░'.repeat(20 - bars)
  }

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P402 CLIMATE ALERTS</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">🌍 ENVIRONMENTAL WARNINGS & AIR QUALITY</p>
      </div>

      {/* Critical Alert */}
      <div className="px-3 mt-3">
        <div className="border-2 border-red p-3 bg-red/20 animate-pulse">
          <p className="text-red text-xl font-bold">☢ CRITICAL ALERT</p>
          <p className="text-white text-lg mt-2">
            SEVERE AIR QUALITY WARNING
          </p>
          <p className="text-white text-base mt-1">
            Delhi, India - AQI: 487 (Hazardous)
          </p>
          <p className="text-red text-sm mt-2">⚠ Stay indoors • Wear N95 masks</p>
        </div>
      </div>

      {/* AQI Readings */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">AIR QUALITY INDEX:</p>
        <div className="space-y-3">
          {[
            { city: 'DELHI', aqi: 487, level: 'HAZARDOUS', color: 'red' },
            { city: 'BEIJING', aqi: 156, level: 'UNHEALTHY', color: 'yellow' },
            { city: 'LOS ANGELES', aqi: 89, level: 'MODERATE', color: 'cyan' },
            { city: 'LONDON', aqi: 42, level: 'GOOD', color: 'green' },
          ].map((item) => (
            <div key={item.city} className="border border-green p-2 bg-black/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-white text-base font-bold">{item.city}</span>
                <span className={`text-${item.color} text-xl font-bold`}>{item.aqi}</span>
              </div>
              <div className={`text-${item.color} text-xs mb-1`}>
                {renderAQIBar(item.aqi)}
              </div>
              <span className={`text-${item.color} text-sm font-bold`}>{item.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Climate Stats */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🌡️ CLIMATE DATA:</p>
        <div className="border border-cyan p-3 bg-black/50">
          <div className="grid grid-cols-2 gap-3 text-base">
            <div>
              <p className="text-cyan">Global Temp:</p>
              <p className="text-red text-xl">+1.8°C</p>
            </div>
            <div>
              <p className="text-cyan">CO₂ Level:</p>
              <p className="text-yellow text-xl">421 ppm</p>
            </div>
            <div>
              <p className="text-cyan">Sea Level:</p>
              <p className="text-yellow text-xl">+12cm</p>
            </div>
            <div>
              <p className="text-cyan">Ice Loss:</p>
              <p className="text-red text-xl">-280 Gt/yr</p>
            </div>
          </div>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">CLIMATE ALERTS - REAL-TIME MONITORING</span>
      </div>
    </div>
  )
}
