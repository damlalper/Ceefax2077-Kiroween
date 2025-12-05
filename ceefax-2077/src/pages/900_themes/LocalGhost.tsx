/**
 * LocalGhost - Page 905
 * "THE LOCAL GHOST" - Filesystem Access via MCP
 * Displays project structure and log files
 */

import { useState, useEffect } from 'react';
import TeletextPage from '../../components/TeletextPage';
import FileSystemAgent, { type FileNode, type LogEntry } from '../../mcp/FileSystemAgent';

export default function LocalGhost() {
  const [fileTree, setFileTree] = useState<FileNode | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'tree' | 'logs'>('tree');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tree, logEntries] = await Promise.all([
        FileSystemAgent.getFileTree(),
        FileSystemAgent.getRecentLogs(20)
      ]);
      setFileTree(tree);
      setLogs(logEntries);
    } catch (error) {
      console.error('Failed to load filesystem data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTreeView = () => {
    if (!fileTree) return null;
    
    const treeText = FileSystemAgent.generateTreeView(fileTree);
    const lines = treeText.split('\n').slice(0, 15); // Fit in grid
    
    return (
      <div style={{ fontSize: '0.7em', lineHeight: '1.2', fontFamily: "'Courier New', monospace" }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.includes('📁') ? '#00FFFF' : '#00FF00' }}>
            {line}
          </div>
        ))}
      </div>
    );
  };

  const renderLogsView = () => {
    return (
      <div style={{ fontSize: '0.7em', lineHeight: '1.2', fontFamily: "'Courier New', monospace" }}>
        {logs.slice(0, 15).map((log, i) => {
          const color = 
            log.level === 'ERROR' ? '#FF0000' :
            log.level === 'WARN' ? '#FFFF00' :
            '#00FF00';
          
          return (
            <div key={i} style={{ color, marginBottom: '0.125rem' }}>
              <span style={{ color: '#666666' }}>[{log.timestamp.substring(11, 19)}]</span>{' '}
              <span style={{ fontWeight: 'bold' }}>{log.level}</span>: {log.message.substring(0, 35)}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <TeletextPage
        title="LOCAL GHOST"
        subtitle="> LOADING FILESYSTEM..."
        footer="MCP FILESYSTEM AGENT"
        zone={905}
      >
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#00FFFF' }}>
          <div className="animate-pulse">👻 ACCESSING LOCAL FILES...</div>
        </div>
      </TeletextPage>
    );
  }

  return (
    <TeletextPage
      title="LOCAL GHOST"
      subtitle={view === 'tree' ? '> PROJECT STRUCTURE' : '> SYSTEM LOGS'}
      footer="MCP • PRESS [T]REE [L]OGS"
      zone={905}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* View Toggle */}
        <div style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '0.5rem'
        }}>
          <button
            onClick={() => setView('tree')}
            style={{
              flex: 1,
              padding: '0.25rem',
              backgroundColor: view === 'tree' ? '#00CCCC' : '#333333',
              color: view === 'tree' ? '#000000' : '#666666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9em'
            }}
          >
            FILE TREE
          </button>
          <button
            onClick={() => setView('logs')}
            style={{
              flex: 1,
              padding: '0.25rem',
              backgroundColor: view === 'logs' ? '#00CCCC' : '#333333',
              color: view === 'logs' ? '#000000' : '#666666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9em'
            }}
          >
            SYSTEM LOGS
          </button>
        </div>

        {/* Content Area */}
        <div style={{
          border: '2px solid #00FFFF',
          backgroundColor: '#000000',
          padding: '0.5rem',
          marginBottom: '0.5rem',
          minHeight: '12rem',
          maxHeight: '12rem',
          overflow: 'hidden'
        }}>
          {view === 'tree' ? renderTreeView() : renderLogsView()}
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.25rem',
          marginBottom: '0.5rem',
          fontSize: '0.7em',
          textAlign: 'center'
        }}>
          <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
            <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>FILES</div>
            <div style={{ color: '#FFFFFF' }}>42</div>
          </div>
          <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
            <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>DIRS</div>
            <div style={{ color: '#FFFFFF' }}>18</div>
          </div>
          <div style={{ border: '1px solid #666666', padding: '0.25rem' }}>
            <div style={{ color: '#00FFFF', fontWeight: 'bold' }}>SIZE</div>
            <div style={{ color: '#FFFFFF' }}>2.4MB</div>
          </div>
        </div>

        {/* Info */}
        <div style={{
          border: '1px solid #666666',
          padding: '0.5rem',
          fontSize: '0.7em',
          color: '#666666'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>👻 LOCAL GHOST:</div>
          <div>• MCP FILESYSTEM ACCESS</div>
          <div>• REAL-TIME LOG MONITORING</div>
          <div>• PROJECT STRUCTURE VIEW</div>
          <div>• BREAKING THE SANDBOX</div>
        </div>

      </div>
    </TeletextPage>
  );
}
