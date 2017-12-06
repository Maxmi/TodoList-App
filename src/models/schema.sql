DROP TABLE IF EXISTS currentTasks;

CREATE TABLE currentTasks (
  id SERIAL PRIMARY KEY,
  taskName varchar(255) UNIQUE NOT NULL,
  isComplete boolean NOT NULL
);

DROP TABLE IF EXISTS completedTasks;

CREATE TABLE completedTasks (
  id SERIAL PRIMARY KEY,
  taskName varchar(255) UNIQUE NOT NULL,
  isComplete boolean NOT NULL
);
