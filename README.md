# MERN stack Todo app made with TypeScript
I made this projec to learn how to make MERN stack apps with TypeScript

## How to run this project?
### Prerequisites
1. Install [Node.js](https://nodejs.org/en/)
2. Install [MongoDB](https://www.mongodb.com/cloud/atlas)
### Getting started
```
git clone git@github.com:roshatron2/mern-ts-todo-app.git
```
Install frontend dependencies

```
cd client
npm i
```
Install backend dependancies

```
cd api
npm i
```

Create a .env file in api folder

```
PORT=<Port number>
MONGOURI=<Paste your MongoDB Atlas URL>
```
Create a .env file in client folder
```
BACKEND_URL = http://localhost:<PORT>
```
Start the React app

```
cd client
npm start
```
Start the server

```
cd api
npm run start
```

## Routes
| Route | HTTP verb | Description|
|-------|-----------|------------|
|/todos | GET       | Returns all the Todos|
|/add-todo | POST | Create a Todo |
|/edit-todo/:id | PUT | Update the contents of the Todo |
|/delete-todo/:id | DELETE | Delete a Todo |
