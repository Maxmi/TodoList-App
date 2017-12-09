const express = require('express');
const router = express.Router();
const queries = require('../models/tasks');

router.get('/fetchAll', (req, res) => {
  console.log('hi')
  queries.getCurrentTasks()
    .then(data => {
      res.status(200)
       .json({
         data
      })
    })
    .catch(err => console.log(err));
})


// console.log(router.get);

//route to get all tasks
router.get('/', (req, res) => {
  res.render('index');
});

//route to add new task
//how to make the page restart after adding new task? I want new task to be added to list of tasks and rendered on the page
//Or should I write just a front end code?
//Or I must redirect to a newTask page?
router.post('/', (req, res) => {
  const {description} = req.body;
  console.log(description);
  const status = false;
  queries.addTask(description, status)
    .then((task) => {
      console.log(`New task with id ${task.id} has been created`);
      res.send(task);
    })
    .catch(err => console.log(err));
});


//route to complete a task



//route to updatte a task



//route to delete a task
router.delete('/', (req, res) => {
  const {id} = req.body;
  queries.deleteTask(id)
    .then(task => {
      res.render('/');
      console.log(`Task with id ${id} has been deleted`);
    })
});


module.exports = router;
