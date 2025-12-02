import { useState } from 'react'
import TeletextGrid from '../../components/TeletextGrid'
import { SocialService, type GossipPost } from '../../services/SocialService'

const getInitialPosts = (): GossipPost[] => {
  const now = Date.now();
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
    {
      id: 3,
      originalText: 'got a new job',
      headline: '💼 CORPORATE GIRLIE ERA ACTIVATED - BESTIE SECURED THE BAG NO CAP 💰✨',
      timestamp: new Date(now - 3600000),
      trustVotes: 67,
      capVotes: 3,
      category: 'PERSONAL_W',
    },
  ];
};

export default function TheBlast() {
  const [posts, setPosts] = useState<GossipPost[]>(getInitialPosts)

  const [newPost, setNewPost] = useState('')
  const [showTransform, setShowTransform] = useState(false)
  const [transformedHeadline, setTransformedHeadline] = useState('')

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
    <TeletextGrid>
      <div className="teletext-content">
        <div className="text-center mb-3">
          <h1 className="text-pink-400 text-xl">THE BLAST</h1>
          <p className="text-cyan-300 text-sm">Anonymous Gossip Feed • Gen Z Drama HQ</p>
        </div>

        {/* Gossip Girl Commentary */}
        <div className="border border-pink-400 bg-pink-900 bg-opacity-20 p-2 mb-3">
          <div className="text-pink-400 text-xs text-center font-bold">
            💅 GOSSIP GIRL AI SAYS 💅
          </div>
          <div className="text-white text-xs text-center mt-1">
            BESTIE DROP THE TEA ☕ I'LL MAKE IT ICONIC FR FR 💀✨
          </div>
        </div>

        {/* Input Box */}
        <div className="border border-pink-400 p-2 mb-3">
          <textarea
            className="w-full bg-black text-cyan-300 border border-gray-600 p-2 font-mono text-xs"
            rows={2}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Type your boring story... I'll make it DRAMATIC 💀"
            maxLength={120}
          />
          <button
            onClick={submitPost}
            disabled={!newPost.trim()}
            className={`w-full py-1 mt-1 text-sm font-bold ${
              newPost.trim()
                ? 'bg-pink-600 text-white hover:bg-pink-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            BLAST IT 🚨
          </button>
        </div>

        {/* Transformation Animation */}
        {showTransform && (
          <div className="border border-yellow-400 bg-yellow-900 bg-opacity-30 p-3 mb-3 animate-pulse">
            <div className="text-yellow-300 text-xs text-center mb-2">
              ✨ TRANSFORMING YOUR BORING POST... ✨
            </div>
            <div className="text-white text-xs text-center">
              {transformedHeadline}
            </div>
            <div className="text-cyan-300 text-xs text-center mt-2">
              NOW THAT'S TEA BESTIE 💅
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} className="border border-pink-400 p-2 bg-black">
              {/* Category Badge */}
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs ${getCategoryColor(post.category)}`}>
                  [{post.category}]
                </span>
                <span className="text-gray-400 text-xs">{getTimeAgo(post.timestamp)}</span>
              </div>

              {/* Headline */}
              <div className="text-white text-xs mb-2 leading-tight">
                {post.headline}
              </div>

              {/* Original Text (small) */}
              <div className="text-gray-500 text-xs italic mb-2">
                Original: "{post.originalText}"
              </div>

              {/* Voting Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => vote(post.id, 'trust')}
                  className="flex-1 bg-green-600 text-white py-1 text-xs hover:bg-green-700 font-bold"
                >
                  ✓ TRUST ({post.trustVotes})
                </button>
                <button
                  onClick={() => vote(post.id, 'cap')}
                  className="flex-1 bg-red-600 text-white py-1 text-xs hover:bg-red-700 font-bold"
                >
                  ✗ CAP ({post.capVotes})
                </button>
              </div>

              {/* Vote Status */}
              {post.trustVotes + post.capVotes > 0 && (
                <div className="mt-1 text-xs text-center">
                  {post.trustVotes > post.capVotes * 2 ? (
                    <span className="text-green-400">🔥 VERIFIED TEA FR FR</span>
                  ) : post.capVotes > post.trustVotes * 2 ? (
                    <span className="text-red-400">💀 EXPOSED AS CAP</span>
                  ) : (
                    <span className="text-yellow-400">⚖️ JURY IS OUT</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Commentary */}
        <div className="mt-3 text-center">
          <p className="text-gray-400 text-xs">
            XOXO, Gossip Girl AI 💋 • Vote TRUST or CAP
          </p>
        </div>
      </div>
    </TeletextGrid>
  )
}
