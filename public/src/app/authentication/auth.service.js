(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    Auth.inject = ['$resource'];

    function Auth($resource) {
        var AuthResource = $resource('/api/auth/:action', { action: '@action' });

        var service = {
            SignIn: signIn,
            SignUp: signUp
        };

        return service;

        ////////////////
        function signIn(data) {
            return AuthResource.save({ action: "sign-in" }, data).$promise;
        }

        function signUp(data) {
            return AuthResource.save({ action: "sign-up" }, data).$promise;
        }
    }
})();