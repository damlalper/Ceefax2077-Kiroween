import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
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
      <TeletextPage 
        title="GLOBAL WIRE" 
        subtitle="Live Tech News Feed • HackerNews API"
        footer="Press [R] to refresh • Auto-update 30s"
        zone={101}
      >

        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#FFFF00' }}>
            <div className={blink ? '' : 'opacity-0'} style={{ fontSize: 'clamp(18px, 2.5vmin, 26px)' }}>
              ⚡ CONNECTING TO WIRE...
            </div>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(14px, 1.8vmin, 20px)', marginTop: '0.5rem' }}>
              FETCHING LIVE DATA
            </div>
          </div>
        )}

        {error && (
          <div style={{ 
            border: '2px solid #FF0000', 
            padding: '1rem', 
            textAlign: 'center',
            backgroundColor: '#330000'
          }}>
            <div style={{ color: '#FF0000', fontSize: 'clamp(16px, 2.2vmin, 24px)' }}>
              ⚠ {error}
            </div>
            <button
              onClick={loadNews}
              style={{
                marginTop: '1rem',
                backgroundColor: '#0066CC',
                color: '#FFFF00',
                padding: '0.5rem 2rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(14px, 1.8vmin, 20px)',
                fontWeight: 'bold'
              }}
            >
              RETRY CONNECTION
            </button>
          </div>
        )}

        {!loading && !error && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.75rem',
            fontSize: 'clamp(14px, 1.8vmin, 20px)'
          }}>
            {news.map((item, idx) => (
              <div key={item.id} style={{ 
                border: '2px solid #0066CC', 
                padding: '0.5rem',
                backgroundColor: '#000033'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem',
                  fontSize: '0.9em'
                }}>
                  <span style={{ color: '#FFFF00' }}>[{idx + 1}]</span>
                  <span style={{ color: '#00FF00' }}>
                    ↑{item.score} • {HackerNewsService.formatTimeAgo(item.time)}
                  </span>
                </div>
                <div style={{ color: '#FFFFFF', lineHeight: '1.3', marginBottom: '0.25rem' }}>
                  {item.title}
                </div>
                <div style={{ color: '#00FFFF', fontSize: '0.85em' }}>
                  BY: {item.by} • {item.descendants || 0} COMMENTS
                </div>
                {item.url && (
                  <div style={{ 
                    color: '#00FFFF', 
                    fontSize: '0.8em', 
                    marginTop: '0.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    🔗 {new URL(item.url).hostname}
                  </div>
                )}
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button
                onClick={loadNews}
                style={{
                  backgroundColor: '#0066CC',
                  color: '#FFFF00',
                  padding: '0.5rem 2rem',
                  border: '2px solid #FFFF00',
                  cursor: 'pointer',
                  fontSize: 'clamp(14px, 1.8vmin, 20px)',
                  fontWeight: 'bold'
                }}
              >
                REFRESH WIRE
              </button>
            </div>
          </div>
        )}
      </TeletextPage>
    </>
  )
}
