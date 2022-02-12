#!/bin/bash

# TODO: if no can0
sudo ip link set can0 type can bitrate 500000
sudo ifconfig can0 up

candump -L can0 > candump.log
