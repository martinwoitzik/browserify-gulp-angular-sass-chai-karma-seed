'use strict';

require('./src/ui/shared/foomodule1');
require('./src/ui/shared/foomodule2');
require('./src/ui/shared/foomodule3');
require('./src/ui/states/foostate');

var angular = require('angular');
var app = angular.module('seedApp', [
  require('angular-ui-router'),
  'foomodule1',
  'foomodule2',
  'foostate'
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['seedApp']);
});

app.run(function() {
  console.log('run angular app');
});

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .otherwise('/');

  $stateProvider.state(
    'home', {
      url: '/',
      template: '<div>Home</div>'
    }
  );

});