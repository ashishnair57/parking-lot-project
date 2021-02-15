# Create Parking lot project (Node + Mysql + Docker Compose)

This project runs a Node server and MySql server app via 2 separate containers using Docker Compose file.

## Run Project

```
docker-compose up -d
```

The `server/` and `db/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The server is spun up at `localhost:7007` and it proxies internally to the server using the linked name as `server:3000` and the database via server using linked name as `db:33166`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

## Notes

### Using docker compose

Start via:

```
docker-compose up

# or detached
docker-compose up -d
```

Run a container of the server image via:

```
docker-compose run server /bin/bash
```

Check status:

```
docker-compose ps
```

Stop:

```
docker-compose down
```
### db setup

Create database:

```
docker-compose exec server npx sequelize db:migrate 
```

Dummy data:

```
 docker-compose exec server npx sequelize db:seed:all
```

## Build the complete application with dummy data

There is a Makefile file which runs all the above command to build the complete application and inserting dummy data in database.

```
make rerun
```

## Additional documents

As this project is containerize in docker and if you dont have docker install you can follow the bellow link to install docker on your system

https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04