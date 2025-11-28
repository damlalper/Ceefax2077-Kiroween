import { useState, useEffect } from 'react';
import { useBiometricLock } from '../hooks/useBiometricLock';
import type { BiometricStatus } from '../hooks/useBiometricLock';
import { useTeletext } from '../context/TeletextContext';

interface BiometricGateProps {
  children: React.ReactNode;
  requiredZone: number;
  redirectPage: number;
}

export default function BiometricGate({ children, requiredZone, redirectPage }: BiometricGateProps) {
  const { currentPage, goToPage } = useTeletext();
  const { status, progress, startScan, stopScan, videoRef, canvasRef, error } = useBiometricLock();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [blinkEye, setBlinkEye] = useState(false);

  // Check if current page is in required zone
  const currentZone = Math.floor(currentPage / 100) * 100;
  const needsAuth = currentZone === requiredZone && !isAuthorized;

  useEffect(() => {
    if (needsAuth && status === 'idle') {
      // Start scan automatically when entering zone
      performAuth();
    }
  }, [needsAuth, status]);

  useEffect(() => {
    // Blinking eye animation
    const blinkInterval = setInterval(() => {
      setBlinkEye(true);
      setTimeout(() => setBlinkEye(false), 200);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  const performAuth = async () => {
    const authorized = await startScan();
    
    if (authorized) {
      setIsAuthorized(true);
      setTimeout(() => {
        stopScan();
      }, 1000);
    } else {
      // Denied - redirect after showing error
      setTimeout(() => {
        stopScan();
        goToPage(redirectPage);
      }, 2000);
    }
  };

  const renderASCIIEye = (isOpen: boolean) => {
    if (isOpen) {
      return (
        <pre style={{ margin: 0, lineHeight: '1.2' }}>
{`
        ╔═══════════════════════╗
        ║                       ║
        ║      ███████████      ║
        ║    ███████████████    ║
        ║   █████████████████   ║
        ║  ███████████████████  ║
        ║  ███████░░░░░███████  ║
        ║  ██████░░███░░██████  ║
        ║  ██████░░███░░██████  ║
        ║  ███████░░░░░███████  ║
        ║  ███████████████████  ║
        ║   █████████████████   ║
        ║    ███████████████    ║
        ║      ███████████      ║
        ║                       ║
        ╚═══════════════════════╝
`}
        </pre>
      );
    } else {
      return (
        <pre style={{ margin: 0, lineHeight: '1.2' }}>
{`
        ╔═══════════════════════╗
        ║                       ║
        ║      ███████████      ║
        ║    ███████████████    ║
        ║   █████████████████   ║
        ║  ███████████████████  ║
        ║  ███████████████████  ║
        ║  ███████████████████  ║
        ║  ███████████████████  ║
        ║  ███████████████████  ║
        ║  ███████████████████  ║
        ║   █████████████████   ║
        ║    ███████████████    ║
        ║      ███████████      ║
        ║                       ║
        ╚═══════════════════════╝
`}
        </pre>
      );
    }
  };

  const renderScanOverlay = () => {
    const getStatusColor = (status: BiometricStatus) => {
      switch (status) {
        case 'requesting': return '#FFFF00';
        case 'scanning': return '#00FFFF';
        case 'authorized': return '#00FF00';
        case 'denied': return '#FF0000';
        default: return '#FFFFFF';
      }
    };

    const getStatusText = (status: BiometricStatus) => {
      switch (status) {
        case 'requesting': return 'REQUESTING CAMERA ACCESS...';
        case 'scanning': return 'RETINAL SCAN IN PROGRESS';
        case 'authorized': return '✓ ACCESS GRANTED';
        case 'denied': return '✗ UNAUTHORIZED USER';
        default: return 'INITIALIZING...';
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000000',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace'
      }}>
        {/* Hidden video and canvas for processing */}
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          autoPlay
          playsInline
          muted
        />
        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />

        {/* Header */}
        <div style={{
          color: '#FF0000',
          fontSize: '1.5em',
          marginBottom: '30px',
          textAlign: 'center',
          animation: 'blink 1s infinite'
        }}>
          ⚠️ SECURITY CHECKPOINT ⚠️
        </div>

        {/* ASCII Eye */}
        <div style={{
          color: getStatusColor(status),
          fontSize: '0.8em',
          marginBottom: '30px',
          textShadow: `0 0 10px ${getStatusColor(status)}`
        }}>
          {renderASCIIEye(!blinkEye)}
        </div>

        {/* Status */}
        <div style={{
          color: getStatusColor(status),
          fontSize: '1.3em',
          marginBottom: '20px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          {getStatusText(status)}
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            color: '#FF0000',
            fontSize: '1.1em',
            marginBottom: '20px',
            textAlign: 'center',
            animation: 'pulse 0.5s infinite'
          }}>
            {error}
          </div>
        )}

        {/* Progress Bar */}
        {status === 'scanning' && (
          <div style={{
            width: '400px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: '#333',
              height: '20px',
              border: '2px solid #00FFFF',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                background: '#00FFFF',
                height: '100%',
                width: `${progress}%`,
                transition: 'width 0.1s linear',
                boxShadow: '0 0 10px #00FFFF'
              }} />
            </div>
            <div style={{
              color: '#00FFFF',
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '0.9em'
            }}>
              ANALYZING BIOMETRIC DATA... {Math.floor(progress)}%
            </div>
          </div>
        )}

        {/* Instructions */}
        {status === 'requesting' && (
          <div style={{
            color: '#FFFF00',
            fontSize: '0.9em',
            textAlign: 'center',
            maxWidth: '500px',
            lineHeight: '1.6'
          }}>
            <div>CAMERA ACCESS REQUIRED</div>
            <div style={{ marginTop: '10px', fontSize: '0.85em' }}>
              Please allow camera access to proceed.
              <br />
              Your biometric data will be analyzed for security clearance.
            </div>
          </div>
        )}

        {status === 'scanning' && (
          <div style={{
            color: '#00FFFF',
            fontSize: '0.85em',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            <div>• Detecting presence</div>
            <div>• Analyzing light levels</div>
            <div>• Verifying motion patterns</div>
            <div style={{ marginTop: '10px', opacity: 0.7 }}>
              Please remain still and face the camera
            </div>
          </div>
        )}

        {status === 'authorized' && (
          <div style={{
            color: '#00FF00',
            fontSize: '1.1em',
            textAlign: 'center',
            animation: 'pulse 0.5s infinite'
          }}>
            WELCOME TO SHIELD ZONE
          </div>
        )}

        {status === 'denied' && (
          <div style={{
            color: '#FF0000',
            fontSize: '1.1em',
            textAlign: 'center'
          }}>
            <div style={{ marginBottom: '10px' }}>
              ACCESS DENIED
            </div>
            <div style={{ fontSize: '0.8em' }}>
              Redirecting to hub...
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          color: '#666',
          fontSize: '0.75em',
          textAlign: 'center'
        }}>
          ZONE 500 - SHIELD SECURITY PROTOCOL v2.0
          <br />
          Biometric authentication required for access
        </div>
      </div>
    );
  };

  // Show overlay if authentication needed
  if (needsAuth) {
    return renderScanOverlay();
  }

  // Show children if authorized or not in protected zone
  return <>{children}</>;
}
