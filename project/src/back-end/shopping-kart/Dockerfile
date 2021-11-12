# this image relies on the nodejs image
FROM node:6.11-alpine
# set working directory
WORKDIR /usr/src/shopping_kart
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl
# let NPM packages be called anywhere within the container
ENV PATH /usr/src/shopping_kart/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install
# source files of the authentication service
ADD gulpfile.js .
ADD src src
ADD boot-in-order.sh .
# header for loggining messages
ENV DEBUG shopping-db
# name of container running CouchDB
ENV DB_HOST_SK shopping-db
# database name
ENV DB_NAME_SK shopping-kart
# name of container running CouchDB
ENV DB_HOST_SK shopping-db
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL_SK http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST_SK}:5984/${DB_NAME_SK}
# we now use an script to deploy the authentication service
CMD source boot-in-order.sh
