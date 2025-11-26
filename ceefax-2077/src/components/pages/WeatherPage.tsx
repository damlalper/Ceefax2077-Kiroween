export default function WeatherPage() {
  const cities = [
    { name: 'NEW YORK', temp: 8, icon: '☁', condition: 'Cloudy', high: 12, low: 4 },
    { name: 'LONDON', temp: 6, icon: '☂', condition: 'Rainy', high: 9, low: 3 },
    { name: 'TOKYO', temp: 15, icon: '☼', condition: 'Sunny', high: 18, low: 12 },
    { name: 'PARIS', temp: 7, icon: '☁', condition: 'Overcast', high: 10, low: 5 },
    { name: 'SYDNEY', temp: 24, icon: '☼', condition: 'Clear', high: 28, low: 20 },
  ]

  const renderMap = () => {
    return [
      '    ☁  ☂     ☁        ',
      '  ☁    ☁   ☁    ☼    ',
      '     ☂      ☁        ',
      '  ☁      ☁      ☼    ',
      '    ☂  ☁    ☁   ☼    ',
    ]
  }

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P401 WEATHER</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">🌍 7-DAY FORECAST • MAJOR CITIES</p>
      </div>

      {/* Weather Map */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">GLOBAL CONDITIONS:</p>
        <div className="border border-green p-3 bg-black/50 font-mono text-2xl leading-tight">
          {renderMap().map((line, i) => (
            <div key={i} className="text-cyan">{line}</div>
          ))}
        </div>
        <div className="mt-1 text-sm text-white/70">
          <span className="text-yellow">☼</span> Sunny • 
          <span className="text-cyan"> ☁</span> Cloudy • 
          <span className="text-blue"> ☂</span> Rain
        </div>
      </div>

      {/* City Forecasts */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">CITY FORECASTS:</p>
        <div className="space-y-2">
          {cities.map((city, i) => (
            <div key={i} className="border border-green p-2 bg-black/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{city.icon}</span>
                  <div>
                    <p className="text-white text-lg font-bold">{city.name}</p>
                    <p className="text-cyan text-sm">{city.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow text-3xl font-bold">{city.temp}°C</p>
                  <p className="text-white/70 text-sm">
                    H:{city.high}° L:{city.low}°
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="px-3 mt-3">
        <div className="border-2 border-red p-2 bg-red/10">
          <p className="text-red text-base font-bold">⚠ WEATHER ALERTS:</p>
          <p className="text-white text-sm mt-1">• Storm Warning: Florida Coast</p>
          <p className="text-white text-sm">• Heat Advisory: S. California</p>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">WEATHER - UPDATED HOURLY</span>
      </div>
    </div>
  )
}
