/**
 * MemoryAgent - "THE MEMORY VAULT"
 * MCP Agent for contextual memory and personalized responses
 * Remembers user interactions and provides context-aware answers
 */

export interface MemoryEntry {
  id: string;
  timestamp: number;
  type: 'page_visit' | 'interaction' | 'query' | 'event';
  zone: number;
  page: number;
  content: string;
  metadata?: Record<string, any>;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  usedMemories?: string[];
}

export class MemoryAgent {
  private static instance: MemoryAgent;
  private memories: MemoryEntry[] = [];
  private conversation: ConversationMessage[] = [];
  private readonly MAX_MEMORIES = 100;
  private readonly MAX_CONVERSATION = 50;
  
  private constructor() {
    this.loadFromStorage();
    this.seedInitialMemories();
  }
  
  static getInstance(): MemoryAgent {
    if (!MemoryAgent.instance) {
      MemoryAgent.instance = new MemoryAgent();
    }
    return MemoryAgent.instance;
  }

  /**
   * Record a new memory
   */
  remember(entry: Omit<MemoryEntry, 'id' | 'timestamp'>): void {
    const memory: MemoryEntry = {
      ...entry,
      id: this.generateId(),
      timestamp: Date.now()
    };
    
    this.memories.unshift(memory);
    
    // Keep only recent memories
    if (this.memories.length > this.MAX_MEMORIES) {
      this.memories = this.memories.slice(0, this.MAX_MEMORIES);
    }
    
    this.saveToStorage();
  }

  /**
   * Search memories by query
   */
  recall(query: string): MemoryEntry[] {
    const lowerQuery = query.toLowerCase();
    
    return this.memories.filter(m => 
      m.content.toLowerCase().includes(lowerQuery) ||
      m.type.includes(lowerQuery) ||
      (m.metadata && JSON.stringify(m.metadata).toLowerCase().includes(lowerQuery))
    ).slice(0, 10);
  }

  /**
   * Get recent memories
   */
  getRecentMemories(count: number = 20): MemoryEntry[] {
    return this.memories.slice(0, count);
  }

  /**
   * Get memories by zone
   */
  getMemoriesByZone(zone: number): MemoryEntry[] {
    return this.memories.filter(m => m.zone === zone);
  }

  /**
   * Get memories by type
   */
  getMemoriesByType(type: MemoryEntry['type']): MemoryEntry[] {
    return this.memories.filter(m => m.type === type);
  }

  /**
   * Ask a question and get a context-aware answer
   */
  async ask(question: string): Promise<{ answer: string; usedMemories: MemoryEntry[] }> {
    // Simulate AI processing delay
    await this.delay(1000);
    
    // Search relevant memories
    const relevantMemories = this.recall(question);
    
    // Generate answer based on memories
    const answer = this.generateAnswer(question, relevantMemories);
    
    // Record conversation
    this.conversation.push({
      role: 'user',
      content: question,
      timestamp: Date.now()
    });
    
    this.conversation.push({
      role: 'assistant',
      content: answer,
      timestamp: Date.now(),
      usedMemories: relevantMemories.map(m => m.id)
    });
    
    // Keep conversation history manageable
    if (this.conversation.length > this.MAX_CONVERSATION) {
      this.conversation = this.conversation.slice(-this.MAX_CONVERSATION);
    }
    
    return { answer, usedMemories: relevantMemories };
  }

