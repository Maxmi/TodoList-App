require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/index');

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res) => res.render('error'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});

module.exports = app;
