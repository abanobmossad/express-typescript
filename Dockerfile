# Common build stage
FROM node:14.18.1-alpine as common-build-stage
LABEL maintainer="Abanob Mossad <abanobmossad@gmail.com>"

# Create app directory
WORKDIR /usr/src/server

COPY package*.json ./

# alpine images doesn't have bash installed out of box. You need to install it separately.
RUN apk update && apk add bash
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 7000
