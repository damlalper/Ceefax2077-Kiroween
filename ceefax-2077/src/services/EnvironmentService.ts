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
  // OpenWeatherMap API (free tier: 1000 calls/day)
  private static WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || ''
  private static WEATHER_API = 'https://api.openweathermap.org/data/2.5'
  
  // Default location (can be changed)
  private static DEFAULT_LAT = 51.5074 // London
  private static DEFAULT_LON = -0.1278

  /**
   * Fetch real atmosphere data from OpenWeatherMap
   */
  static async generateAtmosphereData(): Promise<AtmosphereData> {
    // If API key is available, fetch real data
    if (this.WEATHER_API_KEY) {
      try {
        return await this.fetchRealWeatherData()
      } catch (error) {
        console.error('Failed to fetch real weather data:', error)
        // Fall back to simulated data
      }
    }

    // Fallback: Simulate data
    return this.generateSimulatedData()
  }

  /**
   * Fetch real weather and air quality data
   */
  private static async fetchRealWeatherData(): Promise<AtmosphereData> {
    try {
      // Fetch weather and air pollution in parallel
      const [weatherRes, airRes] = await Promise.all([
        fetch(`${this.WEATHER_API}/weather?lat=${this.DEFAULT_LAT}&lon=${this.DEFAULT_LON}&appid=${this.WEATHER_API_KEY}&units=metric`),
        fetch(`${this.WEATHER_API}/air_pollution?lat=${this.DEFAULT_LAT}&lon=${this.DEFAULT_LON}&appid=${this.WEATHER_API_KEY}`)
      ])

      if (!weatherRes.ok || !airRes.ok) {
        throw new Error('Weather API error')
      }

      const weatherData = await weatherRes.json()
      const airData = await airRes.json()

      // Extract data
      const temp = Math.round(weatherData.main.temp)
      const humidity = weatherData.main.humidity
      const pressure = weatherData.main.pressure

      // Air quality index (1-5 scale from API, convert to 0-500)
      const apiAqi = airData.list[0].main.aqi
      const aqi = this.convertAQI(apiAqi)

      // Pollutants
      const components = airData.list[0].components
      const pm25 = Math.round(components.pm2_5 || 0)
      const pm10 = Math.round(components.pm10 || 0)
      const ozone = Math.round(components.o3 || 0)
      const no2 = Math.round(components.no2 || 0)

      // Determine AQI level
      let aqiLevel: AtmosphereData['aqiLevel']
      if (aqi <= 50) aqiLevel = 'GOOD'
      else if (aqi <= 100) aqiLevel = 'MODERATE'
      else if (aqi <= 150) aqiLevel = 'UNHEALTHY_SENSITIVE'
      else if (aqi <= 200) aqiLevel = 'UNHEALTHY'
      else if (aqi <= 300) aqiLevel = 'VERY_UNHEALTHY'
      else aqiLevel = 'HAZARDOUS'

      // Radiation (simulated - no free API for this)
      const radiation = 0.08 + Math.random() * 0.12
      const radiationLevel: AtmosphereData['radiationLevel'] = 
        radiation < 0.20 ? 'SAFE' : radiation < 0.50 ? 'ELEVATED' : 'HIGH'

      // UV index (if available)
      const uvIndex = weatherData.uvi || Math.floor(Math.random() * 12)

      const hazardous = aqiLevel === 'HAZARDOUS' || aqiLevel === 'VERY_UNHEALTHY'
      const warning = this.generateWarning(aqiLevel, radiationLevel)

      return {
        aqi,
        aqiLevel,
        pm25,
        pm10,
        ozone,
        no2,
        radiation: Math.round(radiation * 100) / 100,
        radiationLevel,
        temperature: temp,
        humidity,
        pressure,
        uvIndex,
        warning,
        hazardous,
      }
    } catch (error) {
      console.error('Error fetching real weather:', error)
      throw error
    }
  }

  /**
   * Convert OpenWeatherMap AQI (1-5) to US AQI (0-500)
   */
  private static convertAQI(apiAqi: number): number {
    // OpenWeatherMap uses 1-5 scale
    // 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
    const conversion: Record<number, number> = {
      1: 25,   // Good
      2: 75,   // Fair
      3: 125,  // Moderate
      4: 175,  // Poor
      5: 250,  // Very Poor
    }
    return conversion[apiAqi] || 100
  }

  /**
   * Generate simulated data (fallback)
   */
  private static generateSimulatedData(): AtmosphereData {
    const baseAQI = 50 + Math.random() * 150
    const aqi = Math.floor(baseAQI)
    
    // Determine AQI level
    let aqiLevel: AtmosphereData['aqiLevel']
    if (aqi <= 50) aqiLevel = 'GOOD'
    else if (aqi <= 100) aqiLevel = 'MODERATE'
    else if (aqi <= 150) aqiLevel = 'UNHEALTHY_SENSITIVE'
    else if (aqi <= 200) aqiLevel = 'UNHEALTHY'
    else if (aqi <= 300) aqiLevel = 'VERY_UNHEALTHY'
    else aqiLevel = 'HAZARDOUS'

    // Generate related pollutants (simulated)
    const pm25 = Math.floor(aqi * 0.4 + Math.random() * 20)
    const pm10 = Math.floor(pm25 * 1.5 + Math.random() * 30)
    const ozone = Math.floor(20 + Math.random() * 80)
    const no2 = Math.floor(10 + Math.random() * 50)

    // Radiation levels (simulated - no free API)
    const baseRadiation = 0.08 + Math.random() * 0.15
    const radiation = Math.round(baseRadiation * 100) / 100
    
    let radiationLevel: AtmosphereData['radiationLevel']
    if (radiation < 0.20) radiationLevel = 'SAFE'
    else if (radiation < 0.50) radiationLevel = 'ELEVATED'
    else if (radiation < 1.00) radiationLevel = 'HIGH'
    else radiationLevel = 'DANGEROUS'

    // Weather data (simulated)
    const temperature = Math.floor(15 + Math.random() * 20)
    const humidity = Math.floor(30 + Math.random() * 60)
    const pressure = Math.floor(1000 + Math.random() * 30)
    const uvIndex = Math.floor(Math.random() * 12)

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
   * Get AQI color (returns hex color for inline styles)
   */
  static getAQIColor(aqi: number): string {
    if (aqi <= 50) return '#00CC66'
    if (aqi <= 100) return '#FFD700'
    if (aqi <= 150) return '#FF8800'
    if (aqi <= 200) return '#FF0000'
    if (aqi <= 300) return '#CC0000'
    return '#8B0000'
  }

  /**
   * Get radiation color (returns hex color for inline styles)
   */
  static getRadiationColor(level: string): string {
    switch (level) {
      case 'SAFE': return '#00CC66'
      case 'ELEVATED': return '#FFD700'
      case 'HIGH': return '#FF8800'
      case 'DANGEROUS': return '#CC0000'
      default: return '#FFFFFF'
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
