import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'

interface Stream {
  streamer: string
  title: string
  game: string
  viewers: number
  platform: 'Twitch' | 'YouTube'
  status: 'LIVE' | 'OFFLINE'
}

export default function StreamHub() {
  const [streams] = useState<Stream[]>([
    { streamer: 'CyberGamer', title: 'Cyberpunk 2077 Speedrun', game: 'Cyberpunk 2077', viewers: 45000, platform: 'Twitch', status: 'LIVE' },
    { streamer: 'CodeMaster', title: 'Building AI in Real-time', game: 'Programming', viewers: 12000, platform: 'YouTube', status: 'LIVE' },
    { streamer: 'RetroQueen', title: 'Teletext Gaming Marathon', game: 'Retro Games', viewers: 8500, platform: 'Twitch', status: 'LIVE' },
    { streamer: 'TechTalker', title: 'New GPU Unboxing', game: 'Tech Review', viewers: 6200, platform: 'YouTube', status: 'LIVE' },
  ])

  const [blink, setBlink] = useState(true)
  const [viewerCount, setViewerCount] = useState(0)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    // Simulate viewer count changes
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 100) - 50)
    }, 2000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(viewerInterval)
    }
  }, [])

  const totalViewers = streams.reduce((sum, s) => sum + s.viewers, 0) + viewerCount
  const liveCount = streams.filter(s => s.status === 'LIVE').length

  return (
    <TeletextPage 
      title="STREAM HUB" 
      subtitle="Live Streams • Twitch • YouTube Live"
      footer="Real-time viewer counts • 24/7 streaming"
      zone={603}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Live Stats */}
        <div style={{
          border: '2px solid #FF0000',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ color: '#FF0000', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>
            {blink ? '🔴' : '  '} LIVE NOW {blink ? '🔴' : '  '}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div>
              <div style={{ color: '#FFFFFF' }}>Active Streams</div>
              <div style={{ color: '#00FF00', fontSize: 'clamp(16px, 2.5vmin, 22px)', fontWeight: 'bold' }}>
                {liveCount}
              </div>
            </div>
            <div>
              <div style={{ color: '#FFFFFF' }}>Total Viewers</div>
              <div style={{ color: '#FFFF00', fontSize: 'clamp(16px, 2.5vmin, 22px)', fontWeight: 'bold' }}>
                {(totalViewers / 1000).toFixed(1)}K
              </div>
            </div>
          </div>
        </div>

        {/* Live Streams */}
        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>
            LIVE STREAMS:
          </div>
          {streams.map((stream, idx) => (
            <div 
              key={idx}
              style={{
                padding: '0.5rem',
                borderBottom: idx < streams.length - 1 ? '1px solid #333' : 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                marginBottom: '0.5rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <div style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  {stream.streamer}
                </div>
                <div style={{ color: '#FF0000', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
                  {blink ? '● LIVE' : '  LIVE'}
                </div>
              </div>
              <div style={{ color: '#00FFFF', fontSize: 'clamp(9px, 1.3vmin, 12px)', marginBottom: '0.25rem' }}>
                {stream.title}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(9px, 1.3vmin, 12px)' }}>
                <span style={{ color: '#888888' }}>
                  {stream.game} • {stream.platform}
                </span>
                <span style={{ color: '#00FF00' }}>
                  👁 {(stream.viewers / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
          <div style={{ border: '2px solid #9146FF', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ color: '#9146FF', fontWeight: 'bold' }}>TWITCH</div>
            <div style={{ color: '#FFFFFF' }}>53.5K live</div>
          </div>
          <div style={{ border: '2px solid #FF0000', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ color: '#FF0000', fontWeight: 'bold' }}>YOUTUBE</div>
            <div style={{ color: '#FFFFFF' }}>18.2K live</div>
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
