#!/usr/bin/env bash

set -ex

cd check-xiao-mi-9-pro-price
yarn
  node index.js
cd ..

cd taobao-item-monitor
yarn
  node index.js
cd ..

# cd jobsdb-qa-monitor-tryout
# yarn
#   node src/test.js
#   node src/index.js
# cd ..

cd helloworld-tryout
  yarn
  concurrently -k "live-server --no-browser ." "node index.js"
cd ..
