var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch'),
    reactify = require('reactify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify');

gulp.task('build', function() {
  return gulp.src('src/javascripts/app.js', {
    read: false
  }).pipe(browserify({
    transform: ['babelify', 'reactify'],
    debug: true
  })).pipe(uglify())
  .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
  return gulp.watch('src/javascripts/**/*', ['build']);
});

gulp.task('default', ['coffee']);
