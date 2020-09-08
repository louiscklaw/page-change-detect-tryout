#!/usr/bin/env bash

cd github-actions-puppeteer-tryout
  sudo npm install -g concurrently live-server
  yarn
  concurrently -s -k "live-server --no-browser ." "node index.js"
cd ..
