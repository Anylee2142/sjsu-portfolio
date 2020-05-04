define MYSQL_SETUP
mysql --user=root --password=cmpe281 -Bse \
\" \
create database cmpe281 ; \
use cmpe281 ; \
CREATE TABLE User ( \
    user_pk bigint(20) NOT NULL AUTO_INCREMENT, \
    user_uuid varchar(255) NOT NULL, \
    id varchar(255) NOT NULL, \
    pw varchar(255) NOT NULL, \
    PRIMARY KEY (user_pk), \
    UNIQUE KEY unique_user_uuid (user_uuid), \
    UNIQUE KEY unique_id (id) \
) ; \
CREATE TABLE Link ( \
    link_pk bigint(20) NOT NULL AUTO_INCREMENT, \
    link_uuid varchar(255) NOT NULL, \
    original_link varchar(255) NOT NULL, \
    shortened_link varchar(255) NOT NULL, \
    create_time varchar(255) NOT NULL, \
    user_pk bigint(20) NULL, \
    PRIMARY KEY (link_pk), \
    UNIQUE KEY unique_link_uuid (link_uuid), \
    FOREIGN KEY (user_pk) REFERENCES User(user_pk) \
) ; \
insert into User (user_uuid, id, pw) values ('i3c9ei2j21', 'sjsu', 'cmpe281') ; \
insert into User (user_uuid, id, pw) values ('9djqnx8231', 'jaewoong', 'cmpe281') ; \
insert into Link (link_uuid, original_link, shortened_link, create_time) values ('qkci3jej1b', 'www.google.com', 'qwerqwer', '1111') ; \
insert into Link (link_uuid, original_link, shortened_link, create_time, user_pk) values ('q23rasdvzc', 'cnn.com', 'asdfasdf', '1111', '2') ; \
insert into Link (link_uuid, original_link, shortened_link, create_time, user_pk) values ('hqw1234erz', 'https://www.sjsu.edu/', 'zxcvzxcv', '1111', '1') ; \
\"
endef
export MYSQL_SETUP

all: clean

clean: 
	find . -name 'gumball' -type f -exec rm -f {} \; 
	go clean

go-get:
	rm -rf src/github.com
	go get -v github.com/codegangsta/negroni
	go get -v github.com/gorilla/mux
	go get -v github.com/unrolled/render
	go get -v github.com/satori/go.uuid
	go get -v github.com/streadway/amqp
	go get -v github.com/go-sql-driver/mysql
	go get -v github.com/jmcvetta/napping

#format:
#	go fmt gumball
#
#install:
#	go install gumball

cp-build:
	go build cp

cp-start:
	./cp

lr-build:
	go build lr

lr-start:
	./lr

ts-build:
	go build ts

ts-start:
	./ts

sleep:
	sleep 20

sleep1:
	sleep 60

sleep2:
	sleep 20

local-setup: go-get db-setup app-setup kong-setup
	echo Launching Bitly Clone Successfully finished !

db-setup: rabbitmq-start mysql-start sleep mysql-setup
app-setup: app-build app-run
app-build: cp-docker-build lr-docker-build ts-docker-build
app-run: cp-docker-run lr-docker-run ts-docker-run
kong-setup: run-kong-db sleep1 bootstrap run-kong sleep2 kong-api-setup

teardown:
	docker rm -f kong-database
	docker rm -f kong
	docker rm -f cp
	docker rm -f lr
	docker rm -f ts
	docker rm -f mysql
	docker rm -f rabbitmq

rabbitmq-start:
	docker run -itd --rm --name rabbitmq --network api_network -p 5672:5672 -p 15672:15672 rabbitmq:3-management

mysql-start:
	docker run -d --name mysql --network api_network -e MYSQL_ROOT_PASSWORD=cmpe281 -p 3306:3306 jkl2142/mysql:v1.0

mysql-setup:
	docker exec -it mysql bash -c "$(MYSQL_SETUP)"

mysql-shell:
	docker exec -it mysql bash -c "mysql --user=root --password=cmpe281"

nosql-config:
	./nodeCommand.sh

cp-docker-build:
	docker build -t jkl2142/cp:v1.0 -f Dockerfile.cp .
	docker images

lr-docker-build:
	docker build -t jkl2142/lr:v1.0 -f Dockerfile.lr .
	docker images

ts-docker-build:
	docker build -t jkl2142/ts:v1.0 -f Dockerfile.ts .
	docker images

cp-docker-run:
	docker run --name cp --network api_network -td -p 3000:3000 jkl2142/cp:v1.0
	# docker run --name cp --network api_network -td -p 3000:3000 -e PORT=3000 -e RABBITMQ_URL="amqp://guest:guest@rabbitmq:5672/" jkl2142/cp:v1.0
	docker ps

lr-docker-run:
	docker run --name lr --network api_network -td -p 3001:3001 jkl2142/lr:v1.0
	# docker run --name lr --network api_network -td -p 3001:3001 -e PORT=3001 -e RABBITMQ_URL="amqp://guest:guest@rabbitmq:5672/" -e NOSQL_URL="http://api_node_1:9090/" -e MYSQL_URL="root:cmpe281@tcp(mysql:3306)/cmpe281" jkl2142/lr:v1.0
	docker ps

ts-docker-run:
	docker run --name ts --network api_network -td -p 3002:3002 jkl2142/ts:v1.0
	# docker run --name ts --network api_network -td -p 3002:3002 -e PORT=3002 -e NOSQL_URL="http://api_node_1:9090/" jkl2142/ts:v1.0
	docker ps

run-kong-db:
	docker run -d --name kong-database \
				   --network=api_network \
				   -p 9042:9042 \
				   cassandra:3

bootstrap:
	docker run --rm \
		--network=api_network \
		-e "KONG_DATABASE=cassandra" \
 		-e "KONG_PG_HOST=kong-database" \
		-e "KONG_PG_PASSWORD=kong" \
		-e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
		kong:2.0.2 kong migrations bootstrap

run-kong:
	docker run -d --name kong \
         --network=api_network \
         -e "KONG_DATABASE=cassandra" \
         -e "KONG_PG_HOST=kong-database" \
         -e "KONG_PG_PASSWORD=kong" \
         -e "KONG_CASSANDRA_CONTACT_POINTS=kong-database" \
         -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
         -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
         -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
         -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
         -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
         -p 8000:8000 \
         -p 8443:8443 \
         -p 8006:8001 \
         -p 8444:8444 \
         kong:2.0.2
	echo !!!!!!Note!!!!!! 8001 port is already occupied by one of NoSQL clusters.
	echo Internal Admin port 8001 is mapped to 8006

kong-api-setup:
	./configureKongLocal.sh

network-inspect:
	docker network inspect api_network

remove-stopped-container:
	docker rm $(docker ps -a -f status=exited -q)

remove-none-image:
	docker rmi $(docker images --filter "dangling=true" -q --no-trunc)

docker-ip:
	docker-machine ip

heroku-tag:
	docker build -t gumball .
	docker tag gumball registry.heroku.com/pnguyen-goapi/web

heroku-push:
	heroku login 
	heroku container:login
	docker push registry.heroku.com/pnguyen-goapi/web
