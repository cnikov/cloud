# this image relies on the nodejs image
FROM node:6.11-alpine
# set working directory
WORKDIR /usr/src/catalog
# let NPM packages be called anywhere within the container
ENV PATH /usr/src/catalog/node_modules/.bin:${PATH}
ADD package.json .
RUN npm install
# source files of the authentication service
ADD src src
ADD boot-in-order.sh .
# header for loggining messages
ENV DEBUG catalog-db
# database name
ENV DB_NAME catalog
# name of container running CouchDB
ENV DB_HOST item-db
# authentication information to CRUD (create/remove/update/delete) objects in our DB
ENV ADMIN_NAME admin
ENV ADMIN_PASSW admin
ENV DB_URL http://${ADMIN_NAME}:${ADMIN_PASSW}@${DB_HOST}:5984/${DB_NAME}


# we now use an script to deploy the authentication service
CMD source boot-in-order.sh