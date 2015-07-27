var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('scripts', function(callback) {
    tasks.runSequence('scripts:js:build', callback);
  });

  /**
   *  Fetch modules by parsing the folder structure and put every module inside
   *  the '_dependencies.js' file which gets included by app.js
   *
   *  @deprecated
   */
  gulp.task('scripts:js:modules', function() {
    return gulp.src([
      config.project.source + "**/**/index.js"
    ])
      .pipe(tasks.plumber())
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
      .pipe(gulp.dest(config.project.dist));
  });

  gulp.task('scripts:js:build', function() {
    return gulp.src([config.project.source + config.scripts.entryPoint])
      .pipe(tasks.plumber())
      .pipe(tasks.browserify({
        insertGlobals: true,
        debug: true,
        paths: ['./node_modules', './' + config.project.source + config.scripts.source]
      }))
      .pipe(tasks.concat(config.scripts.output + '.min.js'))
      //.pipe(tasks.uglify())
      .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  });

};