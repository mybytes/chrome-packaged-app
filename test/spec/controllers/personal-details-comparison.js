'use strict';

describe('Controller: PersonalDetailsComparisonCtrl', function () {

  // load the controller's module
  beforeEach(module('chromePackagedAppApp'));

  var PersonalDetailsComparisonCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalDetailsComparisonCtrl = $controller('PersonalDetailsComparisonCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
