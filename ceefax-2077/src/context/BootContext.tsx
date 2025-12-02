import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type BootMode = 'CONSUMER' | 'SYSADMIN' | null;

interface BootContextType {
  bootMode: BootMode;
  setBootMode: (mode: BootMode) => void;
  isBooted: boolean;
  reboot: () => void;
}

const BootContext = createContext<BootContextType | undefined>(undefined);

export function BootProvider({ children }: { children: ReactNode }) {
  const [bootMode, setBootModeState] = useState<BootMode>(null);
  const [isBooted, setIsBooted] = useState(false);

  const setBootMode = (mode: BootMode) => {
    setBootModeState(mode);
    if (mode) {
      setIsBooted(true);
      // Store in localStorage for persistence
      localStorage.setItem('teletext_boot_mode', mode);
      
      // Apply theme immediately
      applyTheme(mode);
    }
  };

  const reboot = () => {
    setBootModeState(null);
    setIsBooted(false);
    localStorage.removeItem('teletext_boot_mode');
    // Reset to default theme
    document.documentElement.removeAttribute('data-boot-mode');
  };

  const applyTheme = (mode: BootMode) => {
    if (!mode) return;
    
    // Set data attribute for CSS targeting
    document.documentElement.setAttribute('data-boot-mode', mode.toLowerCase());
    
    if (mode === 'SYSADMIN') {
      // Inject SysAdmin theme
      document.body.classList.add('sysadmin-mode');
      document.body.classList.remove('consumer-mode');
    } else {
      // Consumer theme (default)
      document.body.classList.add('consumer-mode');
      document.body.classList.remove('sysadmin-mode');
    }
  };

  // Check for existing boot mode on mount
  useEffect(() => {
    const stored = localStorage.getItem('teletext_boot_mode');
    if (stored === 'CONSUMER' || stored === 'SYSADMIN') {
      setBootModeState(stored as BootMode);
      setIsBooted(true);
      applyTheme(stored as BootMode);
    }
  }, []);

  return (
    <BootContext.Provider value={{ bootMode, setBootMode, isBooted, reboot }}>
      {children}
    </BootContext.Provider>
  );
}

export function useBoot() {
  const context = useContext(BootContext);
  if (context === undefined) {
    throw new Error('useBoot must be used within a BootProvider');
  }
  return context;
}
