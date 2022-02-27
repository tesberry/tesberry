# Tesberry - A Tesla CAN bus utility for Raspberry Pi

**This project is still work in progress**

## Setup

```bash
./setup.sh
```

## Roadmap
- check power state of usb port when sentry mode is off
- shutdown/sleep/wakeup script
- speed up boot
- write tutorial with one command setup without installing git
- dockerify tesberry bridge

### Read and Write from/to CAN bus
You can pretty much read but not write everything. Some values have a checksum, so it's not possible to write them, but UI values should not have a checksum. To rewrite a value we will read a message in the CAN bus, change a value and immediately send it again.
It's also not possible to change configs without doing a man-in-the-middle attack but you can trigger actions instead e.g. opening the frunk.

### Helpful Resources
- https://stackoverflow.com/questions/23076806/elm327-can-command-to-switch-headlights-pernament-on
- https://www.goingelectric.de/forum/viewtopic.php?f=99&t=39854&sid=c4d26edbe6332e87b4112fd58f3f4990&start=30
- https://github.com/brendan-w/python-OBD/issues/69
- https://teslaownersonline.com/threads/diagnostic-port-and-data-access.7502/page-102#post-327585
- https://teslaownersonline.com/threads/diagnostic-port-and-data-access.7502/page-90
