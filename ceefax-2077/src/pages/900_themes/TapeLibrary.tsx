/**
 * Tape Library (Page 906)
 * VHS tape collection viewer
 * Select and play recorded memories
 */

import React from 'react';
import { VHSService } from '../../services/VHSService';
import type { VHSTape } from '../../services/VHSService';
import TeletextPage from '../../components/TeletextPage';

interface TapeLibraryProps {
  onPlayTape: (tapeId: string) => void;
}

export const TapeLibrary: React.FC<TapeLibraryProps> = ({ onPlayTape }) => {
  const [tapes, setTapes] = React.useState<VHSTape[]>([]);

  React.useEffect(() => {
    setTapes(VHSService.getAllTapes());
  }, []);

  const handleErase = (tapeId: string) => {
    if (confirm('Erase this tape? This cannot be undone.')) {
      VHSService.eraseTape(tapeId);
      setTapes(VHSService.getAllTapes());
    }
  };

  return (
    <TeletextPage
      title="VHS LIBRARY"
      subtitle={`> ${tapes.length}/12 TAPES • PRESS R TO RECORD`}
      footer="SYS > VHS_MEMORY: LOADED"
      zone={906}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Empty State */}
        {tapes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#666666' }}>
            <div style={{ fontSize: '2em', marginBottom: '0.5rem' }}>📼</div>
            <div>NO TAPES RECORDED</div>
            <div style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
              PRESS [R] ON ANY PAGE
            </div>
          </div>
        )}

        {/* Tape List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {tapes.map((tape) => {
            const degradation = VHSService.getDegradationLevel(tape);
            const wearColor = 
              tape.wear < 30 ? '#00FF00' :
              tape.wear < 60 ? '#FFFF00' :
              '#FF0000';

            return (
              <div
                key={tape.id}
                style={{
                  border: '1px solid #666666',
                  padding: '0.5rem',
                  backgroundColor: '#000000',
                  fontSize: '0.85em'
                }}
              >
                {/* Tape Header */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '0.25rem'
                }}>
                  <div style={{ color: '#00FFFF' }}>
                    📼 #{tape.id.slice(-4)} P{tape.pageNumber}
                  </div>
                  <div style={{ color: wearColor }}>
                    {Math.floor(tape.wear)}%
                  </div>
                </div>

                {/* Tape Info */}
                <div style={{ color: '#666666', fontSize: '0.9em', marginBottom: '0.25rem' }}>
                  {tape.label} • PLAYS:{tape.playCount}
                </div>

                {/* Degradation */}
                <div style={{ 
                  color: '#444444', 
                  fontSize: '0.8em',
                  marginBottom: '0.25rem'
                }}>
                  RGB:{degradation.chromatic.toFixed(1)} NOISE:{(degradation.noise * 100).toFixed(0)}%
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => onPlayTape(tape.id)}
                    style={{
                      flex: 1,
                      padding: '0.25rem',
                      backgroundColor: '#00CCCC',
                      color: '#000000',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9em',
                      fontWeight: 'bold'
                    }}
                  >
                    ▶ PLAY
                  </button>
                  <button
                    onClick={() => handleErase(tape.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#CC0000',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9em'
                    }}
                  >
                    DEL
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        {tapes.length > 0 && (
          <div style={{
            marginTop: '1rem',
            padding: '0.5rem',
            border: '1px solid #666666',
            fontSize: '0.7em',
            color: '#666666'
          }}>
            <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>VHS MEMORY:</div>
            <div>• TAPES DEGRADE WITH PLAYBACK</div>
            <div>• MAX 12 TAPES (AUTO-DELETE OLD)</div>
            <div>• PRESS [ESC] TO STOP PLAYBACK</div>
          </div>
        )}

      </div>
    </TeletextPage>
  );
};
