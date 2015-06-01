var childProcess = require('child_process'),
    spawn = childProcess.spawn;

module.exports = function(gulp, tasks) {

  var karmaProcess = null;
  var karmaEnv = process.env;

  gulp.task('specs', function() {
    tasks.runSequence('specs:startKarma', 'specs:runKarma');
  });

  gulp.task('specs:startKarma', function(callback) {
    if (karmaProcess)
      return callback();

    karmaProcess = spawn(
      'karma',
      ['start'],
      {env: karmaEnv}
    );

    karmaProcess.stdout.on('data', function(data) {
      process.stdout.write(data.toString());
    });
    karmaProcess.stderr.on('data', function(data) {
      process.stderr.write(data.toString());
    });
    karmaProcess.stdout.on('data', function(data) {
      data = data + '';
      if (data.indexOf('Connected on socket') > -1) {
        callback();
      }
    });
  });

  gulp.task('specs:runKarma', function(callback) {
    childProcess.exec('karma run', function() {
      callback();
    });
  });

};