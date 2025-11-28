export default function HomeHub() {
  return (
    <div>
      {/* Header */}
      <div style={{ 
        color: '#FFD700', 
        fontSize: '1.3em', 
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        ╔════════════════════════════════════╗
        ║      ZONE 800: FRANKENSTEIN        ║
        ║         TELE-HOME HUB              ║
        ╚════════════════════════════════════╝
      </div>

      {/* Description */}
      <div style={{ 
        color: '#00FFFF', 
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '0.9em'
      }}>
        Retro Teletext meets Modern Smart Home
      </div>

      {/* ASCII Art */}
      <div style={{ 
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.1em'
      }}>
        <pre style={{ lineHeight: '1.2', margin: 0 }}>
{`
    ╔═══════════════════════════╗
    ║                           ║
    ║      🏠  SMART HOME  💡   ║
    ║                           ║
    ║    ┌─────┐    ┌─────┐    ║
    ║    │ ON  │    │ OFF │    ║
    ║    └─────┘    └─────┘    ║
    ║                           ║
    ║   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ║
    ║   ░░░░░░░░░░░░░░░░░░░░░   ║
    ║                           ║
    ╚═══════════════════════════╝
`}
        </pre>
      </div>

      {/* Pages */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          color: '#FFD700', 
          marginBottom: '10px',
          fontSize: '1.1em'
        }}>
          AVAILABLE PAGES:
        </div>

        <div style={{ 
          padding: '10px',
          border: '1px solid #FFD700',
          marginBottom: '10px'
        }}>
          <div style={{ color: '#FFFF00', fontSize: '1.2em' }}>
            801 - TELE-HOME
          </div>
          <div style={{ color: '#FFFFFF', marginTop: '5px' }}>
            Smart home device control via retro
            teletext interface. Control Philips
            Hue lights with arrow keys and ASCII
            art feedback.
          </div>
          <div style={{ 
            color: '#00FF00', 
            marginTop: '5px',
            fontSize: '0.85em'
          }}>
            ✓ MCP IoT Agent
            ✓ Real-time control
            ✓ Network simulation
            ✓ Flash effects
          </div>
        </div>

        <div style={{ 
          padding: '10px',
          border: '1px solid #00FFFF',
          marginBottom: '10px'
        }}>
          <div style={{ color: '#00FFFF', fontSize: '1.2em' }}>
            802 - TIME MACHINE
          </div>
          <div style={{ color: '#FFFFFF', marginTop: '5px' }}>
            Browse archived websites from 1999
            via Internet Archive. HTML stripped
            and converted to uppercase Teletext
            format with dial-up animation.
          </div>
          <div style={{ 
            color: '#00FF00', 
            marginTop: '5px',
            fontSize: '0.85em'
          }}>
            ✓ MCP Wayback Agent
            ✓ 1999 snapshots
            ✓ Dial-up animation
            ✓ HTML to Teletext
          </div>
        </div>

        <div style={{ 
          padding: '10px',
          border: '1px solid #FF00FF',
          marginBottom: '10px'
        }}>
          <div style={{ color: '#FF00FF', fontSize: '1.2em' }}>
            803 - PIXELGEN
          </div>
          <div style={{ color: '#FFFFFF', marginTop: '5px' }}>
            AI Image Generator to ASCII Art.
            DALL-E's Grandfather! Type a prompt,
            get real AI image converted to 40x24
            teletext grid with 8-color palette.
          </div>
          <div style={{ 
            color: '#00FF00', 
            marginTop: '5px',
            fontSize: '0.85em'
          }}>
            ✓ Pollinations.ai API
            ✓ Real-time conversion
            ✓ Line-by-line rendering
            ✓ 1980s modem style
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          color: '#FFD700', 
          marginBottom: '10px',
          fontSize: '1.1em'
        }}>
          FRANKENSTEIN FEATURES:
        </div>
        
        <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
          <div>• 1980s Teletext + 2020s IoT</div>
          <div>• ASCII art device status</div>
          <div>• Keyboard-only control</div>
          <div>• Realistic network delays</div>
          <div>• Visual flash effects</div>
          <div>• Retro-modern mashup</div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ 
        marginTop: '25px',
        padding: '10px',
        border: '1px solid #666',
        color: '#00FFFF'
      }}>
        <div style={{ color: '#FFD700', marginBottom: '5px' }}>
          NAVIGATION:
        </div>
        <div>Type page number and press ENTER</div>
        <div style={{ marginTop: '5px', color: '#FFFF00' }}>
          801 → Tele-Home Control
        </div>
        <div style={{ marginTop: '3px', color: '#00FFFF' }}>
          802 → Time Machine Browser
        </div>
        <div style={{ marginTop: '3px', color: '#FF00FF' }}>
          803 → PixelGen (AI to ASCII)
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        marginTop: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.8em'
      }}>
        Zone 800 - Where Past Meets Future
      </div>
    </div>
  );
}
