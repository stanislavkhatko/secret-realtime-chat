[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

### Docker build
docker build -t chat .
docker run -it -p 8081:80 --rm --name chat-container chat


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/stanislavkhatko/secret-realtime-chat">
    <img src="client/public/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Secret Realtime Chat</h3>

  <p align="center">
    Secret Real Time Chat Application created with VueJS, Express, Socket IO, and MongoDB.
    <br />
    <a href="https://secret-chat.wordmemo.net">View Demo</a>
    ·
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

[![Secret Chat Screen Shot][product-screenshot]](https://github.com/stanislavkhatko/secret-realtime-chat/blob/main/client/assets/screenshots/secret-chat-16.44.png)

## Introduction

Secret Realtime Chat is a full-stack web application built with VueJS, Express, Socket IO, and MongoDB. It provides a platform for users to engage in public or private chatrooms.

## Table of Contents

<details>
  <summary><b>Click to expand</b></summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#tech-stack">Tech Stack</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#running-tests">Running Tests</a></li>
    <li><a href="#configuration-setup">Configuration Setup</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

The Secret Realtime Chat application facilitates real-time communication between users. It supports stateless authentication with JWT tokens, social authentication using Passport, and password hashing with bcryptjs. The application architecture utilizes Express for server-side development, MongoDB for data storage, and Socket IO for real-time communication.

## Tech Stack

- **HTML5**: Hyper Text Markup Language
- **CSS3**: Cascading Style Sheets
- **JavaScript**: High Level, Dynamic, Interpreted Language
- **SASS**: Syntactically Awesome Style Sheets ([Link](https://sass-lang.com/))
- **Babel**: Javascript Compiler ([Link](https://babeljs.io/))
- **Webpack**: Javascript Module Bundler ([Link](https://webpack.js.org/))
- **NodeJS**: Open Source, Javascript Run Time Environment, Execute Javascript code for server side ([Link](https://nodejs.org/en/))
- **VueJS**: Progressive Javascript Framework ([Link](https://vuejs.org/))
- **Jest**: Javascript Testing Framework ([Link](https://jestjs.io/))
- **Express**: Web Framework for Node.js ([Link](https://expressjs.com/))
- **MongoDB**: NoSQL Database ([Link](https://www.mongodb.com/))

## Features

- Express as the web framework on the server
- Stateless authentication with JWT tokens
- Authentication with JWT and social authentication using Passport
- Password hashing using the bcryptjs package
- Real-time communication to the server using Socket IO
- MongoDB and Mongo Atlas used for storing and querying data
- Server logging with Winston and Morgan
- Concurrently used to run both the server and client simultaneously
- Vue JS used as the frontend framework

## Installation

### Running Locally

1. Clone or Download the repository:

```bash
$ git clone git@github.com:stanislavkhatko/secret-realtime-chat.git
$ cd secret-realtime-chat
```

2. Install dependencies for root, client and server

> You will need to npm install in each directory in order to install the node module needed for each part of the project

> Directories Include: Root, Server & Client



3. Add .env file to server folder and fill out details according to the .env.example. See [configuration details](#configuration-setup) for social auth and database setup: **Note, this is mandatory for the application to run**

4. Set **NODE_ENV=development** and **DATABASE_URL=false**

5. Start the application

```bash
$ npm run dev
```

Your app should now be running on [localhost:8080](localhost:8080).

### Run [Production Ready] Mode

_Ensure [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed_

This runs the application with the built production ready Vue files as well as running the express server in production mode serving up the compiled files.

1. Clone or Download the repository (Depending on whether you are using SSH or HTTPS)

```bash
$ git clone git@github.com:stanislavkhatko/secret-realtime-chat.git
$ cd secret-realtime-chat
```

2. Install dependencies for root, client and server

> You will need to npm install in each directory in order to install the node module needed for each part of the project

> Directories Include: Root, Server & Client


3. Add .env file to server folder and fill out details according to the .env.example. See [configuration details](#configuration-setup) for social auth and database setup. **Note, this is mandatory for the application to run**

4. Ensure you set **NODE_ENV=production** and **DATABASE_URL**

5. Start the application in the root folder of the project. Since it's running in production mode, you should not see any message such as: **_"Server started at port 5000"_**

```bash
$ npm run start
```

Your app should now be running on the port you specified in the .env file. If none was specified it will default to **port 5000**.

Eg. [localhost:5000](localhost:5000).

## Seeding Data

If at anytime in development you'd like to quickly seed some dummy data you use the command below

```bash
$ npm run seed:data
```

## Running Tests

Tests should be run before every commit to ensure the build is not broken by any code changes.

Running Both Client and Server Tests
```bash
$ npm run test // In the root directory
```

Running Client Tests
```bash
$ npm run client:test
```

Watching Server Tests
```bash
$ npm run server:test:watch
```


## Configuration Setup

These configuration setups are necessary for the app to function correctly as intended. These configuration setups will be required to be added as environment variables for the server to make use of.

### Local Environment Variables (.env file)
For development, you will need a .env file for environmental variables.

**_Note: These are required for the application to be setup correctly_**

```bash
NODE_ENV=development

DATABASE_URL=DATABASE_URL

JWT_SECRET=JWT_SECRET

PORT=PORT
```

### MongoDB & Mongo Atlas

To connect to MongoDB, you need a MongoDB URI. The easiest way to obtain this URI is by using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). If you prefer to set up MongoDB locally, you can follow the instructions [here](https://docs.mongodb.com/manual/installation/).

#### Using MongoDB Atlas

1. Sign in to MongoDB Atlas and select 'Build a New Cluster'.

2. Follow the prompts to create the cluster.

3. Once the cluster is created, click on 'Connect'.

4. Choose 'Connect Your Application' as the connection method.

5. Copy the connection string (Standard connection string). This URI will be used as an environment variable.

### JWT Secret

The JWT Secret is essential for securing JWT Tokens by hashing their signatures. Keep this secret key confidential and update it periodically.


[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/stanislavkhatko/secret-realtime-chat/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanislavkhatko
[product-screenshot]: https://github.com/stanislavkhatko/secret-realtime-chat/blob/main/client/assets/screenshots/secret-chat-16.44.png
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
