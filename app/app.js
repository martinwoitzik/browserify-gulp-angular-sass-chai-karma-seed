'use strict';

var appTitle = 'seedApp';

require('ui/states/home');
require('ui/states/foostate');
require('utils/texts');


var angular = require('angular');

angular.element(document).ready(function () {
  angular.bootstrap(document, [appTitle]);
});

angular.module(appTitle, [
  require('angular-ui-router'),
  'texts',
  'foostate',
  'home'
])
  .run([function () {

    console.log('angular app running');

  }])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

  }]);