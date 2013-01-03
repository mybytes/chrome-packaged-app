'use strict';

/* Directives */

var directives = angular.module('myApp.directives', []);


// set element text as "version"
directives.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);


// causes element to css animate in/out
directives.directive('fadeIn', function() {
    return {
      compile: function(elm) {
        console.log('compiling');
        $(elm).css('opacity', 0.1);
        return function(scope, elm, attrs) {
          $(elm).animate({ opacity : 1.0 }, 500 );
        };
      }
    };
});
