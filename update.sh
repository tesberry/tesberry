#!/bin/bash

# Update device
echo "-------- Updating device --------"
sudo apt update
sudo apt upgrade -y

# Update tesberry
echo "-------- Updating tesberry --------"
cd tesberry
docker-compose build
docker-compose pull
docker-compose up -d

echo "-------- Done --------"
