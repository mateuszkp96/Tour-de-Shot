# How use develop backend setup

1. Start container  
`docker-compose up`

2. Stop container without removing data  
`docker-compose stop`

3. Stop container with removing data  
`docker-compose down`

4. How pull new images version
 - run `docker-compose down` 
 - and then  `docker rmi $(docker images --filter=reference='mateusz43211/*:*_latest' -q)`
 - and then  `docker-compose up` should pull new images

Usage of backend:  
`localhost:80/api/local` -- access to local microservice  
`localhost:80/api/user` -- access to user microservice  
`localhost:80/api/history` -- access to userhistory microservice  

Example:  
1. Get list of locals: `localhost:80/api/local/local`
2. Get single local with id: `localhost:80/api/local/local/{id}`
3. Check health of user service: `localhost:80/api/user/actuator/health`

Swagger:
1. Local Service: `localhost:80/api/local/swagger-ui.html`
2. History Service: `localhost:80/api/history/swagger-ui.html`

Direct access to microservices:  
1. Local - `localhost:9090` - swagger `localhost:9090/swagger-ui.html`  
2. user - `localhost:9091`
3. history - 'localhost:9092' - swagger `localhost:9092/swagger-ui.html`   

Check if spring boot up is running
1. Core - `localhost:9090/actuator/health` - and then check `localhost:80/api/local/actuator/health`
2. User - `localhost:9091/actuator/health` - and then check `localhost:80/api/user/actuator/health`
3. UserHistory - `localhost:9092/actuator/health` - and then check `localhost:80/api/history/actuator/health`
