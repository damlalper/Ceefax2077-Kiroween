/**
 * WaybackAgent - MCP Tool for Internet Archive Wayback Machine
 * Fetches archived websites from ~1999 and converts to Teletext format
 */

export interface WaybackSnapshot {
  url: string;
  timestamp: string;
  year: number;
  available: boolean;
}

export interface TeletextPage {
  title: string;
  content: string[];
  links: Array<{ text: string; url: string }>;
  timestamp: string;
  originalUrl: string;
}

class WaybackAgentService {
  private readonly WAYBACK_API = 'https://archive.org/wayback/available';
  private readonly MAX_LINES = 20;
  private readonly LINE_WIDTH = 38;

  /**
   * Find closest snapshot to 1999 for a given URL
   */
  async findSnapshot(url: string): Promise<WaybackSnapshot | null> {
    try {
      // Clean URL
      const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      
      // Query Wayback API for snapshots around 1999
      const targetDate = '19990615'; // Mid-1999
      const apiUrl = `${this.WAYBACK_API}?url=${encodeURIComponent(cleanUrl)}&timestamp=${targetDate}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.archived_snapshots?.closest) {
        const snapshot = data.archived_snapshots.closest;
        return {
          url: snapshot.url,
          timestamp: snapshot.timestamp,
          year: parseInt(snapshot.timestamp.substring(0, 4)),
          available: snapshot.available
        };
      }

      return null;
    } catch (error) {
      console.error('Wayback API error:', error);
      return null;
    }
  }

  /**
   * Fetch and parse archived HTML
   */
  async fetchArchive(snapshotUrl: string): Promise<string> {
    try {
      const response = await fetch(snapshotUrl);
      const html = await response.text();
      return html;
    } catch (error) {
      console.error('Archive fetch error:', error);
      return '';
    }
  }

  /**
   * Convert HTML to Teletext format
   * Strips tags, converts to uppercase, fits to grid
   */
  convertToTeletext(html: string, originalUrl: string): TeletextPage {
    // Create a temporary DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove script, style, and nav elements
    const unwanted = doc.querySelectorAll('script, style, nav, footer, iframe, noscript');
    unwanted.forEach(el => el.remove());

    // Extract title
    const titleEl = doc.querySelector('title');
    let title = titleEl?.textContent?.trim() || 'UNTITLED PAGE';
    title = this.cleanText(title).toUpperCase();
    title = this.truncate(title, this.LINE_WIDTH);

    // Extract main content
    const content: string[] = [];
    const links: Array<{ text: string; url: string }> = [];

    // Try to find main content area
    const mainContent = doc.querySelector('main, article, .content, #content, body');
    const contentEl = mainContent || doc.body;

    if (contentEl) {
      // Process headers
      const headers = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headers.forEach(header => {
        const text = this.cleanText(header.textContent || '').toUpperCase();
        if (text.length > 0) {
          content.push('');
          content.push('═'.repeat(this.LINE_WIDTH));
          this.wrapText(text, this.LINE_WIDTH).forEach(line => content.push(line));
          content.push('═'.repeat(this.LINE_WIDTH));
        }
      });

      // Process paragraphs
      const paragraphs = contentEl.querySelectorAll('p');
      paragraphs.forEach(p => {
        const text = this.cleanText(p.textContent || '');
        if (text.length > 0) {
          content.push('');
          this.wrapText(text, this.LINE_WIDTH).forEach(line => content.push(line));
        }
      });

      // Extract links
      const linkEls = contentEl.querySelectorAll('a[href]');
      linkEls.forEach((link, index) => {
        if (index < 10) { // Limit to 10 links
          const text = this.cleanText(link.textContent || '').toUpperCase();
          const href = link.getAttribute('href') || '';
          if (text.length > 0 && href.length > 0) {
            links.push({
              text: this.truncate(text, 30),
              url: this.resolveUrl(href, originalUrl)
            });
          }
        }
      });
    }

    // Limit content lines
    const limitedContent = content.slice(0, this.MAX_LINES);

    return {
      title,
      content: limitedContent,
      links,
      timestamp: new Date().toISOString(),
      originalUrl
    };
  }

  /**
   * Clean text: remove extra whitespace, special chars
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
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine);
    }

    return lines;
  }

  /**
   * Truncate text to max length
   */
  private truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
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
   * Main method: Load and convert a URL
   */
  async loadUrl(url: string): Promise<TeletextPage | null> {
    try {
      // Find snapshot
      const snapshot = await this.findSnapshot(url);
      
      if (!snapshot || !snapshot.available) {
        return null;
      }

      // Fetch archived HTML
      const html = await this.fetchArchive(snapshot.url);
      
      if (!html) {
        return null;
      }

      // Convert to Teletext
      const page = this.convertToTeletext(html, url);
      
      return page;
    } catch (error) {
      console.error('WaybackAgent error:', error);
      return null;
    }
  }

  /**
   * Get popular 1999 websites for quick access
   */
  getPopularSites(): Array<{ name: string; url: string }> {
    return [
      { name: 'Yahoo!', url: 'yahoo.com' },
      { name: 'Google', url: 'google.com' },
      { name: 'Amazon', url: 'amazon.com' },
      { name: 'eBay', url: 'ebay.com' },
      { name: 'CNN', url: 'cnn.com' },
      { name: 'BBC', url: 'bbc.co.uk' },
      { name: 'Microsoft', url: 'microsoft.com' },
      { name: 'Apple', url: 'apple.com' },
      { name: 'NASA', url: 'nasa.gov' },
      { name: 'MTV', url: 'mtv.com' }
    ];
  }
}

// Singleton instance
export const WaybackAgent = new WaybackAgentService();
