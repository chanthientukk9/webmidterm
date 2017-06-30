(function() {
    'use strict';

    angular
        .module('app.users')
        .factory('AdminService', AdminService);

    AdminService.$inject = ['$resource'];

    function AdminService($resource) {

        var AdminResource = $resource("/api/admin", {}, {
            AllowUpgrade: {
                method: "PUT",
                url: '/api/allow-upgrade'
            },

            GetMember: {
                method: "GET",
                url: 'api/member',
                isArray: true
            }
        })

        var service = {
            AllowUpgrade: allowUpgrade,
            GetMember: getMember
        };

        return service;

        ////////////////
        function allowUpgrade(data) {
            return AdminResource.AllowUpgrade(data).$promise;
        }

        function getMember() {
            return AdminResource.GetMember().$promise;
        }
    }
})();