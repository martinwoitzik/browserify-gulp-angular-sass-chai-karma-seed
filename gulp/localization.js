var config = require('./config');
var del = require('del');

module.exports = function(gulp, tasks) {

  var supportedLanguages = config.localization.supportedLanguages;

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
          return 'var language_' + options.language + ' = ' + content + ';';
        }}))
      .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  };

  gulp.task('localization', function(callback) {
    tasks.runSequence('localization:build', 'localization:concat', 'localization:cleanup', callback);
  });

  gulp.task('localization:build', function() {
    var streams = supportedLanguages.map(function(language) {
      return buildTranslations({
        glob: config.project.source + config.scripts.source + '**/*/*_' + language +'.json',
        dist: config.localization.output,
        language: language
      })
    });
    return streams[streams.length-1];
  });

  gulp.task('localization:concat', function() {
    return gulp.src([
      config.project.dist + config.scripts.dist + config.localization.output + '*.js'
    ])
    .pipe(tasks.concat(config.localization.output + '.min.js'))
    .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  });

  gulp.task('localization:cleanup', function() {
    var filesToDelete = supportedLanguages.map(function(lang) {
      return config.project.dist + config.scripts.dist + config.localization.output + '_' + lang + '.js';
    });
    return del(filesToDelete);
  });

};