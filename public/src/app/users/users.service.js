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
            },

            Upgrade: {
                method: "GET",
                url: "/api/member-upgrade"
            }
        })
        var service = {
            GetProfile: getProfile,
            ConvertTimeToDate: convertTimeToDate,
            Upgrade: upgrade
        };

        return service;

        ////////////////
        function getProfile() {
            return UserResource.get().$promise;
        }

        function convertTimeToDate(time) {
            return (new Date(time)).toLocaleString('vi');
        }

        function upgrade() {
            return UserResource.Upgrade().$promise;
        }


    }
})();