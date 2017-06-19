(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.inject = ['$scope', '$state', '$uibModal', 'ProductService', 'Dialog'];

    function IndexController($scope, $state, $uibModal, ProductService, Dialog) {
        var vm = this;
        $scope.preloader = true;

        $scope.review = {
            grid: true
        }

        $scope.price = {
            grid: true
        }

        $scope.product = {
            grid: true
        }

        window.cc = $scope;
        $scope.categorySearch = null;
        var limitProduct = 'limit=6';
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
                //$scope.categorySearch = res[0];
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

        $scope.goUser = function goUser() {
            window.location.replace("/product/profile");
        }

        $scope.changeView = function changeView(viewtype, booleanView) {
            console.log(viewtype);
            console.log(booleanView);

            if (viewtype == "review") {
                $scope.review.grid = booleanView;
            } else if (viewtype == "price") {
                $scope.price.grid = booleanView;
            } else if (viewtype == "product") {
                $scope.product.grid = booleanView;
            }
        }
    }
})();