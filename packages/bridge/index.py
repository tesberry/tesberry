#!/usr/bin/env python

import os
import asyncio
import atexit
import can
import cantools
import jsonpickle
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
from dotenv import load_dotenv
import sys
import signal

load_dotenv()
notifier = None
cache = {}
vehicle_can = os.getenv('VEHICLE_CAN', 'can0')

if vehicle_can.startswith('v'):
    # Setting up a virtual interface
    os.system('modprobe vcan')
    os.system('ip link add {} type vcan bitrate 500000'.format(vehicle_can))
    os.system('ip link set {} up'.format(vehicle_can))
else:
    # Connect to physical interface
    os.system('ip link set {} type can bitrate 500000'.format(vehicle_can))
    os.system('ifconfig {} up'.format(vehicle_can))

bus = can.interface.Bus(bustype='socketcan', channel=vehicle_can, bitrate=500000)
db = cantools.database.load_file('./db/Model3CAN.dbc')

def initMQTT():
    # The callback for when the client receives a CONNACK response from the server.
    def on_connect(client, userdata, flags, rc):
        print('MQTT connected')

        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.
        client.subscribe('$SYS/#')
        client.subscribe('tesberry/+/+/SET')
        publish.single('tesberry/bridge/status', 'online')

    def on_disconnect(client, userdata, rc):
        print('MQTT disconnected')
        publish.single('tesberry/bridge/status', 'offline')

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect(os.getenv('MQTT_HOST', 'localhost'))
    return client

def onMQTTMessage(client, userdata, msg):
    if msg.topic.endswith('/SET'):
        topic = msg.topic.split('/')
        payload = jsonpickle.decode(msg.payload)
        details = db.get_message_by_name(topic[2])
        # Combine payload with cached data
        data = cache.get(details.frame_id) | payload
        hexData = details.encode(data)
        can_message = can.Message(arbitration_id=details.frame_id, data=hexData, is_extended_id=False)
        try:
            bus.send(can_message)
            print('CAN message sent')
        except can.CanError:
            print('CAN message not sent')

mqttc = initMQTT()
mqttc.on_message = onMQTTMessage

@atexit.register
def closeConnection():
    if vehicle_can.startswith('v'):
        # Remove virtual interface
        os.system('ip link delete {}'.format(vehicle_can))
    else:
        # Disconnect to physical interface
        os.system('ifconfig {} down'.format(vehicle_can))
    notifier.stop()
    mqttc.loop_stop()
    mqttc.disconnect()
    print('Connection closed.')

def onCANMessage(msg: can.Message):
    try:
        details = db.get_message_by_frame_id(msg.arbitration_id)
    except:
        pass
    else:
        try:
            data = db.decode_message(msg.arbitration_id, msg.data)
        except:
            pass
            # print('Decoding message failed for ID {}'.format(msg.arbitration_id))
        else:
            cache[msg.arbitration_id] = data
            publish.single('/'.join(['tesberry', details.senders[0], details.name]) , jsonpickle.encode(data, unpicklable=False, max_depth=1).replace('"\'', '"').replace('\'"', '"'))

async def main():
    '''The main function that runs in the loop.'''

    reader = can.AsyncBufferedReader()

    listeners = [
        onCANMessage,  # Callback function
        reader,  # AsyncBufferedReader() listener
    ]

    # Create Notifier with an explicit loop to use for scheduling of callbacks
    loop = asyncio.get_running_loop()
    global notifier
    notifier = can.Notifier(bus, listeners, loop=loop)

    try:
        mqttc.loop_start()
        while True:
            # Wait for next message from AsyncBufferedReader
            await reader.get_message()

    except KeyboardInterrupt:
        print('Closing Loop')
        pass

if __name__ == "__main__":
    asyncio.run(main())
