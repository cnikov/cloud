#!/bin/bash -
curl -X REMOVE http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog/$1
curl -X REMOVE http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format/$1
curl -X REMOVE http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/listitem/$1