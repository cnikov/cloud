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
until curl -X POST --data "id=1&name=chou&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=non" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog; do
sleep2
done

echo "DB (${DB_NAME_C}) was created!"
echo "Start users service..."


npm start
