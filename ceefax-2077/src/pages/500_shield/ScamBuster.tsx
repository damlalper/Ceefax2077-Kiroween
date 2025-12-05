import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { SecurityService, type ScamAnalysis } from '../../services/SecurityService'

export default function ScamBuster() {
  const [inputText, setInputText] = useState('')
  const [analysis, setAnalysis] = useState<ScamAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [flashRed, setFlashRed] = useState(false)

  useEffect(() => {
    // Flash red if scam detected
    if (analysis && (analysis.verdict === 'SCAM' || analysis.verdict === 'CRITICAL_SCAM')) {
      const flashInterval = setInterval(() => {
        setFlashRed(prev => !prev)
      }, 500)

      setTimeout(() => {
        clearInterval(flashInterval)
        setFlashRed(false)
      }, 3000)

      return () => clearInterval(flashInterval)
    }
    return () => setFlashRed(false)
  }, [analysis])

  const analyzeText = () => {
    if (!inputText.trim()) return

    setAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const result = SecurityService.analyzeScam(inputText)
      setAnalysis(result)
      setAnalyzing(false)
    }, 1200)
  }

  const SAFE_STAMP = `
  ╔═══════════════════╗
  ║                   ║
  ║   [ S A F E ]     ║
  ║                   ║
  ╚═══════════════════╝
  `

  const SCAM_STAMP = `
  ╔═══════════════════╗
  ║                   ║
  ║   [ S C A M ]     ║
  ║                   ║
  ╚═══════════════════╝
  `

  return (
    <TeletextPage 
      title={flashRed ? "🚨 SCAM BUSTER 🚨" : "SCAM BUSTER"} 
      subtitle="AI Fraud Detection • Link & SMS Scanner"
      footer="AI-powered fraud detection • Report scams to FTC"
      zone={502}
    >
      <div style={{ backgroundColor: flashRed ? 'rgba(139, 0, 0, 0.5)' : 'transparent' }}>

        <div className="space-y-3">
          <div className="border border-red-400 p-2">
            <label className="text-yellow-300 text-sm">Paste Suspicious Message:</label>
            <textarea
              className="w-full bg-black text-cyan-300 border border-gray-600 p-2 mt-1 font-mono text-xs"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste suspicious SMS, email, or link here..."
              disabled={analyzing}
            />
          </div>

          <button
            onClick={analyzeText}
            disabled={analyzing || !inputText.trim()}
            className={`w-full py-2 font-bold ${
              analyzing || !inputText.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {analyzing ? '🔍 SCANNING...' : 'SCAN FOR SCAM'}
          </button>

          {/* Analyzing State */}
          {analyzing && (
            <div className="border border-yellow-400 p-3 text-center animate-pulse">
              <div className="text-yellow-300 text-lg">🛡️</div>
              <div className="text-white text-xs mt-2">
                AI analyzing for fraud patterns...
              </div>
            </div>
          )}

          {/* Results */}
          {analysis && !analyzing && (
            <>
              {/* ASCII Stamp */}
              <div className={`border p-4 text-center ${
                analysis.verdict === 'SAFE' 
                  ? 'border-green-400 bg-green-900 bg-opacity-30' 
                  : 'border-red-400 bg-red-900 bg-opacity-30'
              }`}>
                <pre className={`text-lg font-bold leading-tight ${
                  analysis.verdict === 'SAFE' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {analysis.verdict === 'SAFE' ? SAFE_STAMP : SCAM_STAMP}
                </pre>
                <div className={`text-2xl font-bold mt-2 ${SecurityService.getVerdictColor(analysis.verdict)}`}>
                  {analysis.verdict.replace(/_/g, ' ')}
                </div>
                <div className="text-white text-sm mt-1">
                  Danger Level: {analysis.dangerLevel}%
                </div>
              </div>

              {/* Danger Bar */}
              <div className="border border-gray-600 p-2">
                <div className="text-yellow-300 text-xs mb-2">THREAT LEVEL:</div>
                <div className="bg-gray-800 h-6 relative">
                  <div
                    className={`h-full transition-all ${
                      analysis.dangerLevel > 70 ? 'bg-red-600' :
                      analysis.dangerLevel > 50 ? 'bg-red-400' :
                      analysis.dangerLevel > 25 ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`}
                    style={{ width: `${analysis.dangerLevel}%` }}
                  />
                </div>
                <div className="text-white text-xs text-right mt-1">
                  {analysis.dangerLevel}/100
                </div>
              </div>

              {/* Red Flags */}
              {analysis.redFlags.length > 0 && (
                <div className={`border p-2 ${
                  analysis.verdict === 'SAFE' 
                    ? 'border-gray-600' 
                    : 'border-red-400 bg-red-900 bg-opacity-20'
                }`}>
                  <div className="text-red-400 text-xs mb-2 font-bold">
                    🚩 DETECTED ISSUES ({analysis.redFlags.length}):
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {analysis.redFlags.map((flag, idx) => (
                      <div key={idx} className="text-white text-xs">
                        • {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className={`border p-2 ${
                analysis.verdict === 'SAFE' 
                  ? 'border-green-400 bg-green-900 bg-opacity-20' 
                  : 'border-red-400 bg-red-900 bg-opacity-30'
              }`}>
                <div className="text-yellow-300 text-xs mb-2">📋 RECOMMENDATION:</div>
                <div className="text-white text-xs">
                  {analysis.recommendation}
                </div>
                <div className="text-gray-400 text-xs mt-2">
                  Confidence: {analysis.confidence}%
                </div>
              </div>

              {/* Critical Warning */}
              {analysis.verdict === 'CRITICAL_SCAM' && (
                <div className="border border-red-400 bg-red-900 bg-opacity-50 p-2 animate-pulse">
                  <div className="text-red-400 text-xs text-center font-bold">
                    🚨 CRITICAL SCAM DETECTED 🚨
                  </div>
                  <div className="text-white text-xs text-center mt-1">
                    DO NOT RESPOND • DELETE IMMEDIATELY • REPORT TO AUTHORITIES
                  </div>
                </div>
              )}
            </>
          )}

          {/* Info Box */}
          {!analysis && !analyzing && (
            <div className="border border-gray-600 p-2">
              <div className="text-yellow-300 text-xs mb-1">💡 WHAT TO CHECK:</div>
              <div className="text-white text-xs space-y-1">
                <div>• Suspicious links or URLs</div>
                <div>• Requests for passwords or personal info</div>
                <div>• Urgency tactics ("act now!")</div>
                <div>• Prize/lottery notifications</div>
                <div>• IRS/tax scams</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </TeletextPage>
  )
}
