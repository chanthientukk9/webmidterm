(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.inject = ['$scope'];

    function SignInController($scope) {
        var vm = this;
        $scope.user;


        activate();

        ////////////////

        function activate() {

        }
    }
})();