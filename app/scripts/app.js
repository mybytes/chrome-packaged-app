'use strict';

angular.module('myBytesApp', ['ngGrid', 'myBytesServices'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/personal-details-comparison', {
        templateUrl: 'views/personal-details-comparison.html',
        controller: 'PersonalDetailsComparisonCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
