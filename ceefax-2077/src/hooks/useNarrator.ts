import { useEffect, useState } from 'react';
import { NarratorService } from '../services/NarratorService';
import { useTeletext } from '../context/TeletextContext';

/**
 * Narrator Hook - Automatic text-to-speech with emotional voice
 */
export function useNarrator() {
  const { currentPage, currentPersonality } = useTeletext();
  const [isEnabled, setIsEnabled] = useState(NarratorService.getEnabled());

  // Announce page changes
  useEffect(() => {
    if (isEnabled) {
      // Small delay to let page content load
      const timer = setTimeout(() => {
        NarratorService.announcePage(currentPage, currentPersonality.type);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentPage, currentPersonality, isEnabled]);

  const toggle = () => {
    const newState = NarratorService.toggle();
    setIsEnabled(newState);
    
    if (newState) {
      // Announce activation
      NarratorService.speak('Narrator enabled', currentPersonality.type);
    }
  };

  const speak = (text: string) => {
    NarratorService.speak(text, currentPersonality.type);
  };

  const stop = () => {
    NarratorService.stop();
  };

  return {
    isEnabled,
    toggle,
    speak,
    stop,
    isSpeaking: NarratorService.isSpeaking()
  };
}
