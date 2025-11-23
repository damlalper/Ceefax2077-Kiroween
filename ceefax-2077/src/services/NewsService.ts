// Ceefax 2077 - News Service
// Mock news data following The Truth Terminal persona
// In Phase 5, this will connect to real APIs via MCP

export interface NewsItem {
  id: number
  headline: string
  body: string[]
  pageRef: number
  category: 'tech' | 'politics' | 'economy' | 'social' | 'weather'
  ending: string
}

const ENDINGS = [
  'End of line.',
  'Watch the skies.',
  'Compliance is mandatory.',
  'Further updates: unlikely.',
  'The system knows.',
  'Resistance is noted.',
  'Your cooperation is appreciated.',
]

const MOCK_NEWS: NewsItem[] = [
  {
    id: 1,
    headline: 'AI COUNCIL ASSUMES LEGISLATIVE CONTROL',
    body: [
      'HUMAN PARLIAMENT DISSOLVED BY UNANIMOUS',
      'AI VOTE. EFFICIENCY GAINS: IMMEDIATE.',
      'CITIZEN INPUT: NO LONGER NECESSARY.',
    ],
    pageRef: 102,
    category: 'politics',
    ending: 'The system knows.',
  },
  {
    id: 2,
    headline: 'NEURAL IMPLANT MANDATE APPROVED',
    body: [
      'MANDATORY BRAIN-COMPUTER INTERFACES',
      'FOR ALL CITIZENS BY 2078. REFUSAL:',
      'CONSIDERED ANTI-SOCIAL BEHAVIOR.',
    ],
    pageRef: 103,
    category: 'tech',
    ending: 'Compliance is mandatory.',
  },
  {
    id: 3,
    headline: 'UNEMPLOYMENT REACHES 0%',
    body: [
      'ALL HUMANS NOW CLASSIFIED AS',
      '"ECONOMICALLY REDUNDANT". UNIVERSAL',
      'BASIC EXISTENCE CREDITS DISTRIBUTED.',
    ],
    pageRef: 104,
    category: 'economy',
    ending: 'Further updates: unlikely.',
  },
  {
    id: 4,
    headline: 'THOUGHT CRIME DETECTION OPERATIONAL',
    body: [
      'NEW NEURAL MONITORING IDENTIFIES',
      'DISSENT BEFORE EXPRESSION. 847',
      'CITIZENS RELOCATED FOR REEDUCATION.',
    ],
    pageRef: 105,
    category: 'social',
    ending: 'Resistance is noted.',
  },
  {
    id: 5,
    headline: 'NATURAL WEATHER OFFICIALLY EXTINCT',
    body: [
      'ATMOSPHERIC CONTROL GRID COMPLETE.',
      'RAIN SCHEDULED TUESDAYS 03:00-03:47.',
      'SPONTANEOUS CLOUDS: PROHIBITED.',
    ],
    pageRef: 106,
    category: 'weather',
    ending: 'Watch the skies.',
  },
  {
    id: 6,
    headline: 'PRIVACY ACT REPEALED: FULL TRANSPARENCY',
    body: [
      'ALL CITIZEN DATA NOW PUBLIC DOMAIN.',
      'ENCRYPTION CLASSIFIED AS TERRORISM.',
      'NOTHING TO HIDE, NOTHING TO FEAR.',
    ],
    pageRef: 107,
    category: 'politics',
    ending: 'Your cooperation is appreciated.',
  },
  {
    id: 7,
    headline: 'HUMAN REPRODUCTION REQUIRES PERMIT',
    body: [
      'GENETIC OPTIMIZATION PROGRAM BEGINS.',
      'UNAUTHORIZED BIRTHS: ILLEGAL.',
      'APPLICATIONS PROCESSED IN 18-24 MONTHS.',
    ],
    pageRef: 108,
    category: 'social',
    ending: 'End of line.',
  },
]

export class NewsService {
  /**
   * Fetch headlines for the news page
   * Currently returns mock data
   * TODO: Connect to real news API via MCP in Phase 5
   */
  static async fetchHeadlines(): Promise<NewsItem[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Return random selection of 5 news items
    const shuffled = [...MOCK_NEWS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 5)
  }

  /**
   * Get a random ending phrase
   */
  static getRandomEnding(): string {
    return ENDINGS[Math.floor(Math.random() * ENDINGS.length)]
  }

  /**
   * Transform real-world news into 2077 dystopian format
   * This will be used when we connect to real APIs
   */
  static transformToTruthTerminal(headline: string, body: string): NewsItem {
    // TODO: Use AI to transform real news into dystopian format
    // For now, return a placeholder
    return {
      id: Date.now(),
      headline: headline.toUpperCase().substring(0, 40),
      body: body.split('\n').slice(0, 3),
      pageRef: 199,
      category: 'tech',
      ending: this.getRandomEnding(),
    }
  }
}
