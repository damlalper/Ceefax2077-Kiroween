import { useState, useEffect, useCallback } from 'react';
import { IoTAgent } from '../../mcp/IoTAgent';
import type { IoTDevice } from '../../mcp/IoTAgent';

export default function TeleHome() {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [flash, setFlash] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Checking...');

  const loadDevices = () => {
    const allDevices = IoTAgent.getAllDevices();
    setDevices(allDevices);
  };

  const checkConnection = async () => {
    const status = await IoTAgent.checkConnection();
    setConnectionStatus(status.connected ? `Connected: ${status.bridgeIp}` : 'Bridge Unreachable');
  };

  useEffect(() => {
    // Load devices on mount
    loadDevices();
    checkConnection();
  }, []);

  const selectedDevice = devices[selectedIndex];

  const executeCommand = async (action: 'on' | 'off' | 'dim' | 'brighten' | 'toggle', value?: number) => {
    if (!selectedDevice) return;

    setLoading(true);
    setMessage('Sending command...');

    const response = await IoTAgent.executeCommand({
      deviceId: selectedDevice.id,
      action,
      value
    });

    if (response.success) {
      setMessage(`✓ ${response.message} (${response.latency}ms)`);
      loadDevices(); // Refresh device states

      // Flash effect when turning on
      if (action === 'on' || (action === 'toggle' && response.device.state.on)) {
        triggerFlash();
      }
    } else {
      setMessage(`✗ ${response.message}`);
    }

    setLoading(false);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const triggerFlash = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
  };

  // Keyboard controls
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (loading) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
        break;
      
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(devices.length - 1, prev + 1));
        break;
      
      case 'ArrowRight':
        e.preventDefault();
        executeCommand('brighten');
        break;
      
      case 'ArrowLeft':
        e.preventDefault();
        executeCommand('dim');
        break;
      
      case 'Enter':
      case ' ':
        e.preventDefault();
        executeCommand('toggle');
        break;
      
      case 'o':
      case 'O':
        e.preventDefault();
        executeCommand('on');
        break;
      
      case 'f':
      case 'F':
        e.preventDefault();
        executeCommand('off');
        break;
    }
  }, [devices.length, loading, selectedDevice]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const renderLightBulb = (isOn: boolean, brightness: number) => {
    const bulbColor = isOn ? '#FFFF00' : '#666666';
    const glowIntensity = isOn ? brightness / 100 : 0;

    return (
      <div style={{ 
        color: bulbColor,
        textShadow: isOn ? `0 0 ${10 + glowIntensity * 20}px ${bulbColor}` : 'none',
        filter: isOn ? `brightness(${1 + glowIntensity * 0.5})` : 'none'
      }}>
        <pre style={{ lineHeight: '1.2', margin: 0 }}>
{`
        ___
       /   \\
      /     \\
     |  ${isOn ? '◉' : '○'}  ${isOn ? '◉' : '○'}  |
     |       |
      \\ ${isOn ? '▓▓▓' : '░░░'} /
       \\___/
        |||
        |||
       =====
      |     |
      |_____|
`}
        </pre>
      </div>
    );
  };

  const renderBrightnessBar = (brightness: number) => {
    const blocks = 20;
    const filled = Math.round((brightness / 100) * blocks);
    
    return (
      <div style={{ fontFamily: 'monospace' }}>
        {'█'.repeat(filled)}{'░'.repeat(blocks - filled)} {brightness}%
      </div>
    );
  };

  if (!selectedDevice) {
    return (
      <div style={{ color: '#CC0000' }}>
        <div>NO DEVICES FOUND</div>
        <div style={{ marginTop: '10px', fontSize: '0.8em' }}>
          Check Hue Bridge connection
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Flash overlay */}
      {flash && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'white',
          zIndex: 9999,
          pointerEvents: 'none'
        }} />
      )}

      {/* Header */}
      <div style={{ 
        color: '#FFD700', 
        fontSize: '1.2em', 
        marginBottom: '10px',
        textAlign: 'center'
      }}>
        ╔════════════════════════════════════╗
        ║       TELE-HOME CONTROL v1.0       ║
        ╚════════════════════════════════════╝
      </div>

      {/* Connection Status */}
      <div style={{ 
        color: connectionStatus.includes('Connected') ? '#00FF00' : '#FF0000',
        fontSize: '0.8em',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        Bridge: {connectionStatus}
      </div>

      {/* Device List */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ color: '#00FFFF', marginBottom: '5px' }}>
          DEVICES ({devices.length}):
        </div>
        {devices.map((device, index) => (
          <div
            key={device.id}
            style={{
              color: index === selectedIndex ? '#FFFF00' : '#FFFFFF',
              background: index === selectedIndex ? '#333333' : 'transparent',
              padding: '2px 5px',
              fontFamily: 'monospace'
            }}
          >
            {index === selectedIndex ? '►' : ' '} {device.name.padEnd(15)} 
            [{device.state.on ? 'ON ' : 'OFF'}] 
            {device.state.on && ` ${device.state.brightness}%`}
          </div>
        ))}
      </div>

      {/* ASCII Lightbulb */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '15px',
        fontSize: '1.1em'
      }}>
        {renderLightBulb(selectedDevice.state.on, selectedDevice.state.brightness)}
      </div>

      {/* Device Name */}
      <div style={{ 
        color: '#FFD700', 
        fontSize: '1.3em', 
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        {selectedDevice.name.toUpperCase()}
      </div>

      {/* Status */}
      <div style={{ 
        color: selectedDevice.state.on ? '#00FF00' : '#FF0000',
        fontSize: '1.5em',
        textAlign: 'center',
        marginBottom: '10px',
        fontWeight: 'bold'
      }}>
        {selectedDevice.state.on ? '● ON' : '○ OFF'}
      </div>

      {/* Brightness Bar */}
      {selectedDevice.state.on && (
        <div style={{ 
          textAlign: 'center',
          color: '#FFFF00',
          marginBottom: '15px'
        }}>
          <div style={{ marginBottom: '5px', fontSize: '0.9em' }}>
            BRIGHTNESS:
          </div>
          {renderBrightnessBar(selectedDevice.state.brightness)}
        </div>
      )}

      {/* Controls Help */}
      <div style={{ 
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #666',
        color: '#00FFFF',
        fontSize: '0.85em'
      }}>
        <div style={{ color: '#FFD700', marginBottom: '5px' }}>
          CONTROLS:
        </div>
        <div>↑/↓  Select Device</div>
        <div>←/→  Dim/Brighten</div>
        <div>ENTER Toggle On/Off</div>
        <div>O    Turn On</div>
        <div>F    Turn Off</div>
      </div>

      {/* Status Message */}
      {message && (
        <div style={{
          marginTop: '10px',
          padding: '5px',
          background: '#333',
          color: message.startsWith('✓') ? '#00FF00' : '#FF0000',
          textAlign: 'center',
          fontSize: '0.9em'
        }}>
          {message}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div style={{
          marginTop: '10px',
          color: '#FFFF00',
          textAlign: 'center',
          animation: 'blink 0.5s infinite'
        }}>
          ⟳ SENDING COMMAND...
        </div>
      )}
    </div>
  );
}
