#!/usr/bin/bash

# To run this remotely: /usr/bin/bash https://github.com/joel-hamilton/.dotfiles/blob/master/bin/raspi-setup.sh
# This script installs various packages on a Raspberry Pi (tested on a Zero W).
# PREREQUISITES:
#  - install Raspberry Pi OS - 32 bit (Raspberry Pi Imager is an easy tool for doing this)
#  - add public key from a computer to enable sshing in and running this script

# Add Pi gateway public key
if ! grep -q 'joel@raspberrypi' ~/.ssh/authorized_keys; then
    echo 'Adding pi gateway public key to authorized keys'
    <<EOF >> ~/.ssh/authorized_keys
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDBm0UT+5BLug8ioXUBjIKXODWhofBVl9eqo9RTeak/pC6KxxE80X40415x4D6+p+FiKq64QvxTIpOwJJU/WXqdTBKo5yS/tKmXiZs8aIFoQccuRNM21Z+iKhH+Mlky3AcmrrBFglCCmPDiLAvgRtsh853XO8vQdFrZ5aKETZ3BJTMv7kPg4NG44p136Da6XKoLg8X/BPeOKHsysZgS3RW9YpKp0B3txGfvuOIYYjTJ8cWel3a6cfIlwkgRlD1IWT5rSmjLBPDerjT++XYgO/bDWHQJWJQph6DB2XyU3sFFvjhDS3zqfdCsrZAm5FOS/JMx2GeBwYeXPmTxz8eBUoKQuZOPcXi2uzv9D6Fhe+4i0zL1yAtazeRFeBNLp42O5XQOv4WFXCBemNLV1u8hrehbdMSjanWGmTyoy4Jhdq7IFmg73wiTd3AhyaW26vWNP0/FjoBUZF1TlMqSSdC/XSgwhTjP0wKtIthY32RpcKAJIXbq+PpnuG5u1VZANcamHWs= joel@raspberrypi
EOF
fi

# Add some apt pacakges
[ -z $(command -v git) ] && sudo apt install -y git
[ -z $(command -v vim) ] && sudo apt install -y vim

# Install Node/NPM
if [ -z $(command -v node) ]; then
    wget https://unofficial-builds.nodejs.org/download/release/v14.10.0/node-v14.10.0-linux-armv6l.tar.gz
    tar -xzf node-v14.10.0-linux-armv6l.tar.gz
    cd node-v14.10.0-linux-armv6l
    sudo cp -R * /usr/local/
fi

# Generate keypair for raspberry pi
if [ ! -s ~/.ssh/id_rsa.pub ]; then
    echo 'Creating keypair'
    ssh-keygen -t rsa
    <<EOF
Keypair created, please add the following public key to Github in order to pull repos:

$(cat ~/.ssh/id_rsa.pub)

EOF
fi

