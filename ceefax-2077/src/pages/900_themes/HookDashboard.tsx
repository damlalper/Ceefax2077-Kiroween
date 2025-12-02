/**
 * Hook Dashboard (Page 907)
 * Monitor and manage all 10 agent hooks
 */

import { useState } from 'react';
import TeletextGrid from '../../components/TeletextGrid';
import { useAgentHooks } from '../../hooks/useAgentHooks';

export default function HookDashboard() {
  const { hooks, logs, initialized, toggleHook } = useAgentHooks();
  const [showLogs, setShowLogs] = useState(false);

  if (!initialized) {
    return (
      <TeletextGrid>
        <div className="p-4 text-center">
          <div className="text-cyan-400 text-xl animate-pulse">
            🤖 INITIALIZING AGENT HOOKS...
          </div>
        </div>
      </TeletextGrid>
    );
  }

  const activeCount = hooks.filter(h => h.enabled).length;
  const recentLogs = logs.slice(-10).reverse();

  return (
    <TeletextGrid>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="border-b border-cyan-500 pb-2">
          <h1 className="text-2xl font-bold text-cyan-400">
            🤖 AGENT HOOKS DASHBOARD
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {activeCount}/{hooks.length} hooks active • {logs.length} total executions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="border border-green-500 bg-gray-900 p-3">
            <div className="text-green-400 font-bold text-xl">{activeCount}</div>
            <div className="text-gray-400 text-xs">Active Hooks</div>
          </div>
          <div className="border border-cyan-500 bg-gray-900 p-3">
            <div className="text-cyan-400 font-bold text-xl">{logs.length}</div>
            <div className="text-gray-400 text-xs">Executions</div>
          </div>
          <div className="border border-yellow-500 bg-gray-900 p-3">
            <div className="text-yellow-400 font-bold text-xl">
              {logs.filter(l => l.result === 'success').length}
            </div>
            <div className="text-gray-400 text-xs">Successful</div>
          </div>
        </div>

        {/* Toggle View */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowLogs(false)}
            className={`flex-1 px-4 py-2 font-bold transition-colors ${
              !showLogs
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            HOOKS ({hooks.length})
          </button>
          <button
            onClick={() => setShowLogs(true)}
            className={`flex-1 px-4 py-2 font-bold transition-colors ${
              showLogs
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            LOGS ({recentLogs.length})
          </button>
        </div>

        {/* Hooks List */}
        {!showLogs && (
          <div className="space-y-2">
            {hooks.map((hook) => (
              <div
                key={hook.id}
                className={`border p-3 ${
                  hook.enabled
                    ? 'border-green-500 bg-gray-900'
                    : 'border-gray-700 bg-gray-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-lg ${
                          hook.enabled ? 'text-green-400' : 'text-gray-500'
                        }`}
                      >
                        {hook.enabled ? '✅' : '⏸️'}
                      </span>
                      <span className="text-cyan-400 font-bold">
                        {hook.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        #{hook.id}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {hook.action.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Trigger: {hook.trigger.type}
                      {hook.trigger.interval && ` (${hook.trigger.interval}ms)`}
                      {hook.trigger.timeout && ` (${hook.trigger.timeout}ms)`}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-xs text-yellow-400">
                      Priority: {hook.priority}
                    </div>
                    <button
                      onClick={() => toggleHook(hook.id, !hook.enabled)}
                      className={`px-3 py-1 text-xs font-bold transition-colors ${
                        hook.enabled
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                    >
                      {hook.enabled ? 'DISABLE' : 'ENABLE'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Logs List */}
        {showLogs && (
          <div className="space-y-2">
            {recentLogs.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                No logs yet. Hooks will execute automatically.
              </div>
            ) : (
              recentLogs.map((log, i) => {
                const hook = hooks.find(h => h.id === log.hookId);
                const timeAgo = Math.floor((new Date().getTime() - log.timestamp) / 1000);
                
                return (
                  <div
                    key={i}
                    className={`border p-2 text-xs ${
                      log.result === 'success'
                        ? 'border-green-700 bg-gray-900'
                        : 'border-red-700 bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            log.result === 'success'
                              ? 'text-green-400'
                              : 'text-red-400'
                          }
                        >
                          {log.result === 'success' ? '✅' : '❌'}
                        </span>
                        <span className="text-cyan-400">
                          {hook?.name || log.hookId}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {timeAgo}s ago
                      </span>
                    </div>
                    <div className="text-gray-400 mt-1">
                      Action: {log.action}
                    </div>
                    {log.details && (
                      <div className="text-gray-500 mt-1">
                        {log.details}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Info */}
        <div className="border border-gray-700 bg-gray-900 p-4 text-sm space-y-2">
          <div className="text-cyan-400 font-bold">
            🤖 AGENT HOOKS INFO
          </div>
          <ul className="text-gray-400 space-y-1 list-disc list-inside">
            <li>Hooks run automatically in the background</li>
            <li>Enable/disable hooks as needed</li>
            <li>Higher priority hooks execute first</li>
            <li>Logs show last 100 executions</li>
            <li>Try Konami code: ↑↑↓↓←→←→BA</li>
          </ul>
        </div>
      </div>
    </TeletextGrid>
  );
}
