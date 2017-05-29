(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    Auth.inject = ['$resource'];

    function Auth($resource) {
        var AuthResource = $resource('/api/auth/:action', { action: '@action' });

        var service = {
            SignIn: signIn
        };

        return service;

        ////////////////
        function signIn(data) {
            return AuthResource.save({ action: "sign-in" }, data).$promise;
        }
    }
})();