import { useState, useEffect } from 'react'

export default function FlightStatusPage() {
  const [blink, setBlink] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => setBlink(b => !b), 500)
    return () => clearInterval(interval)
  }, [])

  const flights = [
    { flight: 'TK1923', dest: 'IST', time: '14:00', status: 'DELAYED', color: 'red', gate: 'A12' },
    { flight: 'BA456', dest: 'LHR', time: '15:30', status: 'ON TIME', color: 'green', gate: 'B7' },
    { flight: 'AF789', dest: 'CDG', time: '16:15', status: 'BOARDING', color: 'yellow', gate: 'C3' },
    { flight: 'LH234', dest: 'FRA', time: '17:00', status: 'ON TIME', color: 'green', gate: 'A5' },
    { flight: 'EK567', dest: 'DXB', time: '18:45', status: 'CANCELLED', color: 'red', gate: '--' },
  ]

  return (
    <div className="teletext-page">
      <div className="teletext-title-banner bg-green">
        <span className="double-height text-black">P404 FLIGHT STATUS</span>
      </div>
      <div className="px-3 py-2 bg-black border-b border-green">
        <p className="text-green text-base animate-pulse">✈️ LIVE DEPARTURES • JFK AIRPORT</p>
      </div>
      <div className="px-2 mt-3">
        <div className="bg-yellow text-black font-bold text-sm p-1 grid grid-cols-12 gap-1">
          <span className="col-span-3">FLIGHT</span>
          <span className="col-span-2">DEST</span>
          <span className="col-span-2">TIME</span>
          <span className="col-span-2">GATE</span>
          <span className="col-span-3">STATUS</span>
        </div>
        {flights.map((f, i) => (
          <div key={i} className={`text-sm p-1 grid grid-cols-12 gap-1 border-b border-green/30 ${i % 2 === 0 ? 'bg-black/50' : 'bg-green/5'}`}>
            <span className="col-span-3 text-cyan font-bold">{f.flight}</span>
            <span className="col-span-2 text-white">{f.dest}</span>
            <span className="col-span-2 text-white">{f.time}</span>
            <span className="col-span-2 text-yellow">{f.gate}</span>
            <span className={`col-span-3 text-${f.color} font-bold ${f.color === 'red' && blink ? 'animate-pulse' : ''}`}>
              {f.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-3 mt-3">
        <div className="border border-red p-2 bg-red/10">
          <p className="text-red text-base font-bold">⚠️ DELAYS:</p>
          <p className="text-white text-sm">Weather conditions causing 30min average delay</p>
        </div>
      </div>
      <div className="teletext-bottom-banner bg-green">
        <span className="text-black">FLIGHT STATUS - UPDATED EVERY 2 MINUTES</span>
      </div>
    </div>
  )
}
