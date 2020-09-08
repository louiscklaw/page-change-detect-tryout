#!/usr/bin/env bash

# https://docs.github.com/en/actions/configuring-and-managing-workflows/using-environment-variables

set -ex

# sudo apt update
# sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
# python3 -V
# python3 -m pip install pipenv

sudo apt install -y git
git config --global user.email "test@example.com"
git config --global user.name "git test username"


export PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"
export PATH="$PATH:$PYTHON_BIN_PATH"

export LC_ALL=C.UTF-8
export LANG=C.UTF-8

# pipenv --help

export GITHUB_REF=refs/heads/feature-branch-1
export GITHUB_REPOSITORY=louiscklaw/github-playlist

echo $GITHUB_TOKEN

cd github-build-merger-tryout
  pipenv sync
  # pipenv run python3 ./main.py -d

  pipenv run python3 test/test.py
cd ..
