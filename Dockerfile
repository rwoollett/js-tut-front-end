FROM node:10 as builder

WORKDIR /app

#RUN apt-get update && apt-get install python3 g++ make

COPY package.json .
RUN npm install
COPY . .
RUN npm run build
RUN chmod -R 755 dist

FROM nginx:1.15.2-alpine as release
RUN apk add --no-cache jq 

COPY --from=builder /app/dist/ /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

COPY docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
