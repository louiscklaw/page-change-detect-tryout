#!/usr/bin/env bash

set -ex

yarn
# cd jobsdb-qa-monitor-tryout
#   node js_test/index.js
# cd ..

cd jobsdb-qa-monitor-tryout
  node test/index.js
cd ..