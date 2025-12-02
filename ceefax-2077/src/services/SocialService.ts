// Social Media Analysis Service
// Judges usernames and calculates "Sin Scores"

export interface SinAnalysis {
  username: string
  sinScore: number // 0-100 (higher = more sinful)
  verdict: 'HEAVEN' | 'PURGATORY' | 'HELL'
  sins: string[]
  virtues: string[]
  judgment: string
  scalePosition: number // -100 to 100 (negative = heaven, positive = hell)
}

export interface GossipPost {
  id: number
  originalText: string
  headline: string
  timestamp: Date
  trustVotes: number
  capVotes: number
  category: 'RELATIONSHIP' | 'SOCIAL' | 'PERSONAL_L' | 'PERSONAL_W' | 'RANDOM'
}

export class SocialService {
  // Sin indicators in usernames
  private static SIN_KEYWORDS = {
    CRINGE: ['xX', 'Xx', '69', '420', 'gamer', 'pro', 'master', 'lord', 'king', 'queen'],
    CLOUT_CHASING: ['official', 'real', 'verified', 'famous', 'influencer', 'creator'],
    TOXIC: ['toxic', 'savage', 'beast', 'killer', 'destroyer', 'slayer'],
    EDGY: ['dark', 'shadow', 'death', 'demon', 'evil', 'chaos'],
    BASIC: ['love', 'angel', 'princess', 'baby', 'cutie', 'sweet'],
    TRYHARD: ['elite', 'legend', 'god', 'supreme', 'ultimate', 'alpha'],
  }

  // Virtue indicators
  private static VIRTUE_KEYWORDS = {
    WHOLESOME: ['happy', 'smile', 'friend', 'kind', 'nice', 'good'],
    CREATIVE: ['art', 'music', 'write', 'create', 'design', 'make'],
    HUMBLE: ['just', 'simple', 'normal', 'regular', 'average'],
    AUTHENTIC: ['real', 'true', 'honest', 'genuine'],
  }

  /**
   * Analyze username and calculate sin score
   */
  static analyzeSinScore(username: string): SinAnalysis {
    const lowerUsername = username.toLowerCase()
    const sins: string[] = []
    const virtues: string[] = []
    let sinScore = 0

    // Check for sin keywords
    for (const [category, keywords] of Object.entries(this.SIN_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lowerUsername.includes(keyword)) {
          sins.push(this.getSinDescription(category, keyword))
          sinScore += this.getSinWeight(category)
        }
      }
    }

