import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { HackerNewsService, type HNStory } from '../../services/HackerNewsService'
import { useAutoHealer } from '../../hooks/useAutoHealer'
import HealerNotifications from '../../components/HealerNotifications'

export default function GlobalWire() {
  const [news, setNews] = useState<HNStory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [blink, setBlink] = useState(true)
  const { notifications, resilientFetch } = useAutoHealer()

  useEffect(() => {
    loadNews()
    
    // Blink effect for loading state
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  const loadNews = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Use resilient fetch with auto-healer
      const stories = await resilientFetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
        [] as number[],
        5000
      ).then(async (ids) => {
        if (Array.isArray(ids) && ids.length > 0) {
          return await HackerNewsService.getTopStories(8);
        }
        // Fallback data structure
        return [
          { id: 1, title: 'BACKUP: System Running on Backup Data', url: '', score: 0, by: 'auto-healer' }
        ] as HNStory[];
      });
      
      setNews(stories)
    } catch (err) {
      setError('SIGNAL LOST - Failed to fetch news')
      console.error('Failed to load news:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HealerNotifications notifications={notifications} />
      <TeletextGrid>
        <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-blue-400 text-xl">GLOBAL WIRE</h1>
          <p className="text-cyan-300 text-sm">Live Tech News Feed</p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className={`text-yellow-300 text-lg ${blink ? 'opacity-100' : 'opacity-0'}`}>
              ⚡ CONNECTING...
            </div>
            <div className="text-gray-400 text-xs mt-2">Fetching live data from HackerNews</div>
          </div>
        )}

        {error && (
          <div className="border border-red-400 p-3 text-center">
            <div className="text-red-400 text-sm">⚠ {error}</div>
            <button
              onClick={loadNews}
              className="mt-2 bg-blue-600 text-white px-4 py-1 text-xs hover:bg-blue-700"
            >
              RETRY
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="space-y-3">
              {news.map((item, idx) => (
                <div key={item.id} className="border border-blue-300 p-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-yellow-300">[{idx + 1}]</span>
                    <span className="text-green-400">
                      ↑ {item.score} | {HackerNewsService.formatTimeAgo(item.time)}
                    </span>
                  </div>
                  <div className="text-white text-sm leading-tight">{item.title}</div>
                  <div className="text-gray-400 text-xs mt-1">
                    by {item.by} | {item.descendants || 0} comments
                  </div>
                  {item.url && (
                    <div className="text-cyan-300 text-xs mt-1 truncate">
                      🔗 {new URL(item.url).hostname}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={loadNews}
                className="bg-blue-600 text-white px-4 py-1 text-xs hover:bg-blue-700"
              >
                REFRESH
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Live data from HackerNews API
              </p>
            </div>
          </>
        )}
      </div>
    </TeletextGrid>
    </>
  )
}
