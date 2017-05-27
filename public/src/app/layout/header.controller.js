(function() {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['$scope', '$state'];

    function HeaderController($scope, $state) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}

        $scope.signIn = function signIn() {
            $state.go('auth.sign-in');
        }
    }
})();