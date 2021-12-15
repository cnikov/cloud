# this image relies on the nodejs image
FROM node:latest
# set working directory
WORKDIR /usr/src/catalog
# we need CURL to verify that the key-value storage is running (see boot-in-order.sh)
RUN apt-get update && apt-get install curl
# let NPM packages be called anywhere within the container
ENV PATH /usr/src/catalog/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install
RUN npm install axios
# source files of the authentication service
#ADD gulpfile.js .
ADD src src
COPY boot-in-order.sh .
# header for loggining messages
ENV DEBUG catalog-db
# database name

ENV DB_NAME_L myformat
ENV DB_NAME_LOGS log
# name of container running CouchDB
ENV DB_HOST_C catalog-db
ENV DB_HOST_LOGS logs-db
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL_L http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST_C}:5984/${DB_NAME_L}
ENV DB_URL_LOGS http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST_LOGS}:5984/${DB_NAME_LOGS}

# we now use an script to deploy the authentication service
CMD ["/bin/bash","source","./boot-in-order.sh"]
