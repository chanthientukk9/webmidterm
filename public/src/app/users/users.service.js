(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('UsersService', UsersService);

    UsersService.inject = ['$resource'];

    function UsersService($resource) {

        var UserResource = $resource("/api/profile", {}, {
            update: {
                method: "PUT"
            }
        })
        var service = {
            GetProfile: getProfile
        };

        return service;

        ////////////////
        function getProfile() {
            return UserResource.get().$promise;
        }


    }
})();