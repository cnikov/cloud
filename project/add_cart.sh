#!/bin/bash -
curl -X POST --data "username=hey&password=hey" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3002/user
curl -X POST --data "name=$1&quantity=$2&username=$3&price=$4&id=$5" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3006/shopping-kart
