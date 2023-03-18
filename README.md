# Getting Started (Create React App with CRUD Operations)

This is a project created with Create React App, which is a popular tool for setting up a new React project quickly. The project is a Redux-based React app that includes a thunk middleware for asynchronous actions, as well as login/logout functionality and basic CRUD operations.

To get started with this project, you'll need to first install Node.js on your computer. You can download it from the official Node.js website: https://nodejs.org/

Once you have Node.js installed, you can clone the project from its repository or download it as a ZIP file. Then, navigate to the project directory in your terminal/command prompt and run the following command to install the project's dependencies:


## Available Scripts

In the project directory, you can run:

### `npm install`

After the installation is complete, you can start the development server by running the following command:

### `npm start`

This will start the app in development mode, and you can view it in your browser at http://localhost:3000.

Now we need a server for our DATABASE:
The project includes a JSON database file named DB.json, which can be used with a tool called json-server to provide a simple REST API. To use json-server, you'll need to install it globally by running the following command:


### `npm install -g json-server`

Once json-server is installed, you can run the following command in the project directory to start the database server:

### `json-server.cmd --watch ./DB.json --port=3002`


>**Note**
>default login password: EMAIL= hello@gmail.com : PASS= 12345678


To build the app for production, run the following command:

### `npm run build`

This will create a production-ready version of the app in the build folder.

**Warning**
This is not going to work on deployment cause we need a server for it that can be based on any tech stack like springboot , nodejs etc.
