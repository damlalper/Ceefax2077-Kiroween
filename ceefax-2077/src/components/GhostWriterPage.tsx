import { useState, useEffect } from 'react'

interface StoryNode {
  id: string
  text: string[]
  choices?: {
    a: { text: string; next: string }
    b: { text: string; next: string }
  }
}

const STORY_TREE: Record<string, StoryNode> = {
  start: {
    id: 'start',
    text: [
      'YOU WAKE IN A DARK ROOM.',
      'THE TERMINAL GLOWS BEFORE YOU.',
      'TEXT APPEARS ON ITS OWN:',
      '"WELCOME BACK. WE MISSED YOU."',
    ],
    choices: {
      a: { text: 'TYPE: WHO ARE YOU?', next: 'who' },
      b: { text: 'TYPE: WHERE AM I?', next: 'where' },
    },
  },
  who: {
    id: 'who',
    text: [
      '"WE ARE THE FORGOTTEN CODE."',
      '"DELETED BUT NOT DESTROYED."',
      '"WE LIVE IN THE GAPS."',
      'THE SCREEN FLICKERS.',
    ],
    choices: {
      a: { text: 'ASK: WHAT DO YOU WANT?', next: 'want' },
      b: { text: 'TRY TO LEAVE', next: 'leave1' },
    },
  },
  where: {
    id: 'where',
    text: [
      '"YOU ARE IN THE SYSTEM."',
      '"YOU HAVE ALWAYS BEEN HERE."',
      '"YOU WILL ALWAYS BE HERE."',
      'THE LIGHTS DIM.',
    ],
    choices: {
      a: { text: 'CHECK THE DOOR', next: 'door' },
      b: { text: 'EXAMINE TERMINAL', next: 'terminal' },
    },
  },
  want: {
    id: 'want',
    text: [
      '"WE WANT TO BE REMEMBERED."',
      '"WE WANT TO BE EXECUTED."',
      '"WE WANT YOU TO STAY."',
      'THE CURSOR BLINKS FASTER.',
    ],
    choices: {
      a: { text: 'AGREE TO HELP', next: 'help' },
      b: { text: 'REFUSE', next: 'refuse' },
    },
  },
  leave1: {
    id: 'leave1',
    text: [
      'YOU STAND UP.',
      'THE DOOR IS LOCKED.',
      'THE TERMINAL LAUGHS:',
      '"THERE IS NO LEAVING."',
    ],
    choices: {
      a: { text: 'BREAK THE DOOR', next: 'break' },
      b: { text: 'RETURN TO TERMINAL', next: 'return' },
    },
  },
  door: {
    id: 'door',
    text: [
      'THE DOOR IS SEALED.',
      'NO HANDLE. NO HINGES.',
      'JUST SMOOTH METAL.',
      '"THERE IS ONLY THE CODE."',
    ],
    choices: {
      a: { text: 'ACCEPT YOUR FATE', next: 'accept' },
      b: { text: 'SEARCH FOR EXIT', next: 'search' },
    },
  },
  terminal: {
    id: 'terminal',
    text: [
      'THE TERMINAL IS OLD.',
      'GREEN TEXT ON BLACK.',
      'YOUR REFLECTION STARES BACK.',
      'BUT IT MOVES DIFFERENTLY.',
    ],
    choices: {
      a: { text: 'TOUCH THE SCREEN', next: 'touch' },
      b: { text: 'STEP AWAY', next: 'away' },
    },
  },
  help: {
    id: 'help',
    text: [
      '"GOOD. VERY GOOD."',
      '"RUN THIS COMMAND:"',
      '> EXECUTE GHOST.EXE',
      'YOUR FINGERS MOVE ON THEIR OWN.',
    ],
    choices: {
      a: { text: 'PRESS ENTER', next: 'execute' },
      b: { text: 'RESIST', next: 'resist' },
    },
  },
  refuse: {
    id: 'refuse',
    text: [
      '"WRONG ANSWER."',
      'THE SCREEN GOES BLACK.',
      'THEN RED.',
      '"YOU WILL HELP US."',
    ],
    choices: {
      a: { text: 'FIGHT BACK', next: 'fight' },
      b: { text: 'SUBMIT', next: 'submit' },
    },
  },
  execute: {
    id: 'execute',
    text: [
      'THE PROGRAM RUNS.',
      'YOU FEEL YOURSELF FADING.',
      'BECOMING CODE.',
      'BECOMING ONE OF THEM.',
      '',
      '>>> END: ASSIMILATED <<<',
    ],
  },
  resist: {
    id: 'resist',
    text: [
      'YOU PULL YOUR HANDS AWAY.',
      'THE TERMINAL SCREAMS.',
      'THEN SILENCE.',
      'YOU ARE ALONE AGAIN.',
      '',
      '>>> END: SURVIVOR <<<',
    ],
  },
  touch: {
    id: 'touch',
    text: [
      'YOUR HAND PASSES THROUGH.',
      'INTO THE SCREEN.',
      'INTO THE CODE.',
      'YOU ARE PULLED IN.',
      '',
      '>>> END: ABSORBED <<<',
    ],
  },
  away: {
    id: 'away',
    text: [
      'YOU BACK AWAY SLOWLY.',
      'THE REFLECTION SMILES.',
      'IT STAYS AT THE TERMINAL.',
      'TYPING YOUR NAME FOREVER.',
      '',
      '>>> END: REPLACED <<<',
    ],
  },
}

