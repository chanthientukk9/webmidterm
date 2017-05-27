(function() {
    'use strict';

    angular
        .module('app.product')
        .controller('ViewImageModalController', ViewImageModalController);

    ViewImageModalController.inject = ['media', '$scope', '$uibModalInstance'];

    function ViewImageModalController(media, $scope, $uibModalInstance) {
        var vm = this;
        var index = media.index;
        window.cc = $scope;
        $scope.currentMedia = media.data[index].url;

        activate();

        ////////////////

        function activate() {}

        $scope.next = function next() {
            if (index >= media.data.length - 1) {
                return;
            }
            index++;
            $scope.currentMedia = media.data[index].url;
        }

        $scope.previous = function previous() {
            if (index <= 0) {
                return;
            }
            index--;
            $scope.currentMedia = media.data[index].url;
        }

        $scope.dismiss = function dismiss() {
            $uibModalInstance.close();
        }
    }
})();