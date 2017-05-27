(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('AuthController', AuthController);

    AuthController.inject = ['$scope'];

    function AuthController($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();