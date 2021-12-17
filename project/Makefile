load:
	echo "Connecting to docker hub ... \n"
	docker login
	echo "Loading images ... \n"
	docker pull romain01/shopping-db
	docker pull romain01/catalog-db
	docker pull romain01/history-db
	docker pull romain01/users-db
	docker pull romain01/scapp-fe
	docker pull romain01/catalog-be
	docker pull romain01/shopping-be
	docker pull romain01/history-be
	
swarm:
	make build
	docker stack rm scapp
	cd src/;  docker stack deploy -c scapp.yml scapp
	cd src/back-end/catalog/;chmod +x fill_db.sh; ./fill_db.sh > /dev/null 2>&1
	chmod +x add_item.sh;chmod +x remove_item.sh;chmod +x remove_cart_item.sh;chmod +x add_cart.sh;chmod +x add_history.sh
	cd src/scalability/; chmod +x ./apply-policy-of-scalability.sh 
remove:
	docker rm $$(docker ps -aq)
build:
	cd src/front-end/; docker build -t scapp-fe .
	cd src/back-end/storage/; docker build -t users-db .
	cd src/back-end/storage/; docker build -t catalog-db .
	cd src/back-end/storage/; docker build -t shopping-db .
	cd src/back-end/storage/; docker build -t history-db .
	cd src/back-end/storage/; docker build -t logs-db .
	cd src/back-end/users/; docker build -t scapp-be .
	cd src/back-end/catalog/; docker build -t catalog-be .
	cd src/back-end/history/; docker build -t history-be .
	cd src/back-end/logs/; docker build -t logs-be .
	cd src/back-end/shopping-kart/; docker build -t shopping-be .
	cd src/scalability/artillery; docker build -t artillery .
	

stop:
	docker stop $$(docker ps -aq)
scalability:
	cd src/scalability/; ./apply-policy-of-scalability.sh scapp users-daemon > /dev/null &
	cd src/scalability/; ./apply-policy-of-scalability.sh scapp shopping-daemon > /dev/null &
	cd src/scalability/; ./apply-policy-of-scalability.sh scapp catalog-daemon > /dev/null &
	cd src/scalability/; ./apply-policy-of-scalability.sh scapp history-daemon > /dev/null &
artillery:
	docker run -d --name load-test --network scapp-net artillery
