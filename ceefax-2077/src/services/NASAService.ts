// NASA Mars Rover API Service
// Free public API - no key required

const NASA_API_KEY = 'DEMO_KEY' // Public demo key, no registration needed
const NASA_API_BASE = 'https://api.nasa.gov/mars-photos/api/v1'

export interface MarsPhoto {
  id: number
  sol: number
  camera: string
  img_src: string
  earth_date: string
  rover: string
}

export interface Planet {
  name: string
  color: string
  habitability: number
  atmosphere: string
  temperature: string
  water: string
  rotation: number // rotation speed multiplier
}

export class NASAService {
  /**
   * Fetch latest Mars Rover photo
   */
  static async getLatestMarsPhoto(): Promise<MarsPhoto | null> {
    try {
      // Fetch recent photos from Perseverance rover
      const response = await fetch(
        `${NASA_API_BASE}/rovers/perseverance/latest_photos?api_key=${NASA_API_KEY}`
      )
      
      if (!response.ok) {
        throw new Error(`NASA API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.latest_photos && data.latest_photos.length > 0) {
        const photo = data.latest_photos[0]
        return {
          id: photo.id,
          sol: photo.sol,
          camera: photo.camera.name,
          img_src: photo.img_src,
          earth_date: photo.earth_date,
          rover: photo.rover.name,
        }
      }
      
      return null
    } catch (error) {
      console.error('Failed to fetch Mars photo:', error)
      return null
    }
  }

  /**
   * Convert image to ASCII art
   * Simplified version - in production would use canvas to analyze pixels
   */
  static async imageToAscii(_imageUrl: string, width: number = 40, height: number = 20): Promise<string> {
    try {
      // For demo purposes, generate ASCII based on image characteristics
      // In a real implementation, you'd load the image, analyze pixels, and convert
      
      // Simulate Mars surface texture
      const chars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@']
      let ascii = ''
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Create rocky Mars-like terrain pattern
          const noise = Math.sin(x * 0.3) * Math.cos(y * 0.3) + Math.random() * 0.5
          const index = Math.floor((noise + 1) * chars.length / 2)
          ascii += chars[Math.min(index, chars.length - 1)]
        }
        ascii += '\n'
      }
      
      return ascii
    } catch (error) {
      console.error('Failed to convert image to ASCII:', error)
      return 'ERROR: Image conversion failed'
    }
  }

  /**
   * Generate 3D rotating planet ASCII
   */
  static generate3DPlanet(planet: Planet, rotation: number, size: number = 15): string {
    const lines: string[] = []
    const centerX = size / 2
    const centerY = size / 2
    const radius = size / 2 - 1

    for (let y = 0; y < size; y++) {
      let line = ''
      for (let x = 0; x < size; x++) {
        const dx = x - centerX
        const dy = y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance <= radius) {
          // Point is inside sphere
          const z = Math.sqrt(radius * radius - dx * dx - dy * dy)
          
          // Calculate rotation
          const rotatedX = dx * Math.cos(rotation) - z * Math.sin(rotation)
          const rotatedZ = dx * Math.sin(rotation) + z * Math.cos(rotation)
          
          // Determine character based on planet and position
          const char = this.getPlanetChar(planet, rotatedX, dy, rotatedZ, radius)
          line += char
        } else {
          line += ' '
        }
      }
      lines.push(line)
    }

    return lines.join('\n')
  }

  /**
   * Get character for planet surface
   */
  private static getPlanetChar(planet: Planet, x: number, y: number, z: number, radius: number): string {
    const brightness = (z / radius + 1) / 2 // 0 to 1

    switch (planet.name) {
      case 'Earth':
        // Blue and green
        if (Math.sin(x * 0.5) * Math.cos(y * 0.5) > 0.3) {
          return brightness > 0.6 ? '🌊' : brightness > 0.3 ? '~' : '.'
        }
        return brightness > 0.6 ? '🌲' : brightness > 0.3 ? '*' : '.'

      case 'Mars':
        // Red rocky surface
        if (brightness > 0.7) return '●'
        if (brightness > 0.5) return 'o'
        if (brightness > 0.3) return '°'
        return '.'

      case 'Jupiter':
        // Striped gas giant
        const stripe = Math.floor(y / 2) % 2
        if (stripe === 0) {
          return brightness > 0.5 ? '═' : '─'
        }
        return brightness > 0.5 ? '▓' : '░'

      case 'Titan':
        // Hazy moon
        if (brightness > 0.6) return '◉'
        if (brightness > 0.4) return '○'
        return '·'

      default:
        return brightness > 0.5 ? 'o' : '.'
    }
  }

  /**
   * Get planet data
   */
  static getPlanets(): Planet[] {
    return [
      {
        name: 'Earth',
        color: 'text-blue-400',
        habitability: 100,
        atmosphere: '78% N₂, 21% O₂',
        temperature: '15°C average',
        water: 'Abundant liquid water',
        rotation: 1,
      },
      {
        name: 'Mars',
        color: 'text-red-400',
        habitability: 12,
        atmosphere: '95% CO₂, 0.13% O₂',
        temperature: '-63°C average',
        water: 'Frozen ice caps',
        rotation: 1.2,
      },
      {
        name: 'Jupiter',
        color: 'text-yellow-400',
        habitability: 0,
        atmosphere: '90% H₂, 10% He',
        temperature: '-110°C average',
        water: 'None (gas giant)',
        rotation: 0.8,
      },
      {
        name: 'Titan',
        color: 'text-orange-400',
        habitability: 5,
        atmosphere: '98% N₂, 2% CH₄',
        temperature: '-179°C average',
        water: 'Liquid methane lakes',
        rotation: 1.5,
      },
    ]
  }

  /**
   * Get habitability color
   */
  static getHabitabilityColor(score: number): string {
    if (score >= 80) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    if (score >= 20) return 'text-orange-400'
    return 'text-red-400'
  }
}
