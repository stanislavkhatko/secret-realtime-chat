
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/stanislavkhatko/secret-realtime-chat">
    <img src="client/public/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Secret realtime chat</h3>

  <p align="center">
    Secret Real Time Chat Application created with VueJS, Express, Socket IO and MongoDB.
    <br />
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat">View Demo</a>
    ·
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/stanislavkhatko/secret-realtime-chat/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>


[![Secret Chat Screen Shot][product-screenshot]](https://github.com/stanislavkhatko/secret-realtime-chat/blob/main/client/assets/screenshots/secret-chat-16.44.png)

Create public of private chatroom.


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>





### Tech Stack

| Technology | Description                                                                           | Link ↘️                 |
| ---------- | ------------------------------------------------------------------------------------- | ----------------------- |
| HTML5      | Hyper Text Markup Language                                                            | ----                    |
| CSS3       | Cascading Style Sheets                                                                | ----                    |
| JavaScript | High Level, Dynamic, Interpreted Language                                             | ----                    |
| SASS       | Syntactically Awesome Style Sheets                                                    | https://sass-lang.com/  |
| Babel      | Javascript Compiler                                                                   | https://babeljs.io/     |
| Webpack    | Javascript Module Bundler                                                             | https://webpack.js.org/ |
| NodeJS     | Open Source, Javascript Run Time Environment, Execute Javascript code for server side | https://nodejs.org/en/  |
| VueJS      | Progressive Javascript Framework                                                      | https://vuejs.org/      |
| Jest       | Javascript Testing Framework                                                          | https://jestjs.io/      |
| Express       | Web Framework for Node.js                                                          | https://expressjs.com/  |
| MongoDB       | NoSQL Database                                                                     | https://www.mongodb.com/  |

## Features

- [Express](https://expressjs.com/) as the web framework on the server
- Implements stateless authentication with [JWT](https://jwt.io/) tokens
- Authenticates [JWT](https://jwt.io/) and social authentication using [Passport](http://www.passportjs.org/)
- Hashes passwords using the [bcryptjs](https://www.npmjs.com/package/bcryptjs) package
- Enables real time communication to the server using [Socket IO](https://socket.io/)
- [MongoDB](https://www.mongodb.com/) and [Mongo Atlas](https://www.mongodb.com/cloud/atlas) is used for storing and querying data
- Server logging is done with [Winston](https://www.npmjs.com/package/winston) and [Morgan](https://www.npmjs.com/package/morgan)
- [Concurrently](https://www.npmjs.com/package/concurrently) is used to run both the server and client at the same time
- [Vue JS](https://vuejs.org/) is used as the frontend framework

## Installation

### Running Locally

_Ensure [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed_

1. Clone or Download the repository (Depending on whether you are using SSH or HTTPS)

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
```javascript
$ npm run test // In the root directory
```

Running Client Tests
```javascript
$ npm run client:test
```

Watching Server Tests
```javascript
$ npm run server:test:watch
```


## Configuration Setup

These configuration setups are necessary for the app to function correctly as intended. These configuration setups will be required to be added as environment variables for the server to make use of.

### Local Environment Variables (.env file)
For development you will need a .env file for environmental variables.

**_Note: These are required for the application to be setup correctly_**

```bash
NODE_ENV=development

DATABASE_URL=DATABASE_URL

JWT_SECRET=JWT_SECRET

GOOGLE_CLIENT_ID=GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=GOOGLE_CLIENT_SECRET

FACEBOOK_CLIENT_ID=FACEBOOK_CLIENT_ID
FACEBOOK_CLIENT_SECRET=FACEBOOK_CLIENT_SECRET

PORT=PORT
```

### MongoDB & Mongo Atlas

A MongoDB URI is needed to connect to a MongoDB connection. The easiest way to do this is to use [Mongo Atlas](https://www.mongodb.com/cloud/atlas). If you'd like to do this locally you can follow the instructions at (https://docs.mongodb.com/manual/installation/)

#### Mongo Atlas

1. Select 'Build a New Cluster' and follow the prompts

2. When the Cluster has been created, click on 'Connect'

3. Choose your connection method, for the purposes of this application we will use 'Connect Your Application'

4. Next you will need to grab this connection string (Standard connection string). This is the URI that will be used as an environment variable

### JWT Secret

The JWT Secret is required as a way to keep the JWT Token secure when the signature is hashed. This secret key should be secret to you and should be updated periodically.

### Google

To setup google oauth, you'll need to configure some details through Google Cloud Platform

1. Navigate to https://console.cloud.google.com/

2. Using 'APIs & Services', you'll need to enable the 'Google+ API'

3. Once enabled, click on 'Credentials'

4. Go to 'OAuth Consent Screen', you will need to add the 'Authorized Domains' to authorize your domain with Google

5. You will need to save the Client ID and Client Secret for use in the environment variables

6. You will also need to add the domain you are using ie. localhost or cloud hosting to both 'Authorized Javascript Origins' and 'Authorized Redirect URIs'

   i. The redirect URIs are in the format of domain/api/auth/provider/redirect

### Facebook

To setup facebook oauth, you'll need to configure some details through Facebook for Developers

1. Login at https://developers.facebook.com/

2. Go to 'My Apps' and create a new app

3. Navigate to Settings -> basic

4. Save the App ID and App Secret for use in environment variables

5. Add your app domain in 'App Domains'

6. Under Products -> Facebook Login -> Settings, Add your redirect URIs under 'Valid OAuth Redirect URIs'

   i. The redirect URIs are in the format of domain/api/auth/provider/redirect

## Contribute

Built as a personal project for learning experience. Please feel free to contribute by creating issues, submitting new pull requests!



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/stanislavkhatko/secret-realtime-chat/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/stanislavkhatko/secret-realtime-chat/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/stanislavkhatko/secret-realtime-chat/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/stanislavkhatko/secret-realtime-chat/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/stanislavkhatko/secret-realtime-chat/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/stanislavkhatko
[product-screenshot]: https://github.com/stanislavkhatko/secret-realtime-chat/blob/main/client/assets/screenshots/secret-chat-16.44.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
