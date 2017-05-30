(function() {
    'use strict';

    angular
        .module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.inject = ['$scope', '$state', 'ProductService', 'Dialog'];

    function HeaderController($scope, $state, ProductService, Dialog) {
        var vm = this;
        window.ck = $scope;


        activate();

        ////////////////

        function activate() {
            getAllCategory();
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
                $state.go("app.list", { categoryId: id, status: id });
            } else {
                $state.go("app.list", { categoryId: id });
            }
        }

        $scope.signIn = function signIn() {
            $state.go('auth.sign-in');
        }

        $scope.goToHome = function goToHome() {
            window.location.replace("/");
        }
    }
})();