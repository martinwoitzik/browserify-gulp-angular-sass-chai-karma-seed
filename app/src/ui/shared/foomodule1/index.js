'use strict';

require('angular').module('foomodule1', [
  'portfolio.templates',
  'foomodule3'
  ])
  .controller('FooModule1Controller', require('./foomodule1.controller'))
  .directive('foomodule1', require('./foomodule1.directive'));