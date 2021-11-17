#!/bin/bash -
until curl --request POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do 
    echo "En attente de la creation de la db"
sleep 2
done
echo "DB ça fonctionne was created!"