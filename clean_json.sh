#!/usr/bin/env bash

set -ex

git pull

rm -rf *.json

cat << EOF >> jobs_id_ignore.json
[]
EOF

git add .
git commit -m"clean json,"

git push
