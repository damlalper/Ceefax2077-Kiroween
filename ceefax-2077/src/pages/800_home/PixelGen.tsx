/**
 * PixelGen - AI to ASCII Art Generator (Page 803)
 * Text-to-Teletext: DALL-E's Grandfather
 * Converts AI images to 1980s teletext graphics
 */

import { useState } from 'react';
import TeletextGrid from '../../components/TeletextGrid';
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
    } catch (err) {
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
    <TeletextGrid>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="border-b border-cyan-500 pb-2">
          <h1 className="text-2xl font-bold text-cyan-400">
            🎨 PIXELGEN: TEXT-TO-TELETEXT
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            AI Image Generator → 1980s ASCII Art Converter
          </p>
        </div>

        {/* Input Section */}
        {!artGrid && (
          <div className="space-y-4">
            <div>
              <label className="block text-cyan-400 text-sm mb-2">
                Enter your prompt:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="e.g., Ghost in the machine"
                  className="flex-1 bg-black border border-cyan-500 text-cyan-400 px-3 py-2 font-mono focus:outline-none focus:border-cyan-300"
                  disabled={isGenerating}
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  {isGenerating ? 'GENERATING...' : 'GENERATE'}
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>
              )}
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div>
                <p className="text-gray-400 text-sm mb-2">
                  💡 Try these prompts:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {suggestions.slice(0, 9).map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(suggestion)}
                      className="text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 text-sm border border-gray-700 hover:border-cyan-500 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Info */}
            <div className="border border-gray-700 bg-gray-900 p-4 text-sm space-y-2">
              <div className="text-cyan-400 font-bold">
                🎨 HOW IT WORKS
              </div>
              <ul className="text-gray-400 space-y-1 list-disc list-inside">
                <li>AI generates image from your prompt (Pollinations.ai)</li>
                <li>Image converted to 40x24 teletext grid</li>
                <li>Colors mapped to 8-color teletext palette</li>
                <li>Brightness converted to block characters (█▓▒░)</li>
                <li>Rendered line-by-line like 1980s modem</li>
              </ul>
            </div>
          </div>
        )}

        {/* Generating Status */}
        {isGenerating && !artGrid && (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl animate-pulse">🎨</div>
            <div className="text-cyan-400 text-lg font-bold animate-pulse">
              GENERATING AI IMAGE...
            </div>
            <div className="text-gray-400 text-sm">
              Fetching from Pollinations.ai
            </div>
          </div>
        )}

        {/* ASCII Art Display */}
        {artGrid && (
          <div className="space-y-4">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-sm">
              <div className="text-cyan-400">
                {isGenerating ? (
                  <>
                    📡 DOWNLOADING: Line {currentLine}/24
                  </>
                ) : (
                  <>
                    ✅ COMPLETE: "{prompt}"
                  </>
                )}
              </div>
              <button
                onClick={handleReset}
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm transition-colors"
              >
                NEW IMAGE
              </button>
            </div>

            {/* ASCII Art Grid */}
            <div className="border border-cyan-500 bg-black p-2">
              <div className="font-mono text-xs leading-tight">
                {artGrid.map((row, y) => (
                  <div
                    key={y}
                    className="whitespace-nowrap"
                    style={{
                      opacity: y < currentLine ? 1 : 0.3,
                      transition: 'opacity 0.1s'
                    }}
                  >
                    {row.map((pixel, x) => (
                      <span
                        key={x}
                        style={{ color: pixel.color }}
                      >
                        {pixel.char}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            {!isGenerating && (
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div className="border border-gray-700 bg-gray-900 p-3">
                  <div className="text-cyan-400 font-bold">40x24</div>
                  <div className="text-gray-400 text-xs">Grid Size</div>
                </div>
                <div className="border border-gray-700 bg-gray-900 p-3">
                  <div className="text-cyan-400 font-bold">960</div>
                  <div className="text-gray-400 text-xs">Characters</div>
                </div>
                <div className="border border-gray-700 bg-gray-900 p-3">
                  <div className="text-cyan-400 font-bold">8</div>
                  <div className="text-gray-400 text-xs">Colors</div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="border border-gray-700 bg-gray-900 p-4 text-sm">
              <div className="text-cyan-400 font-bold mb-2">
                🎨 TELETEXT PALETTE
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FF0000' }}>█</span>
                  <span className="text-gray-400">RED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#00FF00' }}>█</span>
                  <span className="text-gray-400">GREEN</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FFFF00' }}>█</span>
                  <span className="text-gray-400">YELLOW</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#0000FF' }}>█</span>
                  <span className="text-gray-400">BLUE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FF00FF' }}>█</span>
                  <span className="text-gray-400">MAGENTA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#00FFFF' }}>█</span>
                  <span className="text-gray-400">CYAN</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#FFFFFF' }}>█</span>
                  <span className="text-gray-400">WHITE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ color: '#000000', backgroundColor: '#333' }}>█</span>
                  <span className="text-gray-400">BLACK</span>
                </div>
              </div>
              <div className="mt-3 text-gray-400 text-xs">
                Brightness: █ (full) ▓ (dark) ▒ (medium) ░ (light) · (empty)
              </div>
            </div>
          </div>
        )}
      </div>
    </TeletextGrid>
  );
}
