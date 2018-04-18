/**
 * Function to do GET request to fetch list of tasks from the db
 * @return { Promise } - Promise resolving to array of objects each representing a task
 */
const getAllTasks = () => {
  return fetch('/tasks')
    .then(res => {
      return res.json();
    });
};

/**
 * Function to do POST request to add new task to the db table
 * @param { Object } newTask - Object with property newTask which represents a newly created task
 * @return { Promise } - Promise resolving to an object representing one task
 */
const addTask = (newTask) => {
  return fetch('/tasks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newTask})
  })
    .then(res => {
      return res.json();
    });
};

/**
 * Function to do PUT request to make a task as completed
 * @param  { Number } taskID - ID of a task to be completed
 * @return { Promise }       - Promise who's resolution is unimportant
 */

const completeTask = (taskID) => {
  return fetch(`/tasks/complete/${taskID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};


/**
 * Function to do PUT request to edit text of a task
 * @param  { Number } taskID - ID of a task to be edited
 * @param  { String } text   - updated text of a task
 * @return { Promise }       - Promise who's resolution is unimportant
 */
const editTask = (taskID, text) => {
  return fetch(`/tasks/${taskID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text})
  });
};

/**
 * Function to do DELETE request to delete a task
 * @param  { Number } taskID - ID of a task to be deleted
 * @return { Promise }       - Promise who's resolution is unimportant
 */
const deleteTask = taskID => {
  return fetch(`/tasks/${taskID}`, {
    method: 'delete'
  });
};

/**
 * Function to do PUT request to undo a completed task
 * @param  { Number } taskID - ID of a task to be deleted
 * @return { Promise }       - Promise who's resolution is unimportant
 */
const undoComplete = taskID => {
  return fetch(`/tasks/undo/${taskID}`, {
    method: 'put'
  });
};
