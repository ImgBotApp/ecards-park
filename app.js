const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

// Setting port
app.set('port', (process.env.PORT || 5000));

// Configuring nunjucks
nunjucks.configure('./app/views', {
  autoescape: true,
  express: app,
});

// Routes
app.get('/', (req, res) => {
  res.render('index.nunjucks', {
    title: 'Home page',
  });
});

app.get('/demo', (req, res) => {
  res.render('demo.nunjucks', {
    title: 'Demo page',
  });
});

// Run server and listen on port
app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port', app.get('port'));
});

/* JUST FOR HELP
const express = require('express');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');

mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach((model) => {
  require(model);
});
const app = express();

module.exports = require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on http://localhost:' + config.port);
});
*/
