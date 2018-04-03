const express = require('express');
const router = express.Router();
const alltasks = require('./tasks');

//route to home page - GET
router.get('/', (req, res) => {
  res.render('index');
});

router.use('/alltasks', alltasks);

module.exports = router;
