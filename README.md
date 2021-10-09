# Events manager - playground application

A simple application for the recruitment process for the Junior Fullstack position.

The application is created using following technologies:

- React
- TypeScript
- MongoDB and Mongoose
- Node.js
- Express
- Jest

## Installation and application launch

To run the application following steps should be followed:

- Make sure you are using the correct node version, if not run `nvm install`
- Go to back-end folder
- Install required packages by running `npm install` command
- Blueprint file for `.env` file called `.envexample` with all necessary variables is provided in root directory. Ensure that following enviornmental variables in `.env` file are filled before running the application.

```
MONGO_USER=
MONGO_PASSWORD=
MONGO_PATH=
PORT=
```

- To launch the back-end side application use `npm run dev` command
- Go to front-end folder
- Install required packages by running `yarn install` command
- Blueprint file for `.env` file called `.envexample` with all necessary variables is provided in root directory. Ensure that following enviornmental variables in `.env` file are filled before running the application.

```
REACT_APP_BASE_URL=
```

- To launch the front-end side application use `yarn start` command

## Important notes

Ensure that the front-end application is pointing to correct url where back-end side resides.
Remember to create new collection in MongoDB.

## Further development plans

- [x] Implement support for POST action with view for adding new event,
- [x] Implement validation for new event
- [x] Tests,
- [ ] Individual user support,
- [ ] Application containerization,
- [ ] Support for actions GET, PUT, DELETE with related views,
