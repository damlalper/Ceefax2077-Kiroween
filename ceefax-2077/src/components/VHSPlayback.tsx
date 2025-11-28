/**
 * VHS Playback Overlay
 * Chromatic aberration, tracking noise, scan lines
 * Simulates worn-out video cassette playback
 */

import React, { useEffect, useState } from 'react';
import { VHSService } from '../services/VHSService';
import type { VHSTape } from '../services/VHSService';

interface VHSPlaybackProps {
  tape: VHSTape;
  onStop: () => void;
}

export const VHSPlayback: React.FC<VHSPlaybackProps> = ({ tape, onStop }) => {
  const [trackingOffset, setTrackingOffset] = useState(0);
  const degradation = VHSService.getDegradationLevel(tape);

  // Animate tracking lines
  useEffect(() => {
    const interval = setInterval(() => {
      setTrackingOffset(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* VHS Content with Chromatic Aberration */}
      <div 
        className="vhs-content"
        style={{
          '--chromatic-shift': `${degradation.chromatic}px`,
          '--noise-opacity': degradation.noise,
        } as React.CSSProperties}
      >
        <div className="vhs-layer vhs-red">
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
            {tape.content}
          </pre>
        </div>
        <div className="vhs-layer vhs-green">
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
            {tape.content}
          </pre>
        </div>
        <div className="vhs-layer vhs-blue">
          <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
            {tape.content}
          </pre>
        </div>
      </div>

      {/* Tracking Noise Lines */}
      {Array.from({ length: Math.floor(degradation.tracking) }).map((_, i) => (
        <div
          key={i}
          className="vhs-tracking-line"
          style={{
            top: `${(trackingOffset + i * 20) % 100}%`,
          }}
        />
      ))}

      {/* Scan Lines */}
      <div className="vhs-scanlines" />

      {/* Static Noise */}
      <div 
        className="vhs-noise"
        style={{ opacity: degradation.noise }}
      />

      {/* VHS UI Overlay */}
      <div className="absolute top-4 left-4 text-white font-mono text-sm space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-red-500 animate-pulse">▶ PLAY</span>
          <span className="opacity-70">{tape.label}</span>
        </div>
        <div className="opacity-50">
          Plays: {tape.playCount} | Wear: {Math.floor(tape.wear)}%
        </div>
      </div>

      {/* Stop Button */}
      <button
        onClick={onStop}
        className="absolute bottom-4 right-4 px-4 py-2 bg-red-600 text-white font-mono hover:bg-red-700 transition-colors"
      >
        ⏹ STOP [ESC]
      </button>

      <style>{`
        .vhs-content {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: auto;
        }

        .vhs-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          mix-blend-mode: screen;
        }

        .vhs-red {
          color: #ff0000;
          transform: translateX(calc(var(--chromatic-shift) * -1));
          filter: blur(0.5px);
        }

        .vhs-green {
          color: #00ff00;
          transform: translateX(0);
        }

        .vhs-blue {
          color: #0000ff;
          transform: translateX(var(--chromatic-shift));
          filter: blur(0.5px);
        }

        .vhs-tracking-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transition: top 0.1s linear;
        }

        .vhs-scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.15) 1px,
            transparent 1px,
            transparent 2px
          );
          pointer-events: none;
        }

        .vhs-noise {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E");
          animation: vhs-noise 0.2s infinite;
          pointer-events: none;
        }

        @keyframes vhs-noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(2%, 1%); }
          30% { transform: translate(-1%, 2%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(2%, -2%); }
          70% { transform: translate(-1%, -1%); }
          80% { transform: translate(1%, 2%); }
          90% { transform: translate(-2%, -1%); }
        }
      `}</style>
    </div>
  );
};
