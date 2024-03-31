#!/usr/bin/env bash

function harness() {
  yarn workspace @besto/harness env:up
  yarn workspace @besto/harness web:dev
}

eval "$@"