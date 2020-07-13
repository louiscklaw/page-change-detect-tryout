#!/usr/bin/env bash

set -ex

# monitor xiaomi on offical page for lower price
cd check-xiao-mi-9-pro-price
  scripts/build.sh

cd ..

# monitor GTX1050 ti on taobao
cd taobao-item-monitor
  scripts/build.sh
cd ..