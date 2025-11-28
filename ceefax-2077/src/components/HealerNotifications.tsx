import type { HealerNotification } from '../hooks/useAutoHealer';

interface HealerNotificationsProps {
  notifications: HealerNotification[];
}

export default function HealerNotifications({ notifications }: HealerNotificationsProps) {
  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '400px'
    }}>
      {notifications.map((notification) => (
        <div
          key={notification.timestamp}
          style={{
            padding: '15px',
            background: notification.severity === 'success' ? '#003300' :
                       notification.severity === 'warning' ? '#332200' :
                       '#001133',
            border: `2px solid ${
              notification.severity === 'success' ? '#00FF00' :
              notification.severity === 'warning' ? '#FFFF00' :
              '#00FFFF'
            }`,
            color: notification.severity === 'success' ? '#00FF00' :
                   notification.severity === 'warning' ? '#FFFF00' :
                   '#00FFFF',
            fontFamily: 'monospace',
            fontSize: '0.9em',
            boxShadow: `0 0 20px ${
              notification.severity === 'success' ? 'rgba(0, 255, 0, 0.3)' :
              notification.severity === 'warning' ? 'rgba(255, 255, 0, 0.3)' :
              'rgba(0, 255, 255, 0.3)'
            }`,
            animation: 'slideIn 0.3s ease-out, pulse 2s ease-in-out infinite'
          }}
        >
          <div style={{
            fontWeight: 'bold',
            marginBottom: '5px',
            textTransform: 'uppercase'
          }}>
            {notification.type === 'api-reroute' && '🤖 AUTO-HEALER'}
            {notification.type === 'code-clean' && '🧹 CODE HYGIENE'}
            {notification.type === 'error-recovery' && '⚡ RECOVERY'}
          </div>
          <div style={{ fontSize: '0.85em', lineHeight: '1.4' }}>
            {notification.message}
          </div>
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
