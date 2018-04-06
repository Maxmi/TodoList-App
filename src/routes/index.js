const express = require('express');
const router = express.Router();
const alltasks = require('./tasks');

//route to home page - GET
router.get('/', (req, res) => {
  res.render('index');
});


// bds: '/tasks' would be a more standard prefix for this router than '/alltasks'
router.use('/alltasks', alltasks);

module.exports = router;
