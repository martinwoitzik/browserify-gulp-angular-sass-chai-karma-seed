var config = require('./config');

module.exports = function(gulp, tasks) {

  var supportedLanguages = config.supportedLanguages;

  var buildTranslations = function(options) {
    return gulp.src([
        options.glob
      ])
      .pipe(tasks.modify({
        fileModifier: function (file, content) {
          var obj = {};
          var json = content ? JSON.parse(content) : {};
          var filePathSplit = file.relative.split('/');
          filePathSplit.pop();
          filePathSplit.reverse();
          var moduleName = filePathSplit[0];
          obj[moduleName] = json;
          return JSON.stringify(obj);
        }}))
      .pipe(tasks.extend(options.dist + '_' + options.language + '.js'))
      .pipe(tasks.modify({
        fileModifier: function (file, content) {
          return 'module.exports = ' + content + ';';
        }}))
      .pipe(gulp.dest('public/js'));
  };

  gulp.task('localization', function(callback) {
    tasks.runSequence('localization:modules:build', callback);
  });

  gulp.task('localization:modules:build', function() {
    supportedLanguages.forEach(function(language) {
      buildTranslations({
        glob: 'app/src/ui/**/*/*_' + language +'.json',
        dist: 'localization',
        language: language
      })
    })
  });

};