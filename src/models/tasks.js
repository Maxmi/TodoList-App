const db = require('./db');

/**
 * Get all tasks from db
 * @return { Promise } - Promise resolving to array of objects, each representing a task with id, description and status properties
 */
const getAllTasks = () => {
  const query = `
    SELECT *
    FROM tasks
    ORDER BY id DESC
  `;
  return db.any(query);
};

/**
 * Get one task by id
 * @param  { Number } - ID of a task to get
 * @return { Promise } - Promise resolving to object representing one task
 */
const getOneTask = (id) => {
  const query = `
    SELECT *
    FROM tasks
    WHERE id = $1
  `;
  return db.one(query, [id]);
};

/**
 * Add new task to db
 * @param { String } description - String representing a task
 * @param { Boolean } completed  - Boolean representing status of a task ( false if current or true if complete)
 * @return { Promise }  - Promise resolving to object representing a new task
 */
const addTask = (description) => {
  const query = `
    INSERT INTO tasks (description)
    VALUES ($1)
    RETURNING *
  `;
  return db.one(query, [description]);
};

/**
 * Mark a task as completed in db
 * @param  { Number } id - ID of a task to be completed
 * @return { Promise }   - Promise resolving to object representing a completed task
 */
const completeTask = (id) => {
  const query = `
    UPDATE tasks
    SET completed = true
    WHERE id = $1
    RETURNING *
  `;
  return db.one (query, [id]);
};

/**
 * Edit description of a task
 * @param  { Number } id    - ID of a task to be updated
 * @param  { String } newText - updated description of a task
 * @return { Promise }        - Promise resolving to object representing a task with updated description
 */
const editTask = (id, newText) => {
  const query = `
    UPDATE tasks
    SET description = $2
    WHERE id = $1
    RETURNING *
  `;
  return db.one(query, [id, newText]);
};

/**
 * Delete a task
 * @param  {Number} id - ID of a task to be deleted
 */
const deleteTask = (id) => {
  const query = `
    DELETE FROM tasks
    WHERE id = $1
  `;
  return db.none(query, [id]);
};


/**
 * Undo a completed task (make it current again)
 * @param  {Number} id - ID of a task to be undoed
 * @return {Promise}   - Promise resolving to object representing a task with status changed from true to false
 */
const undoComplete = (id) => {
  const query = `
    UPDATE tasks
    SET completed = false
    WHERE id = $1
    RETURNING *
  `;
  return db.one (query, [id]);
};

module.exports = {
  getAllTasks,
  getOneTask,
  addTask,
  editTask,
  completeTask,
  deleteTask,
  undoComplete
};
