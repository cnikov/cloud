#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
curl -X DELETE http://admin:admin@$ip4:3005/format/$1
