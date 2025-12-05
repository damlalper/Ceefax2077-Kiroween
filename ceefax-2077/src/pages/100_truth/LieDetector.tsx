import { useState } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { AIAnalysisService, type BiasAnalysis } from '../../services/AIAnalysisService'

export default function LieDetector() {
  const [inputText, setInputText] = useState('')
  const [analysis, setAnalysis] = useState<BiasAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [blink, setBlink] = useState(true)
  const [scanProgress, setScanProgress] = useState(0)
  const [highlightedText, setHighlightedText] = useState('')

  const analyzeText = async () => {
    if (!inputText.trim()) return

    setLoading(true)
    setAnalysis(null)
    setScanProgress(0)
    setHighlightedText('')

    // Start blink animation
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 400)

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 100)

    try {
      const result = await AIAnalysisService.analyzeText(inputText)
      
      // Wait for progress to complete
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setAnalysis(result)
      
      // Highlight trigger words in red
      highlightTriggerWords(inputText, result)
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
      clearInterval(progressInterval)
      setScanProgress(100)
    }
  }

  const highlightTriggerWords = (text: string, analysis: BiasAnalysis) => {
    // Trigger words to highlight
    const triggerWords = [
      'shocking', 'outrageous', 'unbelievable', 'devastating', 'horrific', 
      'amazing', 'incredible', 'urgent', 'breaking', 'must', 'always', 
      'never', 'everyone', 'nobody', 'terrorist', 'radical', 'extremist'
    ]
    
    let highlighted = text
    triggerWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span style="color: #FF0000; font-weight: bold;">$&</span>`)
    })
    
    setHighlightedText(highlighted)
  }

  const getVerdictColor = (verdict: string) => {
    if (verdict === 'HIGHLY BIASED') return '#FF0000'
    if (verdict === 'SUSPICIOUS') return '#FFD700'
    return '#00FF00'
  }

  const getScoreColor = (score: number) => {
    if (score > 70) return '#FF0000'
    if (score > 40) return '#FFD700'
    return '#00FF00'
  }

  return (
    <TeletextPage 
      title="LIE DETECTOR" 
      subtitle="AI Manipulation Analysis"
      footer="🔍 AI-powered bias detection"
      zone={103}
    >

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ border: '2px solid #0066CC', padding: '0.5rem' }}>
          <label style={{ color: '#FFFF00', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Paste Text to Analyze:</label>
          <textarea
            style={{
              width: '100%',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #666666',
              padding: '0.5rem',
              marginTop: '0.25rem',
              fontFamily: 'monospace',
              fontSize: 'clamp(10px, 1.5vmin, 14px)'
            }}
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
          style={{
            width: '100%',
            padding: '0.5rem',
            fontWeight: 'bold',
            backgroundColor: loading || !inputText.trim() ? '#666666' : '#0066CC',
            color: loading || !inputText.trim() ? '#888888' : '#FFFFFF',
            border: 'none',
            cursor: loading || !inputText.trim() ? 'not-allowed' : 'pointer',
            fontSize: 'clamp(12px, 2vmin, 16px)'
          }}
        >
          {loading ? 'ANALYZING...' : 'ANALYZE TEXT'}
        </button>

        {loading && (
          <div style={{ border: '2px solid #FFD700', padding: '1rem' }}>
            <div style={{ 
              color: '#FFD700', 
              fontSize: 'clamp(16px, 2.5vmin, 24px)',
              opacity: blink ? 1 : 0,
              transition: 'opacity 0.3s',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              🔍 SCANNING...
            </div>
            
            {/* Progress Bar */}
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                color: '#FFD700',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                marginBottom: '0.25rem'
              }}>
                <span>ANALYSIS PROGRESS:</span>
                <span>{scanProgress}%</span>
              </div>
              <div style={{ 
                backgroundColor: '#333333', 
                height: '20px', 
                position: 'relative',
                border: '1px solid #FFD700'
              }}>
                <div
                  style={{
                    height: '100%',
                    width: `${scanProgress}%`,
                    backgroundColor: '#FFD700',
                    transition: 'width 0.1s linear',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {scanProgress > 20 && (
                    <div style={{ 
                      color: '#000000', 
                      fontSize: 'clamp(8px, 1.2vmin, 12px)',
                      fontWeight: 'bold'
                    }}>
                      {'█'.repeat(Math.floor(scanProgress / 10))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div style={{ 
              color: '#888888', 
              fontSize: 'clamp(10px, 1.5vmin, 14px)',
              textAlign: 'center'
            }}>
              {scanProgress < 30 && 'Detecting emotional language...'}
              {scanProgress >= 30 && scanProgress < 60 && 'Analyzing bias patterns...'}
              {scanProgress >= 60 && scanProgress < 90 && 'Checking factual claims...'}
              {scanProgress >= 90 && 'Finalizing verdict...'}
            </div>
          </div>
        )}

        {analysis && !loading && (
          <div style={{ border: '2px solid #FF0000', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'clamp(20px, 3vmin, 32px)', 
                fontWeight: 'bold',
                color: getVerdictColor(analysis.verdict)
              }}>
                {analysis.verdict === 'HIGHLY BIASED' ? '⚠' : analysis.verdict === 'SUSPICIOUS' ? '⚡' : '✓'} {analysis.verdict}
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Confidence: {analysis.confidence}%</div>
            </div>

            <div style={{ borderTop: '2px solid #666666', paddingTop: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>Manipulation Score:</div>
              <div style={{ backgroundColor: '#333333', height: '16px', position: 'relative' }}>
                <div
                  style={{
                    height: '100%',
                    transition: 'width 0.3s',
                    backgroundColor: getScoreColor(analysis.manipulationScore),
                    width: `${analysis.manipulationScore}%`
                  }}
                />
              </div>
              <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'right', marginTop: '0.25rem' }}>
                {analysis.manipulationScore}/100
              </div>
            </div>

            <div style={{ borderTop: '2px solid #666666', paddingTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
                <div>
                  <span style={{ color: '#FFD700' }}>Emotional Language:</span>
                  <span style={{ color: '#FFFFFF', marginLeft: '0.5rem' }}>{analysis.emotionalLanguage}%</span>
                </div>
                <div>
                  <span style={{ color: '#FFD700' }}>Factual Claims:</span>
                  <span style={{ color: '#FFFFFF', marginLeft: '0.5rem' }}>{analysis.factualClaims}%</span>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '2px solid #666666', paddingTop: '0.5rem' }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>🚩 Detected Issues:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {analysis.biasDetected.map((issue, idx) => (
                  <div key={idx} style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>• {issue}</div>
                ))}
              </div>
            </div>

            {analysis.manipulationScore > 70 && (
              <div style={{ borderTop: '2px solid #666666', paddingTop: '0.5rem' }}>
                <div style={{ color: '#FF0000', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', fontWeight: 'bold' }}>
                  ⚠ HIGH RISK - Verify sources independently
                </div>
              </div>
            )}
            
            {/* Highlighted Text with Trigger Words */}
            {highlightedText && (
              <div style={{ borderTop: '2px solid #666666', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
                  📝 TEXT ANALYSIS (Trigger words in RED):
                </div>
                <div 
                  style={{ 
                    color: '#CCCCCC', 
                    fontSize: 'clamp(10px, 1.5vmin, 14px)',
                    lineHeight: '1.5',
                    padding: '0.5rem',
                    backgroundColor: '#000000',
                    border: '1px solid #333333',
                    maxHeight: '150px',
                    overflow: 'auto'
                  }}
                  dangerouslySetInnerHTML={{ __html: highlightedText }}
                />
              </div>
            )}
          </div>
        )}

        {!loading && !analysis && (
          <div style={{ border: '2px solid #666666', padding: '1rem', textAlign: 'center' }}>
            <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              💡 TIP: Paste news headlines, social media posts, or articles to detect bias and manipulation tactics
            </div>
          </div>
        )}
      </div>
    </TeletextPage>
  )
}
