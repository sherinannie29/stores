# Stores

# Description : 
A mock server that supports 2 entities : 
1. Posts 
2. Authors 

The details for these entities are stored in ./stores.json

The following functionalities are supported by the application : 
1. GET    /posts   <br />
2. GET    /posts/0 <br />
3. POST   /posts  <br />
4. PUT    /authors/1 <br />
5. PATCH  /posts/1 <br />
6. DELETE /posts/1 <br />
7. Enable filtering at entity level :
    GET /posts?title=title1&author=CIQ <br />
8. Enable sorting at entity level :
    GET /posts?_sort=views&_order=asc <br />
9. Enable basic search at entity level:
    GET /posts?q=IQ <br />

Public endpoint for the server : http://stores-elb-1132834062.us-east-2.elb.amazonaws.com/  <br />
The application has been deployed using AWS ECS with CICD setup using Code Pipeline  <br />

Postman collection link : https://www.getpostman.com/collections/46c7d7f7dc5c78750899


