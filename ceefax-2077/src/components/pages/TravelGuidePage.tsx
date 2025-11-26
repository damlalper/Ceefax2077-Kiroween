export default function TravelGuidePage() {
  const destinations = [
    { name: 'TOKYO', rating: '★★★★★', price: '$$$', season: 'Spring', highlight: 'Cherry Blossoms' },
    { name: 'PARIS', rating: '★★★★★', price: '$$$$', season: 'Summer', highlight: 'Eiffel Tower' },
    { name: 'BALI', rating: '★★★★☆', price: '$$', season: 'Year-round', highlight: 'Beaches & Temples' },
    { name: 'ICELAND', rating: '★★★★☆', price: '$$$', season: 'Winter', highlight: 'Northern Lights' },
  ]

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P403 TRAVEL GUIDE</span>
      </div>
      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base">✈️ TOP DESTINATIONS & TRAVEL TIPS</p>
      </div>
      <div className="px-3 mt-3">
        <p className="text-yellow text-xl font-bold mb-2">🌍 FEATURED DESTINATIONS:</p>
        <div className="space-y-2">
          {destinations.map((dest, i) => (
            <div key={i} className="border-2 border-cyan p-3 bg-cyan/5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white text-xl font-bold">{dest.name}</p>
                  <p className="text-yellow text-lg">{dest.rating}</p>
                  <p className="text-cyan text-base mt-1">Best: {dest.season}</p>
                </div>
                <div className="text-right">
                  <p className="text-green text-2xl font-bold">{dest.price}</p>
                  <p className="text-white text-sm mt-1">{dest.highlight}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 mt-3">
        <div className="border border-yellow p-3 bg-black/50">
          <p className="text-yellow text-base font-bold mb-2">💡 TRAVEL TIPS:</p>
          <div className="text-white text-sm space-y-1">
            <p>• Book flights 6-8 weeks in advance</p>
            <p>• Check visa requirements early</p>
            <p>• Get travel insurance</p>
            <p>• Learn basic local phrases</p>
          </div>
        </div>
      </div>
      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">TRAVEL GUIDE - EXPLORE THE WORLD</span>
      </div>
    </div>
  )
}
