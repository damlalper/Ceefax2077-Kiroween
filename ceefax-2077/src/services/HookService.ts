/**
 * Hook Service - Central Agent Hooks Manager
 * Manages all 10 agent hooks for Teletext 2077
 */

export interface Hook {
  id: string;
  name: string;
  enabled: boolean;
  trigger: HookTrigger;
  action: HookAction;
  priority: number;
  conditions?: Record<string, unknown>;
}

export interface HookTrigger {
  type: 'timer' | 'page_change' | 'time_based' | 'critical_alert' | 
        'user_interaction' | 'idle_on_page' | 'zone_access' | 
        'network_change' | 'key_sequence';
  interval?: number;
  timeout?: number;
  schedule?: Array<{ time: string; theme: string }>;
  conditions?: Record<string, unknown>;
  events?: string[];
  zone?: number;
  sequence?: string[];
}

export interface HookAction {
  type: string;
  description: string;
  [key: string]: unknown;
}

export interface HookLog {
  hookId: string;
  timestamp: number;
  action: string;
  result: 'success' | 'failure';
  details?: string;
}

class HookServiceClass {
  private hooks: Hook[] = [];
  private logs: HookLog[] = [];
  private timers: Map<string, number> = new Map();
  private keySequence: string[] = [];

  /**
   * Initialize all hooks
   */
  async initialize(): Promise<void> {
    try {
      // Load hooks configuration
      const response = await fetch('/.kiro/hooks/hooks.json');
      const config = await response.json();
      this.hooks = config.hooks.filter((h: Hook) => h.enabled);
      
      // Start timer-based hooks
      this.startTimerHooks();
      
      // Setup event listeners
      this.setupEventListeners();
      
      console.log(`✅ Initialized ${this.hooks.length} agent hooks`);
    } catch (error) {
      console.error('Failed to initialize hooks:', error);
    }
  }

  /**
   * Start timer-based hooks
   */
  private startTimerHooks(): void {
    this.hooks
      .filter(h => h.trigger.type === 'timer')
      .forEach(hook => {
        const timer = window.setInterval(() => {
          this.executeHook(hook);
        }, hook.trigger.interval || 30000);
        
        this.timers.set(hook.id, timer);
      });
  }

  /**
   * Setup event listeners for hooks
   */
  private setupEventListeners(): void {
    // Page change listener
    window.addEventListener('popstate', () => {
      this.triggerHooks('page_change');
    });

    // User interaction listener
    ['click', 'keypress'].forEach(event => {
      window.addEventListener(event, () => {
        this.triggerHooks('user_interaction', { event });
      });
    });

    // Network status listener
    window.addEventListener('online', () => {
      this.triggerHooks('network_change', { online: true });
    });
    
    window.addEventListener('offline', () => {
      this.triggerHooks('network_change', { online: false });
    });

    // Key sequence listener (Konami code)
    window.addEventListener('keydown', (e) => {
      this.handleKeySequence(e.key);
    });

    // Time-based hooks (check every minute)
    window.setInterval(() => {
      this.checkTimeBasedHooks();
    }, 60000);
  }

  /**
   * Handle key sequence for easter eggs
   */
  private handleKeySequence(key: string): void {
    this.keySequence.push(key);
    
    // Keep only last 10 keys
    if (this.keySequence.length > 10) {
      this.keySequence.shift();
    }

    // Check for matching sequences
    this.hooks
      .filter(h => h.trigger.type === 'key_sequence')
      .forEach(hook => {
        const sequence = hook.trigger.sequence || [];
        const lastKeys = this.keySequence.slice(-sequence.length);
        
        if (JSON.stringify(lastKeys) === JSON.stringify(sequence)) {
          this.executeHook(hook);
          this.keySequence = []; // Reset
        }
      });
  }

  /**
   * Check time-based hooks
   */
  private checkTimeBasedHooks(): void {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    this.hooks
      .filter(h => h.trigger.type === 'time_based')
      .forEach(hook => {
        const schedule = hook.trigger.schedule || [];
        const match = schedule.find(s => s.time === currentTime);
        
        if (match) {
          this.executeHook(hook, { theme: match.theme });
        }
      });
  }

  /**
   * Trigger hooks by type
   */
  triggerHooks(type: string, context?: Record<string, unknown>): void {
    this.hooks
      .filter(h => h.trigger.type === type)
      .forEach(hook => {
        this.executeHook(hook, context);
      });
  }

