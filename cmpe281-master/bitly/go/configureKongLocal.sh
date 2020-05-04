#!/bin/bash

# Add API for Control Panel
curl --location --request POST 'http://localhost:8006/services' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "ControlPanel",
	"url": "http://cp:3000/"
}'

# Add Route for Control Panel
curl --location --request POST 'http://localhost:8006/services/ControlPanel/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "ControlPanelRouted",
	"protocols": ["http", "https"],
	"service": "ControlPanel",
	"paths": ["/link"],
	"strip_path": false
}'

# Add API for Link Redirect
curl --location --request POST 'http://localhost:8006/services' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "LinkRedirect",
	"url": "http://lr:3001/"
}'

# Add Route for Link Redirect
curl --location --request POST 'http://localhost:8006/services/LinkRedirect/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "LinkRedirectRouted",
	"protocols": ["http", "https"],
	"service": "LinkRedirect",
	"paths": ["/"],
	"strip_path": false
}'

# Add API for Trend Server
curl --location --request POST 'http://localhost:8006/services' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "TrendServer",
	"url": "http://ts:3002/"
}'

# Add Route for All events from Trend Server
curl --location --request POST 'http://localhost:8006/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "TrendServerAllRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/all"],
	"strip_path": false
}'

# Add Route for Generate events from Trend Server
curl --location --request POST 'http://localhost:8006/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "TrendServerGenerateRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/generate"],
	"strip_path": false
}'

# Add Route for Click events from Trend Server
curl --location --request POST 'http://localhost:8006/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "TrendServerClickRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/click"],
	"strip_path": false
}'

# Add Route for Clicks Aggregates
curl --location --request POST 'http://localhost:8006/services/TrendServer/routes' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "TrendServerAggregateRouted",
	"protocols": ["http", "https"],
	"service": "TrendServer",
	"paths": ["/aggregate"],
	"strip_path": false
}'

# Add a Client
curl --location --request POST 'http://localhost:8006/consumers' \
--header 'Content-Type: application/json' \
--data-raw '{
	"username":"apiclient"
}'

# Add a Key-Auth Plugin for Control Panel
curl --location --request POST 'http://localhost:8006/services/ControlPanel/plugins' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name":"key-auth"
}'

# Add a Key-Auth Plugin for Link Redirect
curl --location --request POST 'http://localhost:8006/services/LinkRedirect/plugins' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name":"key-auth"
}'

# Add a Key-Auth Plugin for Trend Server
curl --location --request POST 'http://localhost:8006/services/TrendServer/plugins' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name":"key-auth"
}'

# Add an API Key for the Client
curl --location --request POST 'http://localhost:8006/consumers/apiclient/key-auth' \
--header 'Content-Type: application/json' \
--data-raw '{
	"key":"20200318A"
}'
