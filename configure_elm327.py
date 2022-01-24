import obd

# Connect to ELM327 OBD Adapter
connection = obd.OBD(protocol=6)
print(connection.query(obd.commands.ELM_VERSION))

# set protocol 6
connection.interface._ELM327__send(b"AT SP 6") # set protocol 6

# filter relevant CAN IDs
connection.interface._ELM327__send(b"AT CF 273") # filter start ID
connection.interface._ELM327__send(b"AT CM 273") # mask end ID

connection.close()
