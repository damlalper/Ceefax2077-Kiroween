import { useState, useEffect, useCallback } from 'react'

interface GlitchOptions {
  intensity?: number // 0-1, how much corruption
  flickerSpeed?: number // milliseconds between flickers
  corruptionSpeed?: number // milliseconds between text corruption
}

const GLITCH_CHARS = '!@#$%^&*()_+{}|:<>?~`¡™£¢∞§¶•ªº–≠'
const ZALGO_MARKS = '̴̵̶̷̸̡̢̧̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎̀́̂̃̄̅̆̇̈̉̊̋̌̍̎̏̐̑̒̓̔̽̾̿̀́͂̓̈́͆͊͋͌̕̚'
const BINARY_CHARS = '01'

export function useGlitch(text: string, options: GlitchOptions = {}) {
  const {
    intensity = 0.5,
    flickerSpeed = 100,
    corruptionSpeed = 200,
  } = options

  const [glitchedText, setGlitchedText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const corruptChar = useCallback((char: string): string => {
    const rand = Math.random()
    
    if (rand < intensity * 0.3) {
      // Replace with glitch character
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
    } else if (rand < intensity * 0.5) {
      // Add Zalgo marks
      const marks = Array.from({ length: Math.floor(Math.random() * 3) }, () =>
        ZALGO_MARKS[Math.floor(Math.random() * ZALGO_MARKS.length)]
      ).join('')
      return char + marks
    } else if (rand < intensity * 0.6) {
      // Convert to binary
      return BINARY_CHARS[Math.floor(Math.random() * 2)]
    } else if (rand < intensity * 0.7) {
      // Duplicate character
      return char + char
    } else if (rand < intensity * 0.8) {
      // Replace with number
      return String(Math.floor(Math.random() * 10))
    }
    
    return char
  }, [intensity])

  const corruptText = useCallback((input: string): string => {
    return input
      .split('')
      .map(char => {
        if (char === ' ') return char
        return Math.random() < intensity ? corruptChar(char) : char
      })
      .join('')
  }, [intensity, corruptChar])

  useEffect(() => {
    // Flicker effect
    const flickerInterval = setInterval(() => {
      setIsGlitching(Math.random() > 0.5)
    }, flickerSpeed)

    // Text corruption effect
    const corruptionInterval = setInterval(() => {
      setGlitchedText(corruptText(text))
    }, corruptionSpeed)

    return () => {
      clearInterval(flickerInterval)
      clearInterval(corruptionInterval)
    }
  }, [text, flickerSpeed, corruptionSpeed, corruptText])

  return { glitchedText, isGlitching }
}

export function useScreenShake() {
  const [isShaking, setIsShaking] = useState(false)

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 200)
      }
    }, 2000)

    return () => clearInterval(shakeInterval)
  }, [])

  return isShaking
}

export function useColorPulse() {
  const [pulseColor, setPulseColor] = useState('#000000')

  useEffect(() => {
    const colors = ['#000000', '#330000', '#660000', '#990000', '#CC0000', '#FF0000']
    let index = 0

    const pulseInterval = setInterval(() => {
      index = (index + 1) % colors.length
      setPulseColor(colors[index])
    }, 150)

    return () => clearInterval(pulseInterval)
  }, [])

  return pulseColor
}
