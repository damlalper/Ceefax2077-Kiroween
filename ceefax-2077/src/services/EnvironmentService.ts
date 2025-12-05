// Environment Monitoring Service
// Simulates AQI, radiation, and atmospheric conditions

export interface AtmosphereData {
  aqi: number // Air Quality Index (0-500)
  aqiLevel: 'GOOD' | 'MODERATE' | 'UNHEALTHY_SENSITIVE' | 'UNHEALTHY' | 'VERY_UNHEALTHY' | 'HAZARDOUS'
  pm25: number // Particulate Matter 2.5
  pm10: number // Particulate Matter 10
  ozone: number // O3 in ppb
  no2: number // Nitrogen Dioxide in ppb
  radiation: number // μSv/h (microsieverts per hour)
  radiationLevel: 'SAFE' | 'ELEVATED' | 'HIGH' | 'DANGEROUS'
  temperature: number // Celsius
  humidity: number // Percentage
  pressure: number // hPa
  uvIndex: number // 0-11+
  warning: string
  hazardous: boolean
}

export interface ShelterLocation {
  x: number
  y: number
  type: 'WATER' | 'POWER' | 'MEDICAL' | 'SHELTER'
  status: 'ACTIVE' | 'LIMITED' | 'OFFLINE'
  distance: number // km
  name: string // Display name for the shelter
}

export class EnvironmentService {
  /**
   * Generate simulated atmosphere data
   * Includes random variations to simulate real conditions
   * Note: In production, this could fetch from OpenWeatherMap API
   */
  static generateAtmosphereData(): AtmosphereData {
    // Simulate varying conditions
    const baseAQI = 50 + Math.random() * 150 // 50-200 range
    const aqi = Math.floor(baseAQI)
    
    // Determine AQI level
    let aqiLevel: AtmosphereData['aqiLevel']
    if (aqi <= 50) aqiLevel = 'GOOD'
    else if (aqi <= 100) aqiLevel = 'MODERATE'
    else if (aqi <= 150) aqiLevel = 'UNHEALTHY_SENSITIVE'
    else if (aqi <= 200) aqiLevel = 'UNHEALTHY'
    else if (aqi <= 300) aqiLevel = 'VERY_UNHEALTHY'
    else aqiLevel = 'HAZARDOUS'

    // Generate related pollutants
    const pm25 = Math.floor(aqi * 0.4 + Math.random() * 20)
    const pm10 = Math.floor(pm25 * 1.5 + Math.random() * 30)
    const ozone = Math.floor(20 + Math.random() * 80)
    const no2 = Math.floor(10 + Math.random() * 50)

    // Radiation levels (normal background is 0.05-0.20 μSv/h)
    const baseRadiation = 0.08 + Math.random() * 0.15
    const radiation = Math.round(baseRadiation * 100) / 100
    
    let radiationLevel: AtmosphereData['radiationLevel']
    if (radiation < 0.20) radiationLevel = 'SAFE'
    else if (radiation < 0.50) radiationLevel = 'ELEVATED'
    else if (radiation < 1.00) radiationLevel = 'HIGH'
    else radiationLevel = 'DANGEROUS'

    // Weather data
    const temperature = Math.floor(15 + Math.random() * 20) // 15-35°C
    const humidity = Math.floor(30 + Math.random() * 60) // 30-90%
    const pressure = Math.floor(1000 + Math.random() * 30) // 1000-1030 hPa
    const uvIndex = Math.floor(Math.random() * 12) // 0-11

    // Generate warning
    const hazardous = aqiLevel === 'HAZARDOUS' || aqiLevel === 'VERY_UNHEALTHY' || radiationLevel === 'DANGEROUS'
    const warning = this.generateWarning(aqiLevel, radiationLevel)

    return {
      aqi,
      aqiLevel,
      pm25,
      pm10,
      ozone,
      no2,
      radiation,
      radiationLevel,
      temperature,
      humidity,
      pressure,
      uvIndex,
      warning,
      hazardous,
    }
  }

  /**
   * Generate warning message
   */
  private static generateWarning(aqiLevel: string, radiationLevel: string): string {
    if (aqiLevel === 'HAZARDOUS') {
      return '🚨 HAZARDOUS AIR QUALITY - STAY INDOORS - EMERGENCY PROTOCOLS ACTIVE'
    }
    if (aqiLevel === 'VERY_UNHEALTHY') {
      return '⚠️ VERY UNHEALTHY AIR - AVOID OUTDOOR ACTIVITY - MASKS REQUIRED'
    }
    if (radiationLevel === 'DANGEROUS') {
      return '☢️ DANGEROUS RADIATION DETECTED - SEEK SHELTER IMMEDIATELY'
    }
    if (radiationLevel === 'HIGH') {
      return '⚠️ ELEVATED RADIATION - LIMIT EXPOSURE TIME'
    }
    if (aqiLevel === 'UNHEALTHY') {
      return '⚠️ UNHEALTHY AIR QUALITY - SENSITIVE GROUPS SHOULD STAY INDOORS'
    }
    if (aqiLevel === 'UNHEALTHY_SENSITIVE') {
      return '🟡 UNHEALTHY FOR SENSITIVE GROUPS - REDUCE PROLONGED OUTDOOR ACTIVITY'
    }
    if (aqiLevel === 'MODERATE') {
      return '🟢 MODERATE AIR QUALITY - ACCEPTABLE FOR MOST PEOPLE'
    }
    return '✓ GOOD CONDITIONS - SAFE FOR OUTDOOR ACTIVITY'
  }

