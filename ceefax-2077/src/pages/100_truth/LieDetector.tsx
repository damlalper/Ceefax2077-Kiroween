import { useState } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { AIAnalysisService, type BiasAnalysis } from '../../services/AIAnalysisService'

export default function LieDetector() {
  const [inputText, setInputText] = useState('')
  const [analysis, setAnalysis] = useState<BiasAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [blink, setBlink] = useState(true)

  const analyzeText = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setAnalysis(null)

    // Start blink animation
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 400)

    try {
      const result = await AIAnalysisService.analyzeText(inputText)
      setAnalysis(result)
    } catch (error) {
      console.error('Analysis failed:', error)
      // Show error state
      setAnalysis({
        manipulationScore: 0,
        biasDetected: ['Analysis failed - please try again'],
        verdict: 'CLEAN',
        confidence: 0,
        emotionalLanguage: 0,
        factualClaims: 0,
      })
    } finally {
      setLoading(false)
      clearInterval(blinkInterval)
    }
  }

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'HIGHLY BIASED') return 'text-red-400'
    if (verdict === 'SUSPICIOUS') return 'text-yellow-400'
    return 'text-green-400'
  }

  const getScoreColor = (score: number) => {
    if (score > 70) return 'bg-red-500'
    if (score > 40) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-blue-400 text-xl">LIE DETECTOR</h1>
          <p className="text-cyan-300 text-sm">AI Manipulation Analysis</p>
        </div>

        <div className="space-y-3">
          <div className="border border-blue-400 p-2">
            <label className="text-yellow-300 text-sm">Paste Text to Analyze:</label>
            <textarea
              className="w-full bg-black text-white border border-gray-600 p-2 mt-1 font-mono text-xs"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter news article, social media post, or any text..."
              disabled={loading}
            />
          </div>

          <button
            onClick={analyzeText}
            disabled={loading || !inputText.trim()}
            className={`w-full py-2 font-bold ${
              loading || !inputText.trim()
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'ANALYZING...' : 'ANALYZE TEXT'}
          </button>

          {loading && (
            <div className="border border-yellow-400 p-3 text-center">
              <div className={`text-yellow-300 text-lg ${blink ? 'opacity-100' : 'opacity-0'}`}>
                🔍 AI PROCESSING...
              </div>
              <div className="text-gray-400 text-xs mt-2">
                Analyzing for bias and manipulation
              </div>
            </div>
          )}

          {analysis && !loading && (
            <div className="border border-red-400 p-3 space-y-2">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getVerdictColor(analysis.verdict)}`}>
                  {analysis.verdict === 'HIGHLY BIASED' ? '⚠' : analysis.verdict === 'SUSPICIOUS' ? '⚡' : '✓'} {analysis.verdict}
                </div>
                <div className="text-white text-sm">Confidence: {analysis.confidence}%</div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <div className="text-yellow-300 text-xs mb-1">Manipulation Score:</div>
                <div className="bg-gray-800 h-4 relative">
                  <div
                    className={`h-full transition-all ${getScoreColor(analysis.manipulationScore)}`}
                    style={{ width: `${analysis.manipulationScore}%` }}
                  />
                </div>
                <div className="text-white text-xs text-right mt-1">
                  {analysis.manipulationScore}/100
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <div>
                    <span className="text-yellow-300">Emotional Language:</span>
                    <span className="text-white ml-2">{analysis.emotionalLanguage}%</span>
                  </div>
                  <div>
                    <span className="text-yellow-300">Factual Claims:</span>
                    <span className="text-white ml-2">{analysis.factualClaims}%</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-600 pt-2">
                <div className="text-yellow-300 text-xs mb-1">🚩 Detected Issues:</div>
                <div className="space-y-1">
                  {analysis.biasDetected.map((issue, idx) => (
                    <div key={idx} className="text-white text-xs">• {issue}</div>
                  ))}
                </div>
              </div>

              {analysis.manipulationScore > 70 && (
                <div className="border-t border-gray-600 pt-2">
                  <div className="text-red-400 text-xs text-center font-bold">
                    ⚠ HIGH RISK - Verify sources independently
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !analysis && (
            <div className="border border-gray-600 p-3 text-center">
              <div className="text-gray-400 text-xs">
                💡 TIP: Paste news headlines, social media posts, or articles to detect bias and manipulation tactics
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 text-center">
          <p className="text-gray-400 text-xs">
            {import.meta.env.VITE_LLM_API_KEY ? '🤖 AI-powered analysis' : '🔧 Heuristic analysis (configure LLM for enhanced detection)'}
          </p>
        </div>
      </div>
    </TeletextGrid>
  )
}
