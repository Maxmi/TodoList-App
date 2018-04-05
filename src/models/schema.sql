DROP TABLE IF EXISTS allTasks;

-- bds: a more standard table name would be 'tasks'
CREATE TABLE allTasks (
  id SERIAL PRIMARY KEY,

  -- bds: capitalize keywords: description VARCHAR(255) NOT NULL,
  description varchar(255) NOT NULL,

  -- bds: 'completed' would be a better name for this column. "status" doesn't indicate
  -- bds: what a value of "true" stands for
  -- bds: Also: capitalize keywords: BOOLEAN
  status boolean DEFAULT false
);
