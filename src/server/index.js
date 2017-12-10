const express = require('express');
const router = express.Router();
const queries = require('../models/tasks');

//route to home page - GET
router.get('/', (req, res) => {
  res.render('index');
});


//route to get all tasks
router.get('/alltasks', (req, res) => {
  queries.getCurrentTasks()
    .then(data => {
      res.status(200)
        .json({
          data
        })
    })
    .catch(err => console.log(err));
});


//route to add new task
router.post('/alltasks', (req, res) => {
  const {description} = req.body;
  console.log('this is description: ', description);
  const status = false;

  return queries.addTask(description, status)
    .then((task) => {
      // console.log(task);
      res.status(200)
        .json(task)
    })
    .catch(err => console.log(err));
});



//route to complete a task



//route to update a task



//route to delete a task
router.delete('/alltasks/:taskID', (req, res) => {
  const taskID = parseInt(req.params.taskID);
  queries.deleteTask(taskID)
    .then(task => {
      res.render('index');
      console.log(`Task with id ${taskID} has been deleted`);
    })
});


module.exports = router;
