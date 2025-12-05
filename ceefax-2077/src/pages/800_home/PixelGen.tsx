/**
 * PixelGen - AI to ASCII Art Generator (Page 803)
 * Text-to-Teletext: DALL-E's Grandfather
 * Converts AI images to 1980s teletext graphics
 */

import { useState } from 'react';
import TeletextPage from '../../components/TeletextPage';
import { GenerativeArtService } from '../../services/GenerativeArtService';
import type { TeletextPixel } from '../../services/GenerativeArtService';

export default function PixelGen() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [artGrid, setArtGrid] = useState<TeletextPixel[][] | null>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = GenerativeArtService.getPromptSuggestions();

  /**
   * Generate ASCII art from prompt
   */
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setArtGrid(null);
    setCurrentLine(0);
    setShowSuggestions(false);

    try {
      // Play modem sound effect (simulated)
      playModemSound();

      // Generate art
      const grid = await GenerativeArtService.generateTeletextArt(prompt);
      setArtGrid(grid);

      // Animate line-by-line rendering
      animateRendering(grid.length);
    } catch {
      setError('Failed to generate art. Try another prompt.');
      setIsGenerating(false);
    }
  };

  /**
   * Animate line-by-line rendering (1980s modem style)
   */
  const animateRendering = (totalLines: number) => {
    let line = 0;
    const interval = setInterval(() => {
      line++;
      setCurrentLine(line);

      if (line >= totalLines) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 100); // 100ms per line = ~2.4 seconds total
  };

  /**
   * Simulate modem sound (visual feedback)
   */
  const playModemSound = () => {
    // In a real implementation, you could use Web Audio API
    console.log('🔊 MODEM SOUND: Downloading image...');
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion);
    setShowSuggestions(false);
  };

  /**
   * Reset to start over
   */
  const handleReset = () => {
    setPrompt('');
    setArtGrid(null);
    setCurrentLine(0);
    setError('');
    setShowSuggestions(true);
    setIsGenerating(false);
  };

  return (
    <TeletextPage
      title="PIXELGEN"
      subtitle={artGrid ? `> ${prompt.slice(0, 30)}` : '> AI TO ASCII CONVERTER'}
      footer={isGenerating ? 'GENERATING...' : 'POLLINATIONS.AI • 40×24 GRID'}
      zone={803}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Input Section */}
        {!artGrid && (
          <div>
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ color: '#00FFFF', fontSize: '0.9em', marginBottom: '0.25rem' }}>
                PROMPT:
              </div>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="Ghost in the machine..."
                  style={{
                    flex: 1,
                    backgroundColor: '#000000',
                    border: '1px solid #00FFFF',
                    color: '#00FFFF',
                    padding: '0.25rem 0.5rem',
                    fontFamily: "'VT323', monospace",
                    fontSize: '0.9em'
                  }}
                  disabled={isGenerating}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: isGenerating ? '#666666' : '#00CCCC',
                    color: isGenerating ? '#333333' : '#000000',
                    border: 'none',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9em'
                  }}
                >
                  {isGenerating ? 'GEN...' : 'GO'}
                </button>
              </div>
              {error && (
                <div style={{ color: '#FF0000', fontSize: '0.7em', marginTop: '0.25rem' }}>
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ color: '#666666', fontSize: '0.8em', marginBottom: '0.25rem' }}>
                  TRY:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem' }}>
                  {suggestions.slice(0, 6).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(suggestion)}
                      style={{
                        textAlign: 'left',
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#1a1a1a',
                        color: '#00FFFF',
                        fontSize: '0.7em',
                        border: '1px solid #333333',
                        cursor: 'pointer'
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div style={{
              border: '1px solid #666666',
              padding: '0.5rem',
              fontSize: '0.7em',
              color: '#666666'
            }}>
              <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>HOW IT WORKS:</div>
              <div>• AI GENERATES IMAGE</div>
              <div>• CONVERTS TO 40×24 GRID</div>
              <div>• 8-COLOR PALETTE</div>
              <div>• MODEM-STYLE RENDER</div>
            </div>
          </div>
        )}

        {/* Generating Status */}
        {isGenerating && !artGrid && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3em', marginBottom: '0.5rem' }} className="animate-pulse">🎨</div>
            <div style={{ color: '#00FFFF', fontSize: '1em', fontWeight: 'bold' }} className="animate-pulse">
              GENERATING...
            </div>
            <div style={{ color: '#666666', fontSize: '0.7em', marginTop: '0.25rem' }}>
              POLLINATIONS.AI
            </div>
          </div>
        )}

        {/* ASCII Art Display */}
        {artGrid && (
          <div>
            {/* Status Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.8em'
            }}>
              <div style={{ color: '#00FFFF' }}>
                {isGenerating ? `📡 ${currentLine}/24` : '✓ COMPLETE'}
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.125rem 0.5rem',
                  backgroundColor: '#666666',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                NEW
              </button>
            </div>

            {/* ASCII Art Grid */}
            <div style={{
              border: '2px solid #00FFFF',
              backgroundColor: '#000000',
              padding: '0.25rem',
              marginBottom: '0.5rem'
            }}>
              <div style={{ fontFamily: "'VT323', monospace", fontSize: '0.6em', lineHeight: '1' }}>
                {artGrid.map((row, y) => (
                  <div
                    key={y}
                    style={{
                      whiteSpace: 'nowrap',
                      opacity: y < currentLine ? 1 : 0.3,
                      transition: 'opacity 0.1s'
                    }}
                  >
                    {row.map((pixel, x) => (
                      <span key={x} style={{ color: pixel.color }}>
                        {pixel.char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            {!isGenerating && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.25rem',
                textAlign: 'center',
                fontSize: '0.7em',
                marginBottom: '0.5rem'
              }}>
                <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
                  <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>40×24</div>
                  <div style={{ color: '#666666', fontSize: '0.9em' }}>GRID</div>
                </div>
                <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
                  <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>960</div>
                  <div style={{ color: '#666666', fontSize: '0.9em' }}>CHARS</div>
                </div>
                <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
                  <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>8</div>
                  <div style={{ color: '#666666', fontSize: '0.9em' }}>COLORS</div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </TeletextPage>
  );
}
