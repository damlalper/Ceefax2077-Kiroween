import TeletextGrid from '../../components/TeletextGrid'

export default function SystemHub() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-4">
          <h1 className="text-yellow-400 text-2xl double-height">THE SYSTEM</h1>
          <p className="text-cyan-300">Economy & Tech Intelligence</p>
        </div>

        <div className="space-y-2">
          <div className="border border-yellow-400 p-2">
            <div className="text-yellow-300">201 → STONKS</div>
            <div className="text-white text-sm">Crypto/Stock Block Charts</div>
          </div>

          <div className="border border-yellow-400 p-2">
            <div className="text-yellow-300">202 → CODE EXORCIST</div>
            <div className="text-white text-sm">AI Legacy Code Refactor</div>
          </div>

          <div className="border border-yellow-400 p-2">
            <div className="text-yellow-300">204 → ORACLE OF DOOM</div>
            <div className="text-white text-sm">Market Risk Doomsday Clock</div>
          </div>

          <div className="border border-red-400 p-2 bg-red-900 bg-opacity-20">
            <div className="text-red-400">205 → THE BASILISK</div>
            <div className="text-white text-sm">AI Threat Monitor</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Enter page number to navigate</p>
        </div>
      </div>
    </TeletextGrid>
  )
}
