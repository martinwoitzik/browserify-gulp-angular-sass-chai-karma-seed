module.exports = function(gulp, tasks) {

  gulp.task('templates', function () {
    gulp.src('app/index.html')
      .pipe(gulp.dest('public'));
    return gulp.src('app/src/**/*.html')
      .pipe(tasks.htmlmin({collapseWhitespace: true}))
      .pipe(tasks.templateCache('templates.min.js', {
        module: 'portfolio.templates',
        standalone: true
      }))
      .pipe(gulp.dest('public/js'));
  });

};