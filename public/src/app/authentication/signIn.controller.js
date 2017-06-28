(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignInController', SignInController);

    SignInController.inject = ['$scope', 'Auth', 'Dialog', '$cookies', '$uibModalInstance'];

    function SignInController($scope, Auth, Dialog, $cookies, $uibModalInstance) {
        var vm = this;


        activate();

        ////////////////

        function activate() {

        }

        $scope.login = function login() {
            Auth.Login($scope.user).then(function(res) {
                Dialog.Success("Thành công");
                var expire = new Date();
                expire.setHours(expire.getHours() + 6);
                $cookies.put('tkcc', res.token, { path: '/', expries: expire });
                $uibModalInstance.close();
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }
    }
})();