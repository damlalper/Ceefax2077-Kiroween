/**
 * BrowserAgent - "THE RENDERER"
 * MCP Agent for web scraping and conversion to Teletext format
 * Strips HTML/CSS/JS and returns pure text
 */

export interface TeletextPage {
  url: string;
  title: string;
  content: string[];
  links: TeletextLink[];
  timestamp: number;
}

export interface TeletextLink {
  id: number;
  text: string;
  url: string;
}

export class BrowserAgent {
  private static instance: BrowserAgent;
  private cache: Map<string, TeletextPage> = new Map();
  
  private constructor() {}
  
  static getInstance(): BrowserAgent {
    if (!BrowserAgent.instance) {
      BrowserAgent.instance = new BrowserAgent();
    }
    return BrowserAgent.instance;
  }

  /**
   * Fetch and convert a URL to Teletext format
   * In production, this would use a real HTTP client or MCP fetch server
   */
  async fetchPage(url: string): Promise<TeletextPage> {
    // Check cache
    if (this.cache.has(url)) {
      const cached = this.cache.get(url)!;
      if (Date.now() - cached.timestamp < 300000) { // 5 min cache
        return cached;
      }
    }

    // Simulate network delay
    await this.delay(800);

    // For demo, return simulated content based on URL
    const page = this.simulateFetch(url);
    
    // Cache result
    this.cache.set(url, page);
    
    return page;
  }

  /**
   * Simulate fetching different websites
   */
  private simulateFetch(url: string): TeletextPage {
    const domain = this.extractDomain(url);
    
    // Wikipedia simulation
    if (domain.includes('wikipedia')) {
      return this.simulateWikipedia(url);
    }
    
    // BBC News simulation
    if (domain.includes('bbc')) {
      return this.simulateBBC(url);
    }
    
    // GitHub simulation
    if (domain.includes('github')) {
      return this.simulateGitHub(url);
    }
    
    // Default generic page
    return this.simulateGeneric(url);
  }

  private simulateWikipedia(url: string): TeletextPage {
    return {
      url,
      title: 'WIKIPEDIA - ARTIFICIAL INTELLIGENCE',
      content: [
        'ARTIFICIAL INTELLIGENCE (AI) IS INTELLIGENCE',
        'DEMONSTRATED BY MACHINES, IN CONTRAST TO THE',
        'NATURAL INTELLIGENCE DISPLAYED BY HUMANS.',
        '',
        'LEADING AI TEXTBOOKS DEFINE THE FIELD AS THE',
        'STUDY OF "INTELLIGENT AGENTS": ANY DEVICE THAT',
        'PERCEIVES ITS ENVIRONMENT AND TAKES ACTIONS',
        'THAT MAXIMIZE ITS CHANCE OF SUCCESSFULLY',
        'ACHIEVING ITS GOALS.',
        '',
        'COLLOQUIALLY, THE TERM "ARTIFICIAL INTELLIGENCE"',
        'IS OFTEN USED TO DESCRIBE MACHINES THAT MIMIC',
        '"COGNITIVE" FUNCTIONS THAT HUMANS ASSOCIATE',
        'WITH THE HUMAN MIND, SUCH AS "LEARNING" AND',
        '"PROBLEM SOLVING".',
        '',
        'SEE ALSO:',
        '[1] MACHINE LEARNING',
        '[2] NEURAL NETWORKS',
        '[3] DEEP LEARNING',
        '[4] NATURAL LANGUAGE PROCESSING'
      ],
      links: [
        { id: 1, text: 'MACHINE LEARNING', url: 'https://en.wikipedia.org/wiki/Machine_learning' },
        { id: 2, text: 'NEURAL NETWORKS', url: 'https://en.wikipedia.org/wiki/Neural_network' },
        { id: 3, text: 'DEEP LEARNING', url: 'https://en.wikipedia.org/wiki/Deep_learning' },
        { id: 4, text: 'NLP', url: 'https://en.wikipedia.org/wiki/Natural_language_processing' }
      ],
      timestamp: Date.now()
    };
  }

