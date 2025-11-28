/**
 * Tape Library (Page 906)
 * VHS tape collection viewer
 * Select and play recorded memories
 */

import React from 'react';
import { VHSService } from '../../services/VHSService';
import type { VHSTape } from '../../services/VHSService';

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
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="border-b border-cyan-500 pb-2">
        <h1 className="text-2xl font-bold text-cyan-400">
          📼 VHS TAPE LIBRARY
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Press R on any page to record • {tapes.length}/12 tapes
        </p>
      </div>

      {/* Empty State */}
      {tapes.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">📼</div>
          <div className="text-gray-400">
            <p className="text-lg">No tapes recorded yet</p>
            <p className="text-sm mt-2">
              Navigate to any page and press <kbd className="px-2 py-1 bg-gray-700 rounded">R</kbd> to record
            </p>
          </div>
        </div>
      )}

      {/* Tape Shelf */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tapes.map((tape) => {
          const degradation = VHSService.getDegradationLevel(tape);
          const wearColor = 
            tape.wear < 30 ? 'text-green-400' :
            tape.wear < 60 ? 'text-yellow-400' :
            'text-red-400';

          return (
            <div
              key={tape.id}
              className="border border-gray-700 bg-gray-900 p-4 space-y-3 hover:border-cyan-500 transition-colors"
            >
              {/* Tape Label */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-cyan-400 font-bold text-sm">
                    📼 TAPE #{tape.id.slice(-4)}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {tape.label}
                  </div>
                </div>
              </div>

              {/* Tape Info */}
              <div className="text-xs space-y-1 text-gray-500">
                <div>Page: {tape.pageNumber}</div>
                <div>Recorded: {new Date(tape.timestamp).toLocaleDateString()}</div>
                <div>Plays: {tape.playCount}</div>
                <div className={wearColor}>
                  Wear: {Math.floor(tape.wear)}%
                  {tape.wear > 70 && ' ⚠️'}
                </div>
              </div>

              {/* Degradation Preview */}
              <div className="text-xs text-gray-600 border-t border-gray-800 pt-2">
                <div>RGB Shift: {degradation.chromatic.toFixed(1)}px</div>
                <div>Noise: {(degradation.noise * 100).toFixed(0)}%</div>
                <div>Tracking: {Math.floor(degradation.tracking)} lines</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => onPlayTape(tape.id)}
                  className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-bold transition-colors"
                >
                  ▶ PLAY
                </button>
                <button
                  onClick={() => handleErase(tape.id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm transition-colors"
                  title="Erase tape"
                >
                  🗑️
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Instructions */}
      <div className="border border-gray-700 bg-gray-900 p-4 text-sm space-y-2">
        <div className="text-cyan-400 font-bold">📼 VHS MEMORY GUIDE</div>
        <ul className="text-gray-400 space-y-1 list-disc list-inside">
          <li>Press <kbd className="px-1 bg-gray-700">R</kbd> on any page to record to tape</li>
          <li>Tapes degrade with each playback (authentic VHS experience)</li>
          <li>More plays = more chromatic aberration & tracking noise</li>
          <li>Maximum 12 tapes (oldest auto-deleted when full)</li>
          <li>Press <kbd className="px-1 bg-gray-700">ESC</kbd> during playback to stop</li>
        </ul>
      </div>
    </div>
  );
};
