#!/bin/bash -
curl -X POST --data "name=$1&price=$2&image=$3&category=$4&id=$5" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
curl -X POST --data "name=$1&price=$2&image=$3&category=$4&id=$5" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
curl -X POST --data "name=$1" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/listitem