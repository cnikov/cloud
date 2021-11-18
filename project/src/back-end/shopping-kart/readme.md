# Shopping-Cart service

This service handle the basket of a user with a RESTfull API.

To do so, it has been implemented with one database, based on couchdb. You can acces his database with curl, the address is http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006 . 

The image of the container is automaticaly build & run with the command "make swarm" in the Makefile.

This container contains "boot-in-order.sh". His goal is to create the database in order that the microservice run properly.

In App.js, you can found the GET, POST and DELETE operations. You can use them as follows : 
    - POST : you have to give him as argument the name of the product, a username, a quantity, the price of the product and finaly the id of the product. It will add your product with the given quantity to your basket.
    - GET : you have to give him as argument the username. The reponse from the database will be the basket of the user.
    -DELETE : you have to give him as argument a username and a product (who already is in the basket). It will remove the given product from the basket.
# SOME EXAMPLE

- POST : curl -X POST "name=Apple&quantity=3&price=2.34&username=bob&id=6" http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006/shoppin-kart
- GET : curl -X GET "username=bob" http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006/shoppin-kart
- DELETE : curl -X DELETE "username=bob&name=Apple" http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006/shoppin-kart
