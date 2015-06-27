'use strict';

module.exports = ['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "ui/states/home/home.html"
    });

}];