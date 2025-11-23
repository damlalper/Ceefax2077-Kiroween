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
   * Simulates real-time monitoring data
   */
  static getSystemHealth(): SystemHealth {
    const cpu = Math.floor(Math.random() * 100)
    const ram = Math.floor(Math.random() * 100)
    const disk = Math.floor(Math.random() * 100)
    
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
   * Simulates GitHub/Vercel deployment history
   */
  static async getDeployments(): Promise<Deployment[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))

    const commits = [
      { msg: 'FIX: MEMORY LEAK IN AUTH SERVICE', author: 'ALICE' },
      { msg: 'FEAT: AI AGENT INTEGRATION', author: 'BOB' },
      { msg: 'HOTFIX: DATABASE CONNECTION POOL', author: 'CHARLIE' },
      { msg: 'PERF: OPTIMIZE QUERY PERFORMANCE', author: 'DIANA' },
      { msg: 'SECURITY: PATCH CVE-2077-1337', author: 'EVE' },
      { msg: 'REFACTOR: MIGRATE TO MICROSERVICES', author: 'FRANK' },
      { msg: 'DOCS: UPDATE API DOCUMENTATION', author: 'GRACE' },
      { msg: 'TEST: ADD E2E COVERAGE', author: 'HENRY' },
    ]

    const statuses: Deployment['status'][] = ['SUCCESS', 'SUCCESS', 'SUCCESS', 'FAILED', 'PENDING']
    
    return commits.slice(0, 5).map((commit, index) => ({
      id: `deploy-${Date.now()}-${index}`,
      commit: `${commit.msg.substring(0, 7).toLowerCase()}${Math.random().toString(36).substring(2, 9)}`,
      message: commit.msg,
      author: commit.author,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(Date.now() - index * 3600000), // 1 hour apart
      duration: `${Math.floor(Math.random() * 5) + 1}m ${Math.floor(Math.random() * 60)}s`,
    }))
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
