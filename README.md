# Leitner
Leitner is a free and open source piece of software which allows users to create flashcards and create quizes from these flashcards, and then study those quizzes. It is based on the [Leitner studying system of spaced repetition](https://en.wikipedia.org/wiki/Leitner_system).

Leitner is built using Typescript, MongoDB, React, Express and Node.

For the licence, please see [LICENCE.md](LICENCE.md).

For version history and the changelog, please see [CHANGELOG.md](CHANGELOG.md)

For information on contributing to this project, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Set-up
### Server
1. Have a [MongoDB](https://www.mongodb.com/) instance set-up locally.
2. Run `cd server && npm i`.
3. Create your `.env` file in the `server/` directory, based off of the `.env.example`

To run the server, run `npm run start`.

### Client
1. Follow the steps above to have the server running.
2. Run `cd client && npm i`.
3. Create your `.env` file in the `client/` directory, based off of the `.env.example`.

To run the client, run `npm run start`.

Notes:
By default the front-end / client runs on port `3000`, if you wish to change this go into `client/package.json` and change the following line:
`"start": "npm run start",`

to

`"start": "set PORT=<PORT NUMBER YOU WANT TO RUN> && npm run start",` (for windows)

`"start": "PORT=<PORT NUMBER YOU WANT TO RUN> && npm run start",` (for mac / linux)

e.g.
  `"start": "cd client && set PORT=4234 && npm run start",`

In most cases you can skip this step.

### End-to-End Tests
1. Follow the steps above to have the server and client running.
2. Run `cd e2e && npm i`

To run the end-to-end tests in visual mode, run `npm run cypress:open`.

### .env fields
Field|Meaning|Example
----|--------|------|
`DB_URL`|The URL of the mongo instance|`mongodb://127.0.0.1`
`DB_PORT`|The port to connect to the mongo instance|`27017`
`DB_NAME`|The name of the mongo database which stores leiter data|`leitner`
`SERVER_HOST`|The host of the server part of the software (started usign `npm run start:server`). For testing you will want this set to `localhost`|`localhost`
`SERVER_PORT`|The port of the server part of the software (started using `npm run start:server`). For testing you will want this set to `3001`|`3001`
`CLIENT_HOST`|The host domain for the client / front-end|`localhost` if running locally|
`CLIENT_PORT`|The port the client runs on (only used for E2E tests)|`3000`
`TEST_ENV`|Whether this is running on a test environment|Set to `false` if running in production, set to `true` if running on tests|

## Running tests
**Note:** It is highly important that you set TEST_ENV to `true` before running `npm run test`. This command clears the database during the test run. *If `TEST_ENV` is not set to true, your production collections will be cleared and dropped!*

### Server
1. Follow the Server section in the Set-up section above.
2. Run `cd server/`.
3. Run `npm run tsc && npm run lint && npm run test`.

### Client
1. Follow the Client section in the Set-up section above.
2. Run `cd client/`
3. Run `npm run tsc && npm run lint && npm run test`.

### End-to-End
1. Follow the End-to-End Tests section in the Set-up section above.
2. Run `cd e2e`.
3. Run `npm run lint`.
4. Run `npm run cypress:run`.

The client and server linting, tsc and test steps are ran automatically on pushing commits; the e2e linting steps are also ran automatically on commits, but the end to end tests themselves are not.

## Support
* Donations to support this project - or even just to say thanks - are welcome here. Please donate via my [Kofi page](https://ko-fi.com/jringram).