  /**
   * Get AQI color
   */
  static getAQIColor(aqi: number): string {
    if (aqi <= 50) return 'text-green-400'
    if (aqi <= 100) return 'text-yellow-400'
    if (aqi <= 150) return 'text-orange-400'
    if (aqi <= 200) return 'text-red-400'
    if (aqi <= 300) return 'text-red-600'
    return 'text-red-800'
  }

  /**
   * Get radiation color
   */
  static getRadiationColor(level: string): string {
    switch (level) {
      case 'SAFE': return 'text-green-400'
      case 'ELEVATED': return 'text-yellow-400'
      case 'HIGH': return 'text-orange-400'
      case 'DANGEROUS': return 'text-red-600'
      default: return 'text-white'
    }
  }

  /**
   * Generate ASCII weather icon
   */
  static getWeatherIcon(aqi: number, temp: number): string {
    if (aqi > 200) {
      // Hazardous - toxic cloud
      return `
    ▄▄▄▄▄▄▄
  ▄█████████▄
 ███☢️☢️☢️███
 ███████████
  ▀▀▀▀▀▀▀▀▀`
    }
    if (aqi > 150) {
      // Unhealthy - smog
      return `
    ▄▄▄▄▄▄▄
  ▄█████████▄
 ███▓▓▓▓▓███
 ███████████
  ▀▀▀▀▀▀▀▀▀`
    }
    if (temp > 30) {
      // Hot sun
      return `
   \\ | /
  ─ ☀️ ─
   / | \\`
    }
    if (temp < 10) {
      // Cold
      return `
    ❄️
   ❄️❄️
  ❄️❄️❄️`
    }
    // Normal
    return `
    ☁️
  ☁️☁️☁️
    ☁️`
  }

  /**
   * Generate shelter map (20x20 grid)
   */
  static generateShelterMap(): { grid: string[][], shelters: ShelterLocation[] } {
    const size = 20
    const grid: string[][] = []
    
    // Initialize empty grid
    for (let y = 0; y < size; y++) {
      grid[y] = []
      for (let x = 0; x < size; x++) {
        grid[y][x] = '·' // Empty space
      }
    }

    // Place shelters
    const shelters: ShelterLocation[] = []
    
    // Water sources
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(Math.random() * size)
      const y = Math.floor(Math.random() * size)
      grid[y][x] = 'W'
      shelters.push({
        x, y,
        type: 'WATER',
        status: Math.random() > 0.2 ? 'ACTIVE' : 'LIMITED',
        distance: Math.random() * 5,
        name: `WATER-${i + 1}`
      })
    }

    // Power stations
    for (let i = 0; i < 2; i++) {
      const x = Math.floor(Math.random() * size)
      const y = Math.floor(Math.random() * size)
      if (grid[y][x] === '·') {
        grid[y][x] = 'P'
        shelters.push({
          x, y,
          type: 'POWER',
          status: Math.random() > 0.3 ? 'ACTIVE' : 'OFFLINE',
          distance: Math.random() * 5,
          name: `POWER-${i + 1}`
        })
      }
    }

    // Medical facilities
    for (let i = 0; i < 2; i++) {
      const x = Math.floor(Math.random() * size)
      const y = Math.floor(Math.random() * size)
      if (grid[y][x] === '·') {
        grid[y][x] = 'M'
        shelters.push({
          x, y,
          type: 'MEDICAL',
          status: Math.random() > 0.15 ? 'ACTIVE' : 'LIMITED',
          distance: Math.random() * 5,
          name: `MEDICAL-${i + 1}`
        })
      }
    }

    // Shelter locations
    for (let i = 0; i < 3; i++) {
      const x = Math.floor(Math.random() * size)
      const y = Math.floor(Math.random() * size)
      if (grid[y][x] === '·') {
        grid[y][x] = 'S'
        shelters.push({
          x, y,
          type: 'SHELTER',
          status: 'ACTIVE',
          distance: Math.random() * 5,
          name: `SHELTER-${i + 1}`
        })
      }
    }

    // Place player at center
    grid[10][10] = 'X'

    return { grid, shelters }
  }

  /**
   * Get status color
   */
  static getStatusColor(status: ShelterLocation['status']): string {
    switch (status) {
      case 'ACTIVE': return 'text-green-400'
      case 'LIMITED': return 'text-yellow-400'
      case 'OFFLINE': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }
}
