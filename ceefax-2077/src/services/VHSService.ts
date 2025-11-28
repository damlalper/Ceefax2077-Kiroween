/**
 * VHS Memory Service
 * Analog tape recording system for saving page snapshots
 * Simulates physical VHS tape library with wear and degradation
 */

export interface VHSTape {
  id: string;
  label: string;
  pageNumber: number;
  content: string;
  timestamp: number;
  playCount: number; // More plays = more degradation
  wear: number; // 0-100, increases with each playback
}

class VHSServiceClass {
  private readonly STORAGE_KEY = 'vhs_tape_library';
  private readonly MAX_TAPES = 12; // Like a physical tape shelf

  /**
   * Record current page to tape
   */
  recordToTape(pageNumber: number, content: string, label?: string): VHSTape {
    const tapes = this.getAllTapes();
    
    const newTape: VHSTape = {
      id: `TAPE_${Date.now()}`,
      label: label || `Page ${pageNumber} - ${new Date().toLocaleDateString()}`,
      pageNumber,
      content,
      timestamp: Date.now(),
      playCount: 0,
      wear: 0
    };

    // Remove oldest if library is full
    if (tapes.length >= this.MAX_TAPES) {
      tapes.shift();
    }

    tapes.push(newTape);
    this.saveTapes(tapes);
    
    return newTape;
  }

  /**
   * Play tape (increases wear)
   */
  playTape(tapeId: string): VHSTape | null {
    const tapes = this.getAllTapes();
    const tape = tapes.find(t => t.id === tapeId);
    
    if (!tape) return null;

    // Simulate tape degradation
    tape.playCount++;
    tape.wear = Math.min(100, tape.wear + Math.random() * 5 + 2);
    
    this.saveTapes(tapes);
    return tape;
  }

  /**
   * Get all tapes in library
   */
  getAllTapes(): VHSTape[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Delete tape from library
   */
  eraseTape(tapeId: string): void {
    const tapes = this.getAllTapes().filter(t => t.id !== tapeId);
    this.saveTapes(tapes);
  }

  /**
   * Get degradation level for visual effects
   */
  getDegradationLevel(tape: VHSTape): {
    chromatic: number;
    noise: number;
    tracking: number;
  } {
    const wear = tape.wear / 100;
    
    return {
      chromatic: 2 + wear * 8, // 2-10px RGB shift
      noise: 0.1 + wear * 0.4, // 0.1-0.5 opacity
      tracking: 1 + wear * 4 // 1-5 tracking lines
    };
  }

  private saveTapes(tapes: VHSTape[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tapes));
    } catch (error) {
      console.error('Failed to save VHS tapes:', error);
    }
  }
}

export const VHSService = new VHSServiceClass();
