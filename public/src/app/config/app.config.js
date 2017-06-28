(function() {
    'use strict';

    var app = angular.module('app');

    app.run(function($http, $cookies, $rootScope, $window, $state, $interval) {
        // Config access token
        var token = $cookies.get('tkcc');

        if (token) {
            // JWT token to call apis
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;

        } else {

        }
    });
})();