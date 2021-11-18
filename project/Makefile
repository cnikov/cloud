load:
	echo "Connecting to docker hub ... \n"
	docker login
	echo "Loading images ... \n"
	docker pull romain01/shopping-db
	docker pull romain01/catalog-db
	docker pull romain01/users-db
	docker pull romain01/scapp-fe
	docker pull romain01/catalog
	docker pull romain01/shopping-kart
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
	cd src/back-end/catalog/;chmod +x fill_db.sh; ./fill_db.sh > /dev/null 2>&1
	chmod +x add_item.sh;chmod +x remove_item.sh
remove:
	docker rm $$(docker ps -aq)
build:
	cd src/front-end/; docker build -t scapp-fe .
	cd src/back-end/storage/; docker build -t users-db .
	cd src/back-end/storage/; docker build -t catalog-db .
	cd src/back-end/storage/; docker build -t shopping-db .
	cd src/back-end/storage/; docker build -t history-db .
	cd src/back-end/users/; docker build -t scapp-be .
	cd src/back-end/catalog/; docker build -t catalog-be .
	cd src/back-end/history/; docker build -t history-be .
	cd src/back-end/shopping-kart/; docker build -t shopping-be .
	

stop:
	docker stop $$(docker ps -aq)
