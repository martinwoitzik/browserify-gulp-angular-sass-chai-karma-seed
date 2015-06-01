'use strict';

require('angular').module('foomodule3', [
    'app.templates'
  ])
  .controller('FooModule3Controller', require('./foomodule3.controller'))
  .directive('foomodule3', require('./foomodule3.directive'));