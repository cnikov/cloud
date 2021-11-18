#!/bin/bash -
ip4=$(hostname -I | awk '{print $1}' )
until curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 5
done
until curl --request POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@$ip4:3005/catalog ;do 
    echo "En attente de la creation de la db"
sleep 1
done
until curl --request POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@$ip4:3005/catalog ;do 
    echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@$ip4:3005/catalog ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
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
until curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@$ip4:3005/format ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Mango" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Grapes" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Apple" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Mango" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Beetroot" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Cauliflower" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Cucumber" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
until curl -X POST --data "name=Brocolli" http://admin:admin@$ip4:3005/listitem ;do
  echo "En attente de la creation de la db"
  sleep 1
done
echo "DB ça fonctionne was created!"