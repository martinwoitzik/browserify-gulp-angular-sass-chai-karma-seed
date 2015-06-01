module.exports = function(gulp, tasks) {

  gulp.task('watch', ['build'], function() {
    gulp.watch([
      'app/**/*.js',
      'app/**/*.html',
      'app/**/*.scss',
      '!app/_dependencies.js',
      '!app/_modules.scss'
    ], [
      'build'
    ], function(err) {
      console.log(err);
    });
  });

};