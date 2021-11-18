# :books: LINFO2145 Project: Scalable Shopping-cart Application
# INTRODUCTION:
In this ReadMe we will explain the architecture of our project and how to build it.
We created 5 differents microservice which are host in docker swarm containers with a process of scalability.
The Microservices are :
- Authentification Service
- Storage Service
- Shopping-cart Service
- Catalog Service 
- History Service


Each microservices are described in detail in their folder [`backend`](project/src/back-end/) but we will explain briefly each microservices.

## Authentification Service
This service is used to create and get users by clicking on the button register or login and giving username and password.The user is added to the service and a database is created

## Storage service 

It is the service that creates the databases on couch db every services use this storage service to create a couch db and each service is link to its own storage image.The API can link the microservice with the couchdb tool

## Shopping-cart Service
This service create a shopping-cart for every user that add item in his shopping cart.It stores the products added and the quantities of each product added.When a user is login the service get the shopping cart corresponding to this user.

## Catalog Service 
This service stores all the item of the catalog with a name a price an image a category and an id.When the admin add a product it is added by the microservice to the database and each product can also be removed or modified.

## Hisotry service
This service is destined to a future implementation of checkout function. When the user checkout an history of his purchase is uploaded to the database by the history service. It gets the actual shopping cart of the user and store for the user a list of each shopping cart that he bought.It also has a list of each items that the user has ever bought and the quantity of each of those product.

# HOW TO RUN...
To run the project you have to follow those instructions : <br />
Open a shell comand and type cd project<br />
make swarm<br />
The database and microservices have to load so wait about 1 min <br />
Once it is done you can acces the website by typing http://${YOUR_IP_ADDRESS}:3000 <br />
On the website you can register log in and add product in your shopping cart. (PLEASE DO NOT TRY TO DELETE AN ITEM OF YOUR SHOPPING CART it is not yet implemented in the front end). <br />
you can add product by executing the script add_item with the command <br />
./add_item $name $price $image_url $category $id<br />
where each $ fields are an argument<br />
You can see the updates on the website if you reload the page<br />
you can remove an item that you have add with the command <br />
./remove_item $item_name<br />
you can remove a shopping cart with the command<br />
................................<br />
...............................<br />


