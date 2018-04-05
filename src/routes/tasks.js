const express = require('express');
const router = express.Router();
const queries = require('../models/tasks');

//route to get all tasks
router.get('/', (req, res, next) => {
  // bds: similar to the previous project, I would rather see
  // bds: queries.getAllTasks() on the same line. It's a style
  // bds: preference, though
  return queries
    .getAllTasks()
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(next);
});

//route to add new task
router.post('/', (req, res, next) => {
  const { newTask } = req.body;
  const status = false;
  return queries
    .addTask(newTask, status)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(next);
});

//route to get one task
router.get('/:taskID', (req, res, next) => {
  const id = parseInt(req.params.taskID);
  return queries
    .getOneTask(id)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(next);
});

//route to complete a task
router.put('/completed/:taskID', (req, res, next) => {
  const taskID = parseInt(req.params.taskID);
  return queries
    .completeTask(taskID)
    .then(completedTask => {
      res.status(200).json(completedTask);
    })
    .catch(next);
});

//route to edit text of task
router.put('/:taskID', (req, res, next) => {
  const taskID = parseInt(req.params.taskID);
  const newText = req.body.text;

  return queries
    .editTask(taskID, newText)
    .then(editedTask => {
      res.status(200).json(editedTask);
    })
    .catch(next);
});

//route to delete a task
router.delete('/:taskID', (req, res, next) => {
  const taskID = parseInt(req.params.taskID);
  return queries
    .deleteTask(taskID)
    .then(() => {
      res.status(200).json();
    })
    .catch(next);
});

//route to undo complete of a task
router.put('/undo/:taskID', (req, res, next) => {
  const taskID = parseInt(req.params.taskID);

  return queries
    .undoComplete(taskID)
    .then(undoedTask => {
      res.status(200).json(undoedTask);
    })
    .catch(next);
});

// error handler for all other routes
router.use((err, req, res) => {
  res.json({ error: true, message: err.toString() });
});


module.exports = router;
