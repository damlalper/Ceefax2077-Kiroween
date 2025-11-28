import { useState } from 'react';
import { WaybackAgent } from '../../mcp/WaybackAgent';
import type { TeletextPage } from '../../mcp/WaybackAgent';

type LoadingState = 'idle' | 'dialing' | 'loading' | 'success' | 'error';

export default function TimeMachine() {
  const [url, setUrl] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [page, setPage] = useState<TeletextPage | null>(null);
  const [error, setError] = useState('');
  const [dialingProgress, setDialingProgress] = useState(0);

  const popularSites = WaybackAgent.getPopularSites();

  const dialUpAnimation = async () => {
    setLoadingState('dialing');
    setDialingProgress(0);

    // Simulate dial-up connection with progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setDialingProgress(i);
    }
  };

  const loadWebsite = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;

    setError('');
    setPage(null);

    // Dial-up animation
    await dialUpAnimation();

    // Loading state
    setLoadingState('loading');

    try {
      const result = await WaybackAgent.loadUrl(targetUrl);

      if (result) {
        setPage(result);
        setLoadingState('success');
      } else {
        setError('NO ARCHIVE FOUND FOR THIS URL');
        setLoadingState('error');
      }
    } catch (err) {
      setError('CONNECTION FAILED - TRY AGAIN');
      setLoadingState('error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadWebsite(url);
  };

  const loadPopularSite = (siteUrl: string) => {
    setUrl(siteUrl);
    loadWebsite(siteUrl);
  };

  const renderDialingAnimation = () => {
    const modemSounds = [
      '♪ BEEP BEEP BEEP ♪',
      '♫ SCREECH SCREECH ♫',
      '♪ KSHHHHH KSHHHHH ♪',
      '♫ BONG BONG BONG ♫'
    ];

    const currentSound = modemSounds[Math.floor(dialingProgress / 25) % modemSounds.length];

    return (
      <div style={{ textAlign: 'center', color: '#00FFFF' }}>
        <div style={{ fontSize: '1.5em', marginBottom: '20px' }}>
          DIALING UP...
        </div>

        <div style={{ marginBottom: '20px', fontSize: '1.2em', color: '#FFFF00' }}>
          {currentSound}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <pre style={{ margin: 0 }}>
{`
    ╔════════════════════════════╗
    ║  📞 MODEM CONNECTION 📞   ║
    ╚════════════════════════════╝
`}
          </pre>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '10px' }}>
          {'█'.repeat(Math.floor(dialingProgress / 5))}
          {'░'.repeat(20 - Math.floor(dialingProgress / 5))}
        </div>

        <div style={{ color: '#00FF00' }}>
          {dialingProgress}% CONNECTED
        </div>

        <div style={{ marginTop: '20px', fontSize: '0.8em', color: '#666' }}>
          <div>Connecting to Internet Archive...</div>
          <div>Searching for 1999 snapshot...</div>
          <div>Please wait, this may take a moment...</div>
        </div>
      </div>
    );
  };

  const renderLoadingAnimation = () => {
    return (
      <div style={{ textAlign: 'center', color: '#FFFF00' }}>
        <div style={{ fontSize: '1.3em', marginBottom: '15px' }}>
          DOWNLOADING PAGE...
        </div>
        <div style={{ animation: 'blink 0.5s infinite' }}>
          ⟳ PARSING HTML ⟳
        </div>
        <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#00FFFF' }}>
          Converting to Teletext format...
        </div>
      </div>
    );
  };

  const renderPage = () => {
    if (!page) return null;

    return (
      <div>
        {/* Page Title */}
        <div style={{
          color: '#FFD700',
          fontSize: '1.2em',
          marginBottom: '10px',
          textAlign: 'center',
          borderBottom: '2px solid #FFD700',
          paddingBottom: '5px'
        }}>
          {page.title}
        </div>

        {/* Archive Info */}
        <div style={{
          color: '#00FFFF',
          fontSize: '0.75em',
          marginBottom: '15px',
          textAlign: 'center'
        }}>
          ARCHIVED FROM: {page.originalUrl}
        </div>

        {/* Content */}
        <div style={{
          color: '#FFFFFF',
          fontSize: '0.85em',
          marginBottom: '15px',
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #666',
          fontFamily: 'monospace',
          lineHeight: '1.4'
        }}>
          {page.content.map((line, index) => (
            <div key={index}>
              {line || '\u00A0'}
            </div>
          ))}
        </div>

        {/* Links */}
        {page.links.length > 0 && (
          <div style={{ marginTop: '15px' }}>
            <div style={{
              color: '#FFD700',
              marginBottom: '5px',
              fontSize: '0.9em'
            }}>
              LINKS FOUND ({page.links.length}):
            </div>
            <div style={{ fontSize: '0.8em' }}>
              {page.links.map((link, index) => (
                <div
                  key={index}
                  style={{
                    color: '#00FFFF',
                    padding: '2px 5px',
                    cursor: 'pointer'
                  }}
                  onClick={() => loadWebsite(link.url)}
                >
                  [{index + 1}] {link.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div style={{ marginTop: '15px', textAlign: 'center' }}>
          <button
            onClick={() => {
              setLoadingState('idle');
              setPage(null);
            }}
            style={{
              background: '#333',
              color: '#00FF00',
              border: '1px solid #00FF00',
              padding: '5px 15px',
              cursor: 'pointer',
              fontFamily: 'monospace'
            }}
          >
            ← BACK TO TIME MACHINE
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        color: '#00FFFF',
        fontSize: '1.3em',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        <pre style={{ lineHeight: '1.2', margin: 0 }}>
{`
╔════════════════════════════════════╗
║      🕰️  THE TIME MACHINE  🕰️     ║
║    WAYBACK TO 1999 INTERNET       ║
╚════════════════════════════════════╝
`}
        </pre>
      </div>

      {loadingState === 'idle' && (
        <>
          {/* Description */}
          <div style={{
            color: '#FFFFFF',
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '0.85em'
          }}>
            Browse archived websites from 1999
            <br />
            Converted to Teletext format
          </div>

          {/* Address Bar */}
          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <div style={{
              color: '#FFD700',
              marginBottom: '5px',
              fontSize: '0.9em'
            }}>
              ENTER URL:
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com"
                style={{
                  flex: 1,
                  background: '#000',
                  color: '#00FF00',
                  border: '1px solid #00FF00',
                  padding: '8px',
                  fontFamily: 'monospace',
                  fontSize: '1em'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#00FF00',
                  color: '#000',
                  border: 'none',
                  padding: '8px 15px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  fontWeight: 'bold'
                }}
              >
                GO
              </button>
            </div>
          </form>

          {/* Popular Sites */}
          <div>
            <div style={{
              color: '#FFD700',
              marginBottom: '10px',
              fontSize: '1em'
            }}>
              POPULAR 1999 SITES:
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '5px',
              fontSize: '0.85em'
            }}>
              {popularSites.map((site, index) => (
                <div
                  key={index}
                  onClick={() => loadPopularSite(site.url)}
                  style={{
                    background: '#333',
                    color: '#00FFFF',
                    padding: '8px',
                    cursor: 'pointer',
                    border: '1px solid #666',
                    textAlign: 'center'
                  }}
                >
                  {site.name}
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #666',
            color: '#00FFFF',
            fontSize: '0.8em'
          }}>
            <div style={{ color: '#FFD700', marginBottom: '5px' }}>
              HOW IT WORKS:
            </div>
            <div>• Enter any website URL</div>
            <div>• We fetch it from Internet Archive</div>
            <div>• HTML is stripped and converted</div>
            <div>• Displayed in pure Teletext format</div>
            <div>• Experience the web like it's 1999!</div>
          </div>
        </>
      )}

      {loadingState === 'dialing' && renderDialingAnimation()}
      {loadingState === 'loading' && renderLoadingAnimation()}
      {loadingState === 'success' && renderPage()}
      
      {loadingState === 'error' && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            color: '#FF0000',
            fontSize: '1.3em',
            marginBottom: '15px'
          }}>
            ✗ ERROR ✗
          </div>
          <div style={{ color: '#FFFFFF', marginBottom: '20px' }}>
            {error}
          </div>
          <button
            onClick={() => setLoadingState('idle')}
            style={{
              background: '#333',
              color: '#00FF00',
              border: '1px solid #00FF00',
              padding: '8px 20px',
              cursor: 'pointer',
              fontFamily: 'monospace'
            }}
          >
            TRY AGAIN
          </button>
        </div>
      )}
    </div>
  );
}
