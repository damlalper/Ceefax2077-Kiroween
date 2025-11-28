// Zone Helper - Maps page numbers to zones and styling
// Teletext 2077 - 5-ZONE Intelligence Terminal

export function getZoneColor(page: number): string {
  if (page >= 100 && page < 200) return '#0066CC' // TRUTH - Blue
  if (page >= 200 && page < 300) return '#FFD700' // SYSTM - Gold
  if (page >= 300 && page < 400) return '#FF1493' // PULSE - Pink
  if (page >= 400 && page < 500) return '#00CC66' // PLNET - Green
  if (page >= 500 && page < 600) return '#CC0000' // SHILD - Red
  if (page === 666) return '#CC0000' // GLITCH - Red
  return '#FFFFFF' // Default white
}

export function getZoneTitle(page: number): string {
  if (page >= 100 && page < 200) return 'TELETEXT 2077 :: THE TRUTH'
  if (page >= 200 && page < 300) return 'TELETEXT 2077 :: THE SYSTEM'
  if (page >= 300 && page < 400) return 'TELETEXT 2077 :: THE PULSE'
  if (page >= 400 && page < 500) return 'TELETEXT 2077 :: THE PLANET'
  if (page >= 500 && page < 600) return 'TELETEXT 2077 :: SHIELD'
  if (page === 666) return 'SYSTEM FAILURE :: GLITCH MODE'
  return 'TELETEXT 2077'
}

export function getZoneNavigation(page: number) {
  // Determine current zone
  let currentZone = 100
  if (page >= 200 && page < 300) currentZone = 200
  else if (page >= 300 && page < 400) currentZone = 300
  else if (page >= 400 && page < 500) currentZone = 400
  else if (page >= 500 && page < 600) currentZone = 500
  else if (page === 666) currentZone = 666

  // Zone navigation mapping
  const zones = [100, 200, 300, 400, 500]
  const currentIndex = zones.indexOf(currentZone)

  if (currentZone === 666) {
    return {
      prevZone: '500',
      currentZone: '666',
      nextZone: '100',
    }
  }

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : zones.length - 1
  const nextIndex = currentIndex < zones.length - 1 ? currentIndex + 1 : 0

  return {
    prevZone: String(zones[prevIndex]),
    currentZone: String(currentZone),
    nextZone: String(zones[nextIndex]),
  }
}

export function getZoneName(page: number): string {
  if (page >= 100 && page < 200) return 'TRUTH'
  if (page >= 200 && page < 300) return 'SYSTM'
  if (page >= 300 && page < 400) return 'PULSE'
  if (page >= 400 && page < 500) return 'PLNET'
  if (page >= 500 && page < 600) return 'SHILD'
  if (page === 666) return 'GLITCH'
  return 'UNKNOWN'
}
