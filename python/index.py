#!/usr/bin/env python

import can
import cantools
import json
import jsonpickle
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

# os.system('sudo ip link set can0 type can bitrate 500000')
# os.system('sudo ifconfig can0 up')

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

mqttc = initMQTT()
db = cantools.database.load_file('../resources/db/Model3CAN.dbc')

def handleMessage(msg: can.Message):
    details = db.get_message_by_frame_id(msg.arbitration_id)
    data = db.decode_message(msg.arbitration_id, msg.data)
    publish.single('/'.join(['tesberry', details.senders[0], details.name]) , jsonpickle.encode(data, unpicklable=False, max_depth=1).replace('"\'', '"').replace('\'"', '"'))

bus = can.interface.Bus(bustype='socketcan', channel='vcan0', bitrate=500000)

def receive_all():
    try:
        while True:
            mqttc.loop()
            msg = bus.recv()
            if msg is not None:
                handleMessage(msg)

    except KeyboardInterrupt:
        pass

receive_all()

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

mqttc.on_message = on_message

# def closeConnection:
#     os.system('sudo ifconfig can0 down')
#     publish.single('tesberry/bridge/status', 'offline')
#     print('Connection closed.')
# atexit.register(closeConnection)
