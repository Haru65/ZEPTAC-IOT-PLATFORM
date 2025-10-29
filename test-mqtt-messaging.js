#!/usr/bin/env node

// Simple test script to verify MQTT message sending functionality
const io = require('socket.io-client');

const socket = io('http://localhost:3001', {
  withCredentials: true,
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('✅ Connected to backend server');
  
  // Test individual message
  const testMessage = {
    text: 'Test message from script',
    type: 'individual',
    targetDevice: '123',
    timestamp: new Date().toISOString()
  };
  
  console.log('📤 Sending test message:', testMessage.text);
  
  socket.emit('sendMessage', testMessage, (response) => {
    console.log('📨 Response:', response);
    
    if (response.success) {
      console.log('✅ Message sent successfully!');
      
      // Test broadcast message
      const broadcastMessage = {
        text: 'Test broadcast message',
        type: 'broadcast',
        targetDevice: 'all',
        timestamp: new Date().toISOString()
      };
      
      console.log('📡 Sending broadcast message:', broadcastMessage.text);
      
      socket.emit('sendMessage', broadcastMessage, (broadcastResponse) => {
        console.log('📨 Broadcast Response:', broadcastResponse);
        
        if (broadcastResponse.success) {
          console.log('✅ Broadcast sent successfully!');
        } else {
          console.log('❌ Broadcast failed:', broadcastResponse.error);
        }
        
        console.log('🏁 Test completed');
        process.exit(0);
      });
    } else {
      console.log('❌ Message failed:', response.error);
      process.exit(1);
    }
  });
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from backend server');
});

socket.on('connect_error', (error) => {
  console.log('❌ Connection error:', error.message);
  process.exit(1);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log('⏰ Test timeout');
  process.exit(1);
}, 10000);

console.log('🔌 Connecting to backend server...');