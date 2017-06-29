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
        $scope.indexCurrentMedia = 0;
        $scope.currentMediaSet = [];
        $scope.indexSet = 0;
        $scope.btnfavor = false;
        var limitSet = 4;
        $scope.limitSet = limitSet;
        $scope.countSet = 0;
        activate();

        ////////////////

        function activate() {
            getProduct();
        }

        function getProduct() {
            ProductService.GetProduct($state.params.id).then(function(res) {
                $scope.product = res;
                $scope.currentMedia = res.urlMedia[0].url;
                if (res.urlMedia.length <= limitSet) {
                    $scope.currentMediaSet = res.urlMedia;
                } else {
                    for (var i = 0; i < limitSet; i++) {
                        $scope.currentMediaSet.push(res.urlMedia[i]);
                    }
                    $scope.indexSet = limitSet;
                }

                ProductService.GetSellerInfo(res.seller).then(function(res2) {
                    $scope.seller = res2;
                    $scope.email = shortEmail(res2.email);
                }, function(err2) {
                    Dialog.Error("Lỗi", err2.data.message);
                })
                getWishList();
                getBiddingList();
                $scope.preloader = false;
            }, function(err) {
                $scope.preloader = false;
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.changeMedia = function changeMedia(index) {
            $scope.indexCurrentMedia = index + $scope.countSet * limitSet;
            console.log($scope.indexCurrentMedia + " " + $scope.countSet);
            $scope.currentMedia = $scope.product.urlMedia[$scope.indexCurrentMedia].url;
        }

        $scope.nextSet = function nextSet() {
            if ($scope.indexSet < 0) {
                $scope.indexSet += 2 * limitSet;
            }
            if ($scope.indexSet < $scope.product.urlMedia.length) {
                $scope.countSet++;
                for (var i = $scope.indexSet; i < $scope.indexSet + limitSet; i++) {
                    if (i >= $scope.product.urlMedia.length) {
                        $scope.currentMediaSet.splice(i - $scope.indexSet, limitSet - (i - $scope.indexSet));
                        break;
                    }
                    $scope.currentMediaSet[i - $scope.indexSet] = $scope.product.urlMedia[i];
                }
                $scope.indexSet += limitSet;
            }
        }

        $scope.previousSet = function previousSet() {
            if ($scope.indexSet >= $scope.product.urlMedia.length) {
                $scope.indexSet -= 2 * limitSet;
            }
            if ($scope.indexSet >= 0) {
                $scope.countSet--;
                for (var i = $scope.indexSet; i < $scope.indexSet + limitSet; i++) {

                    $scope.currentMediaSet[i - $scope.indexSet] = $scope.product.urlMedia[i];

                }
                $scope.indexSet -= limitSet;
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

        function getWishList() {
            ProductService.GetWishList().then(function(res) {
                $scope.wishList = res.wishList;
                if (!$scope.wishList) {
                    $scope.wishList = [];
                } else {
                    for (var i = 0; i < $scope.wishList.length; i++) {
                        if ($scope.wishList[i] == $scope.product._id) {
                            $scope.btnfavor = true;
                        }
                    }
                }
            })
        }

        function getBiddingList() {
            ProductService.GetBiddingList().then(function(res) {
                $scope.biddingList = res.biddingList;
                if (!$scope.biddingList) {
                    $scope.biddingList = [];
                }
            })
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
                        $scope.biddingList.push($scope.product._id)
                        Dialog.Success("Thành công", "Đã đấu giá");
                    }, function(err) {
                        $scope.preloader = false;
                        Dialog.Error("Lỗi", err.message);
                    })
                    var data = {
                        biddingList: $scope.biddingList
                    }
                    ProductService.UpdateBiddingList(data).then(function(res) {
                        $scope.$evalAsync();
                    })
                })

            } else {
                $scope.preloader = false;
                Dialog.Error("Lỗi", "Số tiền không đủ điều kiện");
            }
        }

        $scope.btnFavor = function btnFavor(booleanBtn) {
            $scope.btnfavor = booleanBtn;
            if ($scope.btnfavor) {
                $scope.wishList.push($scope.product._id);
            } else {
                var index = $scope.wishList.indexOf($scope.product._id);
                $scope.wishList.removeAt(index);
            }

            var data = {
                wishList: $scope.wishList
            }
            ProductService.UpdateWishList(data).then(function(res) {
                $scope.$evalAsync();
            })
        }
    }
})();