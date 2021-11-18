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
First of all you need to modify the lines 118,119 and 120 in the [´scapp.yml´](src/scapp.yml) by replacing cloud-romtourpe.westeurope.cloudapp.azure.com by your VM ip address

```javascrip
 environment:
      REACT_APP_AUTH_SERVICE_URL: http://cloud-romtourpe.westeurope.cloudapp.azure.com:3002
      REACT_APP_CATALOG_SERVICE_URL: http://cloud-romtourpe.westeurope.cloudapp.azure.com:3005
      REACT_APP_SHOPKART_SERVICE_URL: http://cloud-romtourpe.westeurope.cloudapp.azure.com:3006
```

Open a shell comand and type :

```bash
cd project
```
<br />
At first we ask you to create manually a swarm manager by typping 

```bash
docker swarm init --advertise-addr IP_OF_VM_LEADER
```
Then in others vms you can create workers by typing

```bash
 docker swarm join --token YOUR_TOKEN
```
Then on your manager type

```bash
docker network create --driver overlay --attachable scapp-net

```
After that you can enter the final command :

```bash
make swarm
```
<br />
The database and microservices have to load so wait about 1 min <br />
Once it is done you can acces the website by typing http://${YOUR_IP_ADDRESS}:3000 <br />
The couch db are accessible with the username admin and password admin on the ports:
- 3001 -> Authentification service
- 3003 -> catalog service
- 3004 -> shopping cart service
- 3007 -> history service

you can access them by typing http://${YOUR_IP_ADDRESS}:$YOUR_PORT/_utils <br />
On the website you can register log in and add product in your shopping cart. (PLEASE DO NOT TRY TO DELETE AN ITEM OF YOUR SHOPPING CART it is not yet implemented in the front end). <br />
you can add product by executing the script add_item with the command <br />
```bash
./add_item $name $price $image_url $category $id
```
<br />
where each $ fields are an argument<br />
You can see the updates on the website if you reload the page<br />
you can remove an item that you have add with the command <br />

```bash
./remove_item $item_name
```

<br />
you can remove a shopping cart with the command<br />

```bash
./remove_cart_item $item_name $username
```

<br />
You can add item in the shopping cart with the command<br />

```bash
./add_cart.sh $item_name $quantity $username $price $item_id
```

<br />
You can add history with the command<br />

```bash
./add_history.sh $item_name $quantity $username $price $item_id
```
# TESTING SCALABILITY
 You can test the scalability of two containers with the command "make artillery"
 It will, if the load is superior to 70% of the capacity, increase the number of replicas of the service by 3.
 The tests take place on two services: the authentification service and the catalog service, but all the daemon support the scalability.

# REMARKS
All our back-end is functional but we had some problems to link it to the front-end because there is some concurency problems that we could not resolved. Furthermore we didn't create a logs service because we forget this part so we will create this service for the next part of the project. We also want to connect the front-end and the back-end properly for the end of the project. We tried to put our images on the dockerfile but when running the yml file with swarm some container were not created so we prefer to keep images locally and deploy it with a local build awaiting to find a solution to our problem.If there is any problem the website and all the services are running on our vm that you can access with ssh

```bash 
ssh romain@cloud-romtourpe.westeurope.cloudapp.azure.com
```
With the password 3Romain01

then access to the project with the command 

```bash 
cd cloud/project
```
And execute any command of you choice that we describe above<br />
When running command to add items in shopping cart or to add item in catalog please give a non existing id when adding a product in the catalog and a product name that is already stored in the catalog when adding the product in the shopping cart<br />
you can access to the website by clicking on this url (http://cloud-romtourpe.westeurope.cloudapp.azure.com:3000/)

