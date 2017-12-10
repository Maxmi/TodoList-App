const db = require('./db');

const getCurrentTasks = () => {
  return db.any(`
    SELECT * FROM allTasks WHERE status = false ORDER BY id DESC;
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
};

const addTask = (description, status) => {
  return db.one(`
    INSERT INTO allTasks (description, status)
    VALUES ($1, $2)
    RETURNING *
  `, [description, status])
};


//should I make just one function for updating and completing?
//
const makeChangesToTask = (id, columnToChange, valueToSet) => {
  return db.one(`
    UPDATE allTasks
    SET ${columnToChange} = ${valueToSet}
    WHERE id = $1
    RETURNIN *
  `, [id, columnToChange, valueToSet])
}


// const completeTask = (id) => {
//   return db.one (`
//     UPDATE allTasks
//     SET status = true
//     WHERE id = $1
//     RETURNING *
//   `, [id])
// };
//
// const updateTask = (id) => {
//   return db.one(`
//     UPDATE allTasks
//     SET description = $1
//     WHERE id = $2
//     RETURNING *
//   `, [id])
// };


const deleteTask = (id) => {
  return db.one(`
    DELETE FROM allTasks
    WHERE id = $1
    RETURNING *
  `, [id])
};

module.exports = {
  getCurrentTasks,
  getCompletedTasks,
  getOneTask,
  addTask,
  makeChangesToTask,
  // completeTask,
  // updateTask,
  deleteTask
};
