// Test script to send complete settings payload
const express = require('express');
const app = express();
app.use(express.json());

// Import the device controller
const DeviceController = require('./BACKEND/controller/deviceController');
const mqttService = require('./BACKEND/services/mqttService');

// Initialize MQTT service
const mockSocketIO = {
    emit: (event, data) => {
        console.log(`📡 Socket.IO Event: ${event}`);
        console.log(`📄 Data:`, JSON.stringify(data, null, 2));
    }
};

console.log('🚀 Initializing MQTT service...');
mqttService.initialize(mockSocketIO);

// Wait for MQTT connection, then send settings
setTimeout(async () => {
    console.log('📤 Sending complete settings payload...');
    
    // Create a mock request and response
    const req = {
        params: { deviceId: '123' },
        body: {
            electrode: 0,
            shuntVoltage: 25,
            shuntCurrent: 999,
            referenceFail: 30,
            referenceUP: 300,
            referenceOV: 60,
            interruptOnTime: 100,
            interruptOffTime: 100,
            interruptStartTimestamp: "2025-02-20 19:04:00",
            interruptStopTimestamp: "2025-02-20 19:05:00",
            dpolInterval: "00:00:00",
            depolarizationStartTimestamp: "2025-02-20 19:04:00",
            depolarizationStopTimestamp: "2025-02-20 19:05:00",
            instantMode: 0,
            instantStartTimestamp: "19:04:00",
            instantEndTimestamp: "00:00:00"
        }
    };
    
    const res = {
        json: (data) => {
            console.log('✅ Response:', JSON.stringify(data, null, 2));
        },
        status: (code) => ({
            json: (data) => {
                console.log(`❌ Error Response (${code}):`, JSON.stringify(data, null, 2));
            }
        })
    };
    
    console.log('📋 Input Settings Configuration:');
    console.log(JSON.stringify(req.body, null, 2));
    console.log('');
    
    try {
        // Call the settings endpoint instead of manual
        await DeviceController.setSettingsMode(req, res);
        
        console.log('');
        console.log('📤 This will send the complete payload format:');
        console.log(`{
  "Device ID": "123",
  "Message Type": "settings",
  "sender": "Server",
  "CommandId": "[generated-uuid]",
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
}`);
        
    } catch (error) {
        console.error('❌ Error sending settings:', error.message);
    }
    
    // Wait for potential acknowledgment, then disconnect
    console.log('');
    console.log('⏳ Waiting 5 seconds for device acknowledgment...');
    setTimeout(() => {
        console.log('🔚 Disconnecting from MQTT broker');
        mqttService.disconnect();
        process.exit(0);
    }, 5000);
    
}, 3000);