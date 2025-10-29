# MQTT Message Sending Feature

This documentation explains the new MQTT message sending functionality that allows you to send text messages to MQTT devices directly from the frontend.

## Features

### 1. Individual Device Messages
- Send messages to the currently active device
- Available in the Device Details view (`DeviceDetails.vue`)
- Shows message history and delivery status

### 2. Broadcast Messages
- Send messages to all connected MQTT devices simultaneously
- Available in the main Devices view (`Devices.vue`)
- Includes message templates for common scenarios
- Shows broadcast history with delivery status

## How to Use

### From Device Details Page
1. Navigate to any device details page
2. Scroll down to the "Send Message to Device" section
3. Choose message type:
   - **Individual**: Send to current device only
   - **Broadcast**: Send to all devices
4. Enter your message in the text area
5. Click "Send Message" or press Ctrl+Enter

### From Main Devices Page
1. Go to the main Devices listing page
2. Click "Broadcast Message" button to show the broadcast panel
3. Use quick templates or enter a custom message
4. Click "Broadcast to All Devices"

## Message Templates (Broadcast)
- **System Maintenance**: For scheduled maintenance notifications
- **Emergency Alert**: For urgent device status checks
- **Status Check**: Request status reports from devices
- **Test Message**: For testing communication
- **Power Conservation**: Battery saving mode instructions

## Technical Implementation

### Frontend Components
- `DeviceDetails.vue`: Individual device messaging
- `BroadcastMessage.vue`: Broadcast functionality component
- `mqtt.service.ts`: MQTT service wrapper

### Backend Endpoints
- **Socket.io Event**: `sendMessage` - Real-time message sending
- **REST API**: `POST /api/send-message` - HTTP endpoint for message sending

### MQTT Topics
Messages are published to command topics:
- Original device: `devices/234/command`
- Simulated device: `devices/123/command`

### Message Format
```json
{
  "message": "Your message text",
  "timestamp": "2025-09-20T10:30:00.000Z",
  "sender": "frontend",
  "type": "individual|broadcast"
}
```

## Connection Status
- **Green**: Connected to backend server, messages can be sent
- **Red**: Disconnected, messages cannot be sent

## Message History
Both individual and broadcast views maintain a history of sent messages with:
- Timestamp
- Message content
- Delivery status (sending/sent/failed)
- Target type (individual/broadcast)

## Error Handling
- Connection status validation
- Message text validation
- MQTT broker availability checks
- Graceful error reporting to user interface

## Testing the Feature

### Prerequisites
1. Backend server running on port 3001
2. MQTT brokers accessible:
   - `mqtt://test.mosquitto.org` (original device)
   - `mqtt://broker.zeptac.com:1883` (simulated device)

### Test Steps
1. Start the backend: `node BACKEND/index.js`
2. Start the frontend: `npm run dev`
3. Navigate to device details or devices listing
4. Send test messages and verify delivery status
5. Check browser console for detailed logs

## API Usage Example

### Using REST API
```bash
curl -X POST http://localhost:3001/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test message",
    "type": "broadcast"
  }'
```

### Response
```json
{
  "success": true,
  "messageId": "msg_1695204600000",
  "details": "Sent to 2/2 targets"
}
```

## Troubleshooting

### Common Issues
1. **Messages not sending**: Check backend connection status
2. **MQTT broker errors**: Verify broker URLs and credentials
3. **Frontend not connecting**: Ensure backend is running on port 3001
4. **No response from devices**: Check MQTT topic subscriptions

### Debug Logs
Enable detailed logging in:
- Browser console (frontend)
- Backend terminal output
- MQTT broker logs (if accessible)

## Future Enhancements
- Message scheduling
- Device groups for targeted broadcasting
- Message acknowledgment from devices
- Rich message formats (JSON payloads)
- Message encryption for security