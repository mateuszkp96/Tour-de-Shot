#!/bin/bash
name='singleMySql'

docker stop "${name}" -t 5
docker rm "${name}" && bash run.sh
