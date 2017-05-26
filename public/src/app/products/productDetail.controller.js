(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.inject = ['$scope', '$state', 'ProductService', 'Dialog'];

    function ProductDetailController($scope, $state, ProductService, Dialog) {
        var vm = this;
        $scope.preloader = true;
        window.cc = $scope;

        activate();

        ////////////////

        function activate() {
            ProductService.GetProduct($state.params.id).then(function(res) {
                $scope.product = res;
                $scope.currentMedia = res.urlMedia[0].url;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.changeMedia = function changeMedia(url) {
            $scope.currentMedia = url;
        }
    }
})();