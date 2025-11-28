// CoinGecko API Service - Free tier, no API key required
const COINGECKO_API = 'https://api.coingecko.com/api/v3'

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap?: number
  volume_24h?: number
}

export interface PriceHistory {
  timestamp: number
  price: number
}

export class CoinGeckoService {
  /**
   * Fetch current prices for multiple cryptocurrencies
   */
  static async getCurrentPrices(ids: string[] = ['bitcoin', 'ethereum', 'solana', 'cardano']): Promise<CryptoPrice[]> {
    try {
      const idsParam = ids.join(',')
      const response = await fetch(
        `${COINGECKO_API}/simple/price?ids=${idsParam}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`
      )
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`)
      }

      const data = await response.json()
      
      // Transform to our format
      return ids.map(id => {
        const coinData = data[id]
        if (!coinData) return null
        
        return {
          id,
          symbol: this.getSymbol(id),
          name: this.getName(id),
          current_price: coinData.usd,
          price_change_24h: coinData.usd_24h_change || 0,
          price_change_percentage_24h: coinData.usd_24h_change || 0,
          market_cap: coinData.usd_market_cap,
          volume_24h: coinData.usd_24h_vol,
        }
      }).filter(Boolean) as CryptoPrice[]
    } catch (error) {
      console.error('Failed to fetch crypto prices:', error)
      throw error
    }
  }

  /**
   * Generate simulated price history for block chart
   * Uses current price and 24h change to extrapolate
   */
  static generatePriceHistory(currentPrice: number, change24h: number, points: number = 24): PriceHistory[] {
    const history: PriceHistory[] = []
    const now = Date.now()
    const hourMs = 60 * 60 * 1000
    
    // Calculate starting price (24h ago)
    const startPrice = currentPrice - change24h
    
    // Generate points with some randomness for realistic chart
    for (let i = 0; i < points; i++) {
      const progress = i / (points - 1)
      const timestamp = now - (points - 1 - i) * hourMs
      
      // Linear interpolation with some noise
      const basePrice = startPrice + (change24h * progress)
      const noise = (Math.random() - 0.5) * (Math.abs(change24h) * 0.1)
      const price = basePrice + noise
      
      history.push({ timestamp, price })
    }
    
    return history
  }

  /**
   * Convert price history to block chart string
   */
  static generateBlockChart(history: PriceHistory[], width: number = 20): string {
    if (history.length === 0) return '▁'.repeat(width)
    
    const prices = history.map(h => h.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    const range = max - min || 1
    
    // Block characters from lowest to highest
    const blocks = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█']
    
    // Sample points evenly across history
    const step = Math.max(1, Math.floor(history.length / width))
    const sampledPrices = []
    
    for (let i = 0; i < width; i++) {
      const index = Math.min(i * step, history.length - 1)
      sampledPrices.push(prices[index])
    }
    
    // Convert to block characters
    return sampledPrices.map(price => {
      const normalized = (price - min) / range
      const blockIndex = Math.floor(normalized * (blocks.length - 1))
      return blocks[blockIndex]
    }).join('')
  }

  /**
   * Format price with appropriate decimals
   */
  static formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { maximumFractionDigits: 0 })
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    } else {
      return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 })
    }
  }

  /**
   * Get symbol for crypto ID
   */
  private static getSymbol(id: string): string {
    const symbols: Record<string, string> = {
      bitcoin: 'BTC',
      ethereum: 'ETH',
      solana: 'SOL',
      cardano: 'ADA',
    }
    return symbols[id] || id.toUpperCase().slice(0, 3)
  }

  /**
   * Get name for crypto ID
   */
  private static getName(id: string): string {
    const names: Record<string, string> = {
      bitcoin: 'Bitcoin',
      ethereum: 'Ethereum',
      solana: 'Solana',
      cardano: 'Cardano',
    }
    return names[id] || id.charAt(0).toUpperCase() + id.slice(1)
  }
}
