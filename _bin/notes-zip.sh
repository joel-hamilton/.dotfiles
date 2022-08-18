#!/bin/bash

# Zips personal Notes folder for easy backup

# Depends on NOTES_PATH being set
# Usage: cd to desired backup location, run script

if [[ -z "$NOTES_PATH" ]]; then
    echo "NOTES_PATH is not set"
    exit 1
fi

if [[ ! -d "$NOTES_PATH" ]]; then
    echo "$NOTES_PATH does not exist"
    exit 1
fi

date=$(date +%Y%m%d)
filename="NotesBackup${date}.zip" 
currentdir=$(pwd)
echo "Zipping $NOTES_PATH to $filename}"

# change to the zipping dir to avoid saving all the directories in filepath
(cd "$NOTES_PATH" && zip -re "${currentdir}/$filename" .)
