import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { WaybackService, type ArchivedSite, type WaybackSnapshot } from '../../services/WaybackService'

type ViewMode = 'menu' | 'search' | 'results' | 'loading'

export default function TimeMachine() {
  const [viewMode, setViewMode] = useState<ViewMode>('menu')
  const [url, setUrl] = useState('')
  const [archivedSite, setArchivedSite] = useState<ArchivedSite | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const searchArchive = async (targetUrl: string) => {
    if (!targetUrl.trim()) return

    setViewMode('loading')
    
    const data = await WaybackService.searchArchive(targetUrl)
    setArchivedSite(data)
    
    if (data.totalSnapshots > 0) {
      setViewMode('results')
    } else {
      setViewMode('search')
    }
  }

  const loadPopularSite = (site: { name: string; url: string; year: number }) => {
    setUrl(site.url)
    searchArchive(site.url)
  }

  const openArchive = (snapshot: WaybackSnapshot) => {
    window.open(snapshot.archiveUrl, '_blank')
  }

  const popularSites = WaybackService.getPopularSites()

  if (viewMode === 'loading') {
    return (
      <TeletextPage 
        title="TIME MACHINE" 
        subtitle="Searching Internet Archive..."
        footer="Please wait..."
        zone={802}
      >
        <div style={{ textAlign: 'center', padding: '2rem', color: '#00FFFF' }}>
          <div style={{ fontSize: 'clamp(16px, 3vmin, 24px)', marginBottom: '1rem' }}>
            {blink ? '⟳' : ' '} ACCESSING WAYBACK MACHINE {blink ? '⟳' : ' '}
          </div>
          <div style={{ fontSize: 'clamp(12px, 2vmin, 16px)' }}>
            Searching archive.org database...
          </div>
        </div>
      </TeletextPage>
    )
  }

  if (viewMode === 'results' && archivedSite) {
    const yearGroups = WaybackService.groupByYear(archivedSite.snapshots)
    const years = Array.from(yearGroups.keys()).sort((a, b) => a - b)
    const snapshots90s = WaybackService.get90sSnapshots(archivedSite)

    return (
      <TeletextPage 
        title="ARCHIVE FOUND" 
        subtitle={`${archivedSite.url} • ${archivedSite.totalSnapshots} snapshots`}
        footer="Click snapshot to view • Press [BACK] to search again"
        zone={802}
      >
        <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.3' }}>
          
          {/* Stats */}
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            border: '2px solid #00FFFF',
            backgroundColor: 'rgba(0, 255, 255, 0.1)'
          }}>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              📊 ARCHIVE STATISTICS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: '#FFFFFF' }}>
              <div>Total Snapshots: <span style={{ color: '#00FF00' }}>{archivedSite.totalSnapshots}</span></div>
              <div>Years Covered: <span style={{ color: '#00FF00' }}>{years.length}</span></div>
              <div>Oldest: <span style={{ color: '#FFD700' }}>{archivedSite.oldestSnapshot?.year}</span></div>
              <div>Newest: <span style={{ color: '#FFD700' }}>{archivedSite.newestSnapshot?.year}</span></div>
            </div>
          </div>

          {/* 1990s Snapshots (Featured) */}
          {snapshots90s.length > 0 && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              border: '2px solid #FFD700',
              backgroundColor: 'rgba(255, 215, 0, 0.1)'
            }}>
              <div style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                🕰️ 1990s SNAPSHOTS ({snapshots90s.length})
              </div>
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {snapshots90s.slice(0, 10).map((snapshot, idx) => (
                  <div
                    key={idx}
                    onClick={() => openArchive(snapshot)}
                    style={{
                      padding: '0.5rem',
                      marginBottom: '0.25rem',
                      border: '1px solid #FFD700',
                      backgroundColor: 'rgba(255, 215, 0, 0.05)',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontSize: 'clamp(10px, 1.5vmin, 14px)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.05)'}
                  >
                    📅 {WaybackService.formatDate(snapshot.timestamp)} → <span style={{ color: '#00FFFF' }}>VIEW</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse by Year */}
          <div style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            border: '2px solid #00FF00',
            backgroundColor: 'rgba(0, 255, 0, 0.05)'
          }}>
            <div style={{ color: '#00FF00', fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              📆 BROWSE BY YEAR
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
              gap: '0.5rem'
            }}>
              {years.map((year) => {
                const count = yearGroups.get(year)?.length || 0
                return (
                  <div
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    style={{
                      padding: '0.5rem',
                      textAlign: 'center',
                      border: selectedYear === year ? '2px solid #00FF00' : '1px solid #00FF00',
                      backgroundColor: selectedYear === year ? 'rgba(0, 255, 0, 0.2)' : 'rgba(0, 255, 0, 0.05)',
                      color: '#00FF00',
                      cursor: 'pointer',
                      fontSize: 'clamp(10px, 1.5vmin, 14px)',
                      fontWeight: 'bold'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 255, 0, 0.2)'}
                    onMouseLeave={(e) => {
                      if (selectedYear !== year) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 255, 0, 0.05)'
                      }
                    }}
                  >
                    {year}
                    <div style={{ fontSize: 'clamp(8px, 1.2vmin, 11px)', color: '#FFFFFF' }}>
                      {count} snap{count !== 1 ? 's' : ''}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Selected Year Snapshots */}
          {selectedYear && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              border: '2px solid #FF00FF',
              backgroundColor: 'rgba(255, 0, 255, 0.05)'
            }}>
              <div style={{ color: '#FF00FF', fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                📸 {selectedYear} SNAPSHOTS ({yearGroups.get(selectedYear)?.length || 0})
              </div>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {yearGroups.get(selectedYear)?.slice(0, 20).map((snapshot, idx) => (
                  <div
                    key={idx}
                    onClick={() => openArchive(snapshot)}
                    style={{
                      padding: '0.5rem',
                      marginBottom: '0.25rem',
                      border: '1px solid #FF00FF',
                      backgroundColor: 'rgba(255, 0, 255, 0.05)',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontSize: 'clamp(10px, 1.5vmin, 14px)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 255, 0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 255, 0.05)'}
                  >
                    🔗 {WaybackService.formatDate(snapshot.timestamp)} → <span style={{ color: '#00FFFF' }}>OPEN ARCHIVE</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                setViewMode('menu')
                setArchivedSite(null)
                setSelectedYear(null)
              }}
              style={{
                backgroundColor: '#00FFFF',
                color: '#000000',
                padding: '0.5rem 1.5rem',
                fontSize: 'clamp(10px, 1.5vmin, 14px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace'
              }}
            >
              ← NEW SEARCH
            </button>
          </div>
        </div>
      </TeletextPage>
    )
  }

  // Main menu / Search
  return (
    <TeletextPage 
      title="TIME MACHINE" 
      subtitle="Wayback Machine • Internet Archive"
      footer="Enter URL to explore archived versions"
      zone={802}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.3' }}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          padding: '1rem',
          border: '2px solid #00FFFF',
          backgroundColor: 'rgba(0, 255, 255, 0.1)'
        }}>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)', fontWeight: 'bold' }}>
            {blink ? '🕰️' : '  '} WAYBACK MACHINE {blink ? '🕰️' : '  '}
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginTop: '0.5rem' }}>
            Browse archived websites from the past
          </div>
        </div>

        {/* Search Box */}
        <form onSubmit={(e) => { e.preventDefault(); searchArchive(url); }} style={{ marginBottom: '1.5rem' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            🔍 ENTER WEBSITE URL:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
              style={{
                flex: 1,
                background: '#000',
                color: '#00FF00',
                border: '2px solid #00FF00',
                padding: '0.75rem',
                fontFamily: 'VT323, monospace',
                fontSize: 'clamp(12px, 2vmin, 16px)'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#00FF00',
                color: '#000',
                border: 'none',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                fontSize: 'clamp(12px, 2vmin, 16px)',
                fontWeight: 'bold'
              }}
            >
              SEARCH
            </button>
          </div>
        </form>

        {/* Popular Sites */}
        <div style={{
          padding: '1rem',
          border: '2px solid #FFD700',
          backgroundColor: 'rgba(255, 215, 0, 0.05)',
          marginBottom: '1rem'
        }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold', marginBottom: '0.75rem' }}>
            🌟 POPULAR 90s SITES:
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.5rem'
          }}>
            {popularSites.map((site, idx) => (
              <div
                key={idx}
                onClick={() => loadPopularSite(site)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #FFD700',
                  backgroundColor: 'rgba(255, 215, 0, 0.1)',
                  color: '#FFD700',
                  cursor: 'pointer',
                  textAlign: 'center',
                  fontSize: 'clamp(10px, 1.5vmin, 14px)',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)'}
              >
                {site.name}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{
          padding: '0.75rem',
          border: '1px solid #666',
          fontSize: 'clamp(9px, 1.3vmin, 12px)',
          color: '#888'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>HOW IT WORKS:</div>
          <div>• Enter any website URL (e.g., google.com)</div>
          <div>• We search Internet Archive's database</div>
          <div>• Browse snapshots from different years</div>
          <div>• Click to view archived version</div>
          <div>• All data from archive.org (free API)</div>
        </div>

      </div>
    </TeletextPage>
  )
}
