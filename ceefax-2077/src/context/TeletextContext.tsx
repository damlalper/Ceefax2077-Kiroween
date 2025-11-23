import { createContext, useContext, useState, ReactNode } from 'react'

interface TeletextContextType {
  currentPage: number
  inputBuffer: string
  addDigit: (digit: string) => void
  goToPage: (page: number) => void
  clearBuffer: () => void
}

const TeletextContext = createContext<TeletextContextType | undefined>(undefined)

export function TeletextProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<number>(100)
  const [inputBuffer, setInputBuffer] = useState<string>('')

  const addDigit = (digit: string) => {
    if (inputBuffer.length < 3 && /^[0-9]$/.test(digit)) {
      const newBuffer = inputBuffer + digit
      setInputBuffer(newBuffer)

      // Auto-navigate when 3 digits are entered
      if (newBuffer.length === 3) {
        const pageNumber = parseInt(newBuffer, 10)
        setTimeout(() => {
          goToPage(pageNumber)
        }, 300) // Small delay for visual feedback
      }
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
    setInputBuffer('')
  }

  const clearBuffer = () => {
    setInputBuffer('')
  }

  return (
    <TeletextContext.Provider
      value={{
        currentPage,
        inputBuffer,
        addDigit,
        goToPage,
        clearBuffer,
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
