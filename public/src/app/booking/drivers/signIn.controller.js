(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('SignInController1', SignInController1);

    SignInController1.inject = ['$scope', 'BookingService', 'Dialog', '$cookies', '$uibModalInstance', '$rootScope'];

    function SignInController1($scope, BookingService, Dialog, $cookies, $uibModalInstance, $rootScope) {
        var vm = this;
        window.cc = $scope;
        activate();

        ////////////////

        function activate() {
        }
        $scope.login = function login() {
            BookingService.LoginDriver($scope.user).then(function(res) {
                Dialog.Success("Thành công");
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