'use strict';

require('ui/shared/foomodule1');
require('ui/shared/foomodule2');

require('angular').module('foostate', [
    'app.templates',
    'foomodule1',
    'foomodule2'
  ])
  .controller('FooStateController', require('./foostate.controller'))
  .config(require('./foostate.config'));
