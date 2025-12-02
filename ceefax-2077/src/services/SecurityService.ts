// Security Service - Personal protection and fraud detection

export interface ScamAnalysis {
  text: string
  dangerLevel: number // 0-100
  verdict: 'SAFE' | 'SUSPICIOUS' | 'SCAM' | 'CRITICAL_SCAM'
  redFlags: string[]
  confidence: number
  recommendation: string
}

export interface CrimeRisk {
  location: string
  riskScore: number // 0-10 (0 = safest, 10 = most dangerous)
  safetyLevel: 'VERY_SAFE' | 'SAFE' | 'MODERATE' | 'RISKY' | 'DANGEROUS'
  warnings: string[]
  recommendations: string[]
}

export interface LegalRight {
  issue: string
  law: string
  yourRight: string
  action: string
}

export class SecurityService {
  /**
   * Analyze text for scam/phishing indicators
   */
  static analyzeScam(text: string): ScamAnalysis {
    const lowerText = text.toLowerCase()
    const redFlags: string[] = []
    let dangerLevel = 0

    // Critical scam keywords (high danger)
    const criticalKeywords = [
      'urgent action required', 'account suspended', 'verify your password',
      'click here immediately', 'your account will be closed', 'confirm your identity',
      'unusual activity detected', 'security alert', 'verify within 24 hours'
    ]

    criticalKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        redFlags.push(`Critical phrase: "${keyword}"`)
        dangerLevel += 30
      }
    })

    // High-risk keywords
    const highRiskKeywords = [
      'password', 'bank', 'credit card', 'social security', 'ssn',
      'verify', 'confirm', 'urgent', 'immediately', 'suspended',
      'locked', 'unusual', 'security', 'alert', 'warning'
    ]

    highRiskKeywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        redFlags.push(`High-risk keyword: "${keyword}"`)
        dangerLevel += 10
      }
    })

    // Suspicious patterns
    if (lowerText.includes('click here') || lowerText.includes('click this link')) {
      redFlags.push('Suspicious link request')
      dangerLevel += 15
    }

    if (lowerText.includes('prize') || lowerText.includes('winner') || lowerText.includes('congratulations')) {
      redFlags.push('Prize/lottery scam pattern')
      dangerLevel += 20
    }

    if (lowerText.includes('irs') || lowerText.includes('tax') || lowerText.includes('refund')) {
      redFlags.push('IRS/tax scam pattern')
      dangerLevel += 25
    }

    // Check for urgency tactics
    const urgencyWords = ['now', 'immediately', 'urgent', 'asap', 'today', 'within 24 hours']
    const urgencyCount = urgencyWords.filter(word => lowerText.includes(word)).length
    if (urgencyCount >= 2) {
      redFlags.push('Multiple urgency tactics detected')
      dangerLevel += 15
    }

    // Check for suspicious URLs
    if (lowerText.match(/http[s]?:\/\//)) {
      redFlags.push('Contains URL - verify before clicking')
      dangerLevel += 10
    }

    // Check for phone numbers
    if (lowerText.match(/\d{3}[-.]?\d{3}[-.]?\d{4}/)) {
      redFlags.push('Contains phone number - verify legitimacy')
      dangerLevel += 5
    }

    // Cap danger level
    dangerLevel = Math.min(dangerLevel, 100)

    // Determine verdict
    let verdict: ScamAnalysis['verdict']
    if (dangerLevel >= 70) verdict = 'CRITICAL_SCAM'
    else if (dangerLevel >= 50) verdict = 'SCAM'
    else if (dangerLevel >= 25) verdict = 'SUSPICIOUS'
    else verdict = 'SAFE'

    // Calculate confidence
    const confidence = Math.min(75 + redFlags.length * 5, 99)

    // Generate recommendation
    const recommendation = this.generateScamRecommendation(verdict)

    // Add default if no flags
    if (redFlags.length === 0) {
      redFlags.push('No obvious scam indicators detected')
    }

    return {
      text,
      dangerLevel,
      verdict,
      redFlags,
      confidence,
      recommendation,
    }
  }

  /**
   * Generate scam recommendation
   */
  private static generateScamRecommendation(verdict: string): string {
    switch (verdict) {
      case 'CRITICAL_SCAM':
        return '🚨 DO NOT RESPOND - Delete immediately - Report to authorities - Block sender'
      case 'SCAM':
        return '⚠️ LIKELY SCAM - Do not click links - Do not provide information - Delete message'
      case 'SUSPICIOUS':
        return '⚡ PROCEED WITH CAUTION - Verify sender independently - Do not click links'
      case 'SAFE':
      default:
        return '✓ APPEARS SAFE - Always verify sender before taking action'
    }
  }

  /**
   * Get crime risk for location
   */
  static getCrimeRisk(location: string): CrimeRisk {
    const lowerLocation = location.toLowerCase()
    const warnings: string[] = []
    const recommendations: string[] = []
    let riskScore = 5 // Default moderate risk

    // High-risk cities (simulated data)
    const highRiskCities = ['detroit', 'baltimore', 'memphis', 'st. louis', 'oakland']
    const lowRiskCities = ['tokyo', 'singapore', 'zurich', 'copenhagen', 'oslo']

    if (highRiskCities.some(city => lowerLocation.includes(city))) {
      riskScore = 8
      warnings.push('High violent crime rate')
      warnings.push('Property crime above average')
      warnings.push('Carjacking risk in certain areas')
      recommendations.push('Avoid walking alone at night')
      recommendations.push('Keep valuables hidden')
      recommendations.push('Stay in well-lit areas')
    } else if (lowRiskCities.some(city => lowerLocation.includes(city))) {
      riskScore = 2
      warnings.push('Pickpocket risk in tourist areas')
      recommendations.push('Watch belongings in crowded places')
      recommendations.push('Use hotel safe for valuables')
    } else {
      // Moderate risk (default)
      riskScore = 5
      warnings.push('Pickpocket risk in crowded areas')
      warnings.push('Vehicle break-ins reported')
      warnings.push('Petty theft in tourist zones')
      recommendations.push('Stay aware of surroundings')
      recommendations.push("Don't leave items in car")
      recommendations.push('Use well-lit parking')
    }

    // Add time-based warnings
    const hour = new Date().getHours()
    if (hour >= 22 || hour <= 5) {
      warnings.push('Late night hours - increased risk')
      recommendations.push('Travel in groups if possible')
    }

    // Determine safety level
    let safetyLevel: CrimeRisk['safetyLevel']
    if (riskScore <= 2) safetyLevel = 'VERY_SAFE'
    else if (riskScore <= 4) safetyLevel = 'SAFE'
    else if (riskScore <= 6) safetyLevel = 'MODERATE'
    else if (riskScore <= 8) safetyLevel = 'RISKY'
    else safetyLevel = 'DANGEROUS'

    return {
      location,
      riskScore,
      safetyLevel,
      warnings,
      recommendations,
    }
  }

  /**
   * Get legal rights for common issues
   */
  static getLegalRights(issue: string): LegalRight {
    const lowerIssue = issue.toLowerCase()

    // Landlord issues
    if (lowerIssue.includes('landlord') || lowerIssue.includes('rent') || lowerIssue.includes('evict')) {
      if (lowerIssue.includes('heat') || lowerIssue.includes('repair') || lowerIssue.includes('fix')) {
        return {
          issue: 'Landlord refusing repairs',
          law: 'Implied Warranty of Habitability',
          yourRight: 'Landlord must maintain livable conditions including heat, water, and structural safety',
          action: 'Document issues, send written notice, withhold rent if allowed by state, or repair and deduct',
        }
      }
      if (lowerIssue.includes('deposit')) {
        return {
          issue: 'Security deposit dispute',
          law: 'State Security Deposit Laws',
          yourRight: 'Landlord must return deposit within 14-60 days (varies by state) with itemized deductions',
          action: 'Send written demand, file small claims court if not returned, may recover 2-3x damages',
        }
      }
      return {
        issue: 'Landlord-tenant dispute',
        law: 'Residential Tenancy Act',
        yourRight: 'You have right to quiet enjoyment, proper notice for entry, and protection from illegal eviction',
        action: 'Review lease, document violations, send written notice, contact tenant rights organization',
      }
    }

    // Employment issues
    if (lowerIssue.includes('fired') || lowerIssue.includes('job') || lowerIssue.includes('work') || lowerIssue.includes('employ')) {
      if (lowerIssue.includes('discriminat') || lowerIssue.includes('harass')) {
        return {
          issue: 'Workplace discrimination/harassment',
          law: 'Title VII Civil Rights Act & EEOC',
          yourRight: 'Protected from discrimination based on race, gender, age, religion, disability, or national origin',
          action: 'Document incidents, report to HR, file EEOC complaint within 180 days, consult employment lawyer',
        }
      }
      return {
        issue: 'Wrongful termination',
        law: 'At-Will Employment Doctrine (with exceptions)',
        yourRight: 'Cannot be fired for illegal reasons (discrimination, retaliation, refusing illegal acts)',
        action: 'Review termination reason, gather evidence, file unemployment, consult employment attorney',
      }
    }

    // Consumer issues
    if (lowerIssue.includes('refund') || lowerIssue.includes('return') || lowerIssue.includes('purchase')) {
      return {
        issue: 'Consumer refund/return',
        law: 'Consumer Protection Act & FTC Rules',
        yourRight: 'Right to refund for defective products, false advertising, or breach of warranty',
        action: 'Contact seller in writing, dispute credit card charge, file FTC complaint, small claims court',
      }
    }

    // Debt/credit issues
    if (lowerIssue.includes('debt') || lowerIssue.includes('collector') || lowerIssue.includes('credit')) {
      return {
        issue: 'Debt collection harassment',
        law: 'Fair Debt Collection Practices Act (FDCPA)',
        yourRight: 'Collectors cannot harass, lie, or contact you at work if prohibited',
        action: 'Send cease communication letter, document violations, file CFPB complaint, sue for damages',
      }
    }

    // Police encounter
    if (lowerIssue.includes('police') || lowerIssue.includes('arrest') || lowerIssue.includes('cop')) {
      return {
        issue: 'Police encounter',
        law: 'Fourth & Fifth Amendment Rights',
        yourRight: 'Right to remain silent, refuse searches without warrant, request attorney',
        action: 'Say "I invoke my right to remain silent and want a lawyer" - Do not resist - Document everything',
      }
    }

    // Default general advice
    return {
      issue: 'General legal issue',
      law: 'Constitutional Rights & State Laws',
      yourRight: 'You have right to legal representation and due process in all legal matters',
      action: 'Document everything, consult with attorney, know your state-specific laws, file complaints with relevant agencies',
    }
  }

  /**
   * Get risk score color
   */
  static getRiskColor(score: number): string {
    if (score <= 2) return 'text-green-400'
    if (score <= 4) return 'text-yellow-400'
    if (score <= 6) return 'text-orange-400'
    if (score <= 8) return 'text-red-400'
    return 'text-red-600'
  }

  /**
   * Get verdict color
   */
  static getVerdictColor(verdict: ScamAnalysis['verdict']): string {
    switch (verdict) {
      case 'SAFE': return 'text-green-400'
      case 'SUSPICIOUS': return 'text-yellow-400'
      case 'SCAM': return 'text-red-400'
      case 'CRITICAL_SCAM': return 'text-red-600'
      default: return 'text-white'
    }
  }
}
