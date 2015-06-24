var gulp = require('gulp'),
    plugins = require('gulp-load-plugins');

var tasks = plugins({
  rename: {
    'gulp-angular-templatecache': 'templateCache'
  }
});

require('./gulp/build')(gulp, tasks);
require('./gulp/images')(gulp, tasks);
require('./gulp/styles')(gulp, tasks);
require('./gulp/scripts')(gulp, tasks);
require('./gulp/specs')(gulp, tasks);
require('./gulp/templates')(gulp, tasks);
require('./gulp/watch')(gulp, tasks);