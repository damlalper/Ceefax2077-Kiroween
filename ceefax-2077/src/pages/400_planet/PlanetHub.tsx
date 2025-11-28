import TeletextGrid from '../../components/TeletextGrid'

export default function PlanetHub() {
  return (
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-4">
          <h1 className="text-green-400 text-2xl double-height">THE PLANET</h1>
          <p className="text-cyan-300">Environmental Intelligence</p>
        </div>

        <div className="space-y-2">
          <div className="border border-green-400 p-2">
            <div className="text-green-400">401 → ECO SENSE</div>
            <div className="text-cyan-300 text-sm">Atmosphere Monitor</div>
          </div>

          <div className="border border-green-400 p-2">
            <div className="text-green-400">403 → PLAN B</div>
            <div className="text-cyan-300 text-sm">Terraform Monitor • 3D Planets</div>
          </div>

          <div className="border border-yellow-400 p-2 bg-yellow-900 bg-opacity-20">
            <div className="text-yellow-400">405 → SHELTER SEEKER</div>
            <div className="text-white text-sm">Apocalypse Mode • ASCII Map</div>
          </div>
        </div>

        <div className="mt-6 border border-green-400 p-3">
          <div className="text-green-400 text-sm mb-2">EARTH STATUS:</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-white">🌡️ Global Temp</span>
              <span className="text-yellow-400">+1.2°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">🌊 Sea Level</span>
              <span className="text-red-400">+8.2cm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">🌳 Forest Cover</span>
              <span className="text-red-400">-12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">💨 Air Quality</span>
              <span className="text-green-400">GOOD</span>
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
