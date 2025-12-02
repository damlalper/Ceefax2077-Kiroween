/**
 * Personality Service - Steering & Intelligence Category
 * Manages zone-specific AI personas and voice transformations
 * NOW LOADS ACTUAL .kiro/steering/*.md FILES!
 */

import type { CrisisReason } from '../types/crisis';
import { SteeringLoader } from './SteeringLoader';

export type PersonalityType = 'anchor' | 'gossip' | 'rogue' | 'sysadmin' | 'demon' | 'neutral';
export type PersonalityMode = 'normal' | 'crisis' | 'quiet';

export interface Personality {
  type: PersonalityType;
  name: string;
  description: string;
  zone: number;
  transformText: (text: string) => string;
  steeringLoaded: boolean; // NEW: Track if steering file is loaded
}

class PersonalityServiceClass {
  private personalities: Map<number, Personality> = new Map();
  private originalTransforms: Map<number, (text: string) => string> = new Map();
  private currentMode: PersonalityMode = 'normal';

  constructor() {
    this.initializePersonalities();
    this.logSteeringStatus();
  }

  /**
   * Log which steering files are loaded
   */
  private logSteeringStatus(): void {
    const loaded = SteeringLoader.getAllConfigs();
    console.log(`✅ Loaded ${loaded.length} steering files from .kiro/steering/:`);
    loaded.forEach(config => {
      console.log(`   - Zone ${config.zone}: ${config.name} (${config.vocabulary.length} vocab words)`);
    });
  }

