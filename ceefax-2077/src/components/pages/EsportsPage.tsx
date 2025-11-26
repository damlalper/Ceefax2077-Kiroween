import { useState, useEffect } from 'react'

export default function EsportsPage() {
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P303 ESPORTS</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">🎮 COMPETITIVE GAMING • TOURNAMENTS & RANKINGS</p>
      </div>

      {/* Live Tournament */}
      <div className="px-3 mt-3">
        <div className={`border-2 p-3 ${blink ? 'border-red bg-red/20' : 'border-yellow bg-yellow/10'}`}>
          <p className={`text-lg font-bold mb-2 ${blink ? 'text-red' : 'text-yellow'}`}>
            {blink ? '🔴 LIVE NOW' : '⚡ LIVE NOW'}
          </p>
          <p className="text-white text-xl font-bold">League of Legends World Championship</p>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-cyan text-2xl font-bold">T1</span>
            <span className="text-white text-xl">vs</span>
            <span className="text-cyan text-2xl font-bold">Gen.G</span>
          </div>
          <div className="mt-2 flex justify-between text-base">
            <span className="text-yellow">Grand Finals</span>
            <span className="text-green">1.2M viewers</span>
          </div>
          <div className="mt-1">
            <span className="text-white text-lg">Prize Pool: $2.25M</span>
          </div>
        </div>
      </div>

      {/* Tournament Bracket */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🏆 VALORANT CHAMPIONS BRACKET:</p>
        <div className="border border-cyan p-3 bg-black/50 font-mono text-sm">
          <pre className="text-cyan leading-tight">
{`SEMIFINALS:
Sentinels  ──┐
             ├── Sentinels (2-1)
Fnatic     ──┘

Paper Rex  ──┐
             ├── Paper Rex (2-0)
LOUD       ──┘

GRAND FINAL:
Sentinels  ──┐
             ├── ???
Paper Rex  ──┘
Tomorrow 2:00 PM EST`}
          </pre>
        </div>
      </div>

      {/* Rankings */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">📊 CS:GO WORLD RANKINGS:</p>
        <div className="space-y-1">
          {[
            { rank: 1, team: 'FAZE CLAN', points: 1000, change: '▲' },
            { rank: 2, team: 'NATUS VINCERE', points: 950, change: '▼' },
            { rank: 3, team: 'VITALITY', points: 920, change: '─' },
            { rank: 4, team: 'G2 ESPORTS', points: 890, change: '▲' },
            { rank: 5, team: 'TEAM LIQUID', points: 850, change: '▼' },
          ].map((team) => (
            <div key={team.rank} className="border border-green p-2 bg-black/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className={`text-xl font-bold ${
                  team.change === '▲' ? 'text-green' : 
                  team.change === '▼' ? 'text-red' : 'text-white'
                }`}>
                  {team.rank} {team.change}
                </span>
                <span className="text-white text-base font-bold">{team.team}</span>
              </div>
              <span className="text-yellow text-base">{team.points} pts</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-base font-bold mb-1">📅 UPCOMING EVENTS:</p>
        <div className="border border-cyan p-2 bg-black/50 text-sm space-y-1">
          <p className="text-white">• Dota 2 The International - Feb 15</p>
          <p className="text-white">• Overwatch League Finals - Feb 22</p>
          <p className="text-white">• Rocket League Championship - Mar 1</p>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">ESPORTS - COMPETITIVE GAMING NETWORK</span>
      </div>
    </div>
  )
}
