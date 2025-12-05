import TeletextPage from '../../components/TeletextPage'

export default function SystemHub() {
  return (
    <TeletextPage 
      title="THE SYSTEM" 
      subtitle="Economy & Tech Intelligence"
      footer="Enter page number to navigate"
      zone={200}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ border: '2px solid #FFD700', padding: '0.5rem' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>201 → STONKS</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Crypto/Stock Block Charts</div>
        </div>

        <div style={{ border: '2px solid #FFD700', padding: '0.5rem' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>202 → CODE EXORCIST</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>AI Legacy Code Refactor</div>
        </div>

        <div style={{ border: '2px solid #FFD700', padding: '0.5rem' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>204 → ORACLE OF DOOM</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>Market Risk Doomsday Clock</div>
        </div>

        <div style={{ border: '2px solid #FF0000', padding: '0.5rem', backgroundColor: 'rgba(139, 0, 0, 0.2)' }}>
          <div style={{ color: '#FF0000', fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>205 → THE BASILISK</div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>AI Threat Monitor</div>
        </div>
      </div>
    </TeletextPage>
  )
}
