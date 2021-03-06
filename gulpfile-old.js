const gulp = require('gulp');
// const nodemon = require('gulp-nodemon');
const nunjucks = require('gulp-nunjucks-html');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

// Files for JavaScript
gulp.task('js', () => {
  gulp.src('./app/js/*.js')
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(gulp.dest('./public/js'));
});

// Files for SCSS
gulp.task('sass', () => {
  gulp.src('./app/scss/style.scss')
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss'],
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

// Files for nunjucks
gulp.task('nunjucks', () => {
  gulp.src('./app/views/*.nunjucks')
    .pipe(nunjucks({
      searchPaths: ['app/views'],
      ext: '.html',
    }))
    .pipe(gulp.dest('./public'));
});

// Watcher
gulp.task('watch', () => {
  gulp.watch('./app/scss/**/*.scss', ['sass']);
});

// Static server
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
});

/*
gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee nunjucks',
    stdout: false,
  }).on('readable', function () {
    this.stdout.on('data', (chunk) => {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});
*/

gulp.task('default', [
  // 'js',
  // 'sass',
  // 'images',
  // 'develop',
  // 'watch',
  'nunjucks',
  'browser-sync',
]);
