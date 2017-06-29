(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('ProfileController', ProfileController);

    ProfileController.inject = ['$scope', 'UsersService'];

    function ProfileController($scope, UsersService) {
        var vm = this;

        $scope.upVote = false;
        $scope.downVote = false;
        activate();

        ////////////////

        function activate() {
            UsersService.GetProfile().then(function(res) {
                $scope.profileInfo = res;
            })
        }

        $scope.convertTime = function convertTime(time) {
            return UsersService.ConvertTimeToDate(time);
        }

        $scope.changeOption = function(value) {
            if (value == '1') {
                $scope.upVote = !$scope.upVote;
                if ($scope.downVote) {
                    $scope.downVote = !$scope.downVote;
                }
            } else if (value == '2') {
                $scope.downVote = !$scope.downVote;
                if ($scope.upVote) {
                    $scope.upVote = !$scope.upVote;
                }
            }
        }
    }
})();