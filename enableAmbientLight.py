import can
import cantools
from pprint import pprint

# Load DBC file
db = cantools.database.load_file('Model3CAN.dbc')

# Connect to CAN bus and 
bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=500000)

class VehicleControlListener(can.Listener):
    def on_message_received(self, msg):
        vehicle_control = db.get_message_by_name('ID273UI_vehicleControl')

        # Check if message is vehicleControl
        if msg.arbitration_id == vehicle_control.frame_id:
            # Get all signals and change ambientLightEnabled to 1 if 0
            vehicle_control_data = db.decode_message(msg.arbitration_id, msg.data)
            pprint(vehicle_control_data['UI_ambientLightingEnabled'])
            if vehicle_control_data['UI_ambientLightingEnabled'] == 1: return
            vehicle_control_data['UI_ambientLightingEnabled'] = 1

            # Send new ID273UI_vehicleControl message
            vehicle_control_data = vehicle_control.encode(vehicle_control_data)
            pprint(vehicle_control_data)
            vehicle_control_msg = can.Message(arbitration_id=vehicle_control.frame_id,data=vehicle_control_data,is_extended_id=False)
            try:
                bus.send(vehicle_control_msg)
                pprint('Message sent on {}'.format(bus.channel_info))
            except can.CanError:
                pprint('Message not sent')

# Receive messages
message = bus.recv()

# Listen for ID273UI_vehicleControl message
vehicleControlListener = VehicleControlListener()
vehicleControlListener.on_message_received(message)
