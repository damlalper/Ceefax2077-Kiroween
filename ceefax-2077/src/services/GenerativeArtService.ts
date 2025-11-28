/**
 * Generative Art Service
 * Converts AI-generated images to Teletext ASCII art
 * Uses Pollinations.ai API (no key required)
 */

// Teletext color palette
const TELETEXT_COLORS = {
  BLACK: { r: 0, g: 0, b: 0, code: '#000000', name: 'BLACK' },
  RED: { r: 255, g: 0, b: 0, code: '#FF0000', name: 'RED' },
  GREEN: { r: 0, g: 255, b: 0, code: '#00FF00', name: 'GREEN' },
  YELLOW: { r: 255, g: 255, b: 0, code: '#FFFF00', name: 'YELLOW' },
  BLUE: { r: 0, g: 0, b: 255, code: '#0000FF', name: 'BLUE' },
  MAGENTA: { r: 255, g: 0, b: 255, code: '#FF00FF', name: 'MAGENTA' },
  CYAN: { r: 0, g: 255, b: 255, code: '#00FFFF', name: 'CYAN' },
  WHITE: { r: 255, g: 255, b: 255, code: '#FFFFFF', name: 'WHITE' },
};

// Block characters based on brightness
const BLOCK_CHARS = {
  FULL: '█',    // 100% brightness
  DARK: '▓',    // 75% brightness
  MEDIUM: '▒',  // 50% brightness
  LIGHT: '░',   // 25% brightness
  EMPTY: ' ',   // 0% brightness
};

export interface TeletextPixel {
  char: string;
  color: string;
  brightness: number;
}

class GenerativeArtServiceClass {
  private readonly GRID_WIDTH = 40;
  private readonly GRID_HEIGHT = 24;
  private readonly API_BASE = 'https://image.pollinations.ai/prompt';

  /**
   * Generate image URL from prompt
   */
  getImageUrl(prompt: string): string {
    const encoded = encodeURIComponent(prompt);
    // Add parameters for better teletext conversion
    return `${this.API_BASE}/${encoded}?width=400&height=240&nologo=true`;
  }

  /**
   * Convert AI image to Teletext ASCII art
   */
  async generateTeletextArt(prompt: string): Promise<TeletextPixel[][]> {
    const imageUrl = this.getImageUrl(prompt);
    
    // Load image
    const img = await this.loadImage(imageUrl);
    
    // Draw to canvas and get pixel data
    const pixelData = this.getImagePixelData(img);
    
    // Convert to teletext grid
    const grid = this.convertToTeletextGrid(pixelData);
    
    return grid;
  }

  /**
   * Load image from URL
   */
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Extract pixel data from image
   */
  private getImagePixelData(img: HTMLImageElement): ImageData {
    const canvas = document.createElement('canvas');
    canvas.width = this.GRID_WIDTH;
    canvas.height = this.GRID_HEIGHT;
    
    const ctx = canvas.getContext('2d')!;
    
    // Draw image scaled to grid size
    ctx.drawImage(img, 0, 0, this.GRID_WIDTH, this.GRID_HEIGHT);
    
    // Get pixel data
    return ctx.getImageData(0, 0, this.GRID_WIDTH, this.GRID_HEIGHT);
  }

  /**
   * Convert pixel data to teletext grid
   */
  private convertToTeletextGrid(imageData: ImageData): TeletextPixel[][] {
    const grid: TeletextPixel[][] = [];
    
    for (let y = 0; y < this.GRID_HEIGHT; y++) {
      const row: TeletextPixel[] = [];
      
      for (let x = 0; x < this.GRID_WIDTH; x++) {
        const index = (y * this.GRID_WIDTH + x) * 4;
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        
        // Calculate brightness
        const brightness = (r + g + b) / 3 / 255;
        
        // Find nearest teletext color
        const color = this.getNearestTeletextColor(r, g, b);
        
        // Get block character based on brightness
        const char = this.getBlockChar(brightness);
        
        row.push({
          char,
          color: color.code,
          brightness
        });
      }
      
      grid.push(row);
    }
    
    return grid;
  }

  /**
   * Find nearest teletext color using Euclidean distance
   */
  private getNearestTeletextColor(r: number, g: number, b: number) {
    let minDistance = Infinity;
    let nearestColor = TELETEXT_COLORS.WHITE;
    
    Object.values(TELETEXT_COLORS).forEach(color => {
      const distance = Math.sqrt(
        Math.pow(r - color.r, 2) +
        Math.pow(g - color.g, 2) +
        Math.pow(b - color.b, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestColor = color;
      }
    });
    
    return nearestColor;
  }

  /**
   * Get block character based on brightness
   */
  private getBlockChar(brightness: number): string {
    if (brightness > 0.8) return BLOCK_CHARS.FULL;
    if (brightness > 0.6) return BLOCK_CHARS.DARK;
    if (brightness > 0.4) return BLOCK_CHARS.MEDIUM;
    if (brightness > 0.2) return BLOCK_CHARS.LIGHT;
    return BLOCK_CHARS.EMPTY;
  }

  /**
   * Get random prompt suggestions
   */
  getPromptSuggestions(): string[] {
    return [
      'Ghost in the machine',
      'Cyberpunk city at night',
      'Retro computer terminal',
      'Halloween pumpkin',
      'Digital skull',
      'Neon robot',
      'Glitch art',
      'VHS aesthetic',
      'Synthwave sunset',
      'Matrix code rain',
      'Pixel art demon',
      'Teletext graphics',
      '1980s computer',
      'ASCII art portrait',
      'Retro futurism'
    ];
  }
}

export const GenerativeArtService = new GenerativeArtServiceClass();
