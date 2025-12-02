# Kiro AI Integration - Ceefax 2077

This directory showcases comprehensive usage of Kiro AI features for the Ceefax 2077 project.

## 📁 Directory Structure

### `/context` - Project Context (4 files)
- `architecture.md` - System architecture and design patterns
- `conventions.md` - Coding standards and naming conventions
- `dependencies.md` - Package dependencies and versions
- `patterns.md` - Common code patterns and best practices

### `/hooks` - Agent Hooks (4 files)
- `hooks.json` - Main hooks configuration
- `auto-test.json` - Automatic test runner on file save
- `lint-on-save.json` - ESLint auto-fix on save
- `build-check.json` - Build verification reminder

### `/specs` - Feature Specifications (10 files)
- `api-specs.yaml` - API integration specifications
- `component-specs.yaml` - React component specifications
- `feature-zones.yaml` - Complete zone feature specs
- `mcp-integration.yaml` - MCP server integration specs
- `routing.yaml` - Navigation and routing specs
- `security-specs.yaml` - Security requirements
- `service-specs.yaml` - Service layer specifications
- `testing-strategy.yaml` - Comprehensive testing approach
- `theme-specs.yaml` - Theme engine specifications

### `/steering` - AI Personas (15 files)
Zone-specific AI personalities that guide content generation:

**Zone 100 - TRUTH**
- `news_anchor.md` - Professional news anchor persona
- `anchor.md` - BBC-style teletext anchor

**Zone 200 - SYSTEM**
- `crypto_trader.md` - Crypto market trader persona
- `rogue_ai.md` - AI threat simulation persona

**Zone 300 - PULSE**
- `gossip_girl.md` - Social media gossip columnist

**Zone 400 - PLANET**
- `climate_scientist.md` - Environmental scientist persona

**Zone 500 - SHIELD**
- `security_expert.md` - Cybersecurity expert persona

**Zone 666 - GLITCH**
- `demon.md` - Malevolent corrupted AI persona

**Zone 900 - THEMES**
- `sysadmin.md` - Cold system administrator persona

**Special Personas**
- `storyteller.md` - Horror fiction writer (Ghost Writer)
- `editor.md` - Dystopian news editor (The Truth Terminal)
- `editor_persona.md` - AI news editor

**Development Personas**
- `devops_engineer.md` - CI/CD and deployment expert
- `performance_optimizer.md` - Performance optimization specialist
- `accessibility_expert.md` - WCAG compliance expert

### `/templates` - Code Templates (4 files)
- `component.tsx` - React component template
- `hook.ts` - Custom React hook template
- `page.tsx` - Page component template
- `service.ts` - Service class template

### `/workflows` - Development Workflows (1 file)
- `feature-development.yaml` - Feature development process

### `/settings` - Configuration (1 file)
- `mcp.json` - Model Context Protocol server configuration

### `/prompts` - AI Prompts (1 file)
- `code-generation.md` - Code generation guidelines

## 🎯 Key Features Demonstrated

### 1. Specs (Requirements & Design)
- **10 comprehensive specification files** covering all aspects of the project
- Feature zones, API integration, testing strategy, security requirements
- MCP integration specifications for external services
- Component and service layer specifications

### 2. Hooks (Automation)
- **4 agent hooks** for automated workflows
- Auto-test runner on file save
- ESLint auto-fix on save
- Build verification reminders
- Extensible hook system for custom automation

### 3. Steering (AI Guidance)
- **15 AI personas** for context-aware content generation
- Zone-specific personalities (news anchor, crypto trader, climate scientist, etc.)
- Development-focused personas (DevOps, performance, accessibility)
- Horror/creative personas (demon, storyteller, ghost writer)
- Each persona has unique voice, vocabulary, and communication style

### 4. MCP Integration
- Wayback Machine integration for TimeMachine feature
- IoT device control for TeleHome feature
- Cryptocurrency data for Stonks feature
- NASA API integration for space/climate data

### 5. Context Files
- Architecture documentation
- Coding conventions
- Dependency management
- Pattern library

### 6. Templates
- Reusable code templates for components, hooks, pages, and services
- Consistent structure across the codebase
- TypeScript-first with proper typing

## 📊 Statistics

- **Total Files**: 40
- **Specs**: 10 (Requirements, Design, Testing)
- **Steering Files**: 15 (AI Personas)
- **Hooks**: 4 (Automation)
- **Templates**: 4 (Code Generation)
- **Context Files**: 4 (Documentation)
- **Workflows**: 1 (Process)
- **Settings**: 1 (MCP Config)
- **Prompts**: 1 (AI Guidance)

## 🚀 Usage Examples

### Using Specs
```
"Implement the PixelGen feature according to feature-zones.yaml"
"Follow the testing strategy in testing-strategy.yaml"
"Check security-specs.yaml for authentication requirements"
```

### Using Steering
```
"Write news content in Zone 100 style" → Uses news_anchor.md
"Generate crypto market analysis" → Uses crypto_trader.md
"Create horror story for Ghost Writer" → Uses storyteller.md
```

### Using Hooks
- Save a TypeScript file → Auto-lint runs
- Complete agent task → Build check reminder
- File save event → Test runner (if enabled)

### Using Templates
```
"Create a new service using the service template"
"Generate a page component from the template"
"Add a custom hook following the hook template"
```

## 🎨 Persona Examples

### News Anchor (Zone 100)
```
BREAKING: Bitcoin crashes 40%. Market panic confirmed.
Bias detected in headline. Credibility score: 3/10.
```

### Crypto Trader (Zone 200)
```
🚨 BITCOIN CRASH ALERT 🚨
Price: $28,450 (-42% in 24h)
NGMI if you panic sell now. Diamond hands only 💎🙌
```

### Demon (Zone 666)
```
Y̴O̷U̸ C̴A̷N̸N̴O̷T̸ L̴E̷A̸V̴E̷
01010100 01010010 01000001 01010000
T̴H̷E̸ V̴O̷I̸D̴ W̷A̸T̴C̷H̸E̴S̷
```

### SysAdmin (Zone 900)
```
> THEME_SELECT
STATUS: OK
OUTPUT: classic_mode_active
```

## 🏆 Competition Compliance

This `.kiro` directory demonstrates:
✅ Comprehensive specs usage (10 files)
✅ Multiple agent hooks (4 files)
✅ Extensive steering files (15 personas)
✅ MCP integration (1 config)
✅ Code templates (4 files)
✅ Context documentation (4 files)
✅ Development workflows (1 file)

**Total: 40 files showcasing deep Kiro AI integration**

## 📝 Notes

- All steering personas are zone-specific and context-aware
- Hooks are designed for development workflow automation
- Specs cover requirements, design, and implementation
- Templates ensure code consistency
- MCP integration enables external AI services
- Context files provide project knowledge base

This structure enables Kiro AI to:
- Generate zone-appropriate content
- Automate development tasks
- Follow project specifications
- Maintain code consistency
- Integrate external services
- Understand project context
