# PowerShell script to send complete settings payload via curl

Write-Host "🚀 Sending complete settings payload to device 123..." -ForegroundColor Green

$settingsPayload = @{
    electrode = 0
    shuntVoltage = 25
    shuntCurrent = 999
    referenceFail = 30
    referenceUP = 300
    referenceOV = 60
    interruptOnTime = 100
    interruptOffTime = 100
    interruptStartTimestamp = "2025-02-20 19:04:00"
    interruptStopTimestamp = "2025-02-20 19:05:00"
    dpolInterval = "00:00:00"
    depolarizationStartTimestamp = "2025-02-20 19:04:00"
    depolarizationStopTimestamp = "2025-02-20 19:05:00"
    instantMode = 0
    instantStartTimestamp = "19:04:00"
    instantEndTimestamp = "00:00:00"
} | ConvertTo-Json

Write-Host "📋 Settings Configuration:" -ForegroundColor Cyan
Write-Host $settingsPayload

Write-Host "`n📤 Making API call to settings endpoint..." -ForegroundColor Yellow

# Use curl to send the settings payload
$curlCommand = @"
curl -X POST http://localhost:3000/api/devices/123/config/settings `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer your-jwt-token-here" `
  -d '$($settingsPayload)'
"@

Write-Host "Command to run:" -ForegroundColor Magenta
Write-Host $curlCommand

Write-Host "`n💡 This will send the complete MQTT payload format:" -ForegroundColor Green
Write-Host @"
{
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
}
"@ -ForegroundColor White

Write-Host "`n🔧 Usage:" -ForegroundColor Yellow
Write-Host "1. Make sure your backend server is running (node index.js)" -ForegroundColor White
Write-Host "2. Replace 'your-jwt-token-here' with a valid JWT token" -ForegroundColor White
Write-Host "3. Run the curl command above" -ForegroundColor White