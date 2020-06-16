###UserHistoryHDTO
Example:
 ```json
{
    "id": "exampleId",
    "name": "name",
    "timestamp": "FORMAT", 
    "items": [
        {   
            "orderNumber": 1,
            "localId": "localId",
            "localName": "localname",
            "coordinates": {
                "lat": 12.22,
                "lon": 13.33
            },
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
            "orderNumber": 2,
            "localId": "localId",
            "localName": "localname",
            "coordinates": {
                "lat": 12.22,
                "lon": 13.33
            },
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