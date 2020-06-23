#!/bin/bash

./gradlew build
mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)
docker build -t mateusz43211/tourdeshot:user_test1.02 --no-cache .