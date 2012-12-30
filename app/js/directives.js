'use strict';

/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      console.log('appVersion...');
      elm.text(version);
    };
  }]); 

angular.module('myApp.directives', []).
  directive('fadeIn', function() {
    return {
      compile: function(elm) {
        console.log('compiling');
        $(elm).css('opacity', 0.1);
        return function(scope, elm, attrs) {
          console.log('animating');
          $(elm).animate({ opacity : 1.0 }, 1000 );
        };
      }
    };
});
