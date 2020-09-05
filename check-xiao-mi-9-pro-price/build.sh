#!/usr/bin/env bash

set -ex

apt-get update
apt-get install -qqy curl
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

apt-get update
apt-get install -qqy yarn

cd check-xiao-mi-9-pro-price
  yarn
  node index.js
cd ..