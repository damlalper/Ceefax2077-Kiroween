/**
 * Narrator Service - Steering & Intelligence Category
 * Emotional text-to-speech engine that adapts voice based on zone personality
 */

import type { PersonalityType } from './PersonalityService';

export interface VoiceSettings {
  pitch: number;      // 0-2 (1 is normal)
  rate: number;       // 0.1-10 (1 is normal)
  volume: number;     // 0-1 (1 is max)
  voice?: SpeechSynthesisVoice;
}

export interface EmotionalProfile {
  personality: PersonalityType;
  settings: VoiceSettings;
  description: string;
}

class NarratorServiceClass {
  private synth: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isEnabled: boolean = false;
  private emotionalProfiles: Map<PersonalityType, EmotionalProfile>;

  constructor() {
    this.synth = window.speechSynthesis;
    this.emotionalProfiles = new Map();
    this.initializeEmotionalProfiles();
  }

  private initializeEmotionalProfiles() {
    // News Anchor - Professional, authoritative
    this.emotionalProfiles.set('anchor', {
      personality: 'anchor',
      settings: {
        pitch: 1.0,
        rate: 0.9,
        volume: 1.0
      },
      description: 'Professional news anchor voice'
    });

    // Gossip Girl - Fast, high-pitched, dramatic
    this.emotionalProfiles.set('gossip', {
      personality: 'gossip',
      settings: {
        pitch: 1.3,
        rate: 1.2,
        volume: 1.0
      },
      description: 'Dramatic, fast-talking gossip voice'
    });

    // Rogue AI - Robotic, monotone, slightly low
    this.emotionalProfiles.set('rogue', {
      personality: 'rogue',
      settings: {
        pitch: 0.8,
        rate: 0.85,
        volume: 0.9
      },
      description: 'Paranoid AI warning voice'
    });

    // SysAdmin - Cold, robotic, fast
    this.emotionalProfiles.set('sysadmin', {
      personality: 'sysadmin',
      settings: {
        pitch: 0.7,
        rate: 1.1,
        volume: 0.8
      },
      description: 'Cold robotic terminal voice'
    });

    // Demon - Deep, slow, menacing
    this.emotionalProfiles.set('demon', {
      personality: 'demon',
      settings: {
        pitch: 0.3,    // Very low pitch
        rate: 0.6,     // Slow and menacing
        volume: 1.0
      },
      description: 'Demonic, corrupted entity voice'
    });

    // Neutral - Standard voice
    this.emotionalProfiles.set('neutral', {
      personality: 'neutral',
      settings: {
        pitch: 1.0,
        rate: 1.0,
        volume: 1.0
      },
      description: 'Standard system voice'
    });
  }

  /**
   * Check if speech synthesis is supported
   */
  isSupported(): boolean {
    return 'speechSynthesis' in window;
  }

  /**
   * Enable narrator
   */
  enable() {
    this.isEnabled = true;
    localStorage.setItem('narrator_enabled', 'true');
  }

  /**
   * Disable narrator
   */
  disable() {
    this.isEnabled = false;
    this.stop();
    localStorage.setItem('narrator_enabled', 'false');
  }

  /**
   * Toggle narrator on/off
   */
  toggle(): boolean {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
    return this.isEnabled;
  }

  /**
   * Check if narrator is enabled
   */
  getEnabled(): boolean {
    // Check localStorage on first call
    if (!this.isEnabled) {
      const stored = localStorage.getItem('narrator_enabled');
      this.isEnabled = stored === 'true';
    }
    return this.isEnabled;
  }

  /**
   * Get emotional profile for personality
   */
  getEmotionalProfile(personality: PersonalityType): EmotionalProfile {
    return this.emotionalProfiles.get(personality) || this.emotionalProfiles.get('neutral')!;
  }

  /**
   * Speak text with emotional voice based on personality
   */
  speak(text: string, personality: PersonalityType = 'neutral') {
    if (!this.isEnabled || !this.isSupported()) {
      return;
    }

    // Stop any current speech
    this.stop();

    // Clean text for speech
    const cleanText = this.cleanTextForSpeech(text);
    
    if (!cleanText.trim()) {
      return;
    }

    // Get emotional profile
    const profile = this.getEmotionalProfile(personality);

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Apply emotional settings
    utterance.pitch = profile.settings.pitch;
    utterance.rate = profile.settings.rate;
    utterance.volume = profile.settings.volume;

    // Select voice (prefer English voices)
    const voices = this.synth.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    // Store current utterance for tracking
    this.currentUtterance = utterance;

    // Add event listeners
    utterance.onend = () => {
      this.currentUtterance = null;
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
    };

    // Speak
    this.synth.speak(utterance);
  }

  /**
   * Clean text for speech synthesis
   */
  private cleanTextForSpeech(text: string): string {
    return text
      // Remove special characters and emojis
      .replace(/[^\w\s.,!?-]/g, '')
      // Remove multiple spaces
      .replace(/\s+/g, ' ')
      // Remove Zalgo diacritics
      .replace(/[\u0300-\u036f]/g, '')
      // Limit length
      .substring(0, 500)
      .trim();
  }

  /**
   * Stop current speech
   */
  stop() {
    if (this.synth.speaking) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
  }

  /**
   * Pause current speech
   */
  pause() {
    if (this.synth.speaking) {
      this.synth.pause();
    }
  }

  /**
   * Resume paused speech
   */
  resume() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  /**
   * Check if currently speaking
   */
  isSpeaking(): boolean {
    return this.synth.speaking;
  }

  /**
   * Get current text being spoken
   */
  getCurrentText(): string | null {
    return this.currentUtterance?.text || null;
  }

  /**
   * Get available voices
   */
  getVoices(): SpeechSynthesisVoice[] {
    return this.synth.getVoices();
  }

  /**
   * Announce page change
   */
  announcePage(pageNumber: number, personality: PersonalityType) {
    const zone = Math.floor(pageNumber / 100) * 100;
    const announcement = `Page ${pageNumber}. Zone ${zone}.`;
    this.speak(announcement, personality);
  }

  /**
   * Read headline or main content
   */
  readContent(content: string, personality: PersonalityType) {
    this.speak(content, personality);
  }
}

// Singleton instance
export const NarratorService = new NarratorServiceClass();
