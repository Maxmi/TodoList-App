const db = require('./db');

const getAllTasks = () => {
  return db.any(`
    SELECT * FROM allTasks;
  `)
};

const getCurrentTasks = () => {
  return db.any(`
    SELECT * FROM allTasks WHERE status = false ORDER BY id DESC;
  `)
};

const getCompletedTasks = () => {
  return db.any(`
    SELECT * FROM allTasks WHERE status = true ORDER BY id DESC;
  `)
};

const getOneTask = (id) => {
  return db.one(`
    SELECT * FROM allTasks WHERE id = $1
  `, [id])
};

const addTask = (description, status) => {
  return db.one(`
    INSERT INTO allTasks (description, status)
    VALUES ($1, $2)
    RETURNING *
  `, [description, status])
};


const completeTask = (id) => {
  return db.one (`
    UPDATE allTasks
    SET status = true
    WHERE id = $1
    RETURNING *
  `, [id])
};

const editTask = (id, newText) => {
  return db.one(`
    UPDATE allTasks
    SET description = $2
    WHERE id = $1
    RETURNING *
  `, [id, newText])
};


const deleteTask = (id) => {
  return db.one(`
    DELETE FROM allTasks
    WHERE id = $1
    RETURNING *
  `, [id])
};

module.exports = {
  getAllTasks,
  getCurrentTasks,
  getCompletedTasks,
  getOneTask,
  addTask,
  editTask,
  completeTask,
  deleteTask
};
