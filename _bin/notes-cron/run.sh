#!/bin/bash

# This script runs the notes cron task on $NOTES_PATH

if [[ -z "$NOTES_PATH" ]]; then
    echo "NOTES_PATH is not set"
    exit 1
fi

if [[ ! -d "$NOTES_PATH" ]]; then
    echo "$NOTES_PATH does not exist"
    exit 1
fi

ts-node "$HOME/.dotfiles/_bin/notes-cron/index.ts" "$NOTES_PATH"