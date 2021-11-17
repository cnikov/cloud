load:
	echo "Connecting to docker hub ... \n"
	docker login
	echo "Loading images ... \n"
	docker pull chlohest/back-end
	docker pull chlohest/storage
start:
	docker start back-end
	docker start users-db
	docker start scapp-fe
run:
	docker run -d -p 3001:5984 --name users-db -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=admin users-db
	docker run -d -p 3002:80 --name scapp-be --link users-db scapp-be
	docker run -d -p 3000:80 --name scapp-fe -e REACT_APP_AUTH_SERVICE_URL='http://192.168.51.100:3002' scapp-fe
swarm:
	make build
	docker stack rm scapp
	cd src/;  docker stack deploy -c scapp.yml scapp
remove:
	docker rm $$(docker ps -aq)
build:
	cd src/front-end/; docker build -t scapp-fe .
	cd src/back-end/storage/; docker build -t users-db .
	cd src/back-end/storage/; docker build -t catalog-db .
	cd src/back-end/storage/; docker build -t shopping-db .
	cd src/back-end/users/; docker build -t scapp-be .
	cd src/back-end/catalog/; docker build -t catalog-be .
	cd src/back-end/shopping-kart/; docker build -t shopping-be .
add:
	curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/catalog
	curl -X POST --data "name=Brocolli&price=2&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/broccoli.jpg&category=Vegetable&id=1" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Cauliflower&price=6&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cauliflower.jpg&category=Vegetable&id=2" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Cucumber&price=5.5&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/cucumber.jpg&category=Vegetable&id=3" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Beetroot&price=8.7&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/beetroot.jpg&category=Vegetable&id=4" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Apple&price=2.34&image=https://res.cloudinary.com/sivadass/image/upload/v1493620045/dummy-products/apple.jpg&category=Fruits&id=6" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Banana&price=1.69&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/banana.jpg&category=Fruits&id=7" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Grapes&price=5.98&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/grapes.jpg&category=Fruits&id=8" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format
	curl -X POST --data "name=Mango&price=6.80&image=https://res.cloudinary.com/sivadass/image/upload/v1493620046/dummy-products/mango.jpg&category=Fruits&id=9" http://admin:admin@cloud-romtourpe.westeurope.cloudapp.azure.com:3005/format

stop:
	docker stop $$(docker ps -aq)
