(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('BidModalController', BidModalController);

    BidModalController.inject = ['id', '$scope', 'ProductService', '$uibModalInstance', 'Dialog'];

    function BidModalController(id, $scope, ProductService, $uibModalInstance, Dialog) {
        var vm = this;
        $scope.preloader = true;
        $scope.price = 0;

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

        $scope.dismiss = function dismiss() {
            $uibModalInstance.close();
        }

    }
})();