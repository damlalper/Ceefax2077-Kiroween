export default function WorldNewsPage() {
  const headlines = [
    { id: 102, title: 'GLOBAL SUMMIT REACHES CLIMATE ACCORD', region: 'WORLD', urgent: true },
    { id: 103, title: 'TECH BREAKTHROUGH IN QUANTUM COMPUTING', region: 'TECH', urgent: false },
    { id: 104, title: 'SPACE STATION EXPANSION APPROVED', region: 'SPACE', urgent: false },
    { id: 105, title: 'ECONOMIC RECOVERY EXCEEDS FORECASTS', region: 'ECONOMY', urgent: false },
  ]

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-cyan">
        <span className="double-height text-black">P102 WORLD NEWS</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-base animate-pulse">🌍 BREAKING STORIES FROM AROUND THE GLOBE</p>
      </div>

      {/* Breaking Banner */}
      <div className="px-3 mt-3">
        <div className="bg-red text-white p-3 animate-pulse">
          <p className="text-xl font-bold">⚠️ BREAKING NEWS ⚠️</p>
          <p className="text-lg mt-1">
            Global leaders reach historic climate agreement at emergency summit
          </p>
        </div>
      </div>

      {/* Headlines */}
      <div className="px-3 mt-3 space-y-2">
        {headlines.map((item) => (
          <div key={item.id} className="border-l-4 border-yellow pl-3 py-2 bg-black/50">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-white text-lg font-bold">{item.title}</p>
                <p className="text-cyan text-sm mt-1">{item.region}</p>
              </div>
              <div className="text-right">
                <p className="text-yellow text-base">P{item.id}</p>
                {item.urgent && (
                  <span className="bg-red text-white px-2 py-1 text-xs font-bold animate-pulse">
                    URGENT
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Updates */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🌐 REGIONAL UPDATES:</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="border border-cyan p-2">
            <p className="text-cyan font-bold">EUROPE</p>
            <p className="text-white">EU announces new trade policy</p>
          </div>
          <div className="border border-green p-2">
            <p className="text-green font-bold">ASIA</p>
            <p className="text-white">Markets surge on growth data</p>
          </div>
          <div className="border border-yellow p-2">
            <p className="text-yellow font-bold">AMERICAS</p>
            <p className="text-white">Infrastructure bill passes</p>
          </div>
          <div className="border border-magenta p-2">
            <p className="text-magenta font-bold">AFRICA</p>
            <p className="text-white">Renewable energy milestone</p>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="px-3 mt-3">
        <div className="bg-yellow text-black p-2 text-sm font-bold">
          📰 ALSO: UN votes on resolution • Oil prices stable • Currency markets mixed
        </div>
      </div>

      <div className="teletext-bottom-banner bg-cyan">
        <span className="text-black">WORLD NEWS - UPDATED EVERY 5 MINUTES</span>
      </div>
    </div>
  )
}