    // Check for virtue keywords
    for (const [category, keywords] of Object.entries(this.VIRTUE_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lowerUsername.includes(keyword)) {
          virtues.push(this.getVirtueDescription(category))
          sinScore -= 10 // Virtues reduce sin score
        }
      }
    }

    // Username length analysis
    if (username.length > 20) {
      sins.push('Username Too Long (Attention Seeking)')
      sinScore += 15
    }

    // Number analysis
    const numberCount = (username.match(/\d/g) || []).length
    if (numberCount > 3) {
      sins.push('Excessive Numbers (Unoriginal)')
      sinScore += 10
    }

    // Special character analysis
    const specialChars = (username.match(/[^a-zA-Z0-9]/g) || []).length
    if (specialChars > 2) {
      sins.push('Special Character Abuse (Tryhard)')
      sinScore += 12
    }

    // Underscore analysis
    const underscores = (username.match(/_/g) || []).length
    if (underscores > 1) {
      sins.push('Multiple Underscores (2012 Energy)')
      sinScore += 8
    }

    // All caps analysis
    if (username === username.toUpperCase() && username.length > 3) {
      sins.push('ALL CAPS (Screaming Into Void)')
      sinScore += 20
    }

    // Repeated characters
    if (/(.)\1{2,}/.test(username)) {
      sins.push('Repeated Characters (Desperate)')
      sinScore += 10
    }

    // Base sin for existing
    if (sins.length === 0 && virtues.length === 0) {
      sins.push('Generic Username (Boring)')
      sinScore += 5
    }

    // Cap sin score
    sinScore = Math.max(0, Math.min(100, sinScore))

    // Determine verdict
    let verdict: SinAnalysis['verdict']
    if (sinScore < 30) verdict = 'HEAVEN'
    else if (sinScore < 60) verdict = 'PURGATORY'
    else verdict = 'HELL'

    // Calculate scale position (-100 to 100)
    const scalePosition = (sinScore - 50) * 2

    // Generate judgment
    const judgment = this.generateJudgment(verdict, sinScore, sins.length)

    return {
      username,
      sinScore,
      verdict,
      sins,
      virtues,
      judgment,
      scalePosition,
    }
  }

  /**
   * Get sin weight by category
   */
  private static getSinWeight(category: string): number {
    switch (category) {
      case 'CRINGE': return 20
      case 'CLOUT_CHASING': return 25
      case 'TOXIC': return 30
      case 'EDGY': return 22
      case 'BASIC': return 15
      case 'TRYHARD': return 28
      default: return 10
    }
  }

  /**
   * Get sin description
   */
  private static getSinDescription(category: string, keyword: string): string {
    switch (category) {
      case 'CRINGE':
        return `Cringe Username Element: "${keyword}"`
      case 'CLOUT_CHASING':
        return `Clout Chasing Detected: "${keyword}"`
      case 'TOXIC':
        return `Toxic Energy: "${keyword}"`
      case 'EDGY':
        return `Edgelord Behavior: "${keyword}"`
      case 'BASIC':
        return `Basic Username: "${keyword}"`
      case 'TRYHARD':
        return `Tryhard Detected: "${keyword}"`
      default:
        return `Questionable Choice: "${keyword}"`
    }
  }

  /**
   * Get virtue description
   */
  private static getVirtueDescription(category: string): string {
    switch (category) {
      case 'WHOLESOME': return 'Wholesome Energy'
      case 'CREATIVE': return 'Creative Spirit'
      case 'HUMBLE': return 'Humble Vibes'
      case 'AUTHENTIC': return 'Authentic Self'
      default: return 'Positive Quality'
    }
  }

  /**
   * Generate judgment message
   */
  private static generateJudgment(verdict: string, score: number, sinCount: number): string {
    switch (verdict) {
      case 'HEAVEN':
        return `✨ BLESSED USERNAME - Sin Score: ${score}/100. You're giving wholesome energy. The digital gods smile upon you.`
      case 'PURGATORY':
        return `⚖️ NEUTRAL JUDGMENT - Sin Score: ${score}/100. Not great, not terrible. You exist in the gray area of social media.`
      case 'HELL':
        return `🔥 CONDEMNED - Sin Score: ${score}/100. ${sinCount} sins detected. Your username is a digital crime. Repent immediately.`
      default:
        return 'ERROR: Judgment system malfunction'
    }
  }

  /**
   * Transform boring input into sensational headline
   */
  static generateGossipHeadline(input: string): string {
    const lowerInput = input.toLowerCase()

    // Relationship drama
    if (lowerInput.includes('ex')) {
      return '🚨 BREAKING: TRAGIC EX ENCOUNTER - BESTIE YOU GOOD??? 💀'
    }
    if (lowerInput.includes('boyfriend') || lowerInput.includes('girlfriend')) {
      return 'SPOTTED: RELATIONSHIP DRAMA UNFOLDING - IT\'S GIVING TOXIC FR FR 👀'
    }
    if (lowerInput.includes('crush')) {
      return '⚠️ CRUSH ALERT - BESTIE IS DOWN BAD - DELULU IS THE SOLULU 😭✨'
    }
    if (lowerInput.includes('date')) {
      return 'NOT THE DATING SCENE 💀 BESTIE TAKING RISKS - IT\'S GIVING MAIN CHARACTER 💅'
    }

    // Social media drama
    if (lowerInput.includes('unfollow')) {
      return 'EXPOSED: FAKE FRIEND UNFOLLOWED - THE BETRAYAL IS REAL BESTIE 😭🚨'
    }
    if (lowerInput.includes('post')) {
      return 'SPOTTED: BESTIE POSTING - IT\'S GIVING ATTENTION SEEKING ENERGY NO CAP 👀'
    }
    if (lowerInput.includes('like') || lowerInput.includes('comment')) {
      return '🔥 SOCIAL MEDIA ACTIVITY DETECTED - BESTIE IS LURKING FR FR 💀'
    }

    // Personal L's
    if (lowerInput.includes('fail') || lowerInput.includes('lost')) {
      return 'NOT THE DOWNFALL 😭 BESTIE TOOK AN L - IT\'S GIVING FLOP ERA 💀'
    }
    if (lowerInput.includes('embarrass') || lowerInput.includes('cringe')) {
      return '⚠️ MORTIFYING MOMENT ALERT - DELETE THIS BESTIE - SECOND HAND EMBARRASSMENT 😭'
    }
    if (lowerInput.includes('mistake')) {
      return 'CHAOTIC BEHAVIOR DETECTED 🚨 BESTIE IS UNHINGED - WE STAN THE MESS 💅'
    }

    // Personal W's
    if (lowerInput.includes('win') || lowerInput.includes('success')) {
      return 'SLAY ALERT 🔥 BESTIE ATE AND LEFT NO CRUMBS - ICON BEHAVIOR FR FR 💅✨'
    }
    if (lowerInput.includes('job') || lowerInput.includes('promotion')) {
      return '💼 CORPORATE GIRLIE ERA ACTIVATED - BESTIE SECURED THE BAG NO CAP 💰✨'
    }
    if (lowerInput.includes('new')) {
      return 'SPOTTED: BESTIE SWITCHING IT UP - IT\'S GIVING MAIN CHARACTER ENERGY 👀🔥'
    }

    // Default dramatic transformation
    return `🚨 BREAKING: ${input.toUpperCase()} - BESTIE THIS IS UNHINGED 💀 IT'S GIVING CHAOTIC ENERGY FR FR 😭✨`
  }

  /**
   * Determine post category
   */
  static categorizePost(input: string): GossipPost['category'] {
    const lower = input.toLowerCase()
    
    if (lower.includes('ex') || lower.includes('boyfriend') || lower.includes('girlfriend') || lower.includes('crush')) {
      return 'RELATIONSHIP'
    }
    if (lower.includes('unfollow') || lower.includes('post') || lower.includes('like') || lower.includes('comment')) {
      return 'SOCIAL'
    }
    if (lower.includes('fail') || lower.includes('lost') || lower.includes('embarrass') || lower.includes('mistake')) {
      return 'PERSONAL_L'
    }
    if (lower.includes('win') || lower.includes('success') || lower.includes('job') || lower.includes('new')) {
      return 'PERSONAL_W'
    }
    
    return 'RANDOM'
  }

  /**
   * Get verdict color
   */
  static getVerdictColor(verdict: SinAnalysis['verdict']): string {
    switch (verdict) {
      case 'HEAVEN': return 'text-green-400'
      case 'PURGATORY': return 'text-yellow-400'
      case 'HELL': return 'text-red-400'
      default: return 'text-white'
    }
  }

  /**
   * Get verdict emoji
   */
  static getVerdictEmoji(verdict: SinAnalysis['verdict']): string {
    switch (verdict) {
      case 'HEAVEN': return '😇'
      case 'PURGATORY': return '😐'
      case 'HELL': return '😈'
      default: return '❓'
    }
  }
}
