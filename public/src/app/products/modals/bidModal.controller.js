(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('BidModalController', BidModalController);

    BidModalController.inject = ['id', '$scope', 'ProductService', '$uibModalInstance', 'Dialog'];

    function BidModalController(id, $scope, ProductService, $uibModalInstance, Dialog) {
        var vm = this;
        $scope.preloader = true;

        activate();

        ////////////////

        function activate() {
            getProductDetail();
        }

        function getProductDetail() {
            ProductService.GetProduct(id).then(function(res) {
                $scope.product = res;
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            });
        }

        $scope.convertTime = function convertTime(time) {
            return ProductService.ConvertTimeToDate(time);
        }

        $scope.doBid = function doBid() {
            $scope.preloader = true;
            if ($scope.price >= ($scope.product.finalPrice + $scope.product.stepPrice)) {
                $scope.product.finalPrice = $scope.price;
                Dialog.Confirm('Bạn có chắc chắn?', 'Ra giá ' + $scope.price + ' VNĐ cho sản phẩm ' + $scope.product.name, 'Tôi chắc chắn!', function(isComfirm) {
                    if (isComfirm != true)
                        return;
                    ProductService.UpdateBid($scope.product).then(function(res) {
                        $scope.preloader = false;
                        $scope.product.price.push($scope.price);
                        Dialog.Success("Thành công", "Đã đấu giá");
                    }, function(err) {
                        $scope.preloader = false;
                        Dialog.Error("Lỗi", err.message);
                    })
                })

            } else {
                $scope.preloader = false;
                Dialog.Error("Lỗi", "Số tiền không đủ điều kiện");
            }
        }

        $scope.dismiss = function dismiss() {
            $uibModalInstance.close();
        }

    }
})();