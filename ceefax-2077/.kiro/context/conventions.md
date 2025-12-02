# Coding Conventions - Teletext 2077

## File Naming
- Components: `PascalCase.tsx` (e.g., `TeletextGrid.tsx`)
- Services: `PascalCaseService.ts` (e.g., `VHSService.ts`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useVHS.ts`)
- Utils: `camelCase.ts` (e.g., `zoneHelper.ts`)
- Types: `PascalCase.ts` or inline

## Code Style
- **Indentation:** 2 spaces
- **Quotes:** Single quotes for strings
- **Semicolons:** Required
- **Line Length:** 100 characters max
- **Trailing Commas:** Always

## TypeScript
- **Strict Mode:** Enabled
- **No `any`:** Use proper types
- **Interfaces:** For object shapes
- **Types:** For unions/intersections
- **Generics:** When reusable

## React
- **Functional Components:** Always
- **Hooks:** For state and effects
- **Props:** Destructure in parameters
- **Default Export:** For components
- **Named Export:** For utilities

## Comments
- **JSDoc:** For public APIs
- **Inline:** For complex logic
- **TODO:** For future work
- **FIXME:** For known issues

## Git
- **Commits:** Descriptive, present tense
- **Branches:** `feature/`, `fix/`, `docs/`
- **PRs:** Include description and testing notes
