/**
 * useAgentHooks - React hook for Agent Hooks system
 * Manages all 10 agent hooks
 */

import { useEffect, useState } from 'react';
import { HookService } from '../services/HookService';
import type { Hook, HookLog } from '../services/HookService';

export const useAgentHooks = () => {
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [logs, setLogs] = useState<HookLog[]>([]);
  const [initialized, setInitialized] = useState(false);

  /**
   * Initialize hooks on mount
   */
  useEffect(() => {
    const init = async () => {
      await HookService.initialize();
      setHooks(HookService.getActiveHooks());
      setInitialized(true);
    };

    init();

    return () => {
      HookService.destroy();
    };
  }, []);

  /**
   * Update logs periodically
   */
  useEffect(() => {
    if (!initialized) return;

    const interval = setInterval(() => {
      setLogs(HookService.getLogs());
    }, 5000);

    return () => clearInterval(interval);
  }, [initialized]);

  /**
   * Toggle hook
   */
  const toggleHook = (hookId: string, enabled: boolean) => {
    HookService.toggleHook(hookId, enabled);
    setHooks(HookService.getActiveHooks());
  };

  /**
   * Trigger hooks manually
   */
  const triggerHooks = (type: string, context?: Record<string, unknown>) => {
    HookService.triggerHooks(type, context);
  };

  return {
    hooks,
    logs,
    initialized,
    toggleHook,
    triggerHooks
  };
};
