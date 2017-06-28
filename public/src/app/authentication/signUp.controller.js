(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.inject = ['$scope', 'Auth', 'Dialog', '$uibModalInstance'];

    function SignUpController($scope, Auth, Dialog, $uibModalInstance) {
        var vm = this;

        $scope.user = {};
        activate();

        ////////////////

        function activate() {}

        $scope.signUp = function signUp() {
            //....
            if ($scope.user.password != $scope.user.repassword) {
                Dialog.Error('Lỗi', 'Mật khẩu không trùng khớp');
                return;
            }
            Auth.Register($scope.user).then(function(res) {
                Dialog.Success('Thành công', 'Bạn đã đăng kí tài khoản thành công!!');
                $uibModalInstance.close();
            }, function(err) {
                Dialog.Error('Thất bại', err.data.message);
            })

        }
    }
})();