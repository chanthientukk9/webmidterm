(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('UsersService', UsersService);

    UsersService.inject = ['$resource'];

    function UsersService($resource) {
        var service = {
            exposedFn: exposedFn
        };

        return service;

        ////////////////
        function exposedFn() {}
    }
})();