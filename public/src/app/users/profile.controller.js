(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('ProfileController', ProfileController);

    ProfileController.inject = ['$scope'];

    function ProfileController($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();