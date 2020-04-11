###LocalMapDTO
Example:
 ```json
{
    "id": "exampleId",
    "items": [
        {
            "localId": "localId",
            "products": [
                {
                    "productId": "productId",
                    "name": "productname",
                    "price": 12,
                    "quantity": 2
                },
                {
                    "productId": "productId",
                    "name": "productname",
                    "price": 12,
                    "quantity": 3
                }
            ]
        },
        {
            "localId": "localId",
            "products": [
                {
                    "productId": "productId",
                    "name": "productname",
                    "price": 12,
                    "quantity": 2
                },
                {
                    "productId": "productId",
                    "name": "productname",
                    "price": 12,
                    "quantity": 3
                }
            ]
        }
    ],
    "price": 100.2
}
```
Schema:
```json
{
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://example.com/object1586618375.json", 
	"title": "Root", 
	"type": "object",
	"required": [
		"id",
		"items",
		"price"
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
		"items": {
			"$id": "#root/items", 
			"title": "Items", 
			"type": "array",
			"default": [],
			"items":{
				"$id": "#root/items/items", 
				"title": "Items", 
				"type": "object",
				"required": [
					"localId",
					"products"
				],
				"properties": {
					"localId": {
						"$id": "#root/items/items/localId", 
						"title": "Localid", 
						"type": "string",
						"default": "",
						"examples": [
							"localId"
						],
						"pattern": "^.*$"
					},
					"products": {
						"$id": "#root/items/items/products", 
						"title": "Products", 
						"type": "array",
						"default": [],
						"items":{
							"$id": "#root/items/items/products/items", 
							"title": "Items", 
							"type": "object",
							"required": [
								"productId",
								"name",
								"price",
								"quantity"
							],
							"properties": {
								"productId": {
									"$id": "#root/items/items/products/items/productId", 
									"title": "Productid", 
									"type": "string",
									"default": "",
									"examples": [
										"productId"
									],
									"pattern": "^.*$"
								},
								"name": {
									"$id": "#root/items/items/products/items/name", 
									"title": "Name", 
									"type": "string",
									"default": "",
									"examples": [
										"productname"
									],
									"pattern": "^.*$"
								},
								"price": {
									"$id": "#root/items/items/products/items/price", 
									"title": "Price", 
									"type": "integer",
									"examples": [
										12
									],
									"default": 0
								},
								"quantity": {
									"$id": "#root/items/items/products/items/quantity", 
									"title": "Quantity", 
									"type": "integer",
									"examples": [
										2
									],
									"default": 0
								}
							}
						}

					}
				}
			}

		},
		"price": {
			"$id": "#root/price", 
			"title": "Price", 
			"type": "number",
			"examples": [
				100.2
			],
			"default": 0.0
		}
	}
}

```