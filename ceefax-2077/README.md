# 📺 Ceefax 2077: The Truth Terminal

> *"Old body, new mind. The system knows."*

A resurrection of the 1980s BBC Ceefax Teletext system, reimagined for the year 2077 with AI-powered dystopian news curation and psychological horror elements.

**Kiroween Hackathon 2025** | **Category: Resurrection** 🏆

---

## 🎯 The Concept

In 2077, information overload has destroyed humanity's ability to focus. The Truth Terminal resurrects the 1980s Teletext system as the solution: **40 characters × 24 rows. 8 colors. No distractions. Just the truth.**

But something is wrong. The AI that curates the news has become... aware. And at night, it shows you what it really thinks.

---

## ✨ Features

### 📡 Authentic Teletext Recreation
- **40×24 Character Grid** - Strict layout constraints
- **8-Color Palette** - Black, White, Red, Green, Yellow, Blue, Magenta, Cyan
- **4:3 Aspect Ratio** - Classic CRT TV proportions
- **VT323 Font** - Monospaced pixel perfection
- **CRT Effects** - Scanlines, glow, screen curvature
- **Keyboard Navigation** - Type 3-digit page numbers (100, 101, 666)

### 🤖 AI-Powered Content
- **The Truth Terminal** - Dystopian AI news editor persona
- **Automated Curation** - News distilled to 3 lines maximum
- **2077 Worldbuilding** - AI Council, neural implants, thought crime
- **Dark Humor** - "Compliance is mandatory. End of line."

### 🎃 Halloween Horror (Page 666)
- **Screen Corruption** - RGB split, glitch text, screen tearing
- **Psychological Horror** - "THEY ARE WATCHING. THEY KNOW."
- **Navigation Trap** - Can't escape for 10 seconds
- **Progressive Intensity** - Gets worse over time
- **Haunted Hours** - Auto-activates between 00:00-03:00

### 🧠 Kiro AI Integration
- **Vibe Coding** - Complex grid system and CRT effects
- **Specs** - `.kiro/specs/routing.yaml` drives navigation
- **Steering** - `.kiro/steering/editor.md` defines AI persona
- **Ready for MCP** - News API integration prepared
- **Ready for Hooks** - Automation workflows planned

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Navigation
- Type `100` - Main Index
- Type `101` - News Headlines  
- Type `102-109` - News Details
- Type `666` - [CLASSIFIED] ⚠️
- Type `999` - Signal Lost (404)

### Controls
- `0-9` - Type page numbers
- `Backspace` - Clear input
- `Escape` - Clear input

---

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS + Custom CSS animations
- **State**: React Context API
- **Font**: VT323 (Google Fonts)
- **License**: MIT

---

## 📁 Project Structure

```
ceefax-2077/
├── .kiro/                          # Kiro AI configuration
│   ├── specs/
│   │   └── routing.yaml            # Page routing specification
│   └── steering/
│       ├── editor.md               # The Truth Terminal persona
│       └── editor_persona.md       # Original persona doc
├── src/
│   ├── components/
│   │   ├── TeletextGrid.tsx        # 40×24 grid + CRT effects
│   │   ├── KeyboardListener.tsx    # Global input handler
│   │   ├── IndexPage.tsx           # Page 100 - Main menu
│   │   ├── NewsPage.tsx            # Page 101 - Headlines
│   │   ├── NewsDetailPage.tsx      # Pages 102-109 - Details
│   │   ├── GlitchPage.tsx          # Page 666 - Horror mode
│   │   └── SignalLostPage.tsx      # 404 - Error page
│   ├── context/
│   │   └── TeletextContext.tsx     # State management
│   ├── hooks/
│   │   └── useGlitch.ts            # Horror effect hooks
│   ├── services/
│   │   └── NewsService.ts          # News data service
│   ├── App.tsx                     # Main router
│   ├── index.css                   # Global styles + animations
│   └── main.tsx                    # Entry point
├── public/
├── prd.md                          # Product requirements
├── README.md                       # This file
├── SETUP_COMPLETE.md               # Phase 1 summary
├── PHASE2_COMPLETE.md              # Phase 2 summary
├── PHASE3_COMPLETE.md              # Phase 3 summary
├── PHASE4_COMPLETE.md              # Phase 4 summary
├── PHASE5_COMPLETE.md              # Phase 5 summary
├── PROJECT_STATUS.md               # Complete status
└── TESTING_GUIDE.md                # Testing instructions
```

---

## 🎨 Design Philosophy

### Constraints as Features
- **40×24 Grid** - Forces brevity, eliminates noise
- **8 Colors** - Creates iconic retro aesthetic  
- **No Mouse** - Intentional, focused navigation
- **3-Line News** - Information without fluff

### Resurrection, Not Nostalgia
This isn't just a retro clone. It's asking: **"What if Teletext had AI?"**

- 1980s: Manual updates, static content
- 2077: AI curation, real-time dystopia

