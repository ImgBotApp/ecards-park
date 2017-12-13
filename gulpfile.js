const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:5000',
  });
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch(['./app/scss/base/_buttons.scss'], browserSync.reload);
});

gulp.task('nodemon', (callback) => {
  let callbackCalled = false;
  return nodemon({ script: './app.js' }).on('start', () => {
    if (!callbackCalled) {
      callbackCalled = true;
      callback();
    }
  });
});
