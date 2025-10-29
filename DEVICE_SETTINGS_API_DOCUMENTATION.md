# Device Settings API Documentation

This document describes the new device settings API endpoints that implement complete payload transmission whenever any setting is changed.

## Overview

The system now supports getting and updating device settings in the exact format requested, where the server always sends the complete settings payload even when only a single setting is changed.

## API Endpoints

### 1. Get Current Device Settings

**GET** `/api/devices/{deviceId}/settings`

Returns the current device settings in the standardized format.

**Response Format:**
```json
{
  "success": true,
  "data": {
    "Device ID": "123",
    "Message Type": "settings",
    "sender": "Server",
    "Parameters": {
      "Electrode": 0,
      "Shunt Voltage": 25,
      "Shunt Current": 999,
      "Reference Fail": 30,
      "Reference UP": 300,
      "Reference OV": 60,
      "Interrupt ON Time": 100,
      "Interrupt OFF Time": 100,
      "Interrupt Start TimeStamp": "2025-02-20 19:04:00",
      "Interrupt Stop TimeStamp": "2025-02-20 19:05:00",
      "DPOL Interval": "00:00:00",
      "Depolarization Start TimeStamp": "2025-02-20 19:04:00",
      "Depolarization Stop TimeStamp": "2025-02-20 19:05:00",
      "Instant Mode": 0,
      "Instant Start TimeStamp": "19:04:00",
      "Instant End TimeStamp": "00:00:00"
    }
  }
}
```

### 2. Update Complete Device Settings

**POST** `/api/devices/{deviceId}/settings`

Updates the complete device settings. The server will send the entire payload to the device.

**Request Body:**
```json
{
  "Parameters": {
    "Electrode": 1,
    "Shunt Voltage": 30,
    "Shunt Current": 1200,
    "Reference Fail": 35,
    "Reference UP": 350,
    "Reference OV": 65,
    "Interrupt ON Time": 120,
    "Interrupt OFF Time": 120,
    "Interrupt Start TimeStamp": "2025-02-21 10:00:00",
    "Interrupt Stop TimeStamp": "2025-02-21 11:00:00",
    "DPOL Interval": "01:00:00",
    "Depolarization Start TimeStamp": "2025-02-21 12:00:00",
    "Depolarization Stop TimeStamp": "2025-02-21 13:00:00",
    "Instant Mode": 1,
    "Instant Start TimeStamp": "10:00:00",
    "Instant End TimeStamp": "11:00:00"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Complete device settings sent to device",
  "commandId": "uuid-command-id",
  "status": "PENDING"
}
```

### 3. Update Single Setting (Sends Complete Payload)

**POST** `/api/devices/{deviceId}/settings/single`

Updates a single setting but sends the complete settings payload to the device. This is the key feature that ensures the device always receives all current settings even when only one parameter changes.

**Request Body:**
```json
{
  "setting": "Electrode",
  "value": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Setting 'Electrode' updated and complete settings sent to device",
  "commandId": "uuid-command-id",
  "status": "PENDING",
  "updatedSetting": {
    "Electrode": 1
  }
}
```

## MQTT Payload Format

When any setting is updated, the server sends this complete payload to the device via MQTT:

```json
{
  "Device ID": "123",
  "Message Type": "settings",
  "sender": "Server",
  "CommandId": "uuid-for-tracking",
  "Parameters": {
    "Electrode": 1,
    "Shunt Voltage": 25,
    "Shunt Current": 999,
    "Reference Fail": 30,
    "Reference UP": 300,
    "Reference OV": 60,
    "Interrupt ON Time": 100,
    "Interrupt OFF Time": 100,
    "Interrupt Start TimeStamp": "2025-02-20 19:04:00",
    "Interrupt Stop TimeStamp": "2025-02-20 19:05:00",
    "DPOL Interval": "00:00:00",
    "Depolarization Start TimeStamp": "2025-02-20 19:04:00",
    "Depolarization Stop TimeStamp": "2025-02-20 19:05:00",
    "Instant Mode": 0,
    "Instant Start TimeStamp": "19:04:00",
    "Instant End TimeStamp": "00:00:00"
  },
  "Changed": {
    "Electrode": 1
  }
}
```

The payload includes:
- **Device ID**: The target device identifier
- **Message Type**: Always "settings" for settings updates
- **sender**: Always "Server" 
- **CommandId**: UUID for acknowledgment tracking
- **Parameters**: Complete current settings (all parameters)
- **Changed**: Object showing which settings were modified in this update

## Key Features

1. **Complete Payload Transmission**: Even when updating a single setting, the entire current device configuration is sent.

2. **Memory-Based Settings Storage**: The server maintains current device settings in memory for fast access.

3. **Change Tracking**: The system tracks which specific settings changed in each update.

4. **Acknowledgment Support**: All settings updates support device acknowledgment with timeout handling.

5. **Backward Compatibility**: Supports both parameter naming conventions (camelCase and "Spaced Names").

## Usage Examples

### Example 1: Get Current Settings
```bash
curl -X GET http://localhost:5000/api/devices/123/settings
```

### Example 2: Update Multiple Settings
```bash
curl -X POST http://localhost:5000/api/devices/123/settings \
  -H "Content-Type: application/json" \
  -d '{
    "Parameters": {
      "Electrode": 2,
      "Shunt Voltage": 30,
      "Reference Fail": 40
    }
  }'
```

### Example 3: Update Single Setting (Sends Complete Payload)
```bash
curl -X POST http://localhost:5000/api/devices/123/settings/single \
  -H "Content-Type: application/json" \
  -d '{
    "setting": "Electrode",
    "value": 1
  }'
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- **200**: Success
- **400**: Bad request (missing parameters)
- **500**: Server error

Error responses include descriptive messages:
```json
{
  "success": false,
  "message": "Settings Parameters are required"
}
```

## Testing

Use the provided test script to verify functionality:
```bash
node test-complete-settings.js
```

This will test all endpoints and demonstrate that complete payloads are sent even for single setting changes.