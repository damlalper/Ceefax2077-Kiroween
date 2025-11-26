interface GenericContentPageProps {
  pageNumber: number
  title: string
  color: string
  zoneName: string
}

export default function GenericContentPage({ pageNumber, title, color, zoneName }: GenericContentPageProps) {
  // Generate some mock content based on page number
  const getContent = () => {
    const items = []
    for (let i = 0; i < 4; i++) {
      items.push({
        title: `${title} Item ${i + 1}`,
        value: `This is sample content for ${title}.\nPage ${pageNumber} in ${zoneName} zone.\nContent will be added soon.`
      })
    }
    return items
  }

  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: color }}>
        <span className="double-height text-black">P{pageNumber}</span>
        <span className="ml-4 text-black">{title}</span>
      </div>

      {/* Subtitle */}
      <div className="px-3 py-2 bg-black border-b" style={{ borderColor: color }}>
        <p className="text-white text-lg">
          {zoneName} - {title}
        </p>
      </div>

      {/* Content */}
      <div className="px-4 mt-4 space-y-3">
        {getContent().map((item, index) => (
          <div key={index} className="border p-3 bg-black/50" style={{ borderColor: index === 0 ? color : '#666' }}>
            <p className="text-lg font-bold" style={{ color: index === 0 ? color : '#fff' }}>
              ▸ {item.title}
            </p>
            <p className="text-white text-base mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="px-4 mt-4">
        <div className="border-2 p-3 text-center" style={{ borderColor: color }}>
          <p className="text-white text-lg">
            🚧 DETAILED CONTENT COMING SOON 🚧
          </p>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: color }}>
        <span className="text-black">PAGE {pageNumber} - {title.toUpperCase()}</span>
      </div>
    </div>
  )
}
