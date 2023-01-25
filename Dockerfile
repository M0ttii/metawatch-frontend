FROM node:16.18.0 as node
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .

RUN ng build

FROM nginx as runtime
COPY --from=node /app/dist/grid-test /usr/share/nginx/html