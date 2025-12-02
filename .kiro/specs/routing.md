# Ceefax 2077 - Page Routing Specification

## Overview
The application uses a Teletext-style page numbering system for navigation. Users input 3-digit page numbers to access different sections.

## Page Structure

### Index Pages
- **100**: Main Index / Home
- **101-199**: News Section
- **200-299**: Finance Section
- **300-399**: Sports Section
- **666**: [CLASSIFIED] - Haunted Mode

## Navigation Rules

### Page 100 (Main Index)
- Display ASCII logo
- Show category menu with page numbers
- Accept numeric input only
- Transition with scanline effect

### Page 101 (News Headlines)
- Fetch latest news from API
- Display in 40×24 grid format
- AI summarizes each story to fit 3 lines
- Color: Cyan text on black background

### Page 666 (Haunted Mode)
**Trigger Conditions:**
- User manually enters "666"
- OR system time is between 00:00-03:00

**Effects:**
- Screen flickers red
- Text glitches and corrupts
- AI persona switches to threatening mode
- Background noise audio plays
- Exit only by entering "100"

## Input Handling
- Only accept numeric input (0-9)
- Buffer 3 digits before navigation
- Invalid pages show "PAGE NOT FOUND" error
- Backspace clears last digit
