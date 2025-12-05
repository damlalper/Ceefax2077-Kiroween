// Reddit API Service - Free, no authentication required for public posts
const REDDIT_API = 'https://www.reddit.com'

export interface RedditPost {
  id: string
  title: string
  selftext: string
  author: string
  created_utc: number
  score: number
  num_comments: number
  subreddit: string
}

export class RedditService {
  /**
   * Fetch posts from a subreddit
   * Uses public JSON endpoint (no API key required)
   */
  static async getSubredditPosts(subreddit: string, limit: number = 10): Promise<RedditPost[]> {
    try {
      const response = await fetch(`${REDDIT_API}/r/${subreddit}/hot.json?limit=${limit}`)
      
      if (!response.ok) {
        throw new Error(`Reddit API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (!data.data || !data.data.children) {
        throw new Error('Invalid Reddit response')
      }

      return data.data.children.map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        selftext: child.data.selftext || '',
        author: child.data.author,
        created_utc: child.data.created_utc,
        score: child.data.score,
        num_comments: child.data.num_comments,
        subreddit: child.data.subreddit,
      }))
    } catch (error) {
      console.error(`Failed to fetch r/${subreddit}:`, error)
      throw error
    }
  }

  /**
   * Fetch drama/gossip posts from multiple subreddits
   */
  static async getDramaPosts(limit: number = 10): Promise<RedditPost[]> {
    const subreddits = [
      'relationship_advice',
      'AmItheAsshole',
      'tifu',
      'confession',
      'offmychest',
    ]

    try {
      // Fetch from random subreddit
      const randomSub = subreddits[Math.floor(Math.random() * subreddits.length)]
      const posts = await this.getSubredditPosts(randomSub, limit)
      
      // Filter for interesting posts (high engagement)
      return posts
        .filter(post => post.score > 50 && post.title.length > 20)
        .slice(0, limit)
    } catch (error) {
      console.error('Failed to fetch drama posts:', error)
      throw error
    }
  }

  /**
   * Get posts from multiple subreddits in parallel
   */
  static async getMultiSubredditPosts(subreddits: string[], postsPerSub: number = 3): Promise<RedditPost[]> {
    try {
      const promises = subreddits.map(sub => 
        this.getSubredditPosts(sub, postsPerSub).catch(() => [])
      )
      
      const results = await Promise.all(promises)
      
      // Flatten and shuffle
      const allPosts = results.flat()
      return allPosts.sort(() => Math.random() - 0.5)
    } catch (error) {
      console.error('Failed to fetch multi-subreddit posts:', error)
      throw error
    }
  }

  /**
   * Format timestamp as "time ago"
   */
  static getTimeAgo(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000)
    const seconds = now - timestamp
    
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }
}
