module.exports = function(gulp, tasks) {

  gulp.task('scripts', function(callback) {
    tasks.runSequence('scripts:js:modules', 'scripts:js:build', callback);
  });

  /**
   *  Fetch modules by parsing the folder structure and put every module inside
   *  the '_dependencies.js' file which gets included by app.js
   */
  gulp.task('scripts:js:modules', function() {
    return gulp.src([
      "app/**/**/index.js"
    ])
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          var filePath = file.relative.replace('/index.js', '\');');
          return 'require(\'./' + filePath;
        }
      }))
      .pipe(tasks.concat('_dependencies.js'))
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          return '// This file is generated via gulp!\n' + contents + '\n';
        }
      }))
      .pipe(gulp.dest('app'));
  });

  gulp.task('scripts:js:build', function() {
    return gulp.src(['app/app.js'])
      .pipe(tasks.browserify({
        insertGlobals: true,
        debug: true
      }))
      .pipe(tasks.concat('bundle.js'))
      .pipe(tasks.uglify())
      .pipe(gulp.dest('public/js'));
  });

};