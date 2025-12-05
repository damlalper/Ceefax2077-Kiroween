import TeletextPage from '../../components/TeletextPage'

export default function PlanetHub() {
  return (
    <TeletextPage 
      title="THE PLANET" 
      subtitle="Environmental Intelligence"
      footer="Enter page number to navigate"
      zone={400}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #00CC66', padding: '0.5rem' }}>
          <div style={{ color: '#00CC66', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>401 → ECO SENSE</div>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Atmosphere Monitor</div>
        </div>

        <div style={{ border: '2px solid #00CC66', padding: '0.5rem' }}>
          <div style={{ color: '#00CC66', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>403 → PLAN B</div>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Terraform Monitor • 3D Planets</div>
        </div>

        <div style={{ border: '2px solid #FFD700', padding: '0.5rem', backgroundColor: 'rgba(255, 215, 0, 0.2)' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>405 → SHELTER SEEKER</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Apocalypse Mode • ASCII Map</div>
        </div>

        <div style={{ marginTop: '1.5rem', border: '2px solid #00CC66', padding: '1rem' }}>
          <div style={{ color: '#00CC66', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>EARTH STATUS:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🌡️ Global Temp</span>
              <span style={{ color: '#FFD700' }}>+1.2°C</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🌊 Sea Level</span>
              <span style={{ color: '#FF0000' }}>+8.2cm</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>🌳 Forest Cover</span>
              <span style={{ color: '#FF0000' }}>-12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>💨 Air Quality</span>
              <span style={{ color: '#00CC66' }}>GOOD</span>
            </div>
          </div>
        </div>
      </div>
    </TeletextPage>
  )
}
