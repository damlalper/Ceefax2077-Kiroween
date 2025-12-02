# Design Patterns Used

## Creational Patterns

### Singleton Pattern
**Used in:** All services
**Example:** VHSService, NarratorService, HookService
**Rationale:** Single instance needed, global access

```typescript
class VHSServiceClass {
  private static instance: VHSServiceClass;
  
  private constructor() {}
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new VHSServiceClass();
    }
    return this.instance;
  }
}

export const VHSService = VHSServiceClass.getInstance();
```

## Structural Patterns

### Facade Pattern
**Used in:** Service layer
**Example:** HookService wraps complex hook logic
**Rationale:** Simple interface for complex subsystem

### Composite Pattern
**Used in:** TeletextGrid component
**Example:** Grid contains header, content, footer
**Rationale:** Treat individual and composite objects uniformly

## Behavioral Patterns

### Observer Pattern
**Used in:** Event system, agent hooks
**Example:** Hook triggers on events
**Rationale:** Loose coupling, event-driven architecture

```typescript
window.addEventListener('hook:refresh-data', () => {
  // Handle event
});
```

### Strategy Pattern
**Used in:** Theme switching, AI personalities
**Example:** Different themes, different strategies
**Rationale:** Runtime behavior change

```typescript
const themes = {
  cyberpunk: CyberpunkStrategy,
  matrix: MatrixStrategy,
  vaporwave: VaporwaveStrategy
};
```

### Command Pattern
**Used in:** Agent hooks actions
**Example:** Each hook has execute() method
**Rationale:** Encapsulate requests as objects

## React Patterns

### Container/Presentational
**Used in:** Page components
**Example:** Hub pages (container) + feature pages (presentational)

### Custom Hooks
**Used in:** All features
**Example:** useVHS, useNarrator, useAgentHooks
**Rationale:** Reusable stateful logic

### Render Props
**Used in:** TeletextGrid
**Example:** Children as render prop
**Rationale:** Flexible composition

## Architectural Patterns

### Layered Architecture
```
Presentation Layer (Components)
    ↓
Business Logic Layer (Hooks)
    ↓
Service Layer (Services)
    ↓
Data Layer (LocalStorage/APIs)
```

### Zone-Based Architecture
**Custom pattern for this project**
**Rationale:** Mirrors teletext page numbering, clear separation
