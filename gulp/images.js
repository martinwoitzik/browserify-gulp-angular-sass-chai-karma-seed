module.exports = function(gulp, tasks) {

  gulp.task('images', function(callback) {
    tasks.runSequence('images:shared:build', 'images:modules:build', callback);
  });

  gulp.task('images:shared:build', function() {
      return gulp.src([
        "app/src/shared/images/*.{png,jpg,jpeg,gif,svg}",
        "app/src/shared/images/**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest('public/images'));
  });

  gulp.task('images:modules:build', function() {
      return gulp.src([
        "app/src/ui/**/*/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(tasks.flatten())
      .pipe(gulp.dest('public/images'));
  });

};
