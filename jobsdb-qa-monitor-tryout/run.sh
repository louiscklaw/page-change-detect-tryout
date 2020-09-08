#!/usr/bin/env bash

set -ex

cd jobsdb-qa-monitor-tryout
  node ./src/index.js
cd ..

# node ./fetch_graphql.js > job_detail.json
