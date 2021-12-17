# :books: LINFO2145 Project: Scalable Shopping-cart Application

Each microservices are described in detail in their folder [`backend`](project/src/back-end/) but we will explain briefly each microservices.



# HOW TO RUN...
The project is already running on our machine so you can access by clicking on this link http://cloud-romtourpe.westeurope.cloudapp.azure.com:3000 you can make some curl manually to each address or download the project on your machine and follow those instructions.<br />
To run the project on your virtual machine you have to follow those instructions : <br />
:warning:First of all you need to modify the environment variable in the [`scapp.yml`](src/scapp.yml) press ``[ctrl+H]`` then replace all cloud-romtourpe.westeurope.cloudapp.azure.com by your VM ip address :warning:



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
- 3009 -> logs service

you can access them by typing http://${YOUR_IP_ADDRESS}:$YOUR_PORT/_utils <br />
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
 In order to launch the scalability script of the differents daemon, use the 'make scalability' command.

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

