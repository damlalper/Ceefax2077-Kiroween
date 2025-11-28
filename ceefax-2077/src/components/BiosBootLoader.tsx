import { useState, useEffect } from 'react';
import { useBoot } from '../context/BootContext';
import type { BootMode } from '../context/BootContext';

export default function BiosBootLoader() {
  const { setBootMode } = useBoot();
  const [bootStage, setBootStage] = useState<'bios' | 'selecting' | 'booting'>('bios');
  const [biosProgress, setBiosProgress] = useState(0);
  const [selectedMode, setSelectedMode] = useState<BootMode>(null);
  const [bootProgress, setBootProgress] = useState(0);

  // BIOS startup sequence
  useEffect(() => {
    if (bootStage === 'bios') {
      const interval = setInterval(() => {
        setBiosProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootStage('selecting'), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [bootStage]);

  // Boot sequence after selection
  useEffect(() => {
    if (bootStage === 'booting' && selectedMode) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setBootMode(selectedMode), 300);
            return 100;
          }
          return prev + 10;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [bootStage, selectedMode, setBootMode]);

  // Keyboard handler
  useEffect(() => {
    if (bootStage !== 'selecting') return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        setSelectedMode('CONSUMER');
        setBootStage('booting');
      } else if (e.key === 'F2') {
        e.preventDefault();
        setSelectedMode('SYSADMIN');
        setBootStage('booting');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [bootStage]);

  const renderBiosScreen = () => (
    <div style={{
      fontFamily: 'monospace',
      color: '#00FF00',
      background: '#000',
      padding: '20px',
      fontSize: '0.9em',
      lineHeight: '1.4'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <pre style={{ margin: 0 }}>
{`
╔════════════════════════════════════╗
║   TELETEXT 2077 BIOS v4.20.69     ║
║   Copyright (C) 2077 Kiroween     ║
╚════════════════════════════════════╝
`}
        </pre>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div>Detecting hardware...</div>
        <div>CPU: Quantum Core i9-2077 @ 42.0 GHz</div>
        <div>RAM: 2077 GB DDR7</div>
        <div>GPU: Neural RTX 9090 Ti</div>
        <div>Storage: 420 TB NVMe SSD</div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div>Initializing subsystems...</div>
        <div>[{'█'.repeat(Math.floor(biosProgress / 5))}{'░'.repeat(20 - Math.floor(biosProgress / 5))}] {biosProgress}%</div>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <div>✓ Memory test passed</div>
        <div>✓ Disk check passed</div>
        <div>✓ Network interface detected</div>
        <div>✓ Teletext grid initialized</div>
      </div>

      {biosProgress === 100 && (
        <div style={{ color: '#FFFF00', animation: 'blink 0.5s infinite' }}>
          Press any key to continue...
        </div>
      )}
    </div>
  );

  const renderBootMenu = () => (
    <div style={{
      fontFamily: 'monospace',
      color: '#00FF00',
      background: '#000',
      padding: '20px',
      fontSize: '0.95em'
    }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <pre style={{ margin: 0, color: '#00FFFF' }}>
{`
╔════════════════════════════════════╗
║      DUAL-BOOT SYSTEM v1.0        ║
║     SELECT OPERATING MODE         ║
╚════════════════════════════════════╝
`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <div style={{
          padding: '15px',
          border: '2px solid #00FF00',
          marginBottom: '15px',
          background: '#001100'
        }}>
          <div style={{ fontSize: '1.2em', marginBottom: '10px', color: '#FFFF00' }}>
            [F1] CONSUMER MODE
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • Full Teletext experience
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • All zones accessible
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • Colorful retro interface
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • News, gossip, horoscopes
          </div>
        </div>

        <div style={{
          padding: '15px',
          border: '2px solid #00FF00',
          background: '#001100'
        }}>
          <div style={{ fontSize: '1.2em', marginBottom: '10px', color: '#FF0000' }}>
            [F2] SYSADMIN MODE
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • Matrix-style terminal
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • System & Security zones only
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • Green-on-black hacker theme
          </div>
          <div style={{ color: '#00FFFF', fontSize: '0.9em' }}>
            • Infrastructure monitoring
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#FFFF00', animation: 'blink 1s infinite' }}>
        PRESS F1 OR F2 TO BOOT
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8em', color: '#666' }}>
        One codebase. Two applications. Skeleton Crew.
      </div>
    </div>
  );

  const renderBootingScreen = () => (
    <div style={{
      fontFamily: 'monospace',
      color: selectedMode === 'SYSADMIN' ? '#00FF00' : '#00FFFF',
      background: '#000',
      padding: '20px',
      fontSize: '0.9em'
    }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.3em', marginBottom: '10px' }}>
          BOOTING {selectedMode} MODE...
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div>Loading kernel modules...</div>
        <div>Mounting filesystems...</div>
        <div>Starting network services...</div>
        <div>Initializing user interface...</div>
        {selectedMode === 'SYSADMIN' && (
          <>
            <div>Loading security protocols...</div>
            <div>Establishing encrypted channels...</div>
            <div>Activating monitoring systems...</div>
          </>
        )}
        {selectedMode === 'CONSUMER' && (
          <>
            <div>Loading entertainment modules...</div>
            <div>Initializing social features...</div>
            <div>Preparing content feeds...</div>
          </>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div>[{'█'.repeat(Math.floor(bootProgress / 5))}{'░'.repeat(20 - Math.floor(bootProgress / 5))}] {bootProgress}%</div>
      </div>

      {bootProgress === 100 && (
        <div style={{ color: '#00FF00', textAlign: 'center' }}>
          ✓ BOOT COMPLETE
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000'
    }}>
      <div style={{
        maxWidth: '800px',
        width: '100%',
        border: '2px solid #00FF00',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
      }}>
        {bootStage === 'bios' && renderBiosScreen()}
        {bootStage === 'selecting' && renderBootMenu()}
        {bootStage === 'booting' && renderBootingScreen()}
      </div>
    </div>
  );
}