  private initializePersonalities() {
    // Zone 100: News Anchor (Professional, Neutral)
    // NOW USES REAL STEERING FILE!
    const zone100Steering = SteeringLoader.getSteeringForZone(100);
    this.personalities.set(100, {
      type: 'anchor',
      name: 'News Anchor',
      description: 'Professional BBC-style news presenter',
      zone: 100,
      steeringLoaded: !!zone100Steering,
      transformText: (text: string) => {
        let transformed = text.toUpperCase();
        
        // Use steering vocabulary if available
        const vocabulary = SteeringLoader.getVocabulary(100);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add journalistic phrases
        if (transformed.includes('BREAKING')) {
          transformed = `⚡ ${transformed}`;
        }
        
        // Remove casual language
        transformed = transformed
          .replace(/LOL|LMAO|OMG/gi, '')
          .replace(/!{2,}/g, '.')
          .trim();
        
        return transformed;
      }
    });

    // Zone 200: Crypto Trader (Paranoid, Technical)
    // NOW USES REAL STEERING FILE!
    const zone200Steering = SteeringLoader.getSteeringForZone(200);
    this.personalities.set(200, {
      type: 'rogue',
      name: 'Crypto Trader',
      description: 'Paranoid crypto trader',
      zone: 200,
      steeringLoaded: !!zone200Steering,
      transformText: (text: string) => {
        let transformed = text.toUpperCase();
        
        // Use steering vocabulary
        const vocabulary = SteeringLoader.getVocabulary(200);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add crypto emojis
        if (transformed.includes('BITCOIN') || transformed.includes('CRYPTO')) {
          transformed = `🚀 ${transformed}`;
        }
        if (transformed.includes('CRASH') || transformed.includes('DOWN')) {
          transformed = `📉 ${transformed}`;
        }
        
        return transformed;
      }
    });

    // Zone 300: Gossip Girl (Dramatic, Toxic)
    // NOW USES REAL STEERING FILE!
    const zone300Steering = SteeringLoader.getSteeringForZone(300);
    this.personalities.set(300, {
      type: 'gossip',
      name: 'Gossip Girl',
      description: 'Toxic Gen Z gossip personality',
      zone: 300,
      steeringLoaded: !!zone300Steering,
      transformText: (text: string) => {
        let transformed = text.toUpperCase();
        
        // Use steering vocabulary
        const vocabulary = SteeringLoader.getVocabulary(300);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add drama and emojis
        const emojis = ['💀', '😭', '🚨', '💅', '☕'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Add emphasis
        transformed = transformed.replace(/\b(BREAKING|DRAMA|TEA|BESTIE)\b/g, '🚨 $1 🚨');
        
        return `${randomEmoji} ${transformed} ${randomEmoji}`;
      }
    });

    // Zone 666: Demon (Corrupted, Threatening)
    // NOW USES REAL STEERING FILE!
    const zone666Steering = SteeringLoader.getSteeringForZone(666);
    this.personalities.set(666, {
      type: 'demon',
      name: 'Corrupted Entity',
      description: 'Malevolent glitch demon',
      zone: 666,
      steeringLoaded: !!zone666Steering,
      transformText: (text: string) => {
        let transformed = text.toUpperCase();
        
        // Use steering vocabulary for demon speak
        const vocabulary = SteeringLoader.getVocabulary(666);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Apply glitch effects
        const glitchChars = ['̴', '̷', '̸', '̵', '̶'];
        const words = transformed.split(' ');
        
        transformed = words.map(word => {
          // Randomly glitch some characters
          return word.split('').map(char => {
            if (Math.random() > 0.7) {
              const glitch = glitchChars[Math.floor(Math.random() * glitchChars.length)];
              return char + glitch;
            }
            return char;
          }).join('');
        }).join(' ');
        
        // Add binary or hex codes
        if (Math.random() > 0.5) {
          transformed += ' 0x666';
        }
        
        return transformed;
      }
    });

    // Zone 900: SysAdmin (Cold, Technical)
    // NOW USES REAL STEERING FILE!
    const zone900Steering = SteeringLoader.getSteeringForZone(900);
    this.personalities.set(900, {
      type: 'sysadmin',
      name: 'System Administrator',
      description: 'Cold robotic terminal',
      zone: 900,
      steeringLoaded: !!zone900Steering,
      transformText: (text: string) => {
        let transformed = text.toUpperCase();
        
        // Use steering vocabulary for sysadmin speak
        const vocabulary = SteeringLoader.getVocabulary(900);
        vocabulary.forEach(word => {
          if (word.includes(':')) {
            const [from, to] = word.split(':');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add system prefixes
        transformed = `> ${transformed}`;
        
        // Replace common words with abbreviations
        transformed = transformed
          .replace(/PLEASE/g, '')
          .replace(/THANK YOU/g, 'ACK')
          .replace(/ERROR/g, 'ERR')
          .replace(/SUCCESS/g, 'OK')
          .replace(/LOADING/g, 'PROC')
          .trim();
        
        return `${transformed}\n> STATUS: OK\n> END_TRANSMISSION`;
      }
    });

    // Zone 400: Climate Scientist (NEW!)
    const zone400Steering = SteeringLoader.getSteeringForZone(400);
    this.personalities.set(400, {
      type: 'neutral',
      name: 'Climate Scientist',
      description: 'Urgent environmental expert',
      zone: 400,
      steeringLoaded: !!zone400Steering,
      transformText: (text: string) => {
        let transformed = text;
        
        // Use steering vocabulary
        const vocabulary = SteeringLoader.getVocabulary(400);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add urgency markers
        if (text.toLowerCase().includes('climate') || text.toLowerCase().includes('environment')) {
          transformed = `🌍 URGENT: ${transformed}`;
        }
        
        return `${transformed}\n\n[Climate Action Required]`;
      }
    });

    // Zone 500: Security Expert (NEW!)
    const zone500Steering = SteeringLoader.getSteeringForZone(500);
    this.personalities.set(500, {
      type: 'neutral',
      name: 'Security Expert',
      description: 'Vigilant security specialist',
      zone: 500,
      steeringLoaded: !!zone500Steering,
      transformText: (text: string) => {
        let transformed = text;
        
        // Use steering vocabulary
        const vocabulary = SteeringLoader.getVocabulary(500);
        vocabulary.forEach(word => {
          if (word.includes('→')) {
            const [from, to] = word.split('→');
            transformed = transformed.replace(new RegExp(from.trim(), 'gi'), to.trim());
          }
        });
        
        // Add security markers
        if (text.toLowerCase().includes('threat') || text.toLowerCase().includes('security')) {
          transformed = `🛡️ SECURITY ALERT: ${transformed}`;
        }
        
        return `${transformed}\n\n[Threat Assessment: ACTIVE]`;
      }
    });

    // Zone 800: Storyteller (NEW!)
    const zone800Steering = SteeringLoader.getSteeringForZone(800);
    this.personalities.set(800, {
      type: 'neutral',
      name: 'Storyteller',
      description: 'Creative narrative voice',
      zone: 800,
      steeringLoaded: !!zone800Steering,
      transformText: (text: string) => {
        const examples = SteeringLoader.getExamples(800);
        let transformed = text;
        
        // Add narrative flair
        if (examples.length > 0) {
          const randomExample = examples[Math.floor(Math.random() * examples.length)];
          if (randomExample.length < 50) {
            transformed = `${randomExample}\n\n${transformed}`;
          }
        }
        
        return `📖 ${transformed}\n\n[Story continues...]`;
      }
    });

    // Default: Neutral (No transformation)
    this.personalities.set(0, {
      type: 'neutral',
      name: 'Neutral',
      description: 'Standard system voice',
      zone: 0,
      steeringLoaded: false,
      transformText: (text: string) => text.toUpperCase()
    });
  }

  /**
   * Get steering content for zone (NEW!)
   */
  getSteeringContent(zone: number): string {
    const steering = SteeringLoader.getSteeringForZone(zone);
    return steering?.content || 'No steering file loaded';
  }

  /**
   * Get vocabulary for zone (NEW!)
   */
  getVocabulary(zone: number): string[] {
    return SteeringLoader.getVocabulary(zone);
  }

  /**
   * Get personality for a specific zone
   */
  getPersonalityForZone(zoneId: number): Personality {
    // Get zone (100, 200, 300, etc.)
    const zone = Math.floor(zoneId / 100) * 100;
    
    // Return personality or default
    return this.personalities.get(zone) || this.personalities.get(0)!;
  }

  /**
   * Get personality for current page
   */
  getPersonalityForPage(pageNumber: number): Personality {
    const zone = Math.floor(pageNumber / 100) * 100;
    return this.getPersonalityForZone(zone);
  }

  /**
   * Transform text using zone personality
   */
  transformText(text: string, zoneId: number): string {
    const personality = this.getPersonalityForZone(zoneId);
    return personality.transformText(text);
  }

  /**
   * Get all available personalities
   */
  getAllPersonalities(): Personality[] {
    return Array.from(this.personalities.values());
  }

  /**
   * Get personality description for zone
   */
  getPersonalityDescription(zoneId: number): string {
    const personality = this.getPersonalityForZone(zoneId);
    return `${personality.name}: ${personality.description}`;
  }

  /**
   * Check if zone has custom personality
   */
  hasCustomPersonality(zoneId: number): boolean {
    const zone = Math.floor(zoneId / 100) * 100;
    return this.personalities.has(zone) && zone !== 0;
  }

  /**
   * CRISIS MODE - Activate urgent, directive communication
   */
  activateCrisisMode(reason: CrisisReason): void {
    if (this.currentMode === 'crisis') return;
    
    this.currentMode = 'crisis';
    
    // Save original transforms
    this.personalities.forEach((personality, zone) => {
      this.originalTransforms.set(zone, personality.transformText);
      
      // Override with crisis transform
      personality.transformText = (text: string) => {
        return this.applyCrisisTransform(text, zone, reason);
      };
    });
    
    // Apply crisis UI
    document.body.classList.add('crisis-mode');
    document.body.classList.remove('quiet-mode');
    
    console.error(`🚨 CRISIS MODE ACTIVATED: ${reason}`);
  }

  /**
   * QUIET MODE - Activate calm, contemplative communication
   */
  activateQuietMode(): void {
    if (this.currentMode === 'quiet') return;
    
    this.currentMode = 'quiet';
    
    // Save original transforms
    this.personalities.forEach((personality, zone) => {
      this.originalTransforms.set(zone, personality.transformText);
      
      // Override with quiet transform
      personality.transformText = (text: string) => {
        return this.applyQuietTransform(text);
      };
    });
    
    // Apply quiet UI
    document.body.classList.add('quiet-mode');
    document.body.classList.remove('crisis-mode');
    
    console.log('🌙 Quiet mode activated');
  }

  /**
   * Deactivate special modes and return to normal
   */
  deactivateSpecialModes(): void {
    if (this.currentMode === 'normal') return;
    
    this.currentMode = 'normal';
    
    // Restore original transforms
    this.personalities.forEach((personality, zone) => {
      const original = this.originalTransforms.get(zone);
      if (original) {
        personality.transformText = original;
      }
    });
    
    this.originalTransforms.clear();
    
    // Remove UI classes
    document.body.classList.remove('crisis-mode', 'quiet-mode');
    
    console.log('✅ Normal mode restored');
  }

  /**
   * Apply crisis transformation
   */
  private applyCrisisTransform(text: string, zone: number, reason: CrisisReason): string {
    const alert = this.getCrisisAlert(reason);
    const zonePrefix = this.getZoneCrisisPrefix(zone);
    
    return `🚨 ${alert}\n${zonePrefix}\n${text.toUpperCase()}\n\nSTATUS: MONITORING`;
  }

  /**
   * Apply quiet transformation
   */
  private applyQuietTransform(text: string): string {
    let quietText = text.toLowerCase();
    
    // Remove urgency markers
    quietText = quietText
      .replace(/!/g, '.')
      .replace(/urgent|critical|now|breaking/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    // Add contemplative spacing
    quietText = quietText
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .join('\n\n');
    
    return quietText;
  }

  /**
   * Get crisis alert message
   */
  private getCrisisAlert(reason: CrisisReason): string {
    const alerts: Record<CrisisReason, string> = {
      market_crash: 'MARKET CRASH DETECTED',
      system_error: 'SYSTEM ERROR',
      network_loss: 'NETWORK DISCONNECTED',
      security_breach: 'SECURITY BREACH',
      glitch_trap: 'SYSTEM CORRUPTION'
    };
    return alerts[reason];
  }

  /**
   * Get zone-specific crisis prefix
   */
  private getZoneCrisisPrefix(zone: number): string {
    const prefixes: Record<number, string> = {
      100: 'BREAKING NEWS ALERT',
      200: 'SYSTEM THREAT LEVEL: HIGH',
      300: 'VIRAL THREAT DETECTED',
      400: 'ENVIRONMENTAL ALERT',
      500: 'SECURITY BREACH ATTEMPT',
      666: 'C̴R̷I̸T̴I̷C̸A̴L̷ S̸Y̴S̷T̸E̴M̷ F̸A̴I̷L̸U̴R̷E̸',
      800: 'SMART HOME ALERT',
      900: '> SYSTEM_CRITICAL'
    };
    return prefixes[zone] || 'CRITICAL ALERT';
  }

  /**
   * Get current mode
   */
  getCurrentMode(): PersonalityMode {
    return this.currentMode;
  }

  /**
   * Check if in crisis mode
   */
  isInCrisisMode(): boolean {
    return this.currentMode === 'crisis';
  }

  /**
   * Check if in quiet mode
   */
  isInQuietMode(): boolean {
    return this.currentMode === 'quiet';
  }
}

// Singleton instance
export const PersonalityService = new PersonalityServiceClass();
