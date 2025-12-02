# Implementation Gaps Analysis

This document tracks what's defined in .kiro/ specs vs what's actually implemented in src/.

## ✅ FULLY IMPLEMENTED

### Hooks
- ✅ Timer-based hooks (HookService.ts)
- ✅ Page change detection (HookService.ts)
- ✅ Network status monitoring (HookService.ts)
- ✅ Key sequence detection (HookService.ts)
- ✅ Idle timeout to Zone 666 (TeletextContext.tsx)

### Personalities
- ✅ Zone-based personality switching (PersonalityService.ts)
- ✅ Text transformation per zone (PersonalityService.ts)
- ✅ Personality context in TeletextContext (TeletextContext.tsx)

### Market Crash
- ✅ Crash detection (useMarketCrash.ts)
- ✅ CSS class injection (useMarketCrash.ts)
- ✅ Risk analysis (CryptoAgent.ts)

### Auto Healing
- ✅ Error boundary recovery (useAutoHealer.ts)

## ⚠️ PARTIALLY IMPLEMENTED

### Hooks
- ⚠️ Time-based scheduling - EXISTS but needs quiet/crisis mode actions
  - File: src/services/HookService.ts
  - Gap: checkTimeBasedHooks() exists but doesn't trigger mode switches
  - **FIX NEEDED**: Add mode switching logic

### Performance
- ⚠️ Performance measurement - EXISTS but basic
  - File: src/services/HookService.ts
  - Gap: measurePerformance() only tracks time, not memory
  - **FIX NEEDED**: Add memory profiling

## ❌ NOT IMPLEMENTED (Priority Order)

### CRITICAL (Must implement for competition)

#### 1. Crisis Mode System
**Status**: Spec exists, code missing
**Files to create**:
```typescript
// src/types/crisis.ts
export type CrisisReason = 
  | 'market_crash' 
  | 'system_error' 
  | 'network_loss' 
  | 'security_breach' 
  | 'glitch_trap';

export interface CrisisCondition {
  type: CrisisReason;
  threshold: number;
  currentValue: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}
```

**Files to modify**:
```typescript
// src/services/PersonalityService.ts - ADD THESE METHODS

private crisisMode: boolean = false;
private crisisReason?: CrisisReason;

activateCrisisMode(reason: CrisisReason): void {
  this.crisisMode = true;
  this.crisisReason = reason;
  
  // Override all personalities
  this.personalities.forEach((personality) => {
    const originalTransform = personality.transformText;
    personality.transformText = (text: string) => {
      return this.applyCrisisTransform(text, personality.zone, reason);
    };
  });
  
  document.body.classList.add('crisis-mode');
  console.error(`🚨 CRISIS MODE: ${reason}`);
}

deactivateCrisisMode(): void {
  this.crisisMode = false;
  this.initializePersonalities();
  document.body.classList.remove('crisis-mode');
}

private applyCrisisTransform(text: string, zone: number, reason: CrisisReason): string {
  const alert = this.getCrisisAlert(reason);
  return `🚨 ${alert}\n${text.toUpperCase()}\n\nSTATUS: MONITORING`;
}

private getCrisisAlert(reason: CrisisReason): string {
  const alerts = {
    market_crash: 'MARKET CRASH DETECTED',
    system_error: 'SYSTEM ERROR',
    network_loss: 'NETWORK DISCONNECTED',
    security_breach: 'SECURITY BREACH',
    glitch_trap: 'SYSTEM CORRUPTION'
  };
  return alerts[reason];
}
```

```typescript
// src/services/HookService.ts - ADD THIS ACTION

private checkCrisisConditions(): string {
  const conditions: CrisisCondition[] = [];
  
  // Check market crash
  const crashMode = document.body.classList.contains('crash-mode');
  if (crashMode) {
    conditions.push({
      type: 'market_crash',
      threshold: 30,
      currentValue: 35,
      severity: 'critical'
    });
  }
  
  // Check Zone 666 trap
  const currentPage = parseInt(window.location.hash.replace('#page-', ''));
  if (currentPage === 666) {
    const timeInZone = this.getTimeInZone(666);
    if (timeInZone > 300000) { // 5 minutes
      conditions.push({
        type: 'glitch_trap',
        threshold: 300000,
        currentValue: timeInZone,
        severity: 'high'
      });
    }
  }
  
  // Activate crisis mode if conditions met
  if (conditions.length > 0) {
    const critical = conditions.find(c => c.severity === 'critical');
    if (critical) {
      PersonalityService.activateCrisisMode(critical.type);
    }
  }
  
  return `Checked ${conditions.length} crisis conditions`;
}
```

