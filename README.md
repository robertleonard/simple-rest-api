
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
npm install
```

## Prerequisites

Install Docker

```bash
# Example on Linux (debian)
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Make sure you are in the root of the project


## Run docker
In some terminal switch to the root of the project and make sure you have docker running in order to have the postgres database active

```bash
sudo docker compose up dev-db -d
```

## check that docker is running

```bash
sudo docker ps

# you should see the docker process details with the postgress image like this
CONTAINER ID   IMAGE         COMMAND                  CREATED      STATUS        PORTS                                         NAMES
5a64aaa20943   postgres:13   "docker-entrypoint.s…"   3 days ago   Up 12 hours   0.0.0.0:5434->5432/tcp, [::]:5434->5432/tcp   simple-rest-api-dev-db-1
```

## Ho to run

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```


## use the prisma studio to see the database

It should automatically open a browser with a frendly interface, otherwhise go to: http://localhost:5555/

```bash
npx prisma studio
```

## Run tests

There are no tests written at this point

## Documentation

Check the documentation generated with swagger at: http://localhost:3000/api

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
