# How use develop backend setup

1. Start container  
`docker-compose up`

2. Stop container without removing data  
`docker-compose stop`

3. Stop container with removing data  
`docker-compose down`

Usage of backend:  
`localhost:80/api/local` -- access to local microservice  
`localhost:80/api/user` -- access to user microservice  

Example:  
1. Get list of locals: `localhost:80/api/local/local`
2. Get single local with id: `localhost:80/api/local/{id}`
3. Check health of user service: `localhost:80/api/user/actuator/health`

Swagger:
1. Local Service: `localhost:80/api/local/swagger-ui.html`
