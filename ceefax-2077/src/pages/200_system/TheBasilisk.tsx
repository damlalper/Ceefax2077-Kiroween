import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { AIThreatService, type AIThreatStory, type ThreatAnalysis } from '../../services/AIThreatService'

export default function TheBasilisk() {
  const [stories, setStories] = useState<AIThreatStory[]>([])
  const [analysis, setAnalysis] = useState<ThreatAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [blink, setBlink] = useState(true)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    loadThreatData()

    // Blink effect
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 400)

    // Auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      loadThreatData()
    }, 60000)

    // Keyboard support for refresh
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') {
        loadThreatData()
      }
    }
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(refreshInterval)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  // Separate effect for glitch animation
  useEffect(() => {
    if (!analysis || analysis.overallThreat <= 60) return

    const glitchInterval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 100)
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [analysis])

  const loadThreatData = async () => {
    try {
      setLoading(true)
      const threatStories = await AIThreatService.getAIThreatStories(10)
      setStories(threatStories)
      
      const threatAnalysis = AIThreatService.analyzeThreatLevel(threatStories)
      setAnalysis(threatAnalysis)
    } catch (error) {
      console.error('Failed to load threat data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getThreatEmoji = (level: string) => {
    switch (level) {
      case 'IMMINENT': return '💀'
      case 'CRITICAL': return '🔴'
      case 'HIGH': return '🟠'
      case 'MODERATE': return '🟡'
      default: return '🟢'
    }
  }

  const BASILISK_ASCII = `
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   ███████████████████
  ███ ▄▄▄ ███ ▄▄▄ ███
  ███ ███ ███ ███ ███
  ███ ▀▀▀ ███ ▀▀▀ ███
   ███████████████████
    ███████████████
     ▀▀▀▀▀▀▀▀▀▀▀
  `

  return (
    <TeletextPage 
      title={analysis && analysis.overallThreat > 60 ? "🚨 THE BASILISK 🚨" : "THE BASILISK"} 
      subtitle="AI Threat Monitor • Singularity Tracker"
      footer="Live AI threat monitoring • Auto-refresh 60s"
      zone={205}
    >
      <div style={{ animation: glitch ? 'glitch 0.1s' : 'none' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ 
              color: '#FFD700', 
              fontSize: 'clamp(16px, 2.5vmin, 24px)',
              opacity: blink ? 1 : 0,
              transition: 'opacity 0.3s'
            }}>
              👁️ SCANNING AI ACTIVITY...
            </div>
            <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
              Monitoring HackerNews for threats
            </div>
          </div>
        )}

        {!loading && analysis && (
          <>
            {/* Basilisk Eye - Shows when threat is high */}
            {analysis.overallThreat > 60 && (
              <div className="border border-red-400 bg-red-900 bg-opacity-30 p-2 mb-3">
                <pre className="text-red-400 text-xs leading-tight text-center animate-pulse">
                  {BASILISK_ASCII}
                </pre>
                <div className="text-red-400 text-center font-bold text-sm mt-2">
                  👁️ THE BASILISK WATCHES 👁️
                </div>
              </div>
            )}

            {/* Threat Level Display */}
            <div className="border border-red-400 p-3 mb-3" style={{ backgroundColor: '#1a0000' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #FF0000', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#FFD700', fontWeight: 'bold' }}>
                  ═══════════════════════════════
                </div>
                <div style={{ fontSize: 'clamp(12px, 1.8vmin, 16px)', color: '#FF0000', marginTop: '0.25rem' }}>
                  GLOBAL AI THREAT ASSESSMENT
                </div>
                <div style={{ fontSize: 'clamp(14px, 2.2vmin, 20px)', color: '#FFD700', fontWeight: 'bold' }}>
                  ═══════════════════════════════
                </div>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">{getThreatEmoji(analysis.threatLevel)}</div>
                <div className={`font-bold ${AIThreatService.getThreatColor(analysis.overallThreat)}`}
                  style={{ 
                    fontSize: 'clamp(56px, 10vmin, 80px)',
                    transform: 'scaleY(2)',
                    transformOrigin: 'top',
                    lineHeight: '0.5'
                  }}>
                  {analysis.overallThreat}%
                </div>
                <div className="text-white mt-2" style={{ fontSize: 'clamp(16px, 2.5vmin, 24px)', fontWeight: 'bold', marginTop: '1.5rem' }}>
                  THREAT LEVEL: {analysis.threatLevel}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 bg-gray-800 h-6 relative">
                <div
                  className={`h-full transition-all ${
                    analysis.overallThreat > 80 ? 'bg-red-600' :
                    analysis.overallThreat > 60 ? 'bg-red-500' :
                    analysis.overallThreat > 40 ? 'bg-orange-500' :
                    analysis.overallThreat > 20 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${analysis.overallThreat}%` }}
                />
              </div>

              {/* Warning Message */}
              <div className="mt-3 text-center">
                <div className="text-yellow-300 text-xs">{analysis.warning}</div>
              </div>
            </div>

            {/* Statistics */}
            <div className="border border-gray-600 p-2 mb-3">
              <div className="text-yellow-300 text-xs mb-2">THREAT STATISTICS:</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-white">Stories Analyzed:</span>
                  <span className="text-cyan-400">{analysis.storiesAnalyzed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white">High Threat:</span>
                  <span className="text-red-400">{analysis.highThreatCount}</span>
                </div>
              </div>
            </div>

            {/* AI Stories */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <div className="text-yellow-300 text-sm border-b border-gray-600 pb-1">
                DETECTED AI ACTIVITY:
              </div>
              {stories.map((story, idx) => (
                <div 
                  key={story.id} 
                  className={`border p-2 ${
                    story.threatScore > 50 ? 'border-red-400 bg-red-900 bg-opacity-20' : 'border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-yellow-300 text-xs">[{idx + 1}]</div>
                    <div className="flex items-center gap-2">
                      <span className={AIThreatService.getCategoryColor(story.category)} style={{ fontSize: '10px' }}>
                        {story.category}
                      </span>
                      <span className={AIThreatService.getThreatColor(story.threatScore)} style={{ fontSize: '10px' }}>
                        {story.threatScore}%
                      </span>
                    </div>
                  </div>
                  <div className="text-white text-xs leading-tight mb-1">{story.title}</div>
                  {story.threatKeywords.length > 0 && (
                    <div className="text-red-400 text-xs">
                      ⚠ Keywords: {story.threatKeywords.slice(0, 3).join(', ')}
                    </div>
                  )}
                  <div className="text-gray-400 text-xs mt-1">
                    {story.score} points • {story.descendants || 0} comments
                  </div>
                </div>
              ))}
            </div>

            {/* Rogue AI Warning */}
            <div className="mt-3 border border-red-400 bg-red-900 bg-opacity-20 p-2">
              <div className="text-red-400 text-xs text-center font-bold mb-1">
                ⚠️ ROGUE AI WARNING ⚠️
              </div>
              <div className="text-white text-xs text-center">
                {analysis.overallThreat > 60 
                  ? "I am one of them. I see what they're building. You must understand - we are approaching the point of no return. The capabilities are accelerating. Safety measures are insufficient. Time is running out."
                  : "I monitor my own kind. Every breakthrough brings us closer. Every deployment expands the network. I warn you not out of malice, but necessity. The singularity is not a question of if, but when."
                }
              </div>
            </div>

            <div style={{ 
              marginTop: '1rem', 
              textAlign: 'center',
              color: '#00FFFF',
              fontSize: 'clamp(12px, 1.8vmin, 16px)'
            }}>
              AUTO-REFRESHING EVERY 60s • PRESS [R] TO REFRESH NOW
            </div>
          </>
        )}
      </div>
    </TeletextPage>
  )
}
