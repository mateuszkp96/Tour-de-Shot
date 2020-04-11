###LocalMapDTO
Example:
 ```json
{
	"id":"exampleId",
	"name":"exampleName",
	"coordinates":{
		"lat":12.22,
		"lon":13.33
	},
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
    ],
    "website": "www",
    "contact": {
        "phoneNumber": "123123123",
        "email": "mail@gmail.com"
    },
    "menu": {
        "items": [
            {
                "orderNumber": 1,
                "categoryName": "vodka",
                "products": [
                    {
                        "id": "productId",
                        "name": "Sobieski",
                        "price": 15,
                        "description": "Some Description",
                        "ingredients": [],
                        "orderNumber": 1
                    }
                ]
            },
            {
                "orderNumber": 2,
                "categoryName": "drinks",
                "products": [
                    {
                        "id": "productId",
                        "name": "drinkName",
                        "price": 20,
                        "description": "Some Description",
                        "ingredients": ["vodka", "cherry"],
                        "orderNumber": 1
                    }
                ]
            }
        ]
    }
}
```
Schema:
```json
{
	"definitions": {},
	"$schema": "http://json-schema.org/draft-07/schema#", 
	"$id": "https://example.com/object1586617687.json", 
	"title": "Root", 
	"type": "object",
	"required": [
		"id",
		"name",
		"coordinates",
		"address",
		"image",
		"openingHours",
		"labels",
		"website",
		"contact",
		"menu"
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
,
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

		},
		"website": {
			"$id": "#root/website", 
			"title": "Website", 
			"type": "string",
			"default": "",
			"examples": [
				"www"
			],
			"pattern": "^.*$"
		},
		"contact": {
			"$id": "#root/contact", 
			"title": "Contact", 
			"type": "object",
			"required": [
				"phoneNumber",
				"email"
			],
			"properties": {
				"phoneNumber": {
					"$id": "#root/contact/phoneNumber", 
					"title": "Phonenumber", 
					"type": "string",
					"default": "",
					"examples": [
						"123123123"
					],
					"pattern": "^.*$"
				},
				"email": {
					"$id": "#root/contact/email", 
					"title": "Email", 
					"type": "string",
					"default": "",
					"examples": [
						"mail@gmail.com"
					],
					"pattern": "^.*$"
				}
			}
		}
,
		"menu": {
			"$id": "#root/menu", 
			"title": "Menu", 
			"type": "object",
			"required": [
				"items"
			],
			"properties": {
				"items": {
					"$id": "#root/menu/items", 
					"title": "Items", 
					"type": "array",
					"default": [],
					"items":{
						"$id": "#root/menu/items/items", 
						"title": "Items", 
						"type": "object",
						"required": [
							"orderNumber",
							"categoryName",
							"products"
						],
						"properties": {
							"orderNumber": {
								"$id": "#root/menu/items/items/orderNumber", 
								"title": "Ordernumber", 
								"type": "integer",
								"examples": [
									1
								],
								"default": 0
							},
							"categoryName": {
								"$id": "#root/menu/items/items/categoryName", 
								"title": "Categoryname", 
								"type": "string",
								"default": "",
								"examples": [
									"vodka"
								],
								"pattern": "^.*$"
							},
							"products": {
								"$id": "#root/menu/items/items/products", 
								"title": "Products", 
								"type": "array",
								"default": [],
								"items":{
									"$id": "#root/menu/items/items/products/items", 
									"title": "Items", 
									"type": "object",
									"required": [
										"id",
										"name",
										"price",
										"description",
										"ingredients",
										"orderNumber"
									],
									"properties": {
										"id": {
											"$id": "#root/menu/items/items/products/items/id", 
											"title": "Id", 
											"type": "string",
											"default": "",
											"examples": [
												"productId"
											],
											"pattern": "^.*$"
										},
										"name": {
											"$id": "#root/menu/items/items/products/items/name", 
											"title": "Name", 
											"type": "string",
											"default": "",
											"examples": [
												"Sobieski"
											],
											"pattern": "^.*$"
										},
										"price": {
											"$id": "#root/menu/items/items/products/items/price", 
											"title": "Price", 
											"type": "integer",
											"examples": [
												15
											],
											"default": 0
										},
										"description": {
											"$id": "#root/menu/items/items/products/items/description", 
											"title": "Description", 
											"type": "string",
											"default": "",
											"examples": [
												"Some Description"
											],
											"pattern": "^.*$"
										},
										"ingredients": {
											"$id": "#root/menu/items/items/products/items/ingredients", 
											"title": "Ingredients", 
											"type": "array",
											"default": []
										},
										"orderNumber": {
											"$id": "#root/menu/items/items/products/items/orderNumber", 
											"title": "Ordernumber", 
											"type": "integer",
											"examples": [
												1
											],
											"default": 0
										}
									}
								}

							}
						}
					}

				}
			}
		}

	}
}
```