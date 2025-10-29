// REST API example to send complete settings payload
// This assumes your backend server is running on localhost:3000

const axios = require('axios');

async function sendCompleteSettings() {
    try {
        console.log('🚀 Sending complete settings payload via REST API...');
        
        const settingsPayload = {
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
        };
        
        console.log('📋 Settings Configuration:');
        console.log(JSON.stringify(settingsPayload, null, 2));
        console.log('');
        
        // Make API call to the settings endpoint
        const response = await axios.post(
            'http://localhost:3000/api/devices/123/config/settings',
            settingsPayload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-jwt-token-here' // Replace with actual token
                }
            }
        );
        
        console.log('✅ API Response:');
        console.log(JSON.stringify(response.data, null, 2));
        
        console.log('');
        console.log('📤 This sends the complete MQTT payload:');
        console.log(`{
  "Device ID": "123",
  "Message Type": "settings",
  "sender": "Server",
  "CommandId": "${response.data.commandId || '[generated-uuid]'}",
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
        if (error.response) {
            console.error('❌ API Error Response:', error.response.status, error.response.data);
        } else {
            console.error('❌ Error:', error.message);
        }
    }
}

// Run if executed directly
if (require.main === module) {
    sendCompleteSettings();
}

module.exports = { sendCompleteSettings };