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


gulp.task('build', ['cleanup', 'styles', 'templates', 'scripts']);


gulp.task('cleanup', function() {
  del(['public/**/*']);
});


gulp.task('styles', ['styles:css:modules', 'styles:css:build'], function() {});

/**
 *  Fetch scss files by parsing the folder structure and put every module inside
 *  the '_modules.scss' file which gets included by app.scss
 */
gulp.task('styles:css:modules', function() {
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

gulp.task('styles:css:build', [], function () {
  var sassOptions = {
    outputStyle: 'compressed'
  };
  return gulp.src(['app/app.scss'])
    .pipe(sass(sassOptions))
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/css'));
});


gulp.task('scripts', ['scripts:js:modules', 'scripts:js:build'], function() {});

/**
 *  Fetch modules by parsing the folder structure and put every module inside
 *  the '_dependencies.js' file which gets included by app.js
 */
gulp.task('scripts:js:modules', function() {
  gulp.src([
      "app/**/**/index.js"
  ])
  .pipe(modify({
    fileModifier: function(file, contents) {
      var filePath = file.relative.replace('/index.js', '\');');
      return 'require(\'./' + filePath;
    }
  }))
  .pipe(concat('_dependencies.js'))
  .pipe(modify({
    fileModifier: function(file, contents) {
      return '// This file is generated via gulp!\n' + contents + '\n';
    }
  }))
  .pipe(gulp.dest('app'));
});

gulp.task('scripts:js:build', function() {
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