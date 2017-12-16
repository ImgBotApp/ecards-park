const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const del = require('del');
const logger = require('gulp-logger');
const vinylPaths = require('vinyl-paths');
const cat = require('gulp-cat');
const sass = require('gulp-sass');

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

gulp.task('delete-public', () => {
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
 * Copy CSS files
 */

gulp.task('copy-css', () => {
  const task = gulp.src('./app/css/**/*.css')
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/css'));

  return task;
});

// Files for SCSS
gulp.task('scss', () => {
  const task = gulp.src('./app/scss/style.scss')
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss'],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/css'));

  return task;
});

/**
 * Copy font files
 */

gulp.task('copy-fonts', () => {
  const task = gulp.src('./app/fonts/**/*')
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/fonts'));

  return task;
});

/**
 * Copy JavaScript files
 */

gulp.task('copy-js', () => {
  const task = gulp.src('./app/js/**/*')
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/js'));

  return task;
});

/**
 * Default task
 */

gulp.task('default', gulp.series('ascii-art', 'delete-public', 'copy-images', 'copy-fonts', 'copy-css', 'scss', 'copy-js'));
