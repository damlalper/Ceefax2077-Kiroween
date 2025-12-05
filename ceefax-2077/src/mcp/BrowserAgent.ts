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
   * Uses CORS proxy to fetch real web pages
   */
  async fetchPage(url: string): Promise<TeletextPage> {
    // Check cache
    if (this.cache.has(url)) {
      const cached = this.cache.get(url)!;
      if (Date.now() - cached.timestamp < 300000) { // 5 min cache
        console.log('📦 Using cached page:', url);
        return cached;
      }
    }

    console.log('🌐 Fetching page:', url);

    try {
      // Try to fetch real page via CORS proxy
      const page = await this.fetchRealPage(url);
      
      // Cache result
      this.cache.set(url, page);
      
      return page;
    } catch (error) {
      console.error('❌ Failed to fetch real page, using simulation:', error);
      
      // Fallback to simulation
      const page = this.simulateFetch(url);
      this.cache.set(url, page);
      return page;
    }
  }
  
  /**
   * Fetch real web page via CORS proxy
   */
  private async fetchRealPage(url: string): Promise<TeletextPage> {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // Use CORS proxy
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
    
    console.log('🔄 Using CORS proxy:', proxyUrl);
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    console.log('✅ Page fetched, converting to Teletext...');
    
    // Parse HTML and convert to Teletext
    return this.parseHtmlToTeletext(html, fullUrl);
  }
  
  /**
   * Parse HTML and convert to Teletext format
   */
  private parseHtmlToTeletext(html: string, url: string): TeletextPage {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove unwanted elements
    const unwanted = doc.querySelectorAll('script, style, nav, footer, iframe, noscript, header');
    unwanted.forEach(el => el.remove());
    
    // Extract title
    const titleEl = doc.querySelector('title');
    let title = titleEl?.textContent?.trim() || 'UNTITLED PAGE';
    title = this.cleanText(title).toUpperCase();
    title = title.substring(0, 38); // Max 38 chars
    
    // Extract content
    const content: string[] = [];
    
    // Try to find main content
    const mainContent = doc.querySelector('main, article, .content, #content, body');
    const contentEl = mainContent || doc.body;
    
    if (contentEl) {
      // Extract paragraphs and headers
      const elements = contentEl.querySelectorAll('h1, h2, h3, p');
      
      elements.forEach((el, index) => {
        if (index >= 15) return; // Limit to 15 elements
        
        const text = this.cleanText(el.textContent || '');
        if (text.length > 0) {
          // Headers in uppercase
          if (el.tagName.startsWith('H')) {
            content.push('');
            content.push(text.toUpperCase().substring(0, 40));
            content.push('─'.repeat(Math.min(text.length, 40)));
          } else {
            // Wrap paragraphs
            const lines = this.wrapText(text, 40);
            lines.forEach(line => content.push(line));
            content.push('');
          }
        }
      });
    }
    
    // Extract links
    const links: TeletextLink[] = [];
    const linkEls = contentEl?.querySelectorAll('a[href]') || [];
    
    linkEls.forEach((link, index) => {
      if (index >= 10) return; // Max 10 links
      
      const text = this.cleanText(link.textContent || '');
      const href = link.getAttribute('href') || '';
      
      if (text.length > 0 && href.length > 0) {
        links.push({
          id: index + 1,
          text: text.toUpperCase().substring(0, 30),
          url: this.resolveUrl(href, url)
        });
      }
    });
    
    return {
      url,
      title,
      content: content.slice(0, 20), // Max 20 lines
      links,
      timestamp: Date.now()
    };
  }
  
  /**
   * Clean text: remove extra whitespace
   */
  private cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\x20-\x7E]/g, '') // ASCII only
      .trim();
  }
  
  /**
   * Wrap text to fit line width
   */
  private wrapText(text: string, width: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + ' ' + word).trim().length <= width) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        currentLine = word.substring(0, width);
      }
    });
    
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    return lines;
  }
  
  /**
   * Resolve relative URLs
   */
  private resolveUrl(href: string, baseUrl: string): string {
    try {
      if (href.startsWith('http')) return href;
      const base = new URL(baseUrl);
      return new URL(href, base.origin).toString();
    } catch {
      return href;
    }
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
      { name: 'WIKIPEDIA', url: 'https://en.wikipedia.org/wiki/Teletext' },
      { name: 'BBC NEWS', url: 'https://www.bbc.com/news/technology' },
      { name: 'HACKER NEWS', url: 'https://news.ycombinator.com' },
      { name: 'GITHUB', url: 'https://github.com' },
      { name: 'EXAMPLE', url: 'https://example.com' },
      { name: 'ARCHIVE.ORG', url: 'https://archive.org' }
    ];
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

export default BrowserAgent.getInstance();
