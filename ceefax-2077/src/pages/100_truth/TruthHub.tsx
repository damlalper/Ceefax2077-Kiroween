import TeletextGrid from '../../components/TeletextGrid'

export default function TruthHub() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-4">
          <h1 className="text-blue-400 text-2xl double-height">THE TRUTH</h1>
          <p className="text-cyan-300">News & Facts Intelligence</p>
        </div>

        <div className="space-y-2">
          <div className="border border-blue-400 p-2">
            <div className="text-yellow-300">101 → GLOBAL WIRE</div>
            <div className="text-white text-sm">AI-Summarized World News</div>
          </div>

          <div className="border border-blue-400 p-2">
            <div className="text-yellow-300">103 → LIE DETECTOR</div>
            <div className="text-white text-sm">Detect Manipulation & Bias</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Enter page number to navigate</p>
        </div>
      </div>
    </TeletextGrid>
  )
}
