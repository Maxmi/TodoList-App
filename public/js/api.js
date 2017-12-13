
const getAllTasks = () => {
  return fetch('/alltasks');
};

const addTask = (newTask) => {
  return $.post('/alltasks', {newTask})
    .catch(err => console.log(err));
};

const completeTask = (taskID) => {
  return $.ajax ({
    method: 'PUT',
    url: `/alltasks/completed/${taskID}`,
  });
};

const editTask = (taskID, text) => {
  return $.ajax ({
    method: 'PUT',
    url: `/alltasks/${taskID}`,
    data: {text},
  });
};

const deleteTask = taskID => {
  return $.ajax({
    method: 'DELETE',
    url: `/alltasks/${taskID}`
  });
};


const undoComplete = (taskID) => {
  return $.ajax ({
    method: 'PUT',
    url: `/alltasks/undo/${taskID}`,
  });
};
