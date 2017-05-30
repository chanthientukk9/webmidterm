(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.inject = ['$scope', '$uibModal', 'ProductService', 'Dialog'];

    function IndexController($scope, $uibModal, ProductService, Dialog) {
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log("Haha");
        }

        $scope.signIn = function signIn() {
            $uibModal.open({
                templateUrl: 'app/authentication/signIn.html',
                controller: 'SignInController',
                size: 'lg',
            }).result.then(function(data) {
                console.log(data);
            });
        }

        $scope.signUp = function signUp() {
            $uibModal.open({
                templateUrl: 'app/authentication/signUp.html',
                controller: 'SignUpController',
                size: 'lg',
            }).result.then(function(data) {
                console.log(data);
            });
        }


    }
})();