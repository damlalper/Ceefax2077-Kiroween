import { useState, useEffect } from 'react'
import { HackerNewsService } from '../../services/HackerNewsService'

export default function TruthHub() {
  const [headlines, setHeadlines] = useState<string[]>([])

  useEffect(() => {
    loadHeadlines()
  }, [])

  const loadHeadlines = async () => {
    const stories = await HackerNewsService.getTopStories()
    const titles = stories.map(s => s.title)
    setHeadlines(titles)
  }

  const goToZone = (page: number) => {
    window.location.href = `/page/${page}`
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#000000',
      color: '#FFFFFF',
      fontFamily: 'VT323, monospace',
      fontSize: 'clamp(16px, 2.5vmin, 24px)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      overflow: 'hidden'
    }}>
      
      {/* HUGE ASCII LOGO */}
      <div style={{
        textAlign: 'center',
        color: '#FFFF00',
        fontSize: 'clamp(20px, 3.5vmin, 36px)',
        fontWeight: 'bold',
        lineHeight: '1',
        marginBottom: '0.5rem',
        backgroundColor: '#0000FF',
        padding: '0.5rem'
      }}>
        <pre style={{ margin: 0, fontFamily: 'VT323, monospace' }}>
{`
███████╗███████╗███████╗███████╗ █████╗ ██╗  ██╗
██╔════╝██╔════╝██╔════╝██╔════╝██╔══██╗╚██╗██╔╝
██║     █████╗  █████╗  █████╗  ███████║ ╚███╔╝ 
██║     ██╔══╝  ██╔══╝  ██╔══╝  ██╔══██║ ██╔██╗ 
╚██████╗███████╗███████╗██║     ██║  ██║██╔╝ ██╗
 ╚═════╝╚══════╝╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝
           ██████╗  ██████╗ ███████╗███████╗    
           ╚════██╗██╔═████╗╚════██║╚════██║    
            █████╔╝██║██╔██║    ██╔╝    ██╔╝    
           ██╔═══╝ ████╔╝██║   ██╔╝    ██╔╝     
           ███████╗╚██████╔╝   ██║     ██║      
           ╚══════╝ ╚═════╝    ╚═╝     ╚═╝      
`}
        </pre>
      </div>

      {/* MAIN CONTENT GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1rem',
        flex: 1
      }}>
        
        {/* LEFT: ZONE INDEX */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem'
        }}>
          <div style={{
            backgroundColor: '#0000FF',
            color: '#FFFF00',
            padding: '0.5rem',
            fontWeight: 'bold',
            fontSize: 'clamp(18px, 2.8vmin, 28px)'
          }}>
            ═══ MAIN INDEX ═══
          </div>

          {/* Zone 100 */}
          <div
            onClick={() => goToZone(100)}
            style={{
              backgroundColor: '#000088',
              color: '#00FFFF',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>100</span> NEWS & TRUTH
          </div>

          {/* Zone 200 */}
          <div
            onClick={() => goToZone(200)}
            style={{
              backgroundColor: '#000000',
              color: '#FFD700',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>200</span> SYSTEM & AI
          </div>

          {/* Zone 300 */}
          <div
            onClick={() => goToZone(300)}
            style={{
              backgroundColor: '#330033',
              color: '#FF00FF',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>300</span> SOCIAL PULSE
          </div>

          {/* Zone 400 */}
          <div
            onClick={() => goToZone(400)}
            style={{
              backgroundColor: '#003300',
              color: '#00FF00',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>400</span> PLANET EARTH
          </div>

          {/* Zone 500 */}
          <div
            onClick={() => goToZone(500)}
            style={{
              backgroundColor: '#330000',
              color: '#FF0000',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>500</span> SECURITY SHIELD
          </div>

          {/* Zone 600 */}
          <div
            onClick={() => goToZone(600)}
            style={{
              backgroundColor: '#330033',
              color: '#FF00FF',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>600</span> CREATOR HUB
          </div>

          {/* Zone 700 */}
          <div
            onClick={() => goToZone(700)}
            style={{
              backgroundColor: '#333300',
              color: '#FFFF00',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>700</span> NOMAD LIFE
          </div>

          {/* Zone 800 */}
          <div
            onClick={() => goToZone(800)}
            style={{
              backgroundColor: '#222222',
              color: '#AAAAAA',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>800</span> FRANKENSTEIN
          </div>

          {/* Zone 900 */}
          <div
            onClick={() => goToZone(900)}
            style={{
              backgroundColor: '#111111',
              color: '#00FFFF',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: 'clamp(16px, 2.5vmin, 24px)'
            }}
          >
            <span style={{ color: '#FFFF00' }}>900</span> SYSTEM CONFIG
          </div>
        </div>

        {/* RIGHT: WIDGETS */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          
          {/* WEATHER BOX */}
          <div style={{
            backgroundColor: '#00FFFF',
            color: '#000000',
            padding: '0.5rem',
            fontSize: 'clamp(14px, 2.2vmin, 20px)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>
              ☀ WEATHER
            </div>
            <pre style={{ margin: 0, lineHeight: '1.2', fontFamily: 'VT323, monospace' }}>
{`    \\   /    
     .-.     
  ― (   ) ―  
     \`-'     
    /   \\    
  SUNNY 22°C`}
            </pre>
          </div>

          {/* ON THIS DAY */}
          <div style={{
            backgroundColor: '#FFFF00',
            color: '#000000',
            padding: '0.5rem',
            fontSize: 'clamp(13px, 2vmin, 18px)',
            flex: 1
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>
              📅 ON THIS DAY
            </div>
            <div style={{ lineHeight: '1.3' }}>
              {new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
              1969: Moon Landing<br/>
              1991: WWW Goes Public<br/>
              2077: AI Singularity
            </div>
          </div>

          {/* LIVE STATUS */}
          <div style={{
            backgroundColor: '#FF0000',
            color: '#FFFFFF',
            padding: '0.5rem',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 2.2vmin, 20px)',
            animation: 'pulse-red 1s infinite'
          }}>
            ● LIVE
          </div>

          {/* SPECIAL ACCESS */}
          <div
            onClick={() => goToZone(666)}
            style={{
              backgroundColor: '#000000',
              color: '#FF0000',
              padding: '0.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: 'clamp(13px, 2vmin, 18px)',
              border: '2px solid #FF0000'
            }}
          >
            <div style={{ fontWeight: 'bold' }}>⚠ RESTRICTED</div>
            <div style={{ fontSize: '0.8em' }}>666 GLITCH MODE</div>
          </div>
        </div>
      </div>

      {/* SCROLLING TICKER */}
      <div style={{
        backgroundColor: '#0000FF',
        color: '#FFFF00',
        padding: '0.3rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        fontSize: 'clamp(14px, 2.2vmin, 20px)',
        fontWeight: 'bold'
      }}>
        <div style={{
          display: 'inline-block',
          paddingLeft: '100%',
          animation: 'scroll-left 30s linear infinite'
        }}>
          {headlines.length > 0 ? (
            headlines.join(' ••• ')
          ) : (
            'LOADING LIVE HEADLINES FROM HACKERNEWS ••• CEEFAX 2077 ••• YOUR PORTAL TO THE FUTURE'
          )}
        </div>
      </div>

      {/* Ticker Animation */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
