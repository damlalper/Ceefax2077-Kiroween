/**
 * MemoryVault - Page 105
 * "THE MEMORY VAULT" - Contextual Memory AI via MCP
 * AI assistant that remembers user interactions
 */

import { useState, useEffect, useRef } from 'react';
import TeletextPage from '../../components/TeletextPage';
import MemoryAgent, { type ConversationMessage, type MemoryEntry } from '../../mcp/MemoryAgent';

export default function MemoryVault() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [recentMemories, setRecentMemories] = useState<MemoryEntry[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load initial data
    setConversation(MemoryAgent.getConversation());
    setRecentMemories(MemoryAgent.getRecentMemories(5));
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question;
    setQuestion('');
    setLoading(true);

    try {
      await MemoryAgent.ask(userQuestion);
      
      // Update conversation
      setConversation(MemoryAgent.getConversation());
      
      // Update recent memories
      setRecentMemories(MemoryAgent.getRecentMemories(5));
    } catch (error) {
      console.error('Failed to get answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearMemories = () => {
    if (confirm('CLEAR ALL MEMORIES? THIS CANNOT BE UNDONE.')) {
      MemoryAgent.clearMemories();
      setConversation([]);
      setRecentMemories([]);
    }
  };

  const renderMessage = (msg: ConversationMessage, index: number) => {
    const isUser = msg.role === 'user';
    const hasRecall = msg.usedMemories && msg.usedMemories.length > 0;

    return (
      <div
        key={index}
        style={{
          marginBottom: '0.5rem',
          paddingLeft: isUser ? '0' : '0.5rem',
          borderLeft: isUser ? 'none' : '2px solid #00FFFF'
        }}
      >
        <div style={{
          color: isUser ? '#FFFF00' : '#00FFFF',
          fontSize: '0.7em',
          marginBottom: '0.125rem',
          fontWeight: 'bold'
        }}>
          {isUser ? '> YOU:' : '> VAULT:'}
          {hasRecall && (
            <span style={{ color: '#FFFF00', marginLeft: '0.5rem' }}>
              [RECALL ACTIVE]
            </span>
          )}
        </div>
        <div style={{
          color: '#FFFFFF',
          fontSize: '0.7em',
          lineHeight: '1.3'
        }}>
          {msg.content}
        </div>
      </div>
    );
  };

  return (
    <TeletextPage
      title="MEMORY VAULT"
      subtitle="> AI WITH CONTEXTUAL MEMORY"
      footer="MCP MEMORY AGENT • ASK ANYTHING"
      zone={105}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Chat Area */}
        <div style={{
          border: '2px solid #0066CC',
          backgroundColor: '#000000',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          minHeight: '9rem',
          maxHeight: '9rem',
          overflow: 'auto'
        }}>
          {conversation.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#666666' }}>
              <div style={{ fontSize: '2em', marginBottom: '0.5rem' }}>🧠</div>
              <div>I REMEMBER EVERYTHING</div>
              <div style={{ fontSize: '0.7em', marginTop: '0.5rem' }}>
                ASK ME ABOUT YOUR ACTIVITY
              </div>
            </div>
          ) : (
            <>
              {conversation.slice(-6).map((msg, i) => renderMessage(msg, i))}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div style={{ marginBottom: '0.5rem' }}>
          <div style={{ color: '#0066CC', fontSize: '0.8em', marginBottom: '0.25rem' }}>
            YOUR QUESTION:
          </div>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="What did I do in Zone 200?"
              style={{
                flex: 1,
                backgroundColor: '#000000',
                border: '1px solid #0066CC',
                color: '#FFFF00',
                padding: '0.25rem 0.5rem',
                fontFamily: "'VT323', monospace",
                fontSize: '0.8em'
              }}
              disabled={loading}
            />
            <button
              onClick={handleAsk}
              disabled={loading || !question.trim()}
              style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: loading ? '#666666' : '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '0.8em'
              }}
            >
              {loading ? 'THINK...' : 'ASK'}
            </button>
          </div>
        </div>

        {/* Recent Memories */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          fontSize: '0.65em'
        }}>
          <div style={{ color: '#0066CC', marginBottom: '0.25rem', fontWeight: 'bold' }}>
            RECENT MEMORIES ({recentMemories.length}):
          </div>
          {recentMemories.slice(0, 3).map((mem, i) => (
            <div key={i} style={{ color: '#666666', marginBottom: '0.125rem' }}>
              • {mem.content.substring(0, 35)}...
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '0.5rem',
          fontSize: '0.7em'
        }}>
          <button
            onClick={handleClearMemories}
            style={{
              flex: 1,
              padding: '0.25rem',
              backgroundColor: '#CC0000',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            CLEAR MEMORIES
          </button>
          <button
            onClick={() => setRecentMemories(MemoryAgent.getRecentMemories(5))}
            style={{
              flex: 1,
              padding: '0.25rem',
              backgroundColor: '#666666',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            REFRESH
          </button>
        </div>

        {/* Info */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          fontSize: '0.7em',
          color: '#666666'
        }}>
          <div style={{ color: '#0066CC', marginBottom: '0.25rem' }}>🧠 MEMORY VAULT:</div>
          <div>• REMEMBERS YOUR ACTIVITY</div>
          <div>• CONTEXT-AWARE ANSWERS</div>
          <div>• YELLOW = RECALL ACTIVE</div>
          <div>• PERSISTENT ACROSS SESSIONS</div>
        </div>

      </div>
    </TeletextPage>
  );
}
