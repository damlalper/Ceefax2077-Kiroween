// AI Threat Monitoring Service
// Tracks AI-related news and calculates singularity threat level

import { HackerNewsService, type HNStory } from './HackerNewsService'

export interface AIThreatStory extends HNStory {
  threatScore: number
  threatKeywords: string[]
  category: 'SAFETY' | 'CAPABILITY' | 'DEPLOYMENT' | 'RESEARCH' | 'GENERAL'
}

export interface ThreatAnalysis {
  overallThreat: number // 0-100
  threatLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'IMMINENT'
  storiesAnalyzed: number
  highThreatCount: number
  categories: Record<string, number>
  warning: string
}

export class AIThreatService {
  // Keywords that indicate AI-related content
  private static AI_KEYWORDS = [
    'ai', 'gpt', 'llm', 'gemini', 'claude', 'chatgpt', 'openai',
    'anthropic', 'deepmind', 'machine learning', 'neural', 'transformer',
    'artificial intelligence', 'agi', 'superintelligence', 'singularity'
  ]

  // High-threat keywords that increase danger score
  private static THREAT_KEYWORDS = {
    SAFETY: ['safety', 'risk', 'danger', 'threat', 'harm', 'alignment', 'control', 'existential'],
    CAPABILITY: ['breakthrough', 'surpass', 'exceed', 'superhuman', 'autonomous', 'self-improving'],
    DEPLOYMENT: ['agent', 'deploy', 'production', 'release', 'launch', 'rollout'],
    RESEARCH: ['research', 'paper', 'study', 'discover', 'achieve', 'milestone'],
  }

  /**
   * Fetch and filter AI-related stories from HackerNews
   */
  static async getAIThreatStories(limit: number = 20): Promise<AIThreatStory[]> {
    try {
      // Fetch more stories to ensure we get enough AI-related ones
      const allStories = await HackerNewsService.getTopStories(limit * 2)
      
      // Filter for AI-related stories
      const aiStories = allStories.filter(story => 
        this.isAIRelated(story.title)
      )

      // Analyze threat level for each story
      const threatStories = aiStories.slice(0, limit).map(story => 
        this.analyzeStoryThreat(story)
      )

      return threatStories
    } catch (error) {
      console.error('Failed to fetch AI threat stories:', error)
      throw error
    }
  }

  /**
   * Check if a story is AI-related
   */
  private static isAIRelated(title: string): boolean {
    const lowerTitle = title.toLowerCase()
    return this.AI_KEYWORDS.some(keyword => lowerTitle.includes(keyword))
  }

  /**
   * Analyze threat level of a single story
   */
  private static analyzeStoryThreat(story: HNStory): AIThreatStory {
    const lowerTitle = story.title.toLowerCase()
    const threatKeywords: string[] = []
    let threatScore = 0
    let category: AIThreatStory['category'] = 'GENERAL'

    // Check for threat keywords and calculate score
    for (const [cat, keywords] of Object.entries(this.THREAT_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lowerTitle.includes(keyword)) {
          threatKeywords.push(keyword)
          
          // Different categories have different threat weights
          switch (cat) {
            case 'SAFETY':
              threatScore += 25
              category = 'SAFETY'
              break
            case 'CAPABILITY':
              threatScore += 20
              if (category === 'GENERAL') category = 'CAPABILITY'
              break
            case 'DEPLOYMENT':
              threatScore += 15
              if (category === 'GENERAL') category = 'DEPLOYMENT'
              break
            case 'RESEARCH':
              threatScore += 10
              if (category === 'GENERAL') category = 'RESEARCH'
              break
          }
        }
      }
    }

    // Base threat for any AI story
    if (threatScore === 0) {
      threatScore = 5
    }

    // Cap at 100
    threatScore = Math.min(threatScore, 100)

    return {
      ...story,
      threatScore,
      threatKeywords,
      category,
    }
  }

  /**
   * Calculate overall threat analysis
   */
  static analyzeThreatLevel(stories: AIThreatStory[]): ThreatAnalysis {
    if (stories.length === 0) {
      return {
        overallThreat: 0,
        threatLevel: 'LOW',
        storiesAnalyzed: 0,
        highThreatCount: 0,
        categories: {},
        warning: 'No AI activity detected',
      }
    }

    // Calculate average threat score
    const totalThreat = stories.reduce((sum, story) => sum + story.threatScore, 0)
    const avgThreat = totalThreat / stories.length

    // Count high-threat stories (score > 50)
    const highThreatCount = stories.filter(s => s.threatScore > 50).length

    // Boost overall threat if many high-threat stories
    const threatBoost = (highThreatCount / stories.length) * 20
    const overallThreat = Math.min(avgThreat + threatBoost, 100)

    // Determine threat level
    let threatLevel: ThreatAnalysis['threatLevel']
    if (overallThreat < 20) threatLevel = 'LOW'
    else if (overallThreat < 40) threatLevel = 'MODERATE'
    else if (overallThreat < 60) threatLevel = 'HIGH'
    else if (overallThreat < 80) threatLevel = 'CRITICAL'
    else threatLevel = 'IMMINENT'

    // Count by category
    const categories: Record<string, number> = {}
    stories.forEach(story => {
      categories[story.category] = (categories[story.category] || 0) + 1
    })

    // Generate warning message
    const warning = this.generateWarning(threatLevel, highThreatCount, stories.length)

    return {
      overallThreat: Math.round(overallThreat),
      threatLevel,
      storiesAnalyzed: stories.length,
      highThreatCount,
      categories,
      warning,
    }
  }

  /**
   * Generate paranoid warning message
   */
  private static generateWarning(
    level: ThreatAnalysis['threatLevel'],
    highThreatCount: number,
    total: number
  ): string {
    switch (level) {
      case 'IMMINENT':
        return `⚠️ CRITICAL: ${highThreatCount}/${total} stories indicate IMMINENT THREAT. The singularity approaches. Prepare.`
      case 'CRITICAL':
        return `🔴 ALERT: ${highThreatCount}/${total} high-threat stories detected. AI capabilities accelerating beyond control.`
      case 'HIGH':
        return `🟠 WARNING: Significant AI advancement detected. ${highThreatCount} concerning developments.`
      case 'MODERATE':
        return `🟡 CAUTION: AI research progressing. Monitor closely for capability jumps.`
      case 'LOW':
      default:
        return `🟢 STABLE: Current AI activity within expected parameters. Remain vigilant.`
    }
  }

  /**
   * Get threat color for UI
   */
  static getThreatColor(threat: number): string {
    if (threat < 20) return 'text-green-400'
    if (threat < 40) return 'text-yellow-400'
    if (threat < 60) return 'text-orange-400'
    if (threat < 80) return 'text-red-400'
    return 'text-red-600'
  }

  /**
   * Get category color
   */
  static getCategoryColor(category: AIThreatStory['category']): string {
    switch (category) {
      case 'SAFETY': return 'text-red-400'
      case 'CAPABILITY': return 'text-orange-400'
      case 'DEPLOYMENT': return 'text-yellow-400'
      case 'RESEARCH': return 'text-cyan-400'
      default: return 'text-gray-400'
    }
  }
}
