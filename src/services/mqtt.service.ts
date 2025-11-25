import { io, Socket } from 'socket.io-client';
import ApiService from '@/core/services/ApiService';

export interface MqttMessage {
  text: string;
  type: 'individual' | 'broadcast';
  targetDevice?: string;
  timestamp: string;
}

export interface DeviceCommand {
  commandType: 'interrupt_mode' | 'normal_mode' | 'manual_mode' | 'dpol_mode' | 'inst_mode';
  deviceId: string;
  parameters: any;
  timestamp: string;
}

export interface InterruptModeConfig {
  startDate: string;
  startTime: string;
  stopDate: string;
  stopTime: string;
  onTime: number; // seconds
  offTime: number; // seconds
  dateFormat?: {
    dd?: string;
    mm?: string;
    yy?: string;
    HH?: string;
    MM?: string;
    ss?: string;
  };
}

export interface TimerConfig {
  ton: {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
  };
  toff: {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
    field6: string;
  };
}

export interface AlarmConfig {
  setup?: {
    value: string;
    threshold: string;
    enabled: boolean;
  };
  setop?: {
    value: string;
    threshold: string;
    enabled: boolean;
  };
  reffcal?: {
    value: string;
    calibration: string;
    enabled: boolean;
  };
}

export interface MessageResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

class MqttService {
  private socket: Socket | null = null;
  private readonly BACKEND_URL = 'http://localhost:3001';

  initialize(): Socket {
    if (!this.socket) {
      this.socket = io(this.BACKEND_URL, {
        withCredentials: true,
        transports: ['websocket', 'polling']
      });

      this.socket.on('connect', () => {
        console.log('MQTT Service connected to backend');
      });

      this.socket.on('disconnect', () => {
        console.log('MQTT Service disconnected from backend');
      });

      this.socket.on('messageDelivered', (data) => {
        console.log('Message delivery confirmation:', data);
      });

      this.socket.on('messageError', (error) => {
        console.error('Message delivery error:', error);
      });
    }
    return this.socket;
  }

  // Device configuration methods using API calls
  /**
   * Configure interrupt mode via backend HTTP API (not the realtime command).
   * This calls POST /api/devices/:deviceId/configure/interrupt-mode.
   */
  async configureInterruptMode(deviceId: string, config: InterruptModeConfig) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/interrupt-mode`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to configure interrupt mode via API:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure interrupt mode');
    }
  }

  async setManualMode(deviceId: string, action: 'start' | 'stop') {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/manual-mode`, { action });
      return response.data;
    } catch (error: any) {
      console.error('Failed to set manual mode:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure manual mode');
    }
  }

  async setNormalMode(deviceId: string, config: any = {}) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/normal-mode`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to set normal mode:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure normal mode');
    }
  }

  async setDpolMode(deviceId: string, config: any) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/dpol-mode`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to set DPOL mode:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure DPOL mode');
    }
  }

  async setInstMode(deviceId: string, config: any) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/inst-mode`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to set INST mode:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure INST mode');
    }
  }

  async setTimerConfiguration(deviceId: string, config: TimerConfig) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/timer`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to set timer configuration:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure timer');
    }
  }

  async setElectrodeConfiguration(deviceId: string, electrodeType: string) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/electrode`, { electrodeType });
      return response.data;
    } catch (error: any) {
      console.error('Failed to set electrode configuration:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure electrode');
    }
  }

  async setAlarmConfiguration(deviceId: string, config: AlarmConfig) {
    try {
      ApiService.setHeader();
      const response = await ApiService.post(`api/devices/${deviceId}/configure/alarm`, config);
      return response.data;
    } catch (error: any) {
      console.error('Failed to set alarm configuration:', error);
      throw new Error(error?.response?.data?.message || 'Failed to configure alarm');
    }
  }

  async getDeviceStatus(deviceId: string) {
    try {
      ApiService.setHeader();
      const response = await ApiService.get(`api/devices/${deviceId}/status`);
      return response.data;
    } catch (error: any) {
      console.error('Failed to get device status:', error);
      throw new Error(error?.response?.data?.message || 'Failed to get device status');
    }
  }

  // Legacy methods for backward compatibility
  async sendMessage(message: MqttMessage): Promise<MessageResponse> {
    if (!this.socket || !this.socket.connected) {
      return {
        success: false,
        error: 'Not connected to MQTT service'
      };
    }

    return new Promise((resolve) => {
      this.socket!.emit('sendMessage', message, (response: MessageResponse) => {
        resolve(response);
      });
    });
  }

  async sendDeviceCommand(command: DeviceCommand): Promise<MessageResponse> {
    if (!this.socket || !this.socket.connected) {
      return {
        success: false,
        error: 'Not connected to MQTT service'
      };
    }

    return new Promise((resolve) => {
      this.socket!.emit('sendDeviceCommand', command, (response: MessageResponse) => {
        resolve(response);
      });
    });
  }

  async setInterruptMode(deviceId: string, config: InterruptModeConfig): Promise<MessageResponse> {
    const command: DeviceCommand = {
      commandType: 'interrupt_mode',
      deviceId: deviceId,
      parameters: {
        mode: 'interrupt',
        schedule: {
          startDateTime: `${config.startDate} ${config.startTime}`,
          stopDateTime: `${config.stopDate} ${config.stopTime}`,
          onTimeSeconds: parseInt(config.onTime.toString()),
          offTimeSeconds: parseInt(config.offTime.toString())
        },
        dateFormat: config.dateFormat
      },
      timestamp: new Date().toISOString()
    };

    return this.sendDeviceCommand(command);
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

// Export singleton instance
export const mqttService = new MqttService();
export default mqttService;
