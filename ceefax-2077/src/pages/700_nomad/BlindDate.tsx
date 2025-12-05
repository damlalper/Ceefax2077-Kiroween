import { useState } from 'react'
import TeletextPage from '../../components/TeletextPage'

interface Profile {
  name: string
  age: number
  location: string
  interests: string[]
  bio: string
  compatibility: number
}

export default function BlindDate() {
  const [profiles] = useState<Profile[]>([
    {
      name: 'ALEX_2077',
      age: 28,
      location: 'Bali, Indonesia',
      interests: ['Coding', 'Surfing', 'Coffee'],
      bio: 'Full-stack dev seeking adventure partner',
      compatibility: 92
    },
    {
      name: 'MAYA_NOMAD',
      age: 26,
      location: 'Lisbon, Portugal',
      interests: ['Design', 'Travel', 'Photography'],
      bio: 'UI/UX designer exploring the world',
      compatibility: 88
    },
    {
      name: 'TECH_WANDERER',
      age: 30,
      location: 'Chiang Mai, Thailand',
      interests: ['Blockchain', 'Yoga', 'Cooking'],
      bio: 'Crypto enthusiast & wellness advocate',
      compatibility: 85
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<number[]>([])
  const [passed, setPassed] = useState<number[]>([])

  const current = profiles[currentIndex]

  const handleLike = () => {
    setLiked([...liked, currentIndex])
    nextProfile()
  }

  const handlePass = () => {
    setPassed([...passed, currentIndex])
    nextProfile()
  }

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const isFinished = currentIndex >= profiles.length

  return (
    <TeletextPage 
      title="BLIND DATE" 
      subtitle="AI Matchmaking • Digital Nomad Edition"
      footer="💚 Like • 💔 Pass • Find your travel partner"
      zone={702}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {!isFinished ? (
          <>
            {/* Profile Card */}
            <div style={{
              border: '2px solid #FF00FF',
              backgroundColor: 'rgba(255, 0, 255, 0.1)',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              {/* Compatibility Score */}
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div style={{ color: '#FF00FF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
                  COMPATIBILITY SCORE
                </div>
                <div style={{ 
                  color: current.compatibility >= 90 ? '#00FF00' : current.compatibility >= 80 ? '#FFFF00' : '#FF8800',
                  fontSize: 'clamp(24px, 4vmin, 36px)',
                  fontWeight: 'bold'
                }}>
                  {current.compatibility}%
                </div>
              </div>

              {/* Profile Info */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#FFFFFF', fontSize: 'clamp(16px, 2.5vmin, 22px)', fontWeight: 'bold', textAlign: 'center' }}>
                  {current.name}
                </div>
                <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)', textAlign: 'center' }}>
                  {current.age} • {current.location}
                </div>
              </div>

              {/* Interests */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ color: '#FFFF00', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
                  INTERESTS:
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {current.interests.map((interest, idx) => (
                    <span 
                      key={idx}
                      style={{
                        color: '#000000',
                        backgroundColor: '#00FFFF',
                        padding: '0.2rem 0.5rem',
                        fontSize: 'clamp(10px, 1.5vmin, 14px)'
                      }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <div style={{ color: '#FFFF00', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
                  BIO:
                </div>
                <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
                  {current.bio}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                onClick={handlePass}
                style={{
                  backgroundColor: '#FF0000',
                  color: '#FFFFFF',
                  padding: '1rem',
                  fontSize: 'clamp(12px, 2vmin, 16px)',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'VT323, monospace',
                  textTransform: 'uppercase'
                }}
              >
                💔 PASS
              </button>
              <button
                onClick={handleLike}
                style={{
                  backgroundColor: '#00FF00',
                  color: '#000000',
                  padding: '1rem',
                  fontSize: 'clamp(12px, 2vmin, 16px)',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'VT323, monospace',
                  textTransform: 'uppercase'
                }}
              >
                💚 LIKE
              </button>
            </div>

            {/* Progress */}
            <div style={{ marginTop: '1rem', textAlign: 'center', color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              Profile {currentIndex + 1} of {profiles.length}
            </div>
          </>
        ) : (
          /* Results */
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ color: '#00FF00', fontSize: 'clamp(16px, 2.5vmin, 22px)', marginBottom: '1rem' }}>
              ✓ MATCHING COMPLETE
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '2rem' }}>
              You liked {liked.length} profile{liked.length !== 1 ? 's' : ''}
            </div>
            {liked.length > 0 && (
              <div style={{ border: '2px solid #00FF00', padding: '1rem', marginBottom: '1rem' }}>
                <div style={{ color: '#00FF00', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem' }}>
                  YOUR MATCHES:
                </div>
                {liked.map((idx) => (
                  <div key={idx} style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.25rem' }}>
                    • {profiles[idx].name} ({profiles[idx].compatibility}%)
                  </div>
                ))}
              </div>
            )}
            <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              Connection requests sent!<br />
              Check your messages for replies.
            </div>
          </div>
        )}

      </div>
    </TeletextPage>
  )
}
