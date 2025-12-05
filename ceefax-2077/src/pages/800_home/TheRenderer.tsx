/**
 * TheRenderer - Page 805
 * "THE RENDERER" - Text-Based Web Browser via MCP
 * Browse modern websites converted to Teletext format
 */

import { useState } from 'react';
import TeletextPage from '../../components/TeletextPage';
import BrowserAgent, { type TeletextPage as BrowserPage } from '../../mcp/BrowserAgent';

export default function TheRenderer() {
  const [url, setUrl] = useState('');
  const [currentPage, setCurrentPage] = useState<BrowserPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bookmarks = BrowserAgent.getBookmarks();

  const handleNavigate = async (targetUrl: string) => {
    if (!targetUrl.trim()) {
      setError('ENTER A URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const page = await BrowserAgent.fetchPage(targetUrl);
      setCurrentPage(page);
      setUrl(targetUrl);
    } catch (err) {
      setError('FAILED TO LOAD PAGE');
      console.error('Navigation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (linkUrl: string) => {
    handleNavigate(linkUrl);
  };

  const renderContent = () => {
    if (!currentPage) return null;

    return (
      <div style={{ fontSize: '0.65em', lineHeight: '1.1', fontFamily: "'VT323', monospace" }}>
        {/* Title */}
        <div style={{
          color: '#FFFF00',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          borderBottom: '1px solid #666666',
          paddingBottom: '0.25rem'
        }}>
          {currentPage.title}
        </div>

        {/* Content */}
        <div style={{ color: '#FFFFFF', marginBottom: '0.5rem' }}>
          {currentPage.content.slice(0, 12).map((line, i) => (
            <div key={i} style={{ marginBottom: '0.1rem' }}>
              {line}
            </div>
          ))}
        </div>

        {/* Links */}
        {currentPage.links.length > 0 && (
          <div style={{ borderTop: '1px solid #666666', paddingTop: '0.25rem' }}>
            {currentPage.links.map(link => (
              <div
                key={link.id}
                onClick={() => handleLinkClick(link.url)}
                style={{
                  color: '#00FFFF',
                  cursor: 'pointer',
                  marginBottom: '0.1rem'
                }}
              >
                [{link.id}] {link.text}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <TeletextPage
      title="THE RENDERER"
      subtitle={currentPage ? `> ${currentPage.url.substring(0, 30)}` : '> TEXT-BASED WEB BROWSER'}
      footer="MCP BROWSER AGENT • ENTER URL"
      zone={805}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Address Bar */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ color: '#00FFFF', fontSize: '0.8em', marginBottom: '0.25rem' }}>
            URL:
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNavigate(url)}
              placeholder="https://..."
              style={{
                flex: 1,
                backgroundColor: '#000000',
                border: '1px solid #00FFFF',
                color: '#00FFFF',
                padding: '0.25rem 0.5rem',
                fontFamily: "'VT323', monospace",
                fontSize: '0.8em'
              }}
              disabled={loading}
            />
            <button
              onClick={() => handleNavigate(url)}
              disabled={loading}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: loading ? '#666666' : '#00CCCC',
                color: loading ? '#333333' : '#000000',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '0.8em'
              }}
            >
              {loading ? 'LOAD...' : 'GO'}
            </button>
          </div>
          {error && (
            <div style={{ color: '#FF0000', fontSize: '0.7em', marginTop: '0.25rem' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div style={{
          border: '2px solid #00FFFF',
          backgroundColor: '#000000',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          minHeight: '10rem',
          maxHeight: '10rem',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#00FFFF' }}>
              <div className="animate-pulse">🌐 FETCHING PAGE...</div>
              <div style={{ fontSize: '0.7em', marginTop: '0.5rem', color: '#666666' }}>
                STRIPPING HTML/CSS/JS
              </div>
            </div>
          ) : currentPage ? (
            renderContent()
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#666666' }}>
              <div style={{ fontSize: '2em', marginBottom: '0.5rem' }}>🌐</div>
              <div>ENTER URL TO BROWSE</div>
              <div style={{ fontSize: '0.7em', marginTop: '0.5rem' }}>
                MODERN WEB → 1980S TELETEXT
              </div>
            </div>
          )}
        </div>

        {/* Bookmarks */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          fontSize: '0.7em'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>BOOKMARKS:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.125rem' }}>
            {bookmarks.slice(0, 6).map((bookmark, i) => (
              <button
                key={i}
                onClick={() => handleNavigate(bookmark.url)}
                style={{
                  textAlign: 'left',
                  padding: '0.125rem 0.25rem',
                  backgroundColor: '#1a1a1a',
                  color: '#00FFFF',
                  border: '1px solid #333333',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                {bookmark.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          fontSize: '0.7em',
          color: '#666666'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>🌐 THE RENDERER:</div>
          <div>• STRIPS HTML/CSS/JAVASCRIPT</div>
          <div>• CONVERTS TO UPPERCASE TEXT</div>
          <div>• 40 CHARS PER LINE</div>
          <div>• NUMBERED LINK NAVIGATION</div>
        </div>

      </div>
    </TeletextPage>
  );
}
