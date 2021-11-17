#!/bin/bash -
#===============================================================================
#
#          FILE: boot-in-order.sh
#
#         USAGE: ./boot-in-order.sh
#
#   DESCRIPTION:
#     Waits until the deamon of CouchDB starts to create a database. The
#     environment variable DB_URL contains more details of such DB
#     (name, authentication information of administrator, etc).
#       OPTIONS: ---
#  REQUIREMENTS: This script makes use of the environment variables DB_NAME and
#     DB_URL, be sure that such variables were defined before running this script.
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: Raziel Carvajal-Gomez (), raziel.carvajal@uclouvain.be
#  ORGANIZATION:
#       CREATED: 10/08/2018 09:20
#      REVISION:  ---
#===============================================================================

echo "Wait (indefenitly) until the DB creation (name: ${DB_NAME_C})."
echo "The DB URL is: ${DB_URL_C}"
until curl --request PUT ${DB_URL_C} ; do
  echo -e "\t DB (${DB_NAME_C}) wasn't created - trying again later..."
  sleep 2
done
until curl --request PUT ${DB_URL_F} ; do
  echo -e "\t DB (${DB_NAME_F}) wasn't created - trying again later..."
  sleep 2
done
until curl --request PUT ${DB_URL_L} ; do
  echo -e "\t DB (${DB_NAME_L}) wasn't created - trying again later..."
  sleep 2
done
until wget --post-data 'name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1' http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
 echo "En attente de la creation de la db"
  sleep 2
done
#until curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#until curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format ;do
#  echo "En attente de la creation de la db"
#  sleep 5
#done
#POSTMAN -- generer les requetes get et app sans passer via frontend
echo "DB (${DB_NAME_F}) was created!"
echo "Start users service..."
source post_db.sh ${DB_URL_C}
npm start


