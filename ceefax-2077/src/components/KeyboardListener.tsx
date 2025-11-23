import { useEffect } from 'react'
import { useTeletext } from '../context/TeletextContext'

export default function KeyboardListener() {
  const { addDigit, clearBuffer } = useTeletext()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key

      // Handle numeric keys (0-9)
      if (/^[0-9]$/.test(key)) {
        event.preventDefault()
        addDigit(key)
      }

      // Handle backspace to clear buffer
      if (key === 'Backspace') {
        event.preventDefault()
        clearBuffer()
      }

      // Handle Escape to clear buffer
      if (key === 'Escape') {
        event.preventDefault()
        clearBuffer()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [addDigit, clearBuffer])

  return null // This component doesn't render anything
}
