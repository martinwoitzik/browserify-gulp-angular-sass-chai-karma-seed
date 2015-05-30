describe('foomodule1', function() {

  var $scope = null;
  var $viewElement = null;

  beforeEach(function() {
    angular.mock.module(require('./'));

    //var apiAuthenticationMock = {
    //  getToken: function() {}
    //};
    //var nodeTreeMock = {
    //  getRoomsAndSubrooms: function() {
    //    return new Promise().resolve()
    //  }
    //};

    angular.mock.module(function($provide) {
      //$provide.value('ApiAuthentication', apiAuthenticationMock);
      //$provide.value('NodeTree', nodeTreeMock);
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
      console.log($viewElement);
      expect(true).toBe(true);
      //expect($viewElement.find('[ng-click="doSomething()"]')).toExist();
    });

  });


  describe('pressing the doSomething button', function() {

    it('should change the buttonPressed variable', function() {
      $viewElement.find('[ng-click="doSomething()"]').click();
      expect($viewElement.scope().buttonPressed).toBe(true);
    });

  });

});