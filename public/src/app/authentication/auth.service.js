(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    Auth.inject = ['$resource'];

    function Auth($resource) {
        var AuthResource = $resource('/api/auth/:action', { action: '@action' }, {
            Register: {
                method: "POST",
                url: '/api/register'
            }
        });

        var service = {
            SignIn: signIn,
            Register: register
        };

        return service;

        ////////////////
        function signIn(data) {
            return AuthResource.save({ action: "sign-in" }, data).$promise;
        }

        function register(data) {
            return AuthResource.Register(data).$promise;
        }
    }
})();