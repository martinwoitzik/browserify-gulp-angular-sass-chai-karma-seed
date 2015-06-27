var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('templates', function () {
    gulp.src(config.source.base + 'index.html')
      .pipe(gulp.dest(config.dist.base));
    return gulp.src(config.source.base + 'src/**/*.html')
      .pipe(tasks.plumber())
      .pipe(tasks.htmlmin({collapseWhitespace: true}))
      .pipe(tasks.templateCache(config.dist.templates, {
        module: 'app.templates',
        standalone: true
      }))
      .pipe(gulp.dest(config.dist.base + 'js'));
  });

};