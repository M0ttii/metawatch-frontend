FROM node:16.18.0 as node
WORKDIR /app

RUN npm install -g @angular/cli@14.2.5

COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY . .

RUN ng build

FROM nginx as runtime
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist/grid-test /usr/share/nginx/html