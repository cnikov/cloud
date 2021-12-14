#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
data=$('{"item":'${1}',"list1":'${2}',"list2":'${3}'}')
echo $data
curl -X POST -H "Content-Type: application/json" --data $data http://admin:admin@$ip4:3010/logs/recommendation
