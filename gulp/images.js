var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('images', function(callback) {
    tasks.runSequence('images:common:build', 'images:modules:build', callback);
  });

  gulp.task('images:common:build', function() {
      return gulp.src([
        config.project.source + config.images.source + "*.{png,jpg,jpeg,gif,svg}",
        config.project.source + config.images.source + "**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest(config.project.dist + config.images.dist));
  });

  gulp.task('images:modules:build', function() {
      return gulp.src([
        config.project.source + config.scripts.source + "**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest(config.project.dist + config.images.dist));
  });

};
