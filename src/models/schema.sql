DROP TABLE IF EXISTS allTasks;

CREATE TABLE allTasks (
  id SERIAL PRIMARY KEY,
  description varchar(255) NOT NULL,
  status boolean DEFAULT false
);
