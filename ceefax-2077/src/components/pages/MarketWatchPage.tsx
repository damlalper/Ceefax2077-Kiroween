import { useState, useEffect } from 'react'

export default function MarketWatchPage() {
  const [prices, setPrices] = useState({
    sp500: 4783.45,
    dow: 37248.35,
    nasdaq: 15034.20,
    ftse: 7733.24
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prev => ({
        sp500: prev.sp500 + (Math.random() - 0.5) * 10,
        dow: prev.dow + (Math.random() - 0.5) * 20,
        nasdaq: prev.nasdaq + (Math.random() - 0.5) * 15,
        ftse: prev.ftse + (Math.random() - 0.5) * 5
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getChange = (val: number, base: number) => {
    const change = ((val - base) / base * 100).toFixed(2)
    return parseFloat(change)
  }

  const renderBar = (value: number, max: number = 100) => {
    const bars = Math.floor((value / max) * 20)
    return '█'.repeat(bars) + '░'.repeat(20 - bars)
  }

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-cyan">
        <span className="double-height text-black">P201 MARKET WATCH</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-base animate-pulse">● LIVE • Updated every 15 seconds</p>
      </div>

      {/* Major Indices */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-xl font-bold mb-2">═══ MAJOR INDICES ═══</p>
        
        <div className="space-y-3">
          <div className="border-2 border-cyan p-2 bg-cyan/10">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg font-bold">S&P 500</span>
              <span className="text-green text-xl">{prices.sp500.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-cyan text-sm">{renderBar(Math.abs(getChange(prices.sp500, 4783.45)) * 10)}</span>
              <span className="text-green text-base">▲ +1.2%</span>
            </div>
          </div>

          <div className="border-2 border-cyan p-2 bg-cyan/10">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg font-bold">DOW JONES</span>
              <span className="text-green text-xl">{prices.dow.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-cyan text-sm">{renderBar(Math.abs(getChange(prices.dow, 37248.35)) * 10)}</span>
              <span className="text-green text-base">▲ +0.8%</span>
            </div>
          </div>

          <div className="border-2 border-cyan p-2 bg-cyan/10">
            <div className="flex justify-between items-center">
              <span className="text-white text-lg font-bold">NASDAQ</span>
              <span className="text-green text-xl">{prices.nasdaq.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-cyan text-sm">{renderBar(Math.abs(getChange(prices.nasdaq, 15034.20)) * 10)}</span>
              <span className="text-green text-base">▲ +1.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Movers */}
      <div className="px-3 mt-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-green text-base font-bold mb-1">▲ TOP GAINERS</p>
            <div className="text-sm space-y-1">
              <p className="text-white">NVDA <span className="text-green">+5.3%</span></p>
              <p className="text-white">TSLA <span className="text-green">+3.7%</span></p>
              <p className="text-white">AMD  <span className="text-green">+4.1%</span></p>
            </div>
          </div>
          <div>
            <p className="text-red text-base font-bold mb-1">▼ TOP LOSERS</p>
            <div className="text-sm space-y-1">
              <p className="text-white">INTC <span className="text-red">-2.8%</span></p>
              <p className="text-white">BABA <span className="text-red">-2.1%</span></p>
              <p className="text-white">PYPL <span className="text-red">-1.9%</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 mt-3">
        <p className="text-white/50 text-sm text-center">
          Data delayed 15min • Not investment advice
        </p>
      </div>

      <div className="teletext-bottom-banner bg-cyan">
        <span className="text-black">MARKET WATCH - REAL-TIME TRADING DATA</span>
      </div>
    </div>
  )
}
