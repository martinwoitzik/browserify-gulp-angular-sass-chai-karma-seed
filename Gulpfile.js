var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    modify = require('gulp-modify'),
    concat = require('gulp-concat');


gulp.task('build', ['cleanup', 'styles', 'templates', 'js']);


gulp.task('cleanup', function() {
  del(['public/**/*']);
});


gulp.task('styles', ['css:modules', 'css:build'], function() {});

gulp.task('css:modules', function() {
  gulp.src([
    "app/*/**/*.scss",
    "!**/_styles*/**/*"
  ])
  .pipe(modify({
    fileModifier: function(file, contents) {
      var filePath = file.relative.replace('.scss', '')
      return "@import './" + filePath + "';";
    }
  }))
  .pipe(concat('_modules.scss'))
  .pipe(modify({
    fileModifier: function(file, contents) {
      return '// This file is generated via gulp!\n' + contents + '\n';
    }
  }))
  .pipe(gulp.dest('app'));
});

gulp.task('css:build', [], function () {
  var sassOptions = {
    outputStyle: 'compressed'
  };
  return gulp.src(['app/app.scss'])
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});


gulp.task('js', function() {
  gulp.src(['app/app.js'])
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(concat('bundle.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('public/js'));
});


gulp.task('templates', function () {
  gulp.src('app/index.html')
    .pipe(gulp.dest('public'));
  gulp.src('app/src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache('templates.min.js', {
      module: 'portfolio.templates',
      standalone: true
    }))
    .pipe(gulp.dest('public/js'));
});


gulp.task('watch', ['build'], function() {
  gulp.watch(['app/**/*.js', 'app/**/*.html'], [
    'build'
  ], function(err) {
    console.log(err);
  });
});