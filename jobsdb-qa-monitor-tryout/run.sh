#!/usr/bin/env bash

set -ex

node ./index.js
node ./fetch_graphql.js > job_detail.json
