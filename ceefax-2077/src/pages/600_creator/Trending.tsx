import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { GitHubTrendingService } from '../../services/GitHubTrendingService'

interface TrendingVideo {
  title: string
  creator: string
  platform: string
  views: string
  category: string
  trending: number
}

export default function Trending() {
  const [videos, setVideos] = useState<TrendingVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    loadTrendingContent()
  }, [])

  const loadTrendingContent = async () => {
    try {
      setLoading(true)
      const data = await GitHubTrendingService.getTrendingContent()
      setVideos(data)
    } catch (error) {
      console.error('Failed to load trending:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (videos.length === 0) return

    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    const rotateInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length)
    }, 4000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(rotateInterval)
    }
  }, [videos.length])

  if (loading || videos.length === 0) {
    return (
      <TeletextPage 
        title="TRENDING" 
        subtitle="Viral Content • GitHub • Tech"
        footer="Loading trending content..."
        zone={601}
      >
        <div style={{ textAlign: 'center', padding: '2rem', color: '#FF00FF' }}>
          <div style={{ fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>
            LOADING TRENDING...
          </div>
        </div>
      </TeletextPage>
    )
  }

  const current = videos[currentIndex]

  return (
    <TeletextPage 
      title="TRENDING" 
      subtitle="Viral Content • GitHub • Tech"
      footer="Auto-rotate 4s • Real-time trends"
      zone={601}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Featured Trending */}
        <div style={{
          border: '2px solid #FF00FF',
          backgroundColor: 'rgba(255, 0, 255, 0.1)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <div style={{ color: '#FF00FF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
              {blink ? '🔥' : '  '} #1 TRENDING {blink ? '🔥' : '  '}
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {current.title}
            </div>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
              by {current.creator}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Platform:</span>
              <span style={{ color: '#00FFFF' }}>
                {current.platform}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Stars:</span>
              <span style={{ color: '#00FF00' }}>{current.views}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Language:</span>
              <span style={{ color: '#FFFF00' }}>{current.category}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Rank:</span>
              <span style={{ color: '#FF00FF' }}>#{current.trending}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={loadTrendingContent}
              style={{
                backgroundColor: '#FF00FF',
                color: '#FFFFFF',
                padding: '0.5rem 1.5rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                textTransform: 'uppercase'
              }}
            >
              🔄 REFRESH
            </button>
          </div>
        </div>

        {/* Trending List */}
        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>
            TOP 5 TRENDING:
          </div>
          {videos.map((video, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.25rem 0',
                borderBottom: idx < videos.length - 1 ? '1px solid #333' : 'none',
                backgroundColor: idx === currentIndex ? 'rgba(255, 0, 255, 0.2)' : 'transparent',
                fontSize: 'clamp(10px, 1.5vmin, 14px)'
              }}
            >
              <span style={{ color: '#FFFFFF' }}>
                #{video.trending} {video.title.substring(0, 20)}...
              </span>
              <span style={{ color: '#00FF00' }}>{video.views}</span>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
          <div style={{ border: '2px solid #00FFFF', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>GITHUB</div>
            <div style={{ color: '#FFFFFF' }}>100M+ devs</div>
          </div>
          <div style={{ border: '2px solid #FF00FF', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ color: '#FF00FF', fontWeight: 'bold' }}>LIVE DATA</div>
            <div style={{ color: '#00FF00' }}>REAL-TIME</div>
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
