#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
curl -X POST -H "Content-Type: application/json" --data '{"item":${1},"list1":${2},"list2:${3}}' http://admin:admin@$ip4:3010/logs/recommendation
