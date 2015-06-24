'use strict';

require('../../shared/foomodule1');
require('../../shared/foomodule2');

require('angular').module('foostate', [
    'app.templates',
    'foomodule1',
    'foomodule2'
  ])
  .controller('FooStateController', require('./foostate.controller'))
  .config(require('./foostate.config'));
