#Getting Node Image from hub
FROM node:16.18.0 as node

#Switching working directory
WORKDIR /app

#Installing angular cli
RUN npm install -g @angular/cli@14.2.5

#Copying package.json to container storage and installing node modules
COPY ./package.json .
RUN npm install --legacy-peer-deps
COPY . .

#Building production files
RUN ng build

#Getting Nginx from Hub, copying config
FROM nginx as runtime
COPY nginx.conf /etc/nginx/nginx.conf

#Copying production files to nginx
COPY --from=node /app/dist/grid-test /usr/share/nginx/html