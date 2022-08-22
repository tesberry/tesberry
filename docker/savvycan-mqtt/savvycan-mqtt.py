import uuid
import can
import paho.mqtt.client as mqtt
import ssl
import os
import atexit
import signal

#def sender(id):
#	for i in range(10):
#		msg = can.Message(arbitration_id=0x7E0, data=[id, i, 0, 1, 3, 1, 3, 1], is_extended_id=False)
#		bus.send(msg)
#	time.sleep(1)

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
	print("Connected with result code "+str(rc))

	# Subscribing in on_connect() means that if we lose the connection and
	# reconnect then subscriptions will be renewed.
	client.subscribe(topic + "/+", qos=0)
	
# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
	print(msg.topic+" "+str(msg.payload))
	
client_id = str(uuid.uuid4())

username = os.getenv('MQTT_USERNAME') # Specify MQTT Username
password = os.getenv('MQTT_PASSWORD') # Specify MQTT Password
bustype = os.getenv('BUSTYPE', 'socketcan') # Set usage of a different bus type (defaults to socketcan)
channel = os.getenv('CHANNEL', 'can0') # Specify which socketcan interface to use
speed = os.getenv('SPEED', '500000') # Set speed of socketcan interface
topic = os.getenv('TOPIC', 'can') # Set MQTT topic to use
mqtthost = os.getenv('MQTT_HOST', 'localhost') # Set hostname of MQTT Broker
mqttport = os.getenv('MQTT_PORT', '1883') # Set port to connect to on MQTT Broker

if channel.startswith('v'):
    # Setting up a virtual interface
    os.system('modprobe vcan')
    os.system('ip link add {} type vcan bitrate 500000'.format(channel))
    os.system('ip link set {} up'.format(channel))
else:
    # Connect to physical interface
    os.system('ip link set {} type can bitrate 500000'.format(channel))
    os.system('ifconfig {} up'.format(channel))

def closeConnection():
    if channel.startswith('v'):
        # Remove virtual interface
        os.system('ip link delete {}'.format(channel))
    else:
        # Disconnect to physical interface
        os.system('ifconfig {} down'.format(channel))
    print('Connection closed.')

atexit.register(closeConnection)
signal.signal(signal.SIGTERM, closeConnection)

bus = can.interface.Bus(channel=channel, bustype=bustype, bitrate=int(speed))
	
client = mqtt.Client(client_id=client_id, clean_session=True)
client.on_connect = on_connect
client.on_message = on_message

if mqttport == '8883':
	client.tls_set(ca_certs=None, certfile=None, keyfile=None, cert_reqs=ssl.CERT_REQUIRED, tls_version=ssl.PROTOCOL_TLS, ciphers=None)
if username:
	client.username_pw_set(username, password)

client.connect(mqtthost, int(mqttport), 60)

run = True
while run:
	client.loop(timeout=0.02)
	for msg in bus:
		print(msg.arbitration_id)
		#msg.arbitration_id, msg.timestamp, and msg.data
		flags = 0
		if (msg.is_extended_id): flags += 1
		if (msg.is_remote_frame): flags += 2
		if (msg.is_fd): flags += 4
		if (msg.error_state_indicator): flags += 8
		microsStamp = int(msg.timestamp * 1000000).to_bytes(8, 'little')
		fullTopic = topic + "/" + str(msg.arbitration_id)
		client.publish(fullTopic, microsStamp + int(flags).to_bytes(1, 'little') + msg.data, qos=0)
