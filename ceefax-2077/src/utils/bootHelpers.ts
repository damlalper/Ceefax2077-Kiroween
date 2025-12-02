import type { BootMode } from '../context/BootContext';

/**
 * Helper to check if zone is allowed in current boot mode
 */
export function isZoneAllowed(zone: number, bootMode: BootMode): boolean {
  if (!bootMode) return true;
  
  if (bootMode === 'SYSADMIN') {
    // SysAdmin only gets System (200) and Shield (500) zones
    return zone === 200 || zone === 500 || zone === 666; // Allow glitch for fun
  }
  
  // Consumer gets everything
  return true;
}
