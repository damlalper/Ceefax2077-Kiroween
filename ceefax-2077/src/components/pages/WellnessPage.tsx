export default function WellnessPage() {
  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-magenta">
        <span className="double-height text-black">P501 WELLNESS</span>
      </div>
      <div className="px-3 py-2 bg-black border-b border-magenta">
        <p className="text-magenta text-base">💪 HEALTH & FITNESS TIPS</p>
      </div>
      <div className="px-3 mt-3">
        <p className="text-yellow text-xl font-bold mb-2">TODAY'S WORKOUT:</p>
        <div className="border-2 border-magenta p-3 bg-magenta/10">
          <p className="text-white text-lg font-bold">30-MIN FULL BODY</p>
          <div className="mt-2 space-y-1 text-base">
            <p className="text-cyan">• Warm-up: 5 min</p>
            <p className="text-cyan">• Push-ups: 3x15</p>
            <p className="text-cyan">• Squats: 3x20</p>
            <p className="text-cyan">• Plank: 3x60s</p>
            <p className="text-cyan">• Cool-down: 5 min</p>
          </div>
        </div>
      </div>
      <div className="px-3 mt-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-green p-2">
            <p className="text-green font-bold text-lg">SLEEP</p>
            <p className="text-white text-2xl">7-9h</p>
          </div>
          <div className="border border-cyan p-2">
            <p className="text-cyan font-bold text-lg">WATER</p>
            <p className="text-white text-2xl">2-3L</p>
          </div>
        </div>
      </div>
      <div className="teletext-bottom-banner bg-magenta">
        <span className="text-black">WELLNESS - DAILY HEALTH TIPS</span>
      </div>
    </div>
  )
}
