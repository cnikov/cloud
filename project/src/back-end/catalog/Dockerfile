# this image relies on the nodejs image
FROM node:6.11-alpine
# set working directory
WORKDIR /usr/src/catalog
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apk update && apk add curl
# let NPM packages be called anywhere within the container
ENV PATH /usr/src/catalog/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install
# source files of the authentication service
ADD gulpfile.js .
ADD src src
ADD boot-in-order.sh .
ADD func_to_string.js .
ADD post_db.sh .
ADD catalog.json .
# header for loggining messages
ENV DEBUG catalog-db
# database name
ENV DB_NAME_C catalogs
ENV DB_NAME_C allItems
# name of container running CouchDB
ENV DB_HOST_C catalog-db
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL_C http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST_C}:5984/${DB_NAME_C}
ENV DB_URL_F http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST_C}:5984/${DB_NAME_F}

# we now use an script to deploy the authentication service
CMD source boot-in-order.sh
