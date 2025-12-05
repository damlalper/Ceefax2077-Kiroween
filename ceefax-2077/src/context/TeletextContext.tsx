import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { PersonalityService } from '../services/PersonalityService'
import type { Personality } from '../services/PersonalityService'

interface TeletextContextType {
  currentPage: number
  inputBuffer: string
  currentPersonality: Personality
  addDigit: (digit: string) => void
  goToPage: (page: number) => void
  navigateToPage: (page: number) => void
  clearBuffer: () => void
  transformText: (text: string) => string
}

const TeletextContext = createContext<TeletextContextType | undefined>(undefined)

export function TeletextProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<number>(100)
  const [inputBuffer, setInputBuffer] = useState<string>('')
  const [lastActivity, setLastActivity] = useState<number>(() => Date.now())
  const [currentPersonality, setCurrentPersonality] = useState<Personality>(
    PersonalityService.getPersonalityForPage(100)
  )

  // Idle timeout - redirect to 666 after 5 minutes of inactivity
  useEffect(() => {
    const checkIdle = setInterval(() => {
      const idleTime = Date.now() - lastActivity
      const fiveMinutes = 5 * 60 * 1000

      // Only trigger if not already on 666 and idle for 5 minutes
      if (idleTime > fiveMinutes && currentPage !== 666) {
        setCurrentPage(666)
        setInputBuffer('')
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(checkIdle)
  }, [lastActivity, currentPage])

  // Track user activity
  useEffect(() => {
    const resetActivity = () => {
      setLastActivity(() => Date.now())
    }

    // Listen for any user interaction
    window.addEventListener('keydown', resetActivity)
    window.addEventListener('mousemove', resetActivity)
    window.addEventListener('click', resetActivity)

    return () => {
      window.removeEventListener('keydown', resetActivity)
      window.removeEventListener('mousemove', resetActivity)
      window.removeEventListener('click', resetActivity)
    }
  }, [])

  const addDigit = (digit: string) => {
    console.log('🔢 addDigit called:', digit)
    setLastActivity(() => Date.now()) // Reset idle timer on input
    
    // Use functional update to get current buffer value
    setInputBuffer((prevBuffer) => {
      console.log('📋 Previous buffer:', prevBuffer)
      
      if (prevBuffer.length < 3 && /^[0-9]$/.test(digit)) {
        const newBuffer = prevBuffer + digit
        console.log('📝 New buffer:', newBuffer)

        // Auto-navigate when 3 digits are entered
        if (newBuffer.length === 3) {
          const pageNumber = parseInt(newBuffer, 10)
          console.log('🚀 Navigating to page:', pageNumber)
          setTimeout(() => {
            goToPage(pageNumber)
          }, 300) // Small delay for visual feedback
        }

        return newBuffer
      }
      
      return prevBuffer
    })
  }

  const goToPage = (page: number) => {
    setLastActivity(() => Date.now()) // Reset idle timer on navigation
    setCurrentPage(page)
    setInputBuffer('')
    
    // Update personality based on new zone
    const newPersonality = PersonalityService.getPersonalityForPage(page)
    setCurrentPersonality(newPersonality)
  }
  
  const transformText = (text: string): string => {
    return currentPersonality.transformText(text)
  }

  const clearBuffer = () => {
    setInputBuffer('')
  }

  return (
    <TeletextContext.Provider
      value={{
        currentPage,
        inputBuffer,
        currentPersonality,
        addDigit,
        goToPage,
        navigateToPage: goToPage, // Alias for compatibility
        clearBuffer,
        transformText,
      }}
    >
      {children}
    </TeletextContext.Provider>
  )
}

export function useTeletext() {
  const context = useContext(TeletextContext)
  if (context === undefined) {
    throw new Error('useTeletext must be used within a TeletextProvider')
  }
  return context
}
