import TeletextPage from '../../components/TeletextPage'

export default function ShieldHub() {
  return (
    <TeletextPage 
      title="SHIELD" 
      subtitle="Security & Rights Intelligence"
      footer="Enter page number to navigate"
      zone={500}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #CC0000', padding: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>501 → CRIME WATCH</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Location-based Safety Score</div>
        </div>

        <div style={{ border: '2px solid #CC0000', padding: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>502 → SCAM BUSTER</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>AI Fraud Detection</div>
        </div>

        <div style={{ border: '2px solid #CC0000', padding: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>503 → POCKET LAWYER</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Legal Rights Simplified</div>
        </div>

        <div style={{ border: '2px solid #CC0000', padding: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>504 → SOS BEACON</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Emergency Strobe & Info</div>
        </div>
      </div>
    </TeletextPage>
  )
}
