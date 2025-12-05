import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { NFTService } from '../../services/NFTService'

interface NFT {
  id: number
  name: string
  collection: string
  price: number
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
  ascii: string
}

export default function DropZone() {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    loadNFTs()
  }, [])

  const loadNFTs = async () => {
    try {
      setLoading(true)
      const data = await NFTService.getTrendingNFTs()
      const nftsWithAscii = data.map(nft => ({
        ...nft,
        ascii: NFTService.generateNFTAscii(nft.rarity)
      }))
      setNfts(nftsWithAscii)
    } catch (error) {
      console.error('Failed to load NFTs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(prev => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  const nextNFT = () => {
    setCurrentIndex((prev) => (prev + 1) % nfts.length)
  }

  const prevNFT = () => {
    setCurrentIndex((prev) => (prev - 1 + nfts.length) % nfts.length)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'LEGENDARY': return '#FFD700'
      case 'EPIC': return '#FF00FF'
      case 'RARE': return '#00FFFF'
      default: return '#FFFFFF'
    }
  }

  if (loading || nfts.length === 0) {
    return (
      <TeletextPage 
        title="DROP ZONE" 
        subtitle="NFT Marketplace • Digital Collectibles"
        footer="Loading NFT data..."
        zone={703}
      >
        <div style={{ textAlign: 'center', padding: '2rem', color: '#00FFFF' }}>
          <div style={{ fontSize: 'clamp(14px, 2.5vmin, 20px)' }}>
            LOADING NFTs...
          </div>
        </div>
      </TeletextPage>
    )
  }

  const current = nfts[currentIndex]

  return (
    <TeletextPage 
      title="DROP ZONE" 
      subtitle="NFT Marketplace • Digital Collectibles"
      footer="← → Navigate • Blockchain verified"
      zone={703}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <button
            onClick={prevNFT}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#00FFFF',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2vmin, 16px)',
              fontWeight: 'bold',
              fontFamily: 'VT323, monospace'
            }}
          >
            ← PREV
          </button>
          <div style={{ color: getRarityColor(current.rarity), fontSize: 'clamp(12px, 2vmin, 16px)', fontWeight: 'bold' }}>
            {blink ? '◆' : '◇'} {current.rarity} {blink ? '◆' : '◇'}
          </div>
          <button
            onClick={nextNFT}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#00FFFF',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 2vmin, 16px)',
              fontWeight: 'bold',
              fontFamily: 'VT323, monospace'
            }}
          >
            NEXT →
          </button>
        </div>

        {/* NFT Display */}
        <div style={{
          border: `2px solid ${getRarityColor(current.rarity)}`,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          {/* ASCII Art */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <pre style={{
              color: getRarityColor(current.rarity),
              fontSize: 'clamp(12px, 2vmin, 16px)',
              lineHeight: '1',
              fontFamily: 'VT323, monospace',
              margin: 0
            }}>
              {current.ascii}
            </pre>
          </div>

          {/* NFT Info */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(14px, 2.5vmin, 20px)', fontWeight: 'bold' }}>
              {current.name}
            </div>
            <div style={{ color: '#00FFFF', fontSize: 'clamp(12px, 2vmin, 16px)' }}>
              {current.collection}
            </div>
          </div>

          {/* Price */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ color: '#FFFF00', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              FLOOR PRICE
            </div>
            <div style={{ color: '#00FF00', fontSize: 'clamp(20px, 3vmin, 28px)', fontWeight: 'bold' }}>
              {current.price} ETH
            </div>
            <div style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
              ≈ ${(current.price * 2000).toFixed(0)} USD
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              onClick={loadNFTs}
              style={{
                backgroundColor: '#00FFFF',
                color: '#000000',
                padding: '0.75rem 1.5rem',
                fontSize: 'clamp(12px, 2vmin, 16px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                textTransform: 'uppercase'
              }}
            >
              🔄 REFRESH
            </button>
            <button
              style={{
                backgroundColor: '#00FF00',
                color: '#000000',
                padding: '0.75rem 1.5rem',
                fontSize: 'clamp(12px, 2vmin, 16px)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'VT323, monospace',
                textTransform: 'uppercase'
              }}
            >
              🛒 BUY
            </button>
          </div>
        </div>

        {/* Market Stats */}
        <div style={{ border: '2px solid #666666', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ color: '#FFFF00', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem' }}>
            MARKET STATS:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Volume 24h:</span>
              <span style={{ color: '#00FF00' }}>125 ETH</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Owners:</span>
              <span style={{ color: '#00FFFF' }}>2,847</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Total Supply:</span>
              <span style={{ color: '#FFFFFF' }}>10,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>Listed:</span>
              <span style={{ color: '#FFFF00' }}>342</span>
            </div>
          </div>
        </div>

        {/* Rarity Distribution */}
        <div style={{ border: '2px solid #666666', padding: '0.5rem', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>
          <div style={{ color: '#FFFF00', marginBottom: '0.5rem' }}>RARITY:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFFFFF' }}>COMMON:</span>
              <span style={{ color: '#FFFFFF' }}>60%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#00FFFF' }}>RARE:</span>
              <span style={{ color: '#00FFFF' }}>25%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FF00FF' }}>EPIC:</span>
              <span style={{ color: '#FF00FF' }}>12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#FFD700' }}>LEGENDARY:</span>
              <span style={{ color: '#FFD700' }}>3%</span>
            </div>
          </div>
        </div>

      </div>
    </TeletextPage>
  )
}
