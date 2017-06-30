(function() {
    'use strict';

    var app = angular.module('app');

    app.run(function($http, $cookies, $rootScope, $window, $state, $interval) {
        // Config access token
        var token = $cookies.get('tkcc');

        if (token) {
            // JWT token to call apis
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;

            if ($state.is('app.admin')) {
                if (($rootScope.role && ($rootScope.role != 1 || $rootScope.role != 1001)) || !$rootScope.role) {
                    window.location.pathname = "/";
                }
            }
        } else {
            if (!(window.location.pathname == "/") && !(window.location.pathname == "/product/detail") && !(window.location.pathname == "/product/list")) {
                window.location.pathname = "/";
            }
        }
    });
})();