#!/usr/bin/env bash

set -ex

cd jobsdb-qa-monitor-tryout
  node ./src/fetchNewJobs.js
cd ..

# node ./fetch_graphql.js > job_detail.json