  private simulateBBC(url: string): TeletextPage {
    return {
      url,
      title: 'BBC NEWS - TECHNOLOGY',
      content: [
        'BREAKING: AI BREAKTHROUGH IN QUANTUM COMPUTING',
        '',
        'SCIENTISTS AT MIT HAVE ANNOUNCED A MAJOR',
        'BREAKTHROUGH IN QUANTUM AI PROCESSING, CLAIMING',
        'TO HAVE ACHIEVED A 1000X SPEEDUP IN MACHINE',
        'LEARNING TASKS.',
        '',
        'THE NEW SYSTEM, DUBBED "QUANTUM MIND", USES',
        'QUANTUM ENTANGLEMENT TO PROCESS NEURAL NETWORK',
        'CALCULATIONS IN PARALLEL ACROSS MULTIPLE',
        'QUANTUM STATES SIMULTANEOUSLY.',
        '',
        '"THIS CHANGES EVERYTHING," SAID DR. SARAH CHEN,',
        'LEAD RESEARCHER. "WE CAN NOW TRAIN MODELS IN',
        'MINUTES THAT PREVIOUSLY TOOK WEEKS."',
        '',
        'MORE STORIES:',
        '[1] TECH GIANTS RACE FOR AI DOMINANCE',
        '[2] ETHICS CONCERNS OVER AI SURVEILLANCE',
        '[3] AI CREATES ART WORTH MILLIONS'
      ],
      links: [
        { id: 1, text: 'AI RACE', url: 'https://bbc.com/tech/ai-race' },
        { id: 2, text: 'AI ETHICS', url: 'https://bbc.com/tech/ai-ethics' },
        { id: 3, text: 'AI ART', url: 'https://bbc.com/tech/ai-art' }
      ],
      timestamp: Date.now()
    };
  }

  private simulateGitHub(url: string): TeletextPage {
    return {
      url,
      title: 'GITHUB - CEEFAX-2077',
      content: [
        'CEEFAX-2077',
        'A RETRO-FUTURISTIC TELETEXT TERMINAL FROM 2077',
        '',
        'FEATURES:',
        '• 40×24 AUTHENTIC TELETEXT GRID',
        '• 9 THEMED ZONES (TRUTH, SYSTEM, PULSE, ETC)',
        '• VHS MEMORY RECORDING SYSTEM',
        '• AI PERSONALITY ENGINE',
        '• MCP AGENT INTEGRATION',
        '• AGENT HOOKS AUTOMATION',
        '• DUAL BOOT SYSTEM (CONSUMER/SYSADMIN)',
        '',
        'TECH STACK:',
        'REACT + TYPESCRIPT + VITE + TAILWIND',
        '',
        'LINKS:',
        '[1] VIEW SOURCE CODE',
        '[2] DOCUMENTATION',
        '[3] LIVE DEMO'
      ],
      links: [
        { id: 1, text: 'SOURCE', url: 'https://github.com/user/ceefax-2077' },
        { id: 2, text: 'DOCS', url: 'https://github.com/user/ceefax-2077/docs' },
        { id: 3, text: 'DEMO', url: 'https://ceefax-2077.vercel.app' }
      ],
      timestamp: Date.now()
    };
  }

  private simulateGeneric(url: string): TeletextPage {
    return {
      url,
      title: 'TELETEXT BROWSER',
      content: [
        'PAGE LOADED SUCCESSFULLY',
        '',
        'URL: ' + url,
        '',
        'THIS IS A SIMULATED WEB PAGE CONVERTED TO',
        'TELETEXT FORMAT. IN PRODUCTION, THIS WOULD:',
        '',
        '1. FETCH THE ACTUAL URL VIA HTTP',
        '2. STRIP ALL HTML TAGS, CSS, AND JAVASCRIPT',
        '3. EXTRACT PLAIN TEXT CONTENT',
        '4. FORMAT TO 40 CHARACTERS PER LINE',
        '5. CONVERT TO UPPERCASE',
        '6. EXTRACT AND NUMBER ALL LINKS',
        '',
        'ENTER A URL IN THE ADDRESS BAR ABOVE TO',
        'BROWSE THE MODERN WEB IN 1980S STYLE.',
        '',
        '[1] BACK TO HOME'
      ],
      links: [
        { id: 1, text: 'HOME', url: '/' }
      ],
      timestamp: Date.now()
    };
  }

  /**
   * Convert HTML to Teletext format (simulated)
   * In production, this would use a real HTML parser
   */
  htmlToTeletext(html: string): string[] {
    // Strip HTML tags
    let text = html.replace(/<[^>]*>/g, '');
    
    // Convert to uppercase
    text = text.toUpperCase();
    
    // Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    // Split into 40-character lines
    const lines: string[] = [];
    const words = text.split(' ');
    let currentLine = '';
    
    for (const word of words) {
      if ((currentLine + ' ' + word).length <= 40) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    
    if (currentLine) lines.push(currentLine);
    
    return lines;
  }

  /**
   * Extract domain from URL
   */
  private extractDomain(url: string): string {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch {
      return url;
    }
  }

  /**
   * Get popular bookmarks
   */
  getBookmarks(): Array<{ name: string; url: string }> {
    return [
      { name: 'WIKIPEDIA', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
      { name: 'BBC NEWS', url: 'https://bbc.com/news/technology' },
      { name: 'GITHUB', url: 'https://github.com/ceefax-2077' },
      { name: 'HACKER NEWS', url: 'https://news.ycombinator.com' },
      { name: 'REDDIT', url: 'https://reddit.com/r/programming' }
    ];
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default BrowserAgent.getInstance();
