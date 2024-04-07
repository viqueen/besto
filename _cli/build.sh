#!/usr/bin/env bash

set -ex

function image() {
  name=${1}
  cd _images/"${name}" || exit
  docker build -t viqueen/"${name}" .
}

function tools() {
  image "protobuf-gen"
}

function sdks() {
  yarn workspace @besto/api-node-sdk build
  yarn workspace @besto/api-web-sdk build
  yarn workspace @besto/lib-node-sdk build
  yarn workspace @besto/lib-web-sdk build
}

function codegen() {
  docker run \
    --volume "${PWD}/_schema:/workspace/_schema" \
    --volume "${PWD}/_api/go-sdk:/workspace/_api/go-sdk" \
    --volume "${PWD}/_api/node-sdk:/workspace/_api/node-sdk" \
    --volume "${PWD}/_api/web-sdk:/workspace/_api/web-sdk" \
    --workdir "/workspace/_schema" \
    viqueen/protobuf-gen buf generate --verbose
}

eval "$@"