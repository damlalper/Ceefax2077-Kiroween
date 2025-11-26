export default function BusinessNewsPage() {
  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-cyan">
        <span className="double-height text-black">P204 BUSINESS NEWS</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-base animate-pulse">💼 CORPORATE & ECONOMIC NEWS • UPDATED HOURLY</p>
      </div>

      {/* Breaking News */}
      <div className="px-3 mt-3">
        <div className="border-2 border-red p-3 bg-red/10 animate-pulse">
          <p className="text-red text-base font-bold mb-1">🔥 BREAKING NEWS:</p>
          <p className="text-white text-lg font-bold">
            Tech Giant Announces AI Breakthrough
          </p>
          <p className="text-white text-base mt-2">
            Major tech company unveils new quantum AI chip claiming 1000x performance improvement. Stock up 8% in pre-market trading.
          </p>
          <p className="text-cyan text-sm mt-2">2 minutes ago</p>
        </div>
      </div>

      {/* News Feed */}
      <div className="px-3 mt-3 space-y-3">
        <div className="border-l-4 border-yellow pl-3 py-2">
          <p className="text-yellow text-lg font-bold">$ MERGER ALERT</p>
          <p className="text-white text-base mt-1">
            Two leading cloud providers announce $45B merger deal. Regulatory approval expected Q2 2078.
          </p>
          <p className="text-white/70 text-sm mt-1">15 minutes ago</p>
        </div>

        <div className="border-l-4 border-green pl-3 py-2">
          <p className="text-green text-lg font-bold">$ STARTUP SPOTLIGHT</p>
          <p className="text-white text-base mt-1">
            Climate tech startup raises $200M Series C. Valuation reaches $1.2B unicorn status.
          </p>
          <p className="text-white/70 text-sm mt-1">1 hour ago</p>
        </div>

        <div className="border-l-4 border-cyan pl-3 py-2">
          <p className="text-cyan text-lg font-bold">$ MARKET ANALYSIS</p>
          <p className="text-white text-base mt-1">
            Fed signals potential rate cut in Q3. Markets rally on dovish comments from chairman.
          </p>
          <p className="text-white/70 text-sm mt-1">2 hours ago</p>
        </div>
      </div>

      {/* Economic Indicators */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-lg font-bold mb-2">📊 ECONOMIC INDICATORS:</p>
        <div className="border border-cyan p-3 bg-black/50">
          <div className="grid grid-cols-2 gap-3 text-base">
            <div>
              <p className="text-cyan font-bold">GDP Growth</p>
              <p className="text-green text-xl">+2.8%</p>
              <p className="text-white/70 text-sm">Q4 2077</p>
            </div>
            <div>
              <p className="text-cyan font-bold">Unemployment</p>
              <p className="text-green text-xl">3.7%</p>
              <p className="text-white/70 text-sm">January</p>
            </div>
            <div>
              <p className="text-cyan font-bold">Inflation</p>
              <p className="text-yellow text-xl">2.4%</p>
              <p className="text-white/70 text-sm">YoY</p>
            </div>
            <div>
              <p className="text-cyan font-bold">Interest Rate</p>
              <p className="text-white text-xl">5.25%</p>
              <p className="text-white/70 text-sm">Fed Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="px-3 mt-3">
        <div className="bg-yellow text-black p-2 text-sm font-bold overflow-hidden">
          <div className="animate-pulse">
            📰 LATEST: Oil prices surge 3% • Gold hits new high • Dollar weakens against Euro
          </div>
        </div>
      </div>

      <div className="teletext-bottom-banner bg-cyan">
        <span className="text-black">BUSINESS NEWS - GLOBAL MARKETS & ECONOMY</span>
      </div>
    </div>
  )
}