#### 2. Quiet Mode System
**Status**: Spec exists, code missing
**Files to create**:
```typescript
// src/utils/timeHelpers.ts
export function isNightHours(): boolean {
  const hour = new Date().getHours();
  return hour >= 22 || hour < 6;
}

export function getCurrentTimeString(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}
```

**Files to modify**:
```typescript
// src/services/PersonalityService.ts - ADD THESE METHODS

private quietMode: boolean = false;

activateQuietMode(): void {
  this.quietMode = true;
  
  this.personalities.forEach((personality) => {
    const originalTransform = personality.transformText;
    personality.transformText = (text: string) => {
      return this.applyQuietTransform(text);
    };
  });
  
  document.body.classList.add('quiet-mode');
  console.log('🌙 Quiet mode activated');
}

deactivateQuietMode(): void {
  this.quietMode = false;
  this.initializePersonalities();
  document.body.classList.remove('quiet-mode');
}

private applyQuietTransform(text: string): string {
  let quietText = text.toLowerCase();
  
  // Remove urgency
  quietText = quietText
    .replace(/!/g, '.')
    .replace(/urgent|critical|now/gi, '')
    .trim();
  
  // Add spacing
  quietText = quietText
    .split('.')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .join('\n\n');
  
  return quietText;
}
```

#### 3. CSS Styles for Modes
**Files to modify**:
```css
/* src/index.css - ADD THESE STYLES */

/* Crisis Mode */
body.crisis-mode {
  animation: crisis-pulse 2s infinite;
  border: 3px solid #ff0000;
}

@keyframes crisis-pulse {
  0%, 100% { border-color: #ff0000; }
  50% { border-color: #ff6666; }
}

body.crisis-mode .teletext-content {
  background-color: rgba(255, 0, 0, 0.1);
}

/* Quiet Mode */
body.quiet-mode {
  filter: brightness(0.7) saturate(0.6);
  transition: filter 2s ease;
}

body.quiet-mode .teletext-content {
  line-height: 1.8;
  letter-spacing: 0.05em;
}

body.quiet-mode * {
  animation-duration: 2s !important; /* Slow down all animations */
}
```

### HIGH PRIORITY (Strong differentiators)

#### 4. MCP Chain of Thought Executor
**Files to create**:
```typescript
// src/mcp/ChainExecutor.ts
export interface ChainStep {
  step: number;
  tool: string;
  input: Record<string, unknown>;
  depends_on?: number[];
}

export interface ChainResult {
  success: boolean;
  steps: Array<StepResult>;
  final_output: unknown;
  reasoning: Array<string>;
  execution_time: number;
}

export class ChainExecutor {
  async execute(steps: ChainStep[]): Promise<ChainResult> {
    const results = new Map<number, unknown>();
    const startTime = Date.now();
    const reasoning: string[] = [];
    
    for (const step of steps) {
      // Wait for dependencies
      await this.waitForDependencies(step, results);
      
      // Resolve variables like ${step_1.output}
      const input = this.resolveVariables(step.input, results);
      
      // Execute tool
      reasoning.push(`Step ${step.step}: Executing ${step.tool}`);
      const output = await this.executeTool(step.tool, input);
      
      results.set(step.step, output);
    }
    
    return {
      success: true,
      steps: Array.from(results.entries()).map(([step, output]) => ({
        step,
        output
      })),
      final_output: results.get(steps.length),
      reasoning,
      execution_time: Date.now() - startTime
    };
  }
  
  private async waitForDependencies(
    step: ChainStep,
    results: Map<number, unknown>
  ): Promise<void> {
    if (!step.depends_on) return;
    
    // Wait for all dependencies to complete
    while (!step.depends_on.every(dep => results.has(dep))) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  private resolveVariables(
    input: Record<string, unknown>,
    results: Map<number, unknown>
  ): Record<string, unknown> {
    // Replace ${step_X.field} with actual values
    const resolved: Record<string, unknown> = {};
    
    for (const [key, value] of Object.entries(input)) {
      if (typeof value === 'string' && value.startsWith('${')) {
        // Parse ${step_1.output}
        const match = value.match(/\$\{step_(\d+)\.(.+)\}/);
        if (match) {
          const stepNum = parseInt(match[1]);
          const field = match[2];
          const stepResult = results.get(stepNum) as Record<string, unknown>;
          resolved[key] = stepResult?.[field];
        }
      } else {
        resolved[key] = value;
      }
    }
    
    return resolved;
  }
  
  private async executeTool(
    tool: string,
    input: Record<string, unknown>
  ): Promise<unknown> {
    // Call appropriate MCP tool
    // This would integrate with actual MCP servers
    console.log(`Executing tool: ${tool}`, input);
    return { success: true, data: input };
  }
}
```

