## Express-TypeScript

just another API

## How to run

1. Make sure [NodeJS](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/try/download/community) installed
2. Clone the repo
3. Make `.env` file in the root directory same as [`example.env`](./example.env)
4. Run these commands

```bash
$ npm i
$ npm start
```

#### Run using docker

Make sure u have [docker](https://www.docker.com/products/docker-desktop/) and [docker-compose](https://docs.docker.com/compose/install/)
-  Clone the repo 
- ```bash
  $ docker-compose -p <PROJECT-NAME> up
  ```
  > Run docker and set `<PROJECT NAME>` as u preferred
- Relax and make a coffee  ◌ ☕
---
<br>

- U will find the app up and running on [localhost:7000](http://localhost:7000/)
- See the docs on [localhost/api-docs](http://localhost:7000/api-docs)
- Download [postman](https://www.postman.com/downloads/) and load the [collection](./.github/api.postman_collection.json) and the [environment](./.github/api.postman_environment.json) to see and try api endpoints
