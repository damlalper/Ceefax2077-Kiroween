import TeletextPage from '../../components/TeletextPage'

export default function ThemesHub() {
  const goToPage = (page: number) => {
    window.location.href = `/page/${page}`
  }

  return (
    <TeletextPage 
      title="SYSTEM CONTROL" 
      subtitle="Zone 900 • Configuration & Customization"
      footer="Press number to select • [0] Return to index"
      zone={900}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem',
        fontSize: 'clamp(16px, 2.5vmin, 24px)'
      }}>
        
        {/* ASCII Header */}
        <pre className="ascii-art" style={{ 
          textAlign: 'center', 
          color: '#00FFFF',
          fontSize: 'clamp(12px, 1.8vmin, 16px)',
          marginBottom: '1rem'
        }}>
{`╔═══════════════════════════════════╗
║   SYSTEM CONFIGURATION PANEL     ║
╚═══════════════════════════════════╝`}
        </pre>

        {/* Menu Options */}
        <div 
          onClick={() => goToPage(904)}
          style={{ 
            backgroundColor: '#0066CC', 
            padding: '1rem',
            cursor: 'pointer',
            border: '2px solid #00FFFF'
          }}
        >
          <div style={{ color: '#FFFF00', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            [1] THEME SELECTOR
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.8em' }}>
            Change visual themes and color schemes
          </div>
        </div>

        <div 
          onClick={() => goToPage(907)}
          style={{ 
            backgroundColor: '#0066CC', 
            padding: '1rem',
            cursor: 'pointer',
            border: '2px solid #00FFFF'
          }}
        >
          <div style={{ color: '#FFFF00', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            [2] AGENT HOOKS
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.8em' }}>
            Configure automated agent behaviors
          </div>
        </div>

        <div 
          onClick={() => goToPage(906)}
          style={{ 
            backgroundColor: '#0066CC', 
            padding: '1rem',
            cursor: 'pointer',
            border: '2px solid #00FFFF'
          }}
        >
          <div style={{ color: '#FFFF00', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            [3] VHS TAPE LIBRARY
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.8em' }}>
            View and playback recorded memories
          </div>
        </div>

        <div 
          onClick={() => goToPage(905)}
          style={{ 
            backgroundColor: '#0066CC', 
            padding: '1rem',
            cursor: 'pointer',
            border: '2px solid #00FFFF'
          }}
        >
          <div style={{ color: '#FFFF00', fontWeight: 'bold', marginBottom: '0.25rem' }}>
            [4] LOCAL GHOST
          </div>
          <div style={{ color: '#FFFFFF', fontSize: '0.8em' }}>
            Browse local file system
          </div>
        </div>

        {/* System Info */}
        <div style={{ 
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #666666',
          fontSize: '0.7em',
          color: '#00FFFF'
        }}>
          <div>SYSTEM STATUS: OPERATIONAL</div>
          <div>ZONE: 900 (CONFIGURATION)</div>
          <div>ACCESS LEVEL: ADMINISTRATOR</div>
        </div>
      </div>
    </TeletextPage>
  )
}
