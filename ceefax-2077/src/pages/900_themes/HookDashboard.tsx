/**
 * Hook Dashboard (Page 907)
 * Monitor and manage all 10 agent hooks
 */

import { useState } from 'react';
import TeletextPage from '../../components/TeletextPage';
import { useAgentHooks } from '../../hooks/useAgentHooks';

export default function HookDashboard() {
  const { hooks, logs, initialized, toggleHook } = useAgentHooks();
  const [showLogs, setShowLogs] = useState(false);

  if (!initialized) {
    return (
      <TeletextPage
        title="AGENT HOOKS"
        subtitle="> INITIALIZING..."
        zone={907}
      >
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#00FFFF' }}>
          <div className="animate-pulse">🤖 INIT_SEQ...</div>
        </div>
      </TeletextPage>
    );
  }

  const activeCount = hooks.filter(h => h.enabled).length;
  const recentLogs = logs.slice(-6).reverse();

  return (
    <TeletextPage
      title="AGENT HOOKS"
      subtitle={`> ${activeCount}/${hooks.length} ACTIVE • ${logs.length} EXEC`}
      footer="SYS > HOOK_MONITOR: OK"
      zone={907}
    >
      <div style={{ fontSize: 'clamp(10px, 1.5vmin, 14px)', lineHeight: '1.2' }}>
        
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0.5rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ border: '1px solid #00FF00', padding: '0.5rem', backgroundColor: '#001a00' }}>
            <div style={{ color: '#00FF00', fontSize: '1.5em', fontWeight: 'bold' }}>{activeCount}</div>
            <div style={{ color: '#666666', fontSize: '0.7em' }}>ACTIVE</div>
          </div>
          <div style={{ border: '1px solid #00FFFF', padding: '0.5rem', backgroundColor: '#001a1a' }}>
            <div style={{ color: '#00FFFF', fontSize: '1.5em', fontWeight: 'bold' }}>{logs.length}</div>
            <div style={{ color: '#666666', fontSize: '0.7em' }}>TOTAL</div>
          </div>
          <div style={{ border: '1px solid #FFFF00', padding: '0.5rem', backgroundColor: '#1a1a00' }}>
            <div style={{ color: '#FFFF00', fontSize: '1.5em', fontWeight: 'bold' }}>
              {logs.filter(l => l.result === 'success').length}
            </div>
            <div style={{ color: '#666666', fontSize: '0.7em' }}>SUCCESS</div>
          </div>
        </div>

        {/* Toggle View */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
          <button
            onClick={() => setShowLogs(false)}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: !showLogs ? '#00CCCC' : '#333333',
              color: !showLogs ? '#000000' : '#666666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9em'
            }}
          >
            HOOKS
          </button>
          <button
            onClick={() => setShowLogs(true)}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: showLogs ? '#00CCCC' : '#333333',
              color: showLogs ? '#000000' : '#666666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.9em'
            }}
          >
            LOGS
          </button>
        </div>

        {/* Hooks List */}
        {!showLogs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {hooks.slice(0, 5).map((hook) => (
              <div
                key={hook.id}
                style={{
                  border: hook.enabled ? '1px solid #00FF00' : '1px solid #666666',
                  padding: '0.5rem',
                  backgroundColor: '#000000',
                  fontSize: '0.85em'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <div style={{ color: '#00FFFF' }}>
                    {hook.enabled ? '✓' : '○'} {hook.name}
                  </div>
                  <button
                    onClick={() => toggleHook(hook.id, !hook.enabled)}
                    style={{
                      padding: '0.125rem 0.5rem',
                      backgroundColor: hook.enabled ? '#CC0000' : '#00CC00',
                      color: '#FFFFFF',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.8em'
                    }}
                  >
                    {hook.enabled ? 'OFF' : 'ON'}
                  </button>
                </div>
                <div style={{ color: '#666666', fontSize: '0.8em' }}>
                  {hook.trigger.type} • P{hook.priority}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logs List */}
        {showLogs && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {recentLogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#666666' }}>
                NO LOGS YET
              </div>
            ) : (
              recentLogs.map((log, i) => {
                const hook = hooks.find(h => h.id === log.hookId);
                const timeAgo = Math.floor((new Date().getTime() - log.timestamp) / 1000);
                
                return (
                  <div
                    key={i}
                    style={{
                      border: `1px solid ${log.result === 'success' ? '#00FF00' : '#FF0000'}`,
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#000000',
                      fontSize: '0.75em'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: log.result === 'success' ? '#00FF00' : '#FF0000' }}>
                        {log.result === 'success' ? '✓' : '✗'} {hook?.name || log.hookId}
                      </span>
                      <span style={{ color: '#666666' }}>{timeAgo}s</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Info */}
        <div style={{
          marginTop: '1rem',
          padding: '0.5rem',
          border: '1px solid #666666',
          fontSize: '0.7em',
          color: '#666666'
        }}>
          <div style={{ color: '#00FFFF', marginBottom: '0.25rem' }}>HOOK_SYS:</div>
          <div>• AUTO-EXEC: ENABLED</div>
          <div>• PRIORITY: SORTED</div>
          <div>• KONAMI: ↑↑↓↓←→←→BA</div>
        </div>

      </div>
    </TeletextPage>
  );
}
