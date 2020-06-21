###FilterDTO

Example:  
 ```json
{
    "filters": {
        "categories": [
            {
                "id": "kategoria 1",
                "priceFrom": 0.01,
                "priceTo": 10.55
            },
            {
                "id": "kategoria 2",
                "priceFrom": 0,
                "priceTo": 10
            }
        ],
        "localization": {
            "lat": 50.01,
            "lon": 230.55,
            "maxDistance": 400
        },
        "productName": {
            "name": "Product name"
        }
    }
}
```