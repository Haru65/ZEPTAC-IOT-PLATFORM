const axios = require('axios');

// Test script to demonstrate the complete settings functionality
const BASE_URL = 'http://localhost:5000/api';
const DEVICE_ID = '123';

async function testCompleteSettings() {
  try {
    console.log('🧪 Testing Complete Device Settings Functionality\n');

    // Test 1: Get current device settings
    console.log('📖 Test 1: Getting current device settings...');
    try {
      const response = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/settings`);
      console.log('✅ Current settings retrieved:');
      console.log(JSON.stringify(response.data.data, null, 2));
    } catch (error) {
      console.log('❌ Error getting settings:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 2: Update a single setting (should send entire payload)
    console.log('🔧 Test 2: Updating a single setting (Electrode from 0 to 1)...');
    try {
      const response = await axios.post(`${BASE_URL}/devices/${DEVICE_ID}/settings/single`, {
        setting: 'Electrode',
        value: 1
      });
      console.log('✅ Single setting update response:');
      console.log(JSON.stringify(response.data, null, 2));
      
      // Wait a moment then check the settings again
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedSettings = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/settings`);
      console.log('\n📊 Updated settings after single change:');
      console.log(JSON.stringify(updatedSettings.data.data, null, 2));
    } catch (error) {
      console.log('❌ Error updating single setting:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 3: Update multiple settings at once
    console.log('🔧 Test 3: Updating multiple settings...');
    try {
      const settingsUpdate = {
        Parameters: {
          "Electrode": 2,
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
      };

      const response = await axios.post(`${BASE_URL}/devices/${DEVICE_ID}/settings`, settingsUpdate);
      console.log('✅ Multiple settings update response:');
      console.log(JSON.stringify(response.data, null, 2));

      // Wait a moment then check the settings again
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const finalSettings = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/settings`);
      console.log('\n📊 Final settings after multiple changes:');
      console.log(JSON.stringify(finalSettings.data.data, null, 2));
    } catch (error) {
      console.log('❌ Error updating multiple settings:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(60) + '\n');

    // Test 4: Another single setting change to verify complete payload is sent
    console.log('🔧 Test 4: Updating another single setting (Instant Mode from 1 to 0)...');
    try {
      const response = await axios.post(`${BASE_URL}/devices/${DEVICE_ID}/settings/single`, {
        setting: 'Instant Mode',
        value: 0
      });
      console.log('✅ Another single setting update response:');
      console.log(JSON.stringify(response.data, null, 2));
      
      // Wait a moment then check the settings again
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const finalSettings = await axios.get(`${BASE_URL}/devices/${DEVICE_ID}/settings`);
      console.log('\n📊 Final settings after last single change:');
      console.log(JSON.stringify(finalSettings.data.data, null, 2));
    } catch (error) {
      console.log('❌ Error updating single setting:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('🚨 Test failed:', error.message);
  }
}

// Run the test
console.log('🚀 Starting Complete Settings Test...\n');
testCompleteSettings()
  .then(() => {
    console.log('\n✅ All tests completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test suite failed:', error);
    process.exit(1);
  });