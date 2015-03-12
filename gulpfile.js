var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    watch = require('gulp-watch'),
    babel = require('gulp-babel'),
    reactify = require('reactify'),
    babelify = require('babelify'),
    uglify = require('gulp-uglify');

gulp.task('build_front', function() {
  return gulp.src('app/front/javascripts/app.js', {
    read: false
  }).pipe(browserify({
    transform: ['babelify', 'reactify'],
  }))
  .pipe(gulp.dest('./dist/front'));
});

gulp.task('build_server', function() {
  return gulp.src('app/server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/server'));
});

gulp.task('watch', function() {
  return gulp.watch('app/front/javascripts/**/*', ['build_front']);
  return gulp.watch('app/**/*', ['build']);
});

gulp.task('default');
