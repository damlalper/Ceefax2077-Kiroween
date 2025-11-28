import TeletextGrid from '../../components/TeletextGrid'

export default function ShieldHub() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-4">
          <h1 className="text-red-400 text-2xl double-height">SHIELD</h1>
          <p className="text-cyan-300">Security & Rights Intelligence</p>
        </div>

        <div className="space-y-2">
          <div className="border border-red-400 p-2">
            <div className="text-yellow-300">501 → CRIME WATCH</div>
            <div className="text-white text-sm">Location-based Safety Score</div>
          </div>

          <div className="border border-red-400 p-2">
            <div className="text-yellow-300">502 → SCAM BUSTER</div>
            <div className="text-white text-sm">AI Fraud Detection</div>
          </div>

          <div className="border border-red-400 p-2">
            <div className="text-yellow-300">503 → POCKET LAWYER</div>
            <div className="text-white text-sm">Legal Rights Simplified</div>
          </div>

          <div className="border border-red-400 p-2">
            <div className="text-yellow-300">504 → SOS BEACON</div>
            <div className="text-white text-sm">Emergency Strobe & Info</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Enter page number to navigate</p>
        </div>
      </div>
    </TeletextGrid>
  )
}
