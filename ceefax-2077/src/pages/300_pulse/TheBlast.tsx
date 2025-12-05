import { useState, useEffect } from 'react'
import TeletextPage from '../../components/TeletextPage'
import { SocialService, type GossipPost } from '../../services/SocialService'
import { RedditService } from '../../services/RedditService'

export default function TheBlast() {
  const [posts, setPosts] = useState<GossipPost[]>([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [showTransform, setShowTransform] = useState(false)
  const [transformedHeadline, setTransformedHeadline] = useState('')

  // Fetch real Reddit posts on mount
  useEffect(() => {
    const fetchRedditPosts = async () => {
      try {
        const redditPosts = await RedditService.getDramaPosts(10)
        
        // Transform Reddit posts to gossip format
        const gossipPosts: GossipPost[] = redditPosts.map((post, index) => ({
          id: Date.now() + index,
          originalText: post.title,
          headline: SocialService.generateGossipHeadline(post.title),
          timestamp: new Date(post.created_utc * 1000),
          trustVotes: Math.floor(post.score / 10),
          capVotes: Math.floor(Math.random() * 5),
          category: SocialService.categorizePost(post.title),
        }))

        setPosts(gossipPosts)
      } catch (error) {
        console.error('Failed to fetch Reddit posts:', error)
        // Fallback to sample posts
        setPosts(getFallbackPosts())
      } finally {
        setLoading(false)
      }
    }

    fetchRedditPosts()
  }, [])

  // Fallback posts if Reddit API fails
  const getFallbackPosts = (): GossipPost[] => {
    const now = Date.now()
    return [
      {
        id: 1,
        originalText: 'saw my ex at the store',
        headline: '🚨 BREAKING: TRAGIC EX ENCOUNTER AT LOCAL STORE - BESTIE YOU GOOD??? 💀',
        timestamp: new Date(now - 120000),
        trustVotes: 23,
        capVotes: 5,
        category: 'RELATIONSHIP',
      },
      {
        id: 2,
        originalText: 'someone unfollowed me',
        headline: 'EXPOSED: FAKE FRIEND UNFOLLOWED - THE BETRAYAL IS REAL BESTIE 😭🚨',
        timestamp: new Date(now - 900000),
        trustVotes: 45,
        capVotes: 12,
        category: 'SOCIAL',
      },
    ]
  }

  const submitPost = () => {
    if (newPost.trim()) {
      const headline = SocialService.generateGossipHeadline(newPost)
      const category = SocialService.categorizePost(newPost)
      
      setTransformedHeadline(headline)
      setShowTransform(true)
      
      setTimeout(() => {
        const gossipPost: GossipPost = {
          id: Date.now(),
          originalText: newPost,
          headline,
          timestamp: new Date(),
          trustVotes: 0,
          capVotes: 0,
          category,
        }
        
        setPosts([gossipPost, ...posts])
        setNewPost('')
        setShowTransform(false)
      }, 2000)
    }
  }

  const vote = (postId: number, voteType: 'trust' | 'cap') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          trustVotes: voteType === 'trust' ? post.trustVotes + 1 : post.trustVotes,
          capVotes: voteType === 'cap' ? post.capVotes + 1 : post.capVotes,
        }
      }
      return post
    }))
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date().getTime();
    const seconds = Math.floor((now - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  const getCategoryColor = (category: GossipPost['category']) => {
    switch (category) {
      case 'RELATIONSHIP': return 'text-pink-400'
      case 'SOCIAL': return 'text-cyan-400'
      case 'PERSONAL_L': return 'text-red-400'
      case 'PERSONAL_W': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <TeletextPage 
      title="THE BLAST" 
      subtitle="Anonymous Gossip Feed • Gen Z Drama HQ"
      footer="XOXO, Gossip Girl AI 💋 • Vote TRUST or CAP"
      zone={301}
    >
      {/* Gossip Girl Commentary */}
      <div style={{ border: '2px solid #FF1493', backgroundColor: 'rgba(255, 20, 147, 0.2)', padding: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ color: '#FF1493', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', fontWeight: 'bold' }}>
          💅 GOSSIP GIRL AI SAYS 💅
        </div>
        <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginTop: '0.25rem' }}>
          BESTIE DROP THE TEA ☕ I'LL MAKE IT ICONIC FR FR 💀✨
        </div>
      </div>

      {/* Input Box */}
      <div style={{ border: '2px solid #FF1493', padding: '0.5rem', marginBottom: '1rem' }}>
        <textarea
          style={{
            width: '100%',
            backgroundColor: '#000000',
            color: '#00FFFF',
            border: '2px solid #666666',
            padding: '0.5rem',
            fontFamily: 'monospace',
            fontSize: 'clamp(10px, 1.5vmin, 14px)'
          }}
          rows={2}
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Type your boring story... I'll make it DRAMATIC 💀"
          maxLength={120}
        />
        <button
          onClick={submitPost}
          disabled={!newPost.trim()}
          style={{
            width: '100%',
            padding: '0.25rem',
            marginTop: '0.25rem',
            fontSize: 'clamp(12px, 2vmin, 16px)',
            fontWeight: 'bold',
            backgroundColor: newPost.trim() ? '#FF1493' : '#666666',
            color: newPost.trim() ? '#FFFFFF' : '#888888',
            border: 'none',
            cursor: newPost.trim() ? 'pointer' : 'not-allowed'
          }}
        >
          BLAST IT 🚨
        </button>
      </div>

      {/* Transformation Animation */}
      {showTransform && (
        <div style={{ border: '2px solid #FFD700', backgroundColor: 'rgba(255, 215, 0, 0.3)', padding: '1rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>
          <div style={{ color: '#FFD700', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginBottom: '0.5rem' }}>
            ✨ TRANSFORMING YOUR BORING POST... ✨
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center' }}>
            {transformedHeadline}
          </div>
          <div style={{ color: '#00FFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center', marginTop: '0.5rem' }}>
            NOW THAT'S TEA BESTIE 💅
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', color: '#00FFFF', padding: '2rem' }}>
          <div style={{ fontSize: 'clamp(12px, 2vmin, 16px)' }}>
            ⏳ FETCHING FRESH TEA FROM REDDIT...
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '16rem', overflowY: 'auto' }}>
        {!loading && posts.map((post) => (
          <div key={post.id} style={{ border: '2px solid #FF1493', padding: '0.5rem', backgroundColor: '#000000' }}>
            {/* Category Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', color: getCategoryColor(post.category) }}>
                [{post.category}]
              </span>
              <span style={{ color: '#888888', fontSize: 'clamp(10px, 1.5vmin, 14px)' }}>{getTimeAgo(post.timestamp)}</span>
            </div>

            {/* Headline - Using > bullet for Zone 300 */}
            <div style={{ color: '#FFFFFF', fontSize: 'clamp(10px, 1.5vmin, 14px)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
              <span style={{ color: '#00FFFF' }}>{'> '}</span>{post.headline}
            </div>

            {/* Original Text (small) */}
            <div style={{ color: '#666666', fontSize: 'clamp(9px, 1.3vmin, 12px)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
              Original: "{post.originalText}"
            </div>

            {/* Voting Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => vote(post.id, 'trust')}
                style={{
                  flex: 1,
                  backgroundColor: '#00CC00',
                  color: '#FFFFFF',
                  padding: '0.25rem',
                  fontSize: 'clamp(10px, 1.5vmin, 14px)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ✓ TRUST ({post.trustVotes})
              </button>
              <button
                onClick={() => vote(post.id, 'cap')}
                style={{
                  flex: 1,
                  backgroundColor: '#CC0000',
                  color: '#FFFFFF',
                  padding: '0.25rem',
                  fontSize: 'clamp(10px, 1.5vmin, 14px)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ✗ CAP ({post.capVotes})
              </button>
            </div>

            {/* Vote Status */}
            {post.trustVotes + post.capVotes > 0 && (
              <div style={{ marginTop: '0.25rem', fontSize: 'clamp(10px, 1.5vmin, 14px)', textAlign: 'center' }}>
                {post.trustVotes > post.capVotes * 2 ? (
                  <span style={{ color: '#00FF00' }}>🔥 VERIFIED TEA FR FR</span>
                ) : post.capVotes > post.trustVotes * 2 ? (
                  <span style={{ color: '#FF0000' }}>💀 EXPOSED AS CAP</span>
                ) : (
                  <span style={{ color: '#FFD700' }}>⚖️ JURY IS OUT</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

    </TeletextPage>
  )
}
