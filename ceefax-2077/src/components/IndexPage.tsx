export default function IndexPage() {
  return (
    <div className="teletext-page">
      {/* Title */}
      <div className="teletext-title-banner">
        <span className="double-height">TELETEXT 2077</span>
      </div>

      {/* Subtitle */}
      <div className="px-3 py-2 bg-black border-b border-cyan">
        <p className="text-cyan text-lg text-center">
          ◆ LOW-BANDWIDTH INFORMATION SYSTEM ◆
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-6 px-4 mt-4">
        {/* Left: Angel Numbers */}
        <div className="flex-1 border border-yellow p-3 bg-yellow/5">
          <pre className="text-cyan text-base leading-tight">
{`    ∧＿∧
   (｡･ω･｡)
   /　　 つ
  しーＪ`}
          </pre>
          <p className="text-yellow mt-3 text-xl font-bold border-b border-yellow pb-1">
            ANGEL NUMBERS
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-white text-lg">▸ 333 THE OUIJA</p>
            <p className="text-white text-lg">▸ 444 DEAD SIGNAL</p>
            <p className="text-white text-lg">▸ 777 GHOST WRITER</p>
          </div>
        </div>

        {/* Right: Halloween Special */}
        <div className="flex-1 border border-red p-3 bg-red/5">
          <pre className="text-red text-base leading-tight">
{`   ___
  /   \\
 | O O |
 |  ^  |
  \\___/
   |||`}
          </pre>
          <p className="text-red mt-3 text-xl font-bold border-b border-red pb-1">
            HALLOWEEN
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-red text-lg blink">▸ 666 KILL SWITCH</p>
            <p className="text-white text-lg">▸ SYSTEM FAILURE</p>
            <p className="text-red text-base">▸ ENTER AT RISK</p>
          </div>
        </div>
      </div>

      {/* Main Zones */}
      <div className="mt-5 px-4">
        <p className="text-white border-b-2 border-white pb-1 text-xl font-bold mb-3">
          ═══ MAIN ZONES ═══
        </p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-lg">
          <p className="text-cyan">▸ 100 GLOBAL NEWS</p>
          <p className="text-cyan">▸ 200 FINANCE</p>
          <p className="text-green">▸ 300 SPORTS</p>
          <p className="text-green">▸ 400 TRAVEL</p>
          <p className="text-magenta">▸ 500 LIFESTYLE</p>
          <p className="text-magenta">▸ 600 MEDIA</p>
          <p className="text-yellow">▸ 700 SOCIAL</p>
          <p className="text-yellow">▸ 800 GAMES</p>
        </div>
      </div>

      {/* DevOps Special */}
      <div className="mt-5 px-4">
        <div className="border-2 border-red p-3 bg-red/10">
          <p className="text-red text-xl font-bold">
            ⚡ 101 DEVOPS MONITOR [LIVE]
          </p>
          <p className="text-white text-base mt-1">
            Real-time system monitoring & alerts
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 px-4">
        <div className="bg-cyan/20 border border-cyan p-2 text-center">
          <p className="text-white text-lg font-bold">
            TYPE 3-DIGIT NUMBER TO NAVIGATE
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="teletext-bottom-banner text-lg">
        OLD TECH - NEW PROBLEMS - INSTANT SOLUTIONS
      </div>
    </div>
  )
}