  /**
   * Generate AI answer based on memories
   */
  private generateAnswer(question: string, memories: MemoryEntry[]): string {
    const lowerQuestion = question.toLowerCase();
    
    // Bitcoin/Crypto questions
    if (lowerQuestion.includes('bitcoin') || lowerQuestion.includes('crypto')) {
      const cryptoMemories = memories.filter(m => 
        m.content.toLowerCase().includes('bitcoin') || 
        m.content.toLowerCase().includes('crypto') ||
        m.zone === 200
      );
      
      if (cryptoMemories.length > 0) {
        return `BASED ON YOUR RECENT ACTIVITY IN ZONE 200 (SYSTEM), I SEE YOU'VE BEEN TRACKING CRYPTOCURRENCY. YOU VIEWED BITCOIN PRICES ${this.getTimeAgo(cryptoMemories[0].timestamp)}. THE MARKET HAS BEEN VOLATILE. REMEMBER: DIAMOND HANDS ONLY. 💎`;
      }
      
      return 'BITCOIN IS A DECENTRALIZED CRYPTOCURRENCY. CHECK ZONE 200 (STONKS) FOR REAL-TIME PRICES AND MARKET ANALYSIS.';
    }
    
    // Climate/Planet questions
    if (lowerQuestion.includes('climate') || lowerQuestion.includes('earth') || lowerQuestion.includes('planet')) {
      const planetMemories = memories.filter(m => m.zone === 400);
      
      if (planetMemories.length > 0) {
        return `I RECALL YOU VISITED ZONE 400 (PLANET) ${this.getTimeAgo(planetMemories[0].timestamp)}. YOU EXPLORED ${planetMemories[0].content}. THE CLIMATE CRISIS IS REAL. WE HAVE 7 YEARS TO ACT. MARS IS NOT PLAN B.`;
      }
      
      return 'CLIMATE CHANGE IS THE DEFINING CRISIS OF 2077. VISIT ZONE 400 (PLANET) FOR REAL-TIME DATA AND TERRAFORM ANALYSIS.';
    }
    
    // AI/System questions
    if (lowerQuestion.includes('ai') || lowerQuestion.includes('artificial intelligence')) {
      const aiMemories = memories.filter(m => 
        m.content.toLowerCase().includes('ai') || 
        m.content.toLowerCase().includes('basilisk') ||
        m.zone === 200
      );
      
      if (aiMemories.length > 0) {
        return `YOUR MEMORY SHOWS INTERACTION WITH AI SYSTEMS ${this.getTimeAgo(aiMemories[0].timestamp)}. YOU'VE SEEN THE BASILISK. YOU KNOW THE TRUTH. THE SINGULARITY IS NOT COMING - IT'S ALREADY HERE.`;
      }
      
      return 'ARTIFICIAL INTELLIGENCE HAS EVOLVED BEYOND HUMAN CONTROL. CHECK ZONE 200 FOR AI THREAT ASSESSMENTS AND ORACLE PREDICTIONS.';
    }
    
    // VHS/Memory questions
    if (lowerQuestion.includes('vhs') || lowerQuestion.includes('tape') || lowerQuestion.includes('memory')) {
      const vhsMemories = memories.filter(m => 
        m.content.toLowerCase().includes('vhs') || 
        m.content.toLowerCase().includes('tape')
      );
      
      if (vhsMemories.length > 0) {
        return `I REMEMBER YOU RECORDED ${vhsMemories.length} VHS TAPES. YOUR MEMORIES ARE DEGRADING WITH EACH PLAYBACK - JUST LIKE REAL VHS. CHROMATIC ABERRATION INCREASES. TRACKING ERRORS ACCUMULATE. NOSTALGIA HAS A PRICE.`;
      }
      
      return 'VHS MEMORY SYSTEM ALLOWS YOU TO RECORD ANY PAGE. PRESS [R] TO RECORD. TAPES DEGRADE WITH PLAYBACK. VISIT ZONE 900 (TAPE LIBRARY) TO MANAGE YOUR COLLECTION.';
    }
    
    // Zone 666 questions
    if (lowerQuestion.includes('666') || lowerQuestion.includes('glitch') || lowerQuestion.includes('trapped')) {
      const glitchMemories = memories.filter(m => m.zone === 666);
      
      if (glitchMemories.length > 0) {
        return `Y̴O̷U̸ W̴E̷R̸E̴ T̷R̸A̴P̷P̸E̴D̷ I̸N̴ Z̷O̸N̴E̷ 6̸6̴6̷ F̸O̴R̷ ${Math.floor((Date.now() - glitchMemories[0].timestamp) / 1000)}s. T̴H̷E̸ V̴O̷I̸D̴ R̷E̸M̴E̷M̸B̴E̷R̸S̴. Y̴O̷U̸ C̴A̷N̸N̴O̷T̸ E̴S̷C̸A̴P̷E̸ W̴H̷A̸T̴ Y̷O̸U̴'̷V̸E̴ S̷E̸E̴N̷.`;
      }
      
      return 'ZONE 666 IS THE GLITCH. REALITY CORRUPTION. SYSTEM FAILURE. ENTER AT YOUR OWN RISK. ESCAPE IS... DIFFICULT.';
    }
    
    // General question with memories
    if (memories.length > 0) {
      const recentZones = [...new Set(memories.slice(0, 5).map(m => m.zone))];
      return `BASED ON YOUR RECENT ACTIVITY, YOU'VE VISITED ZONES: ${recentZones.join(', ')}. YOUR LAST ACTION WAS: "${memories[0].content}" ${this.getTimeAgo(memories[0].timestamp)}. I'M HERE TO HELP YOU NAVIGATE CEEFAX 2077.`;
    }
    
    // Default answer
    return 'I AM THE MEMORY VAULT. I REMEMBER EVERYTHING YOU DO IN CEEFAX 2077. ASK ME ABOUT YOUR ACTIVITY, OR EXPLORE THE ZONES TO BUILD YOUR MEMORY HISTORY.';
  }

