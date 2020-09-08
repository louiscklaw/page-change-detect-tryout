#!/usr/bin/env bash

set -ex

yarn
# cd jobsdb-qa-monitor-tryout
#   node js_test/index.js
# cd ..

./node_modules/mocha/bin/mocha
