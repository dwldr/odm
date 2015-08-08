var gulp   = require('gulp'),
    gutil  = require('gulp-util'),
    gulpif  = require('gulp-if'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass   = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    purify = require('gulp-purifycss'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', function() {
  return gulp.src(['source/vendor/jquery/dist/jquery.min.js','source/vendor/bootstrap/js/bootstrap.min.js','source/vendor/selectize/selectize.min.js','source/vendor/moment/min/moment.min.js','source/vendor/nprogress/nprogress.js','source/vendor/typeahead.js/dist/typeahead.jquery.min.js','source/vendor/angularjs/angular.min.js','source/vendor/angular-route/angular-route.min.js','source/javascript/**/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  //only uglify if gulp is ran with '--type production'
  .pipe(gutil.env.type === 'production' ? uglify({'mangle': false}) : gutil.noop()) 
  .pipe(gulp.dest('assets/javascript'))
  .pipe(browserSync.stream());
});

gulp.task('build-css', function() {
var processors = [autoprefixer({browsers: ['last 2 version']})];
  return gulp.src(['source/scss/**/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(purify(['source/vendor/jquery/dist/jquery.min.js','source/vendor/bootstrap/js/bootstrap.min.js','source/vendor/selectize/selectize.min.js','source/vendor/moment/min/moment.min.js','source/vendor/nprogress/nprogress.js','source/vendor/typeahead.js/dist/typeahead.jquery.min.js','source/vendor/angularjs/angular.min.js','source/vendor/angular-route/angular-route.min.js','source/javascript/**/*.js', '**/**/*.html']))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    //only cssmin if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? cssmin() : gutil.noop()) 
    .pipe(gulp.dest('assets/stylesheets'))
    .pipe(browserSync.stream());
});

gulp.task('icons', function() {
  return gulp.src('source/vendor/components-font-awesome/fonts/**.*')
  .pipe(gulp.dest('assets/fonts/fontawesome'));
});

gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint','build-js']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['build-css','build-js','icons','watch','serve']);
