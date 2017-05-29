(function() {
    'use strict';

    angular
        .module('app')
        .controller('SignUpController', SignUpController);

    SignUpController.inject = ['$scope', 'Auth', 'Dialog'];

    function SignUpController($scope, Auth, Dialog) {
        var vm = this;

        $scope.user = {};
        activate();

        ////////////////

        function activate() {}

        $scope.signUp = function signUp() {
            //....

            Auth.SignUp($scope.user).then(function(res) {
                Dialog.Success('Thành Công', 'Bạn đã đăng kí tài khoản thành công!!');
            }, function(err) {
                Dialog.Error('Thất bại')
            })

        }
    }
})();