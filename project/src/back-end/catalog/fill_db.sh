#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )

until curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 5
done
until curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done

echo "DB ça fonctionne was created!"