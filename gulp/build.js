var del = require('del');
var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('default', ['build']);

  gulp.task('build', function(callback) {
    tasks.runSequence('cleanup', 'styles', 'images', 'localization', 'templates', 'scripts', callback);
  });

  gulp.task('cleanup', function() {
    return del([config.project.dist + '**/*']);
  });

};
