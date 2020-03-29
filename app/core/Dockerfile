FROM openjdk:8-jdk-alpine

RUN addgroup -S teamg && adduser -S app -G teamg
USER app:teamg

ARG DEPENDENCY=build/dependency
COPY ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY ${DEPENDENCY}/META-INF /app/META-INF
COPY ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","com.teamg.tourdeshot.core.CoreApplication"]
