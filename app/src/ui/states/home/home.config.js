'use strict';

module.exports = function ($stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "ui/states/home/home.html"
    });
};