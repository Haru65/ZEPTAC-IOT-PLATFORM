// Test script to demonstrate the new settings payload format
const mqttService = require('./BACKEND/services/mqttService');

// Example of sending settings configuration with the new complete payload format
async function testSettingsPayload() {
    try {
        console.log('🧪 Testing Settings Payload Format...\n');

        // Sample settings configuration
        const settingsConfig = {
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

        console.log('📤 Input Configuration:');
        console.log(JSON.stringify(settingsConfig, null, 2));
        console.log('\n');

        // This will generate the complete payload format you requested
        const result = await mqttService.setSettingsConfiguration("123", settingsConfig);

        console.log('✅ Result:');
        console.log(JSON.stringify(result, null, 2));
        console.log('\n');

        console.log('📋 Expected MQTT Payload Format:');
        console.log(`{
  "Device ID": "123",
  "Message Type": "settings",
  "sender": "Server",
  "CommandId": "${result.commandId}",
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
        console.error('❌ Error testing settings payload:', error);
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    testSettingsPayload();
}

module.exports = { testSettingsPayload };