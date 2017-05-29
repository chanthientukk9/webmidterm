(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductListController', ProductListController);

    ProductListController.inject = ['$scope', '$state', 'ProductService', 'Dialog', '$uibModal'];

    function ProductListController($scope, $state, ProductService, Dialog, $uibModal) {
        var vm = this;
        window.cc = $scope;
        $scope.preloader = true;

        activate();

        ////////////////

        function activate() {
            if (!$state.params.categoryId) {
                getAllProduct();
            } else {
                getProductByCategory($state.params.categoryId);
            }
            getAllCategory();
        }

        function getAllCategory() {
            ProductService.GetAllCategory().then(function(res) {
                $scope.categoryList = res;
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        function getAllProduct() {
            $scope.preloader = true;
            ProductService.GetAllProduct().then(function(res) {
                $scope.productList = res;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        function getProductByCategory(id) {
            $scope.preloader = true;
            ProductService.GetProductByCategory(id).then(function(res) {
                $scope.productList = res;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.viewDetail = function viewDetail(id) {
            $state.go('app.detail', { id: id });
        }

        $scope.viewImage = function viewImage(media) {
            var media = {
                index: 0,
                data: media
            }
            $uibModal.open({
                controller: 'ViewImageModalController',
                templateUrl: './app/products/modals/viewImageModal.html',
                size: 'md',
                resolve: {
                    media: function() {
                        return angular.copy(media);
                    }
                }
            });
        }

    }
})();