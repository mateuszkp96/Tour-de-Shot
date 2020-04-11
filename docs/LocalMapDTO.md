###LocalMapDTO
Example:
 ```json
{
	"id":"exampleId",
	"name":"exampleName",
	"coordinates":{
		"lat":12.22,
		"lon":13.33
	}
}
```
Schema:
```json
{
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://example.com/object1586613968.json", 
	"title": "LocalMapDTO", 
	"type": "object",
	"required": [
		"id",
		"name",
		"coordinates"
	],
	"properties": {
		"id": {
			"$id": "#root/id", 
			"title": "Id", 
			"type": "string",
			"default": "",
			"examples": [
				"exampleId"
			],
			"pattern": "^.*$"
		},
		"name": {
			"$id": "#root/name", 
			"title": "Name", 
			"type": "string",
			"default": "",
			"examples": [
				"exampleName"
			],
			"pattern": "^.*$"
		},
		"coordinates": {
			"$id": "#root/coordinates", 
			"title": "Coordinates", 
			"type": "object",
			"required": [
				"lat",
				"lon"
			],
			"properties": {
				"lat": {
					"$id": "#root/coordinates/lat", 
					"title": "Lat", 
					"type": "number",
					"examples": [
						12.22
					],
					"default": 0.0
				},
				"lon": {
					"$id": "#root/coordinates/lon", 
					"title": "Lon", 
					"type": "number",
					"examples": [
						13.33
					],
					"default": 0.0
				}
			}
		}

	}
}
```