###LocalSimpleDTO

Example:  
 ```json
{
	"id":"exampleId",
	"name":"exampleName",
	"coordinates":{
		"lat":12.22,
		"lon":13.33
	}
    "address": {
        "city": "Warsaw",
        "street": "Świętokrzyska 4",
        "postCode": "02-100"
    },
    "image": "www.abcimage.com",
    "openingHours": [
        {
            "orderNumber": 1,
            "dayOfWeek": "Mon",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 2,
            "dayOfWeek": "Tue",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 3,
            "dayOfWeek": "Wed",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 4,
            "dayOfWeek": "Thu",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 5,
            "dayOfWeek": "Fri",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 6,
            "dayOfWeek": "Sat",
            "open": "08:00",
            "close": "22:00"
        },
        {
            "orderNumber": 7,
            "dayOfWeek": "MON",
            "open": "08:00",
            "close": "22:00"
        }
    ],
    "labels": [
        {
            "id": 1,
            "name": "beer"
        },
        {
            "id": 2,
            "name": "vodka"
        }
    ]
        
}
```
Schema:
```json
{
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://example.com/object1586616317.json", 
	"title": "Root", 
	"type": "object",
	"required": [
		"id",
		"name",
		"address",
		"image",
		"openingHours",
		"labels"
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
		"address": {
			"$id": "#root/address", 
			"title": "Address", 
			"type": "object",
			"required": [
				"city",
				"street",
				"postCode"
			],
			"properties": {
				"city": {
					"$id": "#root/address/city", 
					"title": "City", 
					"type": "string",
					"default": "",
					"examples": [
						"Warsaw"
					],
					"pattern": "^.*$"
				},
				"street": {
					"$id": "#root/address/street", 
					"title": "Street", 
					"type": "string",
					"default": "",
					"examples": [
						"Świętokrzyska 4"
					],
					"pattern": "^.*$"
				},
				"postCode": {
					"$id": "#root/address/postCode", 
					"title": "Postcode", 
					"type": "string",
					"default": "",
					"examples": [
						"02-100"
					],
					"pattern": "^.*$"
				}
			}
		}
,
		"image": {
			"$id": "#root/image", 
			"title": "Image", 
			"type": "string",
			"default": "",
			"examples": [
				"www.abcimage.com"
			],
			"pattern": "^.*$"
		},
		"openingHours": {
			"$id": "#root/openingHours", 
			"title": "Openinghours", 
			"type": "array",
			"default": [],
			"items":{
				"$id": "#root/openingHours/items", 
				"title": "Items", 
				"type": "object",
				"required": [
					"orderNumber",
					"dayOfWeek",
					"open",
					"close"
				],
				"properties": {
					"orderNumber": {
						"$id": "#root/openingHours/items/orderNumber", 
						"title": "Ordernumber", 
						"type": "integer",
						"examples": [
							1
						],
						"default": 0
					},
					"dayOfWeek": {
						"$id": "#root/openingHours/items/dayOfWeek", 
						"title": "Dayofweek", 
						"type": "string",
						"default": "",
						"examples": [
							"Mon"
						],
						"pattern": "^.*$"
					},
					"open": {
						"$id": "#root/openingHours/items/open", 
						"title": "Open", 
						"type": "string",
						"default": "",
						"examples": [
							"08:00"
						],
						"pattern": "^.*$"
					},
					"close": {
						"$id": "#root/openingHours/items/close", 
						"title": "Close", 
						"type": "string",
						"default": "",
						"examples": [
							"22:00"
						],
						"pattern": "^.*$"
					}
				}
			}

		},
		"labels": {
			"$id": "#root/labels", 
			"title": "Labels", 
			"type": "array",
			"default": [],
			"items":{
				"$id": "#root/labels/items", 
				"title": "Items", 
				"type": "object",
				"required": [
					"id",
					"name"
				],
				"properties": {
					"id": {
						"$id": "#root/labels/items/id", 
						"title": "Id", 
						"type": "integer",
						"examples": [
							1
						],
						"default": 0
					},
					"name": {
						"$id": "#root/labels/items/name", 
						"title": "Name", 
						"type": "string",
						"default": "",
						"examples": [
							"beer"
						],
						"pattern": "^.*$"
					}
				}
			}

		}
	}
}
```