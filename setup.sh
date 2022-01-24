#!/bin/bash

apt get update
apt get upgrade

# Install bluetooth stack
apt get install bluetooth bluez-utils blueman

# Install Linux SocketCAN driver for ELM327
apt get install git
git clone https://github.com/norly/elmcan.git
cd ./elmcan/module/
dkms install .
cd ../../

# TODO: Pair ELM327 bluetooth device

