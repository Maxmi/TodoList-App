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
    })
}
