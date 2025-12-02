# Code Generation Prompts

## Component Generation

### React Component Template
```
Generate a React component for Teletext 2077 with these requirements:

Component Name: {ComponentName}
Purpose: {Purpose}
Zone: {ZoneNumber}

Requirements:
- Use TypeScript
- Import TeletextGrid layout
- Follow 40x24 character grid
- Use teletext colors (#FF0000, #00FF00, etc.)
- Include proper TypeScript types
- Add JSDoc comments
- Export as default

Style:
- Tailwind CSS for layout
- Custom CSS for teletext effects
- Monospace font (VT323)
- High contrast colors

Example structure:
```typescript
/**
 * {ComponentName} - {Purpose}
 * Zone {ZoneNumber}
 */

import TeletextGrid from '../../components/TeletextGrid';

export default function {ComponentName}() {
  return (
    <TeletextGrid>
      <div className="p-4">
        {/* Component content */}
      </div>
    </TeletextGrid>
  );
}
```
```

### Service Generation
```
Generate a service class for Teletext 2077:

Service Name: {ServiceName}
Purpose: {Purpose}
Methods: {MethodList}

Requirements:
- Singleton pattern
- TypeScript with full types
- Error handling with try-catch
- LocalStorage for persistence
- Async/await for API calls
- JSDoc comments

Example structure:
```typescript
/**
 * {ServiceName}
 * {Purpose}
 */

class {ServiceName}Class {
  private static instance: {ServiceName}Class;
  
  private constructor() {}
  
  static getInstance(): {ServiceName}Class {
    if (!{ServiceName}Class.instance) {
      {ServiceName}Class.instance = new {ServiceName}Class();
    }
    return {ServiceName}Class.instance;
  }
  
  // Methods here
}

export const {ServiceName} = {ServiceName}Class.getInstance();
```
```

### Custom Hook Generation
```
Generate a custom React hook:

Hook Name: use{Feature}
Purpose: {Purpose}
State: {StateVariables}
Methods: {Methods}

Requirements:
- TypeScript with return type
- useState/useEffect as needed
- Cleanup in useEffect
- JSDoc comments
- Export named function

Example structure:
```typescript
/**
 * use{Feature} - {Purpose}
 */

import { useState, useEffect } from 'react';

export const use{Feature} = () => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);
  
  return {
    state,
    methods
  };
};
```
```

## Page Generation

### Zone Hub Page
```
Generate a zone hub page:

Zone: {ZoneNumber}
Name: {ZoneName}
Theme: {Theme}
Color: {Color}

Include:
- Zone title and description
- List of available pages
- ASCII art decoration
- Navigation instructions
- Zone-specific styling

Follow teletext grid constraints (40x24).
```

### Feature Page
```
Generate a feature page:

Page Number: {PageNumber}
Feature: {FeatureName}
Data Source: {API/Service}

Include:
- Data fetching with service
- Loading state
- Error handling
- Formatted display in teletext style
- Refresh functionality
```

## Testing Prompts

### Unit Test Generation
```
Generate unit tests for:

File: {FileName}
Functions: {FunctionList}

Requirements:
- Jest framework
- Test all edge cases
- Mock external dependencies
- 80%+ coverage
- Descriptive test names
```

### Integration Test
```
Generate integration test for:

Feature: {FeatureName}
Components: {ComponentList}
Services: {ServiceList}

Test flow:
1. {Step1}
2. {Step2}
3. {Step3}

Verify:
- Data flow
- State updates
- UI rendering
- Error handling
```

## Documentation Prompts

### Feature Documentation
```
Generate documentation for:

Feature: {FeatureName}
Purpose: {Purpose}
Pages: {PageList}

Include:
- Overview
- Technical details
- Usage instructions
- Code examples
- Screenshots/ASCII art
- Testing guide
```

### API Documentation
```
Document API integration:

API: {APIName}
Endpoints: {EndpointList}
Service: {ServiceName}

Include:
- Endpoint specifications
- Request/response examples
- Error handling
- Rate limits
- Caching strategy
```

## Refactoring Prompts

### Code Optimization
```
Optimize this code for:

File: {FileName}
Issues: {IssueList}

Goals:
- Improve performance
- Reduce bundle size
- Better TypeScript types
- Cleaner code structure
- Maintain functionality
```

### Pattern Application
```
Refactor to apply pattern:

Pattern: {PatternName}
Files: {FileList}
Goal: {Goal}

Ensure:
- Backward compatibility
- Type safety
- Test coverage
- Documentation updates
```
