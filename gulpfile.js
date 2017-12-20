const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');
const del = require('del');
const logger = require('gulp-logger');
const vinylPaths = require('vinyl-paths');
const cat = require('gulp-cat');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const imagemin = require('gulp-imagemin');
const pxtorem = require('postcss-pxtorem');
const postcss = require('gulp-postcss');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

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
 * Copy and optimize images task
 */

gulp.task('images', () => {
  const task = gulp.src([
    './app/images/**/*.svg',
    './app/images/**/*.jpg',
  ])
    .pipe(imagemin())
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/images'));

  return task;
});

/**
 * Copy CSS files task
 */

gulp.task('copy-css', () => {
  const task = gulp.src('./app/css/**/*.css')
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/css'));

  return task;
});

/**
 * Copy, convert, autoprefix and convert px to rem units task
 */

gulp.task('scss', () => {
  const processors = [
    autoprefixer({
      browsers: 'last 1 version',
      cascade: false,
    }),
    pxtorem({
      propList: ['*'],
    }),
  ];

  const task = gulp.src('./app/scss/style.scss')
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss'],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(postcss(processors))
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/css'));

  return task;
});

/**
 * Copy font files task
 */

gulp.task('copy-fonts', () => {
  const task = gulp.src('./app/fonts/**/*')
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/fonts'));

  return task;
});

/**
 * Copy, transpile and uglify JavaScript files task
 */

gulp.task('js', () => {
  const task = gulp.src('./app/js/**/*')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest('./public/js'));

  return task;
});

/**
 * Default task
 */

gulp.task('default', gulp.series('ascii-art', 'delete-public', 'images', 'copy-fonts', 'copy-css', 'scss', 'js'));
