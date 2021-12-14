#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
curl -X POST --data "name=$1&price=$2&image=$3&category=$4&id=$5" http://admin:admin@$ip4:3005/format
