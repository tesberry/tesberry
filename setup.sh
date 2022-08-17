#!/bin/bash

# Update device
echo "-------- Updating device --------"
sudo apt update
sudo apt upgrade -y

# Install docker
echo "-------- Install docker --------"
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker

# Install docker-compose
echo "-------- Install docker-compose --------"
sudo curl -L "https://github.com/docker/compose/releases/download/v2.9.0/docker-compose-linux-armv7" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Get tesberry
echo "-------- tesberry --------"
git clone https://github.com/tesberry/tesberry.git
cd tesberry
docker-compose up -d

# Improve Boot Time
echo "-------- Improve Boot Time --------"
echo "disable_splash=1" >> /boot/config.txt
echo "boot_delay=0" >> /boot/config.txt
echo -n " fastboot" >> /boot/cmdline.txt

echo "-------- Done --------"
