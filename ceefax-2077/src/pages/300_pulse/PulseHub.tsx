import TeletextGrid from '../../components/TeletextGrid'

export default function PulseHub() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-4">
          <h1 className="text-pink-400 text-2xl double-height">THE PULSE</h1>
          <p className="text-cyan-300">Society Intelligence</p>
        </div>

        <div className="space-y-2">
          <div className="border border-pink-400 p-2 bg-pink-900 bg-opacity-20">
            <div className="text-pink-400">301 → THE BLAST</div>
            <div className="text-cyan-300 text-sm">Gen Z Gossip Feed • Drama HQ</div>
          </div>

          <div className="border border-pink-400 p-2 bg-pink-900 bg-opacity-20">
            <div className="text-pink-400">304 → SOUL WEIGHT</div>
            <div className="text-cyan-300 text-sm">Username Sin Calculator</div>
          </div>
        </div>

        <div className="mt-4 border border-pink-400 bg-pink-900 bg-opacity-20 p-3">
          <div className="text-pink-400 text-xs text-center font-bold mb-2">
            💅 ZONE 300: THE PULSE 💅
          </div>
          <div className="text-white text-xs text-center">
            WHERE WE JUDGE EVERYONE AND EVERYTHING FR FR 💀
          </div>
        </div>

        <div className="mt-6 border border-pink-400 p-3">
          <div className="text-pink-400 text-sm mb-2">GLOBAL SENTIMENT:</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white">😊 Positive</span>
              <span className="text-green-400">42%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white">😐 Neutral</span>
              <span className="text-gray-400">31%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white">😠 Negative</span>
              <span className="text-red-400">27%</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Enter page number to navigate</p>
        </div>
      </div>
    </TeletextGrid>
  )
}