#### 5. Engagement Tracking
**Files to create**:
```typescript
// src/services/EngagementService.ts
interface EngagementMetrics {
  pageViews: Map<number, number>;
  timeOnPage: Map<number, number>;
  interactions: number;
  lastInteraction: number;
}

class EngagementServiceClass {
  private metrics: EngagementMetrics = {
    pageViews: new Map(),
    timeOnPage: new Map(),
    interactions: 0,
    lastInteraction: Date.now()
  };
  
  trackPageView(page: number): void {
    const current = this.metrics.pageViews.get(page) || 0;
    this.metrics.pageViews.set(page, current + 1);
  }
  
  trackTimeOnPage(page: number, duration: number): void {
    const current = this.metrics.timeOnPage.get(page) || 0;
    this.metrics.timeOnPage.set(page, current + duration);
  }
  
  shouldShowBreakSuggestion(page: number): boolean {
    const timeOnPage = this.metrics.timeOnPage.get(page) || 0;
    return timeOnPage > 600000; // 10 minutes
  }
  
  getFavoriteZones(): number[] {
    return Array.from(this.metrics.pageViews.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([page]) => Math.floor(page / 100) * 100);
  }
}

export const EngagementService = new EngagementServiceClass();
```

### MEDIUM PRIORITY (Nice to have)

#### 6. Data Validation Layer
**Files to create**:
```typescript
// src/utils/dataValidator.ts
export function validatePersonality(data: unknown): data is Personality {
  if (typeof data !== 'object' || data === null) return false;
  const p = data as Personality;
  return (
    typeof p.type === 'string' &&
    typeof p.name === 'string' &&
    typeof p.zone === 'number' &&
    typeof p.transformText === 'function'
  );
}

export function validateHook(data: unknown): data is Hook {
  if (typeof data !== 'object' || data === null) return false;
  const h = data as Hook;
  return (
    typeof h.id === 'string' &&
    typeof h.name === 'string' &&
    typeof h.enabled === 'boolean' &&
    typeof h.trigger === 'object' &&
    typeof h.action === 'object'
  );
}
```

## Summary

### Must Implement (for competition win):
1. ✅ Crisis Mode (PersonalityService + HookService + CSS)
2. ✅ Quiet Mode (PersonalityService + timeHelpers + CSS)
3. ✅ Crisis/Quiet CSS styles

### Should Implement (strong differentiators):
4. ⚠️ MCP Chain Executor (shows advanced MCP usage)
5. ⚠️ Engagement Tracking (shows user-centric design)

### Nice to Have:
6. ⚠️ Data Validation Layer

## Implementation Order

1. **Day 1**: Crisis Mode + Quiet Mode + CSS (3-4 hours)
2. **Day 2**: Chain Executor + integrate with one zone (4-5 hours)
3. **Day 3**: Engagement tracking + polish (2-3 hours)

## Testing Checklist

- [ ] Crisis mode activates on market crash
- [ ] Quiet mode activates at night
- [ ] Personalities transform text correctly in each mode
- [ ] CSS classes apply properly
- [ ] Chain executor resolves dependencies
- [ ] Engagement tracking records metrics
- [ ] All modes can be toggled manually
- [ ] Modes don't conflict with each other
