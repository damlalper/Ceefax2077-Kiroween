// HackerNews API Service
const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0'

export interface HNStory {
  id: number
  title: string
  url?: string
  score: number
  by: string
  time: number
  descendants?: number
}

export class HackerNewsService {
  static async getTopStories(limit: number = 10): Promise<HNStory[]> {
    try {
      // Fetch top story IDs
      const response = await fetch(`${HN_API_BASE}/topstories.json`)
      const storyIds: number[] = await response.json()
      
      // Fetch details for first N stories
      const topStoryIds = storyIds.slice(0, limit)
      const storyPromises = topStoryIds.map(id => 
        fetch(`${HN_API_BASE}/item/${id}.json`).then(res => res.json())
      )
      
      const stories = await Promise.all(storyPromises)
      return stories.filter(story => story && story.title)
    } catch (error) {
      console.error('Failed to fetch HackerNews stories:', error)
      throw error
    }
  }

  static formatTimeAgo(timestamp: number): string {
    const now = Date.now() / 1000
    const diff = now - timestamp
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }
}
