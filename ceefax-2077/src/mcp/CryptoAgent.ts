// MCP Tool: Crypto Market Risk Analyzer
// This acts as an MCP (Model Context Protocol) tool for market analysis

export interface MarketRiskAnalysis {
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  risk_score: number // 0-100
  factors: string[]
  recommendation: string
  alert: boolean
}

export class CryptoAgent {
  // Risk thresholds
  private static readonly BTC_HIGH_RISK_THRESHOLD = 90000
  private static readonly BTC_CRITICAL_THRESHOLD = 80000
  private static readonly VOLATILITY_THRESHOLD = 5 // 5% change triggers alert

  /**
   * MCP Tool: Analyze market risk based on current prices
   * This is the main entry point for the MCP integration
   */
  static analyzeMarketRisk(btcPrice: number, ethPrice?: number, volatility?: number): MarketRiskAnalysis {
    const factors: string[] = []
    let riskScore = 0
    let riskLevel: MarketRiskAnalysis['risk_level'] = 'LOW'
    let alert = false

    // Bitcoin price analysis
    if (btcPrice < this.BTC_CRITICAL_THRESHOLD) {
      factors.push(`BTC below critical threshold ($${this.BTC_CRITICAL_THRESHOLD.toLocaleString()})`)
      riskScore += 40
      alert = true
    } else if (btcPrice < this.BTC_HIGH_RISK_THRESHOLD) {
      factors.push(`BTC below high-risk threshold ($${this.BTC_HIGH_RISK_THRESHOLD.toLocaleString()})`)
      riskScore += 25
      alert = true
    }

    // Volatility analysis
    if (volatility !== undefined && Math.abs(volatility) > this.VOLATILITY_THRESHOLD) {
      factors.push(`High volatility detected (${volatility.toFixed(2)}% 24h change)`)
      riskScore += 20
      alert = true
    }

    // ETH correlation check
    if (ethPrice !== undefined && ethPrice < 3000) {
      factors.push('ETH showing weakness (< $3000)')
      riskScore += 15
    }

    // Determine risk level
    if (riskScore >= 60) {
      riskLevel = 'CRITICAL'
    } else if (riskScore >= 40) {
      riskLevel = 'HIGH'
    } else if (riskScore >= 20) {
      riskLevel = 'MEDIUM'
    } else {
      riskLevel = 'LOW'
    }

    // Generate recommendation
    const recommendation = this.generateRecommendation(riskLevel, btcPrice)

    // Add default factor if none detected
    if (factors.length === 0) {
      factors.push('Market conditions stable')
    }

    return {
      risk_level: riskLevel,
      risk_score: Math.min(riskScore, 100),
      factors,
      recommendation,
      alert,
    }
  }

  /**
   * Generate recommendation based on risk level
   */
  private static generateRecommendation(riskLevel: string, _btcPrice: number): string {
    switch (riskLevel) {
      case 'CRITICAL':
        return '🚨 EXTREME CAUTION - Consider reducing exposure immediately'
      case 'HIGH':
        return '⚠️ HIGH RISK - Monitor closely, prepare for volatility'
      case 'MEDIUM':
        return '⚡ MODERATE RISK - Stay alert, review positions'
      case 'LOW':
      default:
        return '✓ LOW RISK - Market conditions favorable'
    }
  }

  /**
   * Calculate market sentiment score (0-100)
   */
  static calculateSentiment(prices: Array<{ price: number; change: number }>): number {
    if (prices.length === 0) return 50

    const avgChange = prices.reduce((sum, p) => sum + p.change, 0) / prices.length
    
    // Convert change percentage to sentiment score
    // -10% = 0, 0% = 50, +10% = 100
    const sentiment = 50 + (avgChange * 5)
    return Math.max(0, Math.min(100, sentiment))
  }

  /**
   * Determine if crash mode should be activated
   */
  static shouldActivateCrashMode(analysis: MarketRiskAnalysis): boolean {
    return analysis.risk_level === 'HIGH' || analysis.risk_level === 'CRITICAL'
  }
}
