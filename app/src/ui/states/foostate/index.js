'use strict';

require('angular').module('foostate', [
    'portfolio.templates'
  ])
  .controller('FooStateController', require('./foostate.controller'))
  .config(require('./foostate.config'));