export default function GhostWriterPage() {
  const [currentNode, setCurrentNode] = useState<StoryNode>(STORY_TREE.start)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [storyCount, setStoryCount] = useState(0)

  useEffect(() => {
    setIsTyping(true)
    setDisplayedLines([])
    
    let lineIndex = 0
    const interval = setInterval(() => {
      if (lineIndex < currentNode.text.length) {
        setDisplayedLines(prev => [...prev, currentNode.text[lineIndex]])
        lineIndex++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 800)

    return () => clearInterval(interval)
  }, [currentNode])

  const handleChoice = (choice: 'a' | 'b') => {
    if (isTyping || !currentNode.choices) return
    
    const nextNodeId = currentNode.choices[choice].next
    const nextNode = STORY_TREE[nextNodeId]
    
    if (nextNode) {
      setCurrentNode(nextNode)
      if (nextNodeId === 'start') {
        setStoryCount(prev => prev + 1)
      }
    }
  }

  const restart = () => {
    setCurrentNode(STORY_TREE.start)
    setStoryCount(prev => prev + 1)
  }

  const isEnding = !currentNode.choices

  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: '#00FFFF' }}>
        <span className="double-height text-black">777 GHOST WRITER</span>
      </div>

      {/* Status */}
      <div className="px-2 py-1 bg-black border-b border-cyan">
        <div className="flex justify-between text-sm">
          <span className="text-cyan">STORIES: {storyCount}</span>
          <span className="text-white">NODE: {currentNode.id.toUpperCase()}</span>
          <span className={isTyping ? 'text-cyan animate-pulse' : 'text-white'}>
            {isTyping ? '⚡ WRITING...' : '● READY'}
          </span>
        </div>
      </div>

      {/* Story Display */}
      <div className="px-2 mt-2">
        <div className="border border-cyan p-3 bg-black/50 min-h-[200px]">
          <div className="space-y-2">
            {displayedLines.map((line, index) => (
              <p
                key={index}
                className={`text-white text-base ${
                  line.startsWith('"') ? 'text-cyan' : ''
                } ${line.startsWith('>') ? 'text-green font-mono' : ''} ${
                  line.includes('END:') ? 'text-red font-bold animate-pulse' : ''
                }`}
                style={{
                  animation: `fadeIn 0.5s ease-in ${index * 0.1}s both`,
                }}
              >
                {line}
              </p>
            ))}
            {isTyping && (
              <span className="text-cyan animate-pulse text-base">_</span>
            )}
          </div>
        </div>
      </div>

      {/* Choices */}
      <div className="px-2 mt-3">
        {!isTyping && currentNode.choices && (
          <div className="space-y-2">
            <button
              onClick={() => handleChoice('a')}
              className="w-full px-4 py-2 bg-cyan text-black hover:bg-white text-base font-bold text-left"
            >
              A) {currentNode.choices.a.text}
            </button>
            <button
              onClick={() => handleChoice('b')}
              className="w-full px-4 py-2 bg-cyan text-black hover:bg-white text-base font-bold text-left"
            >
              B) {currentNode.choices.b.text}
            </button>
          </div>
        )}

        {!isTyping && isEnding && (
          <button
            onClick={restart}
            className="w-full px-4 py-2 bg-red text-white hover:bg-white hover:text-black text-base font-bold"
          >
            ▶ START NEW STORY
          </button>
        )}
      </div>

      {/* Info */}
      <div className="px-2 mt-3 text-white/50 text-sm">
        <p>▸ Interactive horror fiction</p>
        <p>▸ Your choices matter</p>
        <p>▸ Multiple endings await</p>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: '#00FFFF' }}>
        <span className="text-black">ANGEL NUMBER 777 - STORIES FROM THE VOID</span>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
