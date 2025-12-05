import TeletextPage, { TeletextListItem, TeletextColumns } from '../../components/TeletextPage'

export default function TruthHub() {
  return (
    <TeletextPage 
      title="THE TRUTH" 
      subtitle="News & Facts Intelligence"
      footer="Enter page number to navigate"
      zone={100}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        fontSize: 'clamp(16px, 2.2vmin, 24px)'
      }}>
        <TeletextColumns
          left={
            <div style={{ color: '#FFFF00' }}>
              <TeletextListItem bullet=">">
                <span style={{ color: '#FFFF00' }}>101</span> <span style={{ color: '#FFFFFF' }}>GLOBAL WIRE</span>
              </TeletextListItem>
              <div style={{ color: '#00FFFF', fontSize: '0.9em', marginLeft: '2rem' }}>
                AI-Summarized World News
              </div>
            </div>
          }
          right={
            <div style={{ color: '#FFFF00' }}>
              <TeletextListItem bullet=">">
                <span style={{ color: '#FFFF00' }}>103</span> <span style={{ color: '#FFFFFF' }}>LIE DETECTOR</span>
              </TeletextListItem>
              <div style={{ color: '#00FFFF', fontSize: '0.9em', marginLeft: '2rem' }}>
                Detect Manipulation & Bias
              </div>
            </div>
          }
        />
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1rem',
          border: '2px solid #0066CC',
          backgroundColor: '#0066CC',
          color: '#FFFF00'
        }}>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
            TRUTH TERMINAL ACTIVE
          </div>
          <div style={{ fontSize: '0.9em', marginTop: '0.5rem' }}>
            FACT-CHECKING AI ONLINE
          </div>
        </div>
      </div>
    </TeletextPage>
  )
}
