var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('localization', function(callback) {
    tasks.runSequence('localization:modules:build', callback);
  });

  gulp.task('localization:modules:build', function() {
    return gulp.src([
      "app/src/ui/**/*/*.locales.json"
    ])
    .pipe(gulp.dest('public/js/localization.js'));
  });

};