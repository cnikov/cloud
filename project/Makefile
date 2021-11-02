load:
	echo "Connecting to docker hub ... \n"
	docker login
	echo "Loading images ... \n"
	docker pull chlohest/back-end
	docker pull chlohest/storage
start:
	docker start back-end
	docker start storage
	docker start scapp-fe
run:
	docker run -d -p 3000:80 --name scapp-fe lingi2145/scapp-fe-release:v1.0
	docker run -d -p 3001:80 --name scapp-be chlohest/back-end
	docker run -d -p 3002:80 --name storage chlohest/storage
remove:
	docker rm scapp-fe
	docker rm scapp-be
	docker rm kv-storage
	docker rm storage
build:
	cd src/front-end/; docker build -t scapp-fe .
	cd src/back-end/storage/; docker build -t storage .
	cd src/back-end/users/; docker build -t scapp-be .
