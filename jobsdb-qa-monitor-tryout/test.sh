#!/usr/bin/env bash

set -ex

yarn
# cd jobsdb-qa-monitor-tryout
#   node js_test/index.js
# cd ..

cd jobsdb-qa-monitor-tryout
  ./node_modules/mocha/bin/mocha
cd ..