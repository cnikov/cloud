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
	docker run -d -p 3000:80 --name scapp-fe -e REACT_APP_AUTH_SERVICE="http://192.168.51.100:3002" scapp-fe
remove:
	docker rm scapp-fe
	docker rm scapp-be
	docker rm users-db
build:
	cd src/front-end/; docker build -t scapp-fe .
	cd src/back-end/storage/; docker build -t users-db .
	cd src/back-end/users/; docker build -t scapp-be .
stop:
	docker stop scapp-fe
	docker stop scapp-be
	docker stop users-db
