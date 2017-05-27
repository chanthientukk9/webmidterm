(function() {
    'use strict';

    angular
        .module('app.auth')
        .controller('SignInController', SignInController);

    SignInController.inject = ['$scope'];

    function SignInController($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();