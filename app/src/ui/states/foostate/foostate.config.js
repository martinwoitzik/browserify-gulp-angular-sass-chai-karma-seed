'use strict';

module.exports = ['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('foostate', {
      url: '/foostate',
      controller: 'FooStateController',
      templateUrl: "ui/states/foostate/foostate.html"
    });

}];