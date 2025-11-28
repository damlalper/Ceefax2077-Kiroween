import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
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
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className={`text-xl ${crashMode ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
            ORACLE OF DOOM
          </h1>
          <p className="text-cyan-300 text-sm">Market Risk Doomsday Clock</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className={`text-yellow-300 text-lg ${blink ? 'opacity-100' : 'opacity-0'}`}>
              🔮 CONSULTING ORACLE...
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* ASCII Skull - Only appears in HIGH RISK */}
            {crashMode && (
              <div className="border border-red-400 bg-red-900 bg-opacity-30 p-2 mb-3">
                <pre className="text-red-400 text-xs leading-tight text-center animate-pulse">
                  {SKULL}
                </pre>
                <div className="text-red-400 text-center font-bold text-sm mt-2">
                  ☠️ THE ORACLE HAS SPOKEN ☠️
                </div>
              </div>
            )}

            {/* Doomsday Clock */}
            <div className="border border-red-400 p-3 mb-3">
              <div className="text-center">
                <div className="text-6xl mb-2">⏰</div>
                <div className={`text-5xl font-bold ${getClockColor(doomLevel)}`}>
                  {doomLevel}%
                </div>
                <div className="text-white text-sm mt-2">{getDoomMessage(doomLevel)}</div>
              </div>

              <div className="mt-3 bg-gray-800 h-6 relative">
                <div
                  className={`h-full transition-all ${
                    doomLevel > 70 ? 'bg-red-500' : doomLevel > 50 ? 'bg-orange-500' : doomLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${doomLevel}%` }}
                />
              </div>
            </div>

            {/* Market Data */}
            <div className="border border-gray-600 p-2 mb-2">
              <div className="text-yellow-300 text-xs mb-2">CURRENT MARKET:</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white">BTC Price:</span>
                  <span className={btcPrice && btcPrice < 90000 ? 'text-red-400' : 'text-green-400'}>
                    ${btcPrice ? CoinGeckoService.formatPrice(btcPrice) : '---'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">ETH Price:</span>
                  <span className="text-cyan-400">
                    ${ethPrice ? CoinGeckoService.formatPrice(ethPrice) : '---'}
                  </span>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            {riskAnalysis && (
              <div className="space-y-2">
                <div className="text-yellow-300 text-sm border-b border-gray-600 pb-1">
                  RISK FACTORS:
                </div>
                {riskAnalysis.factors.map((factor, idx) => (
                  <div key={idx} className="border border-gray-600 p-2">
                    <div className="flex justify-between items-center">
                      <div className="text-white text-xs">{factor}</div>
                      <div className={
                        riskAnalysis.risk_level === 'CRITICAL' ? 'text-red-400' :
                        riskAnalysis.risk_level === 'HIGH' ? 'text-orange-400' :
                        riskAnalysis.risk_level === 'MEDIUM' ? 'text-yellow-400' :
                        'text-green-400'
                      }>
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
              <div className="mt-3 border border-yellow-400 p-2">
                <div className="text-yellow-300 text-xs mb-1">🤖 MCP ANALYSIS:</div>
                <div className="text-white text-xs">
                  {riskAnalysis.recommendation}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  Risk Level: {riskAnalysis.risk_level} ({riskAnalysis.risk_score}/100)
                </div>
              </div>
            )}

            <div className="mt-3 text-center">
              <p className="text-gray-400 text-xs">
                AI-powered risk analysis • MCP Agent Active
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextGrid>
  )
}
