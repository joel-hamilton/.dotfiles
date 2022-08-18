#!/bin/bash

# This script creates a new scratch file and opens it in a new vscode window. It
# optionally accepts an extension argument

if [[ -n $1 ]]; then
    EXTENSION=".$1"
else
    EXTENSION=""
fi

FILENAME="$HOME/scratch/$(date +%F_%H%M%S)$EXTENSION"

code -n "$FILENAME"
