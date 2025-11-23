import { useEffect, useState } from 'react'
import { OpsService } from '../services/OpsService'
import type { SystemHealth } from '../services/OpsService'

export default function SystemStatusPage() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    // Initial load
    const loadHealth = () => {
      const data = OpsService.getSystemHealth()
      setHealth(data)
    }

    loadHealth()

    // Refresh every 2 seconds
    const refreshInterval = setInterval(loadHealth, 2000)

    // Blink effect for critical alerts
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    return () => {
      clearInterval(refreshInterval)
      clearInterval(blinkInterval)
    }
  }, [])

  if (!health) {
    return (
      <div className="teletext-page">
        <div className="teletext-loading animate-pulse">
          LOADING SYSTEM STATUS...
        </div>
      </div>
    )
  }

  const cpuColor = OpsService.getMetricColor(health.cpu)
  const ramColor = OpsService.getMetricColor(health.ram)
  const diskColor = OpsService.getMetricColor(health.disk)

  const shouldBlink = health.dangerLevel === 'EMERGENCY' || health.dangerLevel === 'CRITICAL'

  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner">
        <span className="double-height">SYSTEM STATUS</span>
      </div>

      {/* Danger Level Alert */}
      <div className={`teletext-alert teletext-alert-${health.dangerLevel.toLowerCase()} ${shouldBlink && blink ? 'opacity-100' : 'opacity-100'}`}>
        <p className="text-center">
          STATUS: {health.dangerLevel} | UPTIME: {health.uptime}
        </p>
      </div>

      {/* System Metrics */}
      <div className="teletext-metrics">
        {/* CPU */}
        <div className="teletext-metric-row">
          <div className="teletext-metric-label">
            <span className={`text-${cpuColor} ${health.cpu > 90 && blink ? 'opacity-50' : 'opacity-100'}`}>
              CPU: {health.cpu}%
            </span>
          </div>
          <div className="teletext-metric-bar">
            <span className={`text-${cpuColor}`}>
              {OpsService.generateBarChart(health.cpu, 30)}
            </span>
          </div>
        </div>

        {/* RAM */}
        <div className="teletext-metric-row">
          <div className="teletext-metric-label">
            <span className={`text-${ramColor} ${health.ram > 90 && blink ? 'opacity-50' : 'opacity-100'}`}>
              RAM: {health.ram}%
            </span>
          </div>
          <div className="teletext-metric-bar">
            <span className={`text-${ramColor}`}>
              {OpsService.generateBarChart(health.ram, 30)}
            </span>
          </div>
        </div>

        {/* DISK */}
        <div className="teletext-metric-row">
          <div className="teletext-metric-label">
            <span className={`text-${diskColor}`}>
              DISK: {health.disk}%
            </span>
          </div>
          <div className="teletext-metric-bar">
            <span className={`text-${diskColor}`}>
              {OpsService.generateBarChart(health.disk, 30)}
            </span>
          </div>
        </div>
      </div>

      {/* Status Grid */}
      <div className="teletext-status-grid">
        <div className="teletext-status-item">
          <p className="text-cyan">SERVERS</p>
          <p className="text-green">12/12 ONLINE</p>
        </div>
        <div className="teletext-status-item">
          <p className="text-cyan">SERVICES</p>
          <p className="text-green">8/8 RUNNING</p>
        </div>
        <div className="teletext-status-item">
          <p className="text-cyan">DATABASE</p>
          <p className="text-green">CONNECTED</p>
        </div>
        <div className="teletext-status-item">
          <p className="text-cyan">CACHE</p>
          <p className="text-yellow">98% HIT RATE</p>
        </div>
      </div>

      {/* Recommendations */}
      {health.dangerLevel !== 'SAFE' && (
        <div className="teletext-recommendations">
          <p className="text-yellow">► RECOMMENDED ACTIONS:</p>
          {health.cpu > 90 && <p className="text-white">  - SCALE UP CPU RESOURCES</p>}
          {health.ram > 90 && <p className="text-white">  - INCREASE MEMORY ALLOCATION</p>}
          {health.dangerLevel === 'EMERGENCY' && (
            <p className="text-red">  - CONSIDER PAGE 666 (KILL SWITCH)</p>
          )}
        </div>
      )}

      {/* Auto-refresh indicator */}
      <div className="teletext-refresh">
        <p className="text-cyan">AUTO-REFRESH: 2s | LAST UPDATE: {health.timestamp.toLocaleTimeString()}</p>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner">
        REAL-TIME MONITORING - ZERO LATENCY
      </div>
    </div>
  )
}
