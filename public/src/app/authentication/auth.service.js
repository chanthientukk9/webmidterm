(function() {
    'use strict';

    angular
        .module('app')
        .factory('Auth', Auth);

    Auth.inject = ['$resource'];

    function Auth($resource) {
        var AuthResource = $resource('/api/login/', {}, {
            Register: {
                method: "POST",
                url: '/api/register'
            }
        });

        var service = {
            Login: login,
            Register: register
        };

        return service;

        ////////////////
        function login(data) {
            return AuthResource.save(data).$promise;
        }

        function register(data) {
            return AuthResource.Register(data).$promise;
        }
    }
})();