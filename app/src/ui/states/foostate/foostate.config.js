'use strict';

module.exports = function ($stateProvider) {

  $stateProvider
    .state('foostate', {
      url: '/foostate',
      controller: 'FooStateController',
      templateUrl: "ui/states/foostate/foostate.html"
    });
};