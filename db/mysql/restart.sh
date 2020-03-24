#!/bin/bash
containerName='devMySql'

docker stop "${containerName}" -t 5
docker rm "${containerName}" && bash run.sh
