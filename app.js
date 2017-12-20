const data = require('./app/data/data');
const express = require('express');
const nunjucks = require('nunjucks');
const shortid = require('shortid');

/**
 * Express settings
 */

const app = express();

// Define folder for serving static files
app.use(express.static('public'));

// Setting port
app.set('port', (process.env.PORT || 5000));

/**
 * Configuring nunjucks
 */

nunjucks
  .configure('./app/views', {
    autoescape: true,
    express: app,
    watch: true,
  })

  // Adding global information

  // Get companies information
  .addGlobal('getCompanies', (hasSuffix) => {
    let companies = null;
    const companyFirst = 'Žiga Vukčevič s.p.';
    const companySecond = 'Lovro Podobnik s.p.';

    if (hasSuffix) {
      companies = `${companyFirst}'s & ${companySecond}'s`;
    } else {
      companies = `${companyFirst} & ${companySecond}`;
    }

    return companies;
  })

  // Get page information
  .addGlobal('getPageInfo', () => ({
    name: {
      brand: 'send-it',
      url: 'send-it.com',
    },
    href: 'http://www.send-it.com',
    og: {
      title: 'Send it title',
      desc: 'Send it desc',
      image: 'http://www.send-it.com/images/social/og-image.jpg',
    },
  }))

  // Get current year
  .addGlobal('getCurrentYear', new Date().getFullYear())

  // Get cache busting hash
  .addGlobal('getCacheBustingHash', shortid.generate());

/**
 * Utility functions
 */

function getPageTitle(key) {
  return data.pages.titles[key];
}

/**
 * Express routes
 */

app.get('/', (req, res) => {
  data.pages.currentTitle = getPageTitle('index');
  res.render('index.nunjucks', data);
});

app.get('/demo', (req, res) => {
  data.pages.currentTitle = getPageTitle('demo');
  res.render('demo.nunjucks', data);
});

app.get('/terms-of-service', (req, res) => {
  data.pages.currentTitle = getPageTitle('termsOfService');
  res.render('legal/terms-of-service.nunjucks', data);
});

app.get('/privacy-policy', (req, res) => {
  data.pages.currentTitle = getPageTitle('privacyPolicy');
  res.render('legal/privacy-policy.nunjucks', data);
});

app.get('/cookie-policy', (req, res) => {
  data.pages.currentTitle = getPageTitle('cookiePolicy');
  res.render('legal/cookie-policy.nunjucks', data);
});

/**
 * Running server and listen on port
 */

app.listen(app.get('port'), () => {
  console.log('App is running, server is listening on port', app.get('port'));
});

/* JUST FOR HELP AND LATER USE
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
