'use strict';

require('angular').module('foostate', [
    'foo.templates'
  ])
  .controller('FooStateController', require('./foostate.controller'))
  .config(require('./foostate.config'));
