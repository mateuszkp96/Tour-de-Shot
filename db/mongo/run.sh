#!/bin/bash

containerName='devmongo'
volume="$PWD/scripts/:/docker-entrypoint-initdb.d"
MONGO_INITDB_ROOT_USERNAME="mongoadmin"
MONGO_INITDB_ROOT_PASSWORD="secret"
image="mongo:4.0"
port_mapping="27017:27017"
network="core_network"
docker run -ti \
  --name ${containerName} \
  -e MONGO_INITDB_ROOT_USERNAME="${MONGO_INITDB_ROOT_USERNAME}" \
  -e MONGO_INITDB_ROOT_PASSWORD="${MONGO_INITDB_ROOT_PASSWORD}" \
  -p "${port_mapping}" \
  -v "${volume}" \
  --network="${network}" \
  "${image}" \
