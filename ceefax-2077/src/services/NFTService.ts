// OpenSea API - Free, no key required
// https://api.opensea.io/api/v1/collections

export interface NFT {
  id: number
  name: string
  collection: string
  price: number
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
  imageUrl: string
  floorPrice: number
}

export class NFTService {
  private static OPENSEA_API = 'https://api.opensea.io/api/v2'

  /**
   * Fetch trending NFT collections
   */
  static async getTrendingNFTs(): Promise<NFT[]> {
    try {
      // OpenSea API v2 - no key needed for basic endpoints
      const response = await fetch(
        `${this.OPENSEA_API}/collections?limit=10`,
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      )
      
      if (!response.ok) {
        throw new Error('OpenSea API error')
      }

      const data = await response.json()
      
      return data.collections?.slice(0, 5).map((item: any, idx: number) => ({
        id: idx + 1,
        name: item.name || 'NFT Collection',
        collection: item.collection || 'Digital Art',
        price: parseFloat((Math.random() * 2).toFixed(2)),
        rarity: this.getRandomRarity(),
        imageUrl: item.image_url || '',
        floorPrice: item.stats?.floor_price || 0.5
      })) || this.getFallbackNFTs()
    } catch (error) {
      console.error('Failed to fetch NFTs:', error)
      return this.getFallbackNFTs()
    }
  }

  /**
   * Fallback data if API fails
   */
  private static getFallbackNFTs(): NFT[] {
    return [
      {
        id: 1,
        name: 'Cyber Punk #2077',
        collection: 'Digital Nomads',
        price: 0.5,
        rarity: 'LEGENDARY',
        imageUrl: '',
        floorPrice: 0.5
      },
      {
        id: 2,
        name: 'Pixel Traveler',
        collection: 'Nomad Life',
        price: 0.2,
        rarity: 'RARE',
        imageUrl: '',
        floorPrice: 0.2
      },
      {
        id: 3,
        name: 'Code Warrior',
        collection: 'Dev Squad',
        price: 0.8,
        rarity: 'EPIC',
        imageUrl: '',
        floorPrice: 0.8
      }
    ]
  }

  private static getRandomRarity(): 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' {
    const rand = Math.random()
    if (rand < 0.6) return 'COMMON'
    if (rand < 0.85) return 'RARE'
    if (rand < 0.97) return 'EPIC'
    return 'LEGENDARY'
  }

  /**
   * Generate ASCII art for NFT
   */
  static generateNFTAscii(rarity: string): string {
    const arts = {
      LEGENDARY: `
  ▄▄▄▄▄▄▄
 ███████████
 ██ ▀ ▀ ██
 ███████████
  ▀▀▀▀▀▀▀`,
      EPIC: `
  ▄▄▄▄▄
 ███████
 ██▀▀▀██
 ███████
  ▀▀▀▀▀`,
      RARE: `
   ▄█▄
  █████
  ▀███▀
   ███
  █▀ ▀█`,
      COMMON: `
   ▄▄▄
  █████
   ███
  █▀ ▀█`
    }
    return arts[rarity as keyof typeof arts] || arts.COMMON
  }
}
