'use strict';

require('angular').module('foomodule2', [
  'foo.templates',
  'foomodule3'
  ])
  .controller('FooModule2Controller', require('./foomodule2.controller'))
  .directive('foomodule2', require('./foomodule2.directive'));