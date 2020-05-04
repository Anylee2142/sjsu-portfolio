#!/bin/bash
# When you launch NoSQL on Cloud
# Local setup doesn't need this script
firstName="34.220.38.47"
firstId="2ff877fc6e6d"


secondName="54.70.5.224"
secondId="065a521ac806"


thirdName="52.39.165.249"
thirdId="6900dae5fdb7"


fourthName="52.25.143.254"
fourthId="d4bba649713b"


fifthName="34.215.193.238"
fifthId="e266aca38f3f"


admin_port=8888
api_port=9090


curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$firstName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"


curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$secondName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"


curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$thirdName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"


curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fourthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"


curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$firstId\", \"name\" : \"$firstName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$secondId\", \"name\" : \"$secondName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$thirdId\", \"name\" : \"$thirdName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fourthId\", \"name\" : \"$fourthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"
curl -X POST http://$fifthName:8888/node -H 'Content-Type: application/json' -d "{ \"id\" : \"$fifthId\", \"name\" : \"$fifthName\", \"admin_port\" : \"$admin_port\", \"api_port\" : \"$api_port\"}"