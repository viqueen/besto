#!/usr/bin/env bash

set -ex

function sdks() {
  yarn workspace @besto/api-node-sdk build
  yarn workspace @besto/api-web-sdk build
  yarn workspace @besto/lib-node-sdk build
  yarn workspace @besto/lib-web-sdk build
}

eval "$@"