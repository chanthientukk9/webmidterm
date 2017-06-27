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

        //////////////////////// Carousel
        $scope.myInterval = 2000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        $scope.sortValue = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        //////////////////////////////
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


        //Carousel
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//unsplash.it/' + newWidth + '/300',
                text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
                id: currIndex++
            });
        };
        $scope.randomize = function() {
            var indexes = generateIndexesArray();
            assignNewIndexesToSlides(indexes);
        };

        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }

        // Randomize logic below

        function assignNewIndexesToSlides(indexes) {
            for (var i = 0, l = slides.length; i < l; i++) {
                slides[i].id = indexes.pop();
            }
        }

        function generateIndexesArray() {
            var indexes = [];
            for (var i = 0; i < currIndex; ++i) {
                indexes[i] = i;
            }
            return shuffle(indexes);
        }

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;

            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }

            return array;
        }

        // end of carousel
    }
})();