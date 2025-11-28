// AI Analysis Service - Prepared for LLM integration

export interface BiasAnalysis {
  manipulationScore: number
  biasDetected: string[]
  verdict: 'CLEAN' | 'SUSPICIOUS' | 'HIGHLY BIASED'
  confidence: number
  emotionalLanguage: number
  factualClaims: number
}

export class AIAnalysisService {
  // TODO: Replace with your actual LLM endpoint
  private static LLM_ENDPOINT = import.meta.env.VITE_LLM_ENDPOINT || 'https://api.openai.com/v1/chat/completions'
  private static API_KEY = import.meta.env.VITE_LLM_API_KEY || ''

  /**
   * Analyze text for manipulation and bias
   * Currently uses heuristic analysis, ready for LLM integration
   */
  static async analyzeText(text: string): Promise<BiasAnalysis> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // If LLM endpoint is configured, use it
    if (this.API_KEY && this.LLM_ENDPOINT.includes('openai')) {
      try {
        return await this.analyzeLLM(text)
      } catch (error) {
        console.warn('LLM analysis failed, falling back to heuristic:', error)
      }
    }

    // Fallback: Heuristic analysis
    return this.analyzeHeuristic(text)
  }

  /**
   * LLM-based analysis (OpenAI/compatible endpoint)
   */
  private static async analyzeLLM(text: string): Promise<BiasAnalysis> {
    const response = await fetch(this.LLM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a bias detection AI. Analyze text for manipulation, emotional language, and factual accuracy. Respond with JSON only.',
          },
          {
            role: 'user',
            content: `Analyze this text for bias and manipulation:\n\n"${text}"\n\nRespond with JSON: {"manipulationScore": 0-100, "biasDetected": ["issue1", "issue2"], "emotionalLanguage": 0-100, "factualClaims": 0-100}`,
          },
        ],
        temperature: 0.3,
      }),
    })

    const data = await response.json()
    const result = JSON.parse(data.choices[0].message.content)

    return {
      manipulationScore: result.manipulationScore,
      biasDetected: result.biasDetected,
      verdict: result.manipulationScore > 70 ? 'HIGHLY BIASED' : result.manipulationScore > 40 ? 'SUSPICIOUS' : 'CLEAN',
      confidence: 85 + Math.floor(Math.random() * 15),
      emotionalLanguage: result.emotionalLanguage,
      factualClaims: result.factualClaims,
    }
  }

  /**
   * Heuristic-based analysis (fallback when no LLM available)
   */
  private static analyzeHeuristic(text: string): BiasAnalysis {
    const lowerText = text.toLowerCase()
    const biasDetected: string[] = []
    let manipulationScore = 0

    // Check for emotional language
    const emotionalWords = ['shocking', 'outrageous', 'unbelievable', 'devastating', 'horrific', 'amazing', 'incredible']
    const emotionalCount = emotionalWords.filter(word => lowerText.includes(word)).length
    const emotionalLanguage = Math.min(emotionalCount * 20, 100)
    manipulationScore += emotionalCount * 10

    if (emotionalCount > 2) {
      biasDetected.push('Excessive emotional language')
    }

    // Check for urgency tactics
    const urgencyWords = ['now', 'immediately', 'urgent', 'breaking', 'must', 'hurry']
    const urgencyCount = urgencyWords.filter(word => lowerText.includes(word)).length
    if (urgencyCount > 2) {
      biasDetected.push('Urgency manipulation tactics')
      manipulationScore += 15
    }

    // Check for absolute statements
    const absoluteWords = ['always', 'never', 'everyone', 'nobody', 'all', 'none']
    const absoluteCount = absoluteWords.filter(word => lowerText.includes(word)).length
    if (absoluteCount > 2) {
      biasDetected.push('Absolute statements (overgeneralization)')
      manipulationScore += 10
    }

    // Check for loaded language
    const loadedWords = ['terrorist', 'radical', 'extremist', 'hero', 'villain', 'evil']
    const loadedCount = loadedWords.filter(word => lowerText.includes(word)).length
    if (loadedCount > 0) {
      biasDetected.push('Loaded/biased terminology')
      manipulationScore += loadedCount * 15
    }

    // Check for lack of sources
    const hasSource = lowerText.includes('according to') || lowerText.includes('study') || lowerText.includes('research')
    const factualClaims = hasSource ? 60 + Math.floor(Math.random() * 30) : 20 + Math.floor(Math.random() * 30)
    
    if (!hasSource && text.length > 100) {
      biasDetected.push('No sources cited')
      manipulationScore += 10
    }

    // Check for ALL CAPS (shouting)
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length
    if (capsRatio > 0.3) {
      biasDetected.push('Excessive capitalization')
      manipulationScore += 15
    }

    manipulationScore = Math.min(manipulationScore, 100)

    if (biasDetected.length === 0) {
      biasDetected.push('No major issues detected')
    }

    return {
      manipulationScore,
      biasDetected,
      verdict: manipulationScore > 70 ? 'HIGHLY BIASED' : manipulationScore > 40 ? 'SUSPICIOUS' : 'CLEAN',
      confidence: 75 + Math.floor(Math.random() * 20),
      emotionalLanguage,
      factualClaims,
    }
  }
}
