#!/usr/bin/env bash

set -ex

yarn
# cd jobsdb-qa-monitor-tryout
#   node js_test/index.js
# cd ..

node test/test_requires.js
node test/index.js
