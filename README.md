# Angular CRUD App with Express and JSON Server

This project is an **Angular CRUD** (Create, Read, Update, Delete) application with a backend implemented using **Express** and **JSON Server**. It allows users to manage tasks, including uploading images.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
  - [Starting the Server](#starting-the-server)
  - [Running the Angular App](#running-the-angular-app)
- [Endpoints](#endpoints)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following software installed on your machine:

- [**Node.js**](https://nodejs.org/)
- [**Angular CLI**](https://angular.io/cli)

### Installation

Clone the repository

Install dependencies for the Angular app:

- cd src
- npm install

Install dependencies for the Express server:

- ../server
- npm install

## Project Structure

- **.angular**: Angular configuration files.
- **.vscode**: Visual Studio Code configuration files.
- **node_modules**: Node.js dependencies.
- **server**: Express server files.
  - **node_modules**: Server-specific dependencies.
  - **uploads**: Directory for uploaded images.
  - **db.json**: JSON file serving as a simple database.
  - **package-lock.json**: Detailed dependency information.
  - **package.json**: Node.js dependencies configuration.
  - **server.js**: Express server implementation.
- **src**: Angular app source code.

## Usage

### Starting the server

1. Open a terminal and navigate to the **`server`** directory:

- cd server

2. Start the Express server:

- node server.js

This will start the server at **`http://localhost:3005`**.

### Running the Angular App

1. Open a new terminal and navigate to the **`src`** directory:

- cd src

2. Start the angular app:

- ng serve

This will start the Angular app at **`http://localhost:4200`**.

## Endpoints

- **GET /api/tasks**: Get all tasks.
- **GET /api/tasks/{id}**: Get a specific task by ID.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/{id}**: Update an existing task.
- **DELETE /api/tasks/{id}**: Delete a task by ID.

## License

This project is licensed under the MIT License.
