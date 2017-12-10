DROP TABLE IF EXISTS currentTasks;

CREATE TABLE allTasks (
  id SERIAL PRIMARY KEY,
  description varchar(255) UNIQUE NOT NULL,
  status boolean DEFAULT false
);
