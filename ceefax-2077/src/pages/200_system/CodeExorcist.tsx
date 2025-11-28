import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { useAutoHealer } from '../../hooks/useAutoHealer'
import HealerNotifications from '../../components/HealerNotifications'

export default function CodeExorcist() {
  const [inputCode, setInputCode] = useState('')
  const [refactoredCode, setRefactoredCode] = useState('')
  const { notifications, autoRefactorText } = useAutoHealer()

  // Auto-clean dirty code as user types
  useEffect(() => {
    if (inputCode.trim()) {
      autoRefactorText(inputCode, (cleaned) => {
        setInputCode(cleaned);
      });
    }
  }, [inputCode, autoRefactorText])

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
    <>
      <HealerNotifications notifications={notifications} />
      <TeletextGrid>
        <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-yellow-400 text-xl">CODE EXORCIST</h1>
          <p className="text-cyan-300 text-sm">AI Refactoring with Spooky Comments</p>
        </div>

        <div className="space-y-3">
          <div className="border border-yellow-400 p-2">
            <label className="text-yellow-300 text-sm">Paste Legacy Code:</label>
            <textarea
              className="w-full bg-black text-white border border-gray-600 p-2 mt-1 font-mono text-xs"
              rows={4}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your cursed legacy code here..."
            />
          </div>

          <button
            onClick={exorciseCode}
            className="w-full bg-yellow-600 text-black py-2 hover:bg-yellow-700 font-bold"
          >
            🕯️ EXORCISE CODE 🕯️
          </button>

          {refactoredCode && (
            <div className="border border-green-400 p-2">
              <div className="text-green-400 text-sm mb-2">✨ EXORCISED CODE:</div>
              <pre className="text-white text-xs font-mono overflow-x-auto bg-gray-900 p-2">
                {refactoredCode}
              </pre>
            </div>
          )}
        </div>
      </div>
    </TeletextGrid>
    </>
  )
}
