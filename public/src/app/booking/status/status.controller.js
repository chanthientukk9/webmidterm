(function() {
    'use strict';

    angular
        .module('app.booking')
        .controller('StatusController', StatusController);

    StatusController.$inject = ['$scope', 'BookingService'];
    function StatusController($scope, BookingService) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();