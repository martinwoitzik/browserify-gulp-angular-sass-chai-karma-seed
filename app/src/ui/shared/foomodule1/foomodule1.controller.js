'use strict';

module.exports = ['$scope', function ($scope) {

  $scope.buttonPressed = false;

  $scope.doSomething = function () {
    $scope.buttonPressed = true;
    console.log('click foomodule1');
  };

}];