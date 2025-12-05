import { useState } from 'react'
import TeletextPage from '../../components/TeletextPage'

export default function CodeExorcist() {
  const [inputCode, setInputCode] = useState('')
  const [refactoredCode, setRefactoredCode] = useState('')

  const exorciseCode = () => {
    // Simulated AI refactoring with spooky comments
    const refactored = `// 👻 EXORCISED BY AI - The demons have been cast out
// 🕯️ This code was cursed with technical debt
// 💀 Original sins: nested callbacks, no error handling

async function fetchUserData(userId) {
  try {
    // 🔮 Summoning data from the void
    const response = await fetch(\`/api/users/\${userId}\`)
    
    if (!response.ok) {
      // ⚰️ The API has returned from the dead with an error
      throw new Error('Failed to fetch user')
    }
    
    // 🌙 Parsing the mystical JSON
    const data = await response.json()
    return data
    
  } catch (error) {
    // 🦇 Catching errors before they haunt production
    console.error('User fetch failed:', error)
    return null
  }
}

// ✨ The code is now pure and maintainable`

    setRefactoredCode(refactored)
  }

  return (
    <TeletextPage 
        title="CODE EXORCIST" 
        subtitle="AI Refactoring with Spooky Comments"
        footer="🕯️ Casting out code demons"
        zone={202}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ border: '2px solid #FFD700', padding: '0.5rem', backgroundColor: '#1a1a00' }}>
            <label style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)', display: 'block', marginBottom: '0.25rem' }}>
              PASTE LEGACY CODE:
            </label>
            <textarea
              rows={4}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="PASTE CURSED CODE HERE..."
            />
          </div>

          <div style={{ 
            textAlign: 'center', 
            padding: '0.5rem',
            backgroundColor: '#FFD700',
            color: '#000000',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 2.2vmin, 20px)',
            cursor: 'pointer'
          }}
          onClick={exorciseCode}
          >
            PRESS [ENTER] TO EXORCISE CODE
          </div>

          {refactoredCode && (
            <div style={{ border: '2px solid #00FF00', padding: '0.5rem' }}>
              <div style={{ color: '#00FF00', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>✨ EXORCISED CODE:</div>
              <pre style={{ 
                color: '#FFFFFF', 
                fontSize: 'clamp(10px, 1.5vmin, 14px)', 
                fontFamily: 'monospace', 
                overflowX: 'auto', 
                backgroundColor: '#1a1a1a', 
                padding: '0.5rem',
                margin: 0
              }}>
                {refactoredCode}
              </pre>
            </div>
          )}
        </div>
      </TeletextPage>
  )
}
