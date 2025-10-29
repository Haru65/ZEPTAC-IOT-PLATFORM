# Enhanced Alarm System Integration Guide

This document outlines the enhanced alarm system integration based on the requirements from your handwritten notes.

## 🚀 Features Implemented

### 📊 Enhanced Alarm Structure
- **Unit Number**: Unique identifier for each device unit
- **Location**: Physical location of the alarm
- **Date & Time**: Automatic timestamp management
- **Alarm Type**: Categorized alarm types (Critical Temperature, Pressure Drop, etc.)
- **PV1-PV6 Values**: Process variable monitoring with 6 data points
- **Device Links**: Direct navigation to device details

### 🎨 Color-coded Device Status
- **Red (Critical)**: 3+ active alarms
- **Orange (Warning)**: 2 active alarms  
- **Yellow (Info)**: 1 active alarm
- **Green (OK)**: No alarms, normal operation
- **Blue (Battery)**: Device running on backup power

### 📱 Communication Features
- **SMS Notifications**: Send alarm alerts to multiple phone numbers
- **Email Notifications**: Rich HTML emails with alarm details
- **Bulk Notifications**: Send both SMS and email simultaneously

## 🗂️ File Structure

### Frontend Components
```
src/
├── components/
│   └── iot/
│       └── DeviceStatusDashboard.vue     # Color-coded device status dashboard
├── views/apps/iot/alarms/
│   ├── AlarmListing.vue                  # Enhanced alarm listing with new fields
│   └── AlarmAddModal.vue                 # Enhanced form with PV values & notifications
├── services/
│   └── alarm.service.ts                  # Frontend API service for alarms
└── router/
    └── index.ts                          # Updated with device status route
```

### Backend Components
```
BACKEND/
├── controller/
│   └── alarmController.js                # Enhanced alarm CRUD & notifications
├── services/
│   └── notificationService.js            # SMS & Email notification service
└── routes/
    ├── alarm.js                          # Alarm API routes
    └── index.js                          # Updated route mounting
```

## 🔧 Setup Instructions

### 1. Environment Variables
Add these to your `.env` file in the BACKEND folder:

```env
# Twilio SMS Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration
EMAIL_USER=your_email@domain.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=noreply@zeptac.com

# Frontend URL for links in notifications
FRONTEND_URL=http://localhost:5173
```

### 2. Install Dependencies
```bash
# Backend dependencies
cd BACKEND
npm install twilio nodemailer

# Frontend dependencies (if not already installed)
cd ../
npm install moment sweetalert2
```

### 3. Backend API Endpoints

#### Alarm CRUD
- `GET /api/alarms` - Get all alarms
- `GET /api/alarms/:id` - Get specific alarm
- `POST /api/alarms` - Create new alarm
- `PUT /api/alarms/:id` - Update alarm
- `DELETE /api/alarms/:id` - Delete alarm

#### Notifications
- `POST /api/alarms/:id/send-sms` - Send SMS notification
- `POST /api/alarms/:id/send-email` - Send email notification
- `POST /api/alarms/:id/trigger-notification` - Send both SMS & email

#### Dashboard
- `GET /api/alarms/dashboard/device-status` - Get device status summary

## 📋 Alarm Data Structure

### Enhanced Alarm Object
```typescript
interface IAlarm {
  id: number;
  name: string;
  device_name: string;
  unit_no: string;                    // NEW: Unit identifier (U001, U002, etc.)
  location: string;
  parameter: string;
  alarm_type: string;                 // NEW: Categorized alarm type
  status: string;
  severity: 'critical' | 'warning' | 'info' | 'ok' | 'battery';  // NEW
  pv_values: {                        // NEW: Process variables
    pv1: number;
    pv2: number;
    pv3: number;
    pv4: number;
    pv5: number;
    pv6: number;
  };
  notification_config: {              // NEW: Notification settings
    sms_numbers: string[];
    email_ids: string[];
  };
  link: string;                       // NEW: Device details link
  created_at: string;
  last_modified: string;
}
```

## 🎨 UI Enhancements

### Alarm Listing Page
- ✅ Enhanced table with Unit No, Alarm Type, Severity columns
- ✅ Color-coded severity badges with icons
- ✅ PV values display as badges
- ✅ Enhanced action dropdown with notification options
- ✅ Clickable alarm names linking to device details

### Add Alarm Modal
- ✅ Unit Number field
- ✅ Alarm Type field
- ✅ Severity level dropdown
- ✅ Device link field
- ✅ PV1-PV6 value inputs
- ✅ SMS numbers (comma-separated)
- ✅ Email IDs (comma-separated)

### Device Status Dashboard
- ✅ Color-coded device cards based on alarm count
- ✅ Device type icons (sensor, motor, pump, UPS)
- ✅ Alarm count badges
- ✅ PV values preview
- ✅ Last update timestamp
- ✅ Clickable cards for device details

## 📱 Notification Features

### SMS Notifications
- Formatted alarm messages with all details
- Support for multiple phone numbers
- PV values included in message
- Device link for quick access

### Email Notifications
- Rich HTML templates with company branding
- Color-coded severity indicators
- Detailed alarm information
- Interactive device link buttons
- Professional email formatting

### Example SMS Message
```
🚨 ALARM ALERT 🚨
Unit: U001
Location: Room 101
Time: 2025-10-03 14:30:00
Type: Critical Temperature
Device: Sensor A
PV1-PV6: 85.2, 34.1, 12.5, 67.8, 23.4, 45.6
Link: http://localhost:5173/device-details/1
Severity: CRITICAL
```

## 🚦 Testing the Integration

### 1. Start the Backend
```bash
cd BACKEND
node index.js
```

### 2. Start the Frontend
```bash
npm run dev
```

### 3. Test Features
1. Navigate to `/alarms` to see enhanced alarm listing
2. Click "Add Alarm" to test the enhanced form
3. Navigate to `/device-status` to see the color-coded dashboard
4. Test notification features using the action dropdown

## 🔗 Integration Points

### Frontend Routes
- `/alarms` - Enhanced alarm listing
- `/device-status` - Color-coded device dashboard

### Backend Integration
- Replace mock data with your actual device data
- Connect to your existing MQTT/device services
- Integrate with your user authentication system
- Configure real SMS/email services

## 🎯 Next Steps

1. **Real Device Integration**: Replace mock device data with actual IoT device readings
2. **Database Integration**: Replace in-memory storage with proper database
3. **Real-time Updates**: Integrate with WebSocket for live alarm updates
4. **Advanced Filtering**: Add filters by severity, device type, location
5. **Alarm History**: Implement alarm event logging and history tracking
6. **Dashboard Analytics**: Add charts and statistics to the device status dashboard

## 🛠️ Customization

### Adding New Alarm Types
Update the alarm types in `AlarmAddModal.vue` and `alarmController.js`

### Modifying Color Scheme
Update the color mappings in `DeviceStatusDashboard.vue` and `AlarmListing.vue`

### Custom Notification Templates
Modify the message formats in `notificationService.js`

This enhanced alarm system provides a comprehensive solution for monitoring, managing, and communicating device alarms with color-coded visual feedback and multi-channel notifications.