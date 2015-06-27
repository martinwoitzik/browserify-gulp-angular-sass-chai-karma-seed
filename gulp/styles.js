var config = require('./config');

module.exports = function(gulp, tasks) {

  gulp.task('styles', function(callback) {
    tasks.runSequence('styles:css:modules', 'styles:css:build', callback);
  });

  /**
   *  Fetch scss files by parsing the folder structure and put every module inside
   *  the '_modules.scss' file which gets included by app.scss
   */
  gulp.task('styles:css:modules', function() {
    return gulp.src([
      config.project.source + "*/**/*.scss",
      "!**/styles*/**/*"
    ])
      .pipe(tasks.plumber())
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          var filePath = file.relative.replace('.scss', '')
          return "@import './" + filePath + "';";
        }
      }))
      .pipe(tasks.concat(config.sass.concatenatedModuleStyles))
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          return '// This file is generated via gulp!\n' + contents + '\n';
        }
      }))
      .pipe(gulp.dest(config.project.source));
  });

  gulp.task('styles:css:build', [], function () {
    var sassOptions = {
      outputStyle: 'compressed'
    };
    return gulp.src([config.project.source + config.sass.entryPoint])
      .pipe(tasks.plumber())
      .pipe(tasks.sass(sassOptions))
      .pipe(tasks.autoprefixer())
      .pipe(gulp.dest(config.project.dist + config.sass.dist));
  });

};
