FROM nginx:1.15.2-alpine as release
RUN apk add --no-cache jq

COPY dist/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
