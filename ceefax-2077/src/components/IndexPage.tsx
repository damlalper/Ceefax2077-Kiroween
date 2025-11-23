export default function IndexPage() {
  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner">
        <span className="double-height">INCIDENT COMMANDER</span>
      </div>

      {/* Subtitle */}
      <div className="teletext-subtitle">
        LOW-BANDWIDTH DEVOPS EMERGENCY CENTER
      </div>

      {/* Main Index - Two Column Layout */}
      <div className="teletext-index-grid">
        {/* Left Column - Core Monitoring */}
        <div className="teletext-index-column">
          <p className="text-yellow">═══ MONITORING ═══</p>
          <p className="text-cyan">► 101 SYSTEM STATUS</p>
          <p className="text-white">    CPU/RAM/DISK HEALTH</p>
          <p className="text-cyan">► 102 SERVER UPTIME</p>
          <p className="text-white">    AVAILABILITY METRICS</p>
          <p className="text-cyan">► 103 NETWORK STATUS</p>
          <p className="text-white">    LATENCY & BANDWIDTH</p>
        </div>

        {/* Right Column - Operations */}
        <div className="teletext-index-column">
          <p className="text-yellow">═══ OPERATIONS ═══</p>
          <p className="text-green">► 200 DEPLOY LOGS</p>
          <p className="text-white">    GITHUB/VERCEL HISTORY</p>
          <p className="text-red">► 300 ERROR LOGS</p>
          <p className="text-white">    LIVE ERROR TRACKING</p>
          <p className="text-magenta">► 666 KILL SWITCH</p>
          <p className="text-red">    EMERGENCY SHUTDOWN</p>
        </div>
      </div>

      {/* Status Box */}
      <div className="teletext-status-box">
        <p className="text-green">SYSTEM: OPERATIONAL</p>
        <p className="text-cyan">LOAD: NORMAL</p>
        <p className="text-white">INCIDENTS: 0 ACTIVE</p>
      </div>

      {/* Instructions */}
      <div className="teletext-instructions">
        <p className="text-white">TYPE PAGE NUMBER TO ACCESS COMMAND</p>
        <p className="text-yellow">INSTANT LOAD - ZERO BLOAT - CRISIS READY</p>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner">
        WHEN AWS FREEZES, WE'RE STILL RUNNING
      </div>
    </div>
  )
}
