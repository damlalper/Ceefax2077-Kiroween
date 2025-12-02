/**
 * Steering Loader - Loads .kiro/steering/*.md files at runtime
 * Connects .kiro configuration to actual code execution
 */

// Import steering files as raw text using Vite's ?raw feature
import gossipGirlMd from '../../.kiro/steering/gossip_girl.md?raw';
import demonMd from '../../.kiro/steering/demon.md?raw';
import newsAnchorMd from '../../.kiro/steering/news_anchor.md?raw';
import cryptoTraderMd from '../../.kiro/steering/crypto_trader.md?raw';
import climateScientistMd from '../../.kiro/steering/climate_scientist.md?raw';
import securityExpertMd from '../../.kiro/steering/security_expert.md?raw';
import storytellerMd from '../../.kiro/steering/storyteller.md?raw';
import sysadminMd from '../../.kiro/steering/sysadmin.md?raw';

export interface SteeringConfig {
  zone: number;
  name: string;
  content: string;
  vocabulary: string[];
  tone: string[];
  examples: string[];
}

class SteeringLoaderClass {
  private configs: Map<number, SteeringConfig> = new Map();

  constructor() {
    this.loadAllSteering();
  }

  /**
   * Load all steering files
   */
  private loadAllSteering(): void {
    // Zone 100: News Anchor
    this.configs.set(100, this.parseSteeringFile(newsAnchorMd, 100, 'News Anchor'));
    
    // Zone 200: Crypto Trader + Rogue AI
    this.configs.set(200, this.parseSteeringFile(cryptoTraderMd, 200, 'Crypto Trader'));
    
    // Zone 300: Gossip Girl
    this.configs.set(300, this.parseSteeringFile(gossipGirlMd, 300, 'Gossip Girl'));
    
    // Zone 400: Climate Scientist
    this.configs.set(400, this.parseSteeringFile(climateScientistMd, 400, 'Climate Scientist'));
    
    // Zone 500: Security Expert
    this.configs.set(500, this.parseSteeringFile(securityExpertMd, 500, 'Security Expert'));
    
    // Zone 666: Demon
    this.configs.set(666, this.parseSteeringFile(demonMd, 666, 'Demon'));
    
    // Zone 800: Storyteller
    this.configs.set(800, this.parseSteeringFile(storytellerMd, 800, 'Storyteller'));
    
    // Zone 900: SysAdmin
    this.configs.set(900, this.parseSteeringFile(sysadminMd, 900, 'SysAdmin'));

    console.log(`✅ Loaded ${this.configs.size} steering configurations from .kiro/steering/`);
  }

  /**
   * Parse steering markdown file
   */
  private parseSteeringFile(content: string, zone: number, name: string): SteeringConfig {
    // Extract vocabulary from markdown
    const vocabulary = this.extractSection(content, 'Vocabulary') || [];
    
    // Extract tone guidelines
    const tone = this.extractSection(content, 'Tone') || [];
    
    // Extract examples
    const examples = this.extractExamples(content);

    return {
      zone,
      name,
      content,
      vocabulary,
      tone,
      examples
    };
  }

  /**
   * Extract section from markdown
   */
  private extractSection(content: string, sectionName: string): string[] {
    const regex = new RegExp(`### ${sectionName}[\\s\\S]*?(?=###|$)`, 'i');
    const match = content.match(regex);
    
    if (!match) return [];
    
    // Extract bullet points
    const bullets = match[0].match(/^[-*]\s+(.+)$/gm) || [];
    return bullets.map(b => b.replace(/^[-*]\s+/, '').trim());
  }

  /**
   * Extract examples from markdown
   */
  private extractExamples(content: string): string[] {
    const examples: string[] = [];
    
    // Find code blocks or example sections
    const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
    codeBlocks.forEach(block => {
      const cleaned = block.replace(/```/g, '').trim();
      if (cleaned.length > 0 && cleaned.length < 200) {
        examples.push(cleaned);
      }
    });
    
    return examples;
  }

  /**
   * Get steering config for zone
   */
  getSteeringForZone(zone: number): SteeringConfig | null {
    return this.configs.get(zone) || null;
  }

  /**
   * Get vocabulary for zone
   */
  getVocabulary(zone: number): string[] {
    return this.configs.get(zone)?.vocabulary || [];
  }

  /**
   * Get examples for zone
   */
  getExamples(zone: number): string[] {
    return this.configs.get(zone)?.examples || [];
  }

  /**
   * Check if steering exists for zone
   */
  hasSteeringForZone(zone: number): boolean {
    return this.configs.has(zone);
  }

  /**
   * Get all loaded steering configs
   */
  getAllConfigs(): SteeringConfig[] {
    return Array.from(this.configs.values());
  }
}

export const SteeringLoader = new SteeringLoaderClass();
