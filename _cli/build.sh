#!/usr/bin/env bash

set -ex

function image() {
  name=${1}
  cd _images/"${name}" || exit
  docker build -t viqueen/"${name}" .
}

function schema() {
  docker run \
    --volume "${PWD}/_schema:/workspace/_schema" \
    --volume "${PWD}/_api/go-sdk:/workspace/_api/go-sdk" \
    --workdir "/workspace/_schema" \
    viqueen/protobuf-gen buf generate --verbose
}

eval "$@"