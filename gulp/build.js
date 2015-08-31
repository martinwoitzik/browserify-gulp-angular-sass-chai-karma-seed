var del = require('del');
var config = require('./config');

module.exports = function(gulp, tasks) {

  var buildFor = function(type, callback) {
    tasks.runSequence('cleanup', 'styles', 'images', 'localization', 'templates', 'scripts:' + type, callback);
  };

  gulp.task('default', ['build:development']);

  gulp.task('build:development', function(callback) {
    buildFor('development', callback);
  });

  gulp.task('build:production', function(callback) {
    buildFor('production', callback);
  });

  gulp.task('build:noscripts', function(callback) {
    tasks.runSequence('cleanup', 'styles', 'images', 'localization', 'templates', callback);
  });

  gulp.task('cleanup', function() {
    return del([config.project.dist + '**/*']);
  });

};
