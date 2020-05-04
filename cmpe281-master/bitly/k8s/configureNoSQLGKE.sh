#!/bin/bash
# When you launch NoSQL on GKE
firstName="10.28.4.13"
firstId="nosql-pod-1"

secondName="10.28.0.13"
secondId="nosql-pod-2"

thirdName="10.28.2.14"
thirdId="nosql-pod-3"

fourthName="10.28.3.13"
fourthId="nosql-pod-4"

fifthName="10.28.1.19"
fifthId="nosql-pod-5"

admin_port=8888
api_port=9090

# Don't put itself's information because there is always "localhost" in GKE

curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"nosql-pod-1\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1

curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"nosql-pod-2\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1

curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"nosql-pod-3\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1

curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"nosql-pod-4\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1

curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"nosql-pod-5\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
sleep 1