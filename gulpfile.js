const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const del = require('del');
const logger = require('gulp-logger');
const vinylPaths = require('vinyl-paths');
const cat = require('gulp-cat');

const logPrefix = '[send-it]';

/**
 * Browser-sync taks
 */

/*
gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
  });
});
*/

/**
 * Nodemon task
 */

/*
gulp.task('nodemon', (callback) => {
  let callbackCalled = false;
  nodemon({ script: './app.js' }).on('start', () => {
    if (!callbackCalled) {
      callbackCalled = true;
      callback();
    }
  });
});
*/

/**
 * Show Ascii art
 */

gulp.task('ascii-art', () => {
  const task = gulp.src('ascii-art.txt')
    .pipe(cat());

  return task;
});

/**
 * Empty public folder task
 */

gulp.task('empty-public-folder', () => {
  const task = gulp.src('public')
    .pipe(vinylPaths(del))
    .pipe(logger({ showChange: false }));

  return task;
});

/**
 * Copy images task
 */

gulp.task('copy-images', () => {
  const task = gulp.src([
    './app/images/**/*.svg',
    './app/images/**/*.jpg',
  ])
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/images'));

  return task;
});

/**
 * Default task
 */

gulp.task('default', gulp.series('ascii-art', 'empty-public-folder', 'copy-images'));

//

// gulp.task('heroku', gulp.series('delete:all', 'imagemin:all', 'copy:all', 'njk', 'sass', 'js', 'heroku:serve'));
