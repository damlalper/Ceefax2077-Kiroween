import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { CoinGeckoService, type CryptoPrice } from '../../services/CoinGeckoService'
import { useMarketCrash } from '../../hooks/useMarketCrash'

export default function Stonks() {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blink, setBlink] = useState(true)
  const [charts, setCharts] = useState<Record<string, string>>({})

  // Get BTC price for crash detection
  const btcPrice = prices.find(p => p.id === 'bitcoin')?.current_price || null
  const ethPrice = prices.find(p => p.id === 'ethereum')?.current_price || null
  const btcChange = prices.find(p => p.id === 'bitcoin')?.price_change_percentage_24h || 0

  // Use market crash hook
  const { crashMode, riskAnalysis } = useMarketCrash(btcPrice, ethPrice, btcChange)

  useEffect(() => {
    loadPrices()

    // Blink effect
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      loadPrices()
    }, 30000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(refreshInterval)
    }
  }, [])

  const loadPrices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await CoinGeckoService.getCurrentPrices(['bitcoin', 'ethereum', 'solana', 'cardano'])
      setPrices(data)

      // Generate block charts for each
      const newCharts: Record<string, string> = {}
      data.forEach(crypto => {
        const history = CoinGeckoService.generatePriceHistory(
          crypto.current_price,
          crypto.price_change_24h,
          24
        )
        newCharts[crypto.id] = CoinGeckoService.generateBlockChart(history, 12)
      })
      setCharts(newCharts)
    } catch (err) {
      setError('SIGNAL LOST - Failed to fetch prices')
      console.error('Failed to load prices:', err)
    } finally {
      setLoading(false)
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return '▲'
    if (change < 0) return '▼'
    return '→'
  }

  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className={`text-xl ${crashMode ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
            STONKS TERMINAL
          </h1>
          <p className="text-cyan-300 text-sm">Live Crypto Market Data</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className={`text-yellow-300 text-lg ${blink ? 'opacity-100' : 'opacity-0'}`}>
              ⚡ CONNECTING...
            </div>
            <div className="text-gray-400 text-xs mt-2">Fetching live prices from CoinGecko</div>
          </div>
        )}

        {error && (
          <div className="border border-red-400 p-3 text-center">
            <div className="text-red-400 text-sm">⚠ {error}</div>
            <button
              onClick={loadPrices}
              className="mt-2 bg-yellow-600 text-black px-4 py-1 text-xs hover:bg-yellow-700 font-bold"
            >
              RETRY
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Crash Mode Alert */}
            {crashMode && riskAnalysis && (
              <div className="border border-red-400 bg-red-900 bg-opacity-30 p-2 mb-3 animate-pulse">
                <div className="text-red-400 text-center font-bold text-sm">
                  🚨 {riskAnalysis.risk_level} RISK DETECTED 🚨
                </div>
                <div className="text-white text-xs text-center mt-1">
                  {riskAnalysis.recommendation}
                </div>
              </div>
            )}

            <div className="space-y-2">
              {prices.map((asset) => (
                <div 
                  key={asset.id} 
                  className={`border p-2 ${
                    crashMode && asset.id === 'bitcoin' 
                      ? 'border-red-400 bg-red-900 bg-opacity-20' 
                      : 'border-yellow-400'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-yellow-300 font-bold">{asset.symbol}</div>
                      <div className="text-white text-lg">
                        ${CoinGeckoService.formatPrice(asset.current_price)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={getChangeColor(asset.price_change_percentage_24h)}>
                        {getChangeIcon(asset.price_change_percentage_24h)}{' '}
                        {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                      </div>
                      <div className="text-white text-xl font-mono mt-1">
                        {charts[asset.id] || '▁▂▃▄▅▆▇█'}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    24h Vol: ${asset.volume_24h ? (asset.volume_24h / 1e9).toFixed(2) : '0'}B
                  </div>
                </div>
              ))}
            </div>

            {/* Market Sentiment */}
            <div className="mt-4 border border-gray-600 p-2">
              <div className="text-yellow-300 text-xs">MARKET SENTIMENT</div>
              <div className="flex justify-between mt-1">
                {prices.filter(p => p.price_change_percentage_24h > 0).length > prices.length / 2 ? (
                  <>
                    <span className="text-green-400">BULLISH {Math.round((prices.filter(p => p.price_change_percentage_24h > 0).length / prices.length) * 100)}%</span>
                    <span className="text-red-400">BEARISH {Math.round((prices.filter(p => p.price_change_percentage_24h <= 0).length / prices.length) * 100)}%</span>
                  </>
                ) : (
                  <>
                    <span className="text-green-400">BULLISH {Math.round((prices.filter(p => p.price_change_percentage_24h > 0).length / prices.length) * 100)}%</span>
                    <span className="text-red-400">BEARISH {Math.round((prices.filter(p => p.price_change_percentage_24h <= 0).length / prices.length) * 100)}%</span>
                  </>
                )}
              </div>
              <div className="bg-gray-800 h-3 mt-1 flex">
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(prices.filter(p => p.price_change_percentage_24h > 0).length / prices.length) * 100}%` }} 
                />
                <div 
                  className="bg-red-500" 
                  style={{ width: `${(prices.filter(p => p.price_change_percentage_24h <= 0).length / prices.length) * 100}%` }} 
                />
              </div>
            </div>

            <div className="mt-3 text-center">
              <button
                onClick={loadPrices}
                className="bg-yellow-600 text-black px-4 py-1 text-xs hover:bg-yellow-700 font-bold"
              >
                REFRESH
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Live data • Auto-refresh 30s • CoinGecko API
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextGrid>
  )
}
