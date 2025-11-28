/**
 * VHS Recording Hook
 * Press 'R' to record current page to tape
 * Manages recording state and playback mode
 */

import { useState, useEffect, useCallback } from 'react';
import { VHSService } from '../services/VHSService';
import type { VHSTape } from '../services/VHSService';

export const useVHS = (currentPage: number, pageContent: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaybackMode, setIsPlaybackMode] = useState(false);
  const [currentTape, setCurrentTape] = useState<VHSTape | null>(null);

  /**
   * Record current page to tape
   */
  const recordToTape = useCallback(() => {
    // Show REC indicator
    setIsRecording(true);
    
    const tape = VHSService.recordToTape(currentPage, pageContent);
    
    // Blink REC indicator for 2 seconds
    setTimeout(() => {
      setIsRecording(false);
    }, 2000);

    return tape;
  }, [currentPage, pageContent]);

  /**
   * Play tape with degradation effects
   */
  const playTape = useCallback((tapeId: string) => {
    const tape = VHSService.playTape(tapeId);
    if (tape) {
      setCurrentTape(tape);
      setIsPlaybackMode(true);
    }
  }, []);

  /**
   * Stop playback
   */
  const stopPlayback = useCallback(() => {
    setIsPlaybackMode(false);
    setCurrentTape(null);
  }, []);

  /**
   * Keyboard shortcut: R to record
   */
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // R key to record (not in input fields)
      if (e.key.toLowerCase() === 'r' && 
          !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        recordToTape();
      }

      // ESC to stop playback
      if (e.key === 'Escape' && isPlaybackMode) {
        stopPlayback();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [recordToTape, isPlaybackMode, stopPlayback]);

  return {
    isRecording,
    isPlaybackMode,
    currentTape,
    recordToTape,
    playTape,
    stopPlayback,
    tapeLibrary: VHSService.getAllTapes()
  };
};
