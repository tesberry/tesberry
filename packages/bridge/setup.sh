#!/bin/bash

# pip install python-can==4.0.0rc0 asyncio

sudo apt-get update
sudo apt-get install -y git

git clone https://github.com/hardbyte/python-can.git
cd python-can/
sudo python setup.py develop
cd ..
