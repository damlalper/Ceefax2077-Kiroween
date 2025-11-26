export default function LeagueTablesPage() {
  const premierLeague = [
    { pos: 1, team: 'LIVERPOOL', p: 20, w: 15, d: 6, l: 1, pts: 51, form: '▲', change: 0 },
    { pos: 2, team: 'MAN CITY', p: 20, w: 14, d: 7, l: 1, pts: 49, form: '▼', change: -1 },
    { pos: 3, team: 'ARSENAL', p: 20, w: 13, d: 7, l: 2, pts: 46, form: '▲', change: 1 },
    { pos: 4, team: 'ASTON VILLA', p: 21, w: 12, d: 6, l: 3, pts: 42, form: '─', change: 0 },
    { pos: 5, team: 'TOTTENHAM', p: 21, w: 11, d: 7, l: 3, pts: 40, form: '▼', change: -1 },
  ]

  const nbaEast = [
    { pos: 1, team: 'BOSTON', w: 37, l: 11, pct: '.771', gb: '-', streak: 'W5' },
    { pos: 2, team: 'MILWAUKEE', w: 33, l: 15, pct: '.688', gb: '4.0', streak: 'W2' },
    { pos: 3, team: 'PHILADELPHIA', w: 30, l: 17, pct: '.638', gb: '6.5', streak: 'L1' },
    { pos: 4, team: 'CLEVELAND', w: 29, l: 19, pct: '.604', gb: '8.0', streak: 'W3' },
  ]

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P302 LEAGUE TABLES</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">📊 CURRENT STANDINGS • ALL LEAGUES</p>
      </div>

      {/* Premier League */}
      <div className="px-2 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">⚽ PREMIER LEAGUE</p>
        
        {/* Header */}
        <div className="bg-green text-black font-bold text-sm p-1 grid grid-cols-12 gap-1">
          <span className="col-span-1">POS</span>
          <span className="col-span-5">TEAM</span>
          <span className="col-span-1">P</span>
          <span className="col-span-1">W</span>
          <span className="col-span-1">D</span>
          <span className="col-span-1">L</span>
          <span className="col-span-2">PTS</span>
        </div>

        {/* Rows */}
        {premierLeague.map((team, i) => (
          <div 
            key={i} 
            className={`text-sm p-1 grid grid-cols-12 gap-1 border-b border-green/30 ${
              i % 2 === 0 ? 'bg-black/50' : 'bg-green/5'
            }`}
          >
            <span className={`col-span-1 font-bold ${
              team.change > 0 ? 'text-green' : team.change < 0 ? 'text-red' : 'text-white'
            }`}>
              {team.pos} {team.form}
            </span>
            <span className="col-span-5 text-cyan font-bold">{team.team}</span>
            <span className="col-span-1 text-white">{team.p}</span>
            <span className="col-span-1 text-white">{team.w}</span>
            <span className="col-span-1 text-white">{team.d}</span>
            <span className="col-span-1 text-white">{team.l}</span>
            <span className="col-span-2 text-yellow font-bold">{team.pts}</span>
          </div>
        ))}
      </div>

      {/* NBA */}
      <div className="px-2 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">🏀 NBA EASTERN CONFERENCE</p>
        
        {/* Header */}
        <div className="bg-yellow text-black font-bold text-sm p-1 grid grid-cols-12 gap-1">
          <span className="col-span-1">#</span>
          <span className="col-span-5">TEAM</span>
          <span className="col-span-2">W-L</span>
          <span className="col-span-2">PCT</span>
          <span className="col-span-2">GB</span>
        </div>

        {/* Rows */}
        {nbaEast.map((team, i) => (
          <div 
            key={i} 
            className={`text-sm p-1 grid grid-cols-12 gap-1 border-b border-yellow/30 ${
              i % 2 === 0 ? 'bg-black/50' : 'bg-yellow/5'
            }`}
          >
            <span className="col-span-1 text-yellow font-bold">{team.pos}</span>
            <span className="col-span-5 text-white font-bold">{team.team}</span>
            <span className="col-span-2 text-cyan">{team.w}-{team.l}</span>
            <span className="col-span-2 text-white">{team.pct}</span>
            <span className="col-span-2 text-white/70">{team.gb}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-3 mt-3">
        <div className="border border-white/30 p-2 text-xs">
          <p className="text-white/70">
            <span className="text-green">▲</span> Up • 
            <span className="text-red"> ▼</span> Down • 
            <span className="text-white"> ─</span> No Change
          </p>
          <p className="text-white/70 mt-1">
            P=Played • W=Won • D=Draw • L=Lost • GB=Games Behind
          </p>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">LEAGUE TABLES - UPDATED AFTER EACH MATCH</span>
      </div>
    </div>
  )
}
