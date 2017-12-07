const express = require('express');
const router = express.Router();
const queries = require('../models/tasks');


router.get('/', (req, res) => {
  queries.getCurrentTasks()
    .then(data => {
      // console.log(data);
      res.render('index', {
        data: data
      });
    });
});


module.exports = router;
