const db = require('./db');

const getCurrentTasks = () => {
  return db.any(`
    SELECT * FROM allTasks WHERE status = false;
  `)
};

const getCompletedTasks = () => {
  return db.any(`
    SELECT * FROM allTasks WHERE status = true;
  `)
};

const getOneTask = (id) => {
  return db.one(`
    SELECT * FROM allTasks WHERE id = $1
  `, [id])
}

const addTask = (description, status) => {
  return db.one(`
    INSERT INTO allTasks (description, status)
    VALUES ($1, $2)
  `, [description, status])
}

const completeTask = (id) => {
  return db.one (`
    UPDATE allTasks
    SET status = true
    WHERE id = $1
    RETURNING *
  `, [id])
};

const updateTask = (id) => {
  return db.one(`
    UPDATE allTasks
    SET description = $1
    WHERE id = $2
    RETURNING *
  `, [id])
};


const deleteTask = (id) => {
  return db.one(`
    DELETE FROM allTasks
    WHERE id = $1
    RETURNING *
  `)
};

module.exports = {
  getCurrentTasks,
  getCompletedTasks,
  getOneTask,
  addTask,
  completeTask,
  updateTask,
  deleteTask
};
