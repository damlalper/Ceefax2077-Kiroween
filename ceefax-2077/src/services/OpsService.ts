// Ceefax 2077 - DevOps Service
// Mock system monitoring and deployment data

export interface SystemHealth {
  cpu: number // 0-100
  ram: number // 0-100
  disk: number // 0-100
  uptime: string
  dangerLevel: 'SAFE' | 'WARNING' | 'CRITICAL' | 'EMERGENCY'
  timestamp: Date
}

export interface Deployment {
  id: string
  commit: string
  message: string
  author: string
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'DEPLOYING'
  timestamp: Date
  duration: string
}

export interface ErrorLog {
  id: string
  level: 'ERROR' | 'WARNING' | 'CRITICAL'
  message: string
  service: string
  timestamp: Date
  count: number
}

export class OpsService {
  /**
   * Get current system health metrics
   * Uses real browser performance APIs when available
   */
  static getSystemHealth(): SystemHealth {
    // Try to get real metrics from browser
    let cpu = 0
    let ram = 0
    let disk = 0

    try {
      // Performance API for CPU estimation
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (perfData) {
        // Estimate CPU load from page load time
        const loadTime = perfData.loadEventEnd - perfData.fetchStart
        cpu = Math.min(Math.floor((loadTime / 3000) * 100), 100)
      }

      // Memory API (Chrome only)
      const memory = (performance as any).memory
      if (memory) {
        ram = Math.floor((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
      }

      // Estimate disk from localStorage usage
      if (typeof localStorage !== 'undefined') {
        let totalSize = 0
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage[key].length + key.length
          }
        }
        // Assume 5MB limit for localStorage
        disk = Math.min(Math.floor((totalSize / (5 * 1024 * 1024)) * 100), 100)
      }
    } catch (error) {
      console.warn('Could not get real metrics, using simulated:', error)
    }

    // Fallback to simulated if real metrics unavailable
    if (cpu === 0) cpu = Math.floor(Math.random() * 100)
    if (ram === 0) ram = Math.floor(Math.random() * 100)
    if (disk === 0) disk = Math.floor(Math.random() * 100)
    
    // Calculate danger level
    let dangerLevel: SystemHealth['dangerLevel'] = 'SAFE'
    if (cpu > 90 || ram > 90) {
      dangerLevel = 'EMERGENCY'
    } else if (cpu > 75 || ram > 80) {
      dangerLevel = 'CRITICAL'
    } else if (cpu > 60 || ram > 70) {
      dangerLevel = 'WARNING'
    }

    // Generate uptime
    const hours = Math.floor(Math.random() * 720) // 0-30 days
    const minutes = Math.floor(Math.random() * 60)
    const uptime = hours > 24 
      ? `${Math.floor(hours / 24)}d ${hours % 24}h`
      : `${hours}h ${minutes}m`

    return {
      cpu,
      ram,
      disk,
      uptime,
      dangerLevel,
      timestamp: new Date(),
    }
  }

  /**
   * Get recent deployments
   * Uses real build info when available, simulates otherwise
   */
  static async getDeployments(): Promise<Deployment[]> {
    // Try to get real deployment info from environment
    const deployments: Deployment[] = []

    // Check for Vercel/Netlify environment variables
    const vercelCommit = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA
    const vercelMessage = import.meta.env.VITE_VERCEL_GIT_COMMIT_MESSAGE
    const vercelAuthor = import.meta.env.VITE_VERCEL_GIT_COMMIT_AUTHOR_LOGIN

    if (vercelCommit) {
      deployments.push({
        id: `deploy-${Date.now()}`,
        commit: vercelCommit.substring(0, 7),
        message: vercelMessage || 'DEPLOYMENT',
        author: vercelAuthor || 'SYSTEM',
        status: 'SUCCESS',
        timestamp: new Date(),
        duration: '2m 34s',
      })
    }

    // Simulate additional deployments
    const commits = [
      { msg: 'FIX: MEMORY LEAK IN AUTH SERVICE', author: 'ALICE' },
      { msg: 'FEAT: AI AGENT INTEGRATION', author: 'BOB' },
      { msg: 'HOTFIX: DATABASE CONNECTION POOL', author: 'CHARLIE' },
      { msg: 'PERF: OPTIMIZE QUERY PERFORMANCE', author: 'DIANA' },
      { msg: 'SECURITY: PATCH CVE-2077-1337', author: 'EVE' },
    ]

    const statuses: Deployment['status'][] = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'FAILED', 'PENDING']
    
    const simulatedDeployments = commits.slice(0, 4).map((commit, index) => ({
      id: `deploy-${Date.now()}-${index}`,
      commit: Math.random().toString(36).substring(2, 9),
      message: commit.msg,
      author: commit.author,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(Date.now() - (index + 1) * 3600000),
      duration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
    }))

    return [...deployments, ...simulatedDeployments].slice(0, 5)
  }

  /**
   * Get recent error logs
   * Simulates error monitoring system
   */
  static async getErrorLogs(): Promise<ErrorLog[]> {
    await new Promise(resolve => setTimeout(resolve, 200))

    const errors = [
      { msg: 'DATABASE CONNECTION TIMEOUT', service: 'API-GATEWAY', level: 'CRITICAL' as const },
      { msg: 'RATE LIMIT EXCEEDED', service: 'AUTH-SERVICE', level: 'WARNING' as const },
      { msg: 'MEMORY ALLOCATION FAILED', service: 'WORKER-01', level: 'CRITICAL' as const },
      { msg: 'INVALID JWT TOKEN', service: 'AUTH-SERVICE', level: 'ERROR' as const },
      { msg: 'DISK SPACE LOW', service: 'STORAGE', level: 'WARNING' as const },
      { msg: 'NETWORK UNREACHABLE', service: 'CDN', level: 'CRITICAL' as const },
    ]

    return errors.slice(0, 4).map((error, index) => ({
      id: `error-${Date.now()}-${index}`,
      level: error.level,
      message: error.msg,
      service: error.service,
      timestamp: new Date(Date.now() - index * 60000), // 1 minute apart
      count: Math.floor(Math.random() * 50) + 1,
    }))
  }

  /**
   * Generate ASCII bar chart for metrics
   * Returns a string of block characters representing percentage
   */
  static generateBarChart(value: number, maxWidth: number = 20): string {
    const filled = Math.floor((value / 100) * maxWidth)
    const empty = maxWidth - filled
    return '█'.repeat(filled) + '░'.repeat(empty)
  }

  /**
   * Get color code based on value threshold
   */
  static getMetricColor(value: number): 'green' | 'yellow' | 'red' {
    if (value >= 90) return 'red'
    if (value >= 75) return 'yellow'
    return 'green'
  }
}
