import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { SocialService, type SinAnalysis } from '../../services/SocialService'

export default function SoulWeight() {
  const [username, setUsername] = useState('')
  const [analysis, setAnalysis] = useState<SinAnalysis | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [scaleAnimation, setScaleAnimation] = useState(0)
  const [flashHell, setFlashHell] = useState(false)

  useEffect(() => {
    if (analysis) {
      // Animate scale tipping
      let progress = 0
      const targetPosition = analysis.scalePosition
      const interval = setInterval(() => {
        progress += 5
        const currentPosition = (targetPosition * progress) / 100
        setScaleAnimation(currentPosition)
        
        if (progress >= 100) {
          clearInterval(interval)
          
          // Flash red if HELL verdict
          if (analysis.verdict === 'HELL') {
            setFlashHell(true)
            setTimeout(() => setFlashHell(false), 2000)
          }
        }
      }, 20)
      
      return () => clearInterval(interval)
    }
  }, [analysis])

  const analyzeUsername = () => {
    if (!username.trim()) return
    
    setAnalyzing(true)
    setScaleAnimation(0)
    
    // Simulate analysis delay for drama
    setTimeout(() => {
      const result = SocialService.analyzeSinScore(username)
      setAnalysis(result)
      setAnalyzing(false)
    }, 1500)
  }

  const getScaleVisual = () => {
    const leftWeight = scaleAnimation < 0 ? Math.abs(scaleAnimation) : 0
    const rightWeight = scaleAnimation > 0 ? scaleAnimation : 0
    
    const leftHeight = Math.floor(leftWeight / 10)
    const rightHeight = Math.floor(rightWeight / 10)
    
    return `
    ${' '.repeat(10 - leftHeight)}${'█'.repeat(leftHeight)}⚖️${'█'.repeat(rightHeight)}
    ${' '.repeat(10)}║ ║
    ${' '.repeat(8)}HEAVEN ║ ║ HELL
    `
  }

  return (
    <TeletextPage 
      title={flashHell ? "🔥 SOUL WEIGHT 🔥" : "SOUL WEIGHT"} 
      subtitle="Digital Judgment Tool • Username Sin Calculator"
      footer="The scales never lie • Your username reveals your soul"
      zone={304}
    >
      <div style={{ backgroundColor: flashHell ? 'rgba(139, 0, 0, 0.3)' : 'transparent' }}>
        {/* Judgment Commentary */}
        <div style={{ border: '2px solid #FF1493', backgroundColor: 'rgba(255, 20, 147, 0.2)', padding: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#FF1493', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', fontWeight: 'bold' }}>
            ⚖️ THE SCALES OF JUDGMENT ⚖️
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginTop: '0.25rem' }}>
            YOUR USERNAME WILL BE WEIGHED • HEAVEN OR HELL AWAITS
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <div className="border border-pink-400 p-2">
            <label className="text-yellow-300 text-sm">Enter Username to Judge:</label>
            <input
              type="text"
              className="w-full bg-black text-cyan-300 border border-gray-600 p-2 mt-1 font-mono text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="xXDarkLord420Xx"
              maxLength={30}
              disabled={analyzing}
            />
          </div>

          <button
            onClick={analyzeUsername}
            disabled={analyzing || !username.trim()}
            className={`w-full py-2 font-bold ${
              analyzing || !username.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            }`}
          >
            {analyzing ? '⚖️ WEIGHING SOUL...' : 'JUDGE USERNAME'}
          </button>

          {/* Analyzing State */}
          {analyzing && (
            <div className="border border-yellow-400 p-3 text-center animate-pulse">
              <div className="text-yellow-300 text-lg mb-2">⚖️</div>
              <div className="text-white text-xs">
                CALCULATING SIN SCORE...
              </div>
              <div className="text-gray-400 text-xs mt-1">
                The digital gods are deliberating
              </div>
            </div>
          )}

          {/* Results */}
          {analysis && !analyzing && (
            <>
              {/* Scale Animation */}
              <div className="border border-pink-400 p-3 bg-black">
                <pre className="text-cyan-300 text-xs text-center font-mono leading-tight">
                  {getScaleVisual()}
                </pre>
              </div>

              {/* Verdict */}
              <div className={`border p-4 ${
                analysis.verdict === 'HELL' ? 'border-red-400 bg-red-900 bg-opacity-30' :
                analysis.verdict === 'HEAVEN' ? 'border-green-400 bg-green-900 bg-opacity-20' :
                'border-yellow-400 bg-yellow-900 bg-opacity-20'
              }`}>
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {SocialService.getVerdictEmoji(analysis.verdict)}
                  </div>
                  <div className={`text-4xl font-bold ${SocialService.getVerdictColor(analysis.verdict)}`}>
                    {analysis.verdict}
                  </div>
                  <div className="text-white text-sm mt-2">
                    Sin Score: {analysis.sinScore}/100
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 bg-gray-800 h-4 relative">
                  <div
                    className={`h-full transition-all ${
                      analysis.sinScore > 60 ? 'bg-red-500' :
                      analysis.sinScore > 30 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${analysis.sinScore}%` }}
                  />
                </div>
              </div>

              {/* Judgment */}
              <div className="border border-gray-600 p-2">
                <div className="text-yellow-300 text-xs mb-1">⚖️ JUDGMENT:</div>
                <div className="text-white text-xs">{analysis.judgment}</div>
              </div>

              {/* Sins */}
              {analysis.sins.length > 0 && (
                <div className="border border-red-400 p-2 bg-red-900 bg-opacity-20">
                  <div className="text-red-400 text-xs mb-2 font-bold">
                    🔥 SINS DETECTED ({analysis.sins.length}):
                  </div>
                  <div className="space-y-1">
                    {analysis.sins.map((sin, idx) => (
                      <div key={idx} className="text-white text-xs">
                        • {sin}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Virtues */}
              {analysis.virtues.length > 0 && (
                <div className="border border-green-400 p-2 bg-green-900 bg-opacity-20">
                  <div className="text-green-400 text-xs mb-2 font-bold">
                    ✨ VIRTUES FOUND ({analysis.virtues.length}):
                  </div>
                  <div className="space-y-1">
                    {analysis.virtues.map((virtue, idx) => (
                      <div key={idx} className="text-white text-xs">
                        • {virtue}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hell Flash Warning */}
              {analysis.verdict === 'HELL' && (
                <div className="border border-red-400 bg-red-900 bg-opacity-40 p-2 animate-pulse">
                  <div className="text-red-400 text-xs text-center font-bold">
                    🔥 CONDEMNED TO DIGITAL HELL 🔥
                  </div>
                  <div className="text-white text-xs text-center mt-1">
                    REPENT AND CHOOSE A BETTER USERNAME
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </TeletextPage>
  )
}
