(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.inject = ['$scope', '$state', 'ProductService', 'Dialog', '$uibModal'];

    function ProductDetailController($scope, $state, ProductService, Dialog, $uibModal) {
        var vm = this;
        $scope.preloader = true;
        window.cc = $scope;
        $scope.price = 0;
        $scope.indexCurrentMedia = 0;

        activate();

        ////////////////

        function activate() {
            ProductService.GetProduct($state.params.id).then(function(res) {
                $scope.product = res;
                $scope.currentMedia = res.urlMedia[0].url;

                ProductService.GetSellerInfo(res.seller).then(function(res2) {
                    $scope.seller = res2;
                    $scope.email = shortEmail(res2.email);
                }, function(err2) {
                    Dialog.Error("Lỗi", err2.data.message);
                })

                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.changeMedia = function changeMedia(index) {
            $scope.indexCurrentMedia = index;
            $scope.currentMedia = $scope.product.urlMedia[index].url;
        }

        $scope.doBid = function doBid() {
            $scope.preloader = true;
            if ($scope.price > $scope.product.price[$scope.product.price.length - 1]) {
                $scope.product.price.push($scope.price);
                ProductService.UpdateProduct($scope.product).then(function(res) {
                    $scope.preloader = false;
                    Dialog.Success("Thành công", "Đã đấu giá");
                }, function(err) {
                    $scope.preloader = false;
                    Dialog.Error("Lỗi", err.data.message);
                })
            } else {
                $scope.preloader = false;
                Dialog.Error("Lỗi", "Số tiền không đủ điều kiện");
            }
        }

        $scope.convertTime = function convertTime(time) {
            return ProductService.ConvertTimeToDate(time);
        }

        function shortEmail(email) {
            console.log(email);
            var shortEmail = email[0] + email[1] + email[2] + email[3] + email[4] + "...";
            var flag = 0;
            for (var i = 0; i < email.length; i++) {
                if (email[i] == '@') {
                    flag = 1;
                }
                if (flag == 1) {
                    shortEmail += email[i];
                }
            }
            return shortEmail;
        }

        $scope.viewImage = function viewImage() {
            var media = {
                index: $scope.indexCurrentMedia,
                data: $scope.product.urlMedia
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