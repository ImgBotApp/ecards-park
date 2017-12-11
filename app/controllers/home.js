/*
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const Article = mongoose.model('Article');


express.set('view engine', 'html');


module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Some new page',
  });

  Article.find((err, articles) => {
    if (err) return next(err);
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

router.get('/test', (req, res, next) => {
  res.render('test', {
    title: 'Test page',
  });
});

router.get('/demo', (req, res, next) => {
  res.render('demo', {
    title: 'Demo page',
  });
});
*/
