/**
 * Personality Service - Steering & Intelligence Category
 * Manages zone-specific AI personas and voice transformations
 */

export type PersonalityType = 'anchor' | 'gossip' | 'rogue' | 'sysadmin' | 'demon' | 'neutral';

export interface Personality {
  type: PersonalityType;
  name: string;
  description: string;
  zone: number;
  transformText: (text: string) => string;
}

class PersonalityServiceClass {
  private personalities: Map<number, Personality> = new Map();

  constructor() {
    this.initializePersonalities();
  }

  private initializePersonalities() {
    // Zone 100: News Anchor (Professional, Neutral)
    this.personalities.set(100, {
      type: 'anchor',
      name: 'News Anchor',
      description: 'Professional BBC-style news presenter',
      zone: 100,
      transformText: (text: string) => {
        // Professional news transformation
        let transformed = text.toUpperCase();
        
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

    // Zone 200: Rogue AI (Paranoid, Technical)
    this.personalities.set(200, {
      type: 'rogue',
      name: 'Rogue AI',
      description: 'Paranoid AI warning about threats',
      zone: 200,
      transformText: (text: string) => {
        // Add AI threat warnings
        const warnings = [
          '[THREAT DETECTED]',
          '[ANALYZING...]',
          '[PROBABILITY: HIGH]',
          '[WARNING]'
        ];
        
        const randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
        return `${randomWarning} ${text.toUpperCase()}`;
      }
    });

    // Zone 300: Gossip Girl (Dramatic, Toxic)
    this.personalities.set(300, {
      type: 'gossip',
      name: 'Gossip Girl',
      description: 'Toxic Gen Z gossip personality',
      zone: 300,
      transformText: (text: string) => {
        // Add drama and emojis
        const emojis = ['💀', '😭', '🚨', '💅', '☕'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        let transformed = text.toUpperCase();
        
        // Add emphasis
        transformed = transformed.replace(/\b(BREAKING|DRAMA|TEA|BESTIE)\b/g, '🚨 $1 🚨');
        
        return `${randomEmoji} ${transformed} ${randomEmoji}`;
      }
    });

    // Zone 666: Demon (Corrupted, Threatening)
    this.personalities.set(666, {
      type: 'demon',
      name: 'Corrupted Entity',
      description: 'Malevolent glitch demon',
      zone: 666,
      transformText: (text: string) => {
        // Apply glitch effects
        let transformed = text.toUpperCase();
        
        // Add zalgo-style diacritics (simplified)
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
    this.personalities.set(900, {
      type: 'sysadmin',
      name: 'System Administrator',
      description: 'Cold robotic terminal',
      zone: 900,
      transformText: (text: string) => {
        // Convert to command-line style
        let transformed = text.toUpperCase();
        
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
        
        return transformed;
      }
    });

    // Default: Neutral (No transformation)
    this.personalities.set(0, {
      type: 'neutral',
      name: 'Neutral',
      description: 'Standard system voice',
      zone: 0,
      transformText: (text: string) => text.toUpperCase()
    });
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
}

// Singleton instance
export const PersonalityService = new PersonalityServiceClass();
