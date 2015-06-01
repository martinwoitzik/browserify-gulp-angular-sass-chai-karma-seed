'use strict';

require('angular').module('foostate', [
    'app.templates'
  ])
  .controller('FooStateController', require('./foostate.controller'))
  .config(require('./foostate.config'));
