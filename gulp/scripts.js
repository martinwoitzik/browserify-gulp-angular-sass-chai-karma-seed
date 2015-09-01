var config = require('./config');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var gutil = require('gulp-util');

module.exports = function(gulp, tasks) {

  gulp.task('scripts:development', function(callback) {
    tasks.runSequence('scripts:js:build:development', callback);
  });

  gulp.task('scripts:production', function(callback) {
    tasks.runSequence('scripts:js:build:production', callback);
  });

  /**
   *  Fetch modules by parsing the folder structure and put every module inside
   *  the '_dependencies.js' file which gets included by app.js
   *
   *  @deprecated
   */
  gulp.task('scripts:js:modules', function() {
    return gulp.src([
      config.project.source + "**/**/index.js"
    ])
      .pipe(tasks.plumber())
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          var filePath = file.relative.replace('/index.js', '\');');
          return 'require(\'./' + filePath;
        }
      }))
      .pipe(tasks.concat('_dependencies.js'))
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          return '// This file is generated via gulp!\n' + contents + '\n';
        }
      }))
      .pipe(gulp.dest(config.project.dist));
  });

  gulp.task('scripts:js:build:development', function() {
    return gulp.src([config.project.source + config.scripts.entryPoint])
      .pipe(tasks.plumber())
      .pipe(tasks.browserify({
        insertGlobals: true,
        debug: true,
        paths: ['./node_modules', './' + config.project.source + config.scripts.source]
      }))
      .pipe(tasks.concat(config.scripts.output + '.min.js'))
      .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  });

  gulp.task('scripts:js:build:production', function() {
    return gulp.src([config.project.source + config.scripts.entryPoint])
      .pipe(tasks.plumber())
      .pipe(tasks.browserify({
        insertGlobals: true,
        debug: false,
        paths: ['./node_modules', './' + config.project.source + config.scripts.source]
      }))
      .pipe(tasks.concat(config.scripts.output + '.min.js'))
      .pipe(tasks.uglify())
      .pipe(gulp.dest(config.project.dist + config.scripts.dist));
  });

  gulp.task('scripts:js:watchify', function() {
    var customOpts = {
      entries: [config.project.source + config.scripts.entryPoint],
      debug: true,
      paths: ['./node_modules', './' + config.project.source + config.scripts.source]
    };
    var opts = assign({}, watchify.args, customOpts);
    var b = watchify(browserify(opts), {poll: 100});
    b.on('update', function() {
      bundle();
    });
    b.on('log', function(log) {
      gutil.log('Watchify: ' + log);
    });

    function bundle() {
      return b.bundle()
        .on('error', gutil.log.bind(gutil, gutil.colors.red('Browserify Error')))
        .pipe(source(config.scripts.output + '.min.js'))
        .pipe(buffer())
        .pipe(tasks.sourcemaps.init({loadMaps: true}))
        .pipe(tasks.sourcemaps.write('./'))
        .pipe(gulp.dest(config.project.dist + config.scripts.dist));
    }

    return bundle();
  });

};