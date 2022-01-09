# Dugo_demo

A demo app showing a simple service using node.js

### Requirements

 * Docker CE >= 17.04

### Stack Information

* node.js
* typescript
* swagger

### Instructions
### challenge_1

```
cd challenge_1
```

```
npm i
```

```
node beer.js
```

### challenge_3
- Build and kick off all the services with docker-compose.

```
cd challenge_3
```

```
docker-compose up -d --build
```

- Backend.

```
http://localhost:8000/docs
```


 You can omit -d if you want to run it in the foreground and dump all logs from all containers into your terminal. Alternatively you can use ```docker logs <container name> -f``` to tail logs from a specific container.

You can use ```docker ps``` command to see the running containers. You should see 4 running containers. 

Other useful commands for stopping, starting and restarting the services.

```
docker-compose stop | start | restart
```
