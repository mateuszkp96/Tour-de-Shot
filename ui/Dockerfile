FROM nginx:1.17.9-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY dist/ui /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
