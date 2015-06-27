var cfg = require('./gulp/config');

var scriptsBundle = cfg.project.dist + cfg.scripts.dist + cfg.scripts.output + '.min.js';
var templatesBundle = cfg.project.dist + cfg.scripts.dist + cfg.templates.output + '.min.js';
var scriptsRoot = cfg.project.source + cfg.scripts.source;
var specFilesGlob = cfg.project.source + '**/*.spec.js';

module.exports = function(karmaConfig) {
  var filesToLoad = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'node_modules/chai/chai.js',
    'node_modules/chai-jquery/chai-jquery.js',
    'node_modules/sinon/pkg/sinon.js',
    'node_modules/sinon-chai/lib/sinon-chai.js',
    scriptsBundle,
    templatesBundle,
    specFilesGlob
  ];

  karmaConfig.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    browserify: {
      insertGlobals: true,
      watch: true,
      debug: true,
      paths: ['./node_modules', './' + scriptsRoot]
    },


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'browserify',
      'mocha',
      'chai'
    ],


    plugins: [
      'karma-browserify',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],


    // list of files / patterns to load in the browser
    files: filesToLoad,


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.spec.js': ['browserify']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: karmaConfig.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
