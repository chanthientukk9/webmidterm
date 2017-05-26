(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductListController', ProductListController);

    ProductListController.inject = ['$scope'];

    function ProductListController($scope) {
        var vm = this;
        window.cc = $scope;
        $scope.isOpenDescription = false;

        activate();

        ////////////////

        function activate() {}

        $scope.openDescription = function openDescription() {
            $scope.isOpenDescription = !$scope.isOpenDescription;
        }
    }
})();