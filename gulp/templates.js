var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('templates', function () {
    gulp.src(config.project.source + config.templates.entryPoint)
      .pipe(gulp.dest(config.project.dist));
    return gulp.src(config.project.source + config.scripts.source + '**/*.html')
      .pipe(tasks.plumber())
      .pipe(tasks.htmlmin({collapseWhitespace: true}))
      .pipe(tasks.templateCache(config.templates.output + '.min.js', {
        module: config.templates.moduleName,
        standalone: true
      }))
      .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  });

};