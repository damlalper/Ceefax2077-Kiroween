/**
 * FileSystemAgent - "THE LOCAL GHOST"
 * MCP Agent for local filesystem access
 * Reads project structure and log files
 */

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  children?: FileNode[];
  size?: number;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

export class FileSystemAgent {
  private static instance: FileSystemAgent;
  
  private constructor() {}
  
  static getInstance(): FileSystemAgent {
    if (!FileSystemAgent.instance) {
      FileSystemAgent.instance = new FileSystemAgent();
    }
    return FileSystemAgent.instance;
  }

  /**
   * Get simulated project file tree
   * In production, this would use Node.js fs or MCP filesystem server
   */
  async getFileTree(): Promise<FileNode> {
    // Simulate async file system access
    await this.delay(500);
    
    return {
      name: 'ceefax-2077',
      type: 'directory',
      path: '/',
      children: [
        {
          name: 'src',
          type: 'directory',
          path: '/src',
          children: [
            { name: 'components', type: 'directory', path: '/src/components' },
            { name: 'pages', type: 'directory', path: '/src/pages' },
            { name: 'services', type: 'directory', path: '/src/services' },
            { name: 'mcp', type: 'directory', path: '/src/mcp' },
            { name: 'hooks', type: 'directory', path: '/src/hooks' },
            { name: 'App.tsx', type: 'file', path: '/src/App.tsx', size: 15420 },
            { name: 'main.tsx', type: 'file', path: '/src/main.tsx', size: 892 },
            { name: 'index.css', type: 'file', path: '/src/index.css', size: 8234 }
          ]
        },
        {
          name: 'public',
          type: 'directory',
          path: '/public',
          children: [
            { name: 'vhs-noise.mp4', type: 'file', path: '/public/vhs-noise.mp4', size: 245678 },
            { name: 'crt-scanlines.png', type: 'file', path: '/public/crt-scanlines.png', size: 12456 }
          ]
        },
        {
          name: 'docs',
          type: 'directory',
          path: '/docs',
          children: [
            { name: 'README.md', type: 'file', path: '/docs/README.md', size: 4567 },
            { name: 'ARCHITECTURE.md', type: 'file', path: '/docs/ARCHITECTURE.md', size: 8901 }
          ]
        },
        { name: 'package.json', type: 'file', path: '/package.json', size: 2345 },
        { name: 'tsconfig.json', type: 'file', path: '/tsconfig.json', size: 678 },
        { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts', size: 456 },
        { name: 'README.md', type: 'file', path: '/README.md', size: 5678 }
      ]
    };
  }

  /**
   * Get recent log entries
   * In production, this would read from actual log files
   */
  async getRecentLogs(count: number = 20): Promise<LogEntry[]> {
    await this.delay(300);
    
    const now = new Date();
    const logs: LogEntry[] = [];
    
    // Generate realistic log entries
    const messages = [
      { level: 'INFO' as const, msg: 'Application started successfully' },
      { level: 'INFO' as const, msg: 'TeletextContext initialized' },
      { level: 'INFO' as const, msg: 'VHS Service loaded 12 tapes' },
      { level: 'INFO' as const, msg: 'Theme engine initialized: CLASSIC' },
      { level: 'INFO' as const, msg: 'Agent Hooks system active (10 hooks)' },
      { level: 'WARN' as const, msg: 'Narrator voice synthesis unavailable' },
      { level: 'INFO' as const, msg: 'CryptoAgent: Fetching BTC price' },
      { level: 'INFO' as const, msg: 'CryptoAgent: BTC $43,250 (+2.3%)' },
      { level: 'INFO' as const, msg: 'NASA API: Mars photo retrieved' },
      { level: 'INFO' as const, msg: 'IoT Agent: 5 devices discovered' },
      { level: 'WARN' as const, msg: 'WaybackAgent: Rate limit approaching' },
      { level: 'INFO' as const, msg: 'User navigated to Zone 200' },
      { level: 'INFO' as const, msg: 'Personality: Crypto Trader activated' },
      { level: 'ERROR' as const, msg: 'Zone 666: Reality integrity compromised' },
      { level: 'WARN' as const, msg: 'Zone 666: Escape attempt detected' },
      { level: 'INFO' as const, msg: 'User escaped Zone 666 after 12s' },
      { level: 'INFO' as const, msg: 'VHS Recording started: Page 201' },
      { level: 'INFO' as const, msg: 'VHS Recording complete: TAPE_0042' },
      { level: 'INFO' as const, msg: 'Hook executed: auto-save-state' },
      { level: 'INFO' as const, msg: 'System health check: ALL OK' }
    ];
    
    for (let i = 0; i < Math.min(count, messages.length); i++) {
      const entry = messages[messages.length - 1 - i];
      const timestamp = new Date(now.getTime() - i * 15000); // 15s intervals
      
      logs.push({
        timestamp: this.formatTimestamp(timestamp),
        level: entry.level,
        message: entry.msg
      });
    }
    
    return logs.reverse();
  }

  /**
   * Read file contents (simulated)
   */
  async readFile(path: string): Promise<string> {
    await this.delay(200);
    
    // Simulate file reading
    if (path.endsWith('.log')) {
      const logs = await this.getRecentLogs(50);
      return logs.map(l => `[${l.timestamp}] ${l.level}: ${l.message}`).join('\n');
    }
    
    return `// Contents of ${path}\n// File reading simulated\n// In production, use MCP filesystem server`;
  }

  /**
   * Get directory listing
   */
  async listDirectory(path: string): Promise<FileNode[]> {
    await this.delay(300);
    
    const tree = await this.getFileTree();
    const node = this.findNode(tree, path);
    
    return node?.children || [];
  }

  /**
   * Search files by name
   */
  async searchFiles(query: string): Promise<FileNode[]> {
    await this.delay(400);
    
    const tree = await this.getFileTree();
    const results: FileNode[] = [];
    
    this.searchNode(tree, query.toLowerCase(), results);
    
    return results;
  }

  /**
   * Get file stats
   */
  async getFileStats(): Promise<{
    totalFiles: number;
    totalDirs: number;
    totalSize: number;
  }> {
    await this.delay(200);
    
    const tree = await this.getFileTree();
    let files = 0;
    let dirs = 0;
    let size = 0;
    
    const count = (node: FileNode) => {
      if (node.type === 'file') {
        files++;
        size += node.size || 0;
      } else {
        dirs++;
      }
      node.children?.forEach(count);
    };
    
    count(tree);
    
    return { totalFiles: files, totalDirs: dirs, totalSize: size };
  }

  // Helper methods
  private findNode(node: FileNode, path: string): FileNode | null {
    if (node.path === path) return node;
    
    if (node.children) {
      for (const child of node.children) {
        const found = this.findNode(child, path);
        if (found) return found;
      }
    }
    
    return null;
  }

  private searchNode(node: FileNode, query: string, results: FileNode[]) {
    if (node.name.toLowerCase().includes(query)) {
      results.push(node);
    }
    
    node.children?.forEach(child => this.searchNode(child, query, results));
  }

  private formatTimestamp(date: Date): string {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate ASCII file tree visualization
   */
  generateTreeView(node: FileNode, prefix: string = '', isLast: boolean = true): string {
    const lines: string[] = [];
    const connector = isLast ? '└── ' : '├── ';
    const icon = node.type === 'directory' ? '📁' : '📄';
    
    lines.push(prefix + connector + icon + ' ' + node.name);
    
    if (node.children && node.children.length > 0) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      node.children.forEach((child, index) => {
        const childIsLast = index === node.children!.length - 1;
        lines.push(this.generateTreeView(child, newPrefix, childIsLast));
      });
    }
    
    return lines.join('\n');
  }
}

export default FileSystemAgent.getInstance();
