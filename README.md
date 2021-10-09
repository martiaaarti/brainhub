# Events manager - playground application

A simple application for the recruitment process for the Junior Fullstack position.

The application is created using following technologies:

- React
- TypeScript
- MongoDB
- Node.js
- Express

## Installation and application launch

To run the application following steps should be followed:

- Make sure you are using the correct node version, if not run `nvm install`
- Go to server folder
- Install required packages by running `npm install` command
- Blueprint file for `.env` file called `.envexample` with all necessary variables is provided in root directory. Ensure that following enviornmental variables in `.env` file are filled before running the application.

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_PATH=
PORT=
```

- To launch the server side application use `npm run dev` command
- Go to client folder
- Install required packages by running `yarn install` command
- Blueprint file for `.env` file called `.envexample` with all necessary variables is provided in root directory. Ensure that following enviornmental variables in `.env` file are filled before running the application.

```
REACT_APP_BASE_URL=
```

- To launch the client side application use `yarn start` command

## Important notes

Ensure that the client application is pointing to correct url where server side resides.

## Further development plans

- [x] Implement support for POST action with view for adding new event (including fronted tests),
- [x] Implement validation for new event
- [ ] Test backed,
- [ ] Individual user support,
- [ ] Application containerization,
- [ ] Support for actions GET, PUT, DELETE with related views,
