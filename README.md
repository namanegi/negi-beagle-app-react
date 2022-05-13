# Negi-Beagle-App

## 1) Introduction
### 1.1) Abstract

* This project is created by Namanegi, with multiple contents inside it.
* React.js is used as the main framework, while a Websocket written in node.js is also included.

* The front end was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 1.2) Requirements
* Node.js version ^14 is request.

## 2) Installation and Start up
### 2.1) WebSocket Server
* The WebSocket Server is located in ./wsserver directory.
* The WS Server is written in node.js.
* To start the server, run:
`node ./wsserver/server.js`
The server will run on port 5001.
### 2.2) Back-End
* Due to the update in 2022/05/13, a User-Management-System is required for this project.
* Currently, the front-end uses http://localhost:8000 as the ums api server.
* You can find a suitable api-server in [my another reposit](https://github.com/namanegi/negi-ums-flask).
  * The Bearer Authoration is used to auth the connection.
  * The token is stored in session storage.
### 2.3) Front-End
* In the project directory, firstly run:
`npm i`
This command will install all the requested package for this project.
  * (You may need to delete package-lock.json firstly, if ERR log comes out.)
* After installation, run:
`npm start`
  To run the app in the development mode.
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

  * The page will reload when you make changes.
  * You may also see any lint errors in the console.
* The WebSocket client will defaultly connect to `ws://localhost:5001`, therefore, please start up the WebSocket server before accessing front-end pages.
* To build this project, run:
 `npm run build`

  The app for production will be built into the `build` folder.
  * It correctly bundles React in production mode and optimizes the build for the best performance.

  * The build is minified and the filenames include the hashes.

  * See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
 
## 3) Contents
### 3.1) User Management
* User login and auth is available in the project.
  * However, login is not necessary. Unlogin user will be recognized as `guest`.
### 3.2) Gomoku Game
#### 3.2.1) Online Gomoku Game
#### 3.2.2) Local Gomoku Game
## Learn More

* To learn React, check out the [React documentation](https://reactjs.org/).
