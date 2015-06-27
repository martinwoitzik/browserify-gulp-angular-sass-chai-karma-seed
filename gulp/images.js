var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('images', function(callback) {
    tasks.runSequence('images:shared:build', 'images:modules:build', callback);
  });

  gulp.task('images:shared:build', function() {
      return gulp.src([
        config.source.base + "src/shared/images/*.{png,jpg,jpeg,gif,svg}",
        config.source.base + "src/shared/images/**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest(config.dist.base + 'images'));
  });

  gulp.task('images:modules:build', function() {
      return gulp.src([
        config.source.base + "src/ui/**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest(config.dist.base + 'images'));
  });

};
