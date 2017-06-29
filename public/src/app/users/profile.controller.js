(function() {
    'use strict';

    angular
        .module('app.users')
        .controller('ProfileController', ProfileController);

    ProfileController.inject = ['$scope', 'UsersService', '$state', '$uibModal'];

    function ProfileController($scope, UsersService, $state, $uibModal) {
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

        $scope.gotoProduct = function(id) {
            $state.go('app.detail', { id: id })
        }

        $scope.gotoBid = function(id) {
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
    }
})();