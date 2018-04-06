// bds: add jsdoc's for this file! 
const getAllTasks = () => {
  return fetch('/alltasks')
    .then(res => {
      return res.json();
    });
};

const addTask = (newTask) => {
  return fetch('/alltasks', {
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


const completeTask = (taskID) => {
  return fetch(`/alltasks/completed/${taskID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // bds: this .then is completely unnecessary! :-)
    .then(res => {
      return res;
    });
};

const editTask = (taskID, text) => {
  return fetch(`/alltasks/${taskID}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({text})
  })

  // bds: ditto, unnecessary .then
    .then(res => {
      return res;
    });
};

const deleteTask = taskID => {
  return fetch(`/alltasks/${taskID}`, {
    method: 'delete'
  });
};


const undoComplete = taskID => {
  return fetch(`/alltasks/undo/${taskID}`, {
    method: 'put'
  });
};
