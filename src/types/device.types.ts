/**
 * Device Module Type Definitions
 * 
 * Comprehensive TypeScript types for the device management system
 */

/**
 * Device status states
 */
export type DeviceStatus = 'online' | 'offline' | 'warning';

/**
 * Metric types for color coding and validation
 */
export type MetricType = 'battery' | 'signal' | 'temperature' | 'humidity' | 'pressure' | 'default';

/**
 * Sensor data structure
 */
export interface SensorReading {
  value: number;
  unit: string;
  lastUpdate: string;
}

/**
 * Device location information
 */
export interface DeviceLocation {
  building?: string;
  floor?: string;
  room?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

/**
 * Device status information
 */
export interface DeviceStatusInfo {
  state: DeviceStatus;
  lastSeen: string;
}

/**
 * Device metadata
 */
export interface DeviceMetadata {
  icon?: string;
  color?: string;
  description?: string;
  tags?: string[];
}

/**
 * MQTT configuration for a device
 */
export interface DeviceMqttConfig {
  brokerUrl: string;
  topicPrefix: string;
  topics: {
    data: string;
    status: string;
    control: string;
  };
}

/**
 * Device sensor collection
 */
export interface DeviceSensors {
  battery?: SensorReading;
  signal?: SensorReading;
  temperature?: SensorReading;
  humidity?: SensorReading;
  pressure?: SensorReading;
  [key: string]: SensorReading | undefined;
}

/**
 * Current device data (simplified for list views)
 */
export interface DeviceCurrentData {
  battery?: number;
  signal?: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  [key: string]: number | undefined;
}

/**
 * Historical data entry
 */
export interface DeviceHistoryEntry {
  timestamp: string;
  data: Record<string, any>;
  topic?: string;
}

/**
 * Base device interface (used in list views)
 */
export interface Device {
  deviceId: string;
  name: string;
  location: DeviceLocation;
  status: DeviceStatusInfo;
  currentData: DeviceCurrentData;
  mqttTopic: string;
  metadata?: DeviceMetadata;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Extended device interface with full details
 */
export interface DeviceDetail extends Device {
  mqtt: DeviceMqttConfig;
  sensors: DeviceSensors;
  history?: DeviceHistoryEntry[];
}

/**
 * Device list response from API
 */
export interface DeviceListResponse {
  devices: Device[];
  total?: number;
  page?: number;
  limit?: number;
}

/**
 * Device detail response from API
 */
export interface DeviceDetailResponse {
  device: DeviceDetail;
}

/**
 * Device status summary
 */
export interface DeviceStatusSummary {
  online: number;
  warning: number;
  offline: number;
  total: number;
}

/**
 * Update device data payload
 */
export interface UpdateDeviceDataPayload {
  battery?: number;
  signal?: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  [key: string]: number | string | boolean | undefined;
}

/**
 * Device filter options
 */
export interface DeviceFilterOptions {
  status?: DeviceStatus[];
  location?: string;
  search?: string;
  tags?: string[];
}

/**
 * Device sort options
 */
export interface DeviceSortOptions {
  field: 'name' | 'status' | 'lastSeen' | 'location';
  order: 'asc' | 'desc';
}

/**
 * Metric card props
 */
export interface MetricCardProps {
  icon: string;
  value: number | string;
  label: string;
  unit?: string;
  trend?: number;
  type?: MetricType;
  color?: string;
}

/**
 * Trend data for metrics
 */
export interface MetricTrend {
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  direction: 'up' | 'down' | 'neutral';
}

/**
 * Device command payload
 */
export interface DeviceCommand {
  command: string;
  parameters?: Record<string, any>;
  timestamp: string;
}

/**
 * Device acknowledgment
 */
export interface DeviceAcknowledgment {
  deviceId: string;
  commandId: string;
  status: 'pending' | 'acknowledged' | 'failed';
  timestamp: string;
  message?: string;
}

/**
 * Real-time device update (from Socket.IO/MQTT)
 */
export interface DeviceRealtimeUpdate {
  deviceId: string;
  topic: string;
  data: Record<string, any>;
  timestamp: string;
}

/**
 * Device alert/alarm
 */
export interface DeviceAlert {
  id: string;
  deviceId: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  metric?: string;
  threshold?: number;
  currentValue?: number;
  timestamp: string;
  acknowledged: boolean;
}

/**
 * Device configuration
 */
export interface DeviceConfiguration {
  deviceId: string;
  settings: Record<string, any>;
  updatedAt: string;
  updatedBy?: string;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  page: number;
  limit: number;
  total?: number;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

/**
 * Route meta information
 */
export interface DeviceRouteMeta {
  pageTitle?: string;
  breadcrumbs?: string[];
  requiresAuth?: boolean;
  permissions?: string[];
}

/**
 * Navigation helper return types
 */
export interface RouteLocation {
  name: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number>;
}

/**
 * User permissions
 */
export type DevicePermission = 'read_devices' | 'write_devices' | 'delete_devices' | 'control_devices';

/**
 * Chart data point
 */
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

/**
 * Time range for historical data
 */
export interface TimeRange {
  start: Date | string;
  end: Date | string;
}

/**
 * Export options
 */
export interface ExportOptions {
  format: 'csv' | 'json' | 'excel';
  fields?: string[];
  dateRange?: TimeRange;
}

/**
 * Utility type: Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility type: Make all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Type guards
 */
export function isDevice(obj: any): obj is Device {
  return obj && typeof obj.deviceId === 'string' && typeof obj.name === 'string';
}

export function isDeviceDetail(obj: any): obj is DeviceDetail {
  return isDevice(obj) && obj.mqtt && obj.sensors;
}

export function isValidDeviceId(id: string): boolean {
  return /^\d+$/.test(id) || /^DEVICE_\d+$/i.test(id);
}

export function normalizeDeviceId(id: string): string {
  const match = id.match(/\d+/);
  return match ? match[0] : id;
}

/**
 * Constants
 */
export const DEVICE_STATUS_COLORS = {
  online: '#50CD89',
  warning: '#FFC700',
  offline: '#F1416C',
} as const;

export const METRIC_TYPE_ICONS = {
  battery: 'ki-outline ki-battery',
  signal: 'ki-outline ki-wifi',
  temperature: 'ki-outline ki-temperature',
  humidity: 'ki-outline ki-drop',
  pressure: 'ki-outline ki-gauge',
  default: 'ki-outline ki-chart-simple',
} as const;

export const METRIC_TYPE_COLORS = {
  battery: '#50CD89',
  signal: '#009EF7',
  temperature: '#F1416C',
  humidity: '#00A3FF',
  pressure: '#FFC700',
  default: '#7239EA',
} as const;

export const STATUS_THRESHOLDS = {
  battery: {
    critical: 20,
    warning: 40,
  },
  signal: {
    critical: 30,
    warning: 60,
  },
  temperature: {
    criticalLow: 10,
    warningLow: 15,
    warningHigh: 30,
    criticalHigh: 35,
  },
  humidity: {
    criticalLow: 20,
    warningLow: 30,
    warningHigh: 70,
    criticalHigh: 80,
  },
} as const;

/**
 * Default values
 */
export const DEFAULT_DEVICE: Partial<Device> = {
  status: {
    state: 'offline',
    lastSeen: new Date().toISOString(),
  },
  currentData: {},
  location: {},
};

export const DEFAULT_PAGINATION: PaginationOptions = {
  page: 1,
  limit: 20,
};

/**
 * Enum exports for convenience
 */
export enum DeviceStatusEnum {
  ONLINE = 'online',
  OFFLINE = 'offline',
  WARNING = 'warning',
}

export enum MetricTypeEnum {
  BATTERY = 'battery',
  SIGNAL = 'signal',
  TEMPERATURE = 'temperature',
  HUMIDITY = 'humidity',
  PRESSURE = 'pressure',
  DEFAULT = 'default',
}
