#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
curl -X POST --data "username=hey&password=hey" http://admin:admin@$ip4:3002/user
curl -X POST --data "name=$1&quantity=$2&username=$3&price=$4&id=$5" http://admin:admin@$ip4:3006/shopping-kart
curl -X POST http://admin:admin@$ip4:3008/$1