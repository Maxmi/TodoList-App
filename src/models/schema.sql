DROP TABLE IF EXISTS currentTasks;

--can the description be unique if we will have sometimes repeating tasks?
--if I completed some task - it is still in this table, but with status true.
--or it's better to have separate tables for current and completed ones?
--how can I move a task from one table to another when it's complete?

CREATE TABLE allTasks (
  id SERIAL PRIMARY KEY,
  description varchar(255) UNIQUE NOT NULL,
  status boolean DEFAULT false
);
