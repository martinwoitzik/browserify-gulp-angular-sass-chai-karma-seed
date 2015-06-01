require('./')

describe('foomodule1', function() {

  var $scope = null;
  var $viewElement = null;

  beforeEach(function() {
    angular.mock.module('foomodule1');

    //var apiAuthenticationMock = {
    //  getToken: function() {}
    //};

    angular.mock.module(function($provide) {
      //$provide.value('ApiAuthentication', apiAuthenticationMock);
    });

    angular.mock.inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      var template = '<foomodule1></foomodule1>';
      $viewElement = $compile(template)($scope);
      $scope.$apply();
    });

  });


  describe('loading the foomodule1 module', function() {

    it('should render the module', function() {
      expect($viewElement.find('[ng-click="doSomething()"]')).to.exist;
    });

  });


  describe('pressing the doSomething button', function() {

    it('should change the buttonPressed variable', function() {
      $viewElement.find('[ng-click="doSomething()"]').click();
      expect($viewElement.scope().buttonPressed).to.be.true;
    });

  });

});