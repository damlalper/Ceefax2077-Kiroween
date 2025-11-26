// Ceefax 2077 - Zone Helper Utilities
// Maps pages to zones and provides zone-specific styling

export interface Zone {
  id: number
  name: string
  theme: string
  color: 'blue' | 'green' | 'magenta' | 'yellow' | 'red'
  description: string
}

export const ZONES: Record<number, Zone> = {
  100: {
    id: 100,
    name: 'GLOBAL',
    theme: 'News & Information',
    color: 'blue',
    description: 'AI-curated news and fact-checking',
  },
  200: {
    id: 200,
    name: 'HUSTLE',
    theme: 'Finance & Work',
    color: 'blue',
    description: 'Crypto, DeFi, and gig economy',
  },
  300: {
    id: 300,
    name: 'ARENA',
    theme: 'Sports & Competition',
    color: 'green',
    description: 'Live scores, e-sports, racing',
  },
  400: {
    id: 400,
    name: 'ELEMENT',
    theme: 'Environment & Travel',
    color: 'green',
    description: 'Climate, flights, space exploration',
  },
  500: {
    id: 500,
    name: 'VIBE',
    theme: 'Lifestyle & Wellness',
    color: 'magenta',
    description: 'Music, food, spirituality',
  },
  600: {
    id: 600,
    name: 'CREATOR',
    theme: 'Media & Content',
    color: 'magenta',
    description: 'Trending videos, podcasts',
  },
  700: {
    id: 700,
    name: 'NOMAD',
    theme: 'Consumer & Social',
    color: 'yellow',
    description: 'Travel, dating, NFTs',
  },
  800: {
    id: 800,
    name: 'PLAY',
    theme: 'Entertainment & Games',
    color: 'yellow',
    description: 'RPG, quizzes, AI art',
  },
  900: {
    id: 900,
    name: 'SYSTEM',
    theme: 'Technology & DevOps',
    color: 'red',
    description: 'System monitoring, git logs, translation',
  },
}

/**
 * Get zone from page number
 * Example: 101 → Zone 100, 205 → Zone 200
 */
export function getZoneFromPage(page: number): Zone | null {
  if (page === 666) return null // Special case
  
  const zoneId = Math.floor(page / 100) * 100
  return ZONES[zoneId] || null
}

/**
 * Get zone color for styling
 */
export function getZoneColor(page: number): string {
  const zone = getZoneFromPage(page)
  if (!zone) return '#FF0000' // Red for 666
  
  const colorMap = {
    blue: '#0000FF',
    green: '#00FF00',
    magenta: '#FF00FF',
    yellow: '#FFFF00',
    red: '#FF0000',
  }
  
  return colorMap[zone.color]
}

/**
 * Get navigation links for current zone
 * Returns prev/next zones and pages within current zone
 */
export function getZoneNavigation(currentPage: number) {
  const currentZone = getZoneFromPage(currentPage)
  if (!currentZone) return null
  
  const zoneId = currentZone.id
  const prevZone = zoneId - 100
  const nextZone = zoneId + 100
  
  return {
    currentZone: zoneId,
    prevZone: prevZone >= 100 ? prevZone : 900, // Wrap around
    nextZone: nextZone <= 900 ? nextZone : 100, // Wrap around
    pages: [
      zoneId, // Index
      zoneId + 1, // Page 1
      zoneId + 2, // Page 2
      zoneId + 3, // Page 3
    ],
  }
}

/**
 * Get zone title for header
 */
export function getZoneTitle(page: number): string {
  const zone = getZoneFromPage(page)
  if (!zone) return 'SYSTEM FAILURE'
  
  return `${zone.name} - ${zone.theme.toUpperCase()}`
}

/**
 * Check if page exists in routing
 */
export function isValidPage(page: number): boolean {
  if (page === 666) return true
  if (page === 100) return true
  
  const zone = Math.floor(page / 100) * 100
  if (!ZONES[zone]) return false
  
  const pageInZone = page % 100
  return pageInZone >= 0 && pageInZone <= 3
}
