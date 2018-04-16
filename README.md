# TodoList

## Summary
My implementation of [To-Do List module of Learners Guild curriculum](https://curriculum.learnersguild.org/Phases/Practice/Modules/To-Do-List/).  
A full-stack single-page CRUD web application where users can:
 - create tasks,
 - edit the text of a task,
 - check tasks as completed,
 - undo completed task(check it as not completed),
 - delete tasks,  
 - filter tasks (view all, or only current, or only completed ones),
 - delete all completed tasks in bulk,
 - toggle all tasks (check them all as completed or as not completed)  


## What I learned doing this project:
- using Express.js  
- building RESTful APIs using Express  
- using Postgres to persist data in database  
- writing basic SQL queries  
- using Fetch API to make HTTP requests  
- using `contenteditable` attribute of HTML  
- using Mocha, Chai and chai-http for unit and intergration tests (db queries and routes)  

# Built with:

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [jquery](https://jquery.com/) for DOM manipulations
* [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Pug](https://pugjs.org/)
* [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

# Deployed Site
  https://todolist-mira.herokuapp.com/

# Getting Started

These instructions are for getting a copy of the project on your local environment.

* Clone/Fork - `git clone https://github.com/Maxmi/TodoList-App.git`
* Install npm packages - `npm install`

# Setting up your database

* Create database and tables - `npm run db:init` (make sure you don't have a db named `todolistapp` as this command will delete it)

# Setting up your config

* Run `cp .env.template .env` command in the terminal to create your own `.env` file and enter your config values in the `.env` file

# Starting your development server

* Run `npm start`
* To access the app go to `http://localhost:3000`

# Running tests  
* Run `npm test`
