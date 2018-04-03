# TodoList
A full-stack single-page web application where users can create, edit, mark as complete, undo complete and delete tasks. All interactions with server is done via AJAX.

# Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [jquery](https://jquery.com/) for DOM manipulations
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for AJAX calls
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

# Deployed Site



# Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/TodoList-App.git`
* Install npm packages - `npm install`

# Setting up your database

* Create database and tables - `npm run db:init` (make sure you don't have a db named "todolistapp" as this command will delete it)

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

# Starting your development server

* Run `npm start`
* To access the app go to `localhost:3000`
