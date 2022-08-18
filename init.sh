#!/bin/bash

# This script adds all nested git repos as submodules, and then initializes them

add() {
    echo $(cd "$1" && git config --get remote.origin.url)
}

find ./* -name .git | xargs add