  /**
   * Execute a hook
   */
  private async executeHook(hook: Hook, context?: Record<string, unknown>): Promise<void> {
    try {
      console.log(`🎯 Executing hook: ${hook.name}`);
      
      const result = await this.performAction(hook.action, context);
      
      this.logHook(hook.id, hook.action.type, 'success', result);
    } catch (error) {
      console.error(`❌ Hook failed: ${hook.name}`, error);
      this.logHook(hook.id, hook.action.type, 'failure', String(error));
    }
  }

  /**
   * Perform hook action
   */
  private async performAction(action: HookAction, context?: Record<string, unknown>): Promise<string> {
    switch (action.type) {
      case 'refresh_data':
        return this.refreshData();
      
      case 'measure_performance':
        return this.measurePerformance();
      
      case 'switch_theme':
        return this.switchTheme(context?.theme as string);
      
      case 'navigate':
        return this.navigate(action.target as number);
      
      case 'log_analytics':
        return this.logAnalytics(context || {});
      
      case 'suggest_pages':
        return this.suggestPages(action.count as number);
      
      case 'security_check':
        return this.securityCheck(action.checks as string[]);
      
      case 'backup_data':
        return this.backupData(action.targets as string[]);
      
      case 'toggle_offline_mode':
        return this.toggleOfflineMode(context?.online as boolean);
      
      default:
        return `Unknown action: ${action.type}`;
    }
  }

  /**
   * Action implementations
   */
  private refreshData(): string {
    // Trigger data refresh event
    window.dispatchEvent(new CustomEvent('hook:refresh-data'));
    return 'Data refresh triggered';
  }

  private measurePerformance(): string {
    const perf = performance.now();
    return `Performance: ${perf.toFixed(2)}ms`;
  }

  private switchTheme(theme?: string): string {
    if (theme) {
      localStorage.setItem('theme', theme);
      window.dispatchEvent(new CustomEvent('hook:theme-change', { detail: { theme } }));
      return `Theme switched to: ${theme}`;
    }
    return 'No theme specified';
  }

  private navigate(target: number): string {
    window.location.hash = `#page-${target}`;
    return `Navigated to page ${target}`;
  }

  private logAnalytics(context: Record<string, unknown>): string {
    const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
    analytics.push({
      timestamp: Date.now(),
      ...context
    });
    localStorage.setItem('analytics', JSON.stringify(analytics.slice(-1000)));
    return 'Analytics logged';
  }

  private suggestPages(count: number): string {
    window.dispatchEvent(new CustomEvent('hook:suggest-pages', { detail: { count } }));
    return `Suggested ${count} pages`;
  }

  private securityCheck(checks: string[]): string {
    window.dispatchEvent(new CustomEvent('hook:security-check', { detail: { checks } }));
    return `Security checks: ${checks.join(', ')}`;
  }

  private backupData(targets: string[]): string {
    targets.forEach(target => {
      const data = localStorage.getItem(target);
      if (data) {
        localStorage.setItem(`${target}_backup`, data);
      }
    });
    return `Backed up: ${targets.join(', ')}`;
  }

  private toggleOfflineMode(online: boolean): string {
    window.dispatchEvent(new CustomEvent('hook:offline-mode', { detail: { online } }));
    return online ? 'Online mode' : 'Offline mode';
  }

  /**
   * Log hook execution
   */
  private logHook(hookId: string, action: string, result: 'success' | 'failure', details?: string): void {
    const log: HookLog = {
      hookId,
      timestamp: Date.now(),
      action,
      result,
      details
    };
    
    this.logs.push(log);
    
    // Keep only last 100 logs
    if (this.logs.length > 100) {
      this.logs.shift();
    }
  }

  /**
   * Get hook logs
   */
  getLogs(): HookLog[] {
    return [...this.logs];
  }

  /**
   * Get active hooks
   */
  getActiveHooks(): Hook[] {
    return this.hooks.filter(h => h.enabled);
  }

  /**
   * Enable/disable hook
   */
  toggleHook(hookId: string, enabled: boolean): void {
    const hook = this.hooks.find(h => h.id === hookId);
    if (hook) {
      hook.enabled = enabled;
      
      if (enabled && hook.trigger.type === 'timer') {
        this.startTimerHooks();
      } else if (!enabled) {
        const timer = this.timers.get(hookId);
        if (timer) {
          window.clearInterval(timer);
          this.timers.delete(hookId);
        }
      }
    }
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.timers.forEach(timer => window.clearInterval(timer));
    this.timers.clear();
  }
}

export const HookService = new HookServiceClass();
