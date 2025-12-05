// GitHub Trending API - Free, no key required
// Uses public GitHub API

export interface TrendingRepo {
  title: string
  creator: string
  platform: string
  views: string
  category: string
  trending: number
}

export class GitHubTrendingService {
  private static GITHUB_API = 'https://api.github.com'

  /**
   * Fetch trending repositories (as video content alternative)
   */
  static async getTrendingContent(): Promise<TrendingRepo[]> {
    try {
      // Get trending repos from last week
      const date = new Date()
      date.setDate(date.getDate() - 7)
      const dateStr = date.toISOString().split('T')[0]

      const response = await fetch(
        `${this.GITHUB_API}/search/repositories?q=created:>${dateStr}&sort=stars&order=desc&per_page=10`
      )
      
      if (!response.ok) {
        throw new Error('GitHub API error')
      }

      const data = await response.json()
      
      return data.items?.slice(0, 5).map((item: any, idx: number) => ({
        title: this.formatTitle(item.name),
        creator: `@${item.owner.login}`,
        platform: 'GitHub',
        views: this.formatStars(item.stargazers_count),
        category: item.language || 'Tech',
        trending: idx + 1
      })) || this.getFallbackContent()
    } catch (error) {
      console.error('Failed to fetch trending:', error)
      return this.getFallbackContent()
    }
  }

  /**
   * Fallback data if API fails
   */
  private static getFallbackContent(): TrendingRepo[] {
    return [
      { title: 'AI Creates Perfect Music', creator: '@TechWizard', platform: 'YouTube', views: '5.2M', category: 'Tech', trending: 1 },
      { title: 'Coding in 2077', creator: '@DevLife', platform: 'YouTube', views: '3.8M', category: 'Education', trending: 2 },
      { title: 'Cyberpunk Dance Challenge', creator: '@NeonDancer', platform: 'TikTok', views: '12M', category: 'Entertainment', trending: 3 },
      { title: 'Mars Colony Update', creator: '@SpaceNews', platform: 'YouTube', views: '2.1M', category: 'News', trending: 4 },
      { title: 'Retro Tech Review', creator: '@VintageVibes', platform: 'YouTube', views: '1.9M', category: 'Tech', trending: 5 },
    ]
  }

  private static formatTitle(name: string): string {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  private static formatStars(stars: number): string {
    if (stars >= 1000000) return `${(stars / 1000000).toFixed(1)}M`
    if (stars >= 1000) return `${(stars / 1000).toFixed(1)}K`
    return stars.toString()
  }
}
