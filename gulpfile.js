const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const livereload = require('gulp-livereload');
const sass = require('gulp-sass');

// Files for JavaScript
gulp.task('js', function() {
  return gulp.src('./app/js/*.js')
    .pipe(gulp.dest('./public/js'));
});

// Files for SCSS
gulp.task('sass', function () {
  return gulp.src('./app/scss/style.scss')
    .pipe(sass({
      includePaths : ['node_modules/foundation-sites/scss'],
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

// Watcher
gulp.task('watch', () => {
  gulp.watch('./app/scss/**/*.scss', ['sass']);
});

gulp.task('develop', () => {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js coffee nunjucks',
    stdout: false
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

gulp.task('default', [
  'sass',
  'js',
  'develop',
  'watch'
]);
