###LocalSimpleDTO

Example:  
 ```json
{
    "id": "exampleId",
    "name": "exampleName",
    "coordinates": {
        "lat": 12.22,
        "lon": 13.33
    },
    "address": {
        "city": "Warsaw",
        "street": "Świętokrzyska 4",
        "postCode": "02-100"
    },
    "distance": 150,
    "image": "www.abcimage.com",
    "openingHours": {
        "openStatus": "Open",
        "presentDayIndex": 2,
        "schedule": [
            {
                "orderNumber": 0,
                "dayOfWeek": "Mon",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 1,
                "dayOfWeek": "Tue",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 2,
                "dayOfWeek": "Wed",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 3,
                "dayOfWeek": "Thu",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 4,
                "dayOfWeek": "Fri",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 5,
                "dayOfWeek": "Sat",
                "time": "08:00 - 22:00"
            },
            {
                "orderNumber": 6,
                "dayOfWeek": "MON",
                "time": "08:00 - 22:00"
            }
        ]
    },
    "localCategories": [
        "pub",
        "restauracja",
        "bar"
    ],
    "priceCategory": 1,
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
