const db = require('./db');

/**
 * Get all tasks from db
 * @return {Promise} - Promise resolving to array of objects, each representing a task with id, description and status properties
 */
const getAllTasks = () => {
  const query = `
    SELECT *
    FROM allTasks
    ORDER BY id DESC
  `;
  return db.any(query);
};

/**
 * Get one task by id
 * // bds: need to include parameter name here: @param { Number } id - ID of task to get.
 * @param  {Number} - id if of a task to get
 * @return {Promise}  -  Promise resolving to object representing one task
 */
const getOneTask = (id) => {
  const query = `
    SELECT *
    FROM allTasks
    WHERE id = $1
  `;
  return db.one(query, [id]);
};

/**
 * Add new task to db
 * @param {String} description - String representing a task
 * @param {Boolean} status     - Boolean representing status of a task ( false if current or true if complete)
 * @return {Promise}   - Promise resolving to object representing a new task
 */

// bds: would you ever want to add a task that was already complete...?
// bds: even if you did, the (much) more common scenario would be to add a 
// bds: task with a status of "false". I would make "false" the default value
// bds: and only specify a value if the status was actually "true" for the task
// bds: you wanted to add
const addTask = (description, status) => {
  const query = `
    INSERT INTO allTasks (description, status)
    VALUES ($1, $2)
    RETURNING *
  `;
  return db.one(query, [description, status]);
};

/**
 * Mark a task as completed in db
 * @param  {Number} id - id of a task to be completed
 * @return {Promise}   - Promise resolving to object representing a completed task
 */
const completeTask = (id) => {
  const query = `
    UPDATE allTasks
    SET status = true
    WHERE id = $1
    RETURNING *
  `;
  return db.one (query, [id]);
};

/**
 * Edit description of a task
 * @param  {Number} id      - id of a task to be updated
 * @param  {String} newText - updated description of a task
 * @return {Promise}        - Promise resolving to object representing a task with updated description
 */
const editTask = (id, newText) => {
  const query = `
    UPDATE allTasks
    SET description = $2
    WHERE id = $1
    RETURNING *
  `;
  return db.one(query, [id, newText]);
};

/**
 * Delete a task
 * @param  {Number} id - id of a task to be deleted
 */
const deleteTask = (id) => {
  const query = `
    DELETE FROM allTasks
    WHERE id = $1
  `;
  return db.none(query, [id]);
};


/**
 * Undo a completed task (make it current again)
 * @param  {Number} id - id of a task to be undoed
 * @return {Promise}   - Promise resolving to object representing a task with status changed from true to false 
 */
const undoComplete = (id) => {
  const query = `
    UPDATE allTasks
    SET status = false
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
