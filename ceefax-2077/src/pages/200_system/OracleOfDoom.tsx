import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { CoinGeckoService } from '../../services/CoinGeckoService'
import { useMarketCrash } from '../../hooks/useMarketCrash'

export default function OracleOfDoom() {
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const [ethPrice, setEthPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [blink, setBlink] = useState(true)

  // Use market crash hook
  const { crashMode, riskAnalysis } = useMarketCrash(btcPrice, ethPrice)

  useEffect(() => {
    loadMarketData()

    // Blink effect
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 400)

    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      loadMarketData()
    }, 30000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(refreshInterval)
    }
  }, [])

  const loadMarketData = async () => {
    try {
      setLoading(true)
      const prices = await CoinGeckoService.getCurrentPrices(['bitcoin', 'ethereum'])
      
      const btc = prices.find(p => p.id === 'bitcoin')
      const eth = prices.find(p => p.id === 'ethereum')
      
      if (btc) setBtcPrice(btc.current_price)
      if (eth) setEthPrice(eth.current_price)
    } catch (error) {
      console.error('Failed to load market data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getDoomLevel = () => {
    if (!riskAnalysis) return 50
    return riskAnalysis.risk_score
  }

  const getDoomMessage = (level: number) => {
    if (level < 20) return '🟢 CALM - Markets are stable'
    if (level < 40) return '🟡 CAUTION - Minor turbulence ahead'
    if (level < 60) return '🟠 WARNING - Significant risks detected'
    if (level < 80) return '🔴 DANGER - High market volatility'
    return '💀 APOCALYPSE - Economic collapse imminent'
  }

  const getClockColor = (level: number) => {
    if (level < 40) return 'text-green-400'
    if (level < 60) return 'text-yellow-400'
    if (level < 80) return 'text-orange-400'
    return 'text-red-400'
  }

  const doomLevel = getDoomLevel()

  // ASCII Skull (appears only in HIGH RISK mode)
  const SKULL = `
    _______________
   /               \\
  /   ___     ___   \\
 |   /   \\   /   \\   |
 |   \\_O_/   \\_O_/   |
 |                   |
 |    \\         /    |
 |     \\_______/     |
  \\                 /
   \\_______________ /
  `

  return (
    <TeletextPage 
      title={crashMode ? "🚨 ORACLE OF DOOM 🚨" : "ORACLE OF DOOM"} 
      subtitle="Market Risk Doomsday Clock"
      footer="AI-powered risk analysis • MCP Agent Active"
      zone={204}
    >
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ 
            color: '#FFD700', 
            fontSize: 'clamp(16px, 2.5vmin, 24px)',
            opacity: blink ? 1 : 0,
            transition: 'opacity 0.3s'
          }}>
            🔮 CONSULTING ORACLE...
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* ASCII Skull - Only appears in HIGH RISK */}
          {crashMode && (
            <div style={{ border: '2px solid #FF0000', backgroundColor: 'rgba(139, 0, 0, 0.3)', padding: '0.5rem', marginBottom: '1rem' }}>
              <pre style={{ color: '#FF0000', fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2', textAlign: 'center', animation: 'pulse 2s infinite', margin: 0 }}>
                {SKULL}
              </pre>
              <div style={{ color: '#FF0000', textAlign: 'center', fontWeight: 'bold', fontSize: 'clamp(12px, 2vmin, 16px)', marginTop: '0.5rem' }}>
                ☠️ THE ORACLE HAS SPOKEN ☠️
              </div>
            </div>
          )}

          {/* Doomsday Clock */}
          <div style={{ border: '2px solid #FF0000', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(40px, 8vmin, 60px)', marginBottom: '0.5rem' }}>⏰</div>
              <div style={{ 
                fontSize: 'clamp(32px, 6vmin, 48px)', 
                fontWeight: 'bold',
                color: getClockColor(doomLevel)
              }}>
                {doomLevel}%
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)', marginTop: '0.5rem' }}>{getDoomMessage(doomLevel)}</div>
            </div>

            <div style={{ marginTop: '1rem', backgroundColor: '#333333', height: '24px', position: 'relative' }}>
              <div
                style={{
                  height: '100%',
                  transition: 'width 0.3s',
                  backgroundColor: 
                    doomLevel > 70 ? '#FF0000' : 
                    doomLevel > 50 ? '#FF8800' : 
                    doomLevel > 30 ? '#FFD700' : '#00FF00',
                  width: `${doomLevel}%`
                }}
              />
            </div>
          </div>

          {/* Market Data */}
          <div style={{ border: '2px solid #666666', padding: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>CURRENT MARKET:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#FFFFFF' }}>BTC Price:</span>
                <span style={{ color: btcPrice && btcPrice < 90000 ? '#FF0000' : '#00FF00' }}>
                  ${btcPrice ? CoinGeckoService.formatPrice(btcPrice) : '---'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#FFFFFF' }}>ETH Price:</span>
                <span style={{ color: '#00FFFF' }}>
                  ${ethPrice ? CoinGeckoService.formatPrice(ethPrice) : '---'}
                </span>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          {riskAnalysis && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)', borderBottom: '2px solid #666666', paddingBottom: '0.25rem' }}>
                RISK FACTORS:
              </div>
              {riskAnalysis.factors.map((factor, idx) => (
                <div key={idx} style={{ border: '2px solid #666666', padding: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>{factor}</div>
                    <div style={{ fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>
                      {riskAnalysis.risk_level === 'CRITICAL' ? '💀' :
                       riskAnalysis.risk_level === 'HIGH' ? '🔴' :
                       riskAnalysis.risk_level === 'MEDIUM' ? '🟡' : '🟢'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MCP Analysis */}
          {riskAnalysis && (
            <div style={{ marginTop: '1rem', border: '2px solid #FFD700', padding: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>🤖 MCP ANALYSIS:</div>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
                {riskAnalysis.recommendation}
              </div>
              <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.25rem' }}>
                Risk Level: {riskAnalysis.risk_level} ({riskAnalysis.risk_score}/100)
              </div>
            </div>
          )}
        </>
      )}
    </TeletextPage>
  )
}
