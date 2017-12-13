const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const del = require('del');
const logger = require('gulp-logger');

const projectName = '[send-it]';

/**
 * Browser-sync taks
 */

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
  });
});

/**
 * Nodemon task
 */

gulp.task('nodemon', (callback) => {
  let callbackCalled = false;
  return nodemon({ script: './app.js' }).on('start', () => {
    if (!callbackCalled) {
      callbackCalled = true;
      callback();
    }
  });
});

/**
 * Clean public folder task
 */

gulp.task('clean-public-folder', () => {
  del('public/**/*');
});

/**
 * Copy images task
 */

gulp.task('copy-images', () => {
  gulp.src([
    './app/images/**/*.svg',
    './app/images/**/*.jpg',
  ]).pipe(logger({
    before: `${projectName} Starting: Images copied to public folder.`,
    after: `${projectName} End: Images copied to public folder.`,
    showChange: true,
  })).pipe(gulp.dest('./public/images'));
});

/**
 * Default task
 */

gulp.task('default', [
  'clean-public-folder',
  'copy-images',
  'browser-sync',
], () => {
  gulp.watch(['./app/scss/base/_buttons.scss'], browserSync.reload);
});
