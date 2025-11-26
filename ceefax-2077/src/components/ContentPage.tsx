interface ContentItem {
  title: string
  value: string
  highlight?: boolean
}

interface ContentPageProps {
  pageNumber: number
  title: string
  subtitle: string
  color: string
  content: ContentItem[]
  footer?: string
}

export default function ContentPage({ pageNumber, title, subtitle, color, content, footer }: ContentPageProps) {
  return (
    <div className="teletext-page">
      {/* Title Banner */}
      <div className="teletext-title-banner" style={{ backgroundColor: color }}>
        <span className="double-height text-black">P{pageNumber}</span>
        <span className="ml-4 text-black">{title}</span>
      </div>

      {/* Subtitle */}
      <div className="px-3 py-2 bg-black border-b" style={{ borderColor: color }}>
        <p className="text-white text-base">
          {subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="px-4 mt-3 space-y-3">
        {content.map((item, index) => (
          <div key={index} className="border p-3 bg-black/50" style={{ borderColor: item.highlight ? color : '#666' }}>
            <p className="text-base font-bold" style={{ color: item.highlight ? color : '#fff' }}>
              {item.title}
            </p>
            <p className="text-white text-base mt-1 whitespace-pre-line">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div className="px-4 mt-3">
          <p className="text-white/70 text-sm text-center">
            {footer}
          </p>
        </div>
      )}

      {/* Bottom Banner */}
      <div className="teletext-bottom-banner" style={{ backgroundColor: color }}>
        <span className="text-black">PAGE {pageNumber} - {title}</span>
      </div>
    </div>
  )
}
