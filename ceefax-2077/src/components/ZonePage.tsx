interface ZonePageProps {
  zoneNumber: number
  zoneName: string
  zoneDescription: string
  color: string
  items: Array<{ page: number; title: string; description: string }>
}

export default function ZonePage({ zoneNumber, zoneName, zoneDescription, color, items }: ZonePageProps) {
  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: color }}>
        <span className="double-height text-black">{zoneNumber} {zoneName}</span>
      </div>

      {/* Description */}
      <div className="px-3 py-2 bg-black border-b" style={{ borderColor: color }}>
        <p className="text-white text-lg">
          {zoneDescription}
        </p>
      </div>

      {/* Content List */}
      <div className="px-4 mt-3">
        <p className="text-white text-xl font-bold border-b-2 border-white pb-1 mb-3">
          AVAILABLE PAGES:
        </p>
        
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.page} className="border p-3 bg-black/50" style={{ borderColor: color }}>
              <p className="text-lg font-bold" style={{ color }}>
                ▸ PAGE {item.page}: {item.title}
              </p>
              <p className="text-white text-base mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="px-4 mt-4">
        <div className="border-2 p-3 text-center" style={{ borderColor: color, backgroundColor: `${color}20` }}>
          <p className="text-white text-lg font-bold">
            🚧 CONTENT COMING SOON 🚧
          </p>
          <p className="text-white text-base mt-1">
            These pages are under development
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 mt-3">
        <p className="text-white text-base text-center">
          Press 100 to return to main index
        </p>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: color }}>
        <span className="text-black">{zoneName} - ZONE {zoneNumber}</span>
      </div>
    </div>
  )
}
