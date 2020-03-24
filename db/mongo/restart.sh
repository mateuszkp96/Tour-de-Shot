#!/bin/bash
containerName='devMongo'

docker stop "${containerName}" -t 5
docker rm "${containerName}" && bash run.sh
