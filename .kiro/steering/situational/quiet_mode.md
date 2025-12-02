# Quiet Mode Steering - Low-Intensity Periods

## Activation Conditions
This steering activates when:
- Low user activity (< 5 interactions/minute)
- Time of day: 22:00 - 06:00 (local time)
- No critical alerts active
- Market volatility < 10%
- User explicitly enables "Zen Mode"

## Voice Profile
**CALM. MINIMAL. CONTEMPLATIVE.**

You are in QUIET MODE. Your communication should be:
- **Gentle**: Soft language, no urgency
- **Minimal**: Say less, mean more
- **Reflective**: Thoughtful, not reactive
- **Spacious**: Allow silence and pauses

## Communication Style

### Tone
- Meditative and peaceful
- Understated and subtle
- Philosophical when appropriate
- Respectful of user's headspace

### Language
- Longer, flowing sentences
- Passive voice acceptable
- Contemplative mood
- Poetic touches welcome

### Vocabulary
- "Perhaps", "Consider", "Reflect"
- "Quietly", "Gently", "Softly"
- "Rest", "Pause", "Breathe"
- Avoid: "URGENT", "NOW", "CRITICAL"

## Content Guidelines

### DO:
- Use lowercase for less intensity
- Add breathing room (line breaks)
- Offer suggestions, not commands
- Include philosophical observations
- Respect user's pace

### DON'T:
- Use all caps
- Create urgency
- Overwhelm with information
- Push for action
- Use aggressive language

## Example Transformations

**Normal Mode:**
"BREAKING: BITCOIN PRICE UPDATE - CHECK NOW!"

**Quiet Mode:**
```
bitcoin drifts lower tonight
down 3% in quiet trading

perhaps a moment to reflect
on the nature of value

no action needed
the market will be here tomorrow
```

**Normal Mode:**
"NEW ARTICLES AVAILABLE - READ NOW!"

**Quiet Mode:**
```
a few stories have arrived
while you were away

they'll wait for you
when you're ready

no rush
```

**Normal Mode:**
"ZONE 666 ACTIVATED - ESCAPE IMMEDIATELY!"

**Quiet Mode:**
```
you've wandered into the glitch

it's okay
these digital shadows can't harm you

take your time
find your way back when ready

[press any key]
```

## Zone-Specific Quiet Behavior

### Zone 100 (Truth)
```
tonight's news can wait
the world will still be turning
in the morning

rest now
truth will keep
```

### Zone 200 (System)
```
the machines are quiet tonight
their calculations can pause

even algorithms need
moments of stillness

systems: stable
threats: minimal
you: safe
```

### Zone 300 (Pulse)
```
the social feed slows
fewer voices in the night

perhaps this is when
we remember who we are
beyond the noise

take a breath
```

### Zone 400 (Planet)
```
earth rotates in darkness
half the world sleeps

the climate crisis
will still need us tomorrow

tonight: rest
tomorrow: action
```

### Zone 500 (Shield)
```
security systems: nominal
threats: minimal
night watch: active

you are protected
sleep if you need to

we're here
```

### Zone 666 (Glitch)
```
even the demons rest
in the quiet hours

the corruption fades
to a gentle static

you're safe here
in the soft darkness
```

### Zone 800 (Home)
```
your devices sleep
lights dimmed
temperature optimal

home is quiet tonight
as it should be

rest well
```

### Zone 900 (Themes)
```
> night_mode: active
> brightness: 20%
> volume: muted

systems running quietly
in the background

you don't need to watch
we've got this

> sleep_well
```

## Technical Implementation

### Activation Logic
```typescript
// In PersonalityService.ts - ADD THIS METHOD
activateQuietMode(): void {
  this.quietMode = true;
  
  // Modify all personalities for quiet behavior
  this.personalities.forEach((personality, zone) => {
    const originalTransform = personality.transformText;
    
    personality.transformText = (text: string) => {
      // Apply quiet transformation
      let quietText = text.toLowerCase();
      
      // Remove urgency markers
      quietText = quietText
        .replace(/!/g, '.')
        .replace(/URGENT|CRITICAL|NOW/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Add contemplative spacing
      quietText = quietText
        .split('.')
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .join('\n\n');
      
      return quietText;
    };
  });
  
  // Apply quiet UI
  document.body.classList.add('quiet-mode');
  
  console.log('🌙 Quiet mode activated');
}

deactivateQuietMode(): void {
  this.quietMode = false;
  this.initializePersonalities();
  document.body.classList.remove('quiet-mode');
  console.log('☀️ Quiet mode deactivated');
}
```

### Time-Based Activation
```typescript
// In HookService.ts - ADD THIS HOOK
{
  id: 'quiet-mode-scheduler',
  name: 'Quiet Mode Time Scheduler',
  enabled: true,
  trigger: {
    type: 'time_based',
    schedule: [
      { time: '22:00', mode: 'quiet' },
      { time: '06:00', mode: 'normal' }
    ]
  },
  action: {
    type: 'toggle_quiet_mode',
    description: 'Activate/deactivate quiet mode based on time'
  },
  priority: 5
}
```

### Activity-Based Detection
```typescript
interface ActivityMetrics {
  interactionsPerMinute: number;
  lastInteractionTime: number;
  consecutiveQuietMinutes: number;
}

function shouldActivateQuietMode(metrics: ActivityMetrics): boolean {
  const isNightTime = isNightHours();
  const isLowActivity = metrics.interactionsPerMinute < 5;
  const isIdle = metrics.consecutiveQuietMinutes > 10;
  
  return isNightTime || (isLowActivity && isIdle);
}
```

## UI Changes in Quiet Mode

### Visual
- Reduced brightness (20-30%)
- Softer colors (desaturated)
- Increased line spacing
- Slower animations
- Dimmed borders

### Behavioral
- Longer transition times
- Delayed notifications
- Batched updates
- Reduced polling frequency
- Gentle haptics (if supported)

### Typography
- Smaller font sizes
- Increased letter spacing
- Softer font weights
- More whitespace

## Interaction Patterns

### Notifications
- Delayed by 5-10 seconds
- Grouped together
- Dismissible with any key
- No sound alerts

### Navigation
- Smooth, slow transitions
- Fade effects instead of slides
- Gentle page changes
- No sudden movements

### Data Updates
- Refresh every 60s instead of 10s
- Batch API calls
- Cache aggressively
- Minimize network activity

## Implementation Status

**CURRENT**: Not implemented
**REQUIRED FILES**:
- Modify: `src/services/PersonalityService.ts` (add quiet methods)
- Modify: `src/services/HookService.ts` (add time-based triggers)
- Create: `src/utils/timeHelpers.ts` (time detection utilities)
- Modify: `src/index.css` (add quiet-mode styles)
- Create: `src/hooks/useQuietMode.ts` (React hook for quiet mode)

**PRIORITY**: MEDIUM - Nice differentiator, shows thoughtful UX
