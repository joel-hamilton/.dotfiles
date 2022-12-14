#!/bin/bash

# This script watches files and runs command(s) when they change
# Usage:
#   The first argument is a glob of files to watch, all further arguments are run as commands on file change
#   eg: `watch *.py python runTests.py` 

ORIGINAL_DIR="$PWD"
if ! command -v entr &> /dev/null; then
    echo "Entr is not installed, cloning from git@github.com:eradman/entr.git"
    cd "$HOME" && git clone git@github.com:eradman/entr.git
    echo "Installing entr"
    cd entr && ./configure && make test && make install
    echo "Cleaning up"
    sudo rm -r "$HOME/entr"
fi

cd "$ORIGINAL_DIR"
ARGS=( "$@" )
ls "${ARGS[0]}" | entr -c "${ARGS[@]:1}"