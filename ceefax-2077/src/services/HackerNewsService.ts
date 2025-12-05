// HackerNews API Service - Free, no key required
const HN_API = 'https://hacker-news.firebaseio.com/v0'

export interface HNStory {
  id: number
  title: string
  url?: string
  score: number
  by: string
  time: number
  descendants?: number // comment count
}

export class HackerNewsService {
  /**
   * Fetch top stories from HackerNews
   */
  static async getTopStories(limit: number = 20): Promise<HNStory[]> {
    try {
      // Get top story IDs
      const response = await fetch(`${HN_API}/topstories.json`)
      
      if (!response.ok) {
        throw new Error(`HN API error: ${response.status}`)
      }

      const storyIds: number[] = await response.json()
      
      // Fetch details for first N stories
      const storyPromises = storyIds.slice(0, limit).map(id => 
        this.getStory(id)
      )
      
      const stories = await Promise.all(storyPromises)
      
      // Filter out null results (deleted stories)
      return stories.filter(Boolean) as HNStory[]
    } catch (error) {
      console.error('Failed to fetch HN stories:', error)
      throw error
    }
  }

  /**
   * Fetch a single story by ID
   */
  private static async getStory(id: number): Promise<HNStory | null> {
    try {
      const response = await fetch(`${HN_API}/item/${id}.json`)
      
      if (!response.ok) {
        return null
      }

      const story = await response.json()
      
      // Only return stories (not jobs, polls, etc)
      if (story.type !== 'story') {
        return null
      }

      return {
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score || 0,
        by: story.by || 'unknown',
        time: story.time,
        descendants: story.descendants || 0,
      }
    } catch (error) {
      console.error(`Failed to fetch story ${id}:`, error)
      return null
    }
  }

  /**
   * Get new stories (more recent, less filtered)
   */
  static async getNewStories(limit: number = 20): Promise<HNStory[]> {
    try {
      const response = await fetch(`${HN_API}/newstories.json`)
      
      if (!response.ok) {
        throw new Error(`HN API error: ${response.status}`)
      }

      const storyIds: number[] = await response.json()
      
      const storyPromises = storyIds.slice(0, limit).map(id => 
        this.getStory(id)
      )
      
      const stories = await Promise.all(storyPromises)
      
      return stories.filter(Boolean) as HNStory[]
    } catch (error) {
      console.error('Failed to fetch HN new stories:', error)
      throw error
    }
  }
}
