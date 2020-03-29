FROM nginx:1.17.9-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ui /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
