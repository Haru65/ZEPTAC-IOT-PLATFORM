const mqttService = require('./BACKEND/services/mqttService');

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
    interruptStartTimestamp: '2025-02-20 19:04:00',
    interruptStopTimestamp: '2025-02-20 19:05:00',
    dpolInterval: '00:00:00',
    depolarizationStartTimestamp: '2025-02-20 19:04:00',
    depolarizationStopTimestamp: '2025-02-20 19:05:00',
    instantMode: 0,
    instantStartTimestamp: '19:04:00',
    instantEndTimestamp: '00:00:00'
};

console.log('🚀 Sending settings update to device 123...');
console.log('📋 Settings Configuration:');
console.log(JSON.stringify(settingsConfig, null, 2));
console.log('');

// Initialize MQTT service (with mock Socket.IO for this test)
const mockSocketIO = {
    emit: (event, data) => {
        console.log(`📡 Socket.IO Event: ${event}`);
        console.log(`📄 Data:`, JSON.stringify(data, null, 2));
    }
};

try {
    mqttService.initialize(mockSocketIO);
    console.log('✅ MQTT Service initialized');
    
    // Wait a moment for connection, then send settings
    setTimeout(async () => {
        try {
            console.log('📤 Sending settings configuration...');
            const result = await mqttService.setSettingsConfiguration('123', settingsConfig);
            
            console.log('');
            console.log('✅ Settings sent successfully!');
            console.log('📋 Result:', JSON.stringify(result, null, 2));
            console.log('');
            console.log('📤 Expected MQTT Payload sent to device:');
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
            console.error('❌ Error sending settings:', error.message);
        }
        
        // Wait for potential acknowledgment, then disconnect
        console.log('');
        console.log('⏳ Waiting 10 seconds for device acknowledgment...');
        setTimeout(() => {
            console.log('🔚 Disconnecting from MQTT broker');
            mqttService.disconnect();
            process.exit(0);
        }, 10000);
    }, 3000);
    
} catch (error) {
    console.error('❌ Error initializing MQTT service:', error.message);
    process.exit(1);
}