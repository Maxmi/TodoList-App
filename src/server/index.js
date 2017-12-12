const express = require('express');
const router = express.Router();
const queries = require('../models/tasks');

//route to home page - GET
router.get('/', (req, res) => {
  res.render('index');
});


//route to get current tasks
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
  const {newTask} = req.body;
  const status = false;

  return queries.addTask(newTask, status)
    .then((task) => {
      res.status(200)
        .json(task)
    })
    .catch(err => console.log(err));
});


//route to get one task
router.get('/alltasks/:taskID', (req, res) => {
  const id = parseInt(req.params.taskID);
  queries.getOneTask(id)
    .then(task => {
      res.json(task)
    })
})


//route to complete a task
router.put('/alltasks/completed/:taskID', (req, res) => {
  const taskID = parseInt(req.params.taskID);

  return queries.completeTask(taskID)
    .then(completedTask => {
      res.render('index');
      console.log(`Task with id ${taskID} has been completed`);
    })
    .catch(err => console.log(err));
});



router.put('/alltasks/:taskID', (req, res) => {
  const taskID = parseInt(req.params.taskID);
  const newText = req.body.text;
  // console.log(':: ==>', req.body);
  // console.log(newText);

  return queries.editTask(taskID, newText)
    .then(editedTask => {
      res.render('index');
      console.log(`Task with id ${taskID} has been edited`);
    })
    .catch(err => console.log(err));
});






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
