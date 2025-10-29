const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/device-config';
const DEVICE_ID = '123';

// Test all different configuration methods to ensure they all send complete settings
async function testAllConfigMethods() {
  console.log('🧪 Testing All Configuration Methods - Complete Settings Integration');
  console.log('=====================================================================');
  
  try {
    console.log('\n1️⃣ Testing Manual Mode (should send complete settings)...');
    const manualResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/manual`, {
      action: 'start'
    });
    console.log('✅ Manual Mode Response:', manualResponse.data);
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n2️⃣ Testing Interrupt Mode (should send complete settings)...');
    const interruptResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/interrupt`, {
      startDate: '2025-10-30',
      startTime: '10:00:00',
      stopDate: '2025-10-30',
      stopTime: '18:00:00',
      onTime: 120,
      offTime: 80
    });
    console.log('✅ Interrupt Mode Response:', interruptResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n3️⃣ Testing Electrode Configuration (should send complete settings)...');
    const electrodeResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/electrode`, {
      electrodeType: 1
    });
    console.log('✅ Electrode Response:', electrodeResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n4️⃣ Testing Timer Configuration (should send complete settings)...');
    const timerResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/timer`, {
      ton: 150,
      toff: 90
    });
    console.log('✅ Timer Response:', timerResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n5️⃣ Testing DPOL Mode (should send complete settings)...');
    const dpolResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/dpol`, {
      startDate: '2025-10-30',
      startTime: '08:00:00',
      endDate: '2025-10-30',
      endTime: '20:00:00'
    });
    console.log('✅ DPOL Mode Response:', dpolResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n6️⃣ Testing Alarm Configuration (should send complete settings)...');
    const alarmResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/alarm`, {
      "Reference Fail": 35,
      "Reference UP": 320,
      "Reference OV": 65
    });
    console.log('✅ Alarm Response:', alarmResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n7️⃣ Testing Single Setting Update (should send complete settings)...');
    const singleSettingResponse = await axios.post(`${BASE_URL}/${DEVICE_ID}/setting`, {
      setting: 'Shunt Voltage',
      value: 30
    });
    console.log('✅ Single Setting Response:', singleSettingResponse.data);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('\n8️⃣ Getting Current Device Settings...');
    const settingsResponse = await axios.get(`${BASE_URL}/${DEVICE_ID}/settings`);
    console.log('✅ Current Settings Response:', JSON.stringify(settingsResponse.data, null, 2));
    
    console.log('\n🎉 All tests completed! Check the server logs to see that ALL methods now send complete settings payloads.');
    console.log('📋 Expected behavior: Every API call should result in a message like:');
    console.log('   {"Device ID":"123","Message Type":"settings","sender":"Server","CommandId":"...","Parameters":{...complete settings...}}');
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Test specific single parameter update
async function testSingleParameterUpdate() {
  console.log('\n\n🔧 Testing Single Parameter Update Scenario');
  console.log('=============================================');
  
  try {
    console.log('🔄 Updating just the "Electrode" parameter from 0 to 1...');
    
    const response = await axios.post(`${BASE_URL}/${DEVICE_ID}/setting`, {
      setting: 'Electrode',
      value: 1
    });
    
    console.log('✅ Response:', response.data);
    console.log('📤 This should have sent the COMPLETE settings payload with Electrode=1');
    console.log('📋 Check server logs for the full payload with all parameters!');
    
  } catch (error) {
    console.error('❌ Single parameter test failed:', error.response?.data || error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting Complete Settings Integration Test');
  console.log('📡 Make sure the backend server is running on port 3000');
  console.log('🔍 Monitor the server console to see the complete settings payloads being sent');
  
  await testAllConfigMethods();
  await testSingleParameterUpdate();
  
  console.log('\n✨ Test suite completed!');
  console.log('💡 Key points to verify:');
  console.log('   1. ALL configuration changes send complete settings payload');
  console.log('   2. Message Type is always "settings"');
  console.log('   3. Parameters contain ALL device settings, not just changed ones');
  console.log('   4. Device can validate the complete parameter list');
}

main().catch(console.error);