#!/usr/bin/env python

import asyncio
import can
import cantools
import json
import jsonpickle
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

# os.system('sudo ip link set can0 type can bitrate 500000')
# os.system('sudo ifconfig can0 up')

db = cantools.database.load_file('../../resources/db/Model3CAN.dbc')

def initMQTT():
    # The callback for when the client receives a CONNACK response from the server.
    def on_connect(client, userdata, flags, rc):
        print('Connected with result code '+str(rc))

        # Subscribing in on_connect() means that if we lose the connection and
        # reconnect then subscriptions will be renewed.
        client.subscribe('$SYS/#')
        publish.single('tesberry/bridge/status', 'online')

    def on_disconnect(client, userdata, rc):
        print('Disconnected with result code '+str(rc))
        publish.single('tesberry/bridge/status', 'offline')

    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.connect('localhost')
    return client

def cleanupDict(origDict):
    '''Omit Crc, Counter, Checksum and other unneeded values to reduce mqtt message frequency'''
    filteredDict = origDict;
    for key in list(origDict):
        # TODO: check if signal has the same name as message to not remove signals like the UI_falseTouchCounter
        if (key.endswith(('Checksum', 'Counter', 'Crc'))):
            filteredDict.pop(key)
    return filteredDict


def on_message(client, userdata, msg):
    if msg.topic.endswith('/SET'):
        topic = msg.topic.split('/')
        print(topic, jsonpickle.decode(msg.payload))
        details = db.get_message_by_name(topic[2])
        data = details.encode(jsonpickle.decode(msg.payload))
        can_message = can.Message(arbitration_id=details.frame_id, data=data, is_extended_id=False)
        try:
            bus.send(can_message)
            pprint('Message sent on {}'.format(bus.channel_info))
        except can.CanError:
            pprint('Message not sent')

mqttc = initMQTT()
mqttc.on_message = on_message

cache = {}

def handleMessage(msg: can.Message):
    details = db.get_message_by_frame_id(msg.arbitration_id)
    data = db.decode_message(msg.arbitration_id, msg.data)
    data = cleanupDict(data);
    # check if values have changed, skip mqtt otherwise
    if cache.get(msg.arbitration_id) != data:
        cache[msg.arbitration_id] = data
        print('value changed')
        publish.single('/'.join(['tesberry', details.senders[0], details.name]) , jsonpickle.encode(data, unpicklable=False, max_depth=1).replace('"\'', '"').replace('\'"', '"'))

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=500000)

async def main():
    '''The main function that runs in the loop.'''

    with can.Bus(interface='socketcan', channel='vcan0') as bus:
        reader = can.AsyncBufferedReader()

        listeners = [
            handleMessage,  # Callback function
            reader,  # AsyncBufferedReader() listener
        ]
        # Create Notifier with an explicit loop to use for scheduling of callbacks

        loop = asyncio.get_running_loop()
        notifier = can.Notifier(bus, listeners, loop=loop)

        try:
            mqttc.loop_start()
            while True:
                # Wait for next message from AsyncBufferedReader
                await reader.get_message()

        except KeyboardInterrupt:
            print('Closing Loop')
            notifier.stop()
            mqttc.loop_stop()
            pass

asyncio.run(main())

# def closeConnection:
#     os.system('sudo ifconfig can0 down')
#     print('Connection closed.')
# atexit.register(closeConnection)
