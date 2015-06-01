'use strict';

module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: 'ui/shared/foomodule3/foomodule3.html',
    controller: 'FooModule3Controller',
    scope: true,
    link: function ($scope, $viewElement, attributes) {
      //console.log('FooModule3 directive: link function calling');
    }
  }
};