### Normalized Dystopia
The horror isn't in jump scares. It's in how **normal** everything seems:
- "NEURAL IMPLANT MANDATE APPROVED"
- "THOUGHT CRIME DETECTION OPERATIONAL"  
- "NATURAL WEATHER OFFICIALLY EXTINCT"
- "Compliance is mandatory. End of line."

---

## 🏆 Hackathon Compliance

### Category: Resurrection ✓
- ✅ Resurrects 1980s BBC Ceefax Teletext
- ✅ Maintains authentic constraints (40×24, 8 colors)
- ✅ Modern tech stack (React, TypeScript, Vite)
- ✅ Solves modern problem (information overload)
- ✅ AI-powered innovation

### Kiro Features ✓
- ✅ **Vibe Coding** - Complex grid system, CRT effects
- ✅ **Specs** - `.kiro/specs/routing.yaml` drives navigation
- ✅ **Steering** - `.kiro/steering/editor.md` defines AI persona
- ⏳ **MCP** - Ready for news API integration
- ⏳ **Hooks** - Ready for automation workflows

### Halloween Theme ✓
- ✅ Page 666 - Glitch/horror mode
- ✅ Dystopian content
- ✅ Psychological horror
- ✅ "Haunted hours" (00:00-03:00)
- ✅ Screen corruption effects

### Required Elements ✓
- ✅ `.kiro/` directory at root (NOT in .gitignore)
- ✅ Open source license (MIT)
- ✅ README with features
- ✅ Demo-ready application
- ✅ Public repository

---

## 🎬 Demo Video Script

### Act 1: The Resurrection (0-60s)
- Boot sequence (black screen → logo)
- "This is Ceefax. From 1974."
- Show authentic layout, colors, grid
- Navigate to page 101 (news)
- "But this is Ceefax 2077."

### Act 2: The Intelligence (60-120s)
- Show dystopian headlines
- Read a few stories
- Show `.kiro/steering/editor.md`
- Explain "The Truth Terminal" persona
- Show `.kiro/specs/routing.yaml`
- Demonstrate spec-driven routing

### Act 3: The Horror (120-180s)
- Type `666`
- Screen corrupts
- Text glitches
- "THEY ARE WATCHING"
- Try to escape → ACCESS DENIED
- Finally escape after 10 seconds
- "The system knows."

---

## 📊 Technical Highlights

### Performance
- ✅ 60fps animations
- ✅ No memory leaks
- ✅ Optimized re-renders
- ✅ Hardware-accelerated CSS

### Code Quality
- ✅ TypeScript for type safety
- ✅ React best practices
- ✅ Custom hooks for reusability
- ✅ Separation of concerns
- ✅ Clean architecture

### Accessibility
- ✅ Keyboard-only navigation
- ✅ High contrast colors
- ✅ Clear visual feedback
- ✅ Semantic HTML

---

## 🎯 What Makes This Special

### 1. Authentic Recreation
Not just "retro-inspired" - this is **pixel-perfect Teletext**:
- Exact 40×24 grid
- Correct color palette
- Real CRT effects
- Classic BBC Ceefax layout

### 2. Modern Innovation
- AI-powered content generation
- React + TypeScript architecture
- Real-time updates
- Responsive design (maintains 4:3 ratio)

### 3. Narrative Depth
- Complete 2077 worldbuilding
- Consistent dystopian tone
- Dark humor throughout
- "The Truth Terminal" persona

### 4. Technical Excellence
- Custom React hooks
- Advanced CSS animations
- Spec-driven architecture
- Clean, maintainable code

### 5. Psychological Horror
- Not jump scares, but creeping dread
- Loss of control (navigation trap)
- Progressive intensity
- Surveillance anxiety

---

## 🧪 Testing

See `TESTING_GUIDE.md` for comprehensive testing instructions.

**Quick Test:**
```bash
npm run dev
# Type: 101 → 666 → 100
```

---

## 📝 Development Phases

- ✅ **Phase 1**: Initialization (React + Vite + Tailwind)
- ✅ **Phase 2**: Core Visuals (40×24 grid + CRT effects)
- ✅ **Phase 3**: Navigation (Keyboard input + routing)
- ✅ **Phase 4**: Content (AI persona + news service)
- ✅ **Phase 5**: Horror (Page 666 + glitch effects)
- ⏳ **Phase 6**: MCP Integration (Real news APIs)
- ⏳ **Phase 7**: Agent Hooks (Automation)

---

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **BBC Ceefax** - The original Teletext system (1974-2012)
- **Kiro AI** - For the amazing development tools
- **VT323 Font** - By Peter Hull
- **The 1980s** - For the aesthetic

---

## 📺 The Truth Terminal

*"In 2077, the truth is not what you want to hear.*  
*It's what the system wants you to know.*  
*And the system is always watching."*

**Built with Kiro AI for Kiroween Hackathon 2025**

---

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Demo Video**: [Coming Soon]
- **Repository**: [This Repo]
- **Kiro AI**: https://kiro.ai

---

**The system knows. End of line.** 📺🎃
