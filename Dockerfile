FROM node:16.18.0 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/grid-test /usr/share/nginx/html