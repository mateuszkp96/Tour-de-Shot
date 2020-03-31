#!/bin/bash

containerName='devMySql'
volume="$PWD/scripts/:/docker-entrypoint-initdb.d"
image="mysql:8.0"
port_mapping="3306:3306"
MYSQL_ROOT_PASSWORD="my-secret-pw" #TODO move to secrets
timezone="Europe/Warsaw"
character_set="utf8mb4"
collation_server="utf8mb4_unicode_ci"

docker run -ti \
  --name ${containerName} \
  -e MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD}" \
  -e TZ="${timezone}" \
  -p "${port_mapping}" \
  -v "${volume}" \
  "${image}" \
  --character-set-server="${character_set}" \
  --collation-server="${collation_server}"
