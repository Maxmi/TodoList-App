const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./server/routes');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use((req, res) => res.render('views/error'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server Starts on ${port}`);
});
