import { useState, useEffect } from 'react'
import TeletextGrid from '../../components/TeletextGrid'

export default function SOSBeacon() {
  const [isActive, setIsActive] = useState(false)
  const [strobe, setStrobe] = useState(false)

  useEffect(() => {
    if (isActive) {
      const strobeInterval = setInterval(() => {
        setStrobe(prev => !prev)
      }, 300) // Fast strobe

      return () => clearInterval(strobeInterval)
    } else {
      setStrobe(false)
    }
  }, [isActive])

  return (
    <TeletextGrid>
      <div className={`teletext-content ${isActive && strobe ? 'bg-white' : 'bg-black'}`}>
        <div className="text-center mb-3">
          <h1 className={`text-xl ${isActive && strobe ? 'text-black' : 'text-red-400'}`}>
            SOS BEACON
          </h1>
          <p className={`text-sm ${isActive && strobe ? 'text-black' : 'text-cyan-300'}`}>
            Emergency Strobe Light • Visual Distress Signal
          </p>
        </div>

        {/* Activation Button */}
        <div className="border border-red-400 p-4 mb-3 text-center">
          <div className="text-6xl mb-3">🚨</div>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-4 text-2xl font-bold ${
              isActive 
                ? 'bg-gray-600 text-white hover:bg-gray-700' 
                : 'bg-red-600 text-white hover:bg-red-700 animate-pulse'
            }`}
          >
            {isActive ? 'STOP BEACON' : 'ACTIVATE SOS'}
          </button>
          <div className={`text-xs mt-3 ${isActive && strobe ? 'text-black' : 'text-gray-400'}`}>
            {isActive ? 'Beacon active - visible to others nearby' : 'Press to activate emergency beacon'}
          </div>
        </div>

        {/* SOS Display (Double Height) */}
        {isActive && (
          <div className={`border p-6 mb-3 text-center ${
            strobe ? 'border-black bg-white' : 'border-white bg-black'
          }`}>
            <div className={`text-8xl font-bold double-height ${
              strobe ? 'text-black' : 'text-white'
            }`}>
              SOS
            </div>
            <div className={`text-2xl font-bold mt-4 ${
              strobe ? 'text-black' : 'text-white'
            }`}>
              EMERGENCY
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        <div className={`border p-3 mb-3 ${
          isActive && strobe 
            ? 'border-black bg-white' 
            : 'border-red-400 bg-red-900 bg-opacity-30'
        }`}>
          <div className={`text-sm font-bold mb-3 text-center ${
            isActive && strobe ? 'text-black' : 'text-red-400'
          }`}>
            🚨 EMERGENCY CONTACTS 🚨
          </div>
          <div className="space-y-2 text-sm">
            <div className={`flex justify-between ${isActive && strobe ? 'text-black' : 'text-white'}`}>
              <span>🚓 Police:</span>
              <span className="font-bold">911</span>
            </div>
            <div className={`flex justify-between ${isActive && strobe ? 'text-black' : 'text-white'}`}>
              <span>🚑 Ambulance:</span>
              <span className="font-bold">911</span>
            </div>
            <div className={`flex justify-between ${isActive && strobe ? 'text-black' : 'text-white'}`}>
              <span>🚒 Fire:</span>
              <span className="font-bold">911</span>
            </div>
            <div className={`flex justify-between ${isActive && strobe ? 'text-black' : 'text-white'}`}>
              <span>☎️ Crisis Hotline:</span>
              <span className="font-bold">988</span>
            </div>
            <div className={`flex justify-between ${isActive && strobe ? 'text-black' : 'text-white'}`}>
              <span>🆘 Poison Control:</span>
              <span className="font-bold">1-800-222-1222</span>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className={`border p-2 mb-3 ${
          isActive && strobe ? 'border-black' : 'border-yellow-400'
        }`}>
          <div className={`text-xs mb-2 ${isActive && strobe ? 'text-black' : 'text-yellow-300'}`}>
            📋 YOUR EMERGENCY INFO (EDIT):
          </div>
          <input
            type="text"
            className={`w-full p-1 text-xs mb-1 ${
              isActive && strobe 
                ? 'bg-white text-black border-black' 
                : 'bg-black text-white border-gray-600'
            } border`}
            placeholder="Full Name"
          />
          <input
            type="text"
            className={`w-full p-1 text-xs mb-1 ${
              isActive && strobe 
                ? 'bg-white text-black border-black' 
                : 'bg-black text-white border-gray-600'
            } border`}
            placeholder="Blood Type (e.g., O+)"
          />
          <input
            type="text"
            className={`w-full p-1 text-xs mb-1 ${
              isActive && strobe 
                ? 'bg-white text-black border-black' 
                : 'bg-black text-white border-gray-600'
            } border`}
            placeholder="Allergies"
          />
          <input
            type="text"
            className={`w-full p-1 text-xs ${
              isActive && strobe 
                ? 'bg-white text-black border-black' 
                : 'bg-black text-white border-gray-600'
            } border`}
            placeholder="Emergency Contact & Phone"
          />
        </div>

        {/* Instructions */}
        <div className={`border p-2 ${
          isActive && strobe ? 'border-black' : 'border-gray-600'
        }`}>
          <div className={`text-xs mb-1 ${isActive && strobe ? 'text-black' : 'text-yellow-300'}`}>
            💡 HOW TO USE:
          </div>
          <div className={`text-xs space-y-1 ${isActive && strobe ? 'text-black' : 'text-white'}`}>
            <div>• Activate beacon to signal distress</div>
            <div>• Strobe light visible to others nearby</div>
            <div>• Call emergency services immediately</div>
            <div>• Share your location if possible</div>
            <div>• Stay calm and wait for help</div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className={`text-xs ${isActive && strobe ? 'text-black' : 'text-gray-400'}`}>
            {isActive ? 'BEACON ACTIVE • HELP IS ON THE WAY' : 'Emergency visual beacon • For serious emergencies only'}
          </p>
        </div>
      </div>
    </TeletextGrid>
  )
}
