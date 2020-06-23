#!/bin/bash

./gradlew build
mkdir -p build/dependency && (cd build/dependency; jar -xf ../libs/*.jar)
docker build -t mateusz43211/tourdeshot:userhistory_test1.0 .