# Connect to bluetooth ELM327


# attach serial bus to SocketCAN driver (elmcan)
ldattach \
    --debug \
    --speed 38400 \
    --eightbits \
    --noparity \
    --onestopbit \
    --iflag -ICRNL,INLCR,-IXOFF \
    29 \
    /dev/ttyUSB0

# Run script
python enableAmbientLight.py
