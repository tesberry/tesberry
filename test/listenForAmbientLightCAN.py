import can
import cantools
from pprint import pprint

# Load DBC file
db = cantools.database.load_file('Model3CAN.dbc')

class VehicleControlListener(can.Listener):
    def on_message_received(self, msg):
        vehicleControl = db.get_message_by_name('ID273UI_vehicleControl')
        lighting = db.get_message_by_name('ID3F5VCFRONT_lighting')

        # Check if message is vehicleControl
        if msg.arbitration_id == vehicleControl.frame_id:
            # Print incoming
            vehicle_control_data = db.decode_message(msg.arbitration_id, msg.data)
            pprint('Enabled: {}'.format(vehicle_control_data['UI_ambientLightingEnabled']))
            return

        if msg.arbitration_id == lighting.frame_id:
            lighting_data = db.decode_message(msg.arbitration_id, msg.data)
            pprint('Brightness: {}'.format(lighting_data['VCFRONT_ambientLightingBrightnes']))
            return

# Connect to CAN bus and receive messages
bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=500000)
message = bus.recv()

# Listen for ID273UI_vehicleControl message
vehicleControlListener = VehicleControlListener()
vehicleControlListener.on_message_received(message)



