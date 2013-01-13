'use strict';

/* Services */

/** Currently not in use.  I am having trouble with two things:
 1.  Can't call AuthService from the dom.  So I need to wrap the call in rootScope
 2.  AuthService doesn't seem to be a singleton.  So, it's useless.
 * **/
myApp.factory( 'AuthService',
    function() {
        var currentUser;

        var authorized = false;

        return {
            login: function(name) {
                currentUser = name;
                authorized = true;
            },
            logout: function() {
                currentUser = null;
                authorized = false;
            },
            isLoggedIn: function() {
                return authorized;
            },
            currentUser: function() {
                return currentUser;
            }
        };
    }
);