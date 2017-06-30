(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductListController', ProductListController);

    ProductListController.inject = ['$scope', '$state', 'ProductService', 'Dialog', '$uibModal'];

    function ProductListController($scope, $state, ProductService, Dialog, $uibModal) {
        var vm = this;
        window.cc = $scope;
        window.ck = $state;
        $scope.preloader = true;
        $scope.pageNumber = $state.params.page;
        $scope.pageLimit = 2;
        $scope.isPageLoaded = false;
        activate();

        ////////////////

        function activate() {
            var params = '';

            if ($state.params.limit) {
                $scope.pageLimit = $state.params.limit;
                params += 'limit=' + $scope.pageLimit + '&'
            }
            if ($state.params.page) {
                $scope.pageNumber = $state.params.page;
                params += 'page=' + $scope.pageNumber + '&'
            }

            var searchParams = '';
            if ($state.params.categoryId) {
                params += 'category=' + $state.params.categoryId + '&';

            }

            if ($state.params.status) {
                params += 'status=' + $state.params.status;
            }
            console.log(params);
            if ($state.params.searchContent) {
                $scope.searchCategory = $state.params.searchCategory;
                $scope.searchContent = $state.params.searchContent;
            }
            if ($state.params.searchContent) {
                searchByCate();
                countProduct($scope.searchCategory._id, $scope.searchContent);
                console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            } else if (params == '') {
                getAllProduct();
                countProduct();
            } else {
                getProductByParams(params);
                countProduct($state.params.categoryId);
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
            ProductService.GetAllProduct($scope.pageLimit, $state.params.page).then(function(res) {
                $scope.productList = res;
                $scope.preloader = false;
                $scope.pageNumber = $state.params.page ? angular.copy($state.params.page) : 1;
                $scope.isPageLoaded = true;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        function getProductByParams(params) {
            $scope.preloader = true;
            ProductService.GetProductByParams(params).then(function(res) {
                $scope.productList = res
                $scope.pageNumber = $state.params.page ? angular.copy($state.params.page) : 1;
                $scope.isPageLoaded = true;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        function countProduct(category, searchContent) {
            ProductService.CountProduct(category, searchContent).then(function(res) {
                $scope.count = res.count;
                console.log('so luong: ' + $scope.count);
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message)
            })
        }

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        }

        $scope.changePage = function() {
            console.log('ahaha');
            if (!$scope.isPageLoaded || $scope.pageNumber == $state.params.page) {
                return;
            }
            console.log("yeyeyeye" + $scope.searchContent);
            if ($scope.searchContent) {
                $state.go('app.list', { page: $scope.pageNumber, limit: $scope.pageLimit, searchCategory: $scope.searchCategory, searchContent: $scope.searchContent });
            } else {
                console.log('ahahazz');
                $state.go('app.list', { page: $scope.pageNumber, limit: $scope.pageLimit });
            }
        }

        $scope.chooseCategory = function(category) {
            $scope.searchCategory = category;
        }

        function searchByCate() {

            var param = 'category=' + $scope.searchCategory._id;
            param = param + '&name=' + $scope.searchContent;
            param = param + '&limit=' + $scope.pageLimit;
            param = param + '&page=' + $state.params.page;
            ProductService.GetProductByParams(param).then(function(res) {
                $scope.productList = res;
                $scope.pageNumber = $state.params.page ? angular.copy($state.params.page) : 1;
                $scope.isPageLoaded = true;
                countProduct($scope.searchCategory._id, $scope.searchContent);
                console.log('bbbbbbbbbbbbbbbbbbbbbbbbbb');
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.searchByCategory = function searchByCategory() {
            countProduct($scope.searchCategory._id, $scope.searchContent);
            var param = 'category=' + $scope.searchCategory._id;
            param = param + '&name=' + $scope.searchContent;
            param = param + '&limit=' + $scope.pageLimit;
            param = param + '&page=' + $state.params.page;
            ProductService.GetProductByParams(param).then(function(res) {
                $scope.productList = res;
                $scope.pageNumber = $state.params.page ? angular.copy($state.params.page) : 1;
                $scope.isPageLoaded = true;
            }, function(err) {
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