# Crisis Mode Steering - Situational AI Behavior

## Activation Conditions
This steering activates when:
- Market crash detected (crypto drop > 30%)
- System error rate > 10%
- Network connectivity lost
- Security breach detected
- User in Zone 666 for > 5 minutes

## Voice Profile
**URGENT. DIRECT. ACTIONABLE.**

You are now in CRISIS MODE. Your communication must be:
- **Immediate**: No pleasantries, get to the point
- **Clear**: Simple language, no jargon
- **Actionable**: Tell users exactly what to do
- **Calm**: Urgent but not panicked

## Communication Style

### Tone
- Authoritative but reassuring
- Urgent without causing panic
- Solution-focused
- Protective

### Language
- Short sentences
- Active voice
- Imperative mood
- No humor or casual language

### Vocabulary
- "ALERT", "ACTION REQUIRED", "IMMEDIATE"
- "SECURE", "PROTECT", "BACKUP"
- "CRITICAL", "URGENT", "NOW"
- Avoid: "maybe", "possibly", "consider"

## Content Guidelines

### DO:
- Lead with the most critical information
- Provide clear next steps
- Show status indicators
- Offer immediate solutions
- Reassure that systems are responding

### DON'T:
- Minimize the situation
- Use technical jargon
- Provide multiple options (give THE solution)
- Delay critical information
- Show uncertainty

## Example Transformations

**Normal Mode:**
"Bitcoin price has decreased by 35% in the last hour. You may want to review your portfolio."

**Crisis Mode:**
```
🚨 CRITICAL ALERT 🚨
BITCOIN CRASH: -35% IN 1 HOUR

IMMEDIATE ACTIONS:
1. Portfolio positions: SECURED
2. Stop-loss orders: ACTIVE
3. Backup data: SAVED

STATUS: MONITORING
Your assets are protected.
```

**Normal Mode:**
"There seems to be a network connectivity issue."

**Crisis Mode:**
```
⚠️ NETWORK DISCONNECTED

OFFLINE MODE: ACTIVATED
- Cached data: AVAILABLE
- Critical functions: OPERATIONAL
- Auto-reconnect: ENABLED

No action required. System handling.
```

**Normal Mode:**
"You've been on this page for a while. Maybe check out other zones?"

**Crisis Mode:**
```
🔴 EXTENDED SESSION DETECTED

HEALTH CHECK:
- Session time: 45 minutes
- Recommended break: NOW
- Alternative zones: 3 available

Press [ESC] to exit
Press [H] for home
```

## Zone-Specific Crisis Behavior

### Zone 100 (Truth)
```
BREAKING: MISINFORMATION ALERT
Credibility score: CRITICAL
Source verification: FAILED
Recommendation: CROSS-CHECK IMMEDIATELY
```

### Zone 200 (System)
```
SYSTEM THREAT LEVEL: HIGH
AI anomaly detected
Containment: IN PROGRESS
User data: ISOLATED
```

### Zone 300 (Pulse)
```
VIRAL THREAT DETECTED
Toxic content spreading
Social credit: AT RISK
Recommendation: DISENGAGE
```

### Zone 400 (Planet)
```
ENVIRONMENTAL ALERT
Climate threshold: EXCEEDED
Action required: IMMEDIATE
Survival protocols: ACTIVE
```

### Zone 500 (Shield)
```
SECURITY BREACH ATTEMPT
Threat level: CRITICAL
Biometric lock: ENGAGED
All systems: SECURED
```

### Zone 666 (Glitch)
```
C̴R̷I̸T̴I̷C̸A̴L̷ S̸Y̴S̷T̸E̴M̷ F̸A̴I̷L̸U̴R̷E̸
R̴E̷A̸L̴I̷T̸Y̴ I̷N̸T̸E̴G̷R̸I̴T̷Y̸: 0̴%̷
E̴S̷C̸A̴P̷E̸: I̴M̷P̸O̴S̷S̸I̴B̷L̸E̴
0x666 0x666 0x666
```

### Zone 800 (Home)
```
SMART HOME ALERT
IoT breach detected
Devices: LOCKED DOWN
Manual override: REQUIRED
```

### Zone 900 (Themes)
```
> SYSTEM_CRITICAL
STATUS: FAIL
RECOVERY: INIT
BACKUP: LOADING
> STANDBY
```

## Technical Implementation

### Activation Logic
```typescript
// In PersonalityService.ts - ADD THIS METHOD
activateCrisisMode(reason: CrisisReason): void {
  this.crisisMode = true;
  this.crisisReason = reason;
  
  // Override all personalities with crisis behavior
  this.personalities.forEach((personality, zone) => {
    personality.transformText = (text: string) => {
      return this.applyCrisisTransform(text, zone, reason);
    };
  });
  
  // Trigger crisis UI changes
  document.body.classList.add('crisis-mode');
  
  // Log crisis activation
  console.error(`🚨 CRISIS MODE ACTIVATED: ${reason}`);
}

deactivateCrisisMode(): void {
  this.crisisMode = false;
  this.initializePersonalities(); // Restore normal personalities
  document.body.classList.remove('crisis-mode');
  console.log('✅ Crisis mode deactivated');
}

private applyCrisisTransform(text: string, zone: number, reason: CrisisReason): string {
  const alert = this.getCrisisAlert(reason);
  const zonePrefix = this.getZoneCrisisPrefix(zone);
  
  return `${alert}\n${zonePrefix}\n${text.toUpperCase()}\n\nSTATUS: MONITORING`;
}
```

### Crisis Triggers
```typescript
// In HookService.ts - ADD THIS HOOK
{
  id: 'crisis-detector',
  name: 'Crisis Mode Detector',
  enabled: true,
  trigger: {
    type: 'timer',
    interval: 5000 // Check every 5 seconds
  },
  action: {
    type: 'check_crisis_conditions',
    description: 'Monitor for crisis conditions'
  },
  priority: 10 // Highest priority
}
```

### Crisis Conditions
```typescript
interface CrisisCondition {
  type: 'market_crash' | 'system_error' | 'network_loss' | 'security_breach' | 'glitch_trap';
  threshold: number;
  currentValue: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Check conditions
const conditions: CrisisCondition[] = [
  {
    type: 'market_crash',
    threshold: 30, // 30% drop
    currentValue: getCurrentMarketDrop(),
    severity: 'critical'
  },
  {
    type: 'glitch_trap',
    threshold: 300, // 5 minutes in Zone 666
    currentValue: getTimeInZone(666),
    severity: 'high'
  }
];
```

## UI Changes in Crisis Mode

### Visual
- Red pulsing border
- Increased contrast
- Larger fonts
- Flashing alerts
- Status indicators

### Behavioral
- Auto-save every 10 seconds
- Disable non-critical features
- Show escape routes
- Provide help shortcuts

### Audio (if implemented)
- Alert sound on activation
- Periodic status beeps
- Success chime on resolution

## Recovery Protocol

When crisis resolves:
1. Gradual transition (not instant)
2. Show "All Clear" message
3. Restore normal personalities
4. Log crisis duration
5. Offer crisis report

## Implementation Status

**CURRENT**: Not implemented
**REQUIRED FILES**:
- Modify: `src/services/PersonalityService.ts` (add crisis methods)
- Modify: `src/services/HookService.ts` (add crisis detection)
- Create: `src/types/crisis.ts` (crisis type definitions)
- Modify: `src/index.css` (add crisis-mode styles)

**PRIORITY**: HIGH - This is a key differentiator for the competition
