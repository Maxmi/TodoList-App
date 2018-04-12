const express = require('express');
const router = express.Router();
const tasks = require('./tasks');

//route to home page - GET
router.get('/', (req, res) => {
  res.render('index');
});


router.use('/tasks', tasks);

module.exports = router;
