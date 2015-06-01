require('./')

describe('foomodule2', function() {

  var $scope = null;
  var $viewElement = null;
  var sandbox = sinon.sandbox.create();

  beforeEach(function() {
    angular.mock.module('app.templates');
    angular.mock.module('foomodule2');

    angular.mock.inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      var template = '<foomodule2></foomodule2>';
      $viewElement = $compile(template)($scope);
      $scope.$apply();
    });
  });


  afterEach(function() {
    sandbox.restore();
  });


  describe('loading the foomodule2 module', function() {

    it('should render the module', function() {
      expect($viewElement.find('[ng-click="doSomething()"]')).to.exist;
    });

    it('should render the foobar3 module', function() {
      expect($viewElement.find(('[ng-click="doNothing()"]'))).to.exist;
    });

  });


  describe('pressing the doSomething button', function() {

    var scope = null;

    beforeEach(function() {
      scope = $viewElement.scope();
    });

    it('should change the buttonPressed variable', function() {
      sandbox.spy(scope, 'doSomething');
      $viewElement.find('[ng-click="doSomething()"]').click();
      expect(scope.doSomething).to.have.been.called;
    });

  });

});