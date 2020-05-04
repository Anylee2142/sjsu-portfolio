#!/bin/bash

cp="bitly-cp-nlb-3524ab23fd772b8c.elb.us-west-2.amazonaws.com:8080"
lr="bitly-lr-nlb-ce2b27dba95c9e25.elb.us-west-2.amazonaws.com:8080"
ts="10.0.65.190:3002"

# Add API for Control Panel
curl --location --request POST 'http://localhost:8001/services' \
--header 'Content-Type: application/json' \
--data '{
	"name": "ControlPanel",
	"url": "http://'"$cp"'/"
}'

# Add Route for Control Panel
curl --location --request POST 'http://localhost:8001/services/ControlPanel/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "ControlPanelRouted",
	"protocols": ["http", "https"],
	"service": "ControlPanel",
	"paths": ["/link"],
	"strip_path": false
}'

# Add API for Link Redirect
curl --location --request POST 'http://localhost:8001/services' \
--header 'Content-Type: application/json' \
--data '{
	"name": "LinkRedirect",
	"url": "http://'"$lr"'/"
}'

# Add Route for Link Redirect
curl --location --request POST 'http://localhost:8001/services/LinkRedirect/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "LinkRedirectRouted",
	"protocols": ["http", "https"],
	"service": "LinkRedirect",
	"paths": ["/"],
	"strip_path": false
}'

# Add API for Trend Server
curl --location --request POST 'http://localhost:8001/services' \
--header 'Content-Type: application/json' \
--data '{
	"name": "TrendServer",
	"url": "http://'"$ts"'"
}'

# Add Route for All events from Trend Server
curl --location --request POST 'http://localhost:8001/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "TrendServerAllRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/all"],
	"strip_path": false
}'

# Add Route for Generate events from Trend Server
curl --location --request POST 'http://localhost:8001/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "TrendServerGenerateRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/generate"],
	"strip_path": false
}'

# Add Route for Click events from Trend Server
curl --location --request POST 'http://localhost:8001/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "TrendServerClickRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/click"],
	"strip_path": false
}'

# Add Route for Clicks Aggregates
curl --location --request POST 'http://localhost:8001/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data '{
	"name": "TrendServerAggregateRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/aggregate"],
	"strip_path": false
}'

# Add a Client
curl --location --request POST 'http://localhost:8001/consumers' \
--header 'Content-Type: application/json' \
--data '{
	"username":"apiclient"
}'

# Add a Key-Auth Plugin for Control Panel
curl --location --request POST 'http://localhost:8001/services/ControlPanel/plugins' \
--header 'Content-Type: application/json' \
--data '{
	"name":"key-auth"
}'

# Add a Key-Auth Plugin for Link Redirect
curl --location --request POST 'http://localhost:8001/services/LinkRedirect/plugins' \
--header 'Content-Type: application/json' \
--data '{
	"name":"key-auth"
}'

# Add a Key-Auth Plugin for Trend Server
curl --location --request POST 'http://localhost:8001/services/TrendServer/plugins' \
--header 'Content-Type: application/json' \
--data '{
	"name":"key-auth"
}'

# Add an API Key for the Client
curl --location --request POST 'http://localhost:8001/consumers/apiclient/key-auth' \
--header 'Content-Type: application/json' \
--data '{
	"key":"20200318A"
}'
