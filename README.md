## Express-TypeScript

just another API

## How to run

- Make sure [NodeJS](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/try/download/community) installed
- Clone the repo
- Make `.env` file in the root directory same as [`example.env`](./example.env)
- Run these commands

```bash
$ npm i
$ npm start
```

#### Run using docker

Make sure u have [docker](https://www.docker.com/products/docker-desktop/) and [docker-compose](https://docs.docker.com/compose/install/)

```bash
$ docker-compose -p <PROJECT-NAME> up

> ◌ just relax and make a coffee ☕
```

- U will find the app up and running on [localhost:7000](http://localhost:7000/)
- See the docs on [localhost/api-docs](http://localhost:7000/api-docs)
- Download [postman](https://www.postman.com/downloads/) and load the [collection](./.github/api.postman_collection.json) and the [environment](./.github/api.postman_environment.json) to see and try api endpoints
