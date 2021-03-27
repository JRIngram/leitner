# Leitner
Leitner is a free and open source software which allows users to create flash cards and create quizes from these flashcards.

## Set-up
1. Have a [MongoDB](https://www.mongodb.com/) instance set-up locally.
2. Create your `.env` file, based off of the `.env.example` file (more info below).
3. Run `npm run start:server`
4. Run `npm run start:client`
5. Get practicising!

### .env file
Your `.env` file should have the following structure:
```
DB_URL=mongodb://<IP-ADDRESS>
DB_PORT=
DB_NAME=
SERVER_PORT=
HOST=
TEST_ENV=
```

Field|Meaning|Example
----|--------|------|
`DB_URL`|The URL of the mongo instance|`mongodb://127.0.0.1`
`DB_PORT`|The port ot connect ot the mongo instance|`27017`
`DB_NAME`|The name of the mongo database which stores leiter data|`leitner`
`SERVER_PORT`|The port of the server part of the software (started usign `npm run start:server`)|`3001`
`HOST`|The host domain|`localhost` if running locally|
`TEST_ENV`|Whether this is running on a test environment|Set to `false` if running in production, set to `true` if running on tests|

**Note:** It is highly important that you set TEST_ENV to `true` before running `npm run test`. This command clears the database during the test run. *If `TEST_ENV` is not set to true, your production collections will be cleared and dropped!*