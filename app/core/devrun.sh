#!/bin/bash

mongoContainerName="devmongo"
mongoContainerPort="27017"
port_mapping="8080:8080"
mongoNetwork="core_network"

docker run --rm \
  -p "${port_mapping}" \
  --network="${mongoNetwork}" \
  -e SPRING_DATA_MONGODB_HOST="${mongoContainerName}" \
  -e SPRING_DATA_MONGODB_PORT="${mongoContainerPort}" \
  -t tourdeshot/core
