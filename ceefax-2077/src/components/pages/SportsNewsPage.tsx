export default function SportsNewsPage() {
  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P304 SPORTS NEWS</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">⚽ BREAKING STORIES • TRANSFERS • UPDATES</p>
      </div>

      {/* Breaking */}
      <div className="px-3 mt-3">
        <div className="border-2 border-red p-3 bg-red/10">
          <p className="text-red text-base font-bold animate-pulse">🔥 BREAKING:</p>
          <p className="text-white text-xl font-bold mt-1">
            Record Transfer Deal Confirmed
          </p>
          <p className="text-white text-base mt-2">
            Star striker moves to Real Madrid for record-breaking €180M transfer fee. Player signs 5-year contract worth €30M/year.
          </p>
          <p className="text-green text-sm mt-2">Just now</p>
        </div>
      </div>

      {/* News Grid */}
      <div className="px-3 mt-3 space-y-2">
        <div className="border border-yellow p-2 bg-black/50">
          <p className="text-yellow text-base font-bold">🏆 CHAMPIONSHIP UPDATE</p>
          <p className="text-white text-base mt-1">
            Djokovic wins 25th Grand Slam title at Australian Open. Defeats Sinner in straight sets.
          </p>
          <p className="text-white/70 text-sm mt-1">2 hours ago</p>
        </div>

        <div className="border border-green p-2 bg-black/50">
          <p className="text-green text-base font-bold">🏎️ FORMULA 1</p>
          <p className="text-white text-base mt-1">
            Verstappen extends championship lead with dominant win in Monaco. Red Bull secures 1-2 finish.
          </p>
          <p className="text-white/70 text-sm mt-1">4 hours ago</p>
        </div>

        <div className="border border-red p-2 bg-black/50">
          <p className="text-red text-base font-bold">⚠️ INJURY REPORT</p>
          <p className="text-white text-base mt-1">
            Lakers star ruled out 4-6 weeks with ankle injury. Team considers trade options before deadline.
          </p>
          <p className="text-white/70 text-sm mt-1">6 hours ago</p>
        </div>
      </div>

      {/* Headlines */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">📰 OTHER HEADLINES:</p>
        <div className="border border-white/30 p-2 bg-black/50 text-sm space-y-1">
          <p className="text-white">• Olympic committee announces 2080 host city</p>
          <p className="text-white">• New world record set in 100m sprint (9.52s)</p>
          <p className="text-white">• Boxing: Heavyweight title fight confirmed for March</p>
          <p className="text-white">• Cricket: India wins Test series 3-1 vs Australia</p>
          <p className="text-white">• NFL: Super Bowl tickets sell out in 3 minutes</p>
        </div>
      </div>

      {/* Transfer Window */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">💰 TRANSFER WINDOW:</p>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between border-b border-green/30 pb-1">
            <span className="text-cyan">Mbappé → Real Madrid</span>
            <span className="text-green">€180M</span>
          </div>
          <div className="flex justify-between border-b border-green/30 pb-1">
            <span className="text-cyan">Kane → Bayern Munich</span>
            <span className="text-green">€120M</span>
          </div>
          <div className="flex justify-between border-b border-green/30 pb-1">
            <span className="text-cyan">Rice → Arsenal</span>
            <span className="text-green">€105M</span>
          </div>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">SPORTS NEWS - UPDATED EVERY 15 MINUTES</span>
      </div>
    </div>
  )
}
