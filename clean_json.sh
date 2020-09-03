#!/usr/bin/env bash

set -ex

rm -rf *.json

git add *.json
git commit -m"clean json,"

git push
