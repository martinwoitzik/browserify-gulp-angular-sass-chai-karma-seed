var config = require('./config');

module.exports = function(gulp, tasks) {

  var utils = {
    getBundle : function (type) {
      var modulePath = '../' + config.project.source + config.bundle.js;
      require.cache[modulePath] = undefined;
      var bundle = require(modulePath);
      return bundle[type];
    }
  };

  gulp.task('bundle', function () {
    var target = 'libs';
    var bundle = utils.getBundle(target);
    for (var item in bundle) {
      gulp.src(bundle[item].source, {cwd: 'bower_components'})
        .pipe(gulp.dest(config.project.dist + bundle[item].dist + '/' + target));
    }
  });

};