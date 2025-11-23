import { useEffect } from 'react'
import { useTeletext } from '../context/TeletextContext'

export default function SignalLostPage() {
  const { goToPage } = useTeletext()

  useEffect(() => {
    // Auto-return to home after 3 seconds
    const timer = setTimeout(() => {
      goToPage(100)
    }, 3000)

    return () => clearTimeout(timer)
  }, [goToPage])

  return (
    <div className="col-span-40 row-span-23 p-4 flex items-center justify-center">
      <div className="text-center">
        {/* Static Noise Effect */}
        <div className="mb-8">
          <pre className="text-teletext-white text-xs leading-tight">
{`
░░▒▒▓▓██▓▓▒▒░░░░▒▒▓▓██▓▓▒▒░░
▒▒▓▓██████▓▓▒▒▓▓██████▓▓▒▒
▓▓████████████████████▓▓
██████████████████████
▓▓████████████████████▓▓
▒▒▓▓██████▓▓▒▒▓▓██████▓▓▒▒
░░▒▒▓▓██▓▓▒▒░░░░▒▒▓▓██▓▓▒▒░░
`}
          </pre>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <p className="text-teletext-red text-3xl">SIGNAL LOST</p>
          <p className="text-teletext-yellow text-xl">PAGE NOT FOUND</p>
          
          <div className="mt-6 text-teletext-cyan">
            <p>THE REQUESTED PAGE DOES NOT EXIST</p>
            <p>OR HAS BEEN REMOVED FROM THE SYSTEM</p>
          </div>

          <div className="mt-8 text-teletext-white">
            <p className="animate-pulse">
              RETURNING TO INDEX IN 3 SECONDS...
            </p>
          </div>
        </div>

        {/* Static bars */}
        <div className="mt-8">
          <div className="h-2 bg-teletext-white mb-1"></div>
          <div className="h-2 bg-teletext-cyan mb-1"></div>
          <div className="h-2 bg-teletext-yellow mb-1"></div>
          <div className="h-2 bg-teletext-red"></div>
        </div>
      </div>
    </div>
  )
}
