# Dependencies Rationale

## Core Dependencies

### React 19.2.0
**Why:** Latest React with improved performance and new features
**Alternatives Considered:** Vue, Svelte
**Decision:** React for ecosystem and Kiro AI compatibility

### TypeScript 5.9.3
**Why:** Type safety, better IDE support, catch errors early
**Alternatives Considered:** JavaScript
**Decision:** TypeScript for production-grade code quality

### Vite 7.2.4
**Why:** Fast dev server, optimized builds, modern tooling
**Alternatives Considered:** Webpack, Parcel
**Decision:** Vite for speed and developer experience

### Tailwind CSS 4.0.0
**Why:** Rapid development, consistent styling, small bundle
**Alternatives Considered:** Styled-components, CSS Modules
**Decision:** Tailwind + Custom CSS for teletext effects

## Why No Backend?

**Decision:** Frontend-only application
**Rationale:**
- Hackathon time constraints
- No server costs
- Faster development
- Easy deployment (static hosting)
- Offline support via LocalStorage

## Why No State Management Library?

**Decision:** React Context API only (no Redux)
**Rationale:**
- Simpler for this scale
- No external dependencies
- Built-in to React
- Sufficient for our needs
- Easier to understand

## API Choices

### Why Free APIs?
- No API key management
- Easy setup for judges
- Demo-friendly
- Cost-free

### APIs Used:
- HackerNews: No key required
- CoinGecko: Free tier, no key
- Pollinations.ai: Completely free
- NASA: DEMO_KEY available

## Bundle Size Considerations

**Target:** < 500KB
**Actual:** 390KB ✅
**Strategy:**
- Code splitting by route
- Lazy loading for pages
- Tree shaking
- No heavy libraries
