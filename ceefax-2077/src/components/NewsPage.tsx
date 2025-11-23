import { useEffect, useState } from 'react'
import { NewsService } from '../services/NewsService'
import type { NewsItem } from '../services/NewsService'

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true)
      const headlines = await NewsService.fetchHeadlines()
      setNews(headlines)
      setLoading(false)
    }

    loadNews()
  }, [])

  if (loading) {
    return (
      <div className="teletext-page">
        <div className="teletext-loading animate-pulse">
          LOADING TRUTH TERMINAL...
        </div>
      </div>
    )
  }

  return (
    <div className="teletext-page">
      {/* Top Banner - Classic Teletext Style */}
      <div className="teletext-title-banner">
        <span className="double-height">NEWS</span>
      </div>

      {/* Sub-header with separator */}
      <div className="teletext-subtitle">
        HEADLINES - THE TRUTH TERMINAL
      </div>

      {/* News Items */}
      <div className="teletext-news-content">
        {news.map((item) => (
          <div key={item.id} className="teletext-news-item">
            {/* Headline with page reference */}
            <div className="teletext-news-headline">
              <span className="text-cyan">
                ► {item.headline}
              </span>
              <span className="text-white teletext-page-ref">
                {item.pageRef}
              </span>
            </div>
            
            {/* Body text - 3 lines max */}
            <div className="teletext-news-body">
              {item.body.map((line, lineIndex) => (
                <p key={lineIndex} className="text-white">{line}</p>
              ))}
            </div>
            
            {/* Ending phrase */}
            <p className="teletext-news-ending text-yellow">
              {item.ending}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner">
        THE TRUTH TERMINAL - INFORMATION WITHOUT BIAS
      </div>
    </div>
  )
}
