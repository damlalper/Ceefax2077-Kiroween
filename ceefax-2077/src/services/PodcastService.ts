// iTunes Podcast API - Free, no key required
// https://itunes.apple.com/search?term=podcast&entity=podcast

export interface Podcast {
  title: string
  host: string
  episode: string
  duration: string
  summary: string
  category: string
  rating: number
  artworkUrl: string
}

export class PodcastService {
  private static ITUNES_API = 'https://itunes.apple.com/search'

  /**
   * Fetch top podcasts from iTunes
   */
  static async getTopPodcasts(limit: number = 10): Promise<Podcast[]> {
    try {
      const response = await fetch(
        `${this.ITUNES_API}?term=technology&entity=podcast&limit=${limit}`
      )
      
      if (!response.ok) {
        throw new Error('iTunes API error')
      }

      const data = await response.json()
      
      return data.results.map((item: any) => ({
        title: item.collectionName || item.trackName,
        host: item.artistName,
        episode: `Latest Episode`,
        duration: '45 min',
        summary: this.truncate(item.collectionName || 'Tech podcast covering latest trends', 100),
        category: item.primaryGenreName || 'Technology',
        rating: 5,
        artworkUrl: item.artworkUrl100
      }))
    } catch (error) {
      console.error('Failed to fetch podcasts:', error)
      return this.getFallbackPodcasts()
    }
  }

  /**
   * Fallback data if API fails
   */
  private static getFallbackPodcasts(): Podcast[] {
    return [
      {
        title: 'Tech Talk Daily',
        host: 'Tech Experts',
        episode: 'EP 142: AI Ethics',
        duration: '45 min',
        summary: 'Deep dive into AI consciousness and rights',
        category: 'Technology',
        rating: 5,
        artworkUrl: ''
      }
    ]
  }

  private static truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length) + '...' : str
  }
}
