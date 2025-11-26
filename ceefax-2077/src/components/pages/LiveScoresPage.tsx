import { useState, useEffect } from 'react'

export default function LiveScoresPage() {
  const [blink, setBlink] = useState(false)
  const [minute, setMinute] = useState(78)

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(b => !b), 500)
    const minuteInterval = setInterval(() => setMinute(m => m < 90 ? m + 1 : 78), 1000)
    return () => {
      clearInterval(blinkInterval)
      clearInterval(minuteInterval)
    }
  }, [])

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P301 LIVE SCORES</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base animate-pulse">⚽ LIVE MATCHES • UPDATING EVERY 30s</p>
      </div>

      {/* Live Match */}
      <div className="px-3 mt-3">
        <div className={`border-2 p-3 ${blink ? 'bg-red/20 border-red' : 'bg-green/10 border-green'}`}>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <p className="text-white text-xl font-bold">MANCHESTER UTD</p>
              <p className="text-green text-sm">Premier League</p>
            </div>
            <div className="text-center px-4">
              <p className="text-yellow text-4xl font-bold">2</p>
            </div>
            <div className="text-center px-2">
              <p className="text-white text-2xl">-</p>
            </div>
            <div className="text-center px-4">
              <p className="text-yellow text-4xl font-bold">1</p>
            </div>
            <div className="flex-1 text-right">
              <p className="text-white text-xl font-bold">LIVERPOOL</p>
              <p className="text-red text-sm animate-pulse">● LIVE {minute}'</p>
            </div>
          </div>
          {blink && (
            <div className="mt-2 bg-red text-white text-center py-1 text-lg font-bold animate-pulse">
              ⚽ GOAL! RASHFORD {minute}'
            </div>
          )}
        </div>
      </div>

      {/* Other Matches */}
      <div className="px-3 mt-3 space-y-2">
        <div className="border border-green p-2 bg-black/50">
          <div className="flex justify-between items-center text-base">
            <span className="text-cyan flex-1">CHELSEA</span>
            <span className="text-yellow px-3">0 - 0</span>
            <span className="text-cyan flex-1 text-right">ARSENAL</span>
            <span className="text-white/50 ml-3 text-sm">(HT)</span>
          </div>
        </div>

        <div className="border border-green p-2 bg-black/50">
          <div className="flex justify-between items-center text-base">
            <span className="text-cyan flex-1">REAL MADRID</span>
            <span className="text-yellow px-3">3 - 0</span>
            <span className="text-cyan flex-1 text-right">BARCELONA</span>
            <span className="text-green ml-3 text-sm">(FT)</span>
          </div>
        </div>
      </div>

      {/* NBA Scores */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🏀 NBA - TODAY</p>
        <div className="space-y-2">
          <div className="border border-yellow p-2 bg-black/50">
            <div className="flex justify-between items-center text-base">
              <span className="text-white flex-1">LAKERS</span>
              <span className="text-yellow px-3">108 - 102</span>
              <span className="text-white flex-1 text-right">WARRIORS</span>
              <span className="text-red ml-3 text-sm animate-pulse">Q4 2:34</span>
            </div>
          </div>

          <div className="border border-yellow p-2 bg-black/50">
            <div className="flex justify-between items-center text-base">
              <span className="text-white flex-1">CELTICS</span>
              <span className="text-yellow px-3">95 - 89</span>
              <span className="text-white flex-1 text-right">HEAT</span>
              <span className="text-red ml-3 text-sm animate-pulse">Q3 8:12</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tennis */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🎾 TENNIS</p>
        <div className="border border-cyan p-2 bg-black/50 text-base">
          <p className="text-white">Australian Open - Semifinals:</p>
          <p className="text-green mt-1">Djokovic def. Alcaraz</p>
          <p className="text-cyan">6-4, 7-6, 6-3</p>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">LIVE SCORES - REAL-TIME SPORTS UPDATES</span>
      </div>
    </div>
  )
}
