(function() {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['$scope', '$state', 'ProductService', 'Dialog', 'UsersService', '$uibModal', '$cookies'];

    function HeaderController($scope, $state, ProductService, Dialog, UsersService, $uibModal, $cookies) {
        var vm = this;
        window.ck = $scope;
        window.cki = $cookies;

        activate();

        ////////////////

        function activate() {

            getAllCategory();
            getProfile();
        }

        function getProfile() {
            console.log("Hahaha")
            UsersService.GetProfile().then(function(res) {
                $scope.profile = res;

            }, function(err) {

            })
        }

        function getAllCategory() {
            ProductService.GetAllCategory().then(function(res) {
                $scope.categoryList = res;
            }, function(err) {
                if (err.data) {
                    Dialog.Error("Lỗi", err.data.message);
                }
            })
        }

        $scope.goPage = function goPage(id) {
            if (!id) {
                $state.go("app.list", { categoryId: id, status: id });
            } else {
                $state.go("app.list", { categoryId: id });
            }
        }

        $scope.signIn = function signIn() {
            $uibModal.open({
                templateUrl: 'app/authentication/signIn.html',
                controller: 'SignInController',
                size: 'lg',
            }).result.then(function(data) {
                $scope.profile = data;
                $scope.$evalAsync();
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

        $scope.sellModal = function sellModal() {
            $uibModal.open({
                templateUrl: 'app/users/sellModal.html',
                controller: 'SellModalController',
                size: 'lg',
            }).result.then(function(data) {
                console.log(data);
            });
        }

        $scope.goUser = function goUser() {
            $state.go("app.profile");
        }

        $scope.goToHome = function goToHome() {
            window.location.replace("/");
        }

        $scope.logout = function logout() {
            var cookie = $cookies.getAll();
            angular.forEach(cookie, function(v, k) {
                $cookies.remove(k, { path: '/' });
            });
            $scope.profile = null;
            $scope.$evalAsync();
        }
    }
})();