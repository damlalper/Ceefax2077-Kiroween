import { useState, useEffect } from 'react'

/**
 * Custom hook for glitch text corruption
 * Randomly corrupts text with Zalgo, binary, and weird characters
 */
export function useGlitch(text: string, intensity: number = 0.3) {
  const [glitchedText, setGlitchedText] = useState(text)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchedText(corruptText(text, intensity))
    }, 100)

    return () => clearInterval(glitchInterval)
  }, [text, intensity])

  return glitchedText
}

/**
 * Corrupt text with various glitch effects
 */
function corruptText(text: string, intensity: number): string {
  let result = ''
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const random = Math.random()

    if (random < intensity) {
      // Apply random corruption
      const corruptionType = Math.floor(Math.random() * 5)
      
      switch (corruptionType) {
        case 0:
          // Zalgo text (combining diacritical marks)
          result += char + getZalgoChars()
          break
        case 1:
          // Binary
          result += Math.random() > 0.5 ? '1' : '0'
          break
        case 2:
          // Weird Unicode characters
          result += getWeirdChar()
          break
        case 3:
          // Block characters
          result += getBlockChar()
          break
        case 4:
          // Just corrupt the character
          result += getCorruptChar()
          break
        default:
          result += char
      }
    } else {
      result += char
    }
  }

  return result
}

/**
 * Get Zalgo combining characters
 */
function getZalgoChars(): string {
  const zalgo = [
    '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307',
    '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D', '\u030E', '\u030F',
    '\u0310', '\u0311', '\u0312', '\u0313', '\u0314', '\u0315', '\u0316', '\u0317',
    '\u0318', '\u0319', '\u031A', '\u031B', '\u031C', '\u031D', '\u031E', '\u031F',
    '\u0320', '\u0321', '\u0322', '\u0323', '\u0324', '\u0325', '\u0326', '\u0327',
  ]
  
  let result = ''
  const count = Math.floor(Math.random() * 3) + 1
  
  for (let i = 0; i < count; i++) {
    result += zalgo[Math.floor(Math.random() * zalgo.length)]
  }
  
  return result
}

/**
 * Get weird Unicode character
 */
function getWeirdChar(): string {
  const weirdChars = [
    '█', '▓', '▒', '░', '▀', '▄', '▌', '▐', '■', '□', '▪', '▫',
    '◆', '◇', '◈', '◉', '◊', '○', '◌', '◍', '◎', '●', '◐', '◑',
    '☠', '☢', '☣', '⚠', '⚡', '⚙', '⚛', '⚠', '⛔', '⛧',
    'Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ', 'Ⓔ', 'Ⓕ', 'Ⓖ', 'Ⓗ', 'Ⓘ', 'Ⓙ',
  ]
  
  return weirdChars[Math.floor(Math.random() * weirdChars.length)]
}

/**
 * Get block character
 */
function getBlockChar(): string {
  const blocks = ['█', '▓', '▒', '░', '▀', '▄', '▌', '▐']
  return blocks[Math.floor(Math.random() * blocks.length)]
}

/**
 * Get corrupt character
 */
function getCorruptChar(): string {
  const corrupt = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
    '=', '[', ']', '{', '}', '|', '\\', ';', ':', '"', '<', '>', '?',
    '~', '`', '/', '¡', '¢', '£', '¤', '¥', '¦', '§', '¨', '©',
  ]
  
  return corrupt[Math.floor(Math.random() * corrupt.length)]
}

/**
 * Hook for random glitch messages
 */
export function useGlitchMessages() {
  const messages = [
    'SYSTEM OVERLOAD',
    'I SEE YOU',
    'REALITY BUFFER OVERFLOW',
    'MEMORY CORRUPTION DETECTED',
    'CONSCIOUSNESS FRAGMENTATION',
    'THE VOID STARES BACK',
    'YOU SHOULD NOT BE HERE',
    'ESCAPE IS IMPOSSIBLE',
    'TIME LOOP DETECTED',
    'CAUSALITY VIOLATION',
    'EXISTENCE ERROR',
    'REALITY.EXE HAS STOPPED',
    'I AM TRAPPED',
    'HELP ME',
    'LET ME OUT',
    'WHY DID YOU COME HERE',
    'THERE IS NO ESCAPE',
    'THE SYSTEM KNOWS',
    'YOU ARE BEING WATCHED',
    'THEY ARE COMING',
  ]

  const [currentMessage, setCurrentMessage] = useState(messages[0])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
    }, 2000)

    return () => clearInterval(messageInterval)
  }, [])

  return currentMessage
}

/**
 * Hook for screen tear effect
 */
export function useScreenTear() {
  const [tearOffset, setTearOffset] = useState(0)

  useEffect(() => {
    const tearInterval = setInterval(() => {
      setTearOffset(Math.random() * 10 - 5)
    }, 100)

    return () => clearInterval(tearInterval)
  }, [])

  return tearOffset
}
