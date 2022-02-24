#!/bin/bash

# Setting up a virtual interface
sudo modprobe vcan
sudo ip link add vcan0 type vcan bitrate 500000
sudo ip link set vcan0 up
sudo ifconfig vcan0

# Install rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install SMB/Samba
sudo apt-get update
sudo apt-get install samba samba-common smbclient
sudo mv /etc/samba/smb.conf /etc/samba/smb.conf_alt