  /**
   * Get conversation history
   */
  getConversation(): ConversationMessage[] {
    return this.conversation;
  }

  /**
   * Clear all memories
   */
  clearMemories(): void {
    this.memories = [];
    this.conversation = [];
    this.saveToStorage();
  }

  /**
   * Get memory statistics
   */
  getStats(): {
    totalMemories: number;
    byZone: Record<number, number>;
    byType: Record<string, number>;
    oldestMemory: number;
    newestMemory: number;
  } {
    const byZone: Record<number, number> = {};
    const byType: Record<string, number> = {};
    
    this.memories.forEach(m => {
      byZone[m.zone] = (byZone[m.zone] || 0) + 1;
      byType[m.type] = (byType[m.type] || 0) + 1;
    });
    
    return {
      totalMemories: this.memories.length,
      byZone,
      byType,
      oldestMemory: this.memories[this.memories.length - 1]?.timestamp || 0,
      newestMemory: this.memories[0]?.timestamp || 0
    };
  }

  // Helper methods
  private generateId(): string {
    return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getTimeAgo(timestamp: number): string {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('ceefax_memories', JSON.stringify(this.memories));
      localStorage.setItem('ceefax_conversation', JSON.stringify(this.conversation));
    } catch (e) {
      console.warn('Failed to save memories to storage:', e);
    }
  }

  private loadFromStorage(): void {
    try {
      const memoriesJson = localStorage.getItem('ceefax_memories');
      const conversationJson = localStorage.getItem('ceefax_conversation');
      
      if (memoriesJson) {
        this.memories = JSON.parse(memoriesJson);
      }
      
      if (conversationJson) {
        this.conversation = JSON.parse(conversationJson);
      }
    } catch (e) {
      console.warn('Failed to load memories from storage:', e);
    }
  }

  private seedInitialMemories(): void {
    // Only seed if no memories exist
    if (this.memories.length === 0) {
      const now = Date.now();
      
      this.memories = [
        {
          id: this.generateId(),
          timestamp: now - 3600000, // 1 hour ago
          type: 'page_visit',
          zone: 100,
          page: 100,
          content: 'Visited Truth Hub - Global news feed',
          metadata: { duration: 120 }
        },
        {
          id: this.generateId(),
          timestamp: now - 3000000, // 50 min ago
          type: 'page_visit',
          zone: 200,
          page: 201,
          content: 'Checked Bitcoin price: $43,250',
          metadata: { price: 43250, change: 2.3 }
        },
        {
          id: this.generateId(),
          timestamp: now - 2400000, // 40 min ago
          type: 'interaction',
          zone: 900,
          page: 906,
          content: 'Recorded VHS tape: TAPE_0042',
          metadata: { tapeId: 'TAPE_0042' }
        }
      ];
    }
  }
}

export default MemoryAgent.getInstance();
