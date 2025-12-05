import TeletextPage from '../../components/TeletextPage'

export default function CreatorHub() {
  return (
    <TeletextPage 
      title="THE CREATOR" 
      subtitle="Media • Content • Streaming"
      footer="Enter page number to navigate"
      zone={600}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>601 → TRENDING</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Viral Content • YouTube • TikTok</div>
        </div>

        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>602 → POD CAST</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Top Podcasts • AI Summaries</div>
        </div>

        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>603 → STREAM HUB</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Live Streams • Twitch • YouTube Live</div>
        </div>

        <div style={{ marginTop: '1.5rem', border: '2px solid #FF00FF', padding: '1rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>CREATOR STATS:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>📹 Active Creators</span>
              <span style={{ color: '#00FF00' }}>50M+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🔥 Trending Now</span>
              <span style={{ color: '#FF0000' }}>AI Art</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🎙️ Top Podcast</span>
              <span style={{ color: '#00FFFF' }}>Tech Talk</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>📡 Live Viewers</span>
              <span style={{ color: '#FFFF00' }}>2.5M</span>
            </div>
          </div>
        </div>
      </div>
    </TeletextPage>
  )
}
