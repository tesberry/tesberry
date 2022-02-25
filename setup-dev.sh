#!/bin/bash

# Install SMB/Samba
sudo apt-get update
sudo apt-get install samba samba-common smbclient
sudo mv /etc/samba/smb.conf /etc/samba/smb.conf_alt