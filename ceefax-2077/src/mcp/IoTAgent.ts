/**
 * IoTAgent - MCP Tool for Smart Home Device Control
 * Simulates Philips Hue bridge connection with realistic network delays
 */

export interface IoTDevice {
  id: string;
  name: string;
  type: 'light' | 'switch' | 'sensor';
  state: {
    on: boolean;
    brightness: number; // 0-100
    reachable: boolean;
  };
  lastUpdated: number;
}

export interface IoTCommand {
  deviceId: string;
  action: 'on' | 'off' | 'dim' | 'brighten' | 'toggle';
  value?: number; // For dim/brighten
}

export interface IoTResponse {
  success: boolean;
  device: IoTDevice;
  message: string;
  latency: number; // Network delay in ms
}

class IoTAgentService {
  private devices: Map<string, IoTDevice> = new Map();
  private readonly NETWORK_DELAY_MIN = 150;
  private readonly NETWORK_DELAY_MAX = 400;

  constructor() {
    this.initializeDevices();
  }

  private initializeDevices(): void {
    // Simulate a typical smart home setup
    const defaultDevices: IoTDevice[] = [
      {
        id: 'hue-001',
        name: 'Living Room',
        type: 'light',
        state: { on: false, brightness: 75, reachable: true },
        lastUpdated: Date.now()
      },
      {
        id: 'hue-002',
        name: 'Bedroom',
        type: 'light',
        state: { on: false, brightness: 50, reachable: true },
        lastUpdated: Date.now()
      },
      {
        id: 'hue-003',
        name: 'Kitchen',
        type: 'light',
        state: { on: true, brightness: 100, reachable: true },
        lastUpdated: Date.now()
      },
      {
        id: 'hue-004',
        name: 'Bathroom',
        type: 'light',
        state: { on: false, brightness: 80, reachable: true },
        lastUpdated: Date.now()
      },
      {
        id: 'hue-005',
        name: 'Office',
        type: 'light',
        state: { on: false, brightness: 90, reachable: true },
        lastUpdated: Date.now()
      }
    ];

    defaultDevices.forEach(device => {
      this.devices.set(device.id, device);
    });
  }

  private simulateNetworkDelay(): Promise<number> {
    const delay = Math.floor(
      Math.random() * (this.NETWORK_DELAY_MAX - this.NETWORK_DELAY_MIN) + 
      this.NETWORK_DELAY_MIN
    );
    return new Promise(resolve => setTimeout(() => resolve(delay), delay));
  }

  async executeCommand(command: IoTCommand): Promise<IoTResponse> {
    const startTime = Date.now();
    
    // Simulate network delay
    await this.simulateNetworkDelay();
    
    const device = this.devices.get(command.deviceId);
    
    if (!device) {
      return {
        success: false,
        device: {} as IoTDevice,
        message: `Device ${command.deviceId} not found`,
        latency: Date.now() - startTime
      };
    }

    if (!device.state.reachable) {
      return {
        success: false,
        device,
        message: `Device ${device.name} is unreachable`,
        latency: Date.now() - startTime
      };
    }

    // Execute command
    switch (command.action) {
      case 'on':
        device.state.on = true;
        break;
      
      case 'off':
        device.state.on = false;
        break;
      
      case 'toggle':
        device.state.on = !device.state.on;
        break;
      
      case 'dim':
        if (command.value !== undefined) {
          device.state.brightness = Math.max(0, Math.min(100, command.value));
        } else {
          device.state.brightness = Math.max(0, device.state.brightness - 10);
        }
        if (device.state.brightness > 0) {
          device.state.on = true;
        }
        break;
      
      case 'brighten':
        if (command.value !== undefined) {
          device.state.brightness = Math.max(0, Math.min(100, command.value));
        } else {
          device.state.brightness = Math.min(100, device.state.brightness + 10);
        }
        device.state.on = true;
        break;
    }

    device.lastUpdated = Date.now();
    this.devices.set(device.id, device);

    return {
      success: true,
      device: { ...device },
      message: `${device.name} ${command.action} successful`,
      latency: Date.now() - startTime
    };
  }

  getAllDevices(): IoTDevice[] {
    return Array.from(this.devices.values());
  }

  getDevice(deviceId: string): IoTDevice | undefined {
    return this.devices.get(deviceId);
  }

  // Simulate occasional network issues
  async checkConnection(): Promise<{ connected: boolean; bridgeIp: string }> {
    await this.simulateNetworkDelay();
    
    // 95% success rate
    const connected = Math.random() > 0.05;
    
    return {
      connected,
      bridgeIp: connected ? '192.168.1.100' : 'unreachable'
    };
  }
}

// Singleton instance
export const IoTAgent = new IoTAgentService();
