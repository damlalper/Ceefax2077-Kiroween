/**
 * Time Helper Utilities
 * Used for quiet mode and time-based hooks
 */

/**
 * Check if current time is night hours (22:00 - 06:00)
 */
export function isNightHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  
  // Night hours: 22:00 (10 PM) to 06:00 (6 AM)
  return hour >= 22 || hour < 6;
}

/**
 * Check if current time is work hours (09:00 - 17:00)
 */
export function isWorkHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Work hours: Monday-Friday, 9 AM to 5 PM
  return day >= 1 && day <= 5 && hour >= 9 && hour < 17;
}

/**
 * Get time of day category
 */
export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 22) return 'evening';
  return 'night';
}

/**
 * Format time for display
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/**
 * Get time ago string
 */
export function getTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}
