import paho.mqtt.client as mqtt
import json
import time
from datetime import datetime

class DeviceSimulator:
    def __init__(self, device_id="123"):
        self.device_id = device_id
        self.client = mqtt.Client(client_id=f"simulator_{self.device_id}")
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        
        # MQTT Broker configuration
        self.broker = "broker.zeptac.com"
        self.port = 1883
        self.username = "zeptac_iot"
        self.password = "ZepIOT@123"
        
        # Topics
        self.command_topic = f"devices/{self.device_id}/commands"
        self.ack_topic = f"devices/{self.device_id}/config/ack"
        self.data_topic = f"devices/{self.device_id}/data"
        self.status_topic = f"devices/{self.device_id}/status"
        
        # Device state
        self.current_mode = "normal"
        self.device_status = "online"

    def on_connect(self, client, userdata, flags, rc):
        print(f"✅ Device Simulator connected with result code {rc}")
        
        # Subscribe to commands topic
        client.subscribe(self.command_topic, qos=1)
        print(f"📥 Subscribed to {self.command_topic}")
        
        # Send online status
        self.send_status("online")

    def on_message(self, client, userdata, msg):
        try:
            topic = msg.topic
            payload = json.loads(msg.payload.decode())
            
            print(f"\n🔥 COMMAND RECEIVED:")
            print(f"📍 Topic: {topic}")
            print(f"📄 Payload: {json.dumps(payload, indent=2)}")
            
            # Process the command
            if topic == self.command_topic:
                self.process_command(payload)
                
        except Exception as e:
            print(f"❌ Error processing message: {e}")

    def process_command(self, payload):
        command_id = payload.get('commandId')
        command = payload.get('command')
        parameters = payload.get('parameters', {})
        
        print(f"🔧 Processing command: {command}")
        
        success = True
        message = ""
        
        try:
            if command == 'interrupt_mode':
                success, message = self.configure_interrupt_mode(parameters)
            elif command == 'manual_mode':
                success, message = self.configure_manual_mode(parameters)
            elif command == 'normal_mode':
                success, message = self.configure_normal_mode(parameters)
            elif command == 'dpol_mode':
                success, message = self.configure_dpol_mode(parameters)
            elif command == 'inst_mode':
                success, message = self.configure_inst_mode(parameters)
            elif command == 'timer_config':
                success, message = self.configure_timer(parameters)
            elif command == 'electrode_config':
                success, message = self.configure_electrode(parameters)
            elif command == 'alarm_config':
                success, message = self.configure_alarm(parameters)
            else:
                success = False
                message = f"Unknown command: {command}"
                
        except Exception as e:
            success = False
            message = f"Configuration error: {str(e)}"
        
        # Send acknowledgment
        self.send_acknowledgment(command_id, success, message)

    def configure_interrupt_mode(self, params):
        print(f"⚙️ Configuring Interrupt Mode:")
        print(f"   Start: {params.get('startDate')} {params.get('startTime')}")
        print(f"   Stop: {params.get('stopDate')} {params.get('stopTime')}")
        print(f"   Timing: ON={params.get('onTime')}s, OFF={params.get('offTime')}s")
        
        self.current_mode = "interrupt"
        
        # Simulate configuration validation
        if int(params.get('onTime', 0)) <= 0 or int(params.get('offTime', 0)) <= 0:
            return False, "Invalid timing parameters: ON and OFF times must be greater than 0"
        
        return True, "Interrupt mode configured successfully"

    def configure_manual_mode(self, params):
        action = params.get('action')
        print(f"🎮 Manual Mode Action: {action}")
        
        if action == 'start':
            print("▶️ Device started manually")
            self.device_status = "running"
        elif action == 'stop':
            print("⏹️ Device stopped manually")
            self.device_status = "stopped"
        else:
            return False, f"Invalid manual action: {action}"
        
        self.current_mode = "manual"
        return True, f"Manual {action} executed successfully"

    def configure_normal_mode(self, params):
        print("🔄 Configuring Normal Mode")
        self.current_mode = "normal"
        self.device_status = "online"
        return True, "Normal mode activated"

    def configure_dpol_mode(self, params):
        print(f"📊 Configuring DPOL Mode:")
        print(f"   Start: {params.get('startDate')} {params.get('startTime')}")
        print(f"   End: {params.get('endDate')} {params.get('endTime')}")
        
        self.current_mode = "dpol"
        return True, "DPOL mode configured successfully"

    def configure_inst_mode(self, params):
        print(f"⚡ Configuring INST Mode:")
        print(f"   Start: {params.get('startDate')} {params.get('startTime')}")
        print(f"   Duration: {params.get('duration')}")
        
        self.current_mode = "inst"
        return True, "INST mode configured successfully"

    def configure_timer(self, params):
        print(f"⏰ Configuring Timer:")
        print(f"   TON: {params.get('ton', {})}")
        print(f"   TOFF: {params.get('toff', {})}")
        
        return True, "Timer configuration applied successfully"

    def configure_electrode(self, params):
        electrode_type = params.get('type')
        print(f"🔌 Configuring Electrode: {electrode_type}")
        
        valid_types = ['CuCuSO4', 'Zinc', 'AgAgSO4', 'Custom']
        if electrode_type not in valid_types:
            return False, f"Invalid electrode type: {electrode_type}"
        
        return True, f"Electrode configured to {electrode_type}"

    def configure_alarm(self, params):
        print(f"🚨 Configuring Alarms: {params}")
        return True, "Alarm configuration applied successfully"

    def send_acknowledgment(self, command_id, success, message):
        ack_payload = {
            "commandId": command_id,
            "status": "success" if success else "error",
            "message": message,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "deviceId": self.device_id
        }
        
        print(f"\n📤 SENDING ACKNOWLEDGMENT:")
        print(f"📍 Topic: {self.ack_topic}")
        print(f"📄 Payload: {json.dumps(ack_payload, indent=2)}")
        
        self.client.publish(
            self.ack_topic, 
            json.dumps(ack_payload), 
            qos=1, 
            retain=False
        )
        
        if success:
            print("✅ Configuration acknowledgment sent successfully")
        else:
            print("❌ Configuration error acknowledgment sent")

    def send_status(self, status):
        status_payload = {
            "status": status,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "clientId": self.device_id,
            "mode": self.current_mode
        }
        
        self.client.publish(
            self.status_topic, 
            json.dumps(status_payload), 
            qos=1, 
            retain=True
        )
        print(f"📊 Status sent: {status}")

    def send_telemetry(self):
        """Send periodic telemetry data"""
        telemetry = {
            "LOG": 33,
            "ACI": "0.0",
            "LONGITUDE": 0,
            "DCI": "0.0", 
            "EVENT": "NORMAL",
            "TimeStamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "ACV": "0.0",
            "OCV": "0.0",
            "REF1": "5.00",
            "REF2": "5.00",
            "API": "AAAA-BBBB-DDDD",
            "SPN": 2999000000130205,
            "LATITUDE": 0,
            "MODE": self.current_mode,
            "STATUS": self.device_status
        }
        
        self.client.publish(
            self.data_topic,
            json.dumps(telemetry),
            qos=0
        )
        print(f"📈 Telemetry sent - Mode: {self.current_mode}, Status: {self.device_status}")

    def connect(self):
        self.client.username_pw_set(self.username, self.password)
        self.client.connect(self.broker, self.port, 60)
        return self.client

    def start(self):
        print(f"🚀 Starting Device Simulator for device {self.device_id}")
        print(f"🔗 Connecting to {self.broker}:{self.port}")
        
        self.connect()
        
        # Start the loop in a separate thread
        self.client.loop_start()
        
        try:
            # Send telemetry every 30 seconds
            while True:
                time.sleep(30)
                self.send_telemetry()
                
        except KeyboardInterrupt:
            print("\n🛑 Stopping simulator...")
            self.send_status("offline")
            self.client.loop_stop()
            self.client.disconnect()
            print("✅ Simulator stopped")

if __name__ == "__main__":
    simulator = DeviceSimulator("123")
    simulator.start()