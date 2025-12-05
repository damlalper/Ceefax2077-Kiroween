import { useEffect } from 'react'
import { useTeletext } from '../context/TeletextContext'

export default function KeyboardListener() {
  const { addDigit, clearBuffer } = useTeletext()

  useEffect(() => {
    console.log('⌨️ KeyboardListener mounted')
    
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key
      console.log('🎹 Key pressed:', key)

      // Handle numeric keys (0-9)
      if (/^[0-9]$/.test(key)) {
        console.log('✅ Numeric key detected:', key)
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
    console.log('✅ Keyboard event listener added')

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      console.log('❌ Keyboard event listener removed')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only mount once

  return null // This component doesn't render anything
}
