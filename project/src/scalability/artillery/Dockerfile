# this image relies on the nodejs image
FROM node:latest

WORKDIR /usr/src/artillery

RUN apt-get update && apt-get install -y curl
RUN npm install artillery

# let NPM packages be called anywhere within the container
ENV PATH /usr/src/artillery/node_modules/.bin:${PATH}

ADD login-user-load-test.yml .
ADD shopping-daemon.yml .
ADD catalog-daemon.yml .
ADD history-daemon.yml .

CMD curl --request POST -d 'username=bob&password=alice' scapp_users-daemon/user && \
  artillery run login-user-load-test.yml
CMD curl --request POST -d 'username=bob&name=Banana&quantity=2&price=1.69&id=7' scapp_shopping-daemon/shopping-kart && \
  artillery run shopping-daemon.yml
CMD curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" scapp_catalog-daemon/catalog && \
  artillery run catalog-daemon.yml
CMD curl --request POST -d 'name=bob' scapp_history-daemon/user && \
  artillery run history-daemon.yml
