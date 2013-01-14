'use strict';

/* Directives */

var directives = angular.module('myApp.directives', []);

// causes element to css animate in/out
directives.directive('fadeIn', function() {
    return {
      compile: function(elm) {
        $(elm).css('opacity', 0.1);
        return function(scope, elm, attrs) {
          $(elm).animate({ opacity : 1.0 }, 500 );
        };
      }
    };
});
