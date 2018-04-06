# TodoList
A full-stack single-page web application where users can create, edit, mark as complete, undo complete and delete tasks. 

**** bds: do the above in a bulleted list. Also "undo complete" is hard to understand, especially in the middle of a sentence like that.

All interactions with server is done via AJAX.

**** bds: rephrase to --  All interactions with the server are executed via AJAX.


**** bds: is this a learning project? If so, be sure to link to the project instructions, what you wanted to learn from the project, and what you actually learned. 

# Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [jquery](https://jquery.com/) for DOM manipulations
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for AJAX calls
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

# Deployed Site
  https://todolist-mira.herokuapp.com/

# Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/TodoList-App.git`
* Install npm packages - `npm install`

# Setting up your database

* Create database and tables - `npm run db:init` (make sure you don't have a db named "todolistapp" as this command will delete it)

*** bds: put db name in backticks instead of double-quotes: `todolistapp`

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

**** bds: similar to my comment on your other project: have NODE_ENV pre-filled to dev or production, or say in the "placeholder" text what the options are for this value

# Starting your development server

* Run `npm start`
* To access the app go to `localhost:3000`

**** bds: `http://localhost:3000`

**** bds: add a section for how to run tests!