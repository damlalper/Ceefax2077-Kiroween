import { useState } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { SecurityService, type CrimeRisk } from '../../services/SecurityService'

export default function CrimeWatch() {
  const [location, setLocation] = useState('')
  const [riskData, setRiskData] = useState<CrimeRisk | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const analyzeLocation = () => {
    if (!location.trim()) return

    setAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const risk = SecurityService.getCrimeRisk(location)
      setRiskData(risk)
      setAnalyzing(false)
    }, 1000)
  }

  const getRiskBarBlocks = (score: number) => {
    const blocks = Math.ceil(score)
    const emptyBlocks = 10 - blocks
    return '█'.repeat(blocks) + '░'.repeat(emptyBlocks)
  }

  return (
    <TeletextPage 
      title="CRIME WATCH" 
      subtitle="Location Safety Score • Risk Analysis"
      footer="Data from local crime reports • Stay vigilant"
      zone={501}
    >

        {/* Input */}
        <div className="space-y-3">
          <div className="border border-red-400 p-2">
            <label className="text-yellow-300 text-sm">Enter Location:</label>
            <input
              type="text"
              className="w-full bg-black text-cyan-300 border border-gray-600 p-2 mt-1 font-mono text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City name or address..."
              disabled={analyzing}
              onKeyPress={(e) => e.key === 'Enter' && analyzeLocation()}
            />
          </div>

          <button
            onClick={analyzeLocation}
            disabled={analyzing || !location.trim()}
            className={`w-full py-2 font-bold ${
              analyzing || !location.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {analyzing ? '🔍 ANALYZING...' : 'ANALYZE SAFETY'}
          </button>

          {/* Analyzing State */}
          {analyzing && (
            <div className="border border-yellow-400 p-3 text-center animate-pulse">
              <div className="text-yellow-300 text-lg">🚨</div>
              <div className="text-white text-xs mt-2">
                Checking crime databases...
              </div>
            </div>
          )}

          {/* Results */}
          {riskData && !analyzing && (
            <>
              {/* Risk Score Display */}
              <div className={`border p-4 ${
                riskData.riskScore > 7 ? 'border-red-400 bg-red-900 bg-opacity-30' :
                riskData.riskScore > 5 ? 'border-orange-400 bg-orange-900 bg-opacity-20' :
                riskData.riskScore > 3 ? 'border-yellow-400 bg-yellow-900 bg-opacity-20' :
                'border-green-400 bg-green-900 bg-opacity-20'
              }`}>
                <div className="text-center">
                  <div className="text-yellow-300 text-sm">SAFETY RISK SCORE</div>
                  <div className={`text-6xl font-bold ${SecurityService.getRiskColor(riskData.riskScore)}`}>
                    {riskData.riskScore}/10
                  </div>
                  <div className={`text-lg ${SecurityService.getRiskColor(riskData.riskScore)}`}>
                    {riskData.safetyLevel.replace(/_/g, ' ')}
                  </div>
                </div>

                {/* Block Bar */}
                <div className="mt-3 text-center">
                  <pre className={`text-2xl font-mono ${SecurityService.getRiskColor(riskData.riskScore)}`}>
                    {getRiskBarBlocks(riskData.riskScore)}
                  </pre>
                  <div className="text-gray-400 text-xs mt-1">
                    0 = Safest • 10 = Most Dangerous
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="border border-gray-600 p-2">
                <div className="text-yellow-300 text-xs mb-1">📍 LOCATION:</div>
                <div className="text-white text-sm">{riskData.location}</div>
              </div>

              {/* Warnings */}
              {riskData.warnings.length > 0 && (
                <div className={`border p-2 ${
                  riskData.riskScore > 7 ? 'border-red-400 bg-red-900 bg-opacity-20' : 'border-yellow-400 bg-yellow-900 bg-opacity-20'
                }`}>
                  <div className="text-red-400 text-xs mb-2 font-bold">
                    ⚠️ WARNINGS ({riskData.warnings.length}):
                  </div>
                  <div className="space-y-1">
                    {riskData.warnings.map((warning, idx) => (
                      <div key={idx} className="text-white text-xs">
                        • {warning}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {riskData.recommendations.length > 0 && (
                <div className="border border-green-400 p-2 bg-green-900 bg-opacity-20">
                  <div className="text-green-400 text-xs mb-2 font-bold">
                    ✓ SAFETY TIPS ({riskData.recommendations.length}):
                  </div>
                  <div className="space-y-1">
                    {riskData.recommendations.map((rec, idx) => (
                      <div key={idx} className="text-white text-xs">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Info */}
              <div className="border border-red-400 bg-red-900 bg-opacity-30 p-2">
                <div className="text-red-400 text-xs text-center font-bold">
                  🚨 EMERGENCY: DIAL 911 🚨
                </div>
                <div className="text-white text-xs text-center mt-1">
                  Police • Fire • Medical
                </div>
              </div>
            </>
          )}
        </div>

    </TeletextPage>
  )
}
