(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.inject = ['$scope', 'Auth', 'Dialog', '$cookies', '$uibModalInstance', '$rootScope'];

    function SignInController($scope, Auth, Dialog, $cookies, $uibModalInstance, $rootScope) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

        }

        $scope.login = function login() {
            Auth.Login($scope.user).then(function(res) {
                Dialog.Success("Thành công");
                $rootScope.role = res.data.srole;

                var expire = new Date();
                expire.setHours(expire.getHours() + 6);
                $cookies.put('tkcc', res.token, { path: '/', expries: expire });

                $uibModalInstance.close(res.data);
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }
    }
})();