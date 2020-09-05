#!/usr/bin/env bash

set -ex


apt-get update
apt-get install -qqy curl
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt-get update
apt-get install -qqy yarn
apt-get install -qqy chromium-browser

cd helloworld-tryout
  yarn global add concurrently
  yarn global add live-server
  yarn add puppeteer
  yarn
  concurrently -k "live-server --no-browser ." "node index.js"
cd ..
