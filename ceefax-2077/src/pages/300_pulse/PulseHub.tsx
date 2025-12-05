import TeletextPage from '../../components/TeletextPage'

export default function PulseHub() {
  return (
    <TeletextPage 
      title="THE PULSE" 
      subtitle="Society Intelligence"
      footer="Enter page number to navigate"
      zone={300}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #FF1493', padding: '0.5rem', backgroundColor: 'rgba(255, 20, 147, 0.2)' }}>
          <div style={{ color: '#FF1493', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>301 → THE BLAST</div>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Gen Z Gossip Feed • Drama HQ</div>
        </div>

        <div style={{ border: '2px solid #FF1493', padding: '0.5rem', backgroundColor: 'rgba(255, 20, 147, 0.2)' }}>
          <div style={{ color: '#FF1493', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>304 → SOUL WEIGHT</div>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Username Sin Calculator</div>
        </div>

        <div style={{ marginTop: '1rem', border: '2px solid #FF1493', backgroundColor: 'rgba(255, 20, 147, 0.2)', padding: '1rem' }}>
          <div style={{ color: '#FF1493', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            💅 ZONE 300: THE PULSE 💅
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center' }}>
            WHERE WE JUDGE EVERYONE AND EVERYTHING FR FR 💀
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', border: '2px solid #FF1493', padding: '1rem' }}>
          <div style={{ color: '#FF1493', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>GLOBAL SENTIMENT:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              <span style={{ color: '#FFFFFF' }}>😊 Positive</span>
              <span style={{ color: '#00FF00' }}>42%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              <span style={{ color: '#FFFFFF' }}>😐 Neutral</span>
              <span style={{ color: '#888888' }}>31%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              <span style={{ color: '#FFFFFF' }}>😠 Negative</span>
              <span style={{ color: '#FF0000' }}>27%</span>
            </div>
          </div>
        </div>
      </div>
    </TeletextPage>
  )
}
