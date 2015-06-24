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
      "app/*/**/*.scss",
      "!**/_styles*/**/*"
    ])
      .pipe(tasks.plumber())
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          var filePath = file.relative.replace('.scss', '')
          return "@import './" + filePath + "';";
        }
      }))
      .pipe(tasks.concat('_modules.scss'))
      .pipe(tasks.modify({
        fileModifier: function(file, contents) {
          return '// This file is generated via gulp!\n' + contents + '\n';
        }
      }))
      .pipe(gulp.dest('app'));
  });

  gulp.task('styles:css:build', [], function () {
    var sassOptions = {
      outputStyle: 'compressed'
    };
    return gulp.src(['app/app.scss'])
      .pipe(tasks.plumber())
      .pipe(tasks.sass(sassOptions))
      .pipe(tasks.autoprefixer())
      .pipe(gulp.dest('public/css'));
  });

};
