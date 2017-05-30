(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.inject = ['$scope', '$state', '$uibModal', 'ProductService', 'Dialog'];

    function IndexController($scope, $state, $uibModal, ProductService, Dialog) {
        var vm = this;
        $scope.preloader = true;
        window.cc = $scope;
        var limitProduct = 'limit=3';
        activate();

        ////////////////

        function activate() {
            getNewProduct();
            getAllCategory();
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

        function getNewProduct() {
            $scope.preloader = true;
            ProductService.GetAllProduct(limitProduct).then(function(res) {
                $scope.productList = res;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        function getAllCategory() {
            ProductService.GetAllCategory().then(function(res) {
                $scope.categoryList = res;
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.goPage = function goPage(id) {
            if (!id) {
                window.location.replace("/product/list");
            } else {
                window.location.replace("/product/list?categoryId=" + id);
            }
        }

        $scope.goProduct = function goProduct(id) {
            window.location.replace("/product/detail?id=" + id)
        }

        $scope.doBid = function doBid(id) {
            console.log(id);
            $uibModal.open({
                templateUrl: 'app/products/modals/bidModal.html',
                controller: 'BidModalController',
                size: 'md',
                resolve: {
                    id: function() {
                        return angular.copy(id);
                    }
                }
            }).result.then(function() {

            })
        }

    }
})();