const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const del = require('del');
const logger = require('gulp-logger');
const vinylPaths = require('vinyl-paths');

const logPrefix = '[send-it]';

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
 * Empty public folder task
 */

gulp.task('empty-public-folder', () => {
  gulp.src('public/**/*')
    .pipe(vinylPaths(del))
    .pipe(logger({
      before: `${logPrefix} Starting cleaning public folder.`,
      after: `${logPrefix} Finished cleaning public folder`,
      showChange: true,
    }));
});

/**
 * Copy images task
 */

gulp.task('copy-images', () => {
  gulp.src([
    './app/images/**/*.svg',
    './app/images/**/*.jpg',
  ]).pipe(logger({
    before: `${logPrefix} Starting: Images copied to public folder.`,
    after: `${logPrefix} End: Images copied to public folder.`,
    showChange: true,
  })).pipe(gulp.dest('./public/images'));
});

/**
 * Default task
 */

gulp.task('default', [
  'empty-public-folder',
  'copy-images',
  'browser-sync',
], () => {
  gulp.watch(['./app/scss/base/_buttons.scss'], browserSync.reload);
});
