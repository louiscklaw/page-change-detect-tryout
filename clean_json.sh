#!/usr/bin/env bash

set -ex

git pull

rm -rf *.json

git add *.json
git commit -m"clean json,"

git push
