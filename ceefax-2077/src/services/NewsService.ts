// Ceefax 2077 - News Service
// Real news from RSS feeds transformed into dystopian format

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

// NewsAPI (free tier: 100 requests/day)
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || ''
const NEWS_API = 'https://newsapi.org/v2'

// RSS to JSON API (free, no key required) - Fallback
const RSS_API = 'https://api.rss2json.com/v1/api.json'

// Free RSS feeds - Fallback
const RSS_FEEDS = {
  tech: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
  world: 'https://feeds.bbci.co.uk/news/world/rss.xml',
  business: 'https://feeds.bbci.co.uk/news/business/rss.xml',
}

export class NewsService {
  /**
   * Fetch real headlines from NewsAPI or RSS feeds
   */
  static async fetchHeadlines(): Promise<NewsItem[]> {
    // Try NewsAPI first if key is available
    if (NEWS_API_KEY) {
      try {
        return await this.fetchFromNewsAPI()
      } catch (error) {
        console.warn('NewsAPI failed, falling back to RSS:', error)
      }
    }

    // Fallback to RSS feeds
    try {
      const feeds = await Promise.all([
        this.fetchRSSFeed(RSS_FEEDS.tech, 'tech'),
        this.fetchRSSFeed(RSS_FEEDS.world, 'politics'),
        this.fetchRSSFeed(RSS_FEEDS.business, 'economy'),
      ])

      const allNews = feeds.flat()
      const shuffled = allNews.sort(() => Math.random() - 0.5)
      
      return shuffled.slice(0, 5)
    } catch (error) {
      console.error('Failed to fetch news:', error)
      return this.getFallbackNews()
    }
  }

  /**
   * Fetch from NewsAPI (premium source)
   */
  private static async fetchFromNewsAPI(): Promise<NewsItem[]> {
    try {
      // Fetch from multiple categories
      const categories = ['technology', 'business', 'general']
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      
      const response = await fetch(
        `${NEWS_API}top-headlines?country=us&category=${randomCategory}&pageSize=10&apiKey=${NEWS_API_KEY}`
      )

      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`)
      }

      const data = await response.json()

      if (data.status !== 'ok' || !data.articles) {
        throw new Error('Invalid NewsAPI response')
      }

      // Transform articles to our format
      return data.articles.slice(0, 5).map((article: any, index: number) => {
        const category = this.mapCategory(randomCategory)
        return this.transformToTruthTerminal(
          article.title,
          article.description || article.content || article.title,
          category,
          index
        )
      })
    } catch (error) {
      console.error('NewsAPI fetch failed:', error)
      throw error
    }
  }

  /**
   * Map NewsAPI category to our categories
   */
  private static mapCategory(newsApiCategory: string): NewsItem['category'] {
    const mapping: Record<string, NewsItem['category']> = {
      technology: 'tech',
      business: 'economy',
      general: 'politics',
      science: 'tech',
      health: 'social',
    }
    return mapping[newsApiCategory] || 'tech'
  }

  /**
   * Fetch and parse RSS feed
   */
  private static async fetchRSSFeed(feedUrl: string, category: NewsItem['category']): Promise<NewsItem[]> {
    try {
      const response = await fetch(`${RSS_API}?rss_url=${encodeURIComponent(feedUrl)}&count=10`)
      
      if (!response.ok) {
        throw new Error(`RSS API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.status !== 'ok' || !data.items) {
        throw new Error('Invalid RSS response')
      }

      // Transform real news into dystopian format
      return data.items.slice(0, 5).map((item: any, index: number) => 
        this.transformToTruthTerminal(item.title, item.description || item.title, category, index)
      )
    } catch (error) {
      console.error(`Failed to fetch ${category} feed:`, error)
      return []
    }
  }

  /**
   * Fallback news when API fails
   */
  private static getFallbackNews(): NewsItem[] {
    return [
      {
        id: Date.now(),
        headline: 'NEWS FEED TEMPORARILY OFFLINE',
        body: [
          'SYSTEM MAINTENANCE IN PROGRESS.',
          'INFORMATION FLOW RESTRICTED.',
          'NORMAL SERVICE WILL RESUME.',
        ],
        pageRef: 100,
        category: 'tech',
        ending: 'The system knows.',
      },
    ]
  }

  /**
   * Get a random ending phrase
   */
  static getRandomEnding(): string {
    return ENDINGS[Math.floor(Math.random() * ENDINGS.length)]
  }

  /**
   * Transform real-world news into 2077 dystopian format
   */
  static transformToTruthTerminal(headline: string, body: string, category: NewsItem['category'], index: number): NewsItem {
    // Dystopian transformation patterns
    let transformed = headline.toUpperCase()
    
    // Replace positive words with dystopian equivalents
    const replacements: Record<string, string> = {
      'RELEASE': 'DEPLOY',
      'LAUNCH': 'MANDATE',
      'ANNOUNCE': 'DECREE',
      'UPDATE': 'COMPLIANCE UPDATE',
      'FEATURE': 'CONTROL MECHANISM',
      'IMPROVE': 'OPTIMIZE',
      'HELP': 'MONITOR',
      'ASSIST': 'SURVEIL',
      'PHONE': 'TRACKING DEVICE',
      'APP': 'SURVEILLANCE TOOL',
      'PRIVACY': 'TRANSPARENCY REQUIREMENT',
      'SECURITY': 'CONTROL SYSTEM',
      'ELECTION': 'SELECTION PROCESS',
      'VOTE': 'COMPLIANCE CHECK',
      'FREEDOM': 'REGULATED LIBERTY',
      'CHOICE': 'APPROVED OPTION',
    }

    Object.entries(replacements).forEach(([from, to]) => {
      const regex = new RegExp(from, 'gi')
      transformed = transformed.replace(regex, to)
    })

    // Truncate to 40 chars
    if (transformed.length > 40) {
      transformed = transformed.substring(0, 37) + '...'
    }

    // Clean HTML from body
    const cleanBody = body.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ')
    
    // Split into 3 lines of 40 chars each
    const words = cleanBody.split(' ')
    const lines: string[] = []
    let currentLine = ''
    
    for (const word of words) {
      if ((currentLine + ' ' + word).length <= 40) {
        currentLine += (currentLine ? ' ' : '') + word
      } else {
        if (currentLine) lines.push(currentLine.toUpperCase())
        currentLine = word
        if (lines.length >= 3) break
      }
    }
    if (currentLine && lines.length < 3) {
      lines.push(currentLine.toUpperCase())
    }

    // Pad to 3 lines
    while (lines.length < 3) {
      lines.push('FURTHER DETAILS: CLASSIFIED.')
    }

    return {
      id: Date.now() + index,
      headline: transformed,
      body: lines.slice(0, 3),
      pageRef: 100 + index,
      category,
      ending: this.getRandomEnding(),
    }
  }
}
