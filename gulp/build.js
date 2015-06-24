var del = require('del');

module.exports = function(gulp, tasks) {

  gulp.task('default', ['build']);

  gulp.task('build', function(callback) {
    tasks.runSequence('cleanup', 'styles', 'images', 'templates', 'scripts', callback);
  });

  gulp.task('cleanup', function() {
    return del(['public/**/*']);
  });

};
