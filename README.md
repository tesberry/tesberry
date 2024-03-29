# Tesberry - A Tesla CAN bus utility for Raspberry Pi

**This project is still work in progress**

## Setup

1. Flash Raspberry Pi OS Lite (32-bit) using the Raspberry Pi Imager with the following settings:
   1. Set hostname to `tesberryPi` 
   2. Enable SSH
   3. Set a username and password
   4. Configure your network and region
2. Start Raspberry Pi and connect via SSH
3. Run `bash <(curl -s https://raw.githubusercontent.com/tesberry/tesberry/main/setup.sh)` on your Pi

## Stack

| Service               | Enabled | Port        | Description                                                     |
| --------------------- | ------- | ----------- | --------------------------------------------------------------- |
| Tesberry UI           | true    | 80          | The Web Interface for Tesberry in the Tesla Browser             |
| Tesberry Bridge       | true    | -           | Bridges the CAN Messages to MQTT and decodes/encodes them       |
| Portainer             | true    | 9000        | Web Interface to manage the Docker Containers                   |
| SavvyCan MQTT Bridge  | false   | -           | Bridges the CAN Messages to MQTT to debug them with SavvyCAN    |
| Mosquitto MQTT Broker | true    | 1883 / 9001 | The MQTT Broker to where all services are communicating through |
| NodeRED               | true    | 1880        | The rule engine to listen to and write CAN messages             |

## Network Setup

There are 2 problems we have to solve:
1. The Tesla does not connect to a WIFI Network without an internet connection
2. The Tesla web browser is locked to only access public IPs, so we cannot use a hostnames or local IP

One way to solve these issues is to setup a mobile 4G/5G router in your car (usually you can use 5V or 12V to power them) and connect your Raspberry Pi to it. Then you have to setup a static IP lease in your Router for your Raspberry Pi to get `192.186.1.42` as it's IP address. After this is done you need to forward port `80` from `42.42.42.42` to `192.186.1.42`. Additionally you can setup a hostname like `tesberry` for `42.42.42.42`. Now you can access your tesberry UI with your Tesla browser using `http://tesberry/`.

## Roadmap
- check power state of usb port when sentry mode is off
- speed up boot
- 64-bit support

### Read and Write from/to CAN bus
You can pretty much read but not write everything. Some values have a checksum, so it's not possible to write them, but UI values should not have a checksum. To rewrite a value we will read a message in the CAN bus, change a value and immediately send it again.
It's also not possible to change configs without doing a man-in-the-middle attack but you can trigger actions instead e.g. opening the frunk.

### Helpful Resources
- https://stackoverflow.com/questions/23076806/elm327-can-command-to-switch-headlights-pernament-on
- https://www.goingelectric.de/forum/viewtopic.php?f=99&t=39854&sid=c4d26edbe6332e87b4112fd58f3f4990&start=30
- https://github.com/brendan-w/python-OBD/issues/69
- https://teslaownersonline.com/threads/diagnostic-port-and-data-access.7502/page-102#post-327585
- https://teslaownersonline.com/threads/diagnostic-port-and-data-access.7502/page-90
