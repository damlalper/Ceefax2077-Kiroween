import { useState, useCallback, useRef } from 'react';

/**
 * Auto-Healer Hook - Agent Hooks Category
 * Autonomous system recovery and code hygiene enforcement
 */

export interface HealerNotification {
  type: 'api-reroute' | 'code-clean' | 'error-recovery';
  message: string;
  timestamp: number;
  severity: 'info' | 'warning' | 'success';
}

interface UseAutoHealerReturn {
  notifications: HealerNotification[];
  clearNotifications: () => void;
  resilientFetch: <T>(url: string, fallbackData: T, timeout?: number) => Promise<T>;
  cleanCode: (code: string) => { cleaned: string; wasModified: boolean };
  autoRefactorText: (text: string, onClean: (cleaned: string) => void) => void;
}

// Backup datasets for API resilience
const BACKUP_HACKERNEWS = [
  {
    id: 1,
    title: 'BACKUP: AI Breakthrough in Quantum Computing',
    url: 'https://example.com/quantum',
    score: 420,
    by: 'system_backup'
  },
  {
    id: 2,
    title: 'BACKUP: New JavaScript Framework Released',
    url: 'https://example.com/framework',
    score: 350,
    by: 'system_backup'
  },
  {
    id: 3,
    title: 'BACKUP: Cybersecurity Alert: New Vulnerability',
    url: 'https://example.com/security',
    score: 500,
    by: 'system_backup'
  }
];

const BACKUP_CRYPTO = {
  bitcoin: { usd: 95000, usd_24h_change: 2.5 },
  ethereum: { usd: 3500, usd_24h_change: 1.8 },
  solana: { usd: 150, usd_24h_change: -0.5 },
  dogecoin: { usd: 0.15, usd_24h_change: 3.2 }
};

export function useAutoHealer(): UseAutoHealerReturn {
  const [notifications, setNotifications] = useState<HealerNotification[]>([]);
  const cleanupTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const addNotification = useCallback((notification: Omit<HealerNotification, 'timestamp'>) => {
    const newNotification: HealerNotification = {
      ...notification,
      timestamp: Date.now()
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-clear after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.timestamp !== newNotification.timestamp));
    }, 5000);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * API RESILIENCE: Resilient fetch with automatic fallback
   */
  const resilientFetch = useCallback(async <T,>(
    url: string,
    fallbackData: T,
    timeout: number = 5000
  ): Promise<T> => {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data as T;

    } catch (error) {
      // API failed - activate auto-healer!
      console.warn('🤖 AUTO-HEALER: API failure detected, switching to backup data', error);

      addNotification({
        type: 'api-reroute',
        message: '⚡ SYSTEM RE-ROUTING: API failure detected. Switching to backup dataset.',
        severity: 'warning'
      });

      // Determine which backup to use
      if (url.includes('hacker-news') || url.includes('hackernews')) {
        return BACKUP_HACKERNEWS as T;
      } else if (url.includes('coingecko')) {
        return BACKUP_CRYPTO as T;
      }

      // Return provided fallback
      return fallbackData;
    }
  }, [addNotification]);

  /**
   * CODE HYGIENE: Clean dirty code patterns
   */
  const cleanCode = useCallback((code: string): { cleaned: string; wasModified: boolean } => {
    let cleaned = code;
    let wasModified = false;

    // Remove console.log statements
    const consolePattern = /console\.(log|warn|error|info|debug)\([^)]*\);?\s*/g;
    if (consolePattern.test(cleaned)) {
      cleaned = cleaned.replace(consolePattern, '');
      wasModified = true;
    }

    // Remove TODO comments
    const todoPattern = /\/\/\s*TODO:?[^\n]*\n?/gi;
    if (todoPattern.test(cleaned)) {
      cleaned = cleaned.replace(todoPattern, '');
      wasModified = true;
    }

    // Remove FIXME comments
    const fixmePattern = /\/\/\s*FIXME:?[^\n]*\n?/gi;
    if (fixmePattern.test(cleaned)) {
      cleaned = cleaned.replace(fixmePattern, '');
      wasModified = true;
    }

    // Remove debugger statements
    const debuggerPattern = /debugger;?\s*/g;
    if (debuggerPattern.test(cleaned)) {
      cleaned = cleaned.replace(debuggerPattern, '');
      wasModified = true;
    }

    // Remove multiple empty lines (more than 2)
    const multipleEmptyLines = /\n{3,}/g;
    if (multipleEmptyLines.test(cleaned)) {
      cleaned = cleaned.replace(multipleEmptyLines, '\n\n');
      wasModified = true;
    }

    // Trim trailing whitespace
    const trailingWhitespace = /[ \t]+$/gm;
    if (trailingWhitespace.test(cleaned)) {
      cleaned = cleaned.replace(trailingWhitespace, '');
      wasModified = true;
    }

    return { cleaned, wasModified };
  }, []);

  /**
   * AUTO-REFACTOR: Watch text and auto-clean dirty code
   */
  const autoRefactorText = useCallback((
    text: string,
    onClean: (cleaned: string) => void
  ) => {
    // Clear existing timer
    if (cleanupTimerRef.current) {
      clearTimeout(cleanupTimerRef.current);
    }

    // Debounce: wait 2 seconds after user stops typing
    cleanupTimerRef.current = setTimeout(() => {
      const { cleaned, wasModified } = cleanCode(text);

      if (wasModified) {
        // Trigger notification
        addNotification({
          type: 'code-clean',
          message: '🧹 CLEAN CODE PROTOCOL ENFORCED: Removed console.log, TODO comments, and debugger statements.',
          severity: 'success'
        });

        // Apply cleaned code
        onClean(cleaned);
      }
    }, 2000);
  }, [cleanCode, addNotification]);

  return {
    notifications,
    clearNotifications,
    resilientFetch,
    cleanCode,
    autoRefactorText
  };
}

/**
 * Helper: Get backup data for specific API
 */
export function getBackupData(apiType: 'hackernews' | 'crypto') {
  if (apiType === 'hackernews') {
    return BACKUP_HACKERNEWS;
  }
  return BACKUP_CRYPTO;
}

/**
 * Helper: Check if code has dirty patterns
 */
export function hasDirtyCode(code: string): boolean {
  const patterns = [
    /console\.(log|warn|error|info|debug)/,
    /\/\/\s*TODO/i,
    /\/\/\s*FIXME/i,
    /debugger/,
    /\n{3,}/
  ];

  return patterns.some(pattern => pattern.test(code));
}
