import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { PodcastService, type Podcast } from '../../services/PodcastService'

export default function PodCast() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    loadPodcasts()
  }, [])

  const loadPodcasts = async () => {
    setLoading(true)
    const data = await PodcastService.getTopPodcasts(5)
    setPodcasts(data)
    setLoading(false)
  }

  if (loading || podcasts.length === 0) {
    return (
      <TeletextPage 
        title="POD CAST" 
        subtitle="Loading podcasts from iTunes..."
        footer="Real-time podcast data"
        zone={602}
      >
        <div style={{ textAlign: 'center', padding: '2rem', color: '#00FFFF', fontSize: 'clamp(14px, 2vmin, 18px)' }}>
          📡 LOADING PODCASTS...
        </div>
      </TeletextPage>
    )
  }

  const selected = podcasts[selectedIndex]

  return (
    <TeletextPage 
      title="POD CAST" 
      subtitle="Top Podcasts • AI Summaries"
      footer="↑↓ Navigate • AI-generated summaries"
      zone={602}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Selected Podcast */}
        <div style={{
          border: '2px solid #FF00FF',
          backgroundColor: 'rgba(255, 0, 255, 0.1)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#FF00FF', fontSize: 'clamp(14px, 2.5vmin, 20px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {selected.title}
            </div>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
              {selected.episode}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Host:</span>
              <span style={{ color: '#FFFF00' }}>{selected.host}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Duration:</span>
              <span style={{ color: '#00FF00' }}>{selected.duration}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Category:</span>
              <span style={{ color: '#00FFFF' }}>{selected.category}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Rating:</span>
              <span style={{ color: '#FFD700' }}>{'⭐'.repeat(selected.rating)}</span>
            </div>
          </div>

          {/* AI Summary */}
          <div style={{ border: '1px solid #666666', padding: '0.5rem', marginBottom: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <div style={{ color: '#FFFF00', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
              🤖 AI SUMMARY:
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.4' }}>
              {selected.summary}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              style={{
                backgroundColor: '#00FF00',
                color: '#000000',
                padding: '0.5rem 1rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace'
              }}
            >
              ▶ PLAY
            </button>
            <button
              style={{
                backgroundColor: '#00FFFF',
                color: '#000000',
                padding: '0.5rem 1rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace'
              }}
            >
              + SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Podcast List */}
        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>
            TOP PODCASTS:
          </div>
          {podcasts.map((podcast, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              style={{
                padding: '0.5rem',
                borderBottom: idx < podcasts.length - 1 ? '1px solid #333' : 'none',
                backgroundColor: idx === selectedIndex ? 'rgba(255, 0, 255, 0.2)' : 'transparent',
                cursor: 'pointer',
                fontSize: 'clamp(10px, 1.5vmin, 14px)'
              }}
            >
              <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                {podcast.title}
              </div>
              <div style={{ color: '#888888', fontSize: 'clamp(9px, 1.3vmin, 12px)' }}>
                {podcast.episode} • {podcast.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ border: '2px solid #666666', padding: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
          <div style={{ color: '#FFFF00', marginBottom: '0.25rem' }}>PODCAST STATS:</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
            <span>Total Episodes:</span>
            <span style={{ color: '#00FF00' }}>432</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF' }}>
            <span>Subscribers:</span>
            <span style={{ color: '#00FFFF' }}>2.8M</span>
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
