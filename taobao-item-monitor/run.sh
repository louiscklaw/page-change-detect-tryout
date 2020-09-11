#!/usr/bin/env bash

set -ex


yarn

# update the screen capture
node index.js

# # compare screen capture, send message if not match
node src/lib/comparePng.js expected-screencapture/expected.png current_capture.png "message"

# node src/lib/comparePng.js --drill "drill message on routine-xiao-mi-9-pro-drill"
