module.exports = function () {
  return {
    restrict: 'E',
    templateUrl: 'ui/shared/foomodule2/foomodule2.html',
    controller: 'FooModule2Controller',
    scope: true,
    link: function ($scope, $viewElement, attributes) {
      console.log('FooModule2 directive: link function calling');
    }
  }
};