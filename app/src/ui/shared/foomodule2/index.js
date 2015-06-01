'use strict';

require('../foomodule3');

require('angular').module('foomodule2', [
    'app.templates',
    'foomodule3'
  ])
  .controller('FooModule2Controller', require('./foomodule2.controller'))
  .directive('foomodule2', require('./foomodule2.directive'));