const config = require('./config.js');
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
 * Task for showing ascii art
 */

gulp.task('ascii-art', () => {
  const task = gulp.src('ascii-art.txt')
    .pipe(cat());

  return task;
});

/**
 * Task for emptying public folder
 */

gulp.task('delete-public', () => {
  const task = gulp.src(`${config.paths.public.folder}`)
    .pipe(vinylPaths(del))
    .pipe(logger({ showChange: false }));

  return task;
});

/**
 * Task for image files: copy and optimize
 */

gulp.task('images', () => {
  const task = gulp.src([
    `${config.paths.app.images}/**/*.svg`,
    `${config.paths.app.images}/**/*.jpg`,
  ])
    .pipe(imagemin())
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest(`${config.paths.public.images}`));

  return task;
});

/**
 * Task for CSS files: copy and minify
 */

gulp.task('css', () => {
  const task = gulp.src(`${config.paths.app.css}/**/*.css`)
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest(`${config.paths.public.css}`));

  return task;
});

/**
 * Task for SCSS files: copy, convert to CSS, autoprefix,
 * convert px to rem units and minify
 */

gulp.task('scss', () => {
  const processors = [
    autoprefixer({
      browsers: 'last 2 versions',
      cascade: false,
    }),
    pxtorem({
      propList: ['*'],
    }),
  ];

  const task = gulp.src(`${config.paths.app.scss}/style.scss`)
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss'],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest(`${config.paths.public.css}`));

  return task;
});

/**
 * Task for font files: copy
 */

gulp.task('fonts', () => {
  const task = gulp.src(`${config.paths.app.fonts}/**/*`)
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest(`${config.paths.public.fonts}`));

  return task;
});

/**
 * Task for JavaScript files: copy, transpile and uglify
 */

gulp.task('js', () => {
  const task = gulp.src(`${config.paths.app.js}/**/*`)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(uglify())
    .pipe(logger({ showChange: true }))
    .pipe(gulp.dest(`${config.paths.public.js}`));

  return task;
});

/**
 * Default task
 */

gulp.task('default', gulp.series('ascii-art', 'delete-public', 'images', 'fonts', 'css', 'scss', 'js'));
