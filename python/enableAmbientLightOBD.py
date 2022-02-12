import obd
from obd import OBDCommand
from obd.protocols import ECU
import cantools

# Load DBC file
db = cantools.database.load_file('Model3CAN.dbc')
vehicle_control = db.get_message_by_name('ID273UI_vehicleControl')

# Connect to ELM327 OBD Adapter
connection = obd.OBD(protocol=6)
print(connection.query(obd.commands.ELM_VERSION))

connection.interface._ELM327__send(b"AT Z") # reset all
connection.interface._ELM327__send(b"AT E0") # echo off
connection.interface._ELM327__send(b"AT SP 6") # set protocol 6
connection.interface._ELM327__send(b"AT H1") # headers on
#connection.interface._ELM327__send(b"AT CF 273") # use ID filter for vehicle control message
connection.interface._ELM327__send(b"AT CRA 273") # use receive address filter for vehicle control message
connection.interface._ELM327__send(b"AT SH 273") # set header to vehicle control message id
connection.interface._ELM327__send(b"AT AR") # enable automatic receive

def enable_ambient_light(vehicle_control_data):
    if vehicle_control_data['UI_ambientLightingEnabled'] == 1: return
    vehicle_control_data['UI_ambientLightingEnabled'] = 1
    vehicle_control_data = vehicle_control.encode(vehicle_control_data)
    connection.interface._ELM327__send(vehicle_control_data)

# Define OBD Command / CAN Message
def decode_vehicle_control(messages):
    d = messages[0].data # only operate on a single message
    # TODO: check if we need to chop off the bytes
    # d = d[2:] # chop off mode and PID bytes
    vehicle_control_data = db.decode_message(vehicle_control.frame_id, d)
    print(vehicle_control_data)
    return vehicle_control_data

c = OBDCommand(name="VEHICLE_CONTROL",
               desc="Vehicle Control CAN Messages of Tesla Model 3",
               command=None,
               bytes=0,
               decode=decode_vehicle_control,
               ecu=ECU.UNKNOWN,
               fast=True,
               header=b'273')

connection.watch(c, callback=enable_ambient_light, force=True)
connection.start()
