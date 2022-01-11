# Tesberry - A Tesla CAN bus utility for Raspberry Pi (WIP)

## Features
- Enable Ambient Light even in SR+ models (WIP)

## Setup

1. Install bluetooth stack
   ```bash
   sudo apt-get install bluetooth bluez-utils blueman
   ```
3. Install https://github.com/norly/elmcan
4. Connect to ELM327 via bluetooth
5. Configure ELM327 filter to avoid full buffer
6. (Optional?) Configure ELM327 to use 11-bit CAN IDs `AT PB`
7. (Optional?) Configure ELM327 protocol to 6
8. Run script using SocketCAN

## Ideas
- Heating
  - enable seat heaters (even rear on SR+)
  - enable heated steering wheel (even on SR+)
- Autopilot
  - enable summon and autopark features
  - try to bypass autopilot security interaction
- LED stripe in front to show
  - state of charge (red, yellow, green stripe is filling while charging)
  - recuperation + accelleration
  - current speed (different colors for 10,30,50,100,120,130,150 km/h)
  - autopilot (stripe completely blue)
  - blind spot warning (orange light on left or right)
  - collision warning (let entire stripe blink red)
- AVAS sound
  - play welcome sound via avas speaker
  - disable AVAS
- Open frunk via door handles
- start preconditioning without navigating to specific charger
- set wiper speed by pressing wiper button by the specific amount
- Tesla-like UI to configure Pi via Tesla browser (connected to Pi via WIFI)
- Native App to control self park via bluetooth

## Development
For development I would recommend a cable connection using a OBD2 to CAN cable in addition to a CAN to USB device. The reason for this is that we are limiting the CAN IDs to be sent via bluetooth to avoid a full buffer of the OBD2 bluetooth dongle.

### DBC files
- https://github.com/commaai/opendbc/blob/master/tesla_can.dbc
- https://github.com/joshwardell/model3dbc/blob/master/Model3CAN.dbc
- https://github.com/onyx-m2/onyx-m2-dbc/blob/main/tesla_model3.dbc
- https://github.com/thezim/DBCTools/blob/master/Samples/tesla_model3.dbc

### Read and Write from/to CAN bus
You can pretty much read but not write everything. Some values have a checksum, so it's not possible to write them, but UI values should not have a checksum. To rewrite a value we will read a message in the CAN bus, change a value and immediately send it again.
