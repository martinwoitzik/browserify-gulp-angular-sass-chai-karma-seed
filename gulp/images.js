module.exports = function(gulp, tasks) {

  gulp.task('images', function(callback) {
    tasks.runSequence('images:shared:build', callback);
  });

  gulp.task('images:shared:build', function() {
      return gulp.src([
        "app/src/shared/img/*.{png,jpg,jpeg,gif,svg}"
      ])
      .pipe(gulp.dest('public/images'));
  });

};
