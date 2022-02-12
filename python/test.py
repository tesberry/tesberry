import os
import can
import cantools
from pprint import pprint

os.system('sudo ip link set can0 type can bitrate 500000')
os.system('sudo ifconfig can0 up')

# Load DBC file
db = cantools.database.load_file('../resources/db/Model3CAN.dbc')
vehicle_control = db.get_message_by_name('ID273UI_vehicleControl')

# Connect to CAN bus
bus = can.Bus(bustype='socketcan', channel='can0', bitrate=500000)

class VehicleControlListener(can.Listener):
    def on_message_received(self, msg):
        # Check if message is vehicleControl
        if msg.arbitration_id == vehicle_control.frame_id:
            vehicle_control_data = db.decode_message(msg.arbitration_id, msg.data)
            pprint(vehicle_control_data['UI_ambientLightingEnabled'])
            if vehicle_control_data['UI_ambientLightingEnabled'] == 1: return
            vehicle_control_data['UI_ambientLightingEnabled'] = 1
            vehicle_control_data = vehicle_control.encode(vehicle_control_data)
            vehicle_control_msg = can.Message(arbitration_id=vehicle_control.frame_id,data=vehicle_control_data,is_extended_id=False)
            try:
                bus.send(vehicle_control_msg)
                pprint('Message sent on {}'.format(bus.channel_info))
            except can.CanError:
                pprint('Message not sent')

# Listen for ID273UI_vehicleControl message
vehicleControlListener = VehicleControlListener()

try:
    while True:
        msg = bus.recv(1)
        vehicleControlListener.on_message_received(msg)
except KeyboardInterrupt:
    pass
