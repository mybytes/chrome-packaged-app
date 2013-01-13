'use strict';

// declare top-level module which depends on filters,and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.directives', 'ngGrid', 'ui.bootstrap']);

// bootstrap (pre instance)
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    // use html5 *no hash) where possible
    // $locationProvider.html5Mode(true);

    // routes
    $routeProvider.when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
    });
    $routeProvider.when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
    });
    $routeProvider.when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl'
    });
    $routeProvider.when('/services', {
        templateUrl: 'partials/services.html',
        controller: 'ServicesCtrl'
    });
    $routeProvider.when('/configure/:serviceName', {
        templateUrl: 'partials/configure.html',
        controller: 'ServicesCtrl'
    });
    $routeProvider.when('/playground/:widgetName', {
        templateUrl: 'partials/playground/playground.html',
        controller: 'PlaygroundCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/home'
    });

}]);

// once app is instantiated
myApp.run(function ($rootScope, $http, AuthService) {

    /** TODO this is a pseudo login... see my troubles with using service in Services.AuthService **/

    // text input for login/password (only)
    $rootScope.loginInput = 'login';
    $rootScope.passwordInput = 'password';

    $rootScope.currentUser = '';

    $rootScope.isLoggedIn = function() {
        var c = $rootScope.currentUser;
        return c != '';
    }

    // on click login
    $rootScope.login = function() {
       $rootScope.currentUser = $rootScope.loginInput;
    }

    // on click logout
    $rootScope.logout = function() {
        $rootScope.currentUser = '';
    }

    // setup globals (can easily export to json later for externalization of strings)
    $rootScope.constants = {
        "company_name": "Angular-Enterprise-Seed",
        "copyright_year": "2013",
        "hero_button": "Start here",
        "hero_title": "Fancy landing page!",
        "lorem_ipsum_short": "Donec id elit non mi porta gravida at eget metus...",
        "lorem_ipsum": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis orci, auctor a dignissim vitae, lobortis vitae lorem. Donec nec tempor leo. Etiam ultricies, elit vel mollis iaculis, orci odio placerat orci, vel malesuada dolor neque nec mi. Donec felis urna, vestibulum eu blandit vitae, eleifend in leo. Nunc tempus condimentum aliquet. Vivamus quis lectus nunc, non adipiscing libero. Praesent et erat sit amet sem suscipit rhoncus. Integer magna libero, dictum nec semper sed, vulputate in dolor. Suspendisse mattis, mauris sit amet commodo porttitor, quam ligula molestie tortor, rhoncus cursus diam magna in libero. Aliquam non sapien ut velit adipiscing viverra ac vel felis."
    };

});