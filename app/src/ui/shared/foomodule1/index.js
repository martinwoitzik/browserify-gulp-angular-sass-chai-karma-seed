'use strict';

require('angular').module('foomodule1', [
    'app.templates'
  ])
  .controller('FooModule1Controller', require('./foomodule1.controller'))
  .directive('foomodule1', require('./foomodule1.directive'));