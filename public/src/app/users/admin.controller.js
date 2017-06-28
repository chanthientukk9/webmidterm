(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('AdminController', AdminController);

    AdminController.inject = ['$scope'];

    function AdminController($scope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {}
    }
})();