(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('AdminController', AdminController);

    AdminController.inject = ['$scope', 'AdminService', 'Dialog'];

    function AdminController($scope, AdminService, Dialog) {
        var vm = this;


        activate();

        ////////////////

        function activate() {
            AdminService.GetMember().then(function(res) {
                $scope.members = res;
                // if (parseInt(res.point.total) == 0) {s
                //     $scope.trustPoint = 0;
                // } else {
                //     $scope.trustPoint = parseInt(res.point.good) * 100 / parseInt(res.point.total);
                // }
            })
        }



        $scope.allowUpgrade = function allowUpgrade(id) {
            var data = {
                _id: id
            }
            AdminService.AllowUpgrade(data).then(function(res) {
                Dialog.Success("Thành công", "Đã chấp thuận nâng cấp tài khoản");
            }, function(err) {
                Dialog.Error("Lỗi", err.data.message);
            })
        }

        $scope.deleteMember = function deleteMember(index) {
            AdminService.DeleteMember($scope.members[index]._id).then(function(res) {
                Dialog.Success("Thành công", "Đã xóa tài khoản");
                $scope.members.splice(index, 1);
            })
        }
    }
})();