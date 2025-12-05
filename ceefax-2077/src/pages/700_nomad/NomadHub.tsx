import TeletextPage from '../../components/TeletextPage'

export default function NomadHub() {
  return (
    <TeletextPage 
      title="THE NOMAD" 
      subtitle="Digital Lifestyle • Travel • Social"
      footer="Enter page number to navigate"
      zone={700}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #FFFF00', padding: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>701 → NOMAD LIFE</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Travel Destinations • Cost of Living</div>
        </div>

        <div style={{ border: '2px solid #FF00FF', padding: '0.5rem' }}>
          <div style={{ color: '#FF00FF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>702 → BLIND DATE</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>AI Matchmaking • Social Connection</div>
        </div>

        <div style={{ border: '2px solid #00FFFF', padding: '0.5rem' }}>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>703 → DROP ZONE</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>NFT Marketplace • Digital Collectibles</div>
        </div>

        <div style={{ marginTop: '1.5rem', border: '2px solid #FFFF00', padding: '1rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>NOMAD STATUS:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🌍 Active Nomads</span>
              <span style={{ color: '#00FF00' }}>35M+</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>✈️ Top Destination</span>
              <span style={{ color: '#00FFFF' }}>Bali</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>💰 Avg Cost/Month</span>
              <span style={{ color: '#FFFF00' }}>$1,200</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>📱 Connectivity</span>
              <span style={{ color: '#00FF00' }}>EXCELLENT</span>
            </div>
          </div>
        </div>
      </div>
    </TeletextPage>
  )
}
