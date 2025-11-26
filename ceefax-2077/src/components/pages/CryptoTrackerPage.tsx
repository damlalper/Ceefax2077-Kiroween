import { useState, useEffect } from 'react'

export default function CryptoTrackerPage() {
  const [btcPrice, setBtcPrice] = useState(43256.78)
  const [priceHistory, setPriceHistory] = useState<number[]>([42, 45, 43, 48, 46, 50, 49, 52, 51, 48, 50, 53, 52, 55, 54, 52, 50, 48, 51, 49])

  useEffect(() => {
    const interval = setInterval(() => {
      setBtcPrice(prev => {
        const newPrice = prev + (Math.random() - 0.5) * 500
        setPriceHistory(ph => [...ph.slice(1), Math.floor(newPrice / 1000)])
        return newPrice
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const renderChart = (data: number[]) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min
    
    const lines = []
    for (let row = 0; row < 8; row++) {
      let line = ''
      for (let col = 0; col < data.length; col++) {
        const normalized = ((data[col] - min) / range) * 7
        if (7 - row <= normalized) {
          line += '█'
        } else {
          line += ' '
        }
      }
      lines.push(line)
    }
    return lines
  }

  const chartLines = renderChart(priceHistory)

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-cyan">
        <span className="double-height text-black">P202 CRYPTO TRACKER</span>
      </div>

      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-base animate-pulse">⚡ LIVE CRYPTO PRICES</p>
      </div>

      {/* Bitcoin Price */}
      <div className="px-3 mt-3">
        <div className="border-2 border-yellow p-3 bg-yellow/10">
          <div className="flex justify-between items-center">
            <span className="text-yellow text-2xl font-bold">₿ BITCOIN</span>
            <span className="text-green text-2xl animate-pulse">▲</span>
          </div>
          <div className="mt-2">
            <span className="text-white text-3xl font-bold">${btcPrice.toFixed(2)}</span>
          </div>
          <div className="mt-1">
            <span className="text-green text-lg">24h: +2.4% • Vol: $28.4B</span>
          </div>
        </div>
      </div>

      {/* ASCII Chart */}
      <div className="px-3 mt-3">
        <p className="text-yellow text-base font-bold mb-1">24H PRICE CHART:</p>
        <div className="border border-yellow p-2 bg-black font-mono text-green text-sm leading-tight">
          {chartLines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <div className="text-white/50 mt-1">└{'─'.repeat(20)}┘</div>
          <div className="text-white/50 text-xs">0h{''.padEnd(16)}24h</div>
        </div>
      </div>

      {/* Other Cryptos */}
      <div className="px-3 mt-3">
        <div className="grid grid-cols-2 gap-2 text-base">
          <div className="border border-cyan p-2">
            <p className="text-cyan font-bold">Ξ ETH</p>
            <p className="text-white">$2,287.45</p>
            <p className="text-green text-sm">+3.1%</p>
          </div>
          <div className="border border-yellow p-2">
            <p className="text-yellow font-bold">🪙 BNB</p>
            <p className="text-white">$312.45</p>
            <p className="text-green text-sm">+1.8%</p>
          </div>
          <div className="border border-magenta p-2">
            <p className="text-magenta font-bold">◎ SOL</p>
            <p className="text-white">$98.76</p>
            <p className="text-green text-sm">+5.2%</p>
          </div>
          <div className="border border-red p-2">
            <p className="text-red font-bold">Ð DOGE</p>
            <p className="text-white">$0.089</p>
            <p className="text-green text-sm">+4.7%</p>
          </div>
        </div>
      </div>

      <div className="px-3 mt-2">
        <p className="text-white/50 text-sm text-center">
          ⚠ Crypto markets are highly volatile • Trade responsibly
        </p>
      </div>

      <div className="teletext-bottom-banner bg-cyan">
        <span className="text-black">CRYPTO TRACKER - BLOCKCHAIN MARKETS</span>
      </div>
    </div>
  )
}
