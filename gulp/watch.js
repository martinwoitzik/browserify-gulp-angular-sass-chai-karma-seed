module.exports = function(gulp, tasks) {

  gulp.task('watch', ['build', 'specs'], function() {
    gulp.watch([
      'app/**/*.js',
      'app/**/*.html',
      'app/**/*.scss',
      '!app/_dependencies.js',
      '!app/_modules.scss'
    ], [
      'build',
      'specs'
    ], function(err) {
      console.log(err);
    });
  });

};