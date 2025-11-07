import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

/**
 * Device API Response Types
 */
export interface DeviceData {
  deviceId: string;
  name: string;
  location: {
    building?: string;
    floor?: string;
    room?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: {
    state: 'online' | 'offline' | 'warning';
    lastSeen: string;
  };
  currentData: {
    battery?: number;
    signal?: number;
    temperature?: number;
    humidity?: number;
    pressure?: number;
    [key: string]: any;
  };
  mqttTopic: string;
  metadata?: {
    icon?: string;
    color?: string;
    description?: string;
  };
}

export interface DeviceDetail extends DeviceData {
  mqtt: {
    brokerUrl: string;
    topicPrefix: string;
    topics: {
      data: string;
      status: string;
      control: string;
    };
  };
  sensors: {
    battery?: { value: number; unit: string; lastUpdate: string };
    signal?: { value: number; unit: string; lastUpdate: string };
    temperature?: { value: number; unit: string; lastUpdate: string };
    humidity?: { value: number; unit: string; lastUpdate: string };
    pressure?: { value: number; unit: string; lastUpdate: string };
  };
  history?: Array<{
    timestamp: string;
    data: any;
    topic?: string;
  }>;
}

export interface UpdateDeviceDataPayload {
  battery?: number;
  signal?: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  [key: string]: any;
}

/**
 * Device API Service
 * 
 * Provides typed methods for interacting with device endpoints.
 * Includes interceptors for authentication and error handling.
 */
class DeviceService {
  private api: AxiosInstance;

  constructor() {
    // Create axios instance with base configuration
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor - Add authentication token
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - Handle errors globally
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle specific error cases
        if (error.response) {
          switch (error.response.status) {
            case 401:
              // Unauthorized - redirect to login
              console.error('Unauthorized access - please login');
              localStorage.removeItem('accessToken');
              window.location.href = '/login';
              break;
            case 403:
              // Forbidden
              console.error('Access forbidden:', error.response.data.message);
              break;
            case 404:
              // Not found
              console.error('Resource not found:', error.response.data.message);
              break;
            case 500:
              // Server error
              console.error('Server error:', error.response.data.message);
              break;
            default:
              console.error('API error:', error.response.data.message);
          }
        } else if (error.request) {
          // Request made but no response
          console.error('No response from server. Please check your connection.');
        } else {
          // Error in request setup
          console.error('Request error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all devices
   * @returns Promise with array of devices
   */
  async getDevices(): Promise<DeviceData[]> {
    try {
      const response = await this.api.get<{ devices: DeviceData[] }>('/api/devices');
      return response.data.devices;
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  }

  /**
   * Get device by ID with details and history
   * @param deviceId - The device ID (supports both '123' and 'DEVICE_123' formats)
   * @returns Promise with device details
   */
  async getDeviceById(deviceId: string): Promise<DeviceDetail> {
    try {
      const response = await this.api.get<{ device: DeviceDetail }>(`/api/devices/${deviceId}`);
      return response.data.device;
    } catch (error) {
      console.error(`Error fetching device ${deviceId}:`, error);
      throw error;
    }
  }

  /**
   * Update device data (send telemetry)
   * @param deviceId - The device ID
   * @param data - The sensor data to update
   * @returns Promise with updated device
   */
  async updateDeviceData(deviceId: string, data: UpdateDeviceDataPayload): Promise<DeviceDetail> {
    try {
      const response = await this.api.post<{ device: DeviceDetail }>(`/api/devices/${deviceId}/data`, data);
      return response.data.device;
    } catch (error) {
      console.error(`Error updating device ${deviceId}:`, error);
      throw error;
    }
  }

  /**
   * Get device status summary
   * @returns Promise with status counts
   */
  async getDeviceStatusSummary(): Promise<{ online: number; warning: number; offline: number; total: number }> {
    try {
      const devices = await this.getDevices();
      const summary = {
        online: 0,
        warning: 0,
        offline: 0,
        total: devices.length
      };

      devices.forEach(device => {
        switch (device.status.state) {
          case 'online':
            summary.online++;
            break;
          case 'warning':
            summary.warning++;
            break;
          case 'offline':
            summary.offline++;
            break;
        }
      });

      return summary;
    } catch (error) {
      console.error('Error fetching device status summary:', error);
      throw error;
    }
  }

  /**
   * Search devices by name or location
   * @param query - Search query string
   * @returns Promise with filtered devices
   */
  async searchDevices(query: string): Promise<DeviceData[]> {
    try {
      const devices = await this.getDevices();
      const lowerQuery = query.toLowerCase();
      
      return devices.filter(device => 
        device.name.toLowerCase().includes(lowerQuery) ||
        device.location.building?.toLowerCase().includes(lowerQuery) ||
        device.location.room?.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('Error searching devices:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const deviceService = new DeviceService();

// Export class for testing purposes
export default DeviceService;
