import { useEffect, useState } from 'react'
import { CryptoAgent, type MarketRiskAnalysis } from '../mcp/CryptoAgent'

/**
 * Custom hook that monitors market risk and activates crash mode
 * Injects global CSS class when high risk is detected
 */
export function useMarketCrash(btcPrice: number | null, ethPrice?: number | null, volatility?: number) {
  const [crashMode, setCrashMode] = useState(false)
  const [riskAnalysis, setRiskAnalysis] = useState<MarketRiskAnalysis | null>(null)

  useEffect(() => {
    if (btcPrice === null) return

    // Analyze market risk using MCP tool
    const analysis = CryptoAgent.analyzeMarketRisk(
      btcPrice,
      ethPrice || undefined,
      volatility
    )

    // Determine if crash mode should be activated
    const shouldCrash = CryptoAgent.shouldActivateCrashMode(analysis)
    
    // Update state in batch
    setRiskAnalysis(analysis)
    setCrashMode(shouldCrash)

    // Inject/remove global CSS class
    if (shouldCrash) {
      document.body.classList.add('crash-mode')
    } else {
      document.body.classList.remove('crash-mode')
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('crash-mode')
    }
  }, [btcPrice, ethPrice, volatility])

  return {
    crashMode,
    riskAnalysis,
  }
}

/**
 * Hook for components that need to react to crash mode
 */
export function useCrashModeStatus() {
  const [isCrashMode, setIsCrashMode] = useState(false)

  useEffect(() => {
    const checkCrashMode = () => {
      setIsCrashMode(document.body.classList.contains('crash-mode'))
    }

    // Check initially
    checkCrashMode()

    // Set up observer for class changes
    const observer = new MutationObserver(checkCrashMode)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  return isCrashMode
}
