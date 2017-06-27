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
            var params = ''
            if ($state.params.categoryId) {
                params += 'category=' + $state.params.categoryId + '&';
            }
            if ($state.params.status) {
                params += 'status=' + $state.params.status;
            }
            console.log(params);
            if (params == '') {
                getAllProduct();
            } else {
                getProductByParams(params);
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

        function getProductByParams(params) {
            $scope.preloader = true;
            ProductService.GetProductByParams(params).then(function(res) {
                $scope.productList = res
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

        $scope.goStatusPage = function goStatusPage(status) {
            console.log(status);
            $state.go('app.list', { status: status })
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

        $scope.sortBy = function sortBy() {
            console.log('hahaaaa');
            var value = $scope.sortValue
            if (value == '1') {
                $scope.productList.sort(function(a, b) {
                    return parseFloat(a.finalPrice) - parseFloat(b.finalPrice);
                })
            } else if (value == '2') {
                $scope.productList.sort(function(a, b) {
                    return parseFloat(a.endDate) - parseFloat(b.endDate);
                })
            }
            console.log($scope.productList);
        }

    }
})();