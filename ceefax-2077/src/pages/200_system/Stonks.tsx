import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
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
    if (change > 0) return '#00FF00'
    if (change < 0) return '#FF0000'
    return '#888888'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return '▲'
    if (change < 0) return '▼'
    return '→'
  }

  return (
    <TeletextPage 
      title={crashMode ? "🚨 STONKS 🚨" : "STONKS"} 
      subtitle="Live Crypto Market • CoinGecko API"
      footer="💎🙌 DIAMOND HANDS ONLY • NFA DYOR"
      zone={201}
    >

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: 'clamp(16px, 2.5vmin, 24px)',
            opacity: blink ? 1 : 0,
            transition: 'opacity 0.3s'
          }}>
            ⚡ CONNECTING...
          </div>
          <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
            Fetching live prices from CoinGecko
          </div>
        </div>
      )}

      {error && (
        <div style={{ border: '2px solid #FF0000', padding: '1rem', textAlign: 'center' }}>
          <div style={{ color: '#FF0000', fontSize: 'clamp(12px, 2vmin, 16px)' }}>⚠ {error}</div>
          <button
            onClick={loadPrices}
            style={{
              marginTop: '0.5rem',
              backgroundColor: '#FFD700',
              color: '#000000',
              padding: '0.25rem 1rem',
              fontSize: 'clamp(10px, 1.5vmin, 14px)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            RETRY
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Crash Mode Alert */}
          {crashMode && riskAnalysis && (
            <div style={{ 
              border: '2px solid #FF0000', 
              backgroundColor: 'rgba(139, 0, 0, 0.3)', 
              padding: '0.5rem', 
              marginBottom: '1rem',
              animation: 'pulse 2s infinite'
            }}>
              <div style={{ color: '#FF0000', textAlign: 'center', fontWeight: 'bold', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
                🚨 {riskAnalysis.risk_level} RISK DETECTED 🚨
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginTop: '0.25rem' }}>
                {riskAnalysis.recommendation}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {prices.map((asset) => (
              <div 
                key={asset.id} 
                style={{
                  border: crashMode && asset.id === 'bitcoin' ? '2px solid #FF0000' : '2px solid #FFD700',
                  backgroundColor: crashMode && asset.id === 'bitcoin' ? 'rgba(139, 0, 0, 0.2)' : 'transparent',
                  padding: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#FFD700', fontWeight: 'bold', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
                      {asset.symbol}
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>
                      ${CoinGeckoService.formatPrice(asset.current_price)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: getChangeColor(asset.price_change_percentage_24h), fontSize: 'clamp(12px, 2vmin, 16px)' }}>
                      {getChangeIcon(asset.price_change_percentage_24h)}{' '}
                      {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)', fontFamily: 'monospace', marginTop: '0.25rem' }}>
                      {charts[asset.id] || '▁▂▃▄▅▆▇█'}
                    </div>
                  </div>
                </div>
                <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.25rem' }}>
                  24h Vol: ${asset.volume_24h ? (asset.volume_24h / 1e9).toFixed(2) : '0'}B
                </div>
              </div>
            ))}
          </div>

          {/* Market Sentiment */}
          <div style={{ marginTop: '1rem', border: '2px solid #666666', padding: '0.5rem' }}>
            <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>MARKET SENTIMENT</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              <span style={{ color: '#00FF00' }}>
                BULLISH {Math.round((prices.filter(p => p.price_change_percentage_24h > 0).length / prices.length) * 100)}%
              </span>
              <span style={{ color: '#FF0000' }}>
                BEARISH {Math.round((prices.filter(p => p.price_change_percentage_24h <= 0).length / prices.length) * 100)}%
              </span>
            </div>
            <div style={{ backgroundColor: '#333333', height: '12px', marginTop: '0.25rem', display: 'flex' }}>
              <div 
                style={{ 
                  backgroundColor: '#00FF00',
                  width: `${(prices.filter(p => p.price_change_percentage_24h > 0).length / prices.length) * 100}%` 
                }} 
              />
              <div 
                style={{ 
                  backgroundColor: '#FF0000',
                  width: `${(prices.filter(p => p.price_change_percentage_24h <= 0).length / prices.length) * 100}%` 
                }} 
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              onClick={loadPrices}
              style={{
                backgroundColor: '#FFD700',
                color: '#000000',
                padding: '0.25rem 1rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              REFRESH
            </button>
            <p style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
              Live data • Auto-refresh 30s • CoinGecko API
            </p>
          </div>
        </>
      )}
    </TeletextPage>
  )
}
