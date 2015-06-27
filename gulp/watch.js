var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('watch', ['build'], function() {
    var filesToWatch = [
      '**/*.js',
      '**/*.html',
      '**/*.scss',
      '**/*.{png,jpg,jpeg,gif,svg}'
    ];
    var filesToExclude = [
      '_modules.scss'
    ];

    filesToWatch = filesToWatch.map(function(glob) {
      return config.source.base + glob;
    });
    filesToExclude = filesToExclude.map(function(glob) {
      return '!' + config.source.base + glob;
    });

    gulp.watch(filesToWatch.concat(filesToExclude), [
      'build'
    ], function(err) {
      console.log(err);
    });
  });

};