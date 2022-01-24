# Connect to bluetooth ELM327 and serial bus
def connect():
    return

def pair():
    nearby_devices = bluetooth.discover_devices(lookup_names=True)
    print("Found {} devices.".format(len(nearby_devices)))
    return

pair()
