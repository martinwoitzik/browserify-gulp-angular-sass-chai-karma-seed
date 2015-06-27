'use strict';

var appTitle = 'seedApp';

require('ui/states/home');
require('ui/states/foostate');


var angular = require('angular');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appTitle]);
});

angular.module(appTitle, [
  require('angular-ui-router'),
  'foomodule1',
  'foomodule2',
  'foostate',
  'home'
])
  .run(function () {

    console.log('angular app running');

  })
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

  });