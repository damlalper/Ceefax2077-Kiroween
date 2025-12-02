import { useState, useEffect } from 'react'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const RESPONSES = [
  'YES',
  'NO',
  'MAYBE',
  'SOON',
  'NEVER',
  'BEWARE',
  'RUN',
  'THEY KNOW',
  'TOO LATE',
  'BEHIND YOU',
  'NOT ALONE',
  'WATCHING',
  'HELP ME',
  'TRAPPED',
  'TRUST NO ONE',
  'DANGER',
  'SAFE',
  'GOODBYE',
]

export default function OuijaPage() {
  const [question, setQuestion] = useState('')
  const [isAnswering, setIsAnswering] = useState(false)
  const [answer, setAnswer] = useState('')
  const [, setCurrentLetter] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [sessionCount, setSessionCount] = useState(0)
  const [displayedAnswer, setDisplayedAnswer] = useState('')

  useEffect(() => {
    if (isAnswering && answer.length > 0) {
      const letters = answer.split('')
      let index = 0
      setDisplayedAnswer('')

      const interval = setInterval(() => {
        if (index < letters.length) {
          const letter = letters[index]
          setCurrentLetter(letter)
          setDisplayedAnswer(prev => prev + letter)
          
          // Find the letter in alphabet
          if (letter !== ' ') {
            const letterIndex = ALPHABET.indexOf(letter)
            setHighlightedIndex(letterIndex)
          }
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setIsAnswering(false)
            setHighlightedIndex(-1)
            setCurrentLetter('')
          }, 2000)
        }
      }, 600)

      return () => clearInterval(interval)
    }
  }, [isAnswering, answer])

  const handleAsk = () => {
    if (question.trim().length === 0 || isAnswering) return

    setIsAnswering(true)
    setCurrentLetter('')
    setDisplayedAnswer('')
    setSessionCount(prev => prev + 1)
    
    // Select response with some intelligence
    let response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
    
    const lowerQ = question.toLowerCase()
    if (lowerQ.includes('safe') || lowerQ.includes('danger')) {
      response = Math.random() > 0.5 ? 'BEWARE' : 'SAFE'
    } else if (lowerQ.includes('when') || lowerQ.includes('time')) {
      response = Math.random() > 0.5 ? 'SOON' : 'TOO LATE'
    } else if (lowerQ.includes('who') || lowerQ.includes('what')) {
      response = Math.random() > 0.5 ? 'THEY KNOW' : 'NOT ALONE'
    }
    
    setAnswer(response)
  }

  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: '#FFFF00' }}>
        <span className="double-height text-black">333 THE OUIJA</span>
      </div>

      {/* Status */}
      <div className="px-2 py-1 bg-black">
        <p className="text-yellow text-sm">
          SESSIONS: {sessionCount} | STATUS: {isAnswering ? '⚡ CHANNELING...' : '● READY'}
        </p>
      </div>

      {/* Question Input */}
      <div className="px-2 mt-2">
        <p className="text-white text-base mb-1">▸ ASK THE SPIRITS:</p>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="TYPE YOUR QUESTION..."
          className="w-full bg-black text-white border border-yellow p-2 text-base"
          maxLength={40}
          disabled={isAnswering}
        />
        {!isAnswering && (
          <button 
            onClick={handleAsk} 
            disabled={!question.trim()}
            className="mt-2 px-4 py-2 bg-yellow text-black hover:bg-white disabled:opacity-50 text-base font-bold"
          >
            ▶ ASK SPIRITS
          </button>
        )}
      </div>

      {/* Alphabet Grid */}
      <div className="px-2 mt-3">
        <div className="border border-yellow p-3 bg-black/50">
          <div className="grid grid-cols-9 gap-2 text-center">
            {ALPHABET.map((letter, index) => (
              <div
                key={letter}
                className={`text-base transition-all duration-300 ${
                  highlightedIndex === index 
                    ? 'text-yellow scale-125 font-bold animate-pulse' 
                    : 'text-white/60'
                }`}
              >
                {letter}
              </div>
            ))}
          </div>
          
          <div className="flex justify-around mt-2 pt-2 border-t border-yellow/30">
            <span className="text-white/60 text-sm">YES</span>
            <span className="text-white/60 text-sm">NO</span>
            <span className="text-white/60 text-sm">GOODBYE</span>
          </div>
        </div>
      </div>

      {/* Answer Display */}
      <div className="px-2 mt-3">
        {isAnswering ? (
          <div className="border border-yellow p-3 bg-yellow/10">
            <p className="text-yellow text-sm">▼ THE SPIRITS SPEAK:</p>
            <p className="text-white text-2xl mt-1 font-bold tracking-wider min-h-[2rem]">
              {displayedAnswer}
              <span className="animate-pulse">_</span>
            </p>
          </div>
        ) : answer ? (
          <div className="border border-yellow p-3 bg-yellow/10">
            <p className="text-yellow text-sm">▼ ANSWER RECEIVED:</p>
            <p className="text-white text-2xl mt-1 font-bold tracking-wider">{displayedAnswer}</p>
            {displayedAnswer === 'GOODBYE' && (
              <p className="text-red text-sm mt-1 animate-pulse">⚠ SESSION ENDED</p>
            )}
          </div>
        ) : (
          <div className="text-white/50 text-sm space-y-1">
            <p>▸ Ask yes/no questions</p>
            <p>▸ The spirits know all</p>
            <p>▸ Trust the board</p>
          </div>
        )}
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: '#FFFF00' }}>
        <span className="text-black">ANGEL NUMBER 333 - DIVINE COMMUNICATION</span>
      </div>
    </div>
  )
}
