(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.inject = ['$scope', '$uibModal'];

    function IndexController($scope, $uibModal) {
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


    }
})();