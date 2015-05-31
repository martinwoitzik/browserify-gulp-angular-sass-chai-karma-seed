'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: 'ui/shared/foomodule1/foomodule1.html',
    controller: 'FooModule1Controller',
    scope: true,
    link: function ($scope, $viewElement, attributes) {
      //console.log('FooModule1 directive: link function calling');
    }
  